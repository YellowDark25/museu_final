import { supabase } from "@/lib/supabase"
import type {
  AdminGaleriasOverviewDTO,
  GaleriaAlbumDTO,
  GaleriaAlbumInputDTO,
  GaleriaItemDTO,
  GaleriaItemInputDTO,
} from "@/features/galerias/dto/galerias.dto"

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

function normalizeNull(value: string | undefined | null): string | null {
  if (!value) return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
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

export async function listGaleriasAdmin(): Promise<GaleriaAlbumDTO[]> {
  const { data: albuns, error } = await supabase
    .from("galeria_albuns")
    .select("*")
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

export async function getAdminGaleriasOverview(): Promise<AdminGaleriasOverviewDTO> {
  const albuns = await listGaleriasAdmin()
  const totalFotos = albuns.reduce((sum, a) => sum + (a.totalFotos ?? 0), 0)
  return {
    total: albuns.length,
    publicadas: albuns.filter((a) => a.publicado).length,
    totalFotos,
    albuns,
  }
}

export async function getGaleriaByIdAdmin(id: number): Promise<GaleriaAlbumDTO | null> {
  const { data: albumData, error: albumError } = await supabase
    .from("galeria_albuns")
    .select("*")
    .eq("id", id)
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

export async function createGaleria(input: GaleriaAlbumInputDTO): Promise<GaleriaAlbumDTO> {
  const titulo = input.titulo.trim()
  const slug = input.slug.trim()

  if (!titulo) throw new Error("Informe o título do álbum.")
  if (!slug) throw new Error("Informe o slug do álbum.")

  const { data, error } = await supabase
    .from("galeria_albuns")
    .insert({
      titulo,
      slug,
      descricao: normalizeNull(input.descricao),
      capa_url: normalizeNull(input.capaUrl),
      data_evento: normalizeNull(input.dataEvento),
      categoria: normalizeNull(input.categoria),
      publicado: input.publicado ?? false,
      ordem: input.ordem ?? 0,
    })
    .select("*")
    .single()

  if (error) throw error
  return serializeAlbum(data as AlbumRow, [], 0)
}

export async function updateGaleria(id: number, input: GaleriaAlbumInputDTO): Promise<GaleriaAlbumDTO> {
  const titulo = input.titulo.trim()
  const slug = input.slug.trim()

  if (!titulo) throw new Error("Informe o título do álbum.")
  if (!slug) throw new Error("Informe o slug do álbum.")

  const { data, error } = await supabase
    .from("galeria_albuns")
    .update({
      titulo,
      slug,
      descricao: normalizeNull(input.descricao),
      capa_url: normalizeNull(input.capaUrl),
      data_evento: normalizeNull(input.dataEvento),
      categoria: normalizeNull(input.categoria),
      publicado: input.publicado ?? false,
      ordem: input.ordem ?? 0,
    })
    .eq("id", id)
    .select("*")
    .single()

  if (error) throw error
  return serializeAlbum(data as AlbumRow, undefined, undefined)
}

export async function deleteGaleria(id: number): Promise<void> {
  const { error } = await supabase.from("galeria_albuns").delete().eq("id", id)
  if (error) throw error
}

export async function addGaleriaItem(albumId: number, input: GaleriaItemInputDTO): Promise<GaleriaItemDTO> {
  if (!input.url?.trim()) throw new Error("URL da imagem é obrigatória.")

  const { data, error } = await supabase
    .from("galeria_itens")
    .insert({
      album_id: albumId,
      url: input.url.trim(),
      titulo: normalizeNull(input.titulo),
      legenda: normalizeNull(input.legenda),
      categoria_item: normalizeNull(input.categoriaItem),
      ordem: input.ordem ?? 0,
    })
    .select("*")
    .single()

  if (error) throw error
  return serializeItem(data as ItemRow)
}

export async function deleteGaleriaItem(id: number): Promise<void> {
  const { error } = await supabase.from("galeria_itens").delete().eq("id", id)
  if (error) throw error
}

export async function reorderGaleriaItens(ids: number[]): Promise<void> {
  const updates = ids.map((id, index) =>
    supabase.from("galeria_itens").update({ ordem: index }).eq("id", id)
  )
  await Promise.all(updates)
}
