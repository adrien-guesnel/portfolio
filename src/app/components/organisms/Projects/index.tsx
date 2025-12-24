"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";

import ProjectCard, { type ProjectCardProps } from "@components/molecules/ProjectCard";
import { GITHUB_URL } from "@/src/app/lib/constants";
import { SECTION_IDS } from "@/src/app/lib/Routes";

type LocalizedProjectData = Omit<ProjectCardProps, "cardLabels">;

export default function Projects({ className }: { className?: string }) {
  const t = useTranslations("Projects");
  const [scope, setScope] = useState<"professional" | "personal">("professional");

  const professionalProjects = t.raw("professionalProjects") as LocalizedProjectData[];
  const personalProjects = t.raw("personalProjects") as LocalizedProjectData[];

  const displayedProjects = scope === "professional" ? professionalProjects : personalProjects;

  return (
    <section
      className={clsx("py-16 lg:py-20 text-base-content", className)}
      aria-labelledby="projects-heading"
      id={SECTION_IDS.projects}
    >
      <div className="container mx-auto flex flex-col gap-10 px-4">
        <header className="flex flex-col gap-3 lg:gap-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2
                id="projects-heading"
                className="text-3xl font-semibold text-base-content lg:text-4xl"
              >
                {t("heading")}
              </h2>
              <p className="text-md text-gray mt-2">{t("description")}</p>
            </div>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-primary"
            >
              {t("githubLabel")}
            </a>
          </div>
        </header>
        <div className="flex items-center gap-2 rounded-full border border-base-200/40 bg-base-100/70 p-[0.2rem] shadow-lg shadow-black/30 w-fit">
          <button
            type="button"
            aria-pressed={scope === "professional"}
            className={clsx(
              "relative rounded-full px-5 py-2 text-sm font-semibold transition-colors w-fit",
              scope === "professional"
                ? "bg-primary text-white shadow-[0_20px_40px_rgba(3,5,20,0.45)]"
                : "text-gray",
            )}
            onClick={() => setScope("professional")}
          >
            {t("professionalLabel")}
          </button>
          <button
            type="button"
            aria-pressed={scope === "personal"}
            className={clsx(
              "relative w-fit rounded-full px-5 py-2 text-sm font-semibold transition-colors",
              scope === "personal"
                ? "bg-primary text-white shadow-[0_20px_40px_rgba(3,5,20,0.45)]"
                : "text-gray",
            )}
            onClick={() => setScope("personal")}
          >
            {t("personalLabel")}
          </button>
        </div>
        <div className="grid gap-8">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
