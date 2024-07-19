import { HTMLAttributes } from "react"

import LogoBright from "@/public/logo_bright.svg"
import LogoDark from "@/public/logo_dark.svg"

interface LogoProps extends HTMLAttributes<SVGElement> {
  themeMode: "light" | "dark"
}

export default function Logo({ themeMode, ...props }: LogoProps) {
  return themeMode === "light" ? (
    <LogoBright {...props} />
  ) : (
    <LogoDark {...props} />
  )
}
