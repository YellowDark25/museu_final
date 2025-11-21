import { useEffect, useState } from "react"

export type AcervoStats = {
  documentos: number
  fotografias: number
  videos: number
  audios: number
  updatedAt?: string
}

/**
 * useAcervoStats
 * Hook responsável por buscar estatísticas do acervo no endpoint /api/acervo/stats.
 * Retorna { stats, loading, error }.
 */
export function useAcervoStats() {
  const [stats, setStats] = useState<AcervoStats | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    fetch("/api/acervo/stats")
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: AcervoStats) => {
        if (!active) return
        setStats(data)
        setError(null)
      })
      .catch((err) => {
        if (!active) return
        setError(err?.message || "Falha ao carregar estatísticas")
      })
      .finally(() => {
        if (!active) return
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return { stats, loading, error }
}