"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes"
import { ReactNode } from "react"

export interface PreferredThemeProps {
  children?: ReactNode
}

const PreferredTheme = ({ children, ...props }: PreferredThemeProps) => (
  <NextThemeProvider {...props} defaultTheme="dark" enableSystem={false} attribute="class">
    {children}
  </NextThemeProvider>
)

export default PreferredTheme
