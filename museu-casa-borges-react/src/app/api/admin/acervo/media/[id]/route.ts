import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import type { AdminAcervoMediaInputDTO } from "@/features/admin/acervo/dto/admin-acervo.dto"
import {
  deleteAdminAcervoMedia,
  updateAdminAcervoMedia,
} from "@/features/admin/acervo/server/admin-acervo.service"

type Props = {
  params: Promise<{
    id: string
  }>
}

function parseMediaId(value: string) {
  const mediaId = Number(value)

  if (!Number.isInteger(mediaId) || mediaId <= 0) {
    throw new Error("Mídia inválida.")
  }

  return mediaId
}

export async function PATCH(request: Request, { params }: Props) {
  const session = await getAdminSession()

  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  let body: AdminAcervoMediaInputDTO

  try {
    body = (await request.json()) as AdminAcervoMediaInputDTO
  } catch {
    return NextResponse.json({ message: "Payload inválido." }, { status: 400 })
  }

  try {
    const { id } = await params
    const media = await updateAdminAcervoMedia(parseMediaId(id), body)

    return NextResponse.json(media)
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível atualizar a mídia.",
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
    const mediaId = parseMediaId(id)
    await deleteAdminAcervoMedia(mediaId)

    return NextResponse.json({ id: mediaId })
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível excluir a mídia.",
      },
      { status: 400 }
    )
  }
}
