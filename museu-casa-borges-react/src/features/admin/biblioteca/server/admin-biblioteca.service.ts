import { mkdir, unlink, writeFile } from "node:fs/promises"
import path from "node:path"
import { randomUUID } from "node:crypto"

import { prisma } from "@/lib/prisma"
import type {
  AdminBibliotecaDocumentoDTO,
  AdminBibliotecaDocumentoInputDTO,
  AdminBibliotecaOverviewDTO,
  AdminBibliotecaTabDTO,
} from "@/features/admin/biblioteca/dto/admin-biblioteca.dto"

const BIBLIOTECA_UPLOAD_DIRECTORY = path.join(
  process.cwd(),
  "public",
  "uploads",
  "biblioteca"
)

const BIBLIOTECA_UPLOAD_URL_PREFIX = "/uploads/biblioteca"

const ALLOWED_BIBLIOTECA_TABS = new Set<AdminBibliotecaTabDTO>([
  "publicacoes",
  "pesquisas",
  "artigos",
  "tcc",
])

const ALLOWED_UPLOAD_EXTENSIONS = new Set([".pdf"])

const MAX_UPLOAD_SIZE_IN_BYTES = 40 * 1024 * 1024

function serializeDocument(row: {
  id: number
  titulo: string
  autor: string | null
  descricao: string | null
  urlArquivo: string | null
  ano: number | null
  tipo: string | null
  dataPublicacao: Date | null
  topicos: string[]
  visualizacoes: number
  rating: number
  ordem?: number
}): AdminBibliotecaDocumentoDTO {
  return {
    id: row.id,
    titulo: row.titulo,
    autor: row.autor,
    descricao: row.descricao,
    urlArquivo: row.urlArquivo,
    ano: row.ano,
    tipo: (row.tipo as AdminBibliotecaTabDTO) ?? null,
    dataPublicacao: row.dataPublicacao?.toISOString().slice(0, 10) ?? null,
    topicos: row.topicos ?? [],
    visualizacoes: row.visualizacoes,
    rating: row.rating,
    ordem: row.ordem ?? 0,
  }
}

function getBibliotecaUploadPathFromUrl(url: string | null): string | null {
  if (!url || !url.startsWith(`${BIBLIOTECA_UPLOAD_URL_PREFIX}/`)) {
    return null
  }

  const relative = url.slice(BIBLIOTECA_UPLOAD_URL_PREFIX.length + 1)
  const resolved = path.join(BIBLIOTECA_UPLOAD_DIRECTORY, relative)

  if (!resolved.startsWith(BIBLIOTECA_UPLOAD_DIRECTORY)) {
    return null
  }

  return resolved
}

async function saveBibliotecaUpload(file: File): Promise<string> {
  const originalName = file.name.trim() || "documento.pdf"
  const extension = path.extname(originalName).toLowerCase()

  if (!ALLOWED_UPLOAD_EXTENSIONS.has(extension)) {
    throw new Error("Envie um arquivo PDF.")
  }

  if (file.size > MAX_UPLOAD_SIZE_IN_BYTES) {
    throw new Error("O PDF excede o tamanho máximo permitido (40 MB).")
  }

  await mkdir(BIBLIOTECA_UPLOAD_DIRECTORY, { recursive: true })

  const safeBase = path
    .basename(originalName, extension)
    .replace(/[^\w\-]+/g, "_")
    .slice(0, 80)

  const finalName = `${Date.now()}-${safeBase}-${randomUUID().slice(0, 8)}${extension}`
  const diskPath = path.join(BIBLIOTECA_UPLOAD_DIRECTORY, finalName)
  const buffer = Buffer.from(await file.arrayBuffer())

  await writeFile(diskPath, buffer)

  return `${BIBLIOTECA_UPLOAD_URL_PREFIX}/${finalName}`
}

function parseDataPublicacao(
  value: string | null | undefined
): Date | null {
  if (!value || !String(value).trim()) {
    return null
  }

  const d = new Date(`${value}T12:00:00`)
  return Number.isNaN(d.getTime()) ? null : d
}

function yearFromInput(input: AdminBibliotecaDocumentoInputDTO): number | null {
  if (input.ano != null && Number.isFinite(input.ano)) {
    return Math.trunc(input.ano)
  }

  const d = parseDataPublicacao(input.dataPublicacao)
  if (d) {
    return d.getFullYear()
  }

  return null
}

