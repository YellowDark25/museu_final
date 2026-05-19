"use client"

import { useCallback, useState } from "react"

import type { AdminVisitasOverviewDTO, VisitaStatus } from "@/features/visitas/dto/visitas.dto"
import { readAdminApiError } from "@/features/admin/utils/read-admin-api-error"

export function useAdminVisitasManager(initialData: AdminVisitasOverviewDTO) {
  const [data, setData] = useState(initialData)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setPending(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/visitas")
      if (!response.ok) throw new Error(await readAdminApiError(response))
      setData((await response.json()) as AdminVisitasOverviewDTO)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar lista.")
    } finally {
      setPending(false)
    }
  }, [])

  const updateStatus = useCallback(
    async (id: number, status: Exclude<VisitaStatus, "pendente">, observacaoAdmin?: string) => {
      setPending(true)
      setError(null)
      try {
        const response = await fetch(`/api/admin/visitas/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, observacaoAdmin }),
        })
        if (!response.ok) throw new Error(await readAdminApiError(response))
        await refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao atualizar solicitação.")
        throw err
      } finally {
        setPending(false)
      }
    },
    [refresh]
  )

  return {
    solicitacoes: data.solicitacoes,
    kpis: data.kpis,
    pending,
    error,
    refresh,
    updateStatus,
  }
}
