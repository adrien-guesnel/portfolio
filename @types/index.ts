import { ThemeMode } from "@/app/lib/constants"

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  lightColor?: string
  darkColor?: string
  className?: string
  themeMode?: ThemeMode
}
