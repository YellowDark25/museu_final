export type NoticiaDTO = {
  id: number
  titulo: string
  imagemUrl: string
  linkDestino: string | null
  publicado: boolean
  exibirPopup: boolean
  dataInicio: string | null
  dataFim: string | null
  createdAt: string
  updatedAt: string
}

export type NoticiaInputDTO = {
  titulo: string
  imagemUrl: string
  linkDestino?: string
  publicado?: boolean
  exibirPopup?: boolean
  dataInicio?: string | null
  dataFim?: string | null
}

export type AdminNoticiasOverviewDTO = {
  noticias: NoticiaDTO[]
  kpis: {
    total: number
    publicadas: number
    popupAtivo: number
  }
}
