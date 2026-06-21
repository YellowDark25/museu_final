import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ImageGallery } from '@/components/gallery'
import type { GalleryImage } from '@/components/gallery'
import { getGaleriaBySlug } from '@/features/galerias/server/public-galerias.service'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const galeria = await getGaleriaBySlug(slug)
  if (!galeria) return {}
  return {
    title: `${galeria.titulo} — Galerias | Museu Casa Borges`,
    description: galeria.descricao ?? undefined,
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function GaleriaSlugPage({ params }: Props) {
  const { slug } = await params
  const galeria = await getGaleriaBySlug(slug)

  if (!galeria) notFound()

  const galleryImages: GalleryImage[] = (galeria.itens ?? []).map((item) => ({
    id: String(item.id),
    src: item.url,
    alt: item.titulo ?? item.legenda ?? galeria.titulo,
    title: item.titulo ?? undefined,
    description: item.legenda ?? undefined,
    category: item.categoriaItem ?? undefined,
  }))

  return (
    <>
      {/* Header */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <Link href="/galerias">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar às Galerias
            </Button>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              {galeria.categoria && (
                <Badge variant="secondary" className="mb-3">
                  {galeria.categoria}
                </Badge>
              )}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {galeria.titulo}
              </h1>
              {galeria.descricao && (
                <p className="text-xl text-gray-600 max-w-3xl">
                  {galeria.descricao}
                </p>
              )}
            </div>

            <div className="flex-shrink-0">
              <div className="bg-slate-50 rounded-lg p-6 space-y-4 border border-slate-200 min-w-[200px]">
                {galeria.dataEvento && (
                  <div className="flex items-center text-slate-700">
                    <Calendar className="h-5 w-5 mr-3 text-red-600" />
                    <span>{formatDate(galeria.dataEvento)}</span>
                  </div>
                )}
                <div className="flex items-center text-slate-700">
                  <ImageIcon className="h-5 w-5 mr-3 text-red-600" />
                  <span>{galeria.totalFotos ?? 0} {(galeria.totalFotos ?? 0) === 1 ? 'foto' : 'fotos'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {galleryImages.length > 0 ? (
            <ImageGallery
              images={galleryImages}
              title={galeria.titulo}
              description={galeria.descricao ?? undefined}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <ImageIcon className="h-16 w-16 mb-4" />
              <p className="text-lg">Nenhuma foto cadastrada nesta galeria ainda.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Explore Outras Galerias
          </h2>
          <Link href="/galerias">
            <Button size="lg">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Ver Todas as Galerias
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
