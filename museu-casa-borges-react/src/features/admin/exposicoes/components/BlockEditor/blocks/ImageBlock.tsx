"use client"

import { useState } from "react"
import { message } from "antd"

import type {
  SectionDados,
  SectionDadosImage,
} from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"
import { readAdminApiError } from "@/features/admin/utils/read-admin-api-error"

interface ImageBlockProps {
  dados: SectionDados
  onUpdate: (dados: SectionDados) => void
}

export function ImageBlock({ dados, onUpdate }: ImageBlockProps) {
  const imgDados = dados as SectionDadosImage
  const [uploading, setUploading] = useState(false)

  async function handleFileUpload(file: File) {
    setUploading(true)
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
      onUpdate({ ...imgDados, src: result.url })
    } catch {
      message.error("Falha ao fazer upload da imagem.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <label className="cursor-pointer rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors hover:bg-gray-100">
          {uploading ? "Enviando…" : "Enviar imagem"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void handleFileUpload(file)
              e.target.value = ""
            }}
          />
        </label>
        {imgDados.src ? (
          <button
            type="button"
            onClick={() => onUpdate({ ...imgDados, src: "" })}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Remover imagem
          </button>
        ) : null}
      </div>

      {imgDados.src ? (
        // Preview no admin: Storage/CDN; next/image exigiria domínios configurados.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgDados.src}
          alt={imgDados.alt || "Pré-visualização"}
          className="max-h-48 max-w-full rounded-md border border-gray-100 bg-gray-50 object-contain"
        />
      ) : (
        <p className="text-xs text-gray-400">Nenhuma imagem — use &quot;Enviar imagem&quot;.</p>
      )}

      <div className="grid grid-cols-3 gap-2">
        <input
          type="text"
          value={imgDados.alt}
          onChange={(e) => onUpdate({ ...imgDados, alt: e.target.value })}
          placeholder="Texto alt"
          className="p-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
        />
        <input
          type="text"
          value={imgDados.caption ?? ""}
          onChange={(e) => onUpdate({ ...imgDados, caption: e.target.value })}
          placeholder="Legenda"
          className="p-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
        />
        <input
          type="text"
          value={imgDados.href ?? ""}
          onChange={(e) => onUpdate({ ...imgDados, href: e.target.value })}
          placeholder="Link (opcional)"
          className="p-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
        />
      </div>
    </div>
  )
}
