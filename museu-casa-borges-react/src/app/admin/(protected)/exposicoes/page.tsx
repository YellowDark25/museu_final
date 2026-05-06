import { AdminExposicoesPage } from "@/features/admin/exposicoes/components/AdminExposicoesPage"
import { getExposicoesVirtuaisOverview } from "@/features/admin/exposicoes/server/admin-exposicoes.service"

export default async function AdminExposicoesRoutePage() {
  const data = await getExposicoesVirtuaisOverview()

  return <AdminExposicoesPage initialData={data} />
}
