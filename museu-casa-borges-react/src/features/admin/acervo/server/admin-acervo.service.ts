import { mkdir, unlink, writeFile } from "node:fs/promises"
import path from "node:path"
import { randomUUID } from "node:crypto"

import { prisma } from "@/lib/prisma"
import type {
  AdminAcervoCategoryDTO,
  AdminAcervoCategoryInputDTO,
  AdminAcervoMediaDTO,
  AdminAcervoMediaInputDTO,
  AdminAcervoOverviewDTO,
} from "@/features/admin/acervo/dto/admin-acervo.dto"

const ACERVO_UPLOAD_DIRECTORY = path.join(
  process.cwd(),
  "public",
  "uploads",
  "acervo"
)

const ACERVO_UPLOAD_URL_PREFIX = "/uploads/acervo"

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

function serializeCategory(category: {
  id: number
  nome: string
  slug: string | null
  tipo: string | null
  descricao: string | null
  ordem: number
  ativa: boolean
  exibirComoAba: boolean
  layoutPublico: string
  criadoEm: Date | null
  _count: {
    midias: number
  }
}): AdminAcervoCategoryDTO {
  return {
    id: category.id,
    nome: category.nome,
    slug: category.slug,
    tipo: category.tipo,
    descricao: category.descricao,
    ordem: category.ordem,
    ativa: category.ativa,
    exibirComoAba: category.exibirComoAba,
    layoutPublico: category.layoutPublico === "galeria" ? "galeria" : "lista",
    mediaCount: category._count.midias,
    criadoEm: category.criadoEm?.toISOString() ?? null,
  }
}

function serializeMedia(media: {
  id: number
  categoriaId: number
  nome: string | null
  url: string
  tipo: string | null
  legenda: string | null
  ordem: number | null
  categoria: {
    nome: string
  }
}): AdminAcervoMediaDTO {
  return {
    id: media.id,
    categoriaId: media.categoriaId,
    categoriaNome: media.categoria.nome,
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
  const existingCategory = await prisma.categoria.findFirst({
    where: {
      slug,
      ...(currentCategoryId ? { id: { not: currentCategoryId } } : {}),
    },
    select: {
      id: true,
    },
  })

  if (existingCategory) {
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
    exibirComoAba: Boolean(input.exibirComoAba),
    layoutPublico: normalizeCategoryLayout(input.layoutPublico),
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

  const category = await prisma.categoria.findUnique({
    where: {
      id: categoriaId,
    },
    select: {
      id: true,
    },
  })

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
  await mkdir(ACERVO_UPLOAD_DIRECTORY, { recursive: true })

  const fileName = `${Date.now()}-${randomUUID()}${extension}`
  const filePath = path.join(ACERVO_UPLOAD_DIRECTORY, fileName)
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  await writeFile(filePath, buffer)

  return `${ACERVO_UPLOAD_URL_PREFIX}/${fileName}`
}

function getAcervoUploadPathFromUrl(url: string) {
  if (!url.startsWith(`${ACERVO_UPLOAD_URL_PREFIX}/`)) {
    return null
  }

  const relativePath = url.replace(ACERVO_UPLOAD_URL_PREFIX, "")
  return path.join(ACERVO_UPLOAD_DIRECTORY, relativePath)
}

export async function getAdminAcervoOverview(): Promise<AdminAcervoOverviewDTO> {
  const [categories, media] = await Promise.all([
    prisma.categoria.findMany({
      select: {
        id: true,
        nome: true,
        slug: true,
        tipo: true,
        descricao: true,
        ordem: true,
        ativa: true,
        exibirComoAba: true,
        layoutPublico: true,
        criadoEm: true,
        _count: {
          select: {
            midias: true,
          },
        },
      },
      orderBy: [{ ordem: "asc" }, { nome: "asc" }],
    }),
    prisma.midia.findMany({
      select: {
        id: true,
        categoriaId: true,
        nome: true,
        url: true,
        tipo: true,
        legenda: true,
        ordem: true,
        categoria: {
          select: {
            nome: true,
          },
        },
      },
      orderBy: [{ ordem: "asc" }, { id: "desc" }],
    }),
  ])

  return {
    categories: categories.map(serializeCategory),
    media: media.map(serializeMedia),
  }
}

export async function createAdminAcervoCategory(
  input: AdminAcervoCategoryInputDTO
): Promise<AdminAcervoCategoryDTO> {
  const data = await validateCategoryInput(input)
  const category = await prisma.categoria.create({
    data,
    select: {
      id: true,
      nome: true,
      slug: true,
      tipo: true,
      descricao: true,
      ordem: true,
      ativa: true,
      exibirComoAba: true,
      layoutPublico: true,
      criadoEm: true,
      _count: {
        select: {
          midias: true,
        },
      },
    },
  })

  return serializeCategory(category)
}

export async function updateAdminAcervoCategory(
  categoryId: number,
  input: AdminAcervoCategoryInputDTO
): Promise<AdminAcervoCategoryDTO> {
  const data = await validateCategoryInput(input, categoryId)
  const category = await prisma.categoria.update({
    where: {
      id: categoryId,
    },
    data,
    select: {
      id: true,
      nome: true,
      slug: true,
      tipo: true,
      descricao: true,
      ordem: true,
      ativa: true,
      exibirComoAba: true,
      layoutPublico: true,
      criadoEm: true,
      _count: {
        select: {
          midias: true,
        },
      },
    },
  })

  return serializeCategory(category)
}

export async function deleteAdminAcervoCategory(categoryId: number) {
  const category = await prisma.categoria.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      _count: {
        select: {
          midias: true,
        },
      },
    },
  })

  if (!category) {
    throw new Error("Categoria não encontrada.")
  }

  if (category._count.midias > 0) {
    throw new Error("Remova as mídias vinculadas antes de excluir a categoria.")
  }

  await prisma.categoria.delete({
    where: {
      id: categoryId,
    },
  })
}

