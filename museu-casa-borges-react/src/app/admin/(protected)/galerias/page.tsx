import { AdminGaleriasPage } from "@/features/admin/galerias/components/AdminGaleriasPage"
import { getAdminGaleriasOverview } from "@/features/galerias/server/admin-galerias.service"

export default async function AdminGaleriasRoute() {
  const initialData = await getAdminGaleriasOverview()
  return <AdminGaleriasPage initialData={initialData} />
}
