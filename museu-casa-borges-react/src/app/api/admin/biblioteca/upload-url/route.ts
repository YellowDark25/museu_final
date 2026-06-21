import { NextResponse } from "next/server"
import path from "node:path"
import { randomUUID } from "node:crypto"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import { supabase } from "@/lib/supabase"
import { SUPABASE_BUCKET_BIBLIOTECA } from "@/lib/storage/supabase-public-buckets"

const ALLOWED_EXTENSIONS = new Set([".pdf"])
const MAX_SIZE_BYTES = 40 * 1024 * 1024

export async function GET(request: Request) {
  const session = await getAdminSession()

  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const filename = searchParams.get("filename") ?? "documento.pdf"
  const sizeParam = searchParams.get("size")
  const fileSize = sizeParam ? Number(sizeParam) : null

  if (fileSize && fileSize > MAX_SIZE_BYTES) {
    return NextResponse.json(
      { message: "O PDF excede o tamanho máximo permitido (40 MB)." },
      { status: 400 }
    )
  }

  const ext = path.extname(filename).toLowerCase()

  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json(
      { message: "Envie um arquivo PDF." },
      { status: 400 }
    )
  }

  const safeBase = path
    .basename(filename, ext)
    .replace(/[^\w\-]+/g, "_")
    .slice(0, 80) || "documento"

  const storagePath = `documentos/${Date.now()}-${safeBase}-${randomUUID().slice(0, 8)}${ext}`

  const { data, error } = await supabase.storage
    .from(SUPABASE_BUCKET_BIBLIOTECA)
    .createSignedUploadUrl(storagePath)

  if (error || !data) {
    return NextResponse.json(
      { message: "Não foi possível gerar a URL de upload." },
      { status: 500 }
    )
  }

  const { data: pub } = supabase.storage
    .from(SUPABASE_BUCKET_BIBLIOTECA)
    .getPublicUrl(storagePath)

  return NextResponse.json({
    signedUrl: data.signedUrl,
    publicUrl: pub.publicUrl,
  })
}
