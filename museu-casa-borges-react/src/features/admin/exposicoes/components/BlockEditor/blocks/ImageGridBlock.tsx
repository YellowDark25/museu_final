"use client"

import { useState } from "react"
import { App } from "antd"

import type {
  SectionDados,
  SectionDadosImageGrid,
} from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"
import { readAdminApiError } from "@/features/admin/utils/read-admin-api-error"

interface ImageGridBlockProps {
  dados: SectionDados
  onUpdate: (dados: SectionDados) => void
}

interface GridItemData {
  src: string
  alt: string
  caption?: string
  href?: string
}

export function ImageGridBlock({ dados, onUpdate }: ImageGridBlockProps) {
  const { message } = App.useApp()
  const gridDados = dados as SectionDadosImageGrid
  const items = gridDados.items ?? []
  const [uploading, setUploading] = useState<number | null>(null)

  function updateItem(index: number, field: keyof GridItemData, value: string) {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    )
    onUpdate({ items: newItems })
  }

  function addItem() {
    onUpdate({ items: [...items, { src: "", alt: "", caption: "", href: "" }] })
  }

  function removeItem(index: number) {
    onUpdate({ items: items.filter((_, i) => i !== index) })
  }

  async function handleFileUpload(index: number, file: File) {
    setUploading(index)
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
      updateItem(index, "src", result.url)
    } catch {
      message.error("Falha ao fazer upload da imagem.")
    } finally {
      setUploading(null)
    }
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="space-y-2 rounded-md border border-gray-100 bg-gray-50 p-3">
          <div className="flex flex-wrap items-center gap-2">
            <label className="cursor-pointer rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs transition-colors hover:bg-gray-100">
              {uploading === index ? "Enviando…" : "Enviar imagem"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading === index}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) void handleFileUpload(index, file)
                  e.target.value = ""
                }}
              />
            </label>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Remover da grade
            </button>
          </div>

          {item.src ? (
            // eslint-disable-next-line @next/next/no-img-element -- preview admin (URLs dinâmicas)
            <img
              src={item.src}
              alt={item.alt || `Item ${index + 1}`}
              className="max-h-32 max-w-full rounded-md border border-gray-100 bg-white object-contain"
            />
          ) : (
            <p className="text-xs text-gray-400">Sem imagem neste item.</p>
          )}

          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              value={item.alt}
              onChange={(e) => updateItem(index, "alt", e.target.value)}
              placeholder="Texto alt"
              className="p-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-red-300"
            />
            <input
              type="text"
              value={item.caption ?? ""}
              onChange={(e) => updateItem(index, "caption", e.target.value)}
              placeholder="Legenda"
              className="p-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-red-300"
            />
            <input
              type="text"
              value={item.href ?? ""}
              onChange={(e) => updateItem(index, "href", e.target.value)}
              placeholder="Link"
              className="p-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="w-full p-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-500 hover:border-red-300 hover:text-red-500 transition-colors"
      >
        + Adicionar imagem à grade
      </button>
    </div>
  )
}
