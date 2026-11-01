import { useTranslations } from "next-intl";

const SEPARATOR = " → ";

export default function Period({ value, className }: { value: string; className?: string }) {
  const t = useTranslations("Period");
  const [start, end] = value.split(SEPARATOR);

  if (!end) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={className}>
      {start}
      <span aria-hidden="true">{SEPARATOR}</span>
      <span className="sr-only"> {t("to")} </span>
      {end}
    </span>
  );
}
