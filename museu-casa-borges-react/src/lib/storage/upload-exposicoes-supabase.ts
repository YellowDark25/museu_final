import { uploadBufferToSupabasePublicBucket } from "@/lib/storage/supabase-public-buckets"

const BUCKET = "exposicoes"

/**
 * Envia imagem para o bucket público `exposicoes` no Supabase Storage.
 * Retorna URL pública para gravar no banco.
 */
export async function uploadExposicaoImageToSupabase(params: {
  buffer: Buffer
  extension: string
  /** Subpasta no bucket, ex.: virtuais, artistas */
  subfolder: string
  originalBaseName?: string
  compressRasterImages?: boolean
}): Promise<string> {
  return uploadBufferToSupabasePublicBucket({
    bucket: BUCKET,
    buffer: params.buffer,
    extension: params.extension,
    subfolder: params.subfolder,
    originalBaseName: params.originalBaseName,
    compressRasterImages: params.compressRasterImages,
  })
}
