"use client";

import clsx from "clsx";
import { ArrowUpRight } from "iconoir-react";
import { useTranslations } from "next-intl";

import {
  MediumArticleCard,
  type MediumArticleCardProps,
} from "@components/molecules/MediumArticleCard";
import { MEDIUM_URL } from "@/src/app/lib/constants";
import { SECTION_IDS } from "@/src/app/lib/Routes";
import { Link } from "@/src/i18n/routing";

type ArticleData = Omit<MediumArticleCardProps, "className">;

export default function Articles({ className }: { className?: string }) {
  const t = useTranslations("Articles");

  const articles = t.raw("articles") as ArticleData[];

  const articlesSectionId = SECTION_IDS.articles;

  return (
    <section
      id={articlesSectionId}
      className={clsx("bg-beige dark:bg-dark-brown py-12", className)}
      aria-labelledby="articles-heading"
    >
      <div className="container mx-auto flex flex-col gap-10 px-6 lg:px-0">
        <div>
          <h2
            id="articles-heading"
            className="mt-4 text-3xl font-semibold leading-tight  dark:text-light-brown"
          >
            {t("title")}
          </h2>
          <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-end">
            <p className="body-large mt-3 text-gray max-w-3xl">{t("description")}</p>
            <Link className="flex gap-2 text-gray items-center" href={MEDIUM_URL} target="_blank">
              {t("readMoreOnMedium")} <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.title}>
              <MediumArticleCard {...article} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
