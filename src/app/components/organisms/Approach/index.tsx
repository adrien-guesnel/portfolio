import { Cube, Group, ShieldCheck, TaskList } from "iconoir-react";
import { useTranslations } from "next-intl";

import SectionHeading from "@components/molecules/SectionHeading";
import { SECTION_IDS } from "@/src/app/lib/Routes";

interface ApproachCard {
  title: string;
  text: string;
  proofSource: string;
  proof: string;
}

const ICONS = [Cube, TaskList, Group, ShieldCheck];

export default function Approach() {
  const t = useTranslations("Approach");
  const cards = t.raw("cards") as ApproachCard[];

  return (
    <section
      id={SECTION_IDS.approach}
      aria-labelledby="approach-title"
      className="border-y border-line-soft bg-band"
    >
      <div className="page-wrap section-y">
        <SectionHeading id="approach-title" kicker={t("kicker")} title={t("title")} />
        <div className="grid gap-4 sm:grid-cols-2 desk:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <article
                key={card.title}
                className="flex min-w-0 flex-col gap-4 rounded-[18px] border border-line bg-surface p-[clamp(22px,2.4vw,28px)]"
              >
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden
                    className="inline-flex size-11 items-center justify-center rounded-xl bg-link-soft text-link"
                  >
                    <Icon className="size-5.5" />
                  </span>
                  <span aria-hidden className="font-mono text-xs text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="m-0 text-xl font-semibold tracking-[-0.01em]">{card.title}</h3>
                <p className="m-0 text-[15px] text-fg-2">{card.text}</p>
                <p className="m-0 mt-auto border-t border-dashed border-line-strong pt-4 text-sm text-fg-2">
                  <span className="font-mono text-link">
                    <span aria-hidden>→ </span>
                    {card.proofSource}
                  </span>
                  <br />
                  {card.proof}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
