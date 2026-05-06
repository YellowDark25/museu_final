import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import {
  saveArtistaSecoes,
  getArtistaById,
} from "@/features/admin/exposicoes/server/admin-exposicoes.service"
import type { ArtistaSecaoInputDTO } from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"

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
    const artistaId = Number(id)

    const artista = await getArtistaById(artistaId)
    if (!artista) {
      return NextResponse.json({ message: "Artista não encontrado." }, { status: 404 })
    }

    const body = (await request.json()) as { secoes: ArtistaSecaoInputDTO[] }
    const secoes = await saveArtistaSecoes(artistaId, body.secoes)

    return NextResponse.json({ ...artista, secoes })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao salvar seções." },
      { status: 400 }
    )
  }
}
