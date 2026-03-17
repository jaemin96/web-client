"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"
import { useTheme } from "next-themes"

// oklch 파싱
function parseOklch(value: string): [number, number, number] | null {
  const m = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/)
  if (!m) return null
  return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])]
}

// 같은 색조로 다크/라이트 버전 생성
function adaptOklch(value: string, isDark: boolean): string {
  const parsed = parseOklch(value)
  if (!parsed) return value
  const [l, c, h] = parsed

  // primary/accent처럼 채도 높은 색은 lightness만 약간 조정
  if (c > 0.08) {
    const newL = isDark ? Math.min(l, 0.78) : Math.max(l, 0.45)
    return `oklch(${newL.toFixed(2)} ${c} ${h})`
  }

  // background/card/muted 같은 무채색 계열은 완전히 반전
  if (isDark) {
    const newL = l > 0.5 ? 1 - l * 0.85 : l
    return `oklch(${newL.toFixed(2)} ${c} ${h})`
  } else {
    const newL = l < 0.5 ? 1 - l * 0.85 : l
    return `oklch(${newL.toFixed(2)} ${c} ${h})`
  }
}

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

function applyToDOM(c: ThemeColors) {
  const root = document.documentElement
  root.style.setProperty("--primary", c.primary)
  root.style.setProperty("--secondary", c.secondary)
  root.style.setProperty("--accent", c.accent)
  root.style.setProperty("--background", c.background)
  root.style.setProperty("--foreground", c.foreground)
  root.style.setProperty("--card", c.card)
  root.style.setProperty("--card-foreground", c.cardForeground)
  root.style.setProperty("--muted", c.muted)
  root.style.setProperty("--muted-foreground", c.mutedForeground)
  root.style.setProperty("--border", c.border)
  root.style.setProperty("--sidebar", c.card)
  root.style.setProperty("--sidebar-foreground", c.foreground)
  root.style.setProperty("--sidebar-primary", c.primary)
  root.style.setProperty("--sidebar-accent", c.secondary)
  root.style.setProperty("--sidebar-border", c.border)
  root.style.setProperty("--ring", c.primary)
  root.style.setProperty("--input", c.secondary)
  root.style.setProperty("--popover", c.card)
  root.style.setProperty("--popover-foreground", c.cardForeground)
}

// 현재 colors를 다크/라이트 모드에 맞게 lightness 조정해서 적용
function applyAdapted(colors: ThemeColors, isDark: boolean) {
  const adapted: ThemeColors = {
    primary: adaptOklch(colors.primary, isDark),
    secondary: adaptOklch(colors.secondary, isDark),
    accent: adaptOklch(colors.accent, isDark),
    background: adaptOklch(colors.background, isDark),
    foreground: isDark ? "oklch(0.95 0 0)" : "oklch(0.10 0 0)",
    card: adaptOklch(colors.card, isDark),
    cardForeground: isDark ? "oklch(0.95 0 0)" : "oklch(0.10 0 0)",
    muted: adaptOklch(colors.muted, isDark),
    mutedForeground: isDark ? "oklch(0.65 0 0)" : "oklch(0.45 0 0)",
    border: adaptOklch(colors.border, isDark),
  }
  applyToDOM(adapted)
}

export function ThemeColorsProvider({ children }: { children: ReactNode }) {
  const [colors, setColorsState] = useState<ThemeColors>(defaultDarkColors)
  const [hasCustomTheme, setHasCustomTheme] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = resolvedTheme === "dark"

  const clearColorsFromDOM = useCallback(() => {
    const root = document.documentElement
    CSS_VARS.forEach((v) => root.style.removeProperty(v))
  }, [])

  const setColors = useCallback((newColors: Partial<ThemeColors>) => {
    setHasCustomTheme(true)
    setColorsState((prev) => {
      const updated = { ...prev, ...newColors }
      applyToDOM(updated)
      // AI가 보낸 background 밝기로 다크/라이트 클래스 결정
      const bg = updated.background
      const parsed = bg.match(/oklch\(\s*([\d.]+)/)
      if (parsed) {
        const l = parseFloat(parsed[1])
        const root = document.documentElement
        if (l > 0.5) {
          root.classList.remove("dark")
        } else {
          root.classList.add("dark")
        }
      }
      return updated
    })
  }, [])

  const resetColors = useCallback(() => {
    setHasCustomTheme(false)
    setColorsState(defaultDarkColors)
    clearColorsFromDOM()
  }, [clearColorsFromDOM])

  const applyTheme = useCallback((themeName: string) => {
    const theme = presetThemes[themeName] || defaultDarkColors
    setHasCustomTheme(true)
    setColorsState(theme)
    applyToDOM(theme)
  }, [])

  // 수동 다크/라이트 전환 시
  useEffect(() => {
    if (!hasCustomTheme) {
      // 커스텀 테마 없으면 그냥 초기화
      clearColorsFromDOM()
    } else {
      // 커스텀 테마 있으면 같은 색조로 밝기만 조정
      applyAdapted(colors, isDark)
    }
  }, [resolvedTheme]) // eslint-disable-line react-hooks/exhaustive-deps

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
