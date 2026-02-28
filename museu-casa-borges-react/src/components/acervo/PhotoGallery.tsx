'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Download, Heart, Eye, Calendar } from 'lucide-react'

// AIDEV-NOTE: Lista de fotos extraídas do arquivo INDEX/acervo.html
const ACERVO_PHOTOS = [
  {
    src: '/acervo/fotos_acervo/acervo1.jpeg',
    alt: 'Acervo 1',
    title: 'Documento Histórico 1',
    description: 'Fotografia histórica do acervo do Museu Casa Borges'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (3).jpeg',
    alt: 'Acervo 2',
    title: 'Documento Histórico 2',
    description: 'Registro fotográfico de documento importante'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (4).jpeg',
    alt: 'Acervo 3',
    title: 'Documento Histórico 3',
    description: 'Fotografia de manuscrito histórico'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (5).jpeg',
    alt: 'Acervo 4',
    title: 'Documento Histórico 4',
    description: 'Registro fotográfico do acervo'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (6).jpeg',
    alt: 'Acervo 5',
    title: 'Documento Histórico 5',
    description: 'Fotografia de documento do museu'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (7).jpeg',
    alt: 'Acervo 6',
    title: 'Documento Histórico 6',
    description: 'Registro histórico em fotografia'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (8).jpeg',
    alt: 'Acervo 7',
    title: 'Documento Histórico 7',
    description: 'Fotografia de manuscrito do acervo'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (9).jpeg',
    alt: 'Acervo 8',
    title: 'Documento Histórico 8',
    description: 'Registro fotográfico histórico'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (11).jpeg',
    alt: 'Acervo 9',
    title: 'Documento Histórico 9',
    description: 'Fotografia de documento importante'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (12).jpeg',
    alt: 'Acervo 10',
    title: 'Documento Histórico 10',
    description: 'Registro do acervo em fotografia'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (13).jpeg',
    alt: 'Acervo 11',
    title: 'Documento Histórico 11',
    description: 'Fotografia histórica do museu'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (14).jpeg',
    alt: 'Acervo 12',
    title: 'Documento Histórico 12',
    description: 'Registro fotográfico de manuscrito'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (15).jpeg',
    alt: 'Acervo 13',
    title: 'Documento Histórico 13',
    description: 'Fotografia de documento do acervo'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (16).jpeg',
    alt: 'Acervo 14',
    title: 'Documento Histórico 14',
    description: 'Registro histórico em fotografia'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (17).jpeg',
    alt: 'Acervo 15',
    title: 'Documento Histórico 15',
    description: 'Fotografia de manuscrito histórico'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (18).jpeg',
    alt: 'Acervo 16',
    title: 'Documento Histórico 16',
    description: 'Registro fotográfico do museu'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (20).jpeg',
    alt: 'Acervo 17',
    title: 'Documento Histórico 17',
    description: 'Fotografia de documento importante'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (21).jpeg',
    alt: 'Acervo 18',
    title: 'Documento Histórico 18',
    description: 'Registro do acervo histórico'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (22).jpeg',
    alt: 'Acervo 19',
    title: 'Documento Histórico 19',
    description: 'Fotografia histórica do museu'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (23).jpeg',
    alt: 'Acervo 20',
    title: 'Documento Histórico 20',
    description: 'Registro fotográfico de manuscrito'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (24).jpeg',
    alt: 'Acervo 21',
    title: 'Documento Histórico 21',
    description: 'Fotografia de documento do acervo'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (25).jpeg',
    alt: 'Acervo 22',
    title: 'Documento Histórico 22',
    description: 'Registro histórico em fotografia'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (26).jpeg',
    alt: 'Acervo 23',
    title: 'Documento Histórico 23',
    description: 'Fotografia de manuscrito histórico'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (27).jpeg',
    alt: 'Acervo 24',
    title: 'Documento Histórico 24',
    description: 'Registro fotográfico do museu'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (29).jpeg',
    alt: 'Acervo 25',
    title: 'Documento Histórico 25',
    description: 'Fotografia de documento importante'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.11.27 (30).jpeg',
    alt: 'Acervo 26',
    title: 'Documento Histórico 26',
    description: 'Registro do acervo histórico'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.21.25 (1).jpeg',
    alt: 'Acervo 27',
    title: 'Documento Histórico 27',
    description: 'Fotografia histórica do museu'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.21.25 (2).jpeg',
    alt: 'Acervo 28',
    title: 'Documento Histórico 28',
    description: 'Registro fotográfico de manuscrito'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.21.25 (3).jpeg',
    alt: 'Acervo 29',
    title: 'Documento Histórico 29',
    description: 'Fotografia de documento do acervo'
  },
  {
    src: '/acervo/fotos_acervo/WhatsApp Image 2025-06-09 at 11.21.25 (4).jpeg',
    alt: 'Acervo 30',
    title: 'Documento Histórico 30',
    description: 'Registro histórico em fotografia'
  },
  {
    src: '/acervo/fotos_acervo/acervo1.jpeg',
    alt: 'Acervo Principal',
    title: 'Documento Principal do Acervo',
    description: 'Fotografia principal do acervo do Museu Casa Borges'
  }
]

interface PhotoGalleryProps {
  className?: string
  /** Quantidade de itens por página na grade (padrão: 10) */
  pageSize?: number
  /** Parâmetros de filtro da barra de busca */
  query?: {
    keyword?: string
    period?: 'qualquer' | 'antigo' | 'moderno' | 'recente'
  }
}

