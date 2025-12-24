import type { ReactNode } from "react";

import Card from "@components/atoms/Card";

export interface PhilosophyCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function PhilosophyCard({ title, description, icon }: PhilosophyCardProps) {
  return (
    <Card>
      <div className="mx-auto lg:mx-0 flex h-12 w-12 items-center justify-center rounded-2xl border border-base-200/60 bg-base-200/20 text-base-content shadow-sm shadow-base-content/10 dark:border-base-100/30 md:h-14 md:w-14">
        {icon}
      </div>
      <div className="flex flex-1 flex-col gap-2 mt-4">
        <h3 className="text-lg font-semibold leading-snug text-base-content md:text-xl">{title}</h3>
        <p className="text-sm text-gray md:text-base">{description}</p>
      </div>
    </Card>
  );
}
