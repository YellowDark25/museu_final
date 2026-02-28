import { Card, CardContent } from "@/components/ui/card"

/**
 * AudiovisualSection
 * Lista simples de itens de áudio e vídeo.
 */
export default function AudiovisualSection() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
      <h3 className="text-lg font-medium text-gray-900">Nenhum material audiovisual disponível</h3>
      <p className="mt-2 text-sm text-gray-500">
        Em breve disponibilizaremos áudios e vídeos do acervo.
      </p>
    </div>
  )
}