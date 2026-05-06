import type { Json } from "@/lib/database.types"

export type SectionType = "text" | "subtitle" | "image" | "image_grid"

export interface SectionDadosText {
  content: string
}

export interface SectionDadosSubtitle {
  content: string
}

export interface SectionDadosImage {
  src: string
  alt: string
  caption?: string
  href?: string
}

export interface SectionDadosImageGrid {
  items: Array<{
    src: string
    alt: string
    caption?: string
    href?: string
  }>
}

export type SectionDados =
  | SectionDadosText
  | SectionDadosSubtitle
  | SectionDadosImage
  | SectionDadosImageGrid

export interface ExposicaoVirtualSecaoDTO {
  id: number
  exposicaoId: number
  tipo: SectionType
  dados: SectionDados
  ordem: number
}

export interface ExposicaoVirtualDTO {
  id: number
  titulo: string
  slug: string
  descricaoCurta: string | null
  imagemCapa: string | null
  publicado: boolean
  ordem: number
  autor: string | null
  createdAt: string | null
}

export interface ExposicaoVirtualComSecoesDTO extends ExposicaoVirtualDTO {
  secoes: ExposicaoVirtualSecaoDTO[]
}

export interface ExposicaoVirtualInputDTO {
  titulo: string
  descricaoCurta?: string
  imagemCapa?: string
  publicado?: boolean
  ordem?: number
  autor?: string
}

export interface ExposicaoVirtualSecaoInputDTO {
  tipo: SectionType
  dados: Json
  ordem: number
}

/** Estado de um bloco no editor admin (fonte única de verdade no componente pai). */
export interface ExposicaoVirtualEditorBlock {
  localId: string
  tipo: SectionType
  dados: SectionDados
}

export interface ArtistaExposicaoDTO {
  id: number
  exposicaoId: number
  nome: string
  slug: string
  fotoUrl: string | null
  publicado: boolean
  ordem: number
}

export interface ArtistaExposicaoComSecoesDTO extends ArtistaExposicaoDTO {
  secoes: ArtistaSecaoDTO[]
}

export interface ArtistaSecaoDTO {
  id: number
  artistaId: number
  tipo: SectionType
  dados: SectionDados
  ordem: number
}

export interface ArtistaExposicaoInputDTO {
  exposicaoId: number
  nome: string
  fotoUrl?: string
  publicado?: boolean
  ordem?: number
}

export interface ArtistaSecaoInputDTO {
  tipo: SectionType
  dados: Json
  ordem: number
}

export interface ExposicaoPermanenteDTO {
  id: number
  titulo: string
  slug: string
  descricao: string | null
  imagemCapa: string | null
  publicado: boolean
  ordem: number
}

export interface ExposicaoPermanenteInputDTO {
  titulo: string
  descricao?: string
  imagemCapa?: string
  publicado?: boolean
  ordem?: number
}

export interface ExposicaoTemporariaDTO {
  id: number
  titulo: string
  slug: string
  descricao: string | null
  imagemCapa: string | null
  dataInicio: string | null
  dataFim: string | null
  publicado: boolean
  ordem: number
}

export interface ExposicaoTemporariaInputDTO {
  titulo: string
  descricao?: string
  imagemCapa?: string
  dataInicio?: string
  dataFim?: string
  publicado?: boolean
  ordem?: number
}

export interface AdminExposicoesMutationErrorDTO {
  message: string
}

export interface AdminExposicoesOverviewDTO {
  virtuais: ExposicaoVirtualDTO[]
  permanentes: ExposicaoPermanenteDTO[]
  temporarias: ExposicaoTemporariaDTO[]
}
