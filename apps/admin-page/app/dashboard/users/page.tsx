import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DataTable } from "@/components/dashboard/data-table"

export default function UsersPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage your team members and their account permissions.
          </p>
        </div>
        <DataTable />
      </div>
    </DashboardLayout>
  )
}
