"use client"

import { useCallback, useMemo, useState } from "react"

import type {
  AdminBibliotecaDocumentoDTO,
  AdminBibliotecaDocumentoInputDTO,
  AdminBibliotecaOverviewDTO,
} from "@/features/admin/biblioteca/dto/admin-biblioteca.dto"
import { readAdminApiError } from "@/features/admin/utils/read-admin-api-error"

async function uploadPdfDirect(file: File): Promise<string> {
  const params = new URLSearchParams({
    filename: file.name,
    size: String(file.size),
  })

  const urlRes = await fetch(`/api/admin/biblioteca/upload-url?${params}`)

  if (!urlRes.ok) {
    throw new Error(await readAdminApiError(urlRes))
  }

  const { signedUrl, publicUrl } = (await urlRes.json()) as {
    signedUrl: string
    publicUrl: string
  }

  const uploadRes = await fetch(signedUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": "application/pdf" },
  })

  if (!uploadRes.ok) {
    throw new Error("Falha ao enviar o arquivo para o armazenamento.")
  }

  return publicUrl
}

export function useAdminBibliotecaManager(initialData: AdminBibliotecaOverviewDTO) {
  const [documentos, setDocumentos] = useState(initialData.documentos)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const kpis = useMemo(
    () => ({
      total: documentos.length,
      publicacoes: documentos.filter((d) => d.tipo === "publicacoes").length,
      pesquisas: documentos.filter((d) => d.tipo === "pesquisas").length,
      artigos: documentos.filter((d) => d.tipo === "artigos").length,
      tcc: documentos.filter((d) => d.tipo === "tcc").length,
    }),
    [documentos]
  )

  const createDocument = useCallback(
    async (input: AdminBibliotecaDocumentoInputDTO, file: File) => {
      setPending(true)
      setError(null)

      try {
        const urlArquivo = await uploadPdfDirect(file)

        const response = await fetch("/api/admin/biblioteca/documentos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...input, urlArquivo }),
        })

        if (!response.ok) {
          throw new Error(await readAdminApiError(response))
        }

        const doc = (await response.json()) as AdminBibliotecaDocumentoDTO
        setDocumentos((current) =>
          [doc, ...current].sort((a, b) => a.ordem - b.ordem || b.id - a.id)
        )
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Não foi possível criar o documento."
        )
        throw err
      } finally {
        setPending(false)
      }
    },
    []
  )

  const updateDocument = useCallback(
    async (
      documentId: number,
      input: AdminBibliotecaDocumentoInputDTO,
      file?: File
    ) => {
      setPending(true)
      setError(null)

      try {
        let urlArquivo: string | undefined

        if (file) {
          urlArquivo = await uploadPdfDirect(file)
        }

        const response = await fetch(`/api/admin/biblioteca/documentos/${documentId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...input, urlArquivo }),
        })

        if (!response.ok) {
          throw new Error(await readAdminApiError(response))
        }

        const doc = (await response.json()) as AdminBibliotecaDocumentoDTO
        setDocumentos((current) =>
          current.map((entry) => (entry.id === doc.id ? doc : entry))
        )
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Não foi possível atualizar o documento."
        )
        throw err
      } finally {
        setPending(false)
      }
    },
    []
  )

  const deleteDocument = useCallback(async (documentId: number) => {
    setPending(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/biblioteca/documentos/${documentId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(await readAdminApiError(response))
      }

      setDocumentos((current) => current.filter((d) => d.id !== documentId))
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Não foi possível excluir o documento."
      )
      throw err
    } finally {
      setPending(false)
    }
  }, [])

  return {
    documentos,
    kpis,
    pending,
    error,
    createDocument,
    updateDocument,
    deleteDocument,
  }
}
