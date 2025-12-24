"use client";

import clsx from "clsx";
import { ArrowRight } from "iconoir-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import AppMockup from "@components/molecules/AppMockup";
import RichText from "@components/RichText";
import HeroImg from "@public/img/hero.webp";
import { BOOKING_DISCOVERY_CALL_URL } from "@/src/app/lib/constants";
import { SECTION_IDS, SECTION_ROUTES } from "@/src/app/lib/Routes";

interface HeroProps {
  className?: string;
}

export default function Hero({ className }: HeroProps) {
  const t = useTranslations("Hero");

  const homeSectionId = SECTION_IDS.home;
  const EXPERIENCE_START_YEAR = 2017;
  const MIN_MISSIONS_DONE = 5;

  const yearsOfExperience = Math.max(1, new Date().getFullYear() - EXPERIENCE_START_YEAR);

  return (
    <section id={homeSectionId} className={clsx("", className)} aria-label="Hero">
      <div className="container mx-auto flex flex-col-reverse items-center justify-center pt-32 lg:flex-row gap-8">
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
            <Link href={BOOKING_DISCOVERY_CALL_URL} className="btn btn-primary">
              {t("bookingDiscoveryCall")}
            </Link>

            <Link href={SECTION_ROUTES.skills} className="btn btn-outlined">
              {t("ViewMySkills")}
              <ArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="divider my-8" aria-hidden />

          <dl className="grid max-w-md grid-cols-2 gap-8">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray">
                {t("experienceLabel")}
              </dt>
              <dd className="mt-2 text-2xl font-semibold text-base-content">
                {t("experienceValue", { years: yearsOfExperience })}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray">
                {t("missionsLabel")}
              </dt>
              <dd className="mt-2 text-2xl font-semibold text-base-content">
                {t("missionsValue", { missions: MIN_MISSIONS_DONE })}
              </dd>
            </div>
          </dl>
        </div>
        <AppMockup image={HeroImg} className="h-75 lg:h-112.5" alt="Adrien with his computer" />
      </div>
    </section>
  );
}
