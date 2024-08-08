import * as React from "react"

interface Props extends React.SVGProps<SVGSVGElement> {
  lightColor?: string
  darkColor?: string
  className?: string
}

export default function ReactLogo({
  lightColor = "dark",
  darkColor = "white",
  className,
  ...props
}: Props) {
  const isDarkMode = document.documentElement.classList.contains("dark")
  const logoColor = isDarkMode ? "white" : "black"

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
