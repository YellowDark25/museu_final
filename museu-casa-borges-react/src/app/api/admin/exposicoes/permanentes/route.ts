import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import { createExposicaoPermanente } from "@/features/admin/exposicoes/server/admin-exposicoes.service"
import type { ExposicaoPermanenteInputDTO } from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"

export async function POST(request: Request) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    const input = (await request.json()) as ExposicaoPermanenteInputDTO
    const expo = await createExposicaoPermanente(input)
    return NextResponse.json(expo, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao criar exposição permanente." },
      { status: 400 }
    )
  }
}
