import { supabase } from "@/lib/supabase"
import type {
  AdminVisitasOverviewDTO,
  SolicitacaoVisitaDTO,
  SolicitacaoVisitaInputDTO,
  VisitaStatus,
} from "@/features/visitas/dto/visitas.dto"

function normalizeNull(value: string | undefined | null): string | null {
  if (!value) return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

function serialize(row: {
  id: number
  email: string
  nome_instituicao: string
  objetivo_visita: string | null
  numero_pessoas: string | null
  telefone: string
  endereco: string | null
  data_visita: string
  horario_visita: string
  comentarios: string | null
  status: string
  observacao_admin: string | null
  created_at: string
  updated_at: string
  respondido_em: string | null
}): SolicitacaoVisitaDTO {
  return {
    id: row.id,
    email: row.email,
    nomeInstituicao: row.nome_instituicao,
    objetivoVisita: row.objetivo_visita,
    numeroPessoas: row.numero_pessoas,
    telefone: row.telefone,
    endereco: row.endereco,
    dataVisita: row.data_visita,
    horarioVisita: row.horario_visita,
    comentarios: row.comentarios,
    status: row.status as VisitaStatus,
    observacaoAdmin: row.observacao_admin,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    respondidoEm: row.respondido_em,
  }
}

export async function createSolicitacaoVisita(
  input: SolicitacaoVisitaInputDTO
): Promise<SolicitacaoVisitaDTO> {
  const email = input.email.trim()
  const nomeInstituicao = input.nomeInstituicao.trim()
  const telefone = input.telefone.trim()

  if (!email) throw new Error("Informe o e-mail.")
  if (!nomeInstituicao) throw new Error("Informe o nome ou instituição.")
  if (!telefone) throw new Error("Informe o telefone.")
  if (!input.dataVisita) throw new Error("Informe a data da visita.")
  if (!input.horarioVisita) throw new Error("Informe o horário da visita.")

  const { data, error } = await supabase
    .from("solicitacoes_visita")
    .insert({
      email,
      nome_instituicao: nomeInstituicao,
      objetivo_visita: normalizeNull(input.objetivoVisita),
      numero_pessoas: normalizeNull(input.numeroPessoas),
      telefone,
      endereco: normalizeNull(input.endereco),
      data_visita: input.dataVisita,
      horario_visita: input.horarioVisita,
      comentarios: normalizeNull(input.comentarios),
      status: "pendente",
    })
    .select("*")
    .single()

  if (error) throw error
  return serialize(data)
}

export async function listVisitasAceitas(start?: string, end?: string): Promise<SolicitacaoVisitaDTO[]> {
  let query = supabase
    .from("solicitacoes_visita")
    .select("*")
    .eq("status", "aceita")
    .order("data_visita", { ascending: true })
    .order("horario_visita", { ascending: true })

  if (start) {
    query = query.gte("data_visita", start.slice(0, 10))
  }
  if (end) {
    query = query.lte("data_visita", end.slice(0, 10))
  }

  const { data, error } = await query
  if (error) throw error
  return (data ?? []).map(serialize)
}

export async function getAdminVisitasOverview(): Promise<AdminVisitasOverviewDTO> {
  const { data, error } = await supabase
    .from("solicitacoes_visita")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error

  const solicitacoes = (data ?? []).map(serialize)
  return {
    solicitacoes,
    kpis: {
      total: solicitacoes.length,
      pendentes: solicitacoes.filter((s) => s.status === "pendente").length,
      aceitas: solicitacoes.filter((s) => s.status === "aceita").length,
      recusadas: solicitacoes.filter((s) => s.status === "recusada").length,
    },
  }
}

export async function updateSolicitacaoVisitaStatus(
  id: number,
  status: Exclude<VisitaStatus, "pendente">,
  observacaoAdmin?: string | null
): Promise<SolicitacaoVisitaDTO> {
  const { data, error } = await supabase
    .from("solicitacoes_visita")
    .update({
      status,
      observacao_admin: normalizeNull(observacaoAdmin),
      respondido_em: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single()

  if (error) throw error
  return serialize(data)
}
