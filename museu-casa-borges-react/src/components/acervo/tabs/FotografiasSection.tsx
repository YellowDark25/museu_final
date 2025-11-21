import PhotoGallery from "@/components/acervo/PhotoGallery"

type Props = {
  /** Parâmetros de filtro vindos da barra de busca (page.tsx). */
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
export default function FotografiasSection({ query }: Props) {
  return (
    <div>
      <PhotoGallery pageSize={10} query={query} />
    </div>
  )
}