export type AdminBibliotecaTabDTO =
  | "publicacoes"
  | "pesquisas"
  | "artigos"
  | "tcc"

export interface AdminBibliotecaDocumentoDTO {
  id: number
  titulo: string
  autor: string | null
  descricao: string | null
  urlArquivo: string | null
  ano: number | null
  tipo: AdminBibliotecaTabDTO | null
  dataPublicacao: string | null
  topicos: string[]
  visualizacoes: number
  rating: number
  ordem: number
}

export interface AdminBibliotecaDocumentoInputDTO {
  titulo: string
  autor: string | null
  descricao: string | null
  tipo: AdminBibliotecaTabDTO
  dataPublicacao: string | null
  topicos: string[]
  ano: number | null
  visualizacoes: number
  rating: number
  ordem: number
  urlArquivo?: string | null
}

export interface AdminBibliotecaOverviewDTO {
  documentos: AdminBibliotecaDocumentoDTO[]
}

export interface AdminBibliotecaMutationErrorDTO {
  message: string
}
