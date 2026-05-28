"use client"

import { useEffect, useState } from "react"
import { App, Modal, Button } from "antd"

import type { NoticiaDTO, NoticiaInputDTO } from "@/features/noticias/dto/noticias.dto"
import { readAdminApiError } from "@/features/admin/utils/read-admin-api-error"

type Props = {
  open: boolean
  editing: NoticiaDTO | null
  onSave: (input: NoticiaInputDTO) => Promise<unknown>
  onCancel: () => void
  loading: boolean
}

export function AdminNoticiaForm(props: Props) {
  if (!props.open) return null

  return (
    <App>
      <AdminNoticiaFormContent {...props} />
    </App>
  )
}

function AdminNoticiaFormContent({
  open,
  editing,
  onSave,
  onCancel,
  loading,
}: Props) {
  const { message } = App.useApp()
  const [titulo, setTitulo] = useState("")
  const [imagemUrl, setImagemUrl] = useState("")
  const [linkDestino, setLinkDestino] = useState("")
  const [publicado, setPublicado] = useState(false)
  const [exibirPopup, setExibirPopup] = useState(true)
  const [dataInicio, setDataInicio] = useState("")
  const [dataFim, setDataFim] = useState("")
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!open) return
    setTitulo(editing?.titulo ?? "")
    setImagemUrl(editing?.imagemUrl ?? "")
    setLinkDestino(editing?.linkDestino ?? "")
    setPublicado(editing?.publicado ?? false)
    setExibirPopup(editing?.exibirPopup ?? true)
    setDataInicio(editing?.dataInicio ? editing.dataInicio.slice(0, 10) : "")
    setDataFim(editing?.dataFim ? editing.dataFim.slice(0, 10) : "")
  }, [open, editing])

  async function handleUpload(file: File) {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/admin/noticias/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        message.error(await readAdminApiError(response))
        return
      }

      const result = (await response.json()) as { url: string }
      setImagemUrl(result.url)
      message.success("Imagem enviada.")
    } catch {
      message.error("Falha ao enviar a imagem.")
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    await onSave({
      titulo,
      imagemUrl,
      linkDestino: linkDestino || undefined,
      publicado,
      exibirPopup,
      dataInicio: dataInicio || null,
      dataFim: dataFim || null,
    })
  }

  return (
    <Modal
      open={open}
      title={editing ? "Editar notícia" : "Nova notícia"}
      onCancel={onCancel}
      footer={null}
      width={640}
      destroyOnHidden
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Título</label>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
            placeholder="Ex.: Exposição especial de maio"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Imagem do popup</label>
          <div className="flex flex-col gap-3">
            {imagemUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imagemUrl}
                alt="Pré-visualização da notícia"
                className="max-h-64 w-full rounded-lg border object-contain"
              />
            ) : null}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) void handleUpload(file)
              }}
              disabled={uploading || loading}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Link ao clicar (opcional)</label>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            value={linkDestino}
            onChange={(event) => setLinkDestino(event.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Exibir a partir de</label>
            <input
              type="date"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={dataInicio}
              onChange={(event) => setDataInicio(event.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Exibir até</label>
            <input
              type="date"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={dataFim}
              onChange={(event) => setDataFim(event.target.value)}
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={publicado}
            onChange={(event) => setPublicado(event.target.checked)}
          />
          Publicada
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={exibirPopup}
            onChange={(event) => setExibirPopup(event.target.checked)}
          />
          Exibir popup na página inicial
        </label>

        <p className="text-xs text-slate-500">
          Apenas uma notícia pode estar ativa como popup por vez. Ao publicar esta, as demais
          deixam de aparecer automaticamente.
        </p>

        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={onCancel}>Cancelar</Button>
          <Button type="primary" htmlType="submit" loading={loading || uploading}>
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
