"use client"

import { useCallback, useMemo, useState } from "react"

import type {
  ExposicaoVirtualDTO,
  ExposicaoVirtualComSecoesDTO,
  ExposicaoVirtualInputDTO,
  ExposicaoVirtualSecaoInputDTO,
  ExposicaoPermanenteDTO,
  ExposicaoPermanenteInputDTO,
  ExposicaoTemporariaDTO,
  ExposicaoTemporariaInputDTO,
  ArtistaExposicaoDTO,
  ArtistaExposicaoInputDTO,
  ArtistaSecaoInputDTO,
  AdminExposicoesOverviewDTO,
} from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"
import { readAdminApiError } from "@/features/admin/utils/read-admin-api-error"

export function useAdminExposicoesManager(initialData: AdminExposicoesOverviewDTO) {
  const [virtuais, setVirtuais] = useState(initialData.virtuais)
  const [permanentes, setPermanentes] = useState(initialData.permanentes)
  const [temporarias, setTemporarias] = useState(initialData.temporarias)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const kpis = useMemo(
    () => ({
      totalVirtuais: virtuais.length,
      totalPermanentes: permanentes.length,
      totalTemporarias: temporarias.length,
      publicadasVirtuais: virtuais.filter((v) => v.publicado).length,
    }),
    [virtuais, permanentes, temporarias]
  )

  // --- Virtuais ---

  const createVirtual = useCallback(async (input: ExposicaoVirtualInputDTO) => {
    setPending(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/exposicoes/virtuais", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
      if (!response.ok) throw new Error(await readAdminApiError(response))
      const expo = (await response.json()) as ExposicaoVirtualDTO
      setVirtuais((current) =>
        [...current, expo].sort((a, b) => a.ordem - b.ordem)
      )
      return expo
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao criar exposição virtual."
      setError(msg)
      throw err
    } finally {
      setPending(false)
    }
  }, [])

  const updateVirtual = useCallback(
    async (id: number, input: ExposicaoVirtualInputDTO) => {
      setPending(true)
      setError(null)
      try {
        const response = await fetch(`/api/admin/exposicoes/virtuais/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        })
        if (!response.ok) throw new Error(await readAdminApiError(response))
        const expo = (await response.json()) as ExposicaoVirtualDTO
        setVirtuais((current) =>
          current.map((e) => (e.id === expo.id ? expo : e)).sort((a, b) => a.ordem - b.ordem)
        )
        return expo
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erro ao atualizar exposição virtual."
        setError(msg)
        throw err
      } finally {
        setPending(false)
      }
    },
    []
  )

  const deleteVirtual = useCallback(async (id: number) => {
    setPending(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/exposicoes/virtuais/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error(await readAdminApiError(response))
      setVirtuais((current) => current.filter((e) => e.id !== id))
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao excluir exposição virtual."
      setError(msg)
      throw err
    } finally {
      setPending(false)
    }
  }, [])

  const saveVirtualSecoes = useCallback(
    async (exposicaoId: number, secoes: ExposicaoVirtualSecaoInputDTO[]) => {
      setPending(true)
      setError(null)
      try {
        const response = await fetch(`/api/admin/exposicoes/virtuais/${exposicaoId}/secoes`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ secoes }),
        })
        if (!response.ok) throw new Error(await readAdminApiError(response))
        return (await response.json()) as ExposicaoVirtualComSecoesDTO
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erro ao salvar seções."
        setError(msg)
        throw err
      } finally {
        setPending(false)
      }
    },
    []
  )

  // --- Permanentes ---

  const createPermanente = useCallback(async (input: ExposicaoPermanenteInputDTO) => {
    setPending(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/exposicoes/permanentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
      if (!response.ok) throw new Error(await readAdminApiError(response))
      const expo = (await response.json()) as ExposicaoPermanenteDTO
      setPermanentes((current) =>
        [...current, expo].sort((a, b) => a.ordem - b.ordem)
      )
      return expo
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao criar exposição permanente."
      setError(msg)
      throw err
    } finally {
      setPending(false)
    }
  }, [])

  const updatePermanente = useCallback(
    async (id: number, input: ExposicaoPermanenteInputDTO) => {
      setPending(true)
      setError(null)
      try {
        const response = await fetch(`/api/admin/exposicoes/permanentes/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        })
        if (!response.ok) throw new Error(await readAdminApiError(response))
        const expo = (await response.json()) as ExposicaoPermanenteDTO
        setPermanentes((current) =>
          current.map((e) => (e.id === expo.id ? expo : e)).sort((a, b) => a.ordem - b.ordem)
        )
        return expo
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erro ao atualizar exposição permanente."
        setError(msg)
        throw err
      } finally {
        setPending(false)
      }
    },
    []
  )

  const deletePermanente = useCallback(async (id: number) => {
    setPending(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/exposicoes/permanentes/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error(await readAdminApiError(response))
      setPermanentes((current) => current.filter((e) => e.id !== id))
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao excluir exposição permanente."
      setError(msg)
      throw err
    } finally {
      setPending(false)
    }
  }, [])

  // --- Temporárias ---

  const createTemporaria = useCallback(async (input: ExposicaoTemporariaInputDTO) => {
    setPending(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/exposicoes/temporarias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
      if (!response.ok) throw new Error(await readAdminApiError(response))
      const expo = (await response.json()) as ExposicaoTemporariaDTO
      setTemporarias((current) =>
        [...current, expo].sort((a, b) => a.ordem - b.ordem)
      )
      return expo
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao criar exposição temporária."
      setError(msg)
      throw err
    } finally {
      setPending(false)
    }
  }, [])

  const updateTemporaria = useCallback(
    async (id: number, input: ExposicaoTemporariaInputDTO) => {
      setPending(true)
      setError(null)
      try {
        const response = await fetch(`/api/admin/exposicoes/temporarias/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        })
        if (!response.ok) throw new Error(await readAdminApiError(response))
        const expo = (await response.json()) as ExposicaoTemporariaDTO
        setTemporarias((current) =>
          current.map((e) => (e.id === expo.id ? expo : e)).sort((a, b) => a.ordem - b.ordem)
        )
        return expo
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erro ao atualizar exposição temporária."
        setError(msg)
        throw err
      } finally {
        setPending(false)
      }
    },
    []
  )

  const deleteTemporaria = useCallback(async (id: number) => {
    setPending(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/exposicoes/temporarias/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error(await readAdminApiError(response))
      setTemporarias((current) => current.filter((e) => e.id !== id))
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao excluir exposição temporária."
      setError(msg)
      throw err
    } finally {
      setPending(false)
    }
  }, [])

  // --- Artistas (via endpoints separados) ---

  const createArtista = useCallback(async (input: ArtistaExposicaoInputDTO) => {
    setPending(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/exposicoes/artistas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
      if (!response.ok) throw new Error(await readAdminApiError(response))
      return (await response.json()) as ArtistaExposicaoDTO
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao criar artista."
      setError(msg)
      throw err
    } finally {
      setPending(false)
    }
  }, [])

  const updateArtista = useCallback(
    async (id: number, input: ArtistaExposicaoInputDTO) => {
      setPending(true)
      setError(null)
      try {
        const response = await fetch(`/api/admin/exposicoes/artistas/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        })
        if (!response.ok) throw new Error(await readAdminApiError(response))
        return (await response.json()) as ArtistaExposicaoDTO
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erro ao atualizar artista."
        setError(msg)
        throw err
      } finally {
        setPending(false)
      }
    },
    []
  )

  const deleteArtista = useCallback(async (id: number) => {
    setPending(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/exposicoes/artistas/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error(await readAdminApiError(response))
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao excluir artista."
      setError(msg)
      throw err
    } finally {
      setPending(false)
    }
  }, [])

  const saveArtistaSecoes = useCallback(
    async (artistaId: number, secoes: ArtistaSecaoInputDTO[]) => {
      setPending(true)
      setError(null)
      try {
        const response = await fetch(`/api/admin/exposicoes/artistas/${artistaId}/secoes`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ secoes }),
        })
        if (!response.ok) throw new Error(await readAdminApiError(response))
        return await response.json()
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erro ao salvar seções do artista."
        setError(msg)
        throw err
      } finally {
        setPending(false)
      }
    },
    []
  )

  return {
    virtuais,
    permanentes,
    temporarias,
    kpis,
    pending,
    error,
    createVirtual,
    updateVirtual,
    deleteVirtual,
    saveVirtualSecoes,
    createPermanente,
    updatePermanente,
    deletePermanente,
    createTemporaria,
    updateTemporaria,
    deleteTemporaria,
    createArtista,
    updateArtista,
    deleteArtista,
    saveArtistaSecoes,
  }
}
