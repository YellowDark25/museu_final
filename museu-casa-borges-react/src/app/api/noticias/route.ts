import { NextResponse } from "next/server"

import { getNoticiaPopupAtiva } from "@/features/noticias/server/noticias.service"

export async function GET() {
  try {
    const noticia = await getNoticiaPopupAtiva()
    return NextResponse.json(noticia)
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao carregar notícia." },
      { status: 500 }
    )
  }
}
