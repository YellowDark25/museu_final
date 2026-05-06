import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import {
  createArtista,
  getArtistasExposicao,
} from "@/features/admin/exposicoes/server/admin-exposicoes.service"
import type { ArtistaExposicaoInputDTO } from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"

export async function GET(request: Request) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const exposicaoId = searchParams.get("exposicaoId")
  if (!exposicaoId) {
    return NextResponse.json({ message: "exposicaoId é obrigatório." }, { status: 400 })
  }

  const artistas = await getArtistasExposicao(Number(exposicaoId))
  return NextResponse.json(artistas)
}

export async function POST(request: Request) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    const input = (await request.json()) as ArtistaExposicaoInputDTO
    const artista = await createArtista(input)
    return NextResponse.json(artista, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao criar artista." },
      { status: 400 }
    )
  }
}
