import { NextResponse } from "next/server"
import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import { deleteGaleriaItem } from "@/features/galerias/server/admin-galerias.service"

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }
  try {
    const { itemId } = await params
    await deleteGaleriaItem(Number(itemId))
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao excluir item." },
      { status: 400 }
    )
  }
}
