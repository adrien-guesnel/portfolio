"use client";

import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import clsx from "clsx";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

import Flag, { COUNTRIES } from "@components/Flag";
import Logo from "@components/Logo";
import Toggle from "@components/Toggle";
import { ThemeMode } from "@/src/app/lib/constants";
import { usePathname, useRouter } from "@/src/i18n/routing";

interface NavigationBarProps {
  onThemeChange: () => void;
  className?: string;
  themeMode?: ThemeMode;
  locale: string;
}

export default function NavigationBar({
  onThemeChange,
  className,
  themeMode = ThemeMode.Light,
  locale,
}: NavigationBarProps) {
  const t = useTranslations("navigationBar");
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownLanguagesOpen, setIsDropdownLanguagesOpen] = useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLanguage = async (newLocale: "en" | "fr") => {
    await router.replace(pathname, { locale: newLocale });
    setIsDropdownLanguagesOpen(false);
  };

  const toggleDropdownLanguages = () => {
    if (!isDropdownLanguagesOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const dropdownStyle = dropdownRef.current?.style;

      if (dropdownStyle) {
        // Calculate the right position for the dropdown
        const rightPosition = screenWidth - buttonRect.right;

        dropdownStyle.right = `${rightPosition}px`;
      }
    }

    setIsDropdownLanguagesOpen(!isDropdownLanguagesOpen);
  };

  return (
    <>
      <div
        className={clsx(
          "dark:text-light-brown fixed left-1/2 z-50 container mx-auto flex h-16 max-w-5xl -translate-x-1/2 transform flex-row items-center justify-between bg-white px-4 py-2 text-black shadow-xs lg:top-2 lg:rounded-2xl dark:bg-black",
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
        <div className="flex flex-row items-center gap-5">
          <Link className="button button-contained" href={"#contact"} title={t("contact")}>
            {t("contact")}
          </Link>
          <div className="vertical-separator h-7"></div>
          <div className="flex flex-row items-center gap-5" ref={buttonRef}>
            <Flag
              countryCode={locale === "fr" ? COUNTRIES.France : COUNTRIES.United_Kingdom}
              onClick={(_event) => toggleDropdownLanguages()}
              className="cursor-pointer"
            />

            <Toggle
              value={themeMode === ThemeMode.Dark}
              onChange={onThemeChange}
              iconLeft={faSun}
              iconRight={faMoon}
            />
          </div>
        </div>
      </div>

      <div
        ref={dropdownRef}
        className={clsx(
          "fixed top-20 z-50 w-fit rounded-3xl bg-white p-5 text-black shadow-xs dark:bg-black dark:text-white",
          isDropdownLanguagesOpen ? "flex" : "hidden",
        )}
      >
        <ul className="flex flex-col gap-4">
          <li
            className="flex cursor-pointer flex-row items-center gap-5"
            onClick={() => switchLanguage("fr")}
          >
            <Flag countryCode={COUNTRIES.France} />
            <p className="body-large">{t("french")}</p>
          </li>
          <li
            className="flex cursor-pointer flex-row items-center gap-5"
            onClick={() => switchLanguage("en")}
          >
            <Flag countryCode={COUNTRIES.United_Kingdom} />
            <p className="body-large">{t("english")}</p>
          </li>
        </ul>
      </div>
    </>
  );
}
