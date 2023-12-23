"use client"

import Lottie from "lottie-react"
import { useTranslations } from "next-intl"
import { use } from "react"

import computerAnimation from "./computer_animation.json"

export default function Hero() {
  const t = useTranslations("Hero")

  return (
    <div className="container p-5 flex flex-col lg:flex-row min-h-screen justify-center items-center gap-16 mx-auto">
      <div className="max-w-sm">
        <h1 className="text-3xl">{t("title")}</h1>
        <h2 className="text-3xl">{t.rich("subtitle")}</h2>
        <p className="text-xl mt-5">
          {t.rich("description", {
            component: () => (
              <a className="link link-primary" href="https://www.guiild.fr/">
                Guiild
              </a>
            ),
          })}
        </p>
        <a
          className="btn btn-primary mt-5"
          href="https://www.linkedin.com/in/adrien-guesnel/"
        >
          {t("cta")}
        </a>
      </div>
      <div>
        <Lottie
          animationData={computerAnimation}
          loop={true}
          className="h-72"
        />
      </div>
    </div>
  )
}
