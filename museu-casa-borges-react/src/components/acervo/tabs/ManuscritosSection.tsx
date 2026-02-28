import { Card, CardContent } from "@/components/ui/card"

/**
 * ManuscritosSection
 * Conteúdo da aba "Manuscritos" com alguns cartões de destaque.
 */
export default function ManuscritosSection() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
      <h3 className="text-lg font-medium text-gray-900">Nenhum manuscrito disponível</h3>
      <p className="mt-2 text-sm text-gray-500">
        Em breve disponibilizaremos manuscritos digitalizados do acervo.
      </p>
    </div>
  )
}