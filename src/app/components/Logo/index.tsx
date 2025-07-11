import { HTMLAttributes } from "react"

import LogoBright from "@/public/logo_bright.svg"
import LogoDark from "@/public/logo_dark.svg"
import { ThemeMode } from "@/src/app/lib/constants"

interface LogoProps extends HTMLAttributes<SVGElement> {
  themeMode: ThemeMode
}

export default function Logo({ themeMode, ...props }: LogoProps) {
  return themeMode === ThemeMode.Light ? (
    <LogoBright {...props} />
  ) : (
    <LogoDark {...props} />
  )
}
