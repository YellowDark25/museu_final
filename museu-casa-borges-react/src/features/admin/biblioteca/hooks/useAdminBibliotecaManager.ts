"use client"

import { useCallback, useMemo, useState } from "react"

import type {
  AdminBibliotecaDocumentoDTO,
  AdminBibliotecaDocumentoInputDTO,
  AdminBibliotecaMutationErrorDTO,
  AdminBibliotecaOverviewDTO,
} from "@/features/admin/biblioteca/dto/admin-biblioteca.dto"

async function readErrorMessage(response: Response) {
  try {
    const body = (await response.json()) as AdminBibliotecaMutationErrorDTO
    return body.message
  } catch {
    return "Não foi possível concluir a operação."
  }
}

function appendDocumentFormData(
  fd: FormData,
  input: AdminBibliotecaDocumentoInputDTO
) {
  fd.append("titulo", input.titulo)
  fd.append("autor", input.autor ?? "")
  fd.append("descricao", input.descricao ?? "")
  fd.append("tipo", input.tipo)
  fd.append(
    "dataPublicacao",
    input.dataPublicacao ?? ""
  )
  fd.append("topicos", input.topicos.join(", "))
  fd.append("ano", input.ano != null ? String(input.ano) : "")
  fd.append("visualizacoes", String(input.visualizacoes ?? 0))
  fd.append("rating", String(input.rating ?? 5))
  fd.append("ordem", String(input.ordem ?? 0))
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
        const fd = new FormData()
        appendDocumentFormData(fd, input)
        fd.append("file", file)

        const response = await fetch("/api/admin/biblioteca/documentos", {
          method: "POST",
          body: fd,
        })

        if (!response.ok) {
          throw new Error(await readErrorMessage(response))
        }

        const doc = (await response.json()) as AdminBibliotecaDocumentoDTO
        setDocumentos((current) =>
          [doc, ...current].sort(
            (a, b) => a.ordem - b.ordem || b.id - a.id
          )
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
        let response: Response

        if (file) {
          const fd = new FormData()
          appendDocumentFormData(fd, input)
          fd.append("file", file)

          response = await fetch(`/api/admin/biblioteca/documentos/${documentId}`, {
            method: "PATCH",
            body: fd,
          })
        } else {
          response = await fetch(`/api/admin/biblioteca/documentos/${documentId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
          })
        }

        if (!response.ok) {
          throw new Error(await readErrorMessage(response))
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
        throw new Error(await readErrorMessage(response))
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
