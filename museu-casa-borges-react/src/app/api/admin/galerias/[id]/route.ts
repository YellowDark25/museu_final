import { NextResponse } from "next/server"
import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import {
  updateGaleria,
  deleteGaleria,
} from "@/features/galerias/server/admin-galerias.service"
import type { GaleriaAlbumInputDTO } from "@/features/galerias/dto/galerias.dto"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }
  try {
    const { id } = await params
    const input = (await request.json()) as GaleriaAlbumInputDTO
    const galeria = await updateGaleria(Number(id), input)
    return NextResponse.json(galeria)
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao atualizar galeria." },
      { status: 400 }
    )
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }
  try {
    const { id } = await params
    await deleteGaleria(Number(id))
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao excluir galeria." },
      { status: 400 }
    )
  }
}
