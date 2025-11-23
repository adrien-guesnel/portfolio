"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import RichText from "@components/RichText";
import HeroImg from "@public/img/hero.webp";
import { HIRE_ME_URL } from "@/src/app/lib/constants";

interface HeroProps {
  className?: string;
}

export default function Hero({ className }: HeroProps) {
  const t = useTranslations("Hero");

  return (
    <div className={clsx("bg-beige dark:bg-dark-brown", className)}>
      <div className="dark:text-light-brown container mx-auto flex flex-col items-center justify-center pt-32 text-black lg:flex-row">
        <div className="flex max-w-2xl flex-col lg:pb-20">
          <h1 className="text-4xl font-bold lg:text-6xl">
            <RichText>{(tags) => t.rich("title", tags)}</RichText>
          </h1>
          <p className="body-large mt-6">{t("description")}</p>
          <div className="felx-row mt-6 flex gap-3">
            <Link href={HIRE_ME_URL} className="button button-contained">
              {t("hireMe")}
            </Link>

            {/* <Link href="#" className="button button-outlined">
            {t("discoverMySkills")}
          </Link> */}
          </div>
        </div>
        <div className="max-w-lg">
          <Image src={HeroImg} alt="Adrien with his computer" placeholder="blur" />
        </div>
      </div>
    </div>
  );
}
