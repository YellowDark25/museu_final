import type { AdminBibliotecaDocumentoDTO } from "@/features/admin/biblioteca/dto/admin-biblioteca.dto"
import type { BibliotecaTabSlug, PublicacaoData } from "@/lib/file-utils"

const TAB_LABELS: Record<BibliotecaTabSlug, string> = {
  publicacoes: "Publicações",
  pesquisas: "Pesquisas",
  artigos: "Artigos",
  tcc: "TCC",
}

function isTabSlug(value: string | null): value is BibliotecaTabSlug {
  return (
    value === "publicacoes" ||
    value === "pesquisas" ||
    value === "artigos" ||
    value === "tcc"
  )
}

/** Converte registro do banco para o mesmo formato usado pelos PDFs estáticos. */
export function mapDocumentoPublicDtoToItem(
  d: AdminBibliotecaDocumentoDTO
): PublicacaoData {
  const tab: BibliotecaTabSlug = isTabSlug(d.tipo) ? d.tipo : "publicacoes"
  const yearFromDate = d.dataPublicacao
    ? new Date(d.dataPublicacao).getFullYear()
    : null
  const anoStr = String(d.ano ?? yearFromDate ?? "")
  const badge =
    d.topicos.length > 0 ? d.topicos[0] : TAB_LABELS[tab] ?? tab

  return {
    id: `db-${d.id}`,
    titulo: d.titulo,
    autor: d.autor ?? "",
    ano: anoStr,
    categoria: badge,
    arquivo: d.urlArquivo ?? "",
    descricao: d.descricao ?? undefined,
    tags: d.topicos,
    visualizacoes: d.visualizacoes,
    rating: d.rating,
    bibliotecaTab: tab,
    ordem: d.ordem,
  }
}
