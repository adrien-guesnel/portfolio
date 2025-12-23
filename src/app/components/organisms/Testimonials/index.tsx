import clsx from "clsx";
import { useTranslations } from "next-intl";

import TestimonialCard, { type TestimonialCardProps } from "@components/molecules/TestimonialCard";

export default function Testimonials({ className }: { className?: string }) {
  const t = useTranslations("Testimonials");
  const testimonials = t.raw("cards") as TestimonialCardProps[];

  return (
    <section className={clsx("py-16 lg:py-20", className)}>
      <div className="container mx-auto flex flex-col gap-12 px-4">
        <div className="flex flex-col gap-2 text-center lg:text-left">
          <h2 className="text-3xl font-semibold leading-tight text-base-content md:text-4xl">
            {t("title")}
          </h2>
          <p className="max-w-3xl text-base-content/70">{t("description")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={`${testimonial.person}-${testimonial.company}`}
              {...testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
