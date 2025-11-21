import { Card, CardContent } from "@/components/ui/card"
import type { AcervoStats } from "@/hooks/useAcervoStats"

type Props = {
  stats: AcervoStats | null
  loading?: boolean
}

/**
 * ColecoesSection
 * Apresenta coleções especiais do acervo, opcionalmente usando estatísticas.
 */
export default function ColecoesSection({ stats, loading }: Props) {
  const collections = [
    { title: "Coleção Barra do Bugres", desc: "Fotografias e documentos da cidade e região." },
    { title: "Projeto Memória Oral", desc: "Depoimentos e registros sonoros." },
    { title: "Acervo Educacional", desc: "Materiais de pesquisa e TCCs." },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((c) => (
          <Card key={c.title}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
              <p className="text-sm text-slate-600">{c.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-base font-semibold mb-2">Resumo</h4>
        {loading ? (
          <p className="text-slate-600">Carregando estatísticas...</p>
        ) : stats ? (
          <p className="text-slate-600">
            {stats.documentos.toLocaleString("pt-BR")} documentos, {stats.fotografias.toLocaleString("pt-BR")} fotografias,
            {" "}{stats.videos.toLocaleString("pt-BR")} vídeos e {stats.audios.toLocaleString("pt-BR")} áudios.
          </p>
        ) : (
          <p className="text-slate-600">Sem dados disponíveis no momento.</p>
        )}
      </div>
    </div>
  )
}