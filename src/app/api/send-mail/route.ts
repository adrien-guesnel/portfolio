import { type NextRequest, NextResponse } from "next/server";
import Mailjet from "node-mailjet";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_TOKEN_LENGTH = 4096;
const MAX_LOGGED_FIELDS = 10;
const MAX_LOGGED_FIELD_NAME_LENGTH = 50;
const RECAPTCHA_TIMEOUT_MS = 5000;

const RECAPTCHA_SITE_KEY_BUILT = Boolean(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RECAPTCHA_TOKEN_PATTERN = /^[A-Za-z0-9._~+/=-]+$/;

const DELETE_CHAR_CODE = 0x7f;
const LAST_CONTROL_CHAR_CODE = 0x1f;

type FailureCode =
  | "invalid_payload"
  | "recaptcha_missing"
  | "recaptcha_rejected"
  | "recaptcha_unavailable"
  | "mail_config_missing"
  | "mail_send_failed";

function log(level: "info" | "warn" | "error", code: FailureCode | "sent", details = {}) {
  const line = JSON.stringify({
    scope: "send-mail",
    time: new Date().toISOString(),
    level,
    code,
    ...details,
  });

  console[level](line);
}

function fail(code: FailureCode, status: number, error: string) {
  return NextResponse.json({ error, code }, { status });
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function describeError(error: unknown) {
  if (!(error instanceof Error)) {
    return { message: String(error) };
  }

  return {
    message: error.message,
    cause: error.cause === undefined ? undefined : errorMessage(error.cause),
  };
}

function describeFields(body: unknown) {
  if (typeof body !== "object" || body === null) {
    return { receivedFieldCount: 0 };
  }

  const fields = Object.keys(body);

  return {
    receivedFields: fields
      .slice(0, MAX_LOGGED_FIELDS)
      .map((field) => field.slice(0, MAX_LOGGED_FIELD_NAME_LENGTH)),
    receivedFieldCount: fields.length,
  };
}

function stripControlChars(value: string, keepNewlines: boolean) {
  let result = "";

  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    const isControl = code <= LAST_CONTROL_CHAR_CODE || code === DELETE_CHAR_CODE;

    if (!isControl || (keepNewlines && char === "\n")) {
      result += char;
    }
  }

  return result;
}

function sanitizeText(value: unknown, maxLength: number, keepNewlines = false) {
  if (typeof value !== "string" || value.length > maxLength) {
    return null;
  }

  const normalized = keepNewlines ? value.replace(/\r\n?/g, "\n") : value;

  return stripControlChars(normalized, keepNewlines).trim();
}

type Payload = {
  name: string;
  email: string;
  message: string;
  companyName: string;
  token: string;
};

const PARSE_FAILURE_MESSAGES = {
  invalid_payload: "Invalid form submission",
  recaptcha_missing: "reCAPTCHA verification is required",
} as const;

type ParseResult =
  | { ok: true; payload: Payload }
  | { ok: false; code: keyof typeof PARSE_FAILURE_MESSAGES; invalidFields: string[] };

function parsePayload(body: unknown): ParseResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, code: "invalid_payload", invalidFields: ["body"] };
  }

  const raw = body as Record<string, unknown>;
  const rawToken = raw["g-recaptcha-response"];

  const name = sanitizeText(raw.name, MAX_NAME_LENGTH);
  const email = sanitizeText(raw.email, MAX_EMAIL_LENGTH);
  const message = sanitizeText(raw.message, MAX_MESSAGE_LENGTH, true);
  const companyName = sanitizeText(raw.companyName, MAX_COMPANY_LENGTH) ?? "";
  const token = sanitizeText(rawToken, MAX_TOKEN_LENGTH);

  const validEmail = email && EMAIL_PATTERN.test(email) ? email : null;
  const tokenMissing = rawToken === undefined || rawToken === null || rawToken === "";
  const tokenValid = tokenMissing || Boolean(token && RECAPTCHA_TOKEN_PATTERN.test(token));

  if (!name || !validEmail || !message || !tokenValid) {
    const checks = { name, email: validEmail, message, "g-recaptcha-response": tokenValid };
    const invalidFields = Object.entries(checks)
      .filter(([, value]) => !value)
      .map(([field]) => field);

    return { ok: false, code: "invalid_payload", invalidFields };
  }

  if (!token) {
    return { ok: false, code: "recaptcha_missing", invalidFields: ["g-recaptcha-response"] };
  }

  return { ok: true, payload: { name, email: validEmail, message, companyName, token } };
}

