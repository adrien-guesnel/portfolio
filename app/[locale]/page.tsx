import { getTranslations } from "next-intl/server"

import Home from "./home"

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: "Home" })

  return {
    title: t("seo.title"),
    description: t("seo.description"),
  }
}

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  return <Home locale={locale} />
}
