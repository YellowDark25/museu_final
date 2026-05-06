/**
 * Uploads via API compatível com S3 (AWS, Cloudflare R2, MinIO, etc.).
 *
 * Variáveis: STORAGE_DRIVER=s3 (opcional se credenciais completas),
 * S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_PUBLIC_BASE_URL,
 * opcionalmente S3_ENDPOINT, S3_REGION, S3_FORCE_PATH_STYLE=true (MinIO).
 *
 * Não há fallback para disco local — configure armazenamento objeto para uploads de acervo/biblioteca.
 */

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"

function envFlag(name: string): boolean {
  return process.env[name]?.toLowerCase() === "true" || process.env[name] === "1"
}

/** True quando credenciais S3 e URL pública estão definidas. */
export function isObjectStorageConfigured(): boolean {
  const driver = process.env.STORAGE_DRIVER?.toLowerCase()
  if (driver === "local") {
    throw new Error(
      "STORAGE_DRIVER=local não é mais suportado. Remova a variável ou use armazenamento objeto (S3/R2/MinIO)."
    )
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

export type UploadPrefix = "acervo" | "biblioteca"

/**
 * Envia bytes para o bucket S3 configurado e devolve a URL pública a gravar no banco.
 */
export async function uploadPublicObject(options: {
  prefix: UploadPrefix
  extension: string
  buffer: Buffer
  originalBaseName?: string
  contentType?: string
}): Promise<string> {
  if (!isObjectStorageConfigured()) {
    throw new Error(
      "Armazenamento de objetos não configurado. Para acervo/biblioteca, defina S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY e S3_PUBLIC_BASE_URL (ou STORAGE_DRIVER=s3)."
    )
  }

  const ext = normalizeExtension(options.extension)
  const safeBase = (options.originalBaseName ?? "file")
    .replace(/[^\w\-]+/g, "_")
    .slice(0, 80)

  const { randomUUID } = await import("node:crypto")
  const keyName = `${Date.now()}-${safeBase}-${randomUUID().slice(0, 8)}${ext}`
  const objectKey = `${options.prefix}/${keyName}`

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
 * Remove objeto S3 a partir da URL pública guardada no banco.
 */
export async function removeUploadedObject(url: string | null): Promise<void> {
  if (!url?.trim()) {
    return
  }

  if (!isObjectStorageConfigured()) {
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
