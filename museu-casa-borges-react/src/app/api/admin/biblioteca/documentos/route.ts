import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import type { AdminBibliotecaDocumentoInputDTO } from "@/features/admin/biblioteca/dto/admin-biblioteca.dto"
import {
  createAdminBibliotecaDocument,
  getAdminBibliotecaOverview,
} from "@/features/admin/biblioteca/server/admin-biblioteca.service"

export async function GET() {
  const session = await getAdminSession()

  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  const data = await getAdminBibliotecaOverview()

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const session = await getAdminSession()

  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    let body: AdminBibliotecaDocumentoInputDTO

    try {
      body = (await request.json()) as AdminBibliotecaDocumentoInputDTO
    } catch {
      return NextResponse.json({ message: "Payload inválido." }, { status: 400 })
    }

    const doc = await createAdminBibliotecaDocument(body)

    return NextResponse.json(doc, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível criar o documento.",
      },
      { status: 400 }
    )
  }
}
