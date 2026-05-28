import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import {
  createNoticia,
  getAdminNoticiasOverview,
} from "@/features/noticias/server/noticias.service"
import type { NoticiaInputDTO } from "@/features/noticias/dto/noticias.dto"

export async function GET() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    const data = await getAdminNoticiasOverview()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao carregar notícias." },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    const input = (await request.json()) as NoticiaInputDTO
    const noticia = await createNoticia(input)
    return NextResponse.json(noticia, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao criar notícia." },
      { status: 400 }
    )
  }
}
