import { Calendar, Image as ImageIcon, ArrowRight, Camera, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { listGaleriasPublicas } from '@/features/galerias/server/public-galerias.service'
import type { GaleriaAlbumDTO } from '@/features/galerias/dto/galerias.dto'
import { AgendarVisitaButton } from '@/components/visitas/AgendarVisitaButton'

export const dynamic = 'force-dynamic'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function GaleriasPage() {
  let galerias: GaleriaAlbumDTO[] = []
  try {
    galerias = await listGaleriasPublicas()
  } catch {
    galerias = []
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/fundo1.jpg"
            alt="Galeria do Museu"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Galerias Fotográficas
          </h1>
          <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-200">
            Registros visuais da vida cultural e educativa do museu
          </p>
        </div>
      </section>

      {/* Grid de álbuns */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Galerias em Destaque
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Explore nossos registros fotográficos mais recentes e significativos
            </p>
          </div>

          {galerias.length === 0 ? (
            <p className="text-center text-gray-500 py-12">Nenhuma galeria disponível no momento.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {galerias.map((galeria) => (
                <div key={galeria.id} className="group">
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {galeria.capaUrl ? (
                        <Image
                          src={galeria.capaUrl}
                          alt={galeria.titulo}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                          <Camera className="h-12 w-12 text-slate-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      {galeria.categoria && (
                        <Badge variant="secondary" className="absolute top-4 left-4 bg-white/90 text-gray-800">
                          {galeria.categoria}
                        </Badge>
                      )}

                      <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        <ImageIcon className="h-4 w-4 inline mr-1" />
                        {galeria.totalFotos ?? 0}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-lg font-bold mb-1 line-clamp-2">
                          {galeria.titulo}
                        </h3>
                        {galeria.dataEvento && (
                          <div className="flex items-center text-sm text-gray-200">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(galeria.dataEvento)}
                          </div>
                        )}
                      </div>
                    </div>

                    <CardContent className="p-4 sm:p-6">
                      {galeria.descricao && (
                        <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 text-sm sm:text-base">{galeria.descricao}</p>
                      )}
                      <Link href={`/galerias/${galeria.slug}`}>
                        <Button className="w-full group">
                          Ver Galeria
                          <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Seção informativa */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                Documentando Nossa História
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                Nossas galerias fotográficas capturam momentos especiais da vida do museu,
                desde oficinas educativas até visitas de grupos e eventos culturais.
                Cada imagem conta uma história e preserva a memória de nossas atividades.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3">
                    <Camera className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Registro Profissional</h3>
                    <p className="text-gray-600">Documentação de alta qualidade de todos os eventos</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Memória Coletiva</h3>
                    <p className="text-gray-600">Preservação da história e das experiências compartilhadas</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/fundo2.jpg"
                alt="Atividades do museu"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Participe de Nossos Eventos
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Venha fazer parte da nossa história! Participe de nossas oficinas,
              eventos e atividades culturais e apareça em nossas próximas galerias.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/eventos">
                <Button size="lg" className="w-full sm:w-auto">
                  <Calendar className="h-5 w-5 mr-2" />
                  Ver Próximos Eventos
                </Button>
              </Link>
              <AgendarVisitaButton
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                label="Entre em Contato"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
