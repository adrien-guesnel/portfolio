"use client"

import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRef, useState } from "react"

import { ThemeMode } from "@/app/lib/constants"
import { usePathname, useRouter } from "@/app/navigation"

import Flag, { COUNTRIES } from "@components/Flag"
import Logo from "@components/Logo"

interface NavigationBarProps {
  onThemeChange: () => void
  className?: string
  themeMode?: ThemeMode
  locale: string
}

export default function NavigationBar({
  onThemeChange,
  className,
  themeMode = ThemeMode.Light,
  locale,
}: NavigationBarProps) {
  const t = useTranslations("navigationBar")
  const router = useRouter()
  const pathname = usePathname()
  const [isDropdownLanguagesOpen, setIsDropdownLanguagesOpen] = useState(false)

  const buttonRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const switchLanguage = async (newLocale: "en" | "fr") => {
    await router.replace(pathname, { locale: newLocale })
    setIsDropdownLanguagesOpen(false)
  }

  const toggleDropdownLanguages = () => {
    if (!isDropdownLanguagesOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const screenWidth = window.innerWidth
      const dropdownStyle = dropdownRef.current?.style

      if (dropdownStyle) {
        // Calculate the right position for the dropdown
        const rightPosition = screenWidth - buttonRect.right

        dropdownStyle.right = `${rightPosition}px`
      }
    }

    setIsDropdownLanguagesOpen(!isDropdownLanguagesOpen)
  }

  return (
    <>
      <div
        className={clsx(
          "lg:rounded-2xl h-16 flex flex-row justify-between items-center px-4 py-2 max-w-5xl mx-auto lg:top-2 z-50 shadow-sm bg-white text-black dark:bg-black dark:text-lightBrown fixed left-1/2 transform -translate-x-1/2 container",
          className,
        )}
      >
        <Link href={"/"} title={t("homepage")}>
          <Logo themeMode={themeMode} className="h-8 w-8" />
        </Link>
        {/* <nav>
          <ul className="flex flex-row gap-5">
            <li className="underline-animation body-large">
              {t("skills")}
            </li>
          </ul>
        </nav> */}
        <div className="flex flex-row gap-5 items-center">
          <Link
            className="button button-contained"
            href={"#contact"}
            title={t("contact")}
          >
            {t("contact")}
          </Link>
          <div className="vertical-separator h-7"></div>
          <div className="flex flex-row gap-5 items-center" ref={buttonRef}>
            <Flag
              countryCode={
                locale === "fr" ? COUNTRIES.France : COUNTRIES.United_Kingdom
              }
              onClick={(event) => toggleDropdownLanguages()}
              className="cursor-pointer"
            />
            <FontAwesomeIcon
              icon={themeMode === "light" ? faSun : faMoon}
              onClick={onThemeChange}
              className="w-7 h-7 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div
        ref={dropdownRef}
        className={clsx(
          "bg-white dark:bg-black text-black dark:text-white rounded-3xl p-5 fixed top-[5rem] z-50 w-fit shadow-sm",
          isDropdownLanguagesOpen ? "flex" : "hidden",
        )}
      >
        <ul className=" flex flex-col gap-4">
          <li
            className="flex flex-row gap-5 items-center cursor-pointer"
            onClick={() => switchLanguage("fr")}
          >
            <Flag countryCode={COUNTRIES.France} />
            <p className="body-large">{t("french")}</p>
          </li>
          <li
            className="flex flex-row gap-5 items-center cursor-pointer"
            onClick={() => switchLanguage("en")}
          >
            <Flag countryCode={COUNTRIES.United_Kingdom} />
            <p className="body-large">{t("english")}</p>
          </li>
        </ul>
      </div>
    </>
  )
}
