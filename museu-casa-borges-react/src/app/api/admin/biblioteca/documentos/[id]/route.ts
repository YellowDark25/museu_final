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

function parseTopicos(raw: string | null): string[] {
  if (!raw || typeof raw !== "string") {
    return []
  }

  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
}

function parseDocumentId(value: string) {
  const id = Number(value)

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Documento inválido.")
  }

  return id
}

function parseDocumentInputFromForm(formData: FormData): AdminBibliotecaDocumentoInputDTO {
  const ordemValue = formData.get("ordem")
  const visualizacoesValue = formData.get("visualizacoes")
  const ratingValue = formData.get("rating")
  const anoValue = formData.get("ano")

  return {
    titulo: String(formData.get("titulo") ?? ""),
    autor:
      typeof formData.get("autor") === "string"
        ? String(formData.get("autor"))
        : null,
    descricao:
      typeof formData.get("descricao") === "string"
        ? String(formData.get("descricao"))
        : null,
    tipo: String(formData.get("tipo") ?? "publicacoes") as AdminBibliotecaDocumentoInputDTO["tipo"],
    dataPublicacao:
      typeof formData.get("dataPublicacao") === "string" &&
      String(formData.get("dataPublicacao")).trim().length > 0
        ? String(formData.get("dataPublicacao"))
        : null,
    topicos: parseTopicos(
      typeof formData.get("topicos") === "string"
        ? String(formData.get("topicos"))
        : null
    ),
    ano:
      typeof anoValue === "string" && anoValue.trim().length > 0
        ? Number(anoValue)
        : null,
    visualizacoes:
      typeof visualizacoesValue === "string" && visualizacoesValue.trim().length > 0
        ? Number(visualizacoesValue)
        : 0,
    rating:
      typeof ratingValue === "string" && ratingValue.trim().length > 0
        ? Number(ratingValue)
        : 5,
    ordem:
      typeof ordemValue === "string" && ordemValue.trim().length > 0
        ? Number(ordemValue)
        : 0,
  }
}

export async function PATCH(request: Request, { params }: Props) {
  const session = await getAdminSession()

  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    const { id } = await params
    const documentId = parseDocumentId(id)

    const contentType = request.headers.get("content-type") ?? ""

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData()
      const fileField = formData.get("file")
      const file = fileField instanceof File && fileField.size > 0 ? fileField : undefined

      const doc = await updateAdminBibliotecaDocument(
        documentId,
        parseDocumentInputFromForm(formData),
        file
      )

      return NextResponse.json(doc)
    }

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
