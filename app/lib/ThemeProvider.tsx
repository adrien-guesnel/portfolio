"use client"

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import { ThemeMode } from "./constants"

const ThemeContext = createContext({
  theme: ThemeMode.Light,
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const [theme, setTheme] = useState(ThemeMode.Light)

  const toggleTheme = () => {
    const newThemeMode =
      theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light

    setTheme((prevTheme) =>
      prevTheme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light,
    )
    localStorage.setItem("theme", newThemeMode)
    document.documentElement.classList.toggle("dark")
  }

  useEffect(() => {
    const localTheme = localStorage.getItem("theme")
    if (localTheme) {
      setTheme(localTheme as ThemeMode)

      if (localTheme === ThemeMode.Dark) {
        document.documentElement.classList.add("dark")
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme(ThemeMode.Dark)
      document.documentElement.classList.add("dark")
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext)
}
