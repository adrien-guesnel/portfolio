import { useTranslations } from "next-intl";

export default function NewTabHint() {
  const t = useTranslations("ExternalLink");

  return <span className="sr-only"> {t("newTab")}</span>;
}
