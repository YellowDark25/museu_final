import { supabase } from "@/lib/supabase"
import { generateSlug } from "@/features/admin/exposicoes/utils/slug"
import type {
  ExposicaoVirtualDTO,
  ExposicaoVirtualComSecoesDTO,
  ExposicaoVirtualInputDTO,
  ExposicaoVirtualSecaoInputDTO,
  ExposicaoVirtualSecaoDTO,
  ArtistaExposicaoDTO,
  ArtistaExposicaoComSecoesDTO,
  ArtistaExposicaoInputDTO,
  ArtistaSecaoInputDTO,
  ArtistaSecaoDTO,
  ExposicaoPermanenteDTO,
  ExposicaoPermanenteInputDTO,
  ExposicaoTemporariaDTO,
  ExposicaoTemporariaInputDTO,
  AdminExposicoesOverviewDTO,
  SectionDados,
} from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"
import type { Json } from "@/lib/database.types"

function normalizeNull(value: string | undefined | null): string | null {
  if (!value) return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

// --- Serializers ---

function serializeExpoVirtual(row: {
  id: number
  titulo: string
  slug: string
  descricao_curta: string | null
  imagem_capa: string | null
  publicado: boolean | null
  ordem: number | null
  autor: string | null
  created_at: string | null
}): ExposicaoVirtualDTO {
  return {
    id: row.id,
    titulo: row.titulo,
    slug: row.slug,
    descricaoCurta: row.descricao_curta,
    imagemCapa: row.imagem_capa,
    publicado: row.publicado ?? false,
    ordem: row.ordem ?? 0,
    autor: row.autor,
    createdAt: row.created_at,
  }
}

function serializeSecao(row: {
  id: number
  exposicao_id: number
  tipo: string
  dados: Json
  ordem: number | null
}): ExposicaoVirtualSecaoDTO {
  return {
    id: row.id,
    exposicaoId: row.exposicao_id,
    tipo: row.tipo as ExposicaoVirtualSecaoDTO["tipo"],
    dados: row.dados as unknown as SectionDados,
    ordem: row.ordem ?? 0,
  }
}

function serializeArtista(row: {
  id: number
  exposicao_id: number
  nome: string
  slug: string
  foto_url: string | null
  publicado: boolean | null
  ordem: number | null
}): ArtistaExposicaoDTO {
  return {
    id: row.id,
    exposicaoId: row.exposicao_id,
    nome: row.nome,
    slug: row.slug,
    fotoUrl: row.foto_url,
    publicado: row.publicado ?? false,
    ordem: row.ordem ?? 0,
  }
}

function serializeArtistaSecao(row: {
  id: number
  artista_id: number
  tipo: string
  dados: Json
  ordem: number | null
}): ArtistaSecaoDTO {
  return {
    id: row.id,
    artistaId: row.artista_id,
    tipo: row.tipo as ArtistaSecaoDTO["tipo"],
    dados: row.dados as unknown as SectionDados,
    ordem: row.ordem ?? 0,
  }
}

function serializePermanente(row: {
  id: number
  titulo: string
  slug: string
  descricao: string | null
  imagem_capa: string | null
  publicado: boolean | null
  ordem: number | null
}): ExposicaoPermanenteDTO {
  return {
    id: row.id,
    titulo: row.titulo,
    slug: row.slug,
    descricao: row.descricao,
    imagemCapa: row.imagem_capa,
    publicado: row.publicado ?? false,
    ordem: row.ordem ?? 0,
  }
}

function serializeTemporaria(row: {
  id: number
  titulo: string
  slug: string
  descricao: string | null
  imagem_capa: string | null
  data_inicio: string | null
  data_fim: string | null
  publicado: boolean | null
  ordem: number | null
}): ExposicaoTemporariaDTO {
  return {
    id: row.id,
    titulo: row.titulo,
    slug: row.slug,
    descricao: row.descricao,
    imagemCapa: row.imagem_capa,
    dataInicio: row.data_inicio,
    dataFim: row.data_fim,
    publicado: row.publicado ?? false,
    ordem: row.ordem ?? 0,
  }
}

// --- Slug uniqueness ---

async function ensureSlugAvailable(
  table: "exposicoes_virtuais" | "artistas_exposicao" | "exposicoes_permanentes" | "exposicoes_temporarias",
  slug: string,
  excludeId?: number
) {
  let query = supabase.from(table).select("id").eq("slug", slug)
  if (excludeId) {
    query = query.neq("id", excludeId)
  }
  const { data } = await query.maybeSingle()
  if (data) {
    throw new Error(`Já existe um registro com o slug "${slug}".`)
  }
}

// --- EXPOSIÇÕES VIRTUAIS ---

export async function getExposicoesVirtuaisOverview(): Promise<AdminExposicoesOverviewDTO> {
  const [virtuaisRes, permanentesRes, temporariasRes] = await Promise.all([
    supabase
      .from("exposicoes_virtuais")
      .select("*")
      .order("ordem")
      .order("titulo"),
    supabase
      .from("exposicoes_permanentes")
      .select("*")
      .order("ordem")
      .order("titulo"),
    supabase
      .from("exposicoes_temporarias")
      .select("*")
      .order("ordem")
      .order("titulo"),
  ])

  if (virtuaisRes.error) throw virtuaisRes.error
  if (permanentesRes.error) throw permanentesRes.error
  if (temporariasRes.error) throw temporariasRes.error

  return {
    virtuais: virtuaisRes.data.map(serializeExpoVirtual),
    permanentes: permanentesRes.data.map(serializePermanente),
    temporarias: temporariasRes.data.map(serializeTemporaria),
  }
}

export async function getExposicaoVirtualBySlug(slug: string): Promise<ExposicaoVirtualComSecoesDTO | null> {
  const { data: expo, error } = await supabase
    .from("exposicoes_virtuais")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  if (error) throw error
  if (!expo) return null

  const { data: secoes, error: secoesError } = await supabase
    .from("exposicoes_virtuais_secoes")
    .select("*")
    .eq("exposicao_id", expo.id)
    .order("ordem")

  if (secoesError) throw secoesError

  return {
    ...serializeExpoVirtual(expo),
    secoes: (secoes ?? []).map(serializeSecao),
  }
}

export async function getExposicaoVirtualById(id: number): Promise<ExposicaoVirtualComSecoesDTO | null> {
  const { data: expo, error } = await supabase
    .from("exposicoes_virtuais")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) throw error
  if (!expo) return null

  const { data: secoes, error: secoesError } = await supabase
    .from("exposicoes_virtuais_secoes")
    .select("*")
    .eq("exposicao_id", expo.id)
    .order("ordem")

  if (secoesError) throw secoesError

  return {
    ...serializeExpoVirtual(expo),
    secoes: (secoes ?? []).map(serializeSecao),
  }
}