type RecaptchaVerification = {
  success?: boolean;
  hostname?: string;
  "error-codes"?: string[];
};

async function verifyRecaptcha(secret: string, token: string) {
  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ secret, response: token }),
    signal: AbortSignal.timeout(RECAPTCHA_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`siteverify responded with HTTP ${response.status}`);
  }

  return (await response.json()) as RecaptchaVerification;
}

type MailjetError = Error & {
  statusCode?: number;
  statusText?: string;
  ErrorMessage?: string;
  ErrorIdentifier?: string;
  ErrorCode?: string;
  response?: { data?: unknown };
};

// node-mailjet attaches the raw axios response, whose config carries the API
// credentials, so the error object must never be logged as a whole.
function describeMailjetError(error: unknown) {
  if (!(error instanceof Error)) {
    return describeError(error);
  }

  const mailjetError = error as MailjetError;

  return {
    ...describeError(error),
    statusCode: mailjetError.statusCode,
    statusText: mailjetError.statusText,
    errorMessage: mailjetError.ErrorMessage,
    errorIdentifier: mailjetError.ErrorIdentifier,
    errorCode: mailjetError.ErrorCode,
    responseData: mailjetError.response?.data,
  };
}

function readConfig() {
  const env = {
    MJ_APIKEY_PUBLIC: process.env.MJ_APIKEY_PUBLIC,
    MJ_APIKEY_PRIVATE: process.env.MJ_APIKEY_PRIVATE,
    GOOGLE_RECAPTCHA_SECRET: process.env.GOOGLE_RECAPTCHA_SECRET,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  };

  const missingEnv = Object.entries(env)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingEnv.length > 0) {
    return { ok: false as const, missingEnv };
  }

  return { ok: true as const, config: env as Record<keyof typeof env, string> };
}

export async function POST(req: NextRequest) {
  const configResult = readConfig();

  if (!configResult.ok) {
    log("error", "mail_config_missing", { missingEnv: configResult.missingEnv });
    return fail("mail_config_missing", 500, "Mail service is not configured");
  }

  const { config } = configResult;

  let body: unknown;

  try {
    body = await req.json();
  } catch (error) {
    log("warn", "invalid_payload", {
      reason: "body is not valid JSON",
      contentType: req.headers.get("content-type"),
      ...describeError(error),
    });
    return fail("invalid_payload", 400, PARSE_FAILURE_MESSAGES.invalid_payload);
  }

  const parsed = parsePayload(body);

  if (!parsed.ok) {
    log("warn", parsed.code, {
      invalidFields: parsed.invalidFields,
      ...describeFields(body),
      hint:
        parsed.code === "recaptcha_missing" && !RECAPTCHA_SITE_KEY_BUILT
          ? "NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE was not set at build time: no widget rendered"
          : undefined,
    });

    return fail(parsed.code, 400, PARSE_FAILURE_MESSAGES[parsed.code]);
  }

  const { name, email, message, companyName, token } = parsed.payload;

  let verification: RecaptchaVerification;

  try {
    verification = await verifyRecaptcha(config.GOOGLE_RECAPTCHA_SECRET, token);
  } catch (error) {
    log("error", "recaptcha_unavailable", describeError(error));
    return fail("recaptcha_unavailable", 502, "reCAPTCHA verification is unavailable");
  }

  if (!verification.success) {
    log("warn", "recaptcha_rejected", {
      errorCodes: verification["error-codes"] ?? [],
      hostname: verification.hostname,
      tokenLength: token.length,
    });
    return fail("recaptcha_rejected", 400, "Invalid reCAPTCHA token");
  }

  try {
    const mailjet = Mailjet.apiConnect(config.MJ_APIKEY_PUBLIC, config.MJ_APIKEY_PRIVATE);

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: config.CONTACT_EMAIL,
            Name: name,
          },
          To: [
            {
              Email: config.CONTACT_EMAIL,
            },
          ],
          Subject: `${name} contacts you on aguesnel.fr form`,
          TextPart: `Name:${name}\nEmail:${email}\nCompany name: ${companyName}\n\nMessage :\n${message}`,
        },
      ],
    });
  } catch (error) {
    log("error", "mail_send_failed", describeMailjetError(error));
    return fail("mail_send_failed", 502, "An error happened during the sent of the message");
  }

  log("info", "sent", { messageLength: message.length, hasCompany: companyName.length > 0 });

  return NextResponse.json({ message: "Email sent successfully" });
}
