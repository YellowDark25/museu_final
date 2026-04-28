import AcervoMediaSection from "@/components/acervo/tabs/AcervoMediaSection"
import type { PublicAcervoMediaDTO } from "@/features/acervo/dto/public-acervo.dto"

type Props = {
  media: PublicAcervoMediaDTO[]
  keyword?: string
}

export default function ManuscritosSection({ media, keyword }: Props) {
  return (
    <AcervoMediaSection
      title="Manuscritos"
      description={`Acervo com ${media.length} arquivo(s) publicado(s) e disponível(is) para consulta.`}
      emptyTitle="Nenhum manuscrito disponível"
      emptyDescription="Ainda não há manuscritos publicados para esta seção."
      media={media}
      keyword={keyword}
    />
  )
}
