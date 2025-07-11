import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://aguesnel.fr",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          fr: "https://acme.com/fr",
          en: "https://acme.com/en",
        },
      },
    },
  ]
}
