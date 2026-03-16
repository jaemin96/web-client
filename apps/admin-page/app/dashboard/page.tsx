import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { RevenueChart } from "@/components/dashboard/charts/revenue-chart"
import { UserActivityChart } from "@/components/dashboard/charts/user-activity-chart"
import { SalesBreakdownChart } from "@/components/dashboard/charts/sales-breakdown-chart"
import { DataTable } from "@/components/dashboard/data-table"
import { AIChatbot } from "@/components/dashboard/ai-chatbot"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your business.
          </p>
        </div>

        {/* Metric Cards */}
        <MetricCards />

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          <RevenueChart />
          <UserActivityChart />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DataTable />
          </div>
          <SalesBreakdownChart />
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot />
    </DashboardLayout>
  )
}
