import { type NextRequest, NextResponse } from "next/server";
import Mailjet from "node-mailjet";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_TOKEN_LENGTH = 4096;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RECAPTCHA_TOKEN_PATTERN = /^[A-Za-z0-9._~+/=-]+$/;

const DELETE_CHAR_CODE = 0x7f;
const LAST_CONTROL_CHAR_CODE = 0x1f;

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

function parsePayload(body: unknown) {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const raw = body as Record<string, unknown>;

  const name = sanitizeText(raw.name, MAX_NAME_LENGTH);
  const email = sanitizeText(raw.email, MAX_EMAIL_LENGTH);
  const message = sanitizeText(raw.message, MAX_MESSAGE_LENGTH, true);
  const companyName = sanitizeText(raw.companyName, MAX_COMPANY_LENGTH) ?? "";
  const token = sanitizeText(raw["g-recaptcha-response"], MAX_TOKEN_LENGTH);

  if (!name || !email || !message || !token) {
    return null;
  }

  if (!EMAIL_PATTERN.test(email) || !RECAPTCHA_TOKEN_PATTERN.test(token)) {
    return null;
  }

  return { name, email, message, companyName, token };
}

export async function POST(req: NextRequest) {
  const mjApiKeyPublic = process.env.MJ_APIKEY_PUBLIC;
  const mjApiKeyPrivate = process.env.MJ_APIKEY_PRIVATE;
  const googleRecaptchaSecret = process.env.GOOGLE_RECAPTCHA_SECRET;
  const contactEmail = process.env.CONTACT_EMAIL;

  try {
    if (!mjApiKeyPublic || !mjApiKeyPrivate || !googleRecaptchaSecret || !contactEmail) {
      throw new Error("Missing mail configuration");
    }

    const payload = parsePayload(await req.json());

    if (!payload) {
      return NextResponse.json({ error: "Invalid form submission" }, { status: 400 });
    }

    const { name, email, message, companyName, token } = payload;

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: googleRecaptchaSecret,
        response: token,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      return NextResponse.json({ error: "Invalid reCAPTCHA token" }, { status: 400 });
    }

    const mailjet = Mailjet.apiConnect(mjApiKeyPublic, mjApiKeyPrivate);

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: contactEmail,
            Name: name,
          },
          To: [
            {
              Email: contactEmail,
            },
          ],
          Subject: `${name} contacts you on aguesnel.fr form`,
          TextPart: `Name:${name}\nEmail:${email}\nCompany name: ${companyName}\n\nMessage :\n${message}`,
        },
      ],
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "An error happened during the sent of the message" },
      { status: 500 },
    );
  }
}
