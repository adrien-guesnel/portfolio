"use client"

import { useEffect, useState } from "react"

import Contact from "@components/Contact"
import Footer from "@components/Footer"
import Hero from "@components/Hero"
import NavigationBar from "@components/NavigationBar"
import Skills from "@components/Skills"

import { ThemeMode } from "../lib/constants"

export default function Home({ locale }: { locale: string }) {
  const [theme, setTheme] = useState<ThemeMode>(ThemeMode.Light)

  function handleThemeChange() {
    document.getElementsByTagName("html")[0].classList.toggle("dark")
    setTheme(theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)
  }

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark")
      setTheme(ThemeMode.Dark)
    } else {
      document.documentElement.classList.remove("dark")
      setTheme(ThemeMode.Light)
    }
  }, [])

  return (
    <>
      <NavigationBar
        onThemeChange={handleThemeChange}
        themeMode={theme}
        locale={locale}
      />
      <Hero />
      <Skills />
      <Contact />
      <Footer themeMode={theme} />
    </>
  )
}
