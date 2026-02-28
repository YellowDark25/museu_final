import { Card, CardContent } from "@/components/ui/card"

/**
 * DocumentosSection
 * Lista simples de documentos históricos.
 */
export default function DocumentosSection() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
      <h3 className="text-lg font-medium text-gray-900">Nenhum documento disponível</h3>
      <p className="mt-2 text-sm text-gray-500">
        Em breve disponibilizaremos documentos históricos digitalizados.
      </p>
    </div>
  )
}