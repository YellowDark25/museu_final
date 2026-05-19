export type EventoCategoria = "proximos" | "regulares" | "especiais" | "educativos"
export type EventoTipo = "processo" | "atividade" | "tarefa"
export type EventoStatus = "pendente" | "atrasada" | "concluida" | "cancelada"

export type EventoDTO = {
  id: number
  titulo: string
  slug: string
  descricao: string | null
  dataInicio: string
  dataFim: string | null
  local: string | null
  categoria: EventoCategoria
  tipo: EventoTipo
  status: EventoStatus
  cor: string
  gratuito: boolean
  valorIngresso: number | null
  vagas: number | null
  publicado: boolean
  ordem: number
  createdAt: string
  updatedAt: string
}

export type EventoInputDTO = {
  titulo: string
  descricao?: string | null
  dataInicio: string
  dataFim?: string | null
  local?: string | null
  categoria?: EventoCategoria
  tipo?: EventoTipo
  status?: EventoStatus
  cor?: string
  gratuito?: boolean
  valorIngresso?: number | null
  vagas?: number | null
  publicado?: boolean
  ordem?: number
}

export const EVENTO_TIPO_CORES: Record<EventoTipo, string> = {
  processo: "#3b82f6",
  atividade: "#7c3aed",
  tarefa: "#f97316",
}

export const EVENTO_CATEGORIA_LABELS: Record<EventoCategoria, string> = {
  proximos: "Próximos",
  regulares: "Regulares",
  especiais: "Especiais",
  educativos: "Educativos",
}

export const EVENTO_TIPO_LABELS: Record<EventoTipo, string> = {
  processo: "Processo",
  atividade: "Atividade",
  tarefa: "Tarefa",
}

export const EVENTO_STATUS_LABELS: Record<EventoStatus, string> = {
  pendente: "Pendente",
  atrasada: "Atrasada",
  concluida: "Concluída",
  cancelada: "Cancelada",
}