export async function createAdminAcervoMedia(
  input: AdminAcervoMediaInputDTO,
  file: File
): Promise<AdminAcervoMediaDTO> {
  const data = await validateMediaInput(input)
  const url = await saveAcervoUpload(file)

  try {
    const media = await prisma.midia.create({
      data: {
        categoriaId: data.categoriaId,
        nome: data.nome,
        url,
        tipo: data.tipo,
        legenda: data.legenda,
        ordem: data.ordem,
      },
      select: {
        id: true,
        categoriaId: true,
        nome: true,
        url: true,
        tipo: true,
        legenda: true,
        ordem: true,
        categoria: {
          select: {
            nome: true,
          },
        },
      },
    })

    return serializeMedia(media)
  } catch (error) {
    const filePath = getAcervoUploadPathFromUrl(url)

    if (filePath) {
      await unlink(filePath).catch(() => undefined)
    }

    throw error
  }
}

export async function updateAdminAcervoMedia(
  mediaId: number,
  input: AdminAcervoMediaInputDTO
): Promise<AdminAcervoMediaDTO> {
  const data = await validateMediaInput(input)
  const media = await prisma.midia.update({
    where: {
      id: mediaId,
    },
    data: {
      categoriaId: data.categoriaId,
      nome: data.nome,
      tipo: data.tipo,
      legenda: data.legenda,
      ordem: data.ordem,
    },
    select: {
      id: true,
      categoriaId: true,
      nome: true,
      url: true,
      tipo: true,
      legenda: true,
      ordem: true,
      categoria: {
        select: {
          nome: true,
        },
      },
    },
  })

  return serializeMedia(media)
}

export async function deleteAdminAcervoMedia(mediaId: number) {
  const media = await prisma.midia.delete({
    where: {
      id: mediaId,
    },
    select: {
      url: true,
    },
  })

  const filePath = getAcervoUploadPathFromUrl(media.url)

  if (filePath) {
    await unlink(filePath).catch(() => undefined)
  }
}
