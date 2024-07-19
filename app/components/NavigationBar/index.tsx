"use client"

import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import Link from "next/link"

import Flag, { COUNTRIES } from "@components/Flag"
import Logo from "@components/Logo"

interface NavigationBarProps {
  onThemeChange: () => void
  className?: string
  themeMode?: "light" | "dark"
}

export default function NavigationBar({
  onThemeChange,
  className,
  themeMode = "light",
}: NavigationBarProps) {
  const t = useTranslations("navigationBar")

  return (
    <div
      className={clsx(
        "rounded-2xl flex flex-row justify-between items-center px-4 py-2 max-w-5xl mx-auto sticky top-2 z-50 shadow-sm bg-white text-black dark:bg-black dark:text-lightBrown",
        className,
      )}
    >
      <Link href={"/"} title={t("homepage")}>
        <Logo themeMode={themeMode} className="h-8 w-8" />
      </Link>
      <nav>
        <ul className="flex flex-row gap-5">
          <li className="underline-animation">{t("introduction")}</li>
          <li className="underline-animation">{t("projects")}</li>
          <li className="underline-animation">{t("references")}</li>
        </ul>
      </nav>
      <div className="flex flex-row gap-5 items-center">
        <Link
          className="button button-contained"
          href={"#"}
          title={t("contact")}
        >
          {t("contact")}
        </Link>
        <div className="vertical-separator h-7"></div>
        <div className="flex flex-row gap-5 items-center ">
          <Flag countryCode={COUNTRIES.United_Kingdom} />
          <FontAwesomeIcon
            icon={themeMode === "light" ? faSun : faMoon}
            onClick={onThemeChange}
            className="w-7 h-7 cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}
