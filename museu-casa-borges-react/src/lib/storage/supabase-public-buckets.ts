/**
 * Uploads públicos no Supabase Storage (service role no servidor).
 *
 * Buckets necessários no projeto (painel Supabase → Storage): `acervo`, `biblioteca`
 * — leitura pública; escrita via API admin (já autenticada) usando esta stack.
 *
 * URLs antigas em S3 continuam a ser apagadas via `removeUploadedObject` em removePublicStoredFile.
 */

import { randomUUID } from "node:crypto"

import { supabase } from "@/lib/supabase"

import { prepareRasterImageForStorage } from "@/lib/storage/compress-upload-buffer"
import { mimeTypeForExtension, normalizeExtension } from "@/lib/storage/mime-types"

import { removeUploadedObject } from "./object-storage"

export const SUPABASE_BUCKET_ACERVO = "acervo"
export const SUPABASE_BUCKET_BIBLIOTECA = "biblioteca"

/** Reexport para callers que já importavam daqui. */
export { mimeTypeForExtension } from "@/lib/storage/mime-types"

/**
 * Extrai bucket e caminho interno a partir da URL pública do Storage.
 */
export function parseSupabasePublicStorageUrl(
  url: string
): { bucket: string; path: string } | null {
  try {
    const u = new URL(url)
    const parts = u.pathname.split("/").filter(Boolean)
    const publicIdx = parts.indexOf("public")
    if (publicIdx === -1 || publicIdx + 1 >= parts.length) {
      return null
    }
    const bucket = parts[publicIdx + 1]
    const pathSegments = parts.slice(publicIdx + 2)
    if (!bucket || pathSegments.length === 0) {
      return null
    }
    const path = pathSegments.map((s) => decodeURIComponent(s)).join("/")
    return { bucket, path }
  } catch {
    return null
  }
}

export async function uploadBufferToSupabasePublicBucket(options: {
  bucket: string
  buffer: Buffer
  extension: string
  /** Pasta lógica dentro do bucket, ex.: midias, documentos */
  subfolder: string
  originalBaseName?: string
  contentType?: string
  /**
   * Redimensiona/comprime imagens raster (JPEG/PNG/WebP/GIF estático) antes do upload.
   * PDF e outros tipos são ignorados. Predefinição: true.
   */
  compressRasterImages?: boolean
}): Promise<string> {
  let buffer = options.buffer
  let ext = normalizeExtension(options.extension)

  if (options.compressRasterImages !== false) {
    const prepared = await prepareRasterImageForStorage(buffer, ext)
    buffer = prepared.buffer
    ext = normalizeExtension(prepared.extension)
  }

  const safeBase = (options.originalBaseName ?? "file")
    .replace(/[^\w\-]+/g, "_")
    .slice(0, 80)
  const segment = options.subfolder.replace(/^\/+|\/+$/g, "")
  const key = `${segment}/${Date.now()}-${safeBase}-${randomUUID().slice(0, 8)}${ext}`

  const contentType =
    options.compressRasterImages !== false
      ? mimeTypeForExtension(ext)
      : options.contentType ?? mimeTypeForExtension(ext)

  const { data, error } = await supabase.storage
    .from(options.bucket)
    .upload(key, buffer, {
      contentType,
      upsert: false,
    })

  if (error) {
    throw new Error(error.message)
  }

  const { data: pub } = supabase.storage.from(options.bucket).getPublicUrl(data.path)
  return pub.publicUrl
}

/**
 * Remove objeto no Supabase Storage se a URL for deste projeto; senão delega em remoção S3 (legado).
 */
export async function removePublicStoredFile(url: string | null): Promise<void> {
  if (!url?.trim()) {
    return
  }

  const parsed = parseSupabasePublicStorageUrl(url)
  if (parsed) {
    const { error } = await supabase.storage.from(parsed.bucket).remove([parsed.path])
    if (error) {
      console.warn("[supabase storage] remove:", error.message)
    }
    return
  }

  await removeUploadedObject(url)
}
