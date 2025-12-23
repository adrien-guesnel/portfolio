"use client";

import Articles from "@components/organisms/Articles";
import Contact from "@components/organisms/Contact";
import EngineeringPhilosophy from "@components/organisms/EngineeringPhilosophy";
import Footer from "@components/organisms/Footer";
import Hero from "@components/organisms/Hero";
import NavigationBar from "@components/organisms/NavigationBar";
import Projects from "@components/organisms/Projects";
import Skills from "@components/organisms/Skills";
import Testimonials from "@components/organisms/Testimonials";

export default function Home({ locale }: { locale: string }) {
  return (
    <>
      <NavigationBar locale={locale} />
      <Hero />
      <EngineeringPhilosophy />
      <Skills />
      <Projects />
      <Testimonials />
      <Articles />
      <Contact />
      <Footer />
    </>
  );
}