export async function createExposicaoVirtual(input: ExposicaoVirtualInputDTO): Promise<ExposicaoVirtualDTO> {
  const titulo = input.titulo.trim()
  if (!titulo) throw new Error("Informe o título da exposição.")

  const slug = generateSlug(titulo)
  if (!slug) throw new Error("Não foi possível gerar um slug válido para o título informado.")

  await ensureSlugAvailable("exposicoes_virtuais", slug)

  const { data, error } = await supabase
    .from("exposicoes_virtuais")
    .insert({
      titulo,
      slug,
      descricao_curta: normalizeNull(input.descricaoCurta),
      imagem_capa: normalizeNull(input.imagemCapa),
      publicado: input.publicado ?? false,
      ordem: input.ordem ?? 0,
      autor: normalizeNull(input.autor),
    })
    .select("*")
    .single()

  if (error) throw error
  return serializeExpoVirtual(data)
}

export async function updateExposicaoVirtual(
  id: number,
  input: ExposicaoVirtualInputDTO
): Promise<ExposicaoVirtualDTO> {
  const titulo = input.titulo.trim()
  if (!titulo) throw new Error("Informe o título da exposição.")

  const slug = generateSlug(titulo)
  await ensureSlugAvailable("exposicoes_virtuais", slug, id)

  const { data, error } = await supabase
    .from("exposicoes_virtuais")
    .update({
      titulo,
      slug,
      descricao_curta: normalizeNull(input.descricaoCurta),
      imagem_capa: normalizeNull(input.imagemCapa),
      publicado: input.publicado ?? false,
      ordem: input.ordem ?? 0,
      autor: normalizeNull(input.autor),
    })
    .eq("id", id)
    .select("*")
    .single()

  if (error) throw error
  return serializeExpoVirtual(data)
}

export async function deleteExposicaoVirtual(id: number): Promise<void> {
  const { error } = await supabase
    .from("exposicoes_virtuais")
    .delete()
    .eq("id", id)

  if (error) throw error
}

