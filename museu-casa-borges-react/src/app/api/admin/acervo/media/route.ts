import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import type { AdminAcervoMediaInputDTO } from "@/features/admin/acervo/dto/admin-acervo.dto"
import {
  createAdminAcervoMedia,
  getAdminAcervoOverview,
} from "@/features/admin/acervo/server/admin-acervo.service"

function parseMediaInput(formData: FormData): AdminAcervoMediaInputDTO {
  const categoriaIdValue = formData.get("categoriaId")
  const ordemValue = formData.get("ordem")

  return {
    categoriaId:
      typeof categoriaIdValue === "string" && categoriaIdValue.trim().length > 0
        ? Number(categoriaIdValue)
        : null,
    nome: String(formData.get("nome") ?? ""),
    tipo: String(formData.get("tipo") ?? ""),
    legenda: String(formData.get("legenda") ?? ""),
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

  const data = await getAdminAcervoOverview()

  return NextResponse.json({
    media: data.media,
  })
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
        { message: "Selecione um arquivo de mídia." },
        { status: 400 }
      )
    }

    const media = await createAdminAcervoMedia(parseMediaInput(formData), file)

    return NextResponse.json(media, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível salvar a mídia do acervo.",
      },
      { status: 400 }
    )
  }
}
