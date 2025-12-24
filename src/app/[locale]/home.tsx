"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import EngineeringPhilosophy from "@components/organisms/EngineeringPhilosophy";
import Footer from "@components/organisms/Footer";
import Hero from "@components/organisms/Hero";
import NavigationBar from "@components/organisms/NavigationBar";
import Skills from "@components/organisms/Skills";

// Lazy load below-the-fold components
const Projects = dynamic(() => import("@components/organisms/Projects"));
const Testimonials = dynamic(() => import("@components/organisms/Testimonials"));
const Articles = dynamic(() => import("@components/organisms/Articles"));
const Contact = dynamic(() => import("@components/organisms/Contact"));

export default function Home({ locale }: { locale: string }) {
  const t = useTranslations("Home");

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-60 focus-visible:rounded-lg focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-white focus-visible:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {t("skipToMainContent")}
      </a>
      <NavigationBar locale={locale} />
      <main id="main-content">
        <Hero />
        <EngineeringPhilosophy />
        <Skills />
        <Projects />
        <Testimonials />
        <Articles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
