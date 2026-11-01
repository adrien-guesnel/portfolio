import clsx from "clsx";

import NewTabHint from "@components/atoms/NewTabHint";

export interface MediumArticleCardProps {
  title: string;
  url: string;
  tag: string;
  readTime: string;
  readLabel: string;
  className?: string;
}

export function MediumArticleCard({
  title,
  url,
  tag,
  readTime,
  readLabel,
  className,
}: MediumArticleCardProps) {
  return (
    <a
      data-reveal
      href={url}
      target="_blank"
      rel="noreferrer"
      className={clsx(
        "group flex h-full min-w-0 flex-col gap-4 rounded-[18px] border border-line bg-surface p-[clamp(22px,2.4vw,28px)] text-fg transition-[border-color,translate] duration-300 ease-out hover:border-line-strong motion-safe:hover:-translate-y-0.5",
        className,
      )}
    >
      <span className="font-mono text-[12.5px] text-muted">
        {tag} · {readTime}
      </span>
      <span className="text-lg font-semibold leading-snug">{title}</span>
      <span aria-hidden className="mt-auto text-link">
        {readLabel}{" "}
        <span className="inline-block transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5">
          ↗
        </span>
      </span>
      <NewTabHint />
    </a>
  );
}