// --- SEÇÕES DA EXPOSIÇÃO VIRTUAL ---

export async function saveExposicaoSecoes(
  exposicaoId: number,
  secoes: ExposicaoVirtualSecaoInputDTO[]
): Promise<ExposicaoVirtualSecaoDTO[]> {
  await supabase
    .from("exposicoes_virtuais_secoes")
    .delete()
    .eq("exposicao_id", exposicaoId)

  if (secoes.length === 0) return []

  const rows = secoes.map((s, i) => ({
    exposicao_id: exposicaoId,
    tipo: s.tipo,
    dados: s.dados,
    ordem: s.ordem ?? i,
  }))

  const { data, error } = await supabase
    .from("exposicoes_virtuais_secoes")
    .insert(rows)
    .select("*")
    .order("ordem")

  if (error) throw error
  return (data ?? []).map(serializeSecao)
}

// --- ARTISTAS ---

export async function getArtistasExposicao(exposicaoId: number): Promise<ArtistaExposicaoDTO[]> {
  const { data, error } = await supabase
    .from("artistas_exposicao")
    .select("*")
    .eq("exposicao_id", exposicaoId)
    .order("ordem")

  if (error) throw error
  return (data ?? []).map(serializeArtista)
}

export async function getArtistaBySlug(slug: string): Promise<ArtistaExposicaoComSecoesDTO | null> {
  const { data: artista, error } = await supabase
    .from("artistas_exposicao")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  if (error) throw error
  if (!artista) return null

  const { data: secoes, error: secoesError } = await supabase
    .from("artistas_exposicao_secoes")
    .select("*")
    .eq("artista_id", artista.id)
    .order("ordem")

  if (secoesError) throw secoesError

  return {
    ...serializeArtista(artista),
    secoes: (secoes ?? []).map(serializeArtistaSecao),
  }
}

export async function getArtistaById(id: number): Promise<ArtistaExposicaoComSecoesDTO | null> {
  const { data: artista, error } = await supabase
    .from("artistas_exposicao")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) throw error
  if (!artista) return null

  const { data: secoes, error: secoesError } = await supabase
    .from("artistas_exposicao_secoes")
    .select("*")
    .eq("artista_id", artista.id)
    .order("ordem")

  if (secoesError) throw secoesError

  return {
    ...serializeArtista(artista),
    secoes: (secoes ?? []).map(serializeArtistaSecao),
  }
}

export async function createArtista(input: ArtistaExposicaoInputDTO): Promise<ArtistaExposicaoDTO> {
  const nome = input.nome.trim()
  if (!nome) throw new Error("Informe o nome do artista.")

  const slug = generateSlug(nome)
  await ensureSlugAvailable("artistas_exposicao", slug)

  const { data, error } = await supabase
    .from("artistas_exposicao")
    .insert({
      exposicao_id: input.exposicaoId,
      nome,
      slug,
      foto_url: normalizeNull(input.fotoUrl),
      publicado: input.publicado ?? false,
      ordem: input.ordem ?? 0,
    })
    .select("*")
    .single()

  if (error) throw error
  return serializeArtista(data)
}

export async function updateArtista(
  id: number,
  input: ArtistaExposicaoInputDTO
): Promise<ArtistaExposicaoDTO> {
  const nome = input.nome.trim()
  if (!nome) throw new Error("Informe o nome do artista.")

  const slug = generateSlug(nome)
  await ensureSlugAvailable("artistas_exposicao", slug, id)

  const { data, error } = await supabase
    .from("artistas_exposicao")
    .update({
      exposicao_id: input.exposicaoId,
      nome,
      slug,
      foto_url: normalizeNull(input.fotoUrl),
      publicado: input.publicado ?? false,
      ordem: input.ordem ?? 0,
    })
    .eq("id", id)
    .select("*")
    .single()

  if (error) throw error
  return serializeArtista(data)
}

export async function deleteArtista(id: number): Promise<void> {
  const { error } = await supabase
    .from("artistas_exposicao")
    .delete()
    .eq("id", id)

  if (error) throw error
}

