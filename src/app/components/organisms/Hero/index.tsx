"use client";

import clsx from "clsx";
import { ArrowRight } from "iconoir-react";
import { useTranslations } from "next-intl";

import NewTabHint from "@components/atoms/NewTabHint";
import Portrait from "@components/atoms/Portrait";
import { buttonClass } from "@/src/app/components/Button";
import { BOOKING_DISCOVERY_CALL_URL, SOCIAL_LINKS } from "@/src/app/lib/constants";
import { usePlausibleEvents } from "@/src/app/lib/plausible";
import { SECTION_IDS, SECTION_ROUTES } from "@/src/app/lib/Routes";

interface HeroStat {
  value: string;
  label: string;
}

interface HeroCardRow {
  label: string;
  value: string;
}

export default function Hero({ className }: { className?: string }) {
  const t = useTranslations("Hero");
  const plausible = usePlausibleEvents();
  const stats = t.raw("stats") as HeroStat[];
  const card = t.raw("card") as HeroCardRow[];
  const clients = t.raw("clients") as string[];

  return (
    <div className={className}>
      <section
        id={SECTION_IDS.top}
        aria-labelledby="hero-title"
        className="page-wrap grid items-center gap-[clamp(40px,5vw,64px)] pt-[clamp(40px,6vw,64px)] pb-[clamp(48px,6vw,64px)] desk:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
      >
        <div className="flex min-w-0 flex-col gap-7">
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
            <span className="inline-flex min-h-8 items-center gap-2 rounded-full bg-ok-bg px-3 font-mono text-[13px] text-ok-fg">
              <span aria-hidden className="size-2 shrink-0 rounded-full bg-ok-dot" />
              {t("available")}
            </span>
            <span className="font-mono text-[13px] text-muted">{t("location")}</span>
          </div>

          <h1
            id="hero-title"
            className="m-0 text-[clamp(34px,5.2vw,70px)] font-semibold leading-[1.05] tracking-[-0.035em]"
          >
            {t.rich("title", {
              accent: (chunks) => <span className="text-link">{chunks}</span>,
            })}
          </h1>

          <p className="m-0 max-w-155 text-[clamp(17px,1.6vw,19px)] leading-relaxed text-fg-2">
            {t("lead")}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={BOOKING_DISCOVERY_CALL_URL}
              className={clsx(buttonClass(), "max-sm:flex-1 max-sm:basis-full")}
              onClick={() =>
                plausible("Book Discovery Call Clicked", { props: { source: "hero" } })
              }
            >
              {t("ctaPrimary")}
              <ArrowRight className="size-4.5" aria-hidden />
            </a>
            <a
              href={SECTION_ROUTES.caseStudies}
              className={clsx(buttonClass({ variant: "ghost" }), "max-sm:flex-1 max-sm:basis-full")}
            >
              {t("ctaSecondary")}
            </a>
          </div>

          <dl
            aria-label={t("statsLabel")}
            className="m-0 grid max-w-140 grid-cols-2 gap-4 border-t border-line-soft pt-6 sm:gap-6"
          >
            {stats.map((stat) => (
              <div key={stat.value} className="flex min-w-0 flex-col-reverse gap-1.5">
                <dt className="text-[13.5px] text-muted sm:text-[14.5px]">{stat.label}</dt>
                <dd className="m-0 whitespace-nowrap text-[clamp(30px,3.4vw,40px)] font-semibold leading-none tracking-[-0.03em]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <ul aria-label={t("socialLabel")} className="-ml-2.5 flex flex-wrap gap-x-2 gap-y-1">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center px-2.5 font-mono text-[13px] text-muted"
                  onClick={() => link.event && plausible(link.event)}
                >
                  {link.label}
                  <span aria-hidden>&nbsp;↗</span>
                  <NewTabHint />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full flex-col sm:max-w-110 desk:max-w-none">
          <div className="relative aspect-[4/4.7] overflow-hidden rounded-3xl bg-media">
            <Portrait
              alt={t("photoAlt")}
              fill
              fetchPriority="high"
              sizes="(min-width: 1081px) 480px, (min-width: 641px) 440px, 100vw"
              className="object-cover object-[50%_15%]"
            />
          </div>
          <dl className="relative mx-3 -mt-12 grid grid-cols-[72px_minmax(0,1fr)] gap-x-3 gap-y-2 rounded-[14px] border border-line bg-surface px-4 py-3.5 font-mono text-[13px] shadow-float sm:mx-5 sm:-mt-15 sm:grid-cols-[88px_minmax(0,1fr)] sm:px-4.5 sm:py-4">
            {card.map((row) => (
              <div key={row.label} className="contents">
                <dt className="text-muted">{row.label}</dt>
                <dd className="m-0 text-fg">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="clients-title"
        className="page-wrap flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line-soft py-8"
      >
        <h2 id="clients-title" className="kicker m-0 font-normal">
          {t("clientsTitle")}
        </h2>
        <ul className="flex flex-wrap gap-x-9 gap-y-3 text-[clamp(17px,1.8vw,21px)] font-semibold tracking-[-0.02em] text-faint">
          {clients.map((client) => (
            <li key={client}>{client}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
