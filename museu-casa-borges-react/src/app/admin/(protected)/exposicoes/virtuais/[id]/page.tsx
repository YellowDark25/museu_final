import { notFound } from "next/navigation"

import { AdminExposicaoConteudoPage } from "@/features/admin/exposicoes/components/AdminExposicaoConteudoPage"
import { getExposicaoVirtualById } from "@/features/admin/exposicoes/server/admin-exposicoes.service"

interface Props {
  params: Promise<{ id: string }>
}

export default async function AdminExposicaoConteudoRoutePage({ params }: Props) {
  const { id } = await params
  const exposicao = await getExposicaoVirtualById(Number(id))

  if (!exposicao) {
    notFound()
  }

  return <AdminExposicaoConteudoPage exposicao={exposicao} />
}