export async function saveArtistaSecoes(
  artistaId: number,
  secoes: ArtistaSecaoInputDTO[]
): Promise<ArtistaSecaoDTO[]> {
  await supabase
    .from("artistas_exposicao_secoes")
    .delete()
    .eq("artista_id", artistaId)

  if (secoes.length === 0) return []

  const rows = secoes.map((s, i) => ({
    artista_id: artistaId,
    tipo: s.tipo,
    dados: s.dados,
    ordem: s.ordem ?? i,
  }))

  const { data, error } = await supabase
    .from("artistas_exposicao_secoes")
    .insert(rows)
    .select("*")
    .order("ordem")

  if (error) throw error
  return (data ?? []).map(serializeArtistaSecao)
}

// --- PERMANENTES ---

export async function createExposicaoPermanente(input: ExposicaoPermanenteInputDTO): Promise<ExposicaoPermanenteDTO> {
  const titulo = input.titulo.trim()
  if (!titulo) throw new Error("Informe o título da exposição.")

  const slug = generateSlug(titulo)
  await ensureSlugAvailable("exposicoes_permanentes", slug)

  const { data, error } = await supabase
    .from("exposicoes_permanentes")
    .insert({
      titulo,
      slug,
      descricao: normalizeNull(input.descricao),
      imagem_capa: normalizeNull(input.imagemCapa),
      publicado: input.publicado ?? false,
      ordem: input.ordem ?? 0,
    })
    .select("*")
    .single()

  if (error) throw error
  return serializePermanente(data)
}

export async function updateExposicaoPermanente(
  id: number,
  input: ExposicaoPermanenteInputDTO
): Promise<ExposicaoPermanenteDTO> {
  const titulo = input.titulo.trim()
  if (!titulo) throw new Error("Informe o título da exposição.")

  const slug = generateSlug(titulo)
  await ensureSlugAvailable("exposicoes_permanentes", slug, id)

  const { data, error } = await supabase
    .from("exposicoes_permanentes")
    .update({
      titulo,
      slug,
      descricao: normalizeNull(input.descricao),
      imagem_capa: normalizeNull(input.imagemCapa),
      publicado: input.publicado ?? false,
      ordem: input.ordem ?? 0,
    })
    .eq("id", id)
    .select("*")
    .single()

  if (error) throw error
  return serializePermanente(data)
}

export async function deleteExposicaoPermanente(id: number): Promise<void> {
  const { error } = await supabase
    .from("exposicoes_permanentes")
    .delete()
    .eq("id", id)

  if (error) throw error
}

// --- TEMPORÁRIAS ---

export async function createExposicaoTemporaria(input: ExposicaoTemporariaInputDTO): Promise<ExposicaoTemporariaDTO> {
  const titulo = input.titulo.trim()
  if (!titulo) throw new Error("Informe o título da exposição.")

  const slug = generateSlug(titulo)
  await ensureSlugAvailable("exposicoes_temporarias", slug)

  const { data, error } = await supabase
    .from("exposicoes_temporarias")
    .insert({
      titulo,
      slug,
      descricao: normalizeNull(input.descricao),
      imagem_capa: normalizeNull(input.imagemCapa),
      data_inicio: normalizeNull(input.dataInicio),
      data_fim: normalizeNull(input.dataFim),
      publicado: input.publicado ?? false,
      ordem: input.ordem ?? 0,
    })
    .select("*")
    .single()

  if (error) throw error
  return serializeTemporaria(data)
}

export async function updateExposicaoTemporaria(
  id: number,
  input: ExposicaoTemporariaInputDTO
): Promise<ExposicaoTemporariaDTO> {
  const titulo = input.titulo.trim()
  if (!titulo) throw new Error("Informe o título da exposição.")

  const slug = generateSlug(titulo)
  await ensureSlugAvailable("exposicoes_temporarias", slug, id)

  const { data, error } = await supabase
    .from("exposicoes_temporarias")
    .update({
      titulo,
      slug,
      descricao: normalizeNull(input.descricao),
      imagem_capa: normalizeNull(input.imagemCapa),
      data_inicio: normalizeNull(input.dataInicio),
      data_fim: normalizeNull(input.dataFim),
      publicado: input.publicado ?? false,
      ordem: input.ordem ?? 0,
    })
    .eq("id", id)
    .select("*")
    .single()

  if (error) throw error
  return serializeTemporaria(data)
}

export async function deleteExposicaoTemporaria(id: number): Promise<void> {
  const { error } = await supabase
    .from("exposicoes_temporarias")
    .delete()
    .eq("id", id)

  if (error) throw error
}
