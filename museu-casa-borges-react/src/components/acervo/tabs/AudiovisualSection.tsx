import { Card, CardContent } from "@/components/ui/card"

/**
 * AudiovisualSection
 * Lista simples de itens de áudio e vídeo.
 */
export default function AudiovisualSection() {
  const items = [
    { title: "Entrevista em vídeo (1995)", type: "Vídeo" },
    { title: "Gravação oral (1972)", type: "Áudio" },
    { title: "Registro de evento (2005)", type: "Vídeo" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((it) => (
        <Card key={it.title}>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">{it.title}</h3>
            <p className="text-sm text-slate-600">Tipo: {it.type}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}