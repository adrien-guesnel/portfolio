"use client";

import { ArrowRight } from "iconoir-react";
import { useLocale, useTranslations } from "next-intl";
import { type FormEvent, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import Portrait from "@components/atoms/Portrait";
import { Button, buttonClass } from "@/src/app/components/Button";
import Input from "@/src/app/components/Input";
import Textarea from "@/src/app/components/Textarea";
import { BOOKING_DISCOVERY_CALL_URL } from "@/src/app/lib/constants";
import { usePlausibleEvents } from "@/src/app/lib/plausible";
import { SECTION_IDS } from "@/src/app/lib/Routes";
import { useReveal } from "@/src/app/lib/useReveal";

type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const VALIDATED_FIELDS: FieldName[] = ["name", "email", "message"];
// The normal reCAPTCHA widget is 304px wide and overflows the form card below this width.
const COMPACT_RECAPTCHA_QUERY = "(max-width: 400px)";

type RecaptchaTheme = "light" | "dark";

interface FailureResponse {
  error?: string;
  code?: string;
}

function readTheme(): RecaptchaTheme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export default function Contact() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const plausible = usePlausibleEvents();
  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState("");
  const [recaptchaTheme, setRecaptchaTheme] = useState<RecaptchaTheme>("light");
  const [compactRecaptcha, setCompactRecaptcha] = useState(false);
  const recaptcha = useRef<ReCAPTCHA>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE;
  const sectionRef = useReveal<HTMLElement>();

  useEffect(() => {
    setRecaptchaTheme(readTheme());
    const observer = new MutationObserver(() => setRecaptchaTheme(readTheme()));
    observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });

    const narrow = window.matchMedia(COMPACT_RECAPTCHA_QUERY);
    const updateSize = () => setCompactRecaptcha(narrow.matches);
    updateSize();
    narrow.addEventListener("change", updateSize);

    return () => {
      observer.disconnect();
      narrow.removeEventListener("change", updateSize);
    };
  }, []);

  function validate(form: HTMLFormElement): FieldErrors {
    const nextErrors: FieldErrors = {};
    for (const field of VALIDATED_FIELDS) {
      const element = form.elements.namedItem(field) as HTMLInputElement | null;
      if (!element || element.validity.valid) {
        continue;
      }
      nextErrors[field] = element.validity.typeMismatch ? t("invalidEmail") : t("required");
    }
    return nextErrors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const nextErrors = validate(form);
    setErrors(nextErrors);

    const firstInvalid = VALIDATED_FIELDS.find((field) => nextErrors[field]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    if (siteKey && !recaptcha.current?.getValue()) {
      setStatus(t("recaptchaRequired"));
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      recaptcha?.current?.reset();

      if (response.ok) {
        setEmailSent(true);
        setStatus(t("messageSent", { email: String(data.email ?? "") }));
        // The form, and the submit button holding focus, leave the DOM: move focus to the result.
        requestAnimationFrame(() => statusRef.current?.focus());
        plausible("Contact Form Submitted");
      } else {
        const failure = (await response.json().catch(() => null)) as FailureResponse | null;
        console.error("Failed to send email", response.status, failure);
        setStatus(t("emailFailed"));
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus(t("emailFailed"));
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.contact}
      aria-labelledby="contact-title"
      className="page-wrap pb-[clamp(56px,9vw,96px)]"
    >
      <div className="grid gap-[clamp(32px,4vw,48px)] rounded-[20px] border border-line bg-band p-[clamp(22px,5vw,56px)] sm:rounded-[28px] desk:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div data-reveal className="flex min-w-0 flex-col gap-6">
          <div className="flex items-center gap-3.5">
            <span className="relative block size-14 shrink-0 overflow-hidden rounded-full border-2 border-surface">
              <Portrait alt="" fill sizes="56px" className="object-cover object-[48%_22%]" />
            </span>
            <span className="flex flex-col leading-snug">
              <span className="font-semibold">Adrien Guesnel</span>
              <span className="font-mono text-[13px] text-muted">{t("kicker")}</span>
            </span>
          </div>
          <h2 id="contact-title" className="h2-section text-[clamp(28px,3.8vw,46px)]">
            {t("title")}
          </h2>
          <p className="m-0 text-[17px] text-fg-2">{t("lead")}</p>
          <dl className="m-0 grid grid-cols-[80px_minmax(0,1fr)] gap-x-4 gap-y-3 font-mono text-sm">
            <dt className="text-muted">{t("baseLabel")}</dt>
            <dd className="m-0">{t("baseValue")}</dd>
            <dt className="text-muted">{t("timezoneLabel")}</dt>
            <dd className="m-0">{t("timezoneValue")}</dd>
          </dl>
          <div className="flex flex-wrap gap-3">
            <a
              href={BOOKING_DISCOVERY_CALL_URL}
              className={`${buttonClass({ variant: "neutral" })} max-sm:flex-1 max-sm:basis-full`}
              onClick={() =>
                plausible("Book Discovery Call Clicked", { props: { source: "contact" } })
              }
            >
              {t("cta")}
              <ArrowRight
                className="size-4.5 transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </div>
        </div>

        <div
          data-reveal
          className="flex min-w-0 flex-col gap-4.5 rounded-[20px] border border-line bg-surface p-[clamp(20px,3vw,28px)]"
        >
          {emailSent ? null : (
            <form
              aria-labelledby="contact-form-title"
              className="flex flex-col gap-4.5"
              onSubmit={handleSubmit}
              noValidate
            >
              <h3 id="contact-form-title" className="m-0 text-lg font-semibold">
                {t("formTitle")}
              </h3>
              <p className="-mt-2 mb-0 text-sm text-muted">{t("formHint")}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label={t("name")}
                  name="name"
                  isRequired
                  type="text"
                  autoComplete="name"
                  placeholder={t("placeholderName")}
                  error={errors.name}
                />
                <Input
                  label={t("companyName")}
                  name="companyName"
                  optionalLabel={t("optional")}
                  type="text"
                  autoComplete="organization"
                  placeholder={t("placeholderCompanyName")}
                />
              </div>
              <Input
                label={t("email")}
                name="email"
                isRequired
                type="email"
                autoComplete="email"
                placeholder={t("placeholderEmail")}
                error={errors.email}
              />
              <Textarea
                label={t("message")}
                name="message"
                isRequired
                rows={5}
                placeholder={t("placeholderMessage")}
                error={errors.message}
              />

              {siteKey ? (
                <div className="self-end">
                  {/* The widget only reads theme and size when it renders: the key remounts it on
                      a change, which clears a challenge already solved. */}
                  <ReCAPTCHA
                    key={`${recaptchaTheme}-${compactRecaptcha}`}
                    size={compactRecaptcha ? "compact" : "normal"}
                    theme={recaptchaTheme}
                    hl={locale}
                    sitekey={siteKey}
                    ref={recaptcha}
                  />
                </div>
              ) : null}

              <Button type="submit" loading={sending} className="w-full">
                {t("submit")}
              </Button>
            </form>
          )}
          <p
            ref={statusRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className={
              emailSent ? "m-0 whitespace-pre-line text-[17px]" : "m-0 text-[15px] text-fg-2"
            }
          >
            {status}
          </p>
        </div>
      </div>
    </section>
  );
}
