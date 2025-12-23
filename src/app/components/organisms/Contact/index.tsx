"use client";

import clsx from "clsx";
import { Clock, MapPin, SendMail } from "iconoir-react";
import { useFormatter, useTranslations } from "next-intl";
import { type FormEvent, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";

import { GlassCard } from "@components/atoms/GlassCard";
import RichText from "@components/RichText";
import { Button } from "@/src/app/components/Button";
import Input from "@/src/app/components/Input";
import Textarea from "@/src/app/components/Textarea";
import { SECTION_IDS } from "@/src/app/lib/Routes";

interface HeroProps {
  className?: string;
}

export default function Contact({ className }: HeroProps) {
  const t = useTranslations("Contact");
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState<string | undefined>();
  const [currentParisTime, setCurrentParisTime] = useState(() => new Date());
  const recaptcha = useRef<ReCAPTCHA>(null);
  const formatter = useFormatter();
  const siteKey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

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
        setEmail(data?.email as string);
        setEmailSent(true);
      } else {
        console.error("Failed to send email");
        toast.error(t("emailFailed"));
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(t("emailFailed"));
    }
  }

  useEffect(() => {
    const interval = setInterval(() => setCurrentParisTime(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const contactSectionId = SECTION_IDS.contact;

  return (
    <section id={contactSectionId} className={clsx("py-16 lg:py-24", className)}>
      <div className="container mx-auto px-4">
        <div className="rounded-box border border-base-300 bg-base-200/40 p-6 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
            <div className="flex flex-col justify-center gap-6 text-center lg:text-left">
              <h2 className="text-4xl mt-4 font-bold lg:text-6xl leading-9 lg:leading-14">
                <RichText>{(tags) => t.rich("contactMe", tags)}</RichText>
              </h2>
              <p className="body-medium whitespace-pre-line text-base-content/70">
                {t("contactMeDescription")}
              </p>

              <div className="flex flex-row gap-5 justify-center lg:justify-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-base-200 bg-base-100/70">
                  <MapPin className="text-primary h-5 w-5" aria-hidden />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs uppercase text-base-content/70 font-semibold tracking-wide">
                    {t("location")}
                  </p>
                  <p className="font-semibold text-base-content">{t("strasbourgFrance")}</p>
                </div>
              </div>

              <div className="flex flex-row gap-5 justify-center lg:justify-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-base-200 bg-base-100/70">
                  <Clock className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs uppercase text-base-content/70 font-semibold tracking-wide">
                    {t("timezoneLabel")}
                  </p>
                  <p className="font-semibold text-base-content">{t("timezoneValue")}</p>
                  <p className="text-sm text-base-content/70">
                    {t("timezoneLive", {
                      time: formatter.dateTime(currentParisTime, {
                        hour: "numeric",
                        minute: "numeric",
                      }),
                    })}
                  </p>
                </div>
              </div>
            </div>

            <GlassCard className={clsx("lg:p-10", emailSent && "flex items-center justify-center")}>
              {emailSent ? (
                <div className="flex flex-col items-center gap-5 py-8">
                  <SendMail className="h-20 w-20 text-primary" aria-hidden />
                  <p className="body-large text-center">
                    {t("messageSent", { email: email ?? "" })}
                  </p>
                </div>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <Input
                    label={t("name")}
                    name="name"
                    isRequired
                    type="text"
                    placeholder={t("placeholderName")}
                  />
                  <Input
                    label={t("companyName")}
                    name="companyName"
                    type="text"
                    placeholder={t("placeholderCompanyName")}
                  />
                  <Input
                    label={t("email")}
                    name="email"
                    isRequired
                    type="email"
                    placeholder={t("placeholderEmail")}
                  />
                  <Textarea
                    label={t("message")}
                    name="message"
                    isRequired
                    rows={5}
                    placeholder={t("placeholderMessage")}
                  />

                  {siteKey ? (
                    <div className="mt-2 self-end">
                      <ReCAPTCHA size="normal" sitekey={siteKey} ref={recaptcha} />
                    </div>
                  ) : null}

                  <Button type="submit" className="btn btn-primary btn-outline mt-4 w-full">
                    {t("submit")}
                  </Button>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
