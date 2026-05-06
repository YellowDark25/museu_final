import path from "node:path"

import { supabase } from "@/lib/supabase"
import {
  removeUploadedObject,
  uploadPublicObject,
} from "@/lib/storage/object-storage"
import type {
  AdminAcervoCategoryDTO,
  AdminAcervoCategoryInputDTO,
  AdminAcervoMediaDTO,
  AdminAcervoMediaInputDTO,
  AdminAcervoOverviewDTO,
} from "@/features/admin/acervo/dto/admin-acervo.dto"

const ALLOWED_UPLOAD_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".pdf",
  ".mp4",
  ".webm",
  ".mov",
  ".mp3",
  ".wav",
  ".ogg",
])

const MAX_UPLOAD_SIZE_IN_BYTES = 20 * 1024 * 1024

type CategoryRow = {
  id: number
  nome: string
  slug: string | null
  tipo: string | null
  descricao: string | null
  ordem: number
  ativa: boolean
  exibir_como_aba: boolean
  layout_publico: string
  criado_em: string | null
  midias: { count: number }[]
}

type MediaRow = {
  id: number
  categoria_id: number
  nome: string | null
  url: string
  tipo: string | null
  legenda: string | null
  ordem: number | null
  categorias: { nome: string } | null
}

function serializeCategory(category: CategoryRow): AdminAcervoCategoryDTO {
  return {
    id: category.id,
    nome: category.nome,
    slug: category.slug,
    tipo: category.tipo,
    descricao: category.descricao,
    ordem: category.ordem,
    ativa: category.ativa,
    exibirComoAba: category.exibir_como_aba,
    layoutPublico: category.layout_publico === "galeria" ? "galeria" : "lista",
    mediaCount: Number(category.midias?.[0]?.count ?? 0),
    criadoEm: category.criado_em ?? null,
  }
}

function serializeMedia(media: MediaRow): AdminAcervoMediaDTO {
  return {
    id: media.id,
    categoriaId: media.categoria_id,
    categoriaNome: media.categorias?.nome ?? null,
    nome: media.nome,
    url: media.url,
    tipo: media.tipo,
    legenda: media.legenda,
    ordem: media.ordem ?? 0,
  }
}

function normalizeNullableString(value: string) {
  const normalized = value.trim()
  return normalized.length > 0 ? normalized : null
}

function slugifyCategoryValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function normalizeCategoryLayout(value: string) {
  return value === "galeria" ? "galeria" : "lista"
}

async function ensureCategorySlugAvailable(
  slug: string,
  currentCategoryId?: number
) {
  let query = supabase
    .from("categorias")
    .select("id")
    .eq("slug", slug)

  if (currentCategoryId) {
    query = query.neq("id", currentCategoryId)
  }

  const { data } = await query.maybeSingle()

  if (data) {
    throw new Error("Já existe uma categoria usando este slug público.")
  }
}

async function validateCategoryInput(
  input: AdminAcervoCategoryInputDTO,
  currentCategoryId?: number
) {
  const nome = input.nome.trim()

  if (!nome) {
    throw new Error("Informe o nome da categoria.")
  }

  const slug = slugifyCategoryValue(input.slug || nome)

  if (!slug) {
    throw new Error("Informe um slug público válido para a categoria.")
  }

  await ensureCategorySlugAvailable(slug, currentCategoryId)

  return {
    nome,
    slug,
    tipo: normalizeNullableString(input.tipo),
    descricao: normalizeNullableString(input.descricao),
    ordem: Number.isFinite(input.ordem) ? input.ordem : 0,
    ativa: Boolean(input.ativa),
    exibir_como_aba: Boolean(input.exibirComoAba),
    layout_publico: normalizeCategoryLayout(input.layoutPublico),
  }
}

async function validateMediaInput(input: AdminAcervoMediaInputDTO) {
  const categoriaId =
    typeof input.categoriaId === "number" && Number.isFinite(input.categoriaId)
      ? input.categoriaId
      : null
  const ordem = Number.isFinite(input.ordem) ? input.ordem : 0
  const tipo = normalizeNullableString(input.tipo)

  if (categoriaId === null) {
    throw new Error("Selecione uma categoria para vincular a mídia.")
  }

  const { data: category } = await supabase
    .from("categorias")
    .select("id")
    .eq("id", categoriaId)
    .maybeSingle()

  if (!category) {
    throw new Error("A categoria selecionada não existe mais.")
  }

  return {
    categoriaId,
    tipo,
    nome: normalizeNullableString(input.nome),
    legenda: normalizeNullableString(input.legenda),
    ordem,
  }
}

function validateUploadFile(file: File) {
  if (!file.size) {
    throw new Error("Selecione um arquivo para upload.")
  }

  if (file.size > MAX_UPLOAD_SIZE_IN_BYTES) {
    throw new Error("O arquivo excede o limite de 20MB.")
  }

  const extension = path.extname(file.name).toLowerCase()

  if (!ALLOWED_UPLOAD_EXTENSIONS.has(extension)) {
    throw new Error("Tipo de arquivo não permitido para o acervo.")
  }

  return extension
}

