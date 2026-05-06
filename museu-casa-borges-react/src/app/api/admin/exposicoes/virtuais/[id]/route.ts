import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import {
  updateExposicaoVirtual,
  deleteExposicaoVirtual,
  getExposicaoVirtualById,
} from "@/features/admin/exposicoes/server/admin-exposicoes.service"
import type { ExposicaoVirtualInputDTO } from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  const { id } = await context.params
  const expo = await getExposicaoVirtualById(Number(id))
  if (!expo) {
    return NextResponse.json({ message: "Exposição não encontrada." }, { status: 404 })
  }

  return NextResponse.json(expo)
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    const { id } = await context.params
    const input = (await request.json()) as ExposicaoVirtualInputDTO
    const expo = await updateExposicaoVirtual(Number(id), input)
    return NextResponse.json(expo)
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao atualizar." },
      { status: 400 }
    )
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    const { id } = await context.params
    await deleteExposicaoVirtual(Number(id))
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao excluir." },
      { status: 400 }
    )
  }
}
