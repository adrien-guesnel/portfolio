import clsx from "clsx";

import Card from "@components/atoms/Card";

export interface TestimonialCardProps {
  quote: string;
  person: string;
  role: string;
  company: string;
  companyUrl?: string;
}

export default function TestimonialCard({
  quote,
  person,
  role,
  company,
  companyUrl,
}: TestimonialCardProps) {
  const companyClass = companyUrl ? "text-primary hover:text-primary-focus" : "text-base-content";

  return (
    <Card>
      <p className="body-large text-base-content/80">“{quote}”</p>

      <div className="mt-6 flex flex-col gap-1">
        <p className="text-base font-semibold text-base-content">{person}</p>
        <p className="text-sm uppercase tracking-[0.3em] text-base-content/60">{role}</p>
        {companyUrl ? (
          <a
            className={clsx("text-sm font-semibold", companyClass)}
            href={companyUrl}
            target="_blank"
            rel="noreferrer"
          >
            {company}
          </a>
        ) : (
          <span className={clsx("text-sm font-semibold", companyClass)}>{company}</span>
        )}
      </div>
    </Card>
  );
}
