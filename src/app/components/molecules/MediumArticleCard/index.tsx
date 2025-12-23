"use client";

import clsx from "clsx";
import { ArrowRightCircle } from "iconoir-react";

import Card from "@components/atoms/Card";
import { Link } from "@/src/i18n/routing";

export interface MediumArticleCardProps {
  title: string;
  snippet: string;
  url: string;
  tag: string;
  readTime: string;
  tagColor?: TagColor;
  className?: string;
}

const TAG_COLOR_STYLES = {
  primary: { dot: "bg-primary", text: "text-primary" },
  secondary: { dot: "bg-secondary", text: "text-secondary" },
  accent: { dot: "bg-accent", text: "text-accent" },
  info: { dot: "bg-info", text: "text-info" },
  success: { dot: "bg-success", text: "text-success" },
  warning: { dot: "bg-warning", text: "text-warning" },
  error: { dot: "bg-error", text: "text-error" },
} as const;

export type TagColor = keyof typeof TAG_COLOR_STYLES;

export function MediumArticleCard({
  title,
  snippet,
  url,
  tag,
  readTime,
  tagColor = "primary",
  className,
}: MediumArticleCardProps) {
  const { dot, text } = TAG_COLOR_STYLES[tagColor] ?? TAG_COLOR_STYLES.primary;
  return (
    <Link href={url} target="_blank" rel="noreferrer" className="h-full">
      <Card className={clsx("flex flex-col group h-full", className)}>
        <div className="flex items-center gap-2">
          <span className={clsx("h-2 w-2 rounded-full", dot)} />
          <span className={clsx("text-xs font-bold uppercase", text)}>{tag}</span>
        </div>

        <h3 className="mt-4 text-2xl font-semibold leading-tight text-base-content dark:text-light-brown">
          {title}
        </h3>

        <p className="body-medium mt-4 flex-1 text-gray line-clamp-3 dark:text-slate-300">
          {snippet}
        </p>

        <div className="mt-6 border-t border-base-200/60 pt-4 text-sm text-gray dark:border-white/10">
          <div className="flex items-center justify-between font-medium">
            <span>{readTime}</span>
            <ArrowRightCircle className="text-gray group-hover:text-primary h-8 w-8" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
