import { NextResponse } from "next/server"

import { listEventosPublicos } from "@/features/eventos/server/eventos.service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const start = searchParams.get("start") ?? undefined
    const end = searchParams.get("end") ?? undefined
    const eventos = await listEventosPublicos(start, end)
    return NextResponse.json(eventos)
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao carregar eventos." },
      { status: 500 }
    )
  }
}
