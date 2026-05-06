"use client"

import { useCallback, useMemo, useState } from "react"

import type {
  AdminAcervoCategoryDTO,
  AdminAcervoCategoryInputDTO,
  AdminAcervoMediaDTO,
  AdminAcervoMediaInputDTO,
  AdminAcervoOverviewDTO,
} from "@/features/admin/acervo/dto/admin-acervo.dto"
import { readAdminApiError } from "@/features/admin/utils/read-admin-api-error"

function syncCategoryCounts(
  categories: AdminAcervoCategoryDTO[],
  media: AdminAcervoMediaDTO[]
) {
  return categories
    .map((category) => ({
      ...category,
      mediaCount: media.filter((entry) => entry.categoriaId === category.id)
        .length,
    }))
    .sort(
      (left, right) =>
        left.ordem - right.ordem || left.nome.localeCompare(right.nome, "pt-BR")
    )
}

export function useAdminAcervoManager(initialData: AdminAcervoOverviewDTO) {
  const [categories, setCategories] = useState(initialData.categories)
  const [media, setMedia] = useState(initialData.media)
  const [categoryPending, setCategoryPending] = useState(false)
  const [mediaPending, setMediaPending] = useState(false)
  const [categoryError, setCategoryError] = useState<string | null>(null)
  const [mediaError, setMediaError] = useState<string | null>(null)

  const kpis = useMemo(
    () => ({
      categoryCount: categories.length,
      mediaCount: media.length,
    }),
    [categories, media]
  )

  const createCategory = useCallback(async (input: AdminAcervoCategoryInputDTO) => {
    setCategoryPending(true)
    setCategoryError(null)

    try {
      const response = await fetch("/api/admin/acervo/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      })

      if (!response.ok) {
        throw new Error(await readAdminApiError(response))
      }

      const category = (await response.json()) as AdminAcervoCategoryDTO
      setCategories((current) =>
        [...current, category].sort(
          (left, right) =>
            left.ordem - right.ordem ||
            left.nome.localeCompare(right.nome, "pt-BR")
        )
      )
    } catch (error) {
      setCategoryError(
        error instanceof Error
          ? error.message
          : "Não foi possível criar a categoria."
      )
      throw error
    } finally {
      setCategoryPending(false)
    }
  }, [])

  const updateCategory = useCallback(
    async (categoryId: number, input: AdminAcervoCategoryInputDTO) => {
      setCategoryPending(true)
      setCategoryError(null)

      try {
        const response = await fetch(`/api/admin/acervo/categories/${categoryId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        })

        if (!response.ok) {
          throw new Error(await readAdminApiError(response))
        }

        const category = (await response.json()) as AdminAcervoCategoryDTO
        setCategories((current) =>
          syncCategoryCounts(
            current.map((entry) => (entry.id === category.id ? category : entry)),
            media
          )
        )
        setMedia((current) =>
          current.map((entry) =>
            entry.categoriaId === category.id
              ? { ...entry, categoriaNome: category.nome }
              : entry
          )
        )
      } catch (error) {
        setCategoryError(
          error instanceof Error
            ? error.message
            : "Não foi possível atualizar a categoria."
        )
        throw error
      } finally {
        setCategoryPending(false)
      }
    },
    [media]
  )

  const deleteCategory = useCallback(async (categoryId: number) => {
    setCategoryPending(true)
    setCategoryError(null)

    try {
      const response = await fetch(`/api/admin/acervo/categories/${categoryId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(await readAdminApiError(response))
      }

      setCategories((current) =>
        current.filter((entry) => entry.id !== categoryId)
      )
      setMedia((current) =>
        current.filter((entry) => entry.categoriaId !== categoryId)
      )
    } catch (error) {
      setCategoryError(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir a categoria."
      )
      throw error
    } finally {
      setCategoryPending(false)
    }
  }, [])

  const createMedia = useCallback(
    async (input: AdminAcervoMediaInputDTO, file: File) => {
      setMediaPending(true)
      setMediaError(null)

      try {
        const formData = new FormData()
        formData.set(
          "categoriaId",
          input.categoriaId != null ? String(input.categoriaId) : ""
        )
        formData.set("nome", input.nome)
        formData.set("tipo", input.tipo)
        formData.set("legenda", input.legenda)
        formData.set("ordem", String(input.ordem))
        formData.set("file", file)

        const response = await fetch("/api/admin/acervo/media", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error(await readAdminApiError(response))
        }

        const entry = (await response.json()) as AdminAcervoMediaDTO
        setMedia((currentMedia) => {
          const nextMedia = [...currentMedia, entry].sort(
            (left, right) => left.ordem - right.ordem || right.id - left.id
          )
          setCategories((currentCategories) =>
            syncCategoryCounts(currentCategories, nextMedia)
          )
          return nextMedia
        })
      } catch (error) {
        setMediaError(
          error instanceof Error
            ? error.message
            : "Não foi possível salvar a mídia."
        )
        throw error
      } finally {
        setMediaPending(false)
      }
    },
    []
  )

  const updateMedia = useCallback(
    async (mediaId: number, input: AdminAcervoMediaInputDTO) => {
      setMediaPending(true)
      setMediaError(null)

      try {
        const response = await fetch(`/api/admin/acervo/media/${mediaId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        })

        if (!response.ok) {
          throw new Error(await readAdminApiError(response))
        }

        const entry = (await response.json()) as AdminAcervoMediaDTO
        setMedia((currentMedia) => {
          const nextMedia = currentMedia
            .map((current) => (current.id === entry.id ? entry : current))
            .sort((left, right) => left.ordem - right.ordem || right.id - left.id)
          setCategories((currentCategories) =>
            syncCategoryCounts(currentCategories, nextMedia)
          )
          return nextMedia
        })
      } catch (error) {
        setMediaError(
          error instanceof Error
            ? error.message
            : "Não foi possível atualizar a mídia."
        )
        throw error
      } finally {
        setMediaPending(false)
      }
    },
    []
  )

  const deleteMedia = useCallback(async (mediaId: number) => {
    setMediaPending(true)
    setMediaError(null)

    try {
      const response = await fetch(`/api/admin/acervo/media/${mediaId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(await readAdminApiError(response))
      }

      setMedia((currentMedia) => {
        const nextMedia = currentMedia.filter((entry) => entry.id !== mediaId)
        setCategories((currentCategories) =>
          syncCategoryCounts(currentCategories, nextMedia)
        )
        return nextMedia
      })
    } catch (error) {
      setMediaError(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir a mídia."
      )
      throw error
    } finally {
      setMediaPending(false)
    }
  }, [])

  return {
    categories,
    media,
    kpis,
    categoryPending,
    mediaPending,
    categoryError,
    mediaError,
    createCategory,
    updateCategory,
    deleteCategory,
    createMedia,
    updateMedia,
    deleteMedia,
  }
}
