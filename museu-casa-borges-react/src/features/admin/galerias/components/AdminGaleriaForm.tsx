"use client"

import { useEffect, useRef, useState } from "react"
import { App, Modal, Button, Input, Select, Switch, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import Image from "next/image"
import type { GaleriaAlbumDTO, GaleriaAlbumInputDTO } from "@/features/galerias/dto/galerias.dto"
import { readAdminApiError } from "@/features/admin/utils/read-admin-api-error"

const CATEGORIAS = ["Oficinas", "Eventos", "Visitas", "Exposições", "Outros"]

type Props = {
  open: boolean
  editing: GaleriaAlbumDTO | null
  onSave: (input: GaleriaAlbumInputDTO, id?: number) => Promise<unknown>
  onCancel: () => void
  loading: boolean
}

export function AdminGaleriaForm(props: Props) {
  if (!props.open) return null
  return (
    <App>
      <AdminGaleriaFormContent {...props} />
    </App>
  )
}

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function AdminGaleriaFormContent({ open, editing, onSave, onCancel, loading }: Props) {
  const { message } = App.useApp()
  const [titulo, setTitulo] = useState("")
  const [slug, setSlug] = useState("")
  const [descricao, setDescricao] = useState("")
  const [capaUrl, setCapaUrl] = useState("")
  const [dataEvento, setDataEvento] = useState("")
  const [categoria, setCategoria] = useState<string | null>(null)
  const [publicado, setPublicado] = useState(false)
  const [uploading, setUploading] = useState(false)
  const slugTouched = useRef(false)

  useEffect(() => {
    if (!open) return
    slugTouched.current = !!editing
    setTitulo(editing?.titulo ?? "")
    setSlug(editing?.slug ?? "")
    setDescricao(editing?.descricao ?? "")
    setCapaUrl(editing?.capaUrl ?? "")
    setDataEvento(editing?.dataEvento ?? "")
    setCategoria(editing?.categoria ?? null)
    setPublicado(editing?.publicado ?? false)
  }, [open, editing])

  function handleTituloChange(value: string) {
    setTitulo(value)
    if (!slugTouched.current) {
      setSlug(slugify(value))
    }
  }

  async function handleUploadCapa(file: File) {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("subfolder", "capas")
      const response = await fetch("/api/admin/galerias/upload", { method: "POST", body: formData })
      if (!response.ok) {
        message.error(await readAdminApiError(response))
        return
      }
      const result = (await response.json()) as { url: string }
      setCapaUrl(result.url)
      message.success("Imagem de capa enviada.")
    } catch {
      message.error("Falha ao enviar imagem.")
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit() {
    const input: GaleriaAlbumInputDTO = {
      titulo: titulo.trim(),
      slug: slug.trim(),
      descricao: descricao.trim() || null,
      capaUrl: capaUrl.trim() || null,
      dataEvento: dataEvento || null,
      categoria,
      publicado,
    }
    try {
      await onSave(input, editing?.id)
      message.success(editing ? "Galeria atualizada." : "Galeria criada.")
    } catch (err) {
      message.error(err instanceof Error ? err.message : "Erro ao salvar.")
    }
  }

  return (
    <Modal
      open={open}
      title={editing ? "Editar álbum" : "Novo álbum de galeria"}
      onCancel={onCancel}
      destroyOnHidden
      footer={[
        <Button key="cancel" onClick={onCancel} disabled={loading || uploading}>
          Cancelar
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          disabled={uploading || !titulo.trim() || !slug.trim()}
        >
          {editing ? "Salvar alterações" : "Criar álbum"}
        </Button>,
      ]}
    >
      <div className="space-y-4 py-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Título *</label>
          <Input
            value={titulo}
            onChange={(e) => handleTituloChange(e.target.value)}
            placeholder="Ex: Visita da UFMT"
            maxLength={200}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL) *</label>
          <Input
            value={slug}
            onChange={(e) => {
              slugTouched.current = true
              setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
            }}
            placeholder="visita-ufmt"
            maxLength={120}
            addonBefore="/galerias/"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
          <Input.TextArea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={3}
            placeholder="Descrição do álbum..."
            maxLength={1000}
            showCount
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
            <Select
              value={categoria}
              onChange={setCategoria}
              allowClear
              className="w-full"
              placeholder="Selecione..."
              options={CATEGORIAS.map((c) => ({ value: c, label: c }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Data do evento</label>
            <Input
              type="date"
              value={dataEvento}
              onChange={(e) => setDataEvento(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Imagem de capa</label>
          {capaUrl && (
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-2 bg-slate-100">
              <Image src={capaUrl} alt="Capa" fill className="object-cover" />
            </div>
          )}
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={(file) => {
              handleUploadCapa(file)
              return false
            }}
          >
            <Button icon={<UploadOutlined />} loading={uploading}>
              {capaUrl ? "Substituir capa" : "Enviar capa"}
            </Button>
          </Upload>
          {capaUrl && (
            <Button type="link" danger size="small" onClick={() => setCapaUrl("")} className="ml-2">
              Remover
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Switch checked={publicado} onChange={setPublicado} />
          <span className="text-sm text-slate-700">Publicado (visível no site)</span>
        </div>
      </div>
    </Modal>
  )
}
