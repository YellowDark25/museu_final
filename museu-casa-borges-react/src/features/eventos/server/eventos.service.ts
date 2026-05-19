import { supabase } from "@/lib/supabase"
import { generateSlug } from "@/features/admin/exposicoes/utils/slug"
import type { EventoDTO, EventoInputDTO } from "@/features/eventos/dto/eventos.dto"
import { EVENTO_TIPO_CORES } from "@/features/eventos/dto/eventos.dto"

function normalizeNull(value: string | undefined | null): string | null {
  if (!value) return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

function serializeEvento(row: {
  id: number
  titulo: string
  slug: string
  descricao: string | null
  data_inicio: string
  data_fim: string | null
  local: string | null
  categoria: string
  tipo: string
  status: string
  cor: string
  gratuito: boolean
  valor_ingresso: number | null
  vagas: number | null
  publicado: boolean
  ordem: number
  created_at: string
  updated_at: string
}): EventoDTO {
  return {
    id: row.id,
    titulo: row.titulo,
    slug: row.slug,
    descricao: row.descricao,
    dataInicio: row.data_inicio,
    dataFim: row.data_fim,
    local: row.local,
    categoria: row.categoria as EventoDTO["categoria"],
    tipo: row.tipo as EventoDTO["tipo"],
    status: row.status as EventoDTO["status"],
    cor: row.cor,
    gratuito: row.gratuito,
    valorIngresso: row.valor_ingresso,
    vagas: row.vagas,
    publicado: row.publicado,
    ordem: row.ordem,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

async function ensureSlugAvailable(slug: string, excludeId?: number) {
  let query = supabase.from("eventos").select("id").eq("slug", slug)
  if (excludeId) {
    query = query.neq("id", excludeId)
  }
  const { data } = await query.maybeSingle()
  if (data) {
    throw new Error(`Já existe um evento com o slug "${slug}".`)
  }
}

function resolveCor(tipo: EventoDTO["tipo"], cor?: string) {
  return cor?.trim() || EVENTO_TIPO_CORES[tipo] || EVENTO_TIPO_CORES.atividade
}

export async function listEventosPublicos(start?: string, end?: string): Promise<EventoDTO[]> {
  let query = supabase
    .from("eventos")
    .select("*")
    .eq("publicado", true)
    .order("data_inicio", { ascending: true })

  if (start) {
    query = query.gte("data_inicio", start)
  }
  if (end) {
    query = query.lte("data_inicio", end)
  }

  const { data, error } = await query
  if (error) throw error
  return (data ?? []).map(serializeEvento)
}

export async function listEventosAdmin(start?: string, end?: string): Promise<EventoDTO[]> {
  let query = supabase.from("eventos").select("*").order("data_inicio", { ascending: true })

  if (start) {
    query = query.gte("data_inicio", start)
  }
  if (end) {
    query = query.lte("data_inicio", end)
  }

  const { data, error } = await query
  if (error) throw error
  return (data ?? []).map(serializeEvento)
}

export async function createEvento(input: EventoInputDTO): Promise<EventoDTO> {
  const titulo = input.titulo.trim()
  if (!titulo) throw new Error("Informe o título do evento.")
  if (!input.dataInicio) throw new Error("Informe a data de início.")

  const slug = generateSlug(titulo)
  if (!slug) throw new Error("Não foi possível gerar um slug válido.")

  await ensureSlugAvailable(slug)

  const tipo = input.tipo ?? "atividade"
  const categoria = input.categoria ?? "proximos"

  const { data, error } = await supabase
    .from("eventos")
    .insert({
      titulo,
      slug,
      descricao: normalizeNull(input.descricao),
      data_inicio: input.dataInicio,
      data_fim: input.dataFim ?? null,
      local: normalizeNull(input.local),
      categoria,
      tipo,
      status: input.status ?? "pendente",
      cor: resolveCor(tipo, input.cor),
      gratuito: input.gratuito ?? true,
      valor_ingresso: input.gratuito ? null : (input.valorIngresso ?? null),
      vagas: input.vagas ?? null,
      publicado: input.publicado ?? false,
      ordem: input.ordem ?? 0,
    })
    .select("*")
    .single()

  if (error) throw error
  return serializeEvento(data)
}

export async function updateEvento(id: number, input: EventoInputDTO): Promise<EventoDTO> {
  const titulo = input.titulo.trim()
  if (!titulo) throw new Error("Informe o título do evento.")
  if (!input.dataInicio) throw new Error("Informe a data de início.")

  const slug = generateSlug(titulo)
  await ensureSlugAvailable(slug, id)

  const tipo = input.tipo ?? "atividade"
  const categoria = input.categoria ?? "proximos"

  const { data, error } = await supabase
    .from("eventos")
    .update({
      titulo,
      slug,
      descricao: normalizeNull(input.descricao),
      data_inicio: input.dataInicio,
      data_fim: input.dataFim ?? null,
      local: normalizeNull(input.local),
      categoria,
      tipo,
      status: input.status ?? "pendente",
      cor: resolveCor(tipo, input.cor),
      gratuito: input.gratuito ?? true,
      valor_ingresso: input.gratuito ? null : (input.valorIngresso ?? null),
      vagas: input.vagas ?? null,
      publicado: input.publicado ?? false,
      ordem: input.ordem ?? 0,
    })
    .eq("id", id)
    .select("*")
    .single()

  if (error) throw error
  return serializeEvento(data)
}

export async function deleteEvento(id: number): Promise<void> {
  const { error } = await supabase.from("eventos").delete().eq("id", id)
  if (error) throw error
}
