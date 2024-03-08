import dynamic from "next/dynamic"

export const PreferredThemeSwitcher = dynamic(() => import("./preferred-theme-switcher"), {
  ssr: false,
})
