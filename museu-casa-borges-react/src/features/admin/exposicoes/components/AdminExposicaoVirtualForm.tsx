"use client"

import { useState } from "react"
import { Modal, Button, message } from "antd"

import type {
  ExposicaoVirtualDTO,
  ExposicaoVirtualInputDTO,
} from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"
import { readAdminApiError } from "@/features/admin/utils/read-admin-api-error"

interface Props {
  open: boolean
  editing: ExposicaoVirtualDTO | null
  onSave: (input: ExposicaoVirtualInputDTO) => Promise<unknown>
  onCancel: () => void
  loading: boolean
}

export function AdminExposicaoVirtualForm({
  open,
  editing,
  onSave,
  onCancel,
  loading,
}: Props) {
  const [titulo, setTitulo] = useState(editing?.titulo ?? "")
  const [descricaoCurta, setDescricaoCurta] = useState(editing?.descricaoCurta ?? "")
  const [imagemCapa, setImagemCapa] = useState(editing?.imagemCapa ?? "")
  const [autor, setAutor] = useState(editing?.autor ?? "")
  const [publicado, setPublicado] = useState(editing?.publicado ?? false)
  const [ordem, setOrdem] = useState(editing?.ordem ?? 0)
  const [uploadingCapa, setUploadingCapa] = useState(false)

  function resetForm() {
    setTitulo(editing?.titulo ?? "")
    setDescricaoCurta(editing?.descricaoCurta ?? "")
    setImagemCapa(editing?.imagemCapa ?? "")
    setAutor(editing?.autor ?? "")
    setPublicado(editing?.publicado ?? false)
    setOrdem(editing?.ordem ?? 0)
  }

  async function handleCapaUpload(file: File) {
    setUploadingCapa(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/admin/exposicoes/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        message.error(await readAdminApiError(response))
        return
      }

      const result = (await response.json()) as { url: string }
      setImagemCapa(result.url)
      message.success("Imagem de capa enviada.")
    } catch {
      message.error("Falha ao enviar a imagem de capa.")
    } finally {
      setUploadingCapa(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSave({
      titulo,
      descricaoCurta: descricaoCurta || undefined,
      imagemCapa: imagemCapa || undefined,
      autor: autor || undefined,
      publicado,
      ordem,
    })
    resetForm()
  }

  return (
    <Modal
      title={editing ? "Editar Exposição Virtual" : "Nova Exposição Virtual"}
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
      afterOpenChange={(visible) => {
        if (visible) resetForm()
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-3 mt-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título *</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="w-full p-2 border rounded"
            placeholder="Nome da exposição"
          />
          <p className="text-xs text-gray-400 mt-1">
            O slug será gerado automaticamente a partir do título.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Descrição curta</label>
          <textarea
            value={descricaoCurta}
            onChange={(e) => setDescricaoCurta(e.target.value)}
            className="w-full p-2 border rounded"
            rows={2}
            placeholder="Texto que aparece no card da listagem"
          />
        </div>

        <div>
          <span className="block text-sm font-medium mb-1">Imagem de capa</span>
          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex cursor-pointer items-center rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm hover:bg-gray-100">
              {uploadingCapa ? "Enviando…" : "Enviar arquivo"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                disabled={uploadingCapa || loading}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) void handleCapaUpload(file)
                  e.target.value = ""
                }}
              />
            </label>
          </div>
          {imagemCapa ? (
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-start">
              {/* eslint-disable-next-line @next/next/no-img-element -- pré-visualização de URL arbitrária no admin */}
              <img
                src={imagemCapa}
                alt="Pré-visualização da capa"
                className="max-h-32 rounded border border-gray-100 object-contain"
              />
              <Button type="link" danger size="small" onClick={() => setImagemCapa("")}>
                Remover imagem
              </Button>
            </div>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Autor</label>
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Nome do curador/autor"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={publicado}
              onChange={(e) => setPublicado(e.target.checked)}
            />
            Publicada
          </label>
          <div>
            <label className="text-sm mr-2">Ordem:</label>
            <input
              type="number"
              value={ordem}
              onChange={(e) => setOrdem(Number(e.target.value))}
              className="w-16 p-1 border rounded"
            />
          </div>
        </div>
        <Button type="primary" htmlType="submit" loading={loading} block>
          {editing ? "Atualizar" : "Criar"}
        </Button>
      </form>
    </Modal>
  )
}
