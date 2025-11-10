'use client'

import { useState } from 'react'
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
}

export default function PhotoGallery({ className = '' }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      setSelectedPhoto(selectedPhoto > 0 ? selectedPhoto - 1 : ACERVO_PHOTOS.length - 1)
    } else {
      setSelectedPhoto(selectedPhoto < ACERVO_PHOTOS.length - 1 ? selectedPhoto + 1 : 0)
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* AIDEV-NOTE: Informações da galeria */}
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Fotografias do Acervo</h3>
        <p className="text-muted-foreground mb-4">
          Coleção de {ACERVO_PHOTOS.length} fotografias históricas do Museu Casa Borges
        </p>
        <Badge className="bg-blue-100 text-blue-800">
          {ACERVO_PHOTOS.length} fotografias disponíveis
        </Badge>
      </div>

      {/* AIDEV-NOTE: Grid de fotos com animações */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ACERVO_PHOTOS.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group cursor-pointer"
            onClick={() => openModal(index)}
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

      {/* AIDEV-NOTE: Modal para visualização ampliada */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center justify-between">
              <span>
                {selectedPhoto !== null ? ACERVO_PHOTOS[selectedPhoto].title : ''}
              </span>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {selectedPhoto !== null ? selectedPhoto + 1 : 0} de {ACERVO_PHOTOS.length}
                </Badge>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="relative flex items-center justify-center p-6 pt-0">
            {/* AIDEV-NOTE: Botão anterior */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white"
              onClick={() => navigatePhoto('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* AIDEV-NOTE: Imagem principal */}
            {selectedPhoto !== null && (
              <div className="relative max-w-full max-h-[60vh] mx-12">
                <Image
                  src={ACERVO_PHOTOS[selectedPhoto].src}
                  alt={ACERVO_PHOTOS[selectedPhoto].alt}
                  width={800}
                  height={600}
                  className="object-contain w-full h-full rounded-lg"
                />
              </div>
            )}

            {/* AIDEV-NOTE: Botão próximo */}
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white"
              onClick={() => navigatePhoto('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* AIDEV-NOTE: Informações da foto */}
          {selectedPhoto !== null && (
            <div className="p-6 pt-0 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold mb-1">
                    {ACERVO_PHOTOS[selectedPhoto].title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {ACERVO_PHOTOS[selectedPhoto].description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Heart className="h-4 w-4 mr-1" />
                    Favoritar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}