"use client";

import { useTranslations } from "next-intl";

import NewTabHint from "@components/atoms/NewTabHint";
import { SOCIAL_LINKS } from "@/src/app/lib/constants";
import { usePlausibleEvents } from "@/src/app/lib/plausible";

export default function Footer() {
  const t = useTranslations("footer");
  const plausible = usePlausibleEvents();

  const currentYear = new Date().getFullYear().toString();

  return (
    <footer className="border-t border-line-soft">
      <div className="page-wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-5 font-mono text-[13px] text-muted">
        <p className="m-0 py-3">{t("copyright", { currentYear })}</p>
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
