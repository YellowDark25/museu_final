'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ZoomIn, 
  Download, 
  Share2,
  Grid3X3,
  List,
  Search
} from 'lucide-react'
import Image from 'next/image'

// AIDEV-NOTE: Interface para definir a estrutura de uma imagem na galeria
export interface GalleryImage {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
  category?: string
  date?: string
  photographer?: string
  tags?: string[]
}

// AIDEV-NOTE: Props do componente de galeria com configurações flexíveis
interface ImageGalleryProps {
  images: GalleryImage[]
  title?: string
  description?: string
  columns?: 2 | 3 | 4 | 5
  showPagination?: boolean
  itemsPerPage?: number
  showFilters?: boolean
  showSearch?: boolean
  className?: string
}

// AIDEV-NOTE: Componente principal de galeria com funcionalidades avançadas
export default function ImageGallery({
  images,
  title,
  description,
  columns = 3,
  showPagination = true,
  itemsPerPage = 12,
  showFilters = true,
  showSearch = true,
  className = ''
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)

  // AIDEV-NOTE: Filtrar imagens baseado na busca e categoria selecionada
  const filteredImages = images.filter(image => {
    const matchesSearch = image.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  // AIDEV-NOTE: Calcular paginação
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedImages = filteredImages.slice(startIndex, startIndex + itemsPerPage)

  // AIDEV-NOTE: Obter categorias únicas para filtros
  const categories = ['all', ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))]

  // AIDEV-NOTE: Navegação no modal com teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return
      
      if (e.key === 'ArrowLeft') {
        navigateImage('prev')
      } else if (e.key === 'ArrowRight') {
        navigateImage('next')
      } else if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, currentIndex])

  // AIDEV-NOTE: Função para navegar entre imagens no modal
  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentIndex + 1) % filteredImages.length
    
    setCurrentIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  // AIDEV-NOTE: Abrir modal com imagem selecionada
  const openModal = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  // AIDEV-NOTE: Função para compartilhar imagem
  const shareImage = async (image: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title || 'Imagem do Museu Casa Borges',
          text: image.description || 'Confira esta imagem do acervo',
          url: window.location.href
        })
      } catch (error) {
        console.log('Erro ao compartilhar:', error)
      }
    } else {
      // Fallback para navegadores que não suportam Web Share API
      navigator.clipboard.writeText(window.location.href)
    }
  }

  // AIDEV-NOTE: Configuração de colunas responsivas
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
  }

  return (
    <div className={`w-full ${className}`}>
      {/* AIDEV-NOTE: Cabeçalho da galeria com título e descrição */}
      {(title || description) && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          {title && (
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          )}
          {description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{description}</p>
          )}
        </motion.div>
      )}

      {/* AIDEV-NOTE: Controles de busca e filtros */}
      {(showSearch || showFilters) && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* AIDEV-NOTE: Barra de busca */}
            {showSearch && (
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar imagens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            )}

            {/* AIDEV-NOTE: Controles de visualização e filtros */}
            <div className="flex items-center gap-4">
              {/* AIDEV-NOTE: Filtro por categoria */}
              {showFilters && categories.length > 1 && (
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Todas as categorias' : category}
                    </option>
                  ))}
                </select>
              )}

              {/* AIDEV-NOTE: Alternador de modo de visualização */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* AIDEV-NOTE: Estatísticas da galeria */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Mostrando {paginatedImages.length} de {filteredImages.length} imagens
            </span>
            {searchTerm && (
              <Badge variant="secondary">
                Busca: "{searchTerm}"
              </Badge>
            )}
          </div>
        </motion.div>
      )}

      {/* AIDEV-NOTE: Grid de imagens */}
      <motion.div 
        layout
        className={`grid gap-6 ${gridCols[columns]}`}
      >
        <AnimatePresence>
          {paginatedImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => openModal(image, startIndex + index)}
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* AIDEV-NOTE: Overlay com informações */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <ZoomIn className="h-8 w-8 text-white" />
                      </motion.div>
                    </div>

                    {/* AIDEV-NOTE: Badge de categoria */}
                    {image.category && (
                      <Badge 
                        variant="secondary" 
                        className="absolute top-2 left-2 bg-white/90 text-gray-800"
                      >
                        {image.category}
                      </Badge>
                    )}
                  </div>

                  {/* AIDEV-NOTE: Informações da imagem */}
                  {(image.title || image.description) && (
                    <div className="p-4">
                      {image.title && (
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                          {image.title}
                        </h3>
                      )}
                      {image.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {image.description}
                        </p>
                      )}
                      {image.date && (
                        <p className="text-xs text-gray-500 mt-2">
                          {image.date}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* AIDEV-NOTE: Paginação */}
      {showPagination && totalPages > 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex justify-center items-center gap-2"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={page === currentPage ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Próximo
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      )}

      {/* AIDEV-NOTE: Modal de visualização de imagem */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
          <DialogHeader className="absolute top-4 left-4 z-10">
            <DialogTitle className="text-white bg-black/50 px-3 py-1 rounded">
              {selectedImage?.title || 'Imagem'}
            </DialogTitle>
          </DialogHeader>

          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              {/* AIDEV-NOTE: Imagem principal no modal */}
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* AIDEV-NOTE: Controles de navegação */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                onClick={() => navigateImage('next')}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              {/* AIDEV-NOTE: Controles superiores */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => shareImage(selectedImage)}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* AIDEV-NOTE: Informações da imagem */}
              {(selectedImage.description || selectedImage.photographer || selectedImage.date) && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded">
                  {selectedImage.description && (
                    <p className="mb-2">{selectedImage.description}</p>
                  )}
                  <div className="flex justify-between text-sm text-gray-300">
                    {selectedImage.photographer && (
                      <span>Foto: {selectedImage.photographer}</span>
                    )}
                    {selectedImage.date && (
                      <span>{selectedImage.date}</span>
                    )}
                  </div>
                </div>
              )}

              {/* AIDEV-NOTE: Indicador de posição */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded text-sm">
                {currentIndex + 1} de {filteredImages.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}