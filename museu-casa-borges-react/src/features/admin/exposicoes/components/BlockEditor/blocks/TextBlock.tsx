"use client"

import type {
  SectionDados,
  SectionDadosText,
} from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"

interface TextBlockProps {
  dados: SectionDados
  onUpdate: (dados: SectionDados) => void
}

export function TextBlock({ dados, onUpdate }: TextBlockProps) {
  const textDados = dados as SectionDadosText

  return (
    <textarea
      value={textDados.content}
      onChange={(e) => onUpdate({ content: e.target.value })}
      placeholder="Conteúdo em HTML (ex: <p>Texto aqui</p>)"
      className="w-full min-h-[120px] p-3 border border-gray-200 rounded-md text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-red-300"
    />
  )
}
