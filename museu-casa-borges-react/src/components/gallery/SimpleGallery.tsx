'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import Image from 'next/image'

// AIDEV-NOTE: Interface simplificada para imagens básicas
export interface SimpleImage {
  id: string
  src: string
  alt: string
  title?: string
}

// AIDEV-NOTE: Props do componente de galeria simples
interface SimpleGalleryProps {
  images: SimpleImage[]
  columns?: 2 | 3 | 4
  className?: string
}

// AIDEV-NOTE: Componente de galeria simples para uso básico
export default function SimpleGallery({
  images,
  columns = 3,
  className = ''
}: SimpleGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<SimpleImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // AIDEV-NOTE: Navegação entre imagens no modal
  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + images.length) % images.length
      : (currentIndex + 1) % images.length
    
    setCurrentIndex(newIndex)
    setSelectedImage(images[newIndex])
  }

  // AIDEV-NOTE: Abrir modal com imagem selecionada
  const openModal = (image: SimpleImage, index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  // AIDEV-NOTE: Configuração de colunas responsivas
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <div className={`w-full ${className}`}>
      {/* AIDEV-NOTE: Grid simples de imagens */}
      <div className={`grid gap-4 ${gridCols[columns]}`}>
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="group cursor-pointer"
            onClick={() => openModal(image, index)}
          >
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* AIDEV-NOTE: Overlay com ícone de zoom */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ZoomIn className="h-8 w-8 text-white" />
                </motion.div>
              </div>

              {/* AIDEV-NOTE: Título da imagem */}
              {image.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-sm font-medium">{image.title}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* AIDEV-NOTE: Modal de visualização simples */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-6xl w-full h-[80vh] p-0">
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              {/* AIDEV-NOTE: Imagem principal */}
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* AIDEV-NOTE: Navegação anterior */}
              {images.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={() => navigateImage('prev')}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
              )}

              {/* AIDEV-NOTE: Navegação próxima */}
              {images.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={() => navigateImage('next')}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              )}

              {/* AIDEV-NOTE: Botão fechar */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-5 w-5" />
              </Button>

              {/* AIDEV-NOTE: Título no modal */}
              {selectedImage.title && (
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <h3 className="text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded">
                    {selectedImage.title}
                  </h3>
                </div>
              )}

              {/* AIDEV-NOTE: Contador de imagens */}
              {images.length > 1 && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded text-sm">
                  {currentIndex + 1} de {images.length}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}