import type {
  ExposicaoVirtualComSecoesDTO,
  ExposicaoVirtualEditorBlock,
  SectionDados,
  SectionType,
} from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"

export function exposicaoSecoesToBlocks(
  exposicao: ExposicaoVirtualComSecoesDTO
): ExposicaoVirtualEditorBlock[] {
  return exposicao.secoes.map((secao) => ({
    localId: `db-${secao.id}`,
    tipo: secao.tipo as SectionType,
    dados: secao.dados as SectionDados,
  }))
}
