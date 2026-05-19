import { NextResponse } from "next/server"

import { createSolicitacaoVisita } from "@/features/visitas/server/visitas.service"
import type { SolicitacaoVisitaInputDTO } from "@/features/visitas/dto/visitas.dto"

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as SolicitacaoVisitaInputDTO
    const solicitacao = await createSolicitacaoVisita(input)
    return NextResponse.json(solicitacao, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao enviar solicitação." },
      { status: 400 }
    )
  }
}
