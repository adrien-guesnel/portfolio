import { useTranslations } from "next-intl";

import NewTabHint from "@components/atoms/NewTabHint";
import {
  MediumArticleCard,
  type MediumArticleCardProps,
} from "@components/molecules/MediumArticleCard";
import SectionHeading from "@components/molecules/SectionHeading";
import { MEDIUM_URL } from "@/src/app/lib/constants";
import { SECTION_IDS } from "@/src/app/lib/Routes";

type ArticleData = Omit<MediumArticleCardProps, "className" | "readLabel">;

export default function Articles() {
  const t = useTranslations("Articles");
  const articles = t.raw("articles") as ArticleData[];

  return (
    <section
      id={SECTION_IDS.articles}
      aria-labelledby="articles-title"
      className="page-wrap section-y"
    >
      <SectionHeading
        id="articles-title"
        kicker={t("kicker")}
        title={t("title")}
        aside={
          <a
            href={MEDIUM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center font-semibold text-link"
          >
            {t("allArticles")}
            <span aria-hidden>&nbsp;↗</span>
            <NewTabHint />
          </a>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 sm:[&>:last-child:nth-child(odd)]:col-span-full desk:grid-cols-3 desk:[&>:last-child:nth-child(odd)]:col-span-1">
        {articles.map((article) => (
          <MediumArticleCard key={article.url} {...article} readLabel={t("read")} />
        ))}
      </div>
    </section>
  );
}
