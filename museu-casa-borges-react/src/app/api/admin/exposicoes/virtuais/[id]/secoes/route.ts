import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import {
  saveExposicaoSecoes,
  getExposicaoVirtualById,
} from "@/features/admin/exposicoes/server/admin-exposicoes.service"
import type { ExposicaoVirtualSecaoInputDTO } from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function PUT(request: Request, context: RouteContext) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    const { id } = await context.params
    const exposicaoId = Number(id)

    const expo = await getExposicaoVirtualById(exposicaoId)
    if (!expo) {
      return NextResponse.json({ message: "Exposição não encontrada." }, { status: 404 })
    }

    const body = (await request.json()) as { secoes: ExposicaoVirtualSecaoInputDTO[] }
    const secoes = await saveExposicaoSecoes(exposicaoId, body.secoes)

    return NextResponse.json({ ...expo, secoes })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao salvar seções." },
      { status: 400 }
    )
  }
}
