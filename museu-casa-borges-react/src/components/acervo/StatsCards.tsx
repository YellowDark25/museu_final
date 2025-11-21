import { Card, CardContent } from "@/components/ui/card"
import { FileText, Image as ImageIcon, Film, Headphones } from "lucide-react"
import type { AcervoStats } from "@/hooks/useAcervoStats"

type Props = {
  stats: AcervoStats | null
  loading?: boolean
}

/**
 * StatsCards
 * Mostra cartões de estatísticas (Documentos, Fotografias, Vídeos, Áudios).
 */
export default function StatsCards({ stats, loading }: Props) {
  const items = [
    { label: "Documentos", value: stats?.documentos ?? 0, icon: FileText },
    { label: "Fotografias", value: stats?.fotografias ?? 0, icon: ImageIcon },
    { label: "Vídeos", value: stats?.videos ?? 0, icon: Film },
    { label: "Áudios", value: stats?.audios ?? 0, icon: Headphones },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((it) => (
        <Card key={it.label} className="bg-white shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <it.icon className="w-6 h-6 text-blue-600" />
            <div>
              <div className="text-sm text-slate-500">{it.label}</div>
              <div className="text-2xl font-bold">
                {loading ? <span className="animate-pulse">...</span> : it.value.toLocaleString("pt-BR")}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}