export type PublicAcervoTabLayout = "lista" | "galeria"

export interface PublicAcervoStatsDTO {
  documentos: number
  fotografias: number
  videos: number
  audios: number
  updatedAt: string
}

export interface PublicAcervoMediaDTO {
  id: number
  nome: string | null
  url: string
  tipo: string | null
  legenda: string | null
  ordem: number
  categoriaNome: string | null
}

export interface PublicAcervoPhotoDTO {
  id: number
  src: string
  alt: string
  title: string
  description: string
  date: string | null
}

export interface PublicAcervoTabDTO {
  id: number
  slug: string
  nome: string
  descricao: string | null
  layout: PublicAcervoTabLayout
  mediaCount: number
  media: PublicAcervoMediaDTO[]
  photos: PublicAcervoPhotoDTO[]
}

export interface PublicAcervoOverviewDTO {
  stats: PublicAcervoStatsDTO
  tabs: PublicAcervoTabDTO[]
}
