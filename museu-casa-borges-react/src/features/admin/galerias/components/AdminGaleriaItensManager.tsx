"use client"

import { useRef, useState } from "react"
import { App, Button, Modal, Spin } from "antd"
import { UploadOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import Image from "next/image"
import type { GaleriaAlbumDTO, GaleriaItemDTO } from "@/features/galerias/dto/galerias.dto"
import { readAdminApiError } from "@/features/admin/utils/read-admin-api-error"

type Props = {
  album: GaleriaAlbumDTO
  open: boolean
  onClose: () => void
  onAddItem: (albumId: number, url: string) => Promise<void>
  onDeleteItem: (albumId: number, itemId: number) => Promise<void>
}

export function AdminGaleriaItensManager(props: Props) {
  if (!props.open) return null
  return (
    <App>
      <AdminGaleriaItensContent {...props} />
    </App>
  )
}

function AdminGaleriaItensContent({ album, open, onClose, onAddItem, onDeleteItem }: Props) {
  const { message, modal } = App.useApp()
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFilesSelected(files: FileList | null) {
    if (!files || files.length === 0) return
    const fileArray = Array.from(files)

    setUploading(true)
    let successCount = 0
    for (const file of fileArray) {
      try {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("subfolder", "itens")
        const response = await fetch("/api/admin/galerias/upload", { method: "POST", body: formData })
        if (!response.ok) {
          message.error(`Erro ao enviar ${file.name}: ${await readAdminApiError(response)}`)
          continue
        }
        const { url } = (await response.json()) as { url: string }
        await onAddItem(album.id, url)
        successCount++
      } catch {
        message.error(`Falha ao enviar ${file.name}.`)
      }
    }
    setUploading(false)
    // Limpa o input para permitir reselecionar os mesmos arquivos
    if (inputRef.current) inputRef.current.value = ""
    if (successCount > 0) {
      message.success(`${successCount} ${successCount === 1 ? "foto adicionada" : "fotos adicionadas"}.`)
    }
  }

  function confirmDelete(item: GaleriaItemDTO) {
    modal.confirm({
      title: "Remover foto",
      content: "Tem certeza que deseja remover esta foto do álbum?",
      okText: "Remover",
      okButtonProps: { danger: true },
      cancelText: "Cancelar",
      onOk: async () => {
        setDeletingId(item.id)
        try {
          await onDeleteItem(album.id, item.id)
          message.success("Foto removida.")
        } catch {
          message.error("Erro ao remover foto.")
        } finally {
          setDeletingId(null)
        }
      },
    })
  }

  const itens = album.itens ?? []

  return (
    <Modal
      open={open}
      title={`Fotos do álbum: ${album.titulo}`}
      onCancel={onClose}
      destroyOnHidden
      width={800}
      footer={<Button onClick={onClose}>Fechar</Button>}
    >
      <div className="space-y-4">
        {/* Input nativo para evitar disparos múltiplos do Ant Design Upload */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFilesSelected(e.target.files)}
        />

        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {itens.length} {itens.length === 1 ? "foto" : "fotos"} no álbum
          </p>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            loading={uploading}
            onClick={() => inputRef.current?.click()}
          >
            Adicionar fotos
          </Button>
        </div>

        {uploading && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Spin size="small" />
            <span>Enviando fotos...</span>
          </div>
        )}

        {itens.length === 0 ? (
          <div
            className="py-12 flex flex-col items-center text-slate-400 border-2 border-dashed rounded-lg cursor-pointer hover:border-slate-400 transition-colors"
            onClick={() => inputRef.current?.click()}
          >
            <UploadOutlined className="text-3xl mb-2" />
            <p>Nenhuma foto ainda. Clique para enviar.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto">
            {itens.map((item) => (
              <div key={item.id} className="relative group aspect-square rounded-lg overflow-hidden bg-slate-100">
                <Image
                  src={item.url}
                  alt={item.titulo ?? "Foto"}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    size="small"
                    loading={deletingId === item.id}
                    onClick={() => confirmDelete(item)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Remover
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}
