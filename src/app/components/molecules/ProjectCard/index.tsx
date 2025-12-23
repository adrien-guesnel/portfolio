import { ArrowUpRight } from "iconoir-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import Card from "@components/atoms/Card";
import SkillBadge from "@components/atoms/SkillBadge";

export interface ProjectCardProps {
  title: string;
  role: string;
  challenge: string;
  solution: string;
  impact: string[];
  tags: string[];
  projectUrl?: string;
  githubUrl?: string;
  imageLabel: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function ProjectCard({
  title,
  role,
  challenge,
  solution,
  impact,
  tags,
  projectUrl,
  githubUrl,
  imageLabel,
  imageSrc,
  imageAlt,
}: ProjectCardProps) {
  const t = useTranslations("ProjectCard");

  const actionBase =
    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition";
  const primaryAction = `${actionBase} border border-primary/30 bg-primary/10 text-primary hover:border-primary/70`;
  const secondaryAction = `${actionBase} border border-base-200/60 text-gray hover:border-base-content/70 hover:text-base-content`;
  return (
    <Card>
      <div className="grid gap-4 lg:grid-cols-[0.65fr_1fr] lg:items-center">
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-base-200/30 bg-base-100/40">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? imageLabel}
              width={480}
              height={360}
              className="h-full w-full object-cover"
              priority
            />
          ) : null}
          <div
            className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/50"
            aria-hidden
          />
          <div className="relative z-10 flex h-full w-full items-end p-4 text-left text-xs font-semibold uppercase tracking-[0.3em] text-base-content">
            {imageLabel}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="flex-1 min-w-0 text-2xl font-semibold text-base-content">{title}</h3>
              <div className="flex flex-wrap items-center justify-end gap-2">
                {projectUrl ? (
                  <a href={projectUrl} target="_blank" rel="noreferrer" className={primaryAction}>
                    {t("visitProject")} <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                ) : null}
                {githubUrl ? (
                  <a href={githubUrl} target="_blank" rel="noreferrer" className={secondaryAction}>
                    {t("visitGitHub")} <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                ) : null}
              </div>
            </div>
            <p className="text-xs uppercase tracking-[0.4em] text-gray">Role · {role}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray">
              <span className="font-semibold text-base-content">{t("challenge")}</span> {challenge}
            </p>
            <p className="text-sm text-gray">
              <span className="font-semibold text-base-content">{t("solution")}</span> {solution}
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray">
            <p className="font-semibold text-base-content">{t("impact")}</p>
            <ul className="flex flex-col gap-1">
              {impact.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 h-1 w-1 rounded-full bg-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <SkillBadge
                key={tag}
                skill={tag}
                className="border-base-200/80 bg-base-100/70 text-base-content"
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
