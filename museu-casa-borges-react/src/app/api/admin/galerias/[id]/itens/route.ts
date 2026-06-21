import { NextResponse } from "next/server"
import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import {
  addGaleriaItem,
} from "@/features/galerias/server/admin-galerias.service"
import type { GaleriaItemInputDTO } from "@/features/galerias/dto/galerias.dto"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }
  try {
    const { id } = await params
    const input = (await request.json()) as GaleriaItemInputDTO
    const item = await addGaleriaItem(Number(id), input)
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao adicionar item." },
      { status: 400 }
    )
  }
}
