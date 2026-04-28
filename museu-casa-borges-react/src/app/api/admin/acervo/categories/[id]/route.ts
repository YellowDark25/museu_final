import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import type { AdminAcervoCategoryInputDTO } from "@/features/admin/acervo/dto/admin-acervo.dto"
import {
  deleteAdminAcervoCategory,
  updateAdminAcervoCategory,
} from "@/features/admin/acervo/server/admin-acervo.service"

type Props = {
  params: Promise<{
    id: string
  }>
}

function parseCategoryId(value: string) {
  const categoryId = Number(value)

  if (!Number.isInteger(categoryId) || categoryId <= 0) {
    throw new Error("Categoria inválida.")
  }

  return categoryId
}

export async function PATCH(request: Request, { params }: Props) {
  const session = await getAdminSession()

  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  let body: AdminAcervoCategoryInputDTO

  try {
    body = (await request.json()) as AdminAcervoCategoryInputDTO
  } catch {
    return NextResponse.json({ message: "Payload inválido." }, { status: 400 })
  }

  try {
    const { id } = await params
    const category = await updateAdminAcervoCategory(parseCategoryId(id), body)

    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível atualizar a categoria.",
      },
      { status: 400 }
    )
  }
}

export async function DELETE(_: Request, { params }: Props) {
  const session = await getAdminSession()

  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    const { id } = await params
    const categoryId = parseCategoryId(id)
    await deleteAdminAcervoCategory(categoryId)

    return NextResponse.json({ id: categoryId })
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível excluir a categoria.",
      },
      { status: 400 }
    )
  }
}
