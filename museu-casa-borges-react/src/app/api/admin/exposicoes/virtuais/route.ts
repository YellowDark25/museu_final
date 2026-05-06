import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import {
  createExposicaoVirtual,
  getExposicoesVirtuaisOverview,
} from "@/features/admin/exposicoes/server/admin-exposicoes.service"
import type { ExposicaoVirtualInputDTO } from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"

export async function GET() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  const data = await getExposicoesVirtuaisOverview()
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    const input = (await request.json()) as ExposicaoVirtualInputDTO
    const expo = await createExposicaoVirtual(input)
    return NextResponse.json(expo, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao criar exposição." },
      { status: 400 }
    )
  }
}
