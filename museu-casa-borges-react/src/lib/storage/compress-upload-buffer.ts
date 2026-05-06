/**
 * Otimização de imagens raster antes do Storage (Sharp em Node.js nas API Routes).
 *
 * Edge Functions Supabase = Deno → Sharp (nativo Node) não é adequado; comprimir
 * nas rotas Next.js centraliza o fluxo com o mesmo código que já envia ao Storage.
 *
 * PDF / áudio / vídeo: fora de âmbito aqui.
 */

import sharp from "sharp"

import { mimeTypeForExtension, normalizeExtension } from "@/lib/storage/mime-types"

const RASTER_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
])

export type PreparedUploadBuffer = {
  buffer: Buffer
  extension: string
  contentType: string
}

export type CompressImageOptions = {
  maxWidth?: number
  maxHeight?: number
  webpQuality?: number
  jpegQuality?: number
}

const DEFAULT_MAX = 2560

/**
 * Redimensiona (fit inside), corrige EXIF; tenta WebP e, se não compensar, JPEG.
 * GIF animado: sem alteração.
 */
export async function prepareRasterImageForStorage(
  buffer: Buffer,
  extension: string,
  options: CompressImageOptions = {}
): Promise<PreparedUploadBuffer> {
  const ext = normalizeExtension(extension)

  if (!RASTER_EXTENSIONS.has(ext)) {
    return {
      buffer,
      extension: ext,
      contentType: mimeTypeForExtension(ext),
    }
  }

  const maxW = options.maxWidth ?? DEFAULT_MAX
  const maxH = options.maxHeight ?? DEFAULT_MAX
  const webpQ = options.webpQuality ?? 80
  const jpegQ = options.jpegQuality ?? 85

  try {
    if (ext === ".gif") {
      const meta = await sharp(buffer, { animated: true }).metadata()
      if ((meta.pages ?? 1) > 1) {
        return {
          buffer,
          extension: ext,
          contentType: "image/gif",
        }
      }
    }

    const base = sharp(buffer)
      .rotate()
      .resize(maxW, maxH, {
        fit: "inside",
        withoutEnlargement: true,
      })

    const webpBuffer = await base.clone().webp({ quality: webpQ, effort: 4 }).toBuffer()

    let best: PreparedUploadBuffer = {
      buffer: webpBuffer,
      extension: ".webp",
      contentType: "image/webp",
    }

    const jpegBuffer = await base
      .clone()
      .jpeg({ quality: jpegQ, mozjpeg: true })
      .toBuffer()

    if (jpegBuffer.length < best.buffer.length) {
      best = {
        buffer: jpegBuffer,
        extension: ".jpg",
        contentType: "image/jpeg",
      }
    }

    // PNG com menos artefactos em alguns casos — só se ganhar claramente sobre original
    if (ext === ".png") {
      const pngBuffer = await base.clone().png({ compressionLevel: 9 }).toBuffer()
      if (pngBuffer.length < best.buffer.length * 0.98) {
        best = {
          buffer: pngBuffer,
          extension: ".png",
          contentType: "image/png",
        }
      }
    }

    if (best.buffer.length < buffer.length) {
      return best
    }

    return {
      buffer,
      extension: ext,
      contentType: mimeTypeForExtension(ext),
    }
  } catch {
    return {
      buffer,
      extension: ext,
      contentType: mimeTypeForExtension(ext),
    }
  }
}
