import { AdminDashboard } from "@/features/admin/components/AdminDashboard"
import { getAdminAnalyticsOverview } from "@/features/analytics/server/analytics.service"

export default async function AdminPage() {
  const month = new Date().toISOString().slice(0, 7)
  const data = await getAdminAnalyticsOverview(month)

  return <AdminDashboard data={data} />
}
