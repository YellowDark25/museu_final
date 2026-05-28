import { AdminNoticiasPage } from "@/features/admin/noticias/components/AdminNoticiasPage"
import { getAdminNoticiasOverview } from "@/features/noticias/server/noticias.service"

export default async function AdminNoticiasRoutePage() {
  const data = await getAdminNoticiasOverview()

  return <AdminNoticiasPage initialData={data} />
}
