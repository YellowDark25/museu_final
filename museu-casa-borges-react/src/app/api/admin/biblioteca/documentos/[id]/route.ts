import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import type { AdminBibliotecaDocumentoInputDTO } from "@/features/admin/biblioteca/dto/admin-biblioteca.dto"
import {
  deleteAdminBibliotecaDocument,
  updateAdminBibliotecaDocument,
} from "@/features/admin/biblioteca/server/admin-biblioteca.service"

type Props = {
  params: Promise<{
    id: string
  }>
}

function parseDocumentId(value: string) {
  const id = Number(value)

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Documento inválido.")
  }

  return id
}

export async function PATCH(request: Request, { params }: Props) {
  const session = await getAdminSession()

  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    const { id } = await params
    const documentId = parseDocumentId(id)

    let body: AdminBibliotecaDocumentoInputDTO

    try {
      body = (await request.json()) as AdminBibliotecaDocumentoInputDTO
    } catch {
      return NextResponse.json({ message: "Payload inválido." }, { status: 400 })
    }

    const doc = await updateAdminBibliotecaDocument(documentId, body)

    return NextResponse.json(doc)
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível atualizar o documento.",
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
    const documentId = parseDocumentId(id)
    await deleteAdminBibliotecaDocument(documentId)

    return NextResponse.json({ id: documentId })
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível excluir o documento.",
      },
      { status: 400 }
    )
  }
}