/**
 * PhotoGallery
 * Componente de galeria com paginação.
 * - Exibe até `pageSize` itens por página (default 10)
 * - Mantém navegação do modal em todo o conjunto de fotos
 */
/**
 * PhotoGallery
 * Galeria com paginação e suporte a filtros (keyword/period).
 * - A paginação opera sobre o resultado filtrado
 * - O modal navega dentro do conjunto filtrado
 */
export default function PhotoGallery({ className = '', pageSize = 10, query }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Aplica filtros vindos da barra de busca
  let filteredPhotos = ACERVO_PHOTOS
  // Filtro por palavra‑chave (title/description/alt)
  if (query?.keyword && query.keyword.trim() !== '') {
    const kw = query.keyword.trim().toLowerCase()
    filteredPhotos = ACERVO_PHOTOS.filter((p) =>
      [p.title, p.description, p.alt].some((t) => t?.toLowerCase().includes(kw))
    )
  }
  // Filtro por período – como não há metadados de data nas fotos,
  // utilizamos um agrupamento aproximado por terços do array original.
  if (query?.period && query.period !== 'qualquer') {
    const len = filteredPhotos.length
    const ancientCut = Math.floor(len / 3)
    const modernCut = Math.floor((2 * len) / 3)
    filteredPhotos = filteredPhotos.filter((_, idx) => {
      if (query.period === 'antigo') return idx < ancientCut
      if (query.period === 'moderno') return idx >= ancientCut && idx < modernCut
      if (query.period === 'recente') return idx >= modernCut
      return true
    })
  }

  // Cálculos de paginação sobre o resultado filtrado
  const totalPages = Math.ceil(filteredPhotos.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const visiblePhotos = filteredPhotos.slice(startIndex, endIndex)

  // Sempre que filtros mudarem, volta para a primeira página e fecha modal
  // para evitar índices inconsistentes.
  useEffect(() => {
    setCurrentPage(1)
    setSelectedPhoto(null)
    setIsModalOpen(false)
  }, [query, pageSize])
  

  // AIDEV-NOTE: Função para abrir modal com foto selecionada
  const openModal = (index: number) => {
    setSelectedPhoto(index)
    setIsModalOpen(true)
  }

  // AIDEV-NOTE: Função para fechar modal
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPhoto(null)
  }

  // AIDEV-NOTE: Navegação entre fotos no modal
  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (selectedPhoto === null) return
    
    if (direction === 'prev') {
      setSelectedPhoto(selectedPhoto > 0 ? selectedPhoto - 1 : filteredPhotos.length - 1)
    } else {
      setSelectedPhoto(selectedPhoto < filteredPhotos.length - 1 ? selectedPhoto + 1 : 0)
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* AIDEV-NOTE: Informações da galeria */}
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Fotografias do Acervo</h3>
        <p className="text-muted-foreground mb-4">
          Coleção de {filteredPhotos.length} fotografias históricas do Museu Casa Borges
        </p>
      </div>

      {/* AIDEV-NOTE: Grid de fotos com animações (paginada) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visiblePhotos.map((photo, index) => (
          <motion.div
            key={startIndex + index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group cursor-pointer"
            onClick={() => openModal(startIndex + index)}
          >
            <div className="relative aspect-square overflow-hidden rounded-lg border bg-white shadow-sm hover:shadow-lg transition-all duration-300">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium truncate">
                  {photo.title}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controles de paginação */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Button variant="outline" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
        </Button>
        <div className="flex flex-wrap items-center gap-1 justify-center">
          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1
            const active = p === currentPage
            return (
              <Button
                key={p}
                variant={active ? 'default' : 'outline'}
                onClick={() => setCurrentPage(p)}
                className={active ? '' : 'bg-white'}
              >
                {p}
              </Button>
            )
          })}
        </div>
        <Button variant="outline" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
          Próxima <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* AIDEV-NOTE: Modal para visualização ampliada */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 flex flex-col bg-black/95 border-none text-white overflow-hidden">
          {/* Título acessível para leitores de tela */}
          <DialogTitle className="sr-only">
            {selectedPhoto !== null ? filteredPhotos[selectedPhoto].title : 'Visualização de foto'}
          </DialogTitle>

          {/* Header minimalista com contador */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
             <Badge variant="secondary" className="bg-black/50 text-white border-white/20 hover:bg-black/70">
                {selectedPhoto !== null ? selectedPhoto + 1 : 0} / {filteredPhotos.length}
             </Badge>
          </div>

          {/* Área principal da imagem */}
          <div className="relative flex-1 flex items-center justify-center w-full h-full bg-black/50 group">
            {/* Botão anterior */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/10 h-12 w-12 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto('prev');
              }}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            {/* Imagem */}
            {selectedPhoto !== null && (
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <Image
                  src={filteredPhotos[selectedPhoto].src}
                  alt={filteredPhotos[selectedPhoto].alt}
                  fill
                  className="object-contain"
                  quality={90}
                  priority
                />
              </div>
            )}

            {/* Botão próximo */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/10 h-12 w-12 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto('next');
              }}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>

          {/* Footer com informações */}
          {selectedPhoto !== null && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pb-8 pt-12 z-10">
              <div className="container mx-auto max-w-5xl">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {filteredPhotos[selectedPhoto].title}
                    </h2>
                    <p className="text-gray-300 text-sm md:text-base max-w-2xl">
                      {filteredPhotos[selectedPhoto].description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0">
                    <Button size="sm" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-none">
                      <Heart className="h-4 w-4 mr-2" />
                      Favoritar
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white text-black hover:bg-gray-200 border-none">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar Original
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}