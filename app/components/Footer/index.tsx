"use client"

import {
  faGithub,
  faLinkedin,
  faMedium,
} from "@fortawesome/free-brands-svg-icons"
import { faMoon } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTranslations } from "next-intl"

import {
  GITHUB_URL,
  HIRE_ME_URL,
  LIKEDIN_URL,
  MEDIUM_URL,
  ThemeMode,
} from "@/app/lib/constants"

import Flag, { COUNTRIES } from "@components/Flag"
import Logo from "@components/Logo"

import Malt from "./Malt"

interface FooterProps {
  themeMode: ThemeMode
}

export default function Footer({ themeMode = ThemeMode.Light }: FooterProps) {
  const t = useTranslations("footer")

  const currentYear = new Date().getFullYear().toString()

  return (
    <div className="flex flex-col items-center justify-between gap-6 bg-white p-12 text-black lg:flex-row lg:gap-0 dark:bg-black dark:text-white">
      <div className="flex justify-center gap-5">
        <a href={LIKEDIN_URL} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="h-6" />
        </a>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faGithub} className="h-6" />
        </a>
        <a href={HIRE_ME_URL} target="_blank" rel="noreferrer">
          <Malt className="h-6 w-6 fill-black dark:fill-white" />
        </a>
        <a href={MEDIUM_URL} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faMedium} className="h-6" />
        </a>
      </div>
      <Logo className="hidden h-10 lg:flex" themeMode={themeMode} />
      <p>{t("copyright", { currentYear })}</p>
    </div>
  )
}
