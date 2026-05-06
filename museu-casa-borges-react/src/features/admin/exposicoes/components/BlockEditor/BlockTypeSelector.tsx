"use client"

import type { SectionType } from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"

interface BlockTypeSelectorProps {
  onSelect: (tipo: SectionType) => void
  onCancel: () => void
}

const BLOCK_TYPES: { tipo: SectionType; label: string; description: string }[] = [
  { tipo: "text", label: "Texto", description: "Parágrafo com formatação HTML" },
  { tipo: "subtitle", label: "Subtítulo", description: "Título de seção" },
  { tipo: "image", label: "Imagem", description: "Imagem com legenda e link" },
  { tipo: "image_grid", label: "Grade de Imagens", description: "Galeria com múltiplas imagens" },
]

export function BlockTypeSelector({ onSelect, onCancel }: BlockTypeSelectorProps) {
  return (
    <div className="border-2 border-dashed border-red-300 rounded-lg p-4 bg-red-50">
      <p className="text-sm font-medium text-gray-700 mb-3">Escolha o tipo de bloco:</p>
      <div className="grid grid-cols-2 gap-2">
        {BLOCK_TYPES.map((bt) => (
          <button
            key={bt.tipo}
            type="button"
            onClick={() => onSelect(bt.tipo)}
            className="text-left p-3 border border-gray-200 rounded-md hover:border-red-400 hover:bg-white transition-colors"
          >
            <span className="block text-sm font-medium text-gray-800">{bt.label}</span>
            <span className="block text-xs text-gray-500">{bt.description}</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onCancel}
        className="mt-3 text-sm text-gray-500 hover:text-gray-700"
      >
        Cancelar
      </button>
    </div>
  )
}
