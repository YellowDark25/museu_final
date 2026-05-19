import { NextResponse } from "next/server"

import { listVisitasAceitas } from "@/features/visitas/server/visitas.service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const start = searchParams.get("start") ?? undefined
    const end = searchParams.get("end") ?? undefined
    const visitas = await listVisitasAceitas(start, end)
    return NextResponse.json(visitas)
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao carregar visitas." },
      { status: 500 }
    )
  }
}
