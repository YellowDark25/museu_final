import { uploadBufferToSupabasePublicBucket } from "@/lib/storage/supabase-public-buckets"

const BUCKET = "galerias"

export async function uploadGaleriaImageToSupabase(params: {
  buffer: Buffer
  extension: string
  subfolder?: string
  originalBaseName?: string
}): Promise<string> {
  return uploadBufferToSupabasePublicBucket({
    bucket: BUCKET,
    buffer: params.buffer,
    extension: params.extension,
    subfolder: params.subfolder ?? "itens",
    originalBaseName: params.originalBaseName,
  })
}
