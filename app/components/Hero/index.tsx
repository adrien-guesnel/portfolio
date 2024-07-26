"use client"

import HeroImg from "@public/img/hero.png"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

import { HIRE_ME_URL } from "@/app/lib/constants"

interface HeroProps {
  className?: string
}

export default function Hero({ className }: HeroProps) {
  const t = useTranslations("Hero")

  return (
    <div className={clsx("bg-beige dark:bg-darkBrown", className)}>
      <div className="container flex flex-col lg:flex-row min-h-screen justify-center items-center mx-auto text-black dark:text-lightBrown">
        <div className="max-w-2xl flex flex-col">
          <h1 className="text-4xl lg:text-6xl font-bold">{t.rich("title")}</h1>
          <p className="body-large mt-6">{t("description")}</p>
          <div className="flex felx-row gap-3 mt-6">
            <Link href={HIRE_ME_URL} className="button button-contained">
              {t("hireMe")}
            </Link>

            {/* <Link href="#" className="button button-outlined">
            {t("discoverMySkills")}
          </Link> */}
          </div>
        </div>
        <div className="max-w-lg">
          <Image
            src={HeroImg}
            alt="Adrien with his computer"
            placeholder="blur"
          />
        </div>
      </div>
    </div>
  )
}
