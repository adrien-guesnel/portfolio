import { useTranslations } from "next-intl";

import SectionHeading from "@components/molecules/SectionHeading";
import TestimonialCard, { type TestimonialCardProps } from "@components/molecules/TestimonialCard";
import { SECTION_IDS } from "@/src/app/lib/Routes";

export default function Testimonials() {
  const t = useTranslations("Testimonials");
  const testimonials = t.raw("cards") as TestimonialCardProps[];

  return (
    <section
      id={SECTION_IDS.testimonials}
      aria-labelledby="testimonials-title"
      className="border-y border-line-soft bg-band"
    >
      <div className="page-wrap section-y">
        <SectionHeading id="testimonials-title" kicker={t("kicker")} title={t("title")} />
        <div className="grid gap-4 sm:grid-cols-2 sm:[&>:last-child:nth-child(odd)]:col-span-full desk:grid-cols-3 desk:[&>:last-child:nth-child(odd)]:col-span-1">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.person} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
