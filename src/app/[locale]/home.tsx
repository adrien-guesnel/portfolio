"use client";

import Articles from "@components/organisms/Articles";
import Contact from "@/src/app/components/Contact";
import Footer from "@/src/app/components/Footer";
import Hero from "@/src/app/components/Hero";
import NavigationBar from "@/src/app/components/NavigationBar";
import Skills from "@/src/app/components/Skills";

import { useTheme } from "../lib/ThemeProvider";

export default function Home({ locale }: { locale: string }) {
  const { theme, toggleTheme } = useTheme();

  function handleThemeChange() {
    toggleTheme();
  }

  return (
    <>
      <NavigationBar onThemeChange={handleThemeChange} themeMode={theme} locale={locale} />
      <Hero />
      <Skills themeMode={theme} />
      <Articles />
      <Contact />
      <Footer themeMode={theme} />
    </>
  );
}
