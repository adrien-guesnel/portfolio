import * as React from "react"

import { IconProps } from "@/@types"
import { ThemeMode } from "@/app/lib/constants"

export default function ReactLogo({
  lightColor = "black",
  darkColor = "white",
  themeMode = ThemeMode.Light,
  className,
  ...props
}: IconProps) {
  const logoColor = themeMode === ThemeMode.Dark ? darkColor : lightColor

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-11.5 -10.232 23 20.463"
      className={className}
      {...props}
    >
      <title>{"React Logo"}</title>
      <circle r={2.05} fill={logoColor} />
      <g fill="none" stroke={logoColor}>
        <ellipse rx={11} ry={4.2} />
        <ellipse rx={11} ry={4.2} transform="rotate(60)" />
        <ellipse rx={11} ry={4.2} transform="rotate(120)" />
      </g>
    </svg>
  )
}
