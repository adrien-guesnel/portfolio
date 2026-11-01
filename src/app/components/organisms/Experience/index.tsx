import { useTranslations } from "next-intl";

import { ChipList } from "@components/atoms/Chip";
import Period from "@components/atoms/Period";
import SectionHeading from "@components/molecules/SectionHeading";
import { SECTION_IDS } from "@/src/app/lib/Routes";

interface Mission {
  period: string;
  company: string;
  text: string;
}

interface Job {
  period: string;
  title: string;
  subtitle: string;
}

interface Degree {
  degree: string;
  school: string;
}

const ROW = "grid gap-x-6 gap-y-1 px-5 sm:grid-cols-[140px_minmax(0,1fr)] sm:px-6.5";
const PANEL = "rounded-[20px] border border-line bg-surface";

export default function Experience() {
  const t = useTranslations("Experience");
  const missions = t.raw("freelance.missions") as Mission[];
  const jobs = t.raw("jobs") as Job[];
  const education = t.raw("education") as Degree[];
  const domains = t.raw("domains") as string[];

  return (
    <section
      id={SECTION_IDS.experience}
      aria-labelledby="experience-title"
      className="border-y border-line-soft bg-band"
    >
      <div className="page-wrap section-y">
        <SectionHeading id="experience-title" kicker={t("kicker")} title={t("title")} />

        <div className="grid items-start gap-8 desk:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col gap-4">
            <article aria-labelledby="freelance-title" className={`${PANEL} overflow-hidden`}>
              <div className={`${ROW} border-b border-line-soft py-5 sm:py-6`}>
                <Period
                  value={t("freelance.period")}
                  className="pt-0.5 font-mono text-[13px] text-link"
                />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <h3 id="freelance-title" className="m-0 text-lg font-semibold">
                    {t("freelance.title")}
                  </h3>
                  <span className="text-[14.5px] text-muted">{t("freelance.subtitle")}</span>
                </div>
              </div>
              <ol className="m-0 list-none px-0 pt-1 pb-2">
                {missions.map((mission) => (
                  <li
                    key={mission.company}
                    className={`${ROW} border-b border-dashed border-line py-3.5 last:border-b-0`}
                  >
                    <Period
                      value={mission.period}
                      className="pt-0.5 font-mono text-[13px] text-muted"
                    />
                    <span className="min-w-0 text-[15px] text-fg-2">
                      <strong className="font-semibold text-fg">{mission.company}</strong> ·{" "}
                      {mission.text}
                    </span>
                  </li>
                ))}
              </ol>
            </article>

            <ol className={`${PANEL} m-0 list-none overflow-hidden p-0`}>
              {jobs.map((job) => (
                <li
                  key={job.period}
                  className={`${ROW} border-b border-line-soft py-4.5 last:border-b-0 sm:py-5`}
                >
                  <Period value={job.period} className="pt-0.5 font-mono text-[13px] text-muted" />
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <h3 className="m-0 text-[16.5px] font-semibold">{job.title}</h3>
                    <span className="text-[14.5px] text-muted">{job.subtitle}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside aria-label={t("asideLabel")} className="flex min-w-0 flex-col gap-4">
            <div className={`${PANEL} flex flex-col gap-4 p-[clamp(22px,2.4vw,28px)]`}>
              <h3 className="kicker m-0 font-normal">{t("educationTitle")}</h3>
              {education.map((item) => (
                <div key={item.degree} className="flex flex-col gap-0.5">
                  <span className="font-semibold">{item.degree}</span>
                  <span className="text-[14.5px] text-muted">{item.school}</span>
                </div>
              ))}
            </div>
            <div className={`${PANEL} flex flex-col gap-3.5 p-[clamp(22px,2.4vw,28px)]`}>
              <h3 className="kicker m-0 font-normal">{t("domainsTitle")}</h3>
              <ChipList items={domains} />
            </div>
            <div className={`${PANEL} flex flex-col gap-1.5 p-[clamp(22px,2.4vw,28px)]`}>
              <h3 className="kicker m-0 font-normal">{t("languagesTitle")}</h3>
              <span className="text-[15px]">{t("languages")}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
