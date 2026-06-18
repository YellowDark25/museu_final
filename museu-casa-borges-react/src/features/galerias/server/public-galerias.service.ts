import { supabase } from "@/lib/supabase"
import type { GaleriaAlbumDTO, GaleriaItemDTO } from "@/features/galerias/dto/galerias.dto"

type AlbumRow = {
  id: number
  titulo: string
  slug: string
  descricao: string | null
  capa_url: string | null
  data_evento: string | null
  categoria: string | null
  publicado: boolean
  ordem: number
  created_at: string
  updated_at: string
}

type ItemRow = {
  id: number
  album_id: number
  url: string
  titulo: string | null
  legenda: string | null
  categoria_item: string | null
  ordem: number
  created_at: string
}

function serializeItem(row: ItemRow): GaleriaItemDTO {
  return {
    id: row.id,
    albumId: row.album_id,
    url: row.url,
    titulo: row.titulo,
    legenda: row.legenda,
    categoriaItem: row.categoria_item,
    ordem: row.ordem,
  }
}

function serializeAlbum(row: AlbumRow, itens?: GaleriaItemDTO[], totalFotos?: number): GaleriaAlbumDTO {
  return {
    id: row.id,
    titulo: row.titulo,
    slug: row.slug,
    descricao: row.descricao,
    capaUrl: row.capa_url,
    dataEvento: row.data_evento,
    categoria: row.categoria,
    publicado: row.publicado,
    ordem: row.ordem,
    itens,
    totalFotos,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function listGaleriasPublicas(): Promise<GaleriaAlbumDTO[]> {
  const { data: albuns, error } = await supabase
    .from("galeria_albuns")
    .select("*")
    .eq("publicado", true)
    .order("ordem", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) throw error
  if (!albuns || albuns.length === 0) return []

  const albumIds = albuns.map((a) => a.id)

  const { data: itens, error: itensError } = await supabase
    .from("galeria_itens")
    .select("id, album_id")
    .in("album_id", albumIds)

  if (itensError) throw itensError

  const countByAlbum: Record<number, number> = {}
  for (const item of itens ?? []) {
    countByAlbum[item.album_id] = (countByAlbum[item.album_id] ?? 0) + 1
  }

  return albuns.map((row) =>
    serializeAlbum(row as AlbumRow, undefined, countByAlbum[row.id] ?? 0)
  )
}

export async function getGaleriaBySlug(slug: string): Promise<GaleriaAlbumDTO | null> {
  const { data: albumData, error: albumError } = await supabase
    .from("galeria_albuns")
    .select("*")
    .eq("slug", slug)
    .eq("publicado", true)
    .single()

  if (albumError) {
    if (albumError.code === "PGRST116") return null
    throw albumError
  }
  if (!albumData) return null

  const { data: itensData, error: itensError } = await supabase
    .from("galeria_itens")
    .select("*")
    .eq("album_id", albumData.id)
    .order("ordem", { ascending: true })
    .order("id", { ascending: true })

  if (itensError) throw itensError

  const itens = (itensData ?? []).map(serializeItem)
  return serializeAlbum(albumData as AlbumRow, itens, itens.length)
}
