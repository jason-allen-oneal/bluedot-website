"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      value={{ light: "bluedot-dawn", dark: "bluedot-aurora" }}
      themes={["light", "dark"]}
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="bluedot-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
