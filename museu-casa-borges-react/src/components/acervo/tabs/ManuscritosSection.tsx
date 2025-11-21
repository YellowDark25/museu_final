import { Card, CardContent } from "@/components/ui/card"

/**
 * ManuscritosSection
 * Conteúdo da aba "Manuscritos" com alguns cartões de destaque.
 */
export default function ManuscritosSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {["Caderno de notas", "Carta histórica", "Rascunhos literários"].map((title) => (
        <Card key={title}>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-slate-600">Material digitalizado e disponível para consulta pública.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}