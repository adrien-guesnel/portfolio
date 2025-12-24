import clsx from "clsx";
import { LightBulbOn, Rocket, Strategy } from "iconoir-react";
import { useTranslations } from "next-intl";

import PhilosophyCard from "@components/molecules/PhilosophyCard";
import RichText from "@components/RichText";

const pillarIcons = [Strategy, LightBulbOn, Rocket] as const;

export default function EngineeringPhilosophy({ className }: { className?: string }) {
  const t = useTranslations("EngineeringPhilosophy");

  const translatedPillars = pillarIcons.map((Icon, index) => ({
    title: t(`pillars.${index}.title`),
    description: t(`pillars.${index}.description`),
    icon: <Icon className="h-5 w-5" aria-hidden />,
  }));

  return (
    <section className={clsx("py-16 lg:py-24", className)} aria-labelledby="philosophy-heading">
      <div className="container mx-auto px-6 lg:px-0">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 text-center lg:text-left">
          <div className="space-y-6">
            <h2
              id="philosophy-heading"
              className="text-3xl font-semibold leading-tight text-base-content md:text-4xl"
            >
              <RichText>{(tags) => t.rich("title", tags)}</RichText>
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray lg:mx-0">{t("description")}</p>
          </div>

          <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {translatedPillars.map((pillar, index) => (
              <PhilosophyCard
                key={`${pillar.title}-${index}`}
                title={pillar.title}
                description={pillar.description}
                icon={pillar.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
