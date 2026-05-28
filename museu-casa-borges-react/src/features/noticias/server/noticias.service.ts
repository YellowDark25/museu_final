import { supabase } from "@/lib/supabase"
import type {
  AdminNoticiasOverviewDTO,
  NoticiaDTO,
  NoticiaInputDTO,
} from "@/features/noticias/dto/noticias.dto"

function normalizeNull(value: string | undefined | null): string | null {
  if (!value) return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

function serializeNoticia(row: {
  id: number
  titulo: string
  imagem_url: string
  link_destino: string | null
  publicado: boolean
  exibir_popup: boolean
  data_inicio: string | null
  data_fim: string | null
  created_at: string
  updated_at: string
}): NoticiaDTO {
  return {
    id: row.id,
    titulo: row.titulo,
    imagemUrl: row.imagem_url,
    linkDestino: row.link_destino,
    publicado: row.publicado,
    exibirPopup: row.exibir_popup,
    dataInicio: row.data_inicio,
    dataFim: row.data_fim,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function isWithinSchedule(dataInicio: string | null, dataFim: string | null, now = new Date()) {
  if (dataInicio && new Date(dataInicio) > now) return false
  if (dataFim && new Date(dataFim) < now) return false
  return true
}

async function ensureSingleActivePopup(excludeId?: number) {
  let query = supabase.from("noticias").update({ exibir_popup: false }).eq("exibir_popup", true)
  if (excludeId) {
    query = query.neq("id", excludeId)
  }
  const { error } = await query
  if (error) throw error
}

export async function getNoticiaPopupAtiva(): Promise<NoticiaDTO | null> {
  const { data, error } = await supabase
    .from("noticias")
    .select("*")
    .eq("publicado", true)
    .eq("exibir_popup", true)
    .order("updated_at", { ascending: false })

  if (error) throw error

  const active = (data ?? []).find((row) =>
    isWithinSchedule(row.data_inicio, row.data_fim)
  )

  return active ? serializeNoticia(active) : null
}

export async function listNoticiasAdmin(): Promise<NoticiaDTO[]> {
  const { data, error } = await supabase
    .from("noticias")
    .select("*")
    .order("updated_at", { ascending: false })

  if (error) throw error
  return (data ?? []).map(serializeNoticia)
}

export async function getAdminNoticiasOverview(): Promise<AdminNoticiasOverviewDTO> {
  const noticias = await listNoticiasAdmin()
  const popupAtivo = noticias.filter(
    (noticia) =>
      noticia.publicado &&
      noticia.exibirPopup &&
      isWithinSchedule(noticia.dataInicio, noticia.dataFim)
  ).length

  return {
    noticias,
    kpis: {
      total: noticias.length,
      publicadas: noticias.filter((noticia) => noticia.publicado).length,
      popupAtivo,
    },
  }
}

export async function createNoticia(input: NoticiaInputDTO): Promise<NoticiaDTO> {
  const titulo = input.titulo.trim()
  const imagemUrl = input.imagemUrl.trim()

  if (!titulo) throw new Error("Informe o título da notícia.")
  if (!imagemUrl) throw new Error("Envie a imagem da notícia.")

  const publicado = input.publicado ?? false
  const exibirPopup = input.exibirPopup ?? true

  if (publicado && exibirPopup) {
    await ensureSingleActivePopup()
  }

  const { data, error } = await supabase
    .from("noticias")
    .insert({
      titulo,
      imagem_url: imagemUrl,
      link_destino: normalizeNull(input.linkDestino),
      publicado,
      exibir_popup: exibirPopup,
      data_inicio: normalizeNull(input.dataInicio ?? null),
      data_fim: normalizeNull(input.dataFim ?? null),
    })
    .select("*")
    .single()

  if (error) throw error
  return serializeNoticia(data)
}

export async function updateNoticia(id: number, input: NoticiaInputDTO): Promise<NoticiaDTO> {
  const titulo = input.titulo.trim()
  const imagemUrl = input.imagemUrl.trim()

  if (!titulo) throw new Error("Informe o título da notícia.")
  if (!imagemUrl) throw new Error("Envie a imagem da notícia.")

  const publicado = input.publicado ?? false
  const exibirPopup = input.exibirPopup ?? true

  if (publicado && exibirPopup) {
    await ensureSingleActivePopup(id)
  }

  const { data, error } = await supabase
    .from("noticias")
    .update({
      titulo,
      imagem_url: imagemUrl,
      link_destino: normalizeNull(input.linkDestino),
      publicado,
      exibir_popup: exibirPopup,
      data_inicio: normalizeNull(input.dataInicio ?? null),
      data_fim: normalizeNull(input.dataFim ?? null),
    })
    .eq("id", id)
    .select("*")
    .single()

  if (error) throw error
  return serializeNoticia(data)
}

export async function deleteNoticia(id: number): Promise<void> {
  const { error } = await supabase.from("noticias").delete().eq("id", id)
  if (error) throw error
}
