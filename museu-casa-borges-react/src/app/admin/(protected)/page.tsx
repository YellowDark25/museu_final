import { AdminDashboard } from "@/features/admin/components/AdminDashboard"
import { getAdminDashboardData } from "@/features/admin/server/admin-content.service"

export default async function AdminPage() {
  const data = await getAdminDashboardData()

  return <AdminDashboard data={data} />
}
