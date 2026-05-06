import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import type { AdminBibliotecaDocumentoInputDTO } from "@/features/admin/biblioteca/dto/admin-biblioteca.dto"
import {
  createAdminBibliotecaDocument,
  getAdminBibliotecaOverview,
} from "@/features/admin/biblioteca/server/admin-biblioteca.service"

function parseTopicos(raw: string | null): string[] {
  if (!raw || typeof raw !== "string") {
    return []
  }

  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
}

function parseDocumentInput(formData: FormData): AdminBibliotecaDocumentoInputDTO {
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
    const formData = await request.formData()
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "Selecione um arquivo PDF." },
        { status: 400 }
      )
    }

    const doc = await createAdminBibliotecaDocument(parseDocumentInput(formData), file)

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
