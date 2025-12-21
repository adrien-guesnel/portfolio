"use client";

import Articles from "@components/organisms/Articles";
import Contact from "@components/organisms/Contact";
import Footer from "@components/organisms/Footer";
import Hero from "@components/organisms/Hero";
import NavigationBar from "@components/organisms/NavigationBar";
import Skills from "@components/organisms/Skills";

export default function Home({ locale }: { locale: string }) {
  return (
    <>
      <NavigationBar locale={locale} />
      <Hero />
      <Skills />
      <Articles />
      <Contact />
      <Footer />
    </>
  );
}
