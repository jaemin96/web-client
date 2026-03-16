"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useTheme } from "next-themes"

const data = [
  { month: "Jan", revenue: 4000, profit: 2400 },
  { month: "Feb", revenue: 3000, profit: 1398 },
  { month: "Mar", revenue: 5000, profit: 3800 },
  { month: "Apr", revenue: 2780, profit: 1908 },
  { month: "May", revenue: 1890, profit: 1200 },
  { month: "Jun", revenue: 2390, profit: 1600 },
  { month: "Jul", revenue: 3490, profit: 2300 },
  { month: "Aug", revenue: 4200, profit: 2900 },
  { month: "Sep", revenue: 5100, profit: 3400 },
  { month: "Oct", revenue: 4800, profit: 3100 },
  { month: "Nov", revenue: 6200, profit: 4100 },
  { month: "Dec", revenue: 7300, profit: 4900 },
]

// Static colors to avoid hydration mismatch
const LIGHT_COLORS = {
  primary: "#22c55e",
  secondary: "#3b82f6",
  grid: "#e2e8f0",
  text: "#64748b",
  tooltipBg: "#ffffff",
}

const DARK_COLORS = {
  primary: "#4ade80",
  secondary: "#60a5fa",
  grid: "#334155",
  text: "#94a3b8",
  tooltipBg: "#1e293b",
}

export function RevenueChart() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Use light colors as default for SSR, then switch after mounting
  const colors = mounted && resolvedTheme === "dark" ? DARK_COLORS : LIGHT_COLORS

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue and profit trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={colors.secondary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: colors.text, fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: colors.text, fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.tooltipBg,
                  border: `1px solid ${colors.grid}`,
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                labelStyle={{ color: colors.text }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={colors.primary}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke={colors.secondary}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorProfit)"
                name="Profit"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.primary }} />
            <span className="text-sm text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.secondary }} />
            <span className="text-sm text-muted-foreground">Profit</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
