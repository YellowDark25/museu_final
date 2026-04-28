'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Eye, Calendar } from 'lucide-react'
import type { PublicAcervoPhotoDTO } from '@/features/acervo/dto/public-acervo.dto'

interface PhotoGalleryProps {
  photos: PublicAcervoPhotoDTO[]
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
export default function PhotoGallery({ photos, className = '', pageSize = 10, query }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Aplica filtros vindos da barra de busca
  let filteredPhotos = photos
  // Filtro por palavra‑chave (title/description/alt)
  if (query?.keyword && query.keyword.trim() !== '') {
    const kw = query.keyword.trim().toLowerCase()
    filteredPhotos = photos.filter((p) =>
      [p.title, p.description, p.alt].some((t) => t?.toLowerCase().includes(kw))
    )
  }
  if (query?.period && query.period !== 'qualquer') {
    filteredPhotos = filteredPhotos.filter((photo) => {
      if (!photo.date) {
        return query.period === 'qualquer'
      }

      const year = new Date(photo.date).getFullYear()
      if (query.period === 'antigo') return year < 1950
      if (query.period === 'moderno') return year >= 1950 && year < 2000
      if (query.period === 'recente') return year >= 2000
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
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Fotografias do Acervo</h3>
        <p className="text-muted-foreground mb-4">
          Coleção de {filteredPhotos.length} fotografias históricas do Museu Casa Borges
        </p>
      </div>

      {filteredPhotos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
          <h3 className="text-lg font-medium text-gray-900">Nenhuma fotografia disponível</h3>
          <p className="mt-2 text-sm text-gray-500">
            Ajuste os filtros ou publique novas fotografias no painel administrativo.
          </p>
        </div>
      ) : (
        <>
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
        </>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 flex flex-col bg-black/95 border-none text-white overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedPhoto !== null ? filteredPhotos[selectedPhoto].title : 'Visualização de foto'}
          </DialogTitle>

          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
             <Badge variant="secondary" className="bg-black/50 text-white border-white/20 hover:bg-black/70">
                {selectedPhoto !== null ? selectedPhoto + 1 : 0} / {filteredPhotos.length}
             </Badge>
          </div>

          <div className="relative flex-1 flex items-center justify-center w-full h-full bg-black/50 group">
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
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
