import AcervoMediaSection from "@/components/acervo/tabs/AcervoMediaSection"
import type { PublicAcervoMediaDTO } from "@/features/acervo/dto/public-acervo.dto"

type Props = {
  media: PublicAcervoMediaDTO[]
  keyword?: string
}

export default function DocumentosSection({ media, keyword }: Props) {
  return (
    <AcervoMediaSection
      title="Documentos"
      description={`Coleção com ${media.length} documento(s) publicado(s) e organizado(s) pelo museu.`}
      emptyTitle="Nenhum documento disponível"
      emptyDescription="Ainda não há documentos publicados para esta seção."
      media={media}
      keyword={keyword}
    />
  )
}
