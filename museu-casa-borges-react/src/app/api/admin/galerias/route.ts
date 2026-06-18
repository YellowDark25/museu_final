import { NextResponse } from "next/server"
import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import {
  createGaleria,
  getAdminGaleriasOverview,
} from "@/features/galerias/server/admin-galerias.service"
import type { GaleriaAlbumInputDTO } from "@/features/galerias/dto/galerias.dto"

export async function GET() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }
  try {
    const data = await getAdminGaleriasOverview()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao carregar galerias." },
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
    const input = (await request.json()) as GaleriaAlbumInputDTO
    const galeria = await createGaleria(input)
    return NextResponse.json(galeria, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao criar galeria." },
      { status: 400 }
    )
  }
}
