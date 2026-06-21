export interface GaleriaItemDTO {
  id: number
  albumId: number
  url: string
  titulo: string | null
  legenda: string | null
  categoriaItem: string | null
  ordem: number
}

export interface GaleriaAlbumDTO {
  id: number
  titulo: string
  slug: string
  descricao: string | null
  capaUrl: string | null
  dataEvento: string | null
  categoria: string | null
  publicado: boolean
  ordem: number
  totalFotos?: number
  itens?: GaleriaItemDTO[]
  createdAt: string
  updatedAt: string
}

export interface GaleriaAlbumInputDTO {
  titulo: string
  slug: string
  descricao?: string | null
  capaUrl?: string | null
  dataEvento?: string | null
  categoria?: string | null
  publicado?: boolean
  ordem?: number
}

export interface GaleriaItemInputDTO {
  url: string
  titulo?: string | null
  legenda?: string | null
  categoriaItem?: string | null
  ordem?: number
}

export interface AdminGaleriasOverviewDTO {
  total: number
  publicadas: number
  totalFotos: number
  albuns: GaleriaAlbumDTO[]
}
