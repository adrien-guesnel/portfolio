"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import Approach from "@components/organisms/Approach";
import Footer from "@components/organisms/Footer";
import Hero from "@components/organisms/Hero";
import NavigationBar from "@components/organisms/NavigationBar";
import { SECTION_IDS, SECTION_ROUTES } from "@/src/app/lib/Routes";

// Lazy load below-the-fold components
const CaseStudies = dynamic(() => import("@components/organisms/CaseStudies"));
const Experience = dynamic(() => import("@components/organisms/Experience"));
const Expertise = dynamic(() => import("@components/organisms/Expertise"));
const Testimonials = dynamic(() => import("@components/organisms/Testimonials"));
const Articles = dynamic(() => import("@components/organisms/Articles"));
const Contact = dynamic(() => import("@components/organisms/Contact"));

export default function Home({ locale }: { locale: string }) {
  const t = useTranslations("Home");

  return (
    <>
      <a
        href={SECTION_ROUTES.main}
        className="absolute top-[-80px] left-4 z-50 rounded-[10px] bg-neutral px-4 py-3 font-semibold text-neutral-content focus:top-3"
      >
        {t("skipToMainContent")}
      </a>
      <NavigationBar locale={locale} />
      <main id={SECTION_IDS.main} tabIndex={-1}>
        <Hero />
        <Approach />
        <CaseStudies />
        <Experience />
        <Expertise />
        <Testimonials />
        <Articles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
