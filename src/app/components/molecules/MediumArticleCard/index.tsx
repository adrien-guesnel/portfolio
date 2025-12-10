"use client";

import clsx from "clsx";
import type { StaticImageData } from "next/image";
import Image from "next/image";

export interface MediumArticleCardProps {
  image: StaticImageData | string;
  title: string;
  snippet: string;
  url: string;
  buttonLabel?: string;
  className?: string;
}

export function MediumArticleCard({
  image,
  title,
  snippet,
  url,
  buttonLabel = "Read on Medium",
  className,
}: MediumArticleCardProps) {
  return (
    <article
      className={clsx(
        "flex w-full flex-col overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-card dark:border-white/10 dark:bg-dark-brown",
        className,
      )}
    >
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={`Cover for ${title}`}
          fill
          sizes="(min-width: 1024px) 400px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="text-xl font-semibold text-black dark:text-light-brown">{title}</h3>
        <p className="body-small text-slate-600 dark:text-slate-200 line-clamp-3" title={snippet}>
          {snippet}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="button button-contained self-start"
        >
          {buttonLabel}
        </a>
      </div>
    </article>
  );
}
