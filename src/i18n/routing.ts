import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const defaultLocale = "fr" as const;

export const locales = ["en", "fr"] as const;

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: false,
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
