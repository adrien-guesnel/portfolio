"use client";

import { useTranslations } from "next-intl";

import { ChipList } from "@components/atoms/Chip";
import SectionHeading from "@components/molecules/SectionHeading";
import { SECTION_IDS } from "@/src/app/lib/Routes";
import { useReveal } from "@/src/app/lib/useReveal";

interface ExpertiseRow {
  label: string;
  items: string[];
}

export default function Expertise() {
  const t = useTranslations("Expertise");
  const rows = t.raw("rows") as ExpertiseRow[];
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.expertise}
      aria-labelledby="expertise-title"
      className="page-wrap section-y"
    >
      <SectionHeading id="expertise-title" kicker={t("kicker")} title={t("title")} />
      <div className="border-t border-line-soft">
        {rows.map((row) => (
          <div
            data-reveal
            key={row.label}
            className="grid gap-2.5 border-b border-line-soft py-5.5 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-x-8 sm:gap-y-3"
          >
            <h3 className="kicker m-0 pt-1.5 font-normal">{row.label}</h3>
            <ChipList items={row.items} className="min-w-0" />
          </div>
        ))}
      </div>
    </section>
  );
}
