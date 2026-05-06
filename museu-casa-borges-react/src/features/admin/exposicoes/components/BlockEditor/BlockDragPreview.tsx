"use client"

import type { ExposicaoVirtualEditorBlock } from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"

const TYPE_LABELS: Record<string, string> = {
  text: "Texto",
  subtitle: "Subtítulo",
  image: "Imagem",
  image_grid: "Grade de Imagens",
}

function snippet(block: ExposicaoVirtualEditorBlock): string {
  switch (block.tipo) {
    case "text":
    case "subtitle":
      return block.dados.content?.trim().slice(0, 100) || "(vazio)"
    case "image":
      return block.dados.alt?.trim() || "Imagem"
    case "image_grid": {
      const n = block.dados.items?.length ?? 0
      return n === 0 ? "Nenhuma imagem" : `${n} imagem(ns) na grade`
    }
    default:
      return ""
  }
}

/**
 * Leve e estático — usado no DragOverlay para evitar distorção do transform e inputs aninhados.
 */
export function BlockDragPreview({ block }: { block: ExposicaoVirtualEditorBlock }) {
  return (
    <div className="pointer-events-none w-[min(100%,36rem)] cursor-grabbing rounded-lg border-2 border-[var(--museu-red,#b91c1c)]/35 bg-white shadow-2xl ring-4 ring-red-100/60">
      <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-3 py-2 rounded-t-lg">
        <span className="text-gray-400 select-none" aria-hidden>
          ⠿
        </span>
        <span className="text-xs font-medium uppercase text-gray-600">
          {TYPE_LABELS[block.tipo] ?? block.tipo}
        </span>
      </div>
      <div className="px-3 py-2 text-sm text-gray-700">
        <p className="line-clamp-2">{snippet(block)}</p>
      </div>
    </div>
  )
}
