import clsx from "clsx";
import type { HTMLAttributes } from "react";

import FlagEn from "@/public/flags/en.svg";
import FlagFr from "@/public/flags/fr.svg";

export enum COUNTRIES {
  France = "FR",
  United_Kingdom = "EN",
}

interface FlagProps extends HTMLAttributes<SVGElement> {
  countryCode: COUNTRIES;
}

export default function Flag({ countryCode, className, ...props }: FlagProps) {
  return countryCode === COUNTRIES.France ? (
    <FlagFr
      className={clsx("h-8 w-auto rounded-lg border border-black dark:border-white", className)}
      {...props}
    />
  ) : (
    <FlagEn
      className={clsx("h-8 w-auto rounded-lg border border-black dark:border-white", className)}
      {...props}
    />
  );
}
