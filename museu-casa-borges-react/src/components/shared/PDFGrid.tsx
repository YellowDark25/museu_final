'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PDFCard } from './PDFCard'
import { PDFItem } from '@/hooks/usePDFData'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  Grid2X2, 
  List,
  SortAsc,
  SortDesc
} from 'lucide-react'

// AIDEV-NOTE: Interface para props do componente PDFGrid
interface PDFGridProps {
  pdfs: PDFItem[]
  title?: string
  showSearch?: boolean
  showFilters?: boolean
  showViewToggle?: boolean
  defaultView?: 'grid' | 'list'
  onPDFRead?: (pdf: PDFItem) => void
  onPDFDownload?: (pdf: PDFItem) => void
  className?: string
}

// AIDEV-NOTE: Tipos para ordenação
type SortOption = 'titulo' | 'autor' | 'ano' | 'visualizacoes' | 'rating'
type SortDirection = 'asc' | 'desc'

// AIDEV-NOTE: Componente de grid responsivo para exibir PDFs
export function PDFGrid({
  pdfs,
  title,
  showSearch = true,
  showFilters = true,
  showViewToggle = true,
  defaultView = 'grid',
  onPDFRead,
  onPDFDownload,
  className = ''
}: PDFGridProps) {
  
  // AIDEV-NOTE: Estados para filtros e busca
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('titulo')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(defaultView)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // AIDEV-NOTE: Função para filtrar PDFs baseado na busca
  const filteredPDFs = React.useMemo(() => {
    let filtered = pdfs

    // Filtro por termo de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(pdf =>
        pdf.titulo.toLowerCase().includes(term) ||
        pdf.autor.toLowerCase().includes(term) ||
        pdf.descricao?.toLowerCase().includes(term) ||
        pdf.tags?.some(tag => tag.toLowerCase().includes(term))
      )
    }

    // Filtro por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(pdf => pdf.categoria === selectedCategory)
    }

    // Ordenação
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy]
      let bValue: any = b[sortBy]

      // Tratamento especial para strings
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [pdfs, searchTerm, sortBy, sortDirection, selectedCategory])

  // AIDEV-NOTE: Obter categorias únicas para filtro
  const categories = React.useMemo(() => {
    const uniqueCategories = [...new Set(pdfs.map(pdf => pdf.categoria))]
    return uniqueCategories.sort()
  }, [pdfs])

  // AIDEV-NOTE: Função para alternar direção da ordenação
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
  }

  // AIDEV-NOTE: Variantes de animação para o grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* AIDEV-NOTE: Header com título e controles */}
      {(title || showSearch || showFilters || showViewToggle) && (
        <div className="space-y-4">
          {title && (
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          )}

          {/* AIDEV-NOTE: Barra de controles */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* AIDEV-NOTE: Busca */}
            {showSearch && (
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por título, autor ou tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}

            {/* AIDEV-NOTE: Controles de filtro e visualização */}
            <div className="flex items-center gap-2">
              {/* AIDEV-NOTE: Filtro por categoria */}
              {showFilters && categories.length > 1 && (
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* AIDEV-NOTE: Ordenação */}
              {showFilters && (
                <div className="flex items-center gap-1">
                  <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="titulo">Título</SelectItem>
                      <SelectItem value="autor">Autor</SelectItem>
                      <SelectItem value="ano">Ano</SelectItem>
                      <SelectItem value="visualizacoes">Visualizações</SelectItem>
                      <SelectItem value="rating">Avaliação</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSortDirection}
                    className="px-2"
                  >
                    {sortDirection === 'asc' ? (
                      <SortAsc className="w-4 h-4" />
                    ) : (
                      <SortDesc className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              )}

              {/* AIDEV-NOTE: Toggle de visualização */}
              {showViewToggle && (
                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="px-2"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="px-2"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AIDEV-NOTE: Contador de resultados */}
      <div className="text-sm text-gray-600">
        {filteredPDFs.length} {filteredPDFs.length === 1 ? 'documento' : 'documentos'} encontrado{filteredPDFs.length === 1 ? '' : 's'}
      </div>

      {/* AIDEV-NOTE: Grid de PDFs */}
      <AnimatePresence mode="wait">
        {filteredPDFs.length > 0 ? (
          <motion.div
            key={`${viewMode}-${searchTerm}-${selectedCategory}-${sortBy}-${sortDirection}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {filteredPDFs.map((pdf) => (
              <motion.div
                key={pdf.id}
                variants={itemVariants}
                layout
              >
                <PDFCard
                  pdf={pdf}
                  onRead={onPDFRead}
                  onDownload={onPDFDownload}
                  className={viewMode === 'list' ? 'max-w-none' : ''}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-500 text-lg mb-2">
              Nenhum documento encontrado
            </div>
            <div className="text-gray-400 text-sm">
              Tente ajustar os filtros ou termo de busca
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}