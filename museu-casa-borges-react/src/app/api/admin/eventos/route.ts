import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import { createEvento, listEventosAdmin } from "@/features/eventos/server/eventos.service"
import type { EventoInputDTO } from "@/features/eventos/dto/eventos.dto"

export async function GET(request: Request) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const start = searchParams.get("start") ?? undefined
    const end = searchParams.get("end") ?? undefined
    const eventos = await listEventosAdmin(start, end)
    return NextResponse.json(eventos)
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao carregar eventos." },
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
    const input = (await request.json()) as EventoInputDTO
    const evento = await createEvento(input)
    return NextResponse.json(evento, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao criar evento." },
      { status: 400 }
    )
  }
}
