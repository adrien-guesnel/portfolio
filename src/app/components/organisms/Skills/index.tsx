"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";

import SkillBadge from "@components/atoms/SkillBadge";
import { SECTION_IDS } from "@/src/app/lib/Routes";

interface SkillsProps {
  className?: string;
}

export default function Skills({ className }: SkillsProps) {
  const t = useTranslations("Skills");
  const skillsSectionId = SECTION_IDS.skills;

  const backendSkills = [
    "Node.js",
    "Nest.js",
    "PostgreSQL",
    "Prisma",
    "Docker",
    "CI/CD",
    "MongoDB",
    "GraphQL",
    "Rest API",
  ];

  const frontendSkills = [
    "React.js",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "React Router",
    "Vite",
    "Figma",
    "Storybook",
    "Playwright",
    "Jest",
  ];

  return (
    <section id={skillsSectionId} className={clsx("py-16 lg:py-24", className)}>
      <div className="container mx-auto px-6 lg:px-0">
        <header className="mb-10">
          <h2 className="text-3xl font-semibold leading-tight text-base-content lg:text-4xl">
            <span className="border-l-4 border-primary pl-4">{t("heading")}</span>
          </h2>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                <span className="h-2 w-2 rounded-sm bg-current" />
              </span>
              <h3 className="text-lg font-semibold text-base-content">{t("backendTitle")}</h3>
            </div>
            <div className="rounded-[24px] border border-base-300 bg-base-200/20 p-6">
              <div className="flex flex-wrap gap-3">
                {backendSkills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-secondary/30 bg-secondary/10 text-secondary">
                <span className="h-2 w-2 rounded-sm bg-current" />
              </span>
              <h3 className="text-lg font-semibold text-base-content">{t("frontendTitle")}</h3>
            </div>
            <div className="rounded-[24px] border border-base-300 bg-base-200/20 p-6">
              <div className="flex flex-wrap gap-3">
                {frontendSkills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
