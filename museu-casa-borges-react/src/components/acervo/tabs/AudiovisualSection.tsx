import AcervoMediaSection from "@/components/acervo/tabs/AcervoMediaSection"
import type { PublicAcervoMediaDTO } from "@/features/acervo/dto/public-acervo.dto"

type Props = {
  media: PublicAcervoMediaDTO[]
  keyword?: string
}

export default function AudiovisualSection({ media, keyword }: Props) {
  return (
    <AcervoMediaSection
      title="Audiovisual"
      description={`Materiais com áudio e vídeo vinculados ao acervo (${media.length} arquivo(s)).`}
      emptyTitle="Nenhum material audiovisual"
      emptyDescription="Cadastre mídias nesta categoria para exibi-las ao público."
      media={media}
      keyword={keyword}
    />
  )
}
