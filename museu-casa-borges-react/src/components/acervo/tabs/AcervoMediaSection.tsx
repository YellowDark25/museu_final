import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { PublicAcervoMediaDTO } from "@/features/acervo/dto/public-acervo.dto"

type Props = {
  title: string
  description: string
  emptyTitle: string
  emptyDescription: string
  media: PublicAcervoMediaDTO[]
  keyword?: string
}

function mediaTypeLabel(value: string | null) {
  if (!value) {
    return "Arquivo"
  }
  if (value === "imagem") return "Imagem"
  if (value === "documento") return "Documento"
  if (value === "video") return "Vídeo"
  if (value === "audio") return "Áudio"
  return value
}

export default function AcervoMediaSection({
  title,
  description,
  emptyTitle,
  emptyDescription,
  media,
  keyword,
}: Props) {
  const normalizedKeyword = keyword?.trim().toLowerCase() ?? ""
  const visibleMedia = normalizedKeyword
    ? media.filter((entry) =>
        [entry.nome, entry.legenda, entry.tipo, entry.categoriaNome, entry.url]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(normalizedKeyword)
          )
      )
    : media

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
      </div>

      {visibleMedia.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
          <h3 className="text-lg font-medium text-gray-900">{emptyTitle}</h3>
          <p className="mt-2 text-sm text-gray-500">{emptyDescription}</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleMedia.map((entry) => (
            <Card key={entry.id} className="bg-white shadow-sm">
              <CardContent className="space-y-4 p-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {entry.categoriaNome ? (
                      <Badge variant="secondary">{entry.categoriaNome}</Badge>
                    ) : null}
                    <Badge variant="outline">{mediaTypeLabel(entry.tipo)}</Badge>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-950">
                    {entry.nome?.trim() ||
                      entry.legenda?.trim() ||
                      "Mídia sem título"}
                  </h4>
                  <p className="text-sm text-slate-500">
                    {mediaTypeLabel(entry.tipo)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={entry.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    Abrir arquivo
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
