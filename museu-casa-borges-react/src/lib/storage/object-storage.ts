/**
 * Uploads públicos: S3-compatible (AWS, Cloudflare R2, MinIO na VPS, etc.)
 * ou disco local em `public/uploads/...` quando o modo S3 não está configurado.
 *
 * Variáveis (modo objeto): STORAGE_DRIVER=s3, S3_BUCKET, S3_ACCESS_KEY_ID,
 * S3_SECRET_ACCESS_KEY, S3_PUBLIC_BASE_URL, opcionalmente S3_ENDPOINT, S3_REGION,
 * S3_FORCE_PATH_STYLE=true (MinIO).
 */

import { mkdir, unlink, writeFile } from "node:fs/promises"
import path from "node:path"
import { randomUUID } from "node:crypto"

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"

const LOCAL_PUBLIC_ROOT = path.join(process.cwd(), "public")

export type UploadPrefix = "acervo" | "biblioteca"

const LOCAL_URL_PREFIX: Record<UploadPrefix, string> = {
  acervo: "/uploads/acervo",
  biblioteca: "/uploads/biblioteca",
}

function envFlag(name: string): boolean {
  return process.env[name]?.toLowerCase() === "true" || process.env[name] === "1"
}

/** Usa S3 quando explicitamente pedido ou quando credenciais + bucket + URL pública existem. */
export function useObjectStorage(): boolean {
  const driver = process.env.STORAGE_DRIVER?.toLowerCase()
  if (driver === "local") {
    return false
  }
  if (driver === "s3") {
    return true
  }
  return Boolean(
    process.env.S3_BUCKET &&
      process.env.S3_ACCESS_KEY_ID &&
      process.env.S3_SECRET_ACCESS_KEY &&
      process.env.S3_PUBLIC_BASE_URL
  )
}

function createS3Client(): S3Client {
  const endpoint = process.env.S3_ENDPOINT?.trim() || undefined
  return new S3Client({
    region: process.env.S3_REGION?.trim() || "auto",
    endpoint,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
    forcePathStyle:
      envFlag("S3_FORCE_PATH_STYLE") || Boolean(endpoint),
  })
}

const CONTENT_TYPE_BY_EXT: Record<string, string> = {
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
}

function guessContentType(extension: string): string {
  const ext = extension.startsWith(".") ? extension.toLowerCase() : `.${extension.toLowerCase()}`
  return CONTENT_TYPE_BY_EXT[ext] ?? "application/octet-stream"
}

function normalizeExtension(extension: string): string {
  return extension.startsWith(".") ? extension.toLowerCase() : `.${extension.toLowerCase()}`
}

/**
 * Envia bytes para o armazenamento configurado e devolve a URL pública a gravar no banco.
 */
export async function uploadPublicObject(options: {
  prefix: UploadPrefix
  extension: string
  buffer: Buffer
  /** Nome base seguro para o arquivo (sem path); opcional */
  originalBaseName?: string
  contentType?: string
}): Promise<string> {
  const ext = normalizeExtension(options.extension)
  const safeBase = (options.originalBaseName ?? "file")
    .replace(/[^\w\-]+/g, "_")
    .slice(0, 80)

  const keyName = `${Date.now()}-${safeBase}-${randomUUID().slice(0, 8)}${ext}`
  const objectKey = `${options.prefix}/${keyName}`

  if (!useObjectStorage()) {
    const uploadDir = path.join(LOCAL_PUBLIC_ROOT, "uploads", options.prefix)
    await mkdir(uploadDir, { recursive: true })
    const diskPath = path.join(uploadDir, keyName)
    await writeFile(diskPath, options.buffer)
    return `${LOCAL_URL_PREFIX[options.prefix]}/${keyName}`
  }

  const bucket = process.env.S3_BUCKET!.trim()
  const publicBase = process.env.S3_PUBLIC_BASE_URL!.trim().replace(/\/$/, "")
  const client = createS3Client()

  const acl = process.env.S3_OBJECT_ACL?.trim()

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: objectKey,
      Body: options.buffer,
      ContentType: options.contentType ?? guessContentType(ext),
      ...(acl ? { ACL: acl as "public-read" } : {}),
    })
  )

  return `${publicBase}/${objectKey}`
}

/**
 * Remove arquivo local ou objeto S3 a partir da mesma URL guardada no banco.
 */
export async function removeUploadedObject(url: string | null): Promise<void> {
  if (!url?.trim()) {
    return
  }

  if (url.startsWith("/uploads/")) {
    const relative = url.replace(/^\/+/, "")
    const fullPath = path.join(LOCAL_PUBLIC_ROOT, relative)
    if (!fullPath.startsWith(LOCAL_PUBLIC_ROOT)) {
      return
    }
    await unlink(fullPath).catch(() => undefined)
    return
  }

  if (!useObjectStorage()) {
    return
  }

  const publicBase = process.env.S3_PUBLIC_BASE_URL?.trim().replace(/\/$/, "")
  if (!publicBase || !url.startsWith(publicBase)) {
    return
  }

  const key = decodeURIComponent(url.slice(publicBase.length).replace(/^\//, ""))
  if (!key) {
    return
  }

  const client = createS3Client()
  await client
    .send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET!.trim(),
        Key: key,
      })
    )
    .catch(() => undefined)
}
