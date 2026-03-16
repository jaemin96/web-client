"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ElementType
}

function MetricCard({ title, value, change, changeLabel, icon: Icon }: MetricCardProps) {
  const isPositive = change >= 0

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-lg bg-primary/10 p-2">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 mt-1">
          {isPositive ? (
            <TrendingUp className="h-3 w-3 text-emerald-500" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500" />
          )}
          <span
            className={cn(
              "text-xs font-medium",
              isPositive ? "text-emerald-500" : "text-red-500"
            )}
          >
            {isPositive ? "+" : ""}{change}%
          </span>
          <span className="text-xs text-muted-foreground">{changeLabel}</span>
        </div>
      </CardContent>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
    </Card>
  )
}

const metrics = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: 20.1,
    changeLabel: "from last month",
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: 10.5,
    changeLabel: "from last week",
    icon: Users,
  },
  {
    title: "Sales",
    value: "12,234",
    change: -3.2,
    changeLabel: "from last month",
    icon: ShoppingCart,
  },
  {
    title: "Active Now",
    value: "573",
    change: 8.2,
    changeLabel: "from last hour",
    icon: Activity,
  },
]

export function MetricCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  )
}
