import { getTranslations } from "next-intl/server"

import Home from "./home"

type Params = Promise<{ locale: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: "Home" })

  return {
    title: t("seo.title"),
    description: t("seo.description"),
  }
}

export default async function HomePage({ params }: { params: Params }) {
  const { locale } = await params

  return <Home locale={locale} />
}