async function validateInput(
  input: AdminBibliotecaDocumentoInputDTO,
  options: { requireTitulo?: boolean } = {}
): Promise<{
  titulo: string
  autor: string | null
  descricao: string | null
  tipo: AdminBibliotecaTabDTO
  dataPublicacao: Date | null
  topicos: string[]
  ano: number | null
  visualizacoes: number
  rating: number
  ordem: number
}> {
  const titulo = input.titulo.trim()

  if (options.requireTitulo !== false && titulo.length === 0) {
    throw new Error("Informe o nome da obra.")
  }

  if (!ALLOWED_BIBLIOTECA_TABS.has(input.tipo)) {
    throw new Error("Selecione uma aba válida da biblioteca.")
  }

  const topicos = (input.topicos ?? [])
    .map((t) => t.trim())
    .filter(Boolean)

  const rating = Math.min(5, Math.max(1, Math.round(input.rating ?? 5)))

  return {
    titulo,
    autor: input.autor?.trim() ? input.autor.trim() : null,
    descricao: input.descricao?.trim() ? input.descricao.trim() : null,
    tipo: input.tipo,
    dataPublicacao: parseDataPublicacao(input.dataPublicacao),
    topicos,
    ano: yearFromInput(input),
    visualizacoes: Math.max(0, Math.trunc(input.visualizacoes ?? 0)),
    rating,
    ordem: Math.max(0, Math.trunc(input.ordem ?? 0)),
  }
}

function sortDocumentsForAdmin<
  T extends {
    id: number
    ordem?: number
  },
>(rows: T[]): T[] {
  return [...rows].sort((a, b) => {
    const ao = typeof a.ordem === "number" ? a.ordem : 0
    const bo = typeof b.ordem === "number" ? b.ordem : 0
    if (ao !== bo) {
      return ao - bo
    }
    return b.id - a.id
  })
}

export async function getAdminBibliotecaOverview(): Promise<AdminBibliotecaOverviewDTO> {
  // orderBy apenas por `id`: compatível com cliente Prisma antigo em cache (sem campo `ordem`).
  const rows = await prisma.publicacao.findMany({
    orderBy: { id: "desc" },
  })

  return {
    documentos: sortDocumentsForAdmin(rows).map(serializeDocument),
  }
}

/** Lista pública para o site — mesmos dados serializados. */
export async function listPublicBibliotecaDocumentos(): Promise<
  AdminBibliotecaDocumentoDTO[]
> {
  const overview = await getAdminBibliotecaOverview()
  return overview.documentos.filter((d) => d.urlArquivo)
}

export async function createAdminBibliotecaDocument(
  input: AdminBibliotecaDocumentoInputDTO,
  file: File
): Promise<AdminBibliotecaDocumentoDTO> {
  const data = await validateInput(input, { requireTitulo: true })
  const url = await saveBibliotecaUpload(file)

  try {
    const row = await prisma.publicacao.create({
      data: {
        titulo: data.titulo,
        autor: data.autor,
        descricao: data.descricao,
        urlArquivo: url,
        ano: data.ano,
        tipo: data.tipo,
        dataPublicacao: data.dataPublicacao,
        topicos: data.topicos,
        visualizacoes: data.visualizacoes,
        rating: data.rating,
        ordem: data.ordem,
      },
    })

    return serializeDocument(row)
  } catch (error) {
    const filePath = getBibliotecaUploadPathFromUrl(url)

    if (filePath) {
      await unlink(filePath).catch(() => undefined)
    }

    throw error
  }
}

export async function updateAdminBibliotecaDocument(
  documentId: number,
  input: AdminBibliotecaDocumentoInputDTO,
  file?: File
): Promise<AdminBibliotecaDocumentoDTO> {
  const existing = await prisma.publicacao.findUnique({
    where: { id: documentId },
  })

  if (!existing) {
    throw new Error("Documento não encontrado.")
  }

  const data = await validateInput(input, { requireTitulo: true })

  let urlArquivo = existing.urlArquivo

  if (file) {
    const nextUrl = await saveBibliotecaUpload(file)
    const oldPath = getBibliotecaUploadPathFromUrl(existing.urlArquivo)

    urlArquivo = nextUrl

    if (oldPath) {
      await unlink(oldPath).catch(() => undefined)
    }
  }

  const row = await prisma.publicacao.update({
    where: { id: documentId },
    data: {
      titulo: data.titulo,
      autor: data.autor,
      descricao: data.descricao,
      urlArquivo,
      ano: data.ano,
      tipo: data.tipo,
      dataPublicacao: data.dataPublicacao,
      topicos: data.topicos,
      visualizacoes: data.visualizacoes,
      rating: data.rating,
      ordem: data.ordem,
    },
  })

  return serializeDocument(row)
}

export async function deleteAdminBibliotecaDocument(documentId: number) {
  const row = await prisma.publicacao.delete({
    where: { id: documentId },
    select: { urlArquivo: true },
  })

  const filePath = getBibliotecaUploadPathFromUrl(row.urlArquivo)

  if (filePath) {
    await unlink(filePath).catch(() => undefined)
  }
}
