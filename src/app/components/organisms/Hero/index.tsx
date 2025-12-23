"use client";

import clsx from "clsx";
import { ArrowRight } from "iconoir-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import AppMockup from "@components/molecules/AppMockup";
import RichText from "@components/RichText";
import HeroImg from "@public/img/hero.jpeg";
import { HIRE_ME_URL } from "@/src/app/lib/constants";
import { SECTION_IDS, SECTION_ROUTES } from "@/src/app/lib/Routes";

interface HeroProps {
  className?: string;
}

export default function Hero({ className }: HeroProps) {
  const t = useTranslations("Hero");

  const homeSectionId = SECTION_IDS.home;

  return (
    <div id={homeSectionId} className={clsx("", className)}>
      <div className="container mx-auto flex flex-col-reverse items-center justify-center pt-32 lg:flex-row gap-4">
        <div className="flex max-w-2xl flex-col lg:pb-20">
          <div className="uppercase text-xs badge badge-soft badge-primary font-bold">
            <span className="bg-[#23C45F] border-[#3eff85] border rounded-full h-2.5 w-2.5"></span>
            {t("availableForNewProjects")}
          </div>
          <h1 className="text-4xl mt-4 font-bold lg:text-6xl leading-9 lg:leading-14">
            <RichText>{(tags) => t.rich("title", tags)}</RichText>
          </h1>
          <p className="body-large mt-6 text-gray">{t("description")}</p>
          <div className="flex-row mt-6 flex gap-3">
            <Link href={HIRE_ME_URL} className="btn btn-primary">
              {t("hireMe")}
            </Link>

            <Link href={SECTION_ROUTES.skills} className="btn btn-outlined">
              {t("ViewMySkills")}
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
        <AppMockup
          image={HeroImg}
          className="h-[300px] lg:h-[450px]"
          alt="Adrien with his computer"
        />
      </div>
    </div>
  );
}
