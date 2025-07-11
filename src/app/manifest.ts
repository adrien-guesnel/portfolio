import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Adrien Guesnel - Freelance Lead Tech React.js / Node.js",
    short_name: "Adrien Guesnel - Freelance Lead Tech React.js / Node.js",
    orientation: "portrait-primary",
    description: "Le site pour tout savoir sur le West Coast Swing.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF5E1",
    theme_color: "#FFF5E1",
    lang: "en",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
