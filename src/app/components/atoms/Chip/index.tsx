import clsx from "clsx";
import type { ReactNode } from "react";

export default function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <li
      className={clsx(
        "inline-flex h-7.5 items-center whitespace-nowrap rounded-full border border-line bg-surface px-3 font-mono text-[12.5px] text-chip-fg",
        className,
      )}
    >
      {children}
    </li>
  );
}

export function ChipList({
  items,
  label,
  className,
}: {
  items: string[];
  label?: string;
  className?: string;
}) {
  return (
    <ul aria-label={label} className={clsx("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <Chip key={item}>{item}</Chip>
      ))}
    </ul>
  );
}
