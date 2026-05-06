"use client"

import type {
  SectionDados,
  SectionDadosSubtitle,
} from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"

interface SubtitleBlockProps {
  dados: SectionDados
  onUpdate: (dados: SectionDados) => void
}

export function SubtitleBlock({ dados, onUpdate }: SubtitleBlockProps) {
  const subtitleDados = dados as SectionDadosSubtitle

  return (
    <input
      type="text"
      value={subtitleDados.content}
      onChange={(e) => onUpdate({ content: e.target.value })}
      placeholder="Título da seção (ex: PATRIMÔNIO NATURAL)"
      className="w-full p-3 border border-gray-200 rounded-md text-lg font-bold focus:outline-none focus:ring-2 focus:ring-red-300"
    />
  )
}
