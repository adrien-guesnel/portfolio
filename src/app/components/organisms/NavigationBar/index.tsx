"use client";

import clsx from "clsx";
import { HalfMoon, Menu, SunLight } from "iconoir-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { buttonClass } from "@/src/app/components/Button";
import { BOOKING_DISCOVERY_CALL_URL } from "@/src/app/lib/constants";
import { usePlausibleEvents } from "@/src/app/lib/plausible";
import { SECTION_ROUTES } from "@/src/app/lib/Routes";
import {
  applyTheme,
  readStoredTheme,
  resolveTheme,
  storeTheme,
  type Theme,
} from "@/src/app/lib/theme";
import { Link, usePathname, useRouter } from "@/src/i18n/routing";

type Locale = "fr" | "en";
const LOCALES: Locale[] = ["fr", "en"];

const NAV_ITEMS = [
  { key: "approach", href: SECTION_ROUTES.approach },
  { key: "caseStudies", href: SECTION_ROUTES.caseStudies },
  { key: "experience", href: SECTION_ROUTES.experience },
  { key: "expertise", href: SECTION_ROUTES.expertise },
  { key: "contact", href: SECTION_ROUTES.contact },
] as const;

interface NavigationBarProps {
  className?: string;
  locale: string;
}

export default function NavigationBar({ className, locale }: NavigationBarProps) {
  const t = useTranslations("navigationBar");
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("light");
  const menuRef = useRef<HTMLDetailsElement>(null);
  const plausible = usePlausibleEvents();

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === locale) {
      return;
    }
    plausible("Language Switched", {
      props: { lang: newLocale },
      callback: () => router.replace(pathname, { locale: newLocale }),
    });
  };

  useEffect(() => {
    const resolvedTheme = readStoredTheme() ?? resolveTheme();
    applyTheme(resolvedTheme);
    setTheme(resolvedTheme);
  }, []);

  useEffect(() => {
    const closeIfOutside = (event: Event) => {
      const menu = menuRef.current;
      if (menu?.open && !menu.contains(event.target as Node)) {
        menu.open = false;
      }
    };
    // Not `blur`: Safari does not focus links on click, so a blur-based close would hide the
    // panel before the click on one of its links lands.
    document.addEventListener("pointerdown", closeIfOutside);
    document.addEventListener("focusin", closeIfOutside);
    return () => {
      document.removeEventListener("pointerdown", closeIfOutside);
      document.removeEventListener("focusin", closeIfOutside);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    storeTheme(nextTheme);
    setTheme(nextTheme);
    plausible("Theme Toggled", { props: { theme: nextTheme } });
  };

  const closeMenu = () => {
    if (menuRef.current) {
      menuRef.current.open = false;
    }
  };

  const bookCallProps = (source: string) => ({
    href: BOOKING_DISCOVERY_CALL_URL,
    onClick: () => {
      closeMenu();
      plausible("Book Discovery Call Clicked", { props: { source } });
    },
  });

  const languageSwitch = (className?: string) => (
    <ul aria-label={t("language")} className={clsx("rounded-[10px] border border-line", className)}>
      {LOCALES.map((item, index) => (
        <li key={item}>
          <button
            type="button"
            lang={item}
            aria-pressed={locale === item}
            onClick={() => switchLanguage(item)}
            className={clsx(
              "inline-flex h-11 min-w-11 cursor-pointer items-center justify-center font-mono text-xs text-muted focus-visible:outline-offset-[-4px] aria-pressed:bg-neutral aria-pressed:text-neutral-content aria-pressed:focus-visible:outline-neutral-content",
              index === 0 ? "rounded-l-[9px]" : "rounded-r-[9px]",
            )}
          >
            {item.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <header className={clsx("border-b border-line-soft", className)}>
      <nav
        aria-label={t("mainNavigation")}
        className="page-wrap flex min-h-16 items-center justify-between gap-4 sm:min-h-19"
      >
        <Link
          href="/"
          aria-label={t("homepage")}
          className="flex min-w-0 items-center gap-3 text-fg"
        >
          <span
            aria-hidden
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-neutral font-mono text-[15px] font-medium text-neutral-content"
          >
            AG
          </span>
          <span aria-hidden className="flex min-w-0 flex-col leading-tight">
            <span className="whitespace-nowrap font-semibold">Adrien Guesnel</span>
            <span className="hidden truncate font-mono text-xs text-muted xs:block">
              {t("tagline")}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 text-[15px] font-medium desk:flex">
          {NAV_ITEMS.map(({ key, href }) => (
            <li key={key}>
              <a
                href={href}
                className="inline-flex min-h-11 items-center rounded-lg px-3 text-fg transition-[color,background-color,border-color] duration-200 hover:bg-hover"
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          {languageSwitch("hidden sm:flex")}

          <button
            type="button"
            aria-label={t("darkTheme")}
            aria-pressed={theme === "dark"}
            onClick={toggleTheme}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-[10px] border border-line text-fg transition-[color,background-color,border-color] duration-200 hover:bg-hover"
          >
            {theme === "dark" ? (
              <SunLight className="size-5" aria-hidden />
            ) : (
              <HalfMoon className="size-5" aria-hidden />
            )}
          </button>

          <a
            {...bookCallProps("navbar")}
            className={clsx(buttonClass({ size: "sm" }), "max-sm:hidden")}
          >
            {t("bookDiscoveryCall")}
          </a>

          <details
            ref={menuRef}
            className="relative desk:hidden"
            onKeyDown={(event) => {
              if (event.key === "Escape" && menuRef.current?.open) {
                closeMenu();
                menuRef.current.querySelector("summary")?.focus();
              }
            }}
          >
            <summary
              aria-label={t("menu")}
              className="inline-flex size-11 cursor-pointer list-none items-center justify-center rounded-[10px] border border-line text-fg [&::-webkit-details-marker]:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </summary>
            <div className="absolute right-0 top-13.5 z-20 flex w-[min(320px,calc(100vw-32px))] flex-col gap-0.5 rounded-2xl border border-line bg-surface p-2 shadow-menu">
              {NAV_ITEMS.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  onClick={closeMenu}
                  className="flex min-h-12 items-center rounded-[10px] px-3.5 font-medium text-fg transition-[color,background-color,border-color] duration-200 hover:bg-hover"
                >
                  {t(key)}
                </a>
              ))}
              <div className="mt-1.5 flex flex-col gap-2.5 border-t border-line-soft px-1.5 pt-2.5 pb-1.5 sm:hidden">
                {languageSwitch("flex self-start")}
                <a {...bookCallProps("mobile-menu")} className={buttonClass()}>
                  {t("bookDiscoveryCall")}
                </a>
              </div>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
