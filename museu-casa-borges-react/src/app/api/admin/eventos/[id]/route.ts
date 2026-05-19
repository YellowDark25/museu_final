import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import { deleteEvento, updateEvento } from "@/features/eventos/server/eventos.service"
import type { EventoInputDTO } from "@/features/eventos/dto/eventos.dto"

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    const { id } = await context.params
    const input = (await request.json()) as EventoInputDTO
    const evento = await updateEvento(Number(id), input)
    return NextResponse.json(evento)
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao atualizar evento." },
      { status: 400 }
    )
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    const { id } = await context.params
    await deleteEvento(Number(id))
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao excluir evento." },
      { status: 400 }
    )
  }
}
