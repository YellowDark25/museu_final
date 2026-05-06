import { supabase } from "@/lib/supabase"
import type {
  PublicAcervoMediaDTO,
  PublicAcervoOverviewDTO,
  PublicAcervoPhotoDTO,
  PublicAcervoStatsDTO,
  PublicAcervoTabDTO,
} from "@/features/acervo/dto/public-acervo.dto"

type MidiaRow = {
  id: number
  nome: string | null
  url: string
  tipo: string | null
  legenda: string | null
  ordem: number | null
}

type CategoriaRow = {
  id: number
  nome: string
  slug: string | null
  descricao: string | null
  layout_publico: string
  midias: MidiaRow[]
}

function buildCategorySlug(slug: string | null, nome: string, id: number) {
  const normalizedSlug = slug?.trim()

  if (normalizedSlug) {
    return normalizedSlug
  }

  const fallbackSlug = nome
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

  return fallbackSlug ? `${fallbackSlug}-${id}` : `categoria-${id}`
}

function serializeMedia(
  media: MidiaRow,
  categoriaNome: string
): PublicAcervoMediaDTO {
  return {
    id: media.id,
    nome: media.nome,
    url: media.url,
    tipo: media.tipo,
    legenda: media.legenda,
    ordem: media.ordem ?? 0,
    categoriaNome,
  }
}

function isImageMedia(media: PublicAcervoMediaDTO) {
  return media.tipo === "imagem"
}

function isDocumentMedia(media: PublicAcervoMediaDTO) {
  return media.tipo === "documento" || media.url.toLowerCase().endsWith(".pdf")
}

function isVideoMedia(media: PublicAcervoMediaDTO) {
  return media.tipo === "video"
}

function isAudioMedia(media: PublicAcervoMediaDTO) {
  return media.tipo === "audio"
}

export async function getPublicAcervoOverview(): Promise<PublicAcervoOverviewDTO> {
  const { data: categories, error } = await supabase
    .from("categorias")
    .select(
      "id, nome, slug, descricao, layout_publico, midias(id, nome, url, tipo, legenda, ordem)"
    )
    .eq("ativa", true)
    .eq("exibir_como_aba", true)
    .order("ordem", { ascending: true })
    .order("nome", { ascending: true })

  if (error) throw error

  const tabs: PublicAcervoTabDTO[] = []
  let documentos = 0
  let fotografias = 0
  let videos = 0
  let audios = 0

  for (const category of (categories as CategoriaRow[])) {
    const slug = buildCategorySlug(category.slug, category.nome, category.id)

    const sortedMidias = [...(category.midias ?? [])].sort(
      (a, b) => (a.ordem ?? 0) - (b.ordem ?? 0) || a.id - b.id
    )

    const mediaList = sortedMidias.map((m) => serializeMedia(m, category.nome))
    const photos: PublicAcervoPhotoDTO[] = []

    for (const m of mediaList) {
      if (isImageMedia(m)) fotografias += 1
      if (isDocumentMedia(m)) documentos += 1
      if (isVideoMedia(m)) videos += 1
      if (isAudioMedia(m)) audios += 1
    }

    for (const image of mediaList.filter(isImageMedia)) {
      const title =
        image.nome?.trim() || image.legenda?.trim() || category.nome
      const legendaTrim = image.legenda?.trim() ?? ""
      photos.push({
        id: image.id,
        src: image.url,
        alt: image.nome?.trim() || image.legenda || category.nome,
        title,
        description: legendaTrim,
        date: null,
      })
    }

    tabs.push({
      id: category.id,
      slug,
      nome: category.nome,
      descricao: category.descricao,
      layout: category.layout_publico === "galeria" ? "galeria" : "lista",
      mediaCount: mediaList.length,
      media: mediaList,
      photos,
    })
  }

  const stats: PublicAcervoStatsDTO = {
    documentos,
    fotografias,
    videos,
    audios,
    updatedAt: new Date().toISOString(),
  }

  return {
    stats,
    tabs,
  }
}

export async function getPublicAcervoStats(): Promise<PublicAcervoStatsDTO> {
  const overview = await getPublicAcervoOverview()
  return overview.stats
}
