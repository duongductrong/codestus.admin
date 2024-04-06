"use client"

import { useTheme } from "next-themes"
import { ElementRef, forwardRef } from "react"
import { IconButton, IconButtonProps } from "../icon-button"

export interface PreferredThemeSwitcherProps extends IconButtonProps {}

const PreferredThemeSwitcher = forwardRef<
  ElementRef<typeof IconButton>,
  PreferredThemeSwitcherProps
>((props, ref) => {
  const { theme, setTheme } = useTheme()
  return (
    <IconButton {...props} ref={ref} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {/* <Icons
        name={theme === "dark" ? "outline.weather.moon" : "outline.weather.sun"}
        className="h-5 w-5"
      /> */}
      {theme === "dark" ? "🌙" : "☀️"}
    </IconButton>
  )
})

export default PreferredThemeSwitcher
