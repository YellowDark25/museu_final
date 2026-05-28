import { uploadBufferToSupabasePublicBucket } from "@/lib/storage/supabase-public-buckets"

const BUCKET = "exposicoes"

export async function uploadNoticiaImageToSupabase(params: {
  buffer: Buffer
  extension: string
  originalBaseName?: string
}): Promise<string> {
  return uploadBufferToSupabasePublicBucket({
    bucket: BUCKET,
    buffer: params.buffer,
    extension: params.extension,
    subfolder: "noticias",
    originalBaseName: params.originalBaseName,
  })
}
