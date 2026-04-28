import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import type { AdminAcervoCategoryInputDTO } from "@/features/admin/acervo/dto/admin-acervo.dto"
import {
  createAdminAcervoCategory,
  getAdminAcervoOverview,
} from "@/features/admin/acervo/server/admin-acervo.service"

export async function GET() {
  const session = await getAdminSession()

  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  const data = await getAdminAcervoOverview()

  return NextResponse.json({
    categories: data.categories,
  })
}

export async function POST(request: Request) {
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
    const category = await createAdminAcervoCategory(body)

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível criar a categoria.",
      },
      { status: 400 }
    )
  }
}
