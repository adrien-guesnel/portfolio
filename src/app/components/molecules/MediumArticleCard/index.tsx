"use client";

import clsx from "clsx";

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
      <article
        className={clsx(
          "group flex h-full flex-col rounded-[24px] border border-base-200 bg-base-100/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_25px_70px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-[#0B1325]/70",
          className,
        )}
      >
        <div className="flex items-center gap-2">
          <span className={clsx("h-2 w-2 rounded-full", dot)} />
          <span className={clsx("text-xs font-bold uppercase", text)}>{tag}</span>
        </div>

        <h3 className="mt-4 text-2xl font-semibold leading-tight text-base-content dark:text-light-brown">
          {title}
        </h3>

        <p className="body-medium mt-4 flex-1 text-base-content/70 line-clamp-3 dark:text-slate-300">
          {snippet}
        </p>

        <div className="mt-6 border-t border-base-200/60 pt-4 text-sm text-base-content/60 dark:border-white/10">
          <div className="flex items-center justify-between font-medium">
            <span>{readTime}</span>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-base-300 transition group-hover:border-primary group-hover:bg-primary/10 dark:border-white/20">
              <svg
                viewBox="0 0 18 18"
                role="presentation"
                className="h-4 w-4 text-base-content transition group-hover:text-primary"
              >
                <path
                  d="M3.5 9h11m0 0-4-4m4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
