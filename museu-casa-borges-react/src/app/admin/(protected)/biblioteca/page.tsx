import { AdminBibliotecaPage } from "@/features/admin/biblioteca/components/AdminBibliotecaPage"
import { getAdminBibliotecaOverview } from "@/features/admin/biblioteca/server/admin-biblioteca.service"

export default async function AdminBibliotecaRoutePage() {
  const data = await getAdminBibliotecaOverview()

  return <AdminBibliotecaPage initialData={data} />
}
