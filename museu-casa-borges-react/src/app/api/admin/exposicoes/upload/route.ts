import path from "node:path"

import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import { uploadExposicaoImageToSupabase } from "@/lib/storage/upload-exposicoes-supabase"

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"])
const MAX_SIZE = 10 * 1024 * 1024

export async function POST(request: Request) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Selecione um arquivo." }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ message: "Arquivo excede o limite de 10MB." }, { status: 400 })
    }

    const extension = path.extname(file.name).toLowerCase()
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      return NextResponse.json(
        { message: "Apenas imagens JPG, PNG, WebP e GIF são permitidas." },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const baseName = path.basename(file.name, extension).trim() || "exposicao"

    const url = await uploadExposicaoImageToSupabase({
      subfolder: "virtuais",
      extension,
      buffer,
      originalBaseName: baseName,
    })

    return NextResponse.json({ url }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro no upload." },
      { status: 400 }
    )
  }
}