async function saveAcervoUpload(file: File) {
  const extension = validateUploadFile(file)
  const buffer = Buffer.from(await file.arrayBuffer())
  const baseName = path.basename(file.name, extension).trim() || "midia"

  return uploadPublicObject({
    prefix: "acervo",
    extension,
    buffer,
    originalBaseName: baseName,
  })
}

const CATEGORY_SELECT =
  "id, nome, slug, tipo, descricao, ordem, ativa, exibir_como_aba, layout_publico, criado_em, midias(count)"

const MEDIA_SELECT =
  "id, categoria_id, nome, url, tipo, legenda, ordem, categorias!midias_categoria_id_fkey(nome)"

export async function getAdminAcervoOverview(): Promise<AdminAcervoOverviewDTO> {
  const [categoriesRes, mediaRes] = await Promise.all([
    supabase
      .from("categorias")
      .select(CATEGORY_SELECT)
      .order("ordem", { ascending: true })
      .order("nome", { ascending: true }),
    supabase
      .from("midias")
      .select(MEDIA_SELECT)
      .order("ordem", { ascending: true })
      .order("id", { ascending: false }),
  ])

  if (categoriesRes.error) throw categoriesRes.error
  if (mediaRes.error) throw mediaRes.error

  return {
    categories: (categoriesRes.data as CategoryRow[]).map(serializeCategory),
    media: (mediaRes.data as MediaRow[]).map(serializeMedia),
  }
}

export async function createAdminAcervoCategory(
  input: AdminAcervoCategoryInputDTO
): Promise<AdminAcervoCategoryDTO> {
  const data = await validateCategoryInput(input)

  const { data: category, error } = await supabase
    .from("categorias")
    .insert(data)
    .select(CATEGORY_SELECT)
    .single()

  if (error) throw error

  return serializeCategory({ ...(category as CategoryRow), midias: [{ count: 0 }] })
}

export async function updateAdminAcervoCategory(
  categoryId: number,
  input: AdminAcervoCategoryInputDTO
): Promise<AdminAcervoCategoryDTO> {
  const data = await validateCategoryInput(input, categoryId)

  const [updateRes, countRes] = await Promise.all([
    supabase
      .from("categorias")
      .update(data)
      .eq("id", categoryId)
      .select(
        "id, nome, slug, tipo, descricao, ordem, ativa, exibir_como_aba, layout_publico, criado_em"
      )
      .single(),
    supabase
      .from("midias")
      .select("id", { count: "exact", head: true })
      .eq("categoria_id", categoryId),
  ])

  if (updateRes.error) throw updateRes.error

  const category = updateRes.data
  const mediaCount = countRes.count ?? 0

  return serializeCategory({
    ...(category as Omit<CategoryRow, "midias">),
    midias: [{ count: mediaCount }],
  })
}

export async function deleteAdminAcervoCategory(categoryId: number) {
  const { data: category } = await supabase
    .from("categorias")
    .select("id")
    .eq("id", categoryId)
    .maybeSingle()

  if (!category) {
    throw new Error("Categoria não encontrada.")
  }

  const { count: midiaCount } = await supabase
    .from("midias")
    .select("id", { count: "exact", head: true })
    .eq("categoria_id", categoryId)

  if ((midiaCount ?? 0) > 0) {
    throw new Error("Remova as mídias vinculadas antes de excluir a categoria.")
  }

  const { error } = await supabase
    .from("categorias")
    .delete()
    .eq("id", categoryId)

  if (error) throw error
}

export async function createAdminAcervoMedia(
  input: AdminAcervoMediaInputDTO,
  file: File
): Promise<AdminAcervoMediaDTO> {
  const data = await validateMediaInput(input)
  const url = await saveAcervoUpload(file)

  try {
    const { data: media, error } = await supabase
      .from("midias")
      .insert({
        categoria_id: data.categoriaId,
        nome: data.nome,
        url,
        tipo: data.tipo,
        legenda: data.legenda,
        ordem: data.ordem,
      })
      .select(MEDIA_SELECT)
      .single()

    if (error) throw error

    return serializeMedia(media as MediaRow)
  } catch (error) {
    await removeUploadedObject(url)
    throw error
  }
}

export async function updateAdminAcervoMedia(
  mediaId: number,
  input: AdminAcervoMediaInputDTO
): Promise<AdminAcervoMediaDTO> {
  const data = await validateMediaInput(input)

  const { data: media, error } = await supabase
    .from("midias")
    .update({
      categoria_id: data.categoriaId,
      nome: data.nome,
      tipo: data.tipo,
      legenda: data.legenda,
      ordem: data.ordem,
    })
    .eq("id", mediaId)
    .select(MEDIA_SELECT)
    .single()

  if (error) throw error

  return serializeMedia(media as MediaRow)
}

export async function deleteAdminAcervoMedia(mediaId: number) {
  const { data: media, error } = await supabase
    .from("midias")
    .delete()
    .eq("id", mediaId)
    .select("url")
    .single()

  if (error) throw error

  await removeUploadedObject(media.url)
}
