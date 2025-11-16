import DJImg1 from "@public/img/dj-1.jpg"
import DJImg2 from "@public/img/dj-2.jpg"
import DJImg3 from "@public/img/dj-3.jpg"
import DJImg4 from "@public/img/dj-4.jpg"
import clsx from "clsx"
import { getTranslations } from "next-intl/server"
import Image from "next/image"

import RichText from "@components/RichText"

export async function generateMetadata() {
  const t = await getTranslations("WCS")

  return {
    title: t("seo.title"),
    description: t("seo.description"),
  }
}

export default async function WCSPage() {
  const t = await getTranslations("WCS")

  return (
    <div className={clsx("bg-beige dark:bg-dark-brown")}>
      <div className="dark:text-light-brown container mx-auto flex flex-col items-center justify-center pt-32 text-black lg:flex-row">
        <div className="flex max-w-2xl flex-col lg:pb-20">
          <h1 className="text-4xl font-bold lg:text-6xl">Assets WCS</h1>
          <Image src={DJImg1} alt="DJ Image 1" />
          <Image src={DJImg2} alt="DJ Image 2" />
          <Image src={DJImg3} alt="DJ Image 3" />
          <Image src={DJImg4} alt="DJ Image 4" />
        </div>
      </div>
    </div>
  )
}
