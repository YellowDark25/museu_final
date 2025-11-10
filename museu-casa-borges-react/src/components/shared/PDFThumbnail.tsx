'use client';

// AIDEV-NOTE: Componente para renderizar miniatura da primeira página de PDFs
// Utiliza react-pdf para renderização otimizada com cache e loading states
import React, { useState, useCallback } from 'react';
import { Document, Page } from 'react-pdf';
import { motion } from 'framer-motion';
import { FileText, AlertCircle, Loader2 } from 'lucide-react';
import { PDF_CONFIG } from '@/lib/pdf-config';

// Importar configuração do PDF
import '@/lib/pdf-config';

interface PDFThumbnailProps {
  /** Caminho para o arquivo PDF */
  filePath: string;
  /** Título do PDF para alt text */
  title: string;
  /** Classe CSS adicional */
  className?: string;
  /** Callback quando a miniatura é clicada */
  onClick?: () => void;
  /** Se deve mostrar overlay de hover */
  showHover?: boolean;
}

/**
 * Componente que renderiza a primeira página de um PDF como miniatura
 * Inclui estados de loading, erro e hover effects
 */
export function PDFThumbnail({ 
  filePath, 
  title, 
  className = '', 
  onClick,
  showHover = true 
}: PDFThumbnailProps) {
  // Estados para controle de loading e erro
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);

  // Callback para quando o documento é carregado com sucesso
  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setHasError(false);
  }, []);

  // Callback para quando há erro no carregamento
  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('Erro ao carregar PDF:', error);
    setHasError(true);
    setIsLoading(false);
  }, []);

  // Callback para quando a página é renderizada
  const onPageLoadSuccess = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Callback para erro na renderização da página
  const onPageLoadError = useCallback((error: Error) => {
    console.error('Erro ao renderizar página:', error);
    setHasError(true);
    setIsLoading(false);
  }, []);

  // Componente de loading
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg">
      <Loader2 className="w-8 h-8 text-gray-400 animate-spin mb-2" />
      <span className="text-sm text-gray-500">Carregando...</span>
    </div>
  );

  // Componente de erro
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center h-full bg-red-50 rounded-lg border border-red-200">
      <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
      <span className="text-sm text-red-600 text-center px-2">
        Erro ao carregar PDF
      </span>
      <FileText className="w-12 h-12 text-red-300 mt-2" />
    </div>
  );

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-lg border border-gray-200 bg-white
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        width: PDF_CONFIG.THUMBNAIL_WIDTH,
        height: PDF_CONFIG.THUMBNAIL_HEIGHT,
      }}
      onClick={onClick}
      whileHover={showHover && onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {/* Loading state inicial */}
      {isLoading && <LoadingState />}
      
      {/* Error state */}
      {hasError && <ErrorState />}
      
      {/* PDF Document */}
      {!hasError && (
        <Document
          file={filePath}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={<LoadingState />}
          error={<ErrorState />}
          className="w-full h-full"
        >
          <Page
            pageNumber={1}
            onLoadSuccess={onPageLoadSuccess}
            onLoadError={onPageLoadError}
            width={PDF_CONFIG.THUMBNAIL_WIDTH}
            scale={PDF_CONFIG.THUMBNAIL_SCALE}
            loading={<LoadingState />}
            error={<ErrorState />}
            className="w-full h-full"
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      )}
      
      {/* Hover overlay */}
      {showHover && onClick && (
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center"
          whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
          <motion.div
            className="opacity-0 hover:opacity-100 transition-opacity duration-200"
            whileHover={{ opacity: 1 }}
          >
            <FileText className="w-8 h-8 text-white drop-shadow-lg" />
          </motion.div>
        </motion.div>
      )}
      
      {/* Título como tooltip */}
      <div className="sr-only">{title}</div>
    </motion.div>
  );
}

// Componente de fallback para quando o PDF não pode ser carregado
export function PDFThumbnailFallback({ 
  title, 
  className = '', 
  onClick 
}: Omit<PDFThumbnailProps, 'filePath'>) {
  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50
        flex flex-col items-center justify-center
        ${onClick ? 'cursor-pointer hover:bg-gray-100' : ''}
        ${className}
      `}
      style={{
        width: PDF_CONFIG.THUMBNAIL_WIDTH,
        height: PDF_CONFIG.THUMBNAIL_HEIGHT,
      }}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
    >
      <FileText className="w-16 h-16 text-gray-400 mb-2" />
      <span className="text-sm text-gray-600 text-center px-2 leading-tight">
        {title}
      </span>
    </motion.div>
  );
}