"use client"

import { useContext, useEffect, useState } from "react"

import Contact from "@components/Contact"
import Footer from "@components/Footer"
import Hero from "@components/Hero"
import NavigationBar from "@components/NavigationBar"
import Skills from "@components/Skills"

import { useTheme } from "../lib/ThemeProvider"

export default function Home({ locale }: { locale: string }) {
  const { theme, toggleTheme } = useTheme()

  function handleThemeChange() {
    toggleTheme()
  }

  return (
    <>
      <NavigationBar
        onThemeChange={handleThemeChange}
        themeMode={theme}
        locale={locale}
      />
      <Hero />
      <Skills themeMode={theme} />
      <Contact />
      <Footer themeMode={theme} />
    </>
  )
}
