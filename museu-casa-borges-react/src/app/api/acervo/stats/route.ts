import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

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
export async function GET() {
  try {
    const projectRoot = process.cwd()
    const publicDir = path.join(projectRoot, "public")

    const photoDirs = [path.join(publicDir, "acervo", "fotos_acervo")]
    const documentDirs = [
      path.join(publicDir, "Artigos"),
      path.join(publicDir, "Pesquisas"),
      path.join(publicDir, "Publicações"),
      path.join(publicDir, "TCC"),
    ]

    const videoDirs = [
      path.join(publicDir, "videos"),
      path.join(publicDir, "Vídeos"),
      path.join(publicDir, "Video"),
      path.join(publicDir, "Vídeo"),
    ]
    const audioDirs = [
      path.join(publicDir, "audios"),
      path.join(publicDir, "Áudios"),
      path.join(publicDir, "audio"),
      path.join(publicDir, "Áudio"),
    ]

    const countFiles = (dir: string, allowedExts: Set<string>) => {
      try {
        if (!fs.existsSync(dir)) return 0
        const entries = fs.readdirSync(dir, { withFileTypes: true })
        return entries.filter(e => e.isFile()).filter(e => {
          const ext = path.extname(e.name).toLowerCase()
          return allowedExts.size ? allowedExts.has(ext) : true
        }).length
      } catch {
        return 0
      }
    }

    const sumCounts = (dirs: string[], exts: Set<string>) =>
      dirs.reduce((acc, d) => acc + countFiles(d, exts), 0)

    const imgExts = new Set([".jpg", ".jpeg", ".png", ".webp"])
    const pdfExts = new Set([".pdf"])
    const videoExts = new Set([".mp4", ".mov", ".avi", ".mkv", ".webm"])
    const audioExts = new Set([".mp3", ".wav", ".aac", ".flac", ".ogg"])

    const fotografias = sumCounts(photoDirs, imgExts)
    const documentos = sumCounts(documentDirs, pdfExts)
    const videos = sumCounts(videoDirs, videoExts)
    const audios = sumCounts(audioDirs, audioExts)

    return NextResponse.json({
      documentos,
      fotografias,
      videos,
      audios,
      updatedAt: new Date().toISOString(),
    })
  } catch (err) {
    return NextResponse.json({ error: "Falha ao calcular estatísticas do acervo" }, { status: 500 })
  }
}
