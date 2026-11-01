"use client";

import { useTranslations } from "next-intl";

import NewTabHint from "@components/atoms/NewTabHint";
import { SOCIAL_LINKS } from "@/src/app/lib/constants";
import { usePlausibleEvents } from "@/src/app/lib/plausible";

const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "dev";
const BUILD_DATE = process.env.NEXT_PUBLIC_BUILD_DATE ?? "";
const GIT_SHA = process.env.NEXT_PUBLIC_GIT_SHA ?? "";
const IS_RELEASE = /^\d+\.\d+\.\d+$/.test(APP_VERSION);

export default function Footer() {
  const t = useTranslations("footer");
  const plausible = usePlausibleEvents();

  const currentYear = new Date().getFullYear().toString();
  const version = IS_RELEASE
    ? t("release", { version: APP_VERSION })
    : [
        t("build", { channel: APP_VERSION, date: BUILD_DATE.slice(0, 16).replace("T", " ") }),
        GIT_SHA,
      ]
        .filter(Boolean)
        .join(" · ");

  return (
    <footer className="border-t border-line-soft">
      <div className="page-wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-5 font-mono text-[13px] text-muted">
        <p className="m-0 flex flex-wrap gap-x-2 py-3">
          <span>{t("copyright", { currentYear })}</span>
          <span>· {version}</span>
        </p>
        <nav aria-label={t("social")} className="-ml-2.5">
          <ul className="flex flex-wrap gap-x-2">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center px-2.5 text-muted"
                  onClick={() => link.event && plausible(link.event)}
                >
                  {link.label}
                  <NewTabHint />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
