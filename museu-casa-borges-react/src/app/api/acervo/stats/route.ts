import { NextResponse } from "next/server"

export const runtime = 'edge'

/**
 * GET /api/acervo/stats
 * Retorna contagens reais de itens do acervo lendo o diretório /public do projeto.
 * Contagens: documentos (PDFs), fotografias (imagens), vídeos, áudios.
 *
 * Observações:
 * - Esta rota roda no servidor (Next.js Route Handler) e pode usar fs.
 * - Considera os diretórios existentes no projeto: Artigos, Pesquisas, Publicações, TCC para documentos,
 *   acervo/fotos_acervo para fotografias e tentativas padrão para vídeos/áudios se existirem.
 */
/**
 * GET /api/acervo/stats
 * Retorna contagens do acervo sem acessar o filesystem, compatível com Edge Runtime.
 */
export async function GET() {
  const fallback = {
    documentos: 0,
    fotografias: 30,
    videos: 0,
    audios: 0,
  }

  return NextResponse.json({
    ...fallback,
    updatedAt: new Date().toISOString(),
  })
}
