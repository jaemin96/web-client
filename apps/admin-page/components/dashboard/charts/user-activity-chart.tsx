"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useTheme } from "next-themes"

const data = [
  { day: "Mon", visitors: 1200, pageViews: 2400 },
  { day: "Tue", visitors: 1400, pageViews: 2800 },
  { day: "Wed", visitors: 1100, pageViews: 2200 },
  { day: "Thu", visitors: 1600, pageViews: 3200 },
  { day: "Fri", visitors: 1800, pageViews: 3600 },
  { day: "Sat", visitors: 900, pageViews: 1800 },
  { day: "Sun", visitors: 700, pageViews: 1400 },
]

// Static colors to avoid hydration mismatch
const LIGHT_COLORS = {
  primary: "#22c55e",
  secondary: "#8b5cf6",
  grid: "#e2e8f0",
  text: "#64748b",
  tooltipBg: "#ffffff",
  cursor: "rgba(0,0,0,0.05)",
}

const DARK_COLORS = {
  primary: "#4ade80",
  secondary: "#a78bfa",
  grid: "#334155",
  text: "#94a3b8",
  tooltipBg: "#1e293b",
  cursor: "rgba(255,255,255,0.05)",
}

export function UserActivityChart() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Use light colors as default for SSR, then switch after mounting
  const colors = mounted && resolvedTheme === "dark" ? DARK_COLORS : LIGHT_COLORS

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Activity</CardTitle>
        <CardDescription>Weekly visitors and page views</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: colors.text, fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: colors.text, fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.tooltipBg,
                  border: `1px solid ${colors.grid}`,
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                labelStyle={{ color: colors.text }}
                cursor={{ fill: colors.cursor }}
              />
              <Bar
                dataKey="visitors"
                fill={colors.primary}
                radius={[4, 4, 0, 0]}
                name="Visitors"
              />
              <Bar
                dataKey="pageViews"
                fill={colors.secondary}
                radius={[4, 4, 0, 0]}
                name="Page Views"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.primary }} />
            <span className="text-sm text-muted-foreground">Visitors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.secondary }} />
            <span className="text-sm text-muted-foreground">Page Views</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
