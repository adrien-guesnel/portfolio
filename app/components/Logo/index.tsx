import { HTMLAttributes } from "react"

import { ThemeMode } from "@/app/lib/constants"
import LogoBright from "@/public/logo_bright.svg"
import LogoDark from "@/public/logo_dark.svg"

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
