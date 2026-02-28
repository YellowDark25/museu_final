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
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
        <h3 className="text-lg font-medium text-gray-900">Nenhuma coleção em destaque</h3>
        <p className="mt-2 text-sm text-gray-500">
          Em breve apresentaremos as coleções especiais do museu.
        </p>
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