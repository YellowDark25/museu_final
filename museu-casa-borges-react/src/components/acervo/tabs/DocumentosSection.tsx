import { Card, CardContent } from "@/components/ui/card"

/**
 * DocumentosSection
 * Lista simples de documentos históricos.
 */
export default function DocumentosSection() {
  const docs = [
    { title: "Relatório municipal (1952)", desc: "PDF digitalizado do arquivo público." },
    { title: "Atas da comunidade (1968)", desc: "Registros de reuniões e decisões." },
    { title: "Projeto cultural (1984)", desc: "Documentação de iniciativas culturais." },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {docs.map((d) => (
        <Card key={d.title}>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">{d.title}</h3>
            <p className="text-sm text-slate-600">{d.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}