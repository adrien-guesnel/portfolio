import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  kicker: string;
  title: string;
  aside?: ReactNode;
}

export default function SectionHeading({ id, kicker, title, aside }: SectionHeadingProps) {
  return (
    <div className="mb-[clamp(32px,5vw,48px)] flex flex-wrap items-end justify-between gap-x-16 gap-y-4">
      <div className="flex max-w-160 flex-col gap-3.5">
        <span className="kicker">{kicker}</span>
        <h2 id={id} className="h2-section">
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}
