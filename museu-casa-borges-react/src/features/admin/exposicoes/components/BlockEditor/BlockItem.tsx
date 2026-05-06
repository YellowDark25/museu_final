"use client"

import type { CSSProperties } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import type {
  ExposicaoVirtualEditorBlock,
  SectionDados,
} from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"
import { TextBlock } from "./blocks/TextBlock"
import { SubtitleBlock } from "./blocks/SubtitleBlock"
import { ImageBlock } from "./blocks/ImageBlock"
import { ImageGridBlock } from "./blocks/ImageGridBlock"

interface BlockItemProps {
  block: ExposicaoVirtualEditorBlock
  onUpdate: (dados: SectionDados) => void
  onDelete: () => void
}

const TYPE_LABELS: Record<string, string> = {
  text: "Texto",
  subtitle: "Subtítulo",
  image: "Imagem",
  image_grid: "Grade de Imagens",
}

export function BlockItem({ block, onUpdate, onDelete }: BlockItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.localId,
    /** Sem animação de troca de slots durante o arrasto — reduz distorção visual. */
    animateLayoutChanges: () => false,
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    /** Transição desligada enquanto arrasta: o preview real está no DragOverlay. */
    transition: isDragging ? undefined : transition,
    opacity: isDragging ? 0 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-gray-200 rounded-lg bg-white shadow-sm"
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 bg-gray-50 rounded-t-lg">
        <button
          type="button"
          className="cursor-grab text-gray-400 hover:text-gray-600 p-1"
          {...attributes}
          {...listeners}
        >
          ⠿
        </button>
        <span className="text-xs font-medium text-gray-500 uppercase">
          {TYPE_LABELS[block.tipo] ?? block.tipo}
        </span>
        <button
          type="button"
          onClick={onDelete}
          className="ml-auto text-red-400 hover:text-red-600 text-sm p-1"
        >
          Remover
        </button>
      </div>

      <div className="p-3">
        {block.tipo === "text" && (
          <TextBlock dados={block.dados} onUpdate={onUpdate} />
        )}
        {block.tipo === "subtitle" && (
          <SubtitleBlock dados={block.dados} onUpdate={onUpdate} />
        )}
        {block.tipo === "image" && (
          <ImageBlock dados={block.dados} onUpdate={onUpdate} />
        )}
        {block.tipo === "image_grid" && (
          <ImageGridBlock dados={block.dados} onUpdate={onUpdate} />
        )}
      </div>
    </div>
  )
}
