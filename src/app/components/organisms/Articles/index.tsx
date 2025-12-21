"use client";

import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useTranslations } from "next-intl";

import {
  MediumArticleCard,
  type MediumArticleCardProps,
} from "@components/molecules/MediumArticleCard";
import { SECTION_IDS } from "@/src/app/lib/Routes";
import { Link } from "@/src/i18n/routing";

export default function Articles({ className }: { className?: string }) {
  const t = useTranslations("Articles");

  const mediumProfileUrl = "https://medium.com/@adrienguesnel";

  const articles: MediumArticleCardProps[] = [
    {
      title: "How i dump eslint/prettier for biome, and you should do the same!",
      snippet:
        "ESLint and Prettier felt like the default, but Biome brought everything into a single, faster toolchain. Here is what the migration looked like.",
      url: `${mediumProfileUrl}/how-i-dump-eslint-prettier-for-biome-and-you-should-do-the-same-8bcdf05fefff`,
      readTime: "5 min",
      tag: "Tooling",
    },
    {
      title: "Deploy your first app on Kubernetes with OpenTofu",
      snippet:
        "It’s always complicated to manually update and deploy changes on Kubernetes infrastructure, let’s simplify that with OpenTofu!",
      url: `${mediumProfileUrl}/deploy-your-first-app-on-kubernetes-with-opentofu-ae7286dece49`,
      readTime: "3 min",
      tag: "Tooling",
    },
    {
      title: "Personnaliser votre terminal avec Oh My Zsh — Tutorial Mac OS",
      snippet:
        "Installer Oh My Zsh pour donner un coup de jeune à votre terminal en noir et blanc.",
      url: `${mediumProfileUrl}/personnaliser-votre-terminal-avec-oh-my-zsh-tutorial-mac-os-da962449f9c7`,
      readTime: "4 min",
      tag: "Tooling",
    },
  ];

  const articlesSectionId = SECTION_IDS.articles;

  return (
    <section
      id={articlesSectionId}
      className={clsx("bg-beige dark:bg-dark-brown py-12", className)}
    >
      <div className="container mx-auto flex flex-col gap-10 px-6 lg:px-0">
        <div>
          <h2 className="mt-4 text-3xl font-semibold leading-tight  dark:text-light-brown">
            {t("title")}
          </h2>
          <div className="flex flex-row justify-between items-end">
            <p className="body-large mt-3 text-gray max-w-3xl">{t("description")}</p>
            <Link
              className="flex gap-2 text-gray items-center"
              href={mediumProfileUrl}
              target="_blank"
            >
              {t("readMoreOnMedium")} <FontAwesomeIcon icon={faExternalLink} />
            </Link>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-2  lg:grid-cols-3">
          {articles.map((article, index) => (
            <MediumArticleCard key={`${article.title}-${index}`} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
