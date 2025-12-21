"use client";

import { useTranslations } from "next-intl";

import Logo from "@components/Logo";
import { GITHUB_URL, HIRE_ME_URL, LIKEDIN_URL } from "@/src/app/lib/constants";

export default function Footer() {
  const t = useTranslations("footer");

  const currentYear = new Date().getFullYear().toString();

  return (
    <div className="flex flex-col items-center justify-between bg-white p-12  lg:flex-row lg:gap-0 dark:bg-[#0E172A] border-t dark:border-[#1A2539] border-[#DFE5EE] ">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="flex items-center gap-2">
          <Logo className="h-5" />
          <span className="text-base font-semibold text-base-content">Adrien Guesnel</span>
        </div>
        <p className="text-center lg:text-left text-xs text-[#93A1B7] mt-4 lg:mt-0 ml-0 lg:ml-6">
          {t("copyright", { currentYear })}
        </p>
      </div>

      <div className="flex flex-row text-[#93A1B7] gap-5 mt-6 lg:mt-0">
        <a href={LIKEDIN_URL} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={HIRE_ME_URL} target="_blank" rel="noreferrer">
          Malt
        </a>
      </div>
    </div>
  );
}
