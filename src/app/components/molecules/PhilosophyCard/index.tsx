import type { ReactNode } from "react";

import Card from "@components/atoms/Card";

export interface PhilosophyCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function PhilosophyCard({ title, description, icon }: PhilosophyCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4 rounded-[26px] border border-base-200/60 bg-base-100/60 p-5 text-left text-base-content backdrop-blur-3xl transition-transform duration-300 hover:-translate-y-1 dark:border-base-100/20 dark:bg-base-100/10 sm:p-6 md:p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-base-200/60 bg-base-200/20 text-base-content shadow-sm shadow-base-content/10 dark:border-base-100/30 md:h-14 md:w-14">
        {icon}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-lg font-semibold leading-snug text-base-content md:text-xl">{title}</h3>
        <p className="text-sm text-gray md:text-base">{description}</p>
      </div>
    </Card>
  );
}
