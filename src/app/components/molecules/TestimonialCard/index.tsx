import { Quote } from "iconoir-react";

export interface TestimonialCardProps {
  quote: string;
  person: string;
  initials: string;
  role: string;
  company: string;
}

export default function TestimonialCard({
  quote,
  person,
  initials,
  role,
  company,
}: TestimonialCardProps) {
  return (
    <figure className="m-0 flex min-w-0 flex-col gap-6 rounded-[20px] border border-line bg-surface p-[clamp(24px,3vw,36px)]">
      <Quote className="size-8 text-link" aria-hidden />
      <blockquote className="m-0 text-[17px] leading-relaxed tracking-[-0.005em] text-fg">
        {quote}
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3.5">
        <span
          aria-hidden
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-link-soft font-semibold text-link"
        >
          {initials}
        </span>
        <span className="flex min-w-0 flex-col leading-snug">
          <span className="font-semibold">{person}</span>
          <span className="font-mono text-[13px] text-muted">
            {role} · {company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
