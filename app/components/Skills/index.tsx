"use client"

import SkillsImg from "@public/img/skills.webp"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import Image from "next/image"

import { ThemeMode } from "@/app/lib/constants"

import NestLogo from "@components/Icons/nest"
import NextLogo from "@components/Icons/next"
import NodeLogo from "@components/Icons/node"
import ReactLogo from "@components/Icons/react"
import StorybookLogo from "@components/Icons/storybook"
import TailwindLogo from "@components/Icons/tailwind"
import TypescriptLogo from "@components/Icons/typescript"

interface SkillsProps {
  themeMode: ThemeMode
  className?: string
}

export default function Skills({ themeMode, className }: SkillsProps) {
  const t = useTranslations("Skills")
  const logoClass = "h-12 object-contain w-fit"

  return (
    <div className={clsx("bg-[#fffdf7] dark:bg-[#311d17]", className)}>
      <div className="flex flex-row justify-evenly gap-4 pt-12 lg:gap-10">
        <TypescriptLogo className={logoClass} themeMode={themeMode} />
        <TailwindLogo className={logoClass} themeMode={themeMode} />
        <NextLogo className={logoClass} themeMode={themeMode} />
        <NestLogo className={logoClass} themeMode={themeMode} />
        <NodeLogo className={logoClass} themeMode={themeMode} />
        <ReactLogo className={logoClass} themeMode={themeMode} />
        <StorybookLogo className={logoClass} themeMode={themeMode} />
      </div>
      <div className="container mx-auto mt-16 flex max-w-3xl flex-col items-center justify-center text-center text-black dark:text-lightBrown">
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
  )
}
