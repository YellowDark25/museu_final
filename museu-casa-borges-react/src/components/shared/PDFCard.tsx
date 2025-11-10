'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Eye, 
  Download, 
  ExternalLink, 
  Star,
  Calendar,
  User,
  FileText
} from 'lucide-react'
import { PDFThumbnail } from './PDFThumbnail'
import { PDFItem } from '@/hooks/usePDFData'

// AIDEV-NOTE: Interface para props do componente PDFCard
interface PDFCardProps {
  pdf: PDFItem
  onRead?: (pdf: PDFItem) => void
  onDownload?: (pdf: PDFItem) => void
  className?: string
}

// AIDEV-NOTE: Componente de card para exibir informações de PDF com miniatura
export function PDFCard({ 
  pdf, 
  onRead, 
  onDownload, 
  className = '' 
}: PDFCardProps) {
  
  // AIDEV-NOTE: Função para formatar número de visualizações
  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`
    }
    return views.toString()
  }

  // AIDEV-NOTE: Função para renderizar estrelas de rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  // AIDEV-NOTE: Função para lidar com clique no botão "Ler"
  const handleRead = () => {
    if (onRead) {
      onRead(pdf)
    } else {
      // Fallback: abrir PDF em nova aba
      window.open(pdf.fullUrl, '_blank')
    }
  }

  // AIDEV-NOTE: Função para lidar com clique no botão "Download"
  const handleDownload = () => {
    if (onDownload) {
      onDownload(pdf)
    } else {
      // Fallback: download direto
      const link = document.createElement('a')
      link.href = pdf.fullUrl
      link.download = pdf.titulo
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`group ${className}`}
    >
      <Card className="h-full overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
        {/* AIDEV-NOTE: Header com miniatura do PDF */}
        <CardHeader className="p-0 relative">
          <div className="aspect-[3/4] relative overflow-hidden rounded-t-2xl bg-gray-100">
            <PDFThumbnail
              url={pdf.fullUrl}
              className="w-full h-full object-cover"
            />
            
            {/* AIDEV-NOTE: Overlay com ações rápidas */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white text-gray-900"
                  onClick={handleRead}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white text-gray-900"
                  onClick={handleDownload}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* AIDEV-NOTE: Badge de categoria */}
            <div className="absolute top-3 left-3">
              <Badge 
                variant="secondary" 
                className="bg-white/90 text-gray-900 text-xs font-medium"
              >
                {pdf.categoria}
              </Badge>
            </div>

            {/* AIDEV-NOTE: Rating no canto superior direito */}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
              {renderStars(pdf.rating)}
            </div>
          </div>
        </CardHeader>

        {/* AIDEV-NOTE: Conteúdo do card com informações */}
        <CardContent className="p-4 space-y-3">
          {/* AIDEV-NOTE: Título do PDF */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight">
            {pdf.titulo}
          </h3>

          {/* AIDEV-NOTE: Informações do autor e ano */}
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span className="truncate">{pdf.autor}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{pdf.ano}</span>
            </div>
          </div>

          {/* AIDEV-NOTE: Descrição truncada */}
          {pdf.descricao && (
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
              {pdf.descricao}
            </p>
          )}

          {/* AIDEV-NOTE: Tags */}
          {pdf.tags && pdf.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {pdf.tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs px-2 py-0.5 text-gray-600 border-gray-300"
                >
                  {tag}
                </Badge>
              ))}
              {pdf.tags.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-0.5 text-gray-500 border-gray-300"
                >
                  +{pdf.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* AIDEV-NOTE: Footer com estatísticas e ações */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{formatViews(pdf.visualizacoes)}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                <span>PDF</span>
              </div>
            </div>

            {/* AIDEV-NOTE: Botões de ação */}
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-3 text-xs"
                onClick={handleRead}
              >
                Ler
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}