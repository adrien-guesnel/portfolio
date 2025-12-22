"use client";

import clsx from "clsx";
import { HalfMoon, SunLight } from "iconoir-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import Logo from "@components/Logo";
import { HIRE_ME_URL } from "@/src/app/lib/constants";
import { SECTION_ROUTES } from "@/src/app/lib/Routes";
import { Link, usePathname, useRouter } from "@/src/i18n/routing";

type DaisyTheme = "light" | "dark";
const THEME_KEY = "data-theme";
const PREFER_DARK_QUERY = "(prefers-color-scheme: dark)";

interface NavigationBarProps {
  className?: string;
  locale: string;
}

export default function NavigationBar({ className, locale }: NavigationBarProps) {
  const t = useTranslations("navigationBar");
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState<DaisyTheme>("light");

  const switchLanguage = async (newLocale: "en" | "fr") => {
    await router.replace(pathname, { locale: newLocale });
  };

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) as DaisyTheme | null;
    const dataset = document.documentElement.dataset.theme;
    const prefersDark = window.matchMedia(PREFER_DARK_QUERY).matches;
    const resolvedTheme: DaisyTheme =
      stored ??
      (dataset === "dark" || dataset === "light" ? (dataset as DaisyTheme) : null) ??
      (prefersDark ? "dark" : "light");

    document.documentElement.dataset.theme = resolvedTheme;
    setTheme(resolvedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: DaisyTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(THEME_KEY, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <header
      className={clsx(
        "fixed left-1/2 top-2 z-50 w-[min(100%-2rem,64rem)] -translate-x-1/2",
        className,
      )}
    >
      <div className="navbar rounded-full bg-base-200/70 px-2 shadow-xs backdrop-blur">
        <div className="navbar-start gap-2">
          <Link
            href="/"
            title={t("homepage")}
            className="btn btn-ghost btn-circle"
            aria-label={t("homepage")}
          >
            <Logo className="h-6 w-6" />
          </Link>
          <span className="text-base font-semibold text-base-content hidden lg:flex">
            Adrien Guesnel
          </span>
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href={SECTION_ROUTES.skills} className="font-medium">
                {t("skills")}
              </a>
            </li>
            <li>
              <a href={SECTION_ROUTES.articles} className="font-medium">
                {t("articles")}
              </a>
            </li>
            <li>
              <a href={SECTION_ROUTES.contact} className="font-medium">
                {t("contact")}
              </a>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <div className="join">
            <button
              type="button"
              className={clsx("btn btn-sm join-item", locale === "en" ? "btn-active" : "")}
              onClick={() => switchLanguage("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={clsx("btn btn-sm join-item", locale === "fr" ? "btn-active" : "")}
              onClick={() => switchLanguage("fr")}
            >
              FR
            </button>
          </div>

          <label
            className="swap swap-rotate btn btn-ghost btn-circle"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
              className="sr-only"
              aria-label="Toggle theme"
            />
            <span className="swap-on">
              <SunLight className="h-4 w-4" aria-hidden />
            </span>
            <span className="swap-off">
              <HalfMoon className="h-4 w-4" aria-hidden />
            </span>
          </label>

          <a
            className="hidden md:flex btn btn-primary btn-sm rounded-full px-5"
            href={HIRE_ME_URL}
            title={t("hireMe")}
          >
            {t("hireMe")}
          </a>
        </div>
      </div>
    </header>
  );
}
