import path from "node:path"

import { supabase } from "@/lib/supabase"
import {
  removePublicStoredFile,
  SUPABASE_BUCKET_BIBLIOTECA,
  uploadBufferToSupabasePublicBucket,
} from "@/lib/storage/supabase-public-buckets"
import type {
  AdminBibliotecaDocumentoDTO,
  AdminBibliotecaDocumentoInputDTO,
  AdminBibliotecaOverviewDTO,
  AdminBibliotecaTabDTO,
} from "@/features/admin/biblioteca/dto/admin-biblioteca.dto"

const ALLOWED_BIBLIOTECA_TABS = new Set<AdminBibliotecaTabDTO>([
  "publicacoes",
  "pesquisas",
  "artigos",
  "tcc",
])

const ALLOWED_UPLOAD_EXTENSIONS = new Set([".pdf"])

const MAX_UPLOAD_SIZE_IN_BYTES = 40 * 1024 * 1024

type PublicacaoRow = {
  id: number
  titulo: string
  autor: string | null
  descricao: string | null
  url_arquivo: string | null
  ano: number | null
  tipo: string | null
  data_publicacao: string | null
  topicos: string[]
  visualizacoes: number
  rating: number
  ordem: number
}

function serializeDocument(row: PublicacaoRow): AdminBibliotecaDocumentoDTO {
  return {
    id: row.id,
    titulo: row.titulo,
    autor: row.autor,
    descricao: row.descricao,
    urlArquivo: row.url_arquivo,
    ano: row.ano,
    tipo: (row.tipo as AdminBibliotecaTabDTO) ?? null,
    dataPublicacao: row.data_publicacao?.slice(0, 10) ?? null,
    topicos: row.topicos ?? [],
    visualizacoes: row.visualizacoes,
    rating: row.rating,
    ordem: row.ordem ?? 0,
  }
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

  const safeBase = path
    .basename(originalName, extension)
    .replace(/[^\w\-]+/g, "_")
    .slice(0, 80)

  const buffer = Buffer.from(await file.arrayBuffer())

  return uploadBufferToSupabasePublicBucket({
    bucket: SUPABASE_BUCKET_BIBLIOTECA,
    buffer,
    extension,
    subfolder: "documentos",
    originalBaseName: safeBase || "documento",
    contentType: "application/pdf",
  })
}

function parseDataPublicacao(
  value: string | null | undefined
): string | null {
  if (!value || !String(value).trim()) {
    return null
  }

  const d = new Date(`${value}T12:00:00`)
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10)
}

function yearFromInput(input: AdminBibliotecaDocumentoInputDTO): number | null {
  if (input.ano != null && Number.isFinite(input.ano)) {
    return Math.trunc(input.ano)
  }

  const dateStr = parseDataPublicacao(input.dataPublicacao)
  if (dateStr) {
    return new Date(dateStr).getFullYear()
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
  data_publicacao: string | null
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
    data_publicacao: parseDataPublicacao(input.dataPublicacao),
    topicos,
    ano: yearFromInput(input),
    visualizacoes: Math.max(0, Math.trunc(input.visualizacoes ?? 0)),
    rating,
    ordem: Math.max(0, Math.trunc(input.ordem ?? 0)),
  }
}

function sortDocumentsForAdmin(rows: PublicacaoRow[]): PublicacaoRow[] {
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
  const { data: rows, error } = await supabase
    .from("publicacoes")
    .select(
      "id, titulo, autor, descricao, url_arquivo, ano, tipo, data_publicacao, topicos, visualizacoes, rating, ordem"
    )
    .order("id", { ascending: false })

  if (error) throw error

  return {
    documentos: sortDocumentsForAdmin(rows as PublicacaoRow[]).map(serializeDocument),
  }
}

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
  const url_arquivo = await saveBibliotecaUpload(file)

  try {
    const { data: row, error } = await supabase
      .from("publicacoes")
      .insert({
        titulo: data.titulo,
        autor: data.autor,
        descricao: data.descricao,
        url_arquivo,
        ano: data.ano,
        tipo: data.tipo,
        data_publicacao: data.data_publicacao,
        topicos: data.topicos,
        visualizacoes: data.visualizacoes,
        rating: data.rating,
        ordem: data.ordem,
      })
      .select(
        "id, titulo, autor, descricao, url_arquivo, ano, tipo, data_publicacao, topicos, visualizacoes, rating, ordem"
      )
      .single()

    if (error) throw error

    return serializeDocument(row as PublicacaoRow)
  } catch (error) {
    await removePublicStoredFile(url_arquivo)
    throw error
  }
}

export async function updateAdminBibliotecaDocument(
  documentId: number,
  input: AdminBibliotecaDocumentoInputDTO,
  file?: File
): Promise<AdminBibliotecaDocumentoDTO> {
  const { data: existing } = await supabase
    .from("publicacoes")
    .select("id, url_arquivo")
    .eq("id", documentId)
    .maybeSingle()

  if (!existing) {
    throw new Error("Documento não encontrado.")
  }

  const data = await validateInput(input, { requireTitulo: true })

  let url_arquivo = existing.url_arquivo

  if (file) {
    const nextUrl = await saveBibliotecaUpload(file)
    url_arquivo = nextUrl
    await removePublicStoredFile(existing.url_arquivo)
  }

  const { data: row, error } = await supabase
    .from("publicacoes")
    .update({
      titulo: data.titulo,
      autor: data.autor,
      descricao: data.descricao,
      url_arquivo,
      ano: data.ano,
      tipo: data.tipo,
      data_publicacao: data.data_publicacao,
      topicos: data.topicos,
      visualizacoes: data.visualizacoes,
      rating: data.rating,
      ordem: data.ordem,
    })
    .eq("id", documentId)
    .select(
      "id, titulo, autor, descricao, url_arquivo, ano, tipo, data_publicacao, topicos, visualizacoes, rating, ordem"
    )
    .single()

  if (error) throw error

  return serializeDocument(row as PublicacaoRow)
}

export async function deleteAdminBibliotecaDocument(documentId: number) {
  const { data: row, error } = await supabase
    .from("publicacoes")
    .delete()
    .eq("id", documentId)
    .select("url_arquivo")
    .single()

  if (error) throw error

  await removePublicStoredFile(row.url_arquivo)
}
