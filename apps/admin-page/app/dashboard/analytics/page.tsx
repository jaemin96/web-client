"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RevenueChart } from "@/components/dashboard/charts/revenue-chart"
import { UserActivityChart } from "@/components/dashboard/charts/user-activity-chart"
import { SalesBreakdownChart } from "@/components/dashboard/charts/sales-breakdown-chart"
import { TrendingUp, TrendingDown, Eye, MousePointer, Clock, Target } from "lucide-react"

const analyticsMetrics = [
  {
    title: "Page Views",
    value: "2.4M",
    change: "+18.2%",
    trend: "up",
    icon: Eye,
    description: "Total page views this month",
  },
  {
    title: "Click Rate",
    value: "4.8%",
    change: "+2.1%",
    trend: "up",
    icon: MousePointer,
    description: "Average click-through rate",
  },
  {
    title: "Avg. Session",
    value: "4m 32s",
    change: "-0.8%",
    trend: "down",
    icon: Clock,
    description: "Average session duration",
  },
  {
    title: "Conversion",
    value: "3.2%",
    change: "+0.5%",
    trend: "up",
    icon: Target,
    description: "Visitor to customer rate",
  },
]

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Track your website performance and user engagement</p>
        </div>

        {/* Analytics Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {analyticsMetrics.map((metric) => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={`text-xs font-medium ${
                      metric.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {metric.change}
                  </span>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <RevenueChart />
          <UserActivityChart />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <SalesBreakdownChart />
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors come from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { source: "Organic Search", visitors: "45.2K", percentage: 42 },
                  { source: "Direct", visitors: "28.1K", percentage: 26 },
                  { source: "Social Media", visitors: "18.5K", percentage: 17 },
                  { source: "Referral", visitors: "10.8K", percentage: 10 },
                  { source: "Email", visitors: "5.4K", percentage: 5 },
                ].map((item) => (
                  <div key={item.source} className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium truncate">{item.source}</span>
                        <span className="text-sm text-muted-foreground">{item.visitors}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium w-10 text-right">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
