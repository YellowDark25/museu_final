import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import { updateSolicitacaoVisitaStatus } from "@/features/visitas/server/visitas.service"
import type { VisitaStatus } from "@/features/visitas/dto/visitas.dto"

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    const { id } = await context.params
    const body = (await request.json()) as {
      status: VisitaStatus
      observacaoAdmin?: string | null
    }

    if (body.status !== "aceita" && body.status !== "recusada") {
      return NextResponse.json({ message: "Status inválido." }, { status: 400 })
    }

    const solicitacao = await updateSolicitacaoVisitaStatus(
      Number(id),
      body.status,
      body.observacaoAdmin
    )
    return NextResponse.json(solicitacao)
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao atualizar solicitação." },
      { status: 400 }
    )
  }
}
