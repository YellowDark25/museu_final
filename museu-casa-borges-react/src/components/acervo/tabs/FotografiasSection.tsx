import PhotoGallery from "@/components/acervo/PhotoGallery"
import type { PublicAcervoPhotoDTO } from "@/features/acervo/dto/public-acervo.dto"

type Props = {
  photos: PublicAcervoPhotoDTO[]
  query?: {
    keyword?: string
    period?: "qualquer" | "antigo" | "moderno" | "recente"
  }
}

/**
 * FotografiasSection
 * Usa o componente PhotoGallery já existente para mostrar fotos.
 */
/**
 * FotografiasSection
 * Usa o componente PhotoGallery e permite receber filtros (keyword/period).
 */
export default function FotografiasSection({ photos, query }: Props) {
  return (
    <div>
      <PhotoGallery photos={photos} pageSize={10} query={query} />
    </div>
  )
}
