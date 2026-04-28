export type AdminModuleSlug =
  | "acervo"
  | "biblioteca"
  | "exposicoes"
  | "galerias"
  | "paginas"
  | "equipe"
  | "configuracoes"

export type AdminIconKey =
  | "archive"
  | "book-open"
  | "images"
  | "layout-panel-top"
  | "settings"
  | "sparkles"
  | "users"

export type AdminModuleReadiness = "fundacao" | "em_planejamento" | "pronto_para_integracao"

export type AdminRecordStatus = "rascunho" | "publicado" | "arquivado"

export type AdminFieldType =
  | "texto"
  | "textarea"
  | "slug"
  | "data"
  | "booleano"
  | "numero"
  | "select"
  | "imagem"
  | "arquivo"
  | "galeria"
  | "richtext"
  | "url"

export type AdminActionTone = "primaria" | "secundaria" | "ghost"

export interface AdminFieldOptionDTO {
  value: string
  label: string
}

export interface AdminFieldDefinitionDTO {
  name: string
  label: string
  type: AdminFieldType
  required: boolean
  helpText: string
  multiple?: boolean
  accept?: string[]
  options?: AdminFieldOptionDTO[]
}

export interface AdminCollectionDefinitionDTO {
  key: string
  title: string
  description: string
  dtoName: string
  fields: AdminFieldDefinitionDTO[]
}

export interface AdminKpiDTO {
  label: string
  value: string
  description: string
}

export interface AdminNavigationItemDTO {
  label: string
  href: string
  iconKey: AdminIconKey
  module?: AdminModuleSlug
}

export interface AdminActionDTO {
  label: string
  href: string
  tone: AdminActionTone
}

export interface AdminWorkflowStepDTO {
  title: string
  description: string
}

export interface AdminActivityDTO {
  module: string
  title: string
  description: string
  status: AdminRecordStatus
  timestampLabel: string
}

export interface AdminArchitectureNoteDTO {
  title: string
  description: string
}

export interface AdminModuleSummaryDTO {
  slug: AdminModuleSlug
  title: string
  description: string
  iconKey: AdminIconKey
  href: string
  readiness: AdminModuleReadiness
  collections: string[]
  primaryAction: AdminActionDTO
  secondaryAction: AdminActionDTO
}

export interface AdminDashboardDTO {
  title: string
  description: string
  kpis: AdminKpiDTO[]
  navigation: AdminNavigationItemDTO[]
  modules: AdminModuleSummaryDTO[]
  recentActivity: AdminActivityDTO[]
  architectureNotes: AdminArchitectureNoteDTO[]
}

export interface AdminModulePageDTO {
  module: AdminModuleSummaryDTO
  kpis: AdminKpiDTO[]
  collections: AdminCollectionDefinitionDTO[]
  workflows: AdminWorkflowStepDTO[]
  architectureNotes: AdminArchitectureNoteDTO[]
}
