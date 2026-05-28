"use client"

import { useCallback, useState } from "react"

import type { AdminNoticiasOverviewDTO, NoticiaInputDTO } from "@/features/noticias/dto/noticias.dto"
import { readAdminApiError } from "@/features/admin/utils/read-admin-api-error"

export function useAdminNoticiasManager(initialData: AdminNoticiasOverviewDTO) {
  const [data, setData] = useState(initialData)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setPending(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/noticias")
      if (!response.ok) throw new Error(await readAdminApiError(response))
      setData((await response.json()) as AdminNoticiasOverviewDTO)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar lista.")
    } finally {
      setPending(false)
    }
  }, [])

  const saveNoticia = useCallback(
    async (input: NoticiaInputDTO, id?: number) => {
      setPending(true)
      setError(null)
      try {
        const response = await fetch(id ? `/api/admin/noticias/${id}` : "/api/admin/noticias", {
          method: id ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        })
        if (!response.ok) throw new Error(await readAdminApiError(response))
        await refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao salvar notícia.")
        throw err
      } finally {
        setPending(false)
      }
    },
    [refresh]
  )

  const deleteNoticia = useCallback(
    async (id: number) => {
      setPending(true)
      setError(null)
      try {
        const response = await fetch(`/api/admin/noticias/${id}`, { method: "DELETE" })
        if (!response.ok) throw new Error(await readAdminApiError(response))
        await refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao excluir notícia.")
        throw err
      } finally {
        setPending(false)
      }
    },
    [refresh]
  )

  return {
    noticias: data.noticias,
    kpis: data.kpis,
    pending,
    error,
    refresh,
    saveNoticia,
    deleteNoticia,
  }
}
