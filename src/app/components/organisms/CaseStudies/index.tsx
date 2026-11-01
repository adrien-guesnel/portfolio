"use client";

import clsx from "clsx";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";

import { ChipList } from "@components/atoms/Chip";
import NewTabHint from "@components/atoms/NewTabHint";
import Period from "@components/atoms/Period";
import SectionHeading from "@components/molecules/SectionHeading";
import BloomCareLogo from "@public/img/projects/bloom-care.png";
import LinkupLogo from "@public/img/projects/linkup.webp";
import LoopAeroScreenshot from "@public/img/projects/loop-aero.png";
import TellDemScreenshot from "@public/img/projects/telldem.png";
import { usePlausibleEvents } from "@/src/app/lib/plausible";
import { SECTION_IDS } from "@/src/app/lib/Routes";

interface CaseMeta {
  company: string;
  sector: string;
  period: string;
}

interface FeaturedCase extends CaseMeta {
  title: string;
  imageAlt: string;
  url: string;
  linkLabel: string;
  phases: { title: string; items: string[] }[];
  tags: string[];
}

interface CaseCard extends CaseMeta {
  key: keyof typeof CARD_MEDIA;
  title: string;
  imageAlt: string;
  items: string[];
  tags: string[];
}

const CARD_MEDIA = {
  "bloom-care": { src: BloomCareLogo, variant: "logo" },
  linkup: { src: LinkupLogo, variant: "invert-on-dark" },
  telldem: { src: TellDemScreenshot, variant: "cover" },
} as const satisfies Record<string, { src: StaticImageData; variant: string }>;

function CaseMetaLine({ company, sector, period }: CaseMeta) {
  return (
    <p className="m-0 font-mono text-[12.5px] text-muted">
      {company} · {sector} · <Period value={period} />
    </p>
  );
}

export default function CaseStudies() {
  const t = useTranslations("CaseStudies");
  const plausible = usePlausibleEvents();
  const featured = t.raw("featured") as FeaturedCase;
  const cards = t.raw("cards") as CaseCard[];

  return (
    <section
      id={SECTION_IDS.caseStudies}
      aria-labelledby="case-studies-title"
      className="page-wrap section-y"
    >
      <SectionHeading
        id="case-studies-title"
        kicker={t("kicker")}
        title={t("title")}
        aside={<p className="m-0 max-w-105 text-[17px] text-fg-2">{t("description")}</p>}
      />

      <article className="mb-4 grid overflow-hidden rounded-3xl border border-line bg-surface desk:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <div className="relative aspect-video bg-media desk:aspect-auto desk:min-h-95">
          <Image
            src={LoopAeroScreenshot}
            alt={featured.imageAlt}
            fill
            sizes="(min-width: 1081px) 530px, 100vw"
            className="object-cover object-left-top"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-5.5 p-[clamp(24px,3.4vw,40px)]">
          <CaseMetaLine {...featured} />
          <h3 className="m-0 text-[clamp(23px,2.6vw,34px)] font-semibold leading-[1.15] tracking-[-0.025em]">
            {featured.title}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {featured.phases.map((phase) => (
              <div key={phase.title} className="flex min-w-0 flex-col gap-2.5">
                <h4 className="m-0 font-mono text-[13px] font-normal text-link">{phase.title}</h4>
                <ul className="m-0 flex list-disc flex-col gap-2 pl-4.5 text-[15px] text-fg-2">
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <ChipList items={featured.tags} label={t("tagsLabel")} />
          <a
            href={featured.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 self-start font-semibold text-link"
            onClick={() =>
              plausible("Project Card Clicked", {
                props: { project: featured.company, link: featured.url },
              })
            }
          >
            {featured.linkLabel}
            <span aria-hidden>&nbsp;↗</span>
            <NewTabHint />
          </a>
        </div>
      </article>

      <div className="grid gap-4 sm:grid-cols-2 sm:[&>:last-child:nth-child(odd)]:col-span-full desk:grid-cols-3 desk:[&>:last-child:nth-child(odd)]:col-span-1">
        {cards.map((card) => {
          const media = CARD_MEDIA[card.key];
          return (
            <article
              key={card.key}
              className="flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-line bg-surface"
            >
              <div
                className={clsx(
                  "relative h-45",
                  media.variant === "logo"
                    ? "flex items-center justify-center border-b border-line-soft p-8"
                    : "bg-media",
                )}
              >
                {media.variant === "logo" ? (
                  <Image
                    src={media.src}
                    alt={card.imageAlt}
                    className="h-auto w-[62%] max-w-65"
                    sizes="260px"
                  />
                ) : (
                  <Image
                    src={media.src}
                    alt={card.imageAlt}
                    fill
                    sizes="(min-width: 1081px) 390px, (min-width: 641px) 50vw, 100vw"
                    className={clsx(
                      "object-cover object-top",
                      media.variant === "invert-on-dark" && "invert-on-dark",
                    )}
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3.5 p-[clamp(20px,2.2vw,26px)]">
                <CaseMetaLine company={card.company} sector={card.sector} period={card.period} />
                <h3 className="m-0 text-[21px] font-semibold leading-tight tracking-[-0.015em]">
                  {card.title}
                </h3>
                <ul className="m-0 flex list-disc flex-col gap-1.5 pl-4.5 text-[14.5px] text-fg-2">
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ChipList items={card.tags} label={t("tagsLabel")} className="mt-auto pt-1.5" />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
