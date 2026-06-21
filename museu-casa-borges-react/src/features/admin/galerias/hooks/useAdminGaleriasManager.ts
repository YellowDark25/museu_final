"use client"

import { useCallback, useState } from "react"
import type { AdminGaleriasOverviewDTO, GaleriaAlbumInputDTO } from "@/features/galerias/dto/galerias.dto"
import { readAdminApiError } from "@/features/admin/utils/read-admin-api-error"

export function useAdminGaleriasManager(initialData: AdminGaleriasOverviewDTO) {
  const [data, setData] = useState(initialData)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setPending(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/galerias")
      if (!response.ok) throw new Error(await readAdminApiError(response))
      setData((await response.json()) as AdminGaleriasOverviewDTO)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar lista.")
    } finally {
      setPending(false)
    }
  }, [])

  const saveGaleria = useCallback(
    async (input: GaleriaAlbumInputDTO, id?: number) => {
      setPending(true)
      setError(null)
      try {
        const response = await fetch(id ? `/api/admin/galerias/${id}` : "/api/admin/galerias", {
          method: id ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        })
        if (!response.ok) throw new Error(await readAdminApiError(response))
        await refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao salvar galeria.")
        throw err
      } finally {
        setPending(false)
      }
    },
    [refresh]
  )

  const deleteGaleria = useCallback(
    async (id: number) => {
      setPending(true)
      setError(null)
      try {
        const response = await fetch(`/api/admin/galerias/${id}`, { method: "DELETE" })
        if (!response.ok && response.status !== 204) throw new Error(await readAdminApiError(response))
        await refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao excluir galeria.")
        throw err
      } finally {
        setPending(false)
      }
    },
    [refresh]
  )

  const addItem = useCallback(
    async (albumId: number, url: string, titulo?: string, legenda?: string, categoriaItem?: string) => {
      const response = await fetch(`/api/admin/galerias/${albumId}/itens`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, titulo, legenda, categoriaItem }),
      })
      if (!response.ok) throw new Error(await readAdminApiError(response))
      await refresh()
    },
    [refresh]
  )

  const deleteItem = useCallback(
    async (albumId: number, itemId: number) => {
      const response = await fetch(`/api/admin/galerias/${albumId}/itens/${itemId}`, {
        method: "DELETE",
      })
      if (!response.ok && response.status !== 204) throw new Error(await readAdminApiError(response))
      await refresh()
    },
    [refresh]
  )

  return {
    data,
    pending,
    error,
    refresh,
    saveGaleria,
    deleteGaleria,
    addItem,
    deleteItem,
  }
}
