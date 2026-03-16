"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"
import { useTheme } from "next-themes"

const data = [
  { name: "Electronics", value: 4500, percentage: 35 },
  { name: "Clothing", value: 3200, percentage: 25 },
  { name: "Home & Garden", value: 2100, percentage: 16 },
  { name: "Sports", value: 1800, percentage: 14 },
  { name: "Others", value: 1300, percentage: 10 },
]

// Static colors to avoid hydration mismatch
const LIGHT_COLORS = {
  palette: ["#22c55e", "#3b82f6", "#ec4899", "#eab308", "#8b5cf6"],
  grid: "#e2e8f0",
  text: "#64748b",
  tooltipBg: "#ffffff",
}

const DARK_COLORS = {
  palette: ["#4ade80", "#60a5fa", "#f472b6", "#facc15", "#a78bfa"],
  grid: "#334155",
  text: "#94a3b8",
  tooltipBg: "#1e293b",
}

export function SalesBreakdownChart() {
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
        <CardTitle>Sales by Category</CardTitle>
        <CardDescription>Distribution of sales across categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors.palette[index % colors.palette.length]}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.tooltipBg,
                  border: `1px solid ${colors.grid}`,
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()} (${data.find(d => d.name === name)?.percentage}%)`,
                  name
                ]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span style={{ color: colors.text, fontSize: 12 }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
