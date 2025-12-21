"use client";

import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";

import NestLogo from "@components/Icons/nest";
import NextLogo from "@components/Icons/next";
import NodeLogo from "@components/Icons/node";
import ReactLogo from "@components/Icons/react";
import StorybookLogo from "@components/Icons/storybook";
import TailwindLogo from "@components/Icons/tailwind";
import TypescriptLogo from "@components/Icons/typescript";
import SkillsImg from "@public/img/skills.webp";
import { SECTION_IDS } from "@/src/app/lib/Routes";

interface SkillsProps {
  className?: string;
}

export default function Skills({ className }: SkillsProps) {
  const t = useTranslations("Skills");
  const logoClass = "h-12 object-contain w-fit";
  const skillsSectionId = SECTION_IDS.skills;

  return (
    <div id={skillsSectionId} className={clsx("", className)}>
      <div className="flex flex-row justify-evenly gap-4 pt-12 lg:gap-10">
        <TypescriptLogo className={logoClass} />
        <TailwindLogo className={logoClass} />
        <NextLogo className={logoClass} />
        <NestLogo className={logoClass} />
        <NodeLogo className={logoClass} />
        <ReactLogo className={logoClass} />
        <StorybookLogo className={logoClass} />
      </div>
      <div className="dark:text-light-brown container mx-auto mt-16 flex max-w-3xl flex-col items-center justify-center text-center ">
        <h2 className="h2">{t("title")}</h2>
        <p className="body-large mt-6">{t("description")}</p>

        <Image
          src={SkillsImg}
          alt="Adrien with his headphones"
          placeholder="blur"
          className="mt-10 max-w-lg object-contain"
        />
      </div>
    </div>
  );
}
