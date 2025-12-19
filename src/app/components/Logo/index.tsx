import clsx from "clsx";

import LogoBright from "@/public/logo_bright.svg";
import LogoDark from "@/public/logo_dark.svg";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <>
      <LogoBright className={clsx("block dark:hidden", className)} />
      <LogoDark className={clsx("hidden dark:block", className)} />
    </>
  );
}
