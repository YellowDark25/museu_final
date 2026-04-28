import AcervoMediaSection from "@/components/acervo/tabs/AcervoMediaSection"
import type {
  PublicAcervoMediaDTO,
  PublicAcervoStatsDTO,
} from "@/features/acervo/dto/public-acervo.dto"

type Props = {
  stats: PublicAcervoStatsDTO
  media: PublicAcervoMediaDTO[]
  keyword?: string
}

export default function ColecoesSection({ stats, media, keyword }: Props) {
  return (
    <div className="space-y-6">
      <AcervoMediaSection
        title="Coleções"
        description={`Conjunto de ${media.length} arquivo(s) especiais do acervo publicados pelo museu.`}
        emptyTitle="Nenhuma coleção em destaque"
        emptyDescription="Ainda não há coleções publicadas para esta seção."
        media={media}
        keyword={keyword}
      />

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-base font-semibold mb-2">Resumo</h4>
        <p className="text-slate-600">
          {stats.documentos.toLocaleString("pt-BR")} documentos,{" "}
          {stats.fotografias.toLocaleString("pt-BR")} fotografias,{" "}
          {stats.videos.toLocaleString("pt-BR")} vídeos e{" "}
          {stats.audios.toLocaleString("pt-BR")} áudios.
        </p>
      </div>
    </div>
  )
}
