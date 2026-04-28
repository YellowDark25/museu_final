export type AdminAcervoCategoryLayout = "lista" | "galeria"

export interface AdminAcervoCategoryDTO {
  id: number
  nome: string
  slug: string | null
  tipo: string | null
  descricao: string | null
  ordem: number
  ativa: boolean
  exibirComoAba: boolean
  layoutPublico: AdminAcervoCategoryLayout
  mediaCount: number
  criadoEm: string | null
}

export interface AdminAcervoMediaDTO {
  id: number
  categoriaId: number
  categoriaNome: string | null
  nome: string | null
  url: string
  tipo: string | null
  legenda: string | null
  ordem: number
}

export interface AdminAcervoOverviewDTO {
  categories: AdminAcervoCategoryDTO[]
  media: AdminAcervoMediaDTO[]
}

export interface AdminAcervoCategoryInputDTO {
  nome: string
  slug: string
  tipo: string
  descricao: string
  ordem: number
  ativa: boolean
  exibirComoAba: boolean
  layoutPublico: AdminAcervoCategoryLayout
}

export interface AdminAcervoMediaInputDTO {
  categoriaId: number | null
  nome: string
  tipo: string
  legenda: string
  ordem: number
}

export interface AdminAcervoMutationErrorDTO {
  message: string
}
