import { AdminVisitasPage } from "@/features/admin/visitas/components/AdminVisitasPage"
import { getAdminVisitasOverview } from "@/features/visitas/server/visitas.service"

export default async function AdminVisitasRoutePage() {
  const data = await getAdminVisitasOverview()

  return <AdminVisitasPage initialData={data} />
}
