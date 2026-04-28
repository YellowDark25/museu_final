import { AdminAcervoPage } from "@/features/admin/acervo/components/AdminAcervoPage"
import { getAdminAcervoOverview } from "@/features/admin/acervo/server/admin-acervo.service"

export default async function AdminAcervoRoutePage() {
  const data = await getAdminAcervoOverview()

  return <AdminAcervoPage initialData={data} />
}
