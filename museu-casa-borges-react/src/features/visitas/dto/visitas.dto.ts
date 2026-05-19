export type VisitaStatus = "pendente" | "aceita" | "recusada"

export type SolicitacaoVisitaDTO = {
  id: number
  email: string
  nomeInstituicao: string
  objetivoVisita: string | null
  numeroPessoas: string | null
  telefone: string
  endereco: string | null
  dataVisita: string
  horarioVisita: string
  comentarios: string | null
  status: VisitaStatus
  observacaoAdmin: string | null
  createdAt: string
  updatedAt: string
  respondidoEm: string | null
}

export type SolicitacaoVisitaInputDTO = {
  email: string
  nomeInstituicao: string
  objetivoVisita?: string | null
  numeroPessoas?: string | null
  telefone: string
  endereco?: string | null
  dataVisita: string
  horarioVisita: string
  comentarios?: string | null
}

export type AdminVisitasOverviewDTO = {
  solicitacoes: SolicitacaoVisitaDTO[]
  kpis: {
    total: number
    pendentes: number
    aceitas: number
    recusadas: number
  }
}

export const VISITA_STATUS_LABELS: Record<VisitaStatus, string> = {
  pendente: "Pendente",
  aceita: "Aceita",
  recusada: "Recusada",
}
