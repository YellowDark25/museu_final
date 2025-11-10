'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { useListLazyLoading } from '@/hooks/use-lazy-loading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ZoomIn, Grid, List, Search, Filter, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// AIDEV-NOTE: Interface para item da galeria
interface GalleryItem {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
  category?: string
  width?: number
  height?: number
}

// AIDEV-NOTE: Interface para propriedades da galeria otimizada
interface OptimizedGalleryProps {
  items: GalleryItem[]
  itemsPerBatch?: number
  showSearch?: boolean
  showFilters?: boolean
  showViewToggle?: boolean
  onItemClick?: (item: GalleryItem) => void
  className?: string
}

// AIDEV-NOTE: Componente de galeria otimizada com lazy loading progressivo
export function OptimizedGallery({
  items,
  itemsPerBatch = 12,
  showSearch = true,
  showFilters = true,
  showViewToggle = true,
  onItemClick,
  className,
}: OptimizedGalleryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // AIDEV-NOTE: Filtrar itens baseado na busca e categoria
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = !searchTerm || 
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [items, searchTerm, selectedCategory])

  // AIDEV-NOTE: Obter categorias únicas
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(items.map(item => item.category).filter(Boolean)))
    return ['all', ...uniqueCategories]
  }, [items])

  // AIDEV-NOTE: Hook de lazy loading para carregamento progressivo
  const { loadedItems, hasMore, isLoading, triggerRef } = useListLazyLoading(
    filteredItems,
    itemsPerBatch,
    { threshold: 0.5, rootMargin: '100px' }
  )

  return (
    <div className={cn('space-y-6', className)}>
      {/* AIDEV-NOTE: Controles da galeria */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* AIDEV-NOTE: Campo de busca */}
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

          {/* AIDEV-NOTE: Filtro por categoria */}
          {showFilters && categories.length > 1 && (
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Todas as categorias' : category}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* AIDEV-NOTE: Toggle de visualização */}
        {showViewToggle && (
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* AIDEV-NOTE: Contador de resultados */}
      <div className="text-sm text-gray-600">
        Mostrando {loadedItems.length} de {filteredItems.length} imagens
        {searchTerm && ` para "${searchTerm}"`}
      </div>

      {/* AIDEV-NOTE: Grid/Lista de imagens */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewMode}-${selectedCategory}-${searchTerm}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          )}
        >
          {loadedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={cn(
                'group cursor-pointer',
                viewMode === 'grid' 
                  ? 'bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300'
                  : 'flex gap-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4'
              )}
              onClick={() => onItemClick?.(item)}
            >
              {/* AIDEV-NOTE: Container da imagem */}
              <div className={cn(
                'relative overflow-hidden',
                viewMode === 'grid' 
                  ? 'aspect-square rounded-t-xl'
                  : 'w-24 h-24 rounded-lg flex-shrink-0'
              )}>
                <OptimizedImage
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes={viewMode === 'grid' 
                    ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    : "96px"
                  }
                />
                
                {/* AIDEV-NOTE: Overlay com ícone de zoom */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ZoomIn className="h-6 w-6 text-white" />
                  </motion.div>
                </div>

                {/* AIDEV-NOTE: Badge de categoria */}
                {item.category && viewMode === 'grid' && (
                  <Badge 
                    variant="secondary" 
                    className="absolute top-2 left-2 bg-white/90 text-gray-800 text-xs"
                  >
                    {item.category}
                  </Badge>
                )}
              </div>

              {/* AIDEV-NOTE: Informações do item */}
              {(item.title || item.description) && (
                <div className={cn(
                  viewMode === 'grid' ? 'p-4' : 'flex-1 min-w-0'
                )}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      {item.title && (
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                          {item.title}
                        </h3>
                      )}
                      {item.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {item.category && viewMode === 'list' && (
                      <Badge variant="secondary" className="text-xs flex-shrink-0">
                        {item.category}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* AIDEV-NOTE: Trigger para carregamento de mais itens */}
      {hasMore && (
        <div ref={triggerRef} className="flex justify-center py-8">
          {isLoading ? (
            <div className="flex items-center gap-2 text-gray-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Carregando mais imagens...</span>
            </div>
          ) : (
            <div className="h-4" />
          )}
        </div>
      )}

      {/* AIDEV-NOTE: Mensagem quando não há resultados */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhuma imagem encontrada
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros ou termo de busca
          </p>
        </div>
      )}
    </div>
  )
}

export default OptimizedGallery