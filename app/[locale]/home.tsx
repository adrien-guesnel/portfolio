"use client"

import { useEffect, useState } from "react"

import Hero from "@components/Hero"
import NavigationBar from "@components/NavigationBar"

export default function Home({ locale }: { locale: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  function handleThemeChange() {
    document.getElementsByTagName("html")[0].classList.toggle("dark")
    setTheme(theme === "light" ? "dark" : "light")
  }

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark")
      setTheme("dark")
    } else {
      document.documentElement.classList.remove("dark")
      setTheme("light")
    }
  }, [])

  return (
    <div className="bg-beige dark:bg-darkBrown">
      <NavigationBar
        onThemeChange={handleThemeChange}
        themeMode={theme}
        locale={locale}
      />
      <Hero />
    </div>
  )
}
