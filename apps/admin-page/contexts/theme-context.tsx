"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"
import { useTheme } from "next-themes"

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  card: string
  cardForeground: string
  muted: string
  mutedForeground: string
  border: string
}

interface ThemeContextType {
  colors: ThemeColors
  setColors: (colors: Partial<ThemeColors>) => void
  resetColors: () => void
  applyTheme: (themeName: string) => void
}

const defaultDarkColors: ThemeColors = {
  primary: "oklch(0.7 0.18 160)",
  secondary: "oklch(0.22 0.01 250)",
  accent: "oklch(0.7 0.18 160)",
  background: "oklch(0.12 0.005 250)",
  foreground: "oklch(0.95 0 0)",
  card: "oklch(0.16 0.005 250)",
  cardForeground: "oklch(0.95 0 0)",
  muted: "oklch(0.22 0.01 250)",
  mutedForeground: "oklch(0.65 0 0)",
  border: "oklch(0.26 0.01 250)",
}

const presetThemes: Record<string, ThemeColors> = {
  default: defaultDarkColors,
  emerald: {
    primary: "oklch(0.7 0.18 160)",
    secondary: "oklch(0.2 0.02 160)",
    accent: "oklch(0.75 0.15 160)",
    background: "oklch(0.12 0.01 160)",
    foreground: "oklch(0.95 0 0)",
    card: "oklch(0.16 0.015 160)",
    cardForeground: "oklch(0.95 0 0)",
    muted: "oklch(0.22 0.02 160)",
    mutedForeground: "oklch(0.65 0.02 160)",
    border: "oklch(0.28 0.03 160)",
  },
  ocean: {
    primary: "oklch(0.65 0.2 230)",
    secondary: "oklch(0.2 0.02 230)",
    accent: "oklch(0.7 0.15 230)",
    background: "oklch(0.12 0.015 230)",
    foreground: "oklch(0.95 0 0)",
    card: "oklch(0.16 0.02 230)",
    cardForeground: "oklch(0.95 0 0)",
    muted: "oklch(0.22 0.025 230)",
    mutedForeground: "oklch(0.65 0.02 230)",
    border: "oklch(0.28 0.03 230)",
  },
  neonGreen: {
    primary: "oklch(0.85 0.25 145)",
    secondary: "oklch(0.18 0.02 145)",
    accent: "oklch(0.8 0.22 145)",
    background: "oklch(0.1 0.01 145)",
    foreground: "oklch(0.95 0 0)",
    card: "oklch(0.14 0.015 145)",
    cardForeground: "oklch(0.95 0 0)",
    muted: "oklch(0.2 0.02 145)",
    mutedForeground: "oklch(0.6 0.03 145)",
    border: "oklch(0.25 0.04 145)",
  },
  minimal: {
    primary: "oklch(0.6 0 0)",
    secondary: "oklch(0.2 0 0)",
    accent: "oklch(0.5 0 0)",
    background: "oklch(0.1 0 0)",
    foreground: "oklch(0.9 0 0)",
    card: "oklch(0.14 0 0)",
    cardForeground: "oklch(0.9 0 0)",
    muted: "oklch(0.2 0 0)",
    mutedForeground: "oklch(0.55 0 0)",
    border: "oklch(0.25 0 0)",
  },
  sunset: {
    primary: "oklch(0.7 0.2 30)",
    secondary: "oklch(0.2 0.03 30)",
    accent: "oklch(0.75 0.18 50)",
    background: "oklch(0.12 0.015 30)",
    foreground: "oklch(0.95 0 0)",
    card: "oklch(0.16 0.02 30)",
    cardForeground: "oklch(0.95 0 0)",
    muted: "oklch(0.22 0.025 30)",
    mutedForeground: "oklch(0.6 0.02 30)",
    border: "oklch(0.28 0.03 30)",
  },
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const CSS_VARS = [
  "--primary", "--secondary", "--accent", "--background", "--foreground",
  "--card", "--card-foreground", "--muted", "--muted-foreground", "--border",
  "--sidebar", "--sidebar-foreground", "--sidebar-primary", "--sidebar-accent",
  "--sidebar-border", "--ring", "--input", "--popover", "--popover-foreground",
]

export function ThemeColorsProvider({ children }: { children: ReactNode }) {
  const [colors, setColorsState] = useState<ThemeColors>(defaultDarkColors)
  const { resolvedTheme } = useTheme()

  const clearColorsFromDOM = useCallback(() => {
    const root = document.documentElement
    CSS_VARS.forEach((v) => root.style.removeProperty(v))
  }, [])

  const applyColorsToDOM = useCallback((newColors: ThemeColors) => {
    const root = document.documentElement
    root.style.setProperty("--primary", newColors.primary)
    root.style.setProperty("--secondary", newColors.secondary)
    root.style.setProperty("--accent", newColors.accent)
    root.style.setProperty("--background", newColors.background)
    root.style.setProperty("--foreground", newColors.foreground)
    root.style.setProperty("--card", newColors.card)
    root.style.setProperty("--card-foreground", newColors.cardForeground)
    root.style.setProperty("--muted", newColors.muted)
    root.style.setProperty("--muted-foreground", newColors.mutedForeground)
    root.style.setProperty("--border", newColors.border)
    root.style.setProperty("--sidebar", newColors.card)
    root.style.setProperty("--sidebar-foreground", newColors.foreground)
    root.style.setProperty("--sidebar-primary", newColors.primary)
    root.style.setProperty("--sidebar-accent", newColors.secondary)
    root.style.setProperty("--sidebar-border", newColors.border)
    root.style.setProperty("--ring", newColors.primary)
    root.style.setProperty("--input", newColors.secondary)
    root.style.setProperty("--popover", newColors.card)
    root.style.setProperty("--popover-foreground", newColors.cardForeground)
  }, [])

  const setColors = useCallback((newColors: Partial<ThemeColors>) => {
    setColorsState((prev) => {
      const updated = { ...prev, ...newColors }
      applyColorsToDOM(updated)
      return updated
    })
  }, [applyColorsToDOM])

  const resetColors = useCallback(() => {
    setColorsState(defaultDarkColors)
    if (resolvedTheme === "dark") {
      applyColorsToDOM(defaultDarkColors)
    } else {
      clearColorsFromDOM()
    }
  }, [applyColorsToDOM, clearColorsFromDOM, resolvedTheme])

  const applyTheme = useCallback((themeName: string) => {
    const theme = presetThemes[themeName] || defaultDarkColors
    setColorsState(theme)
    applyColorsToDOM(theme)
  }, [applyColorsToDOM])

  // next-themes가 dark <-> light 전환될 때 inline style 처리
  useEffect(() => {
    if (resolvedTheme === "light") {
      clearColorsFromDOM()
    } else if (resolvedTheme === "dark") {
      applyColorsToDOM(colors)
    }
  }, [resolvedTheme])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeContext.Provider value={{ colors, setColors, resetColors, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeColors() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeColors must be used within a ThemeColorsProvider")
  }
  return context
}

export { presetThemes }
