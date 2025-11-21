// AIDEV-NOTE: Hook personalizado para gerenciar dados dos PDFs por categoria
// Estende o useBibliotecaData existente com funcionalidades específicas para PDFs
import { useMemo, useCallback } from 'react';
import { useBibliotecaData } from './useBibliotecaData';
import type { BibliotecaCategory, BibliotecaData } from './useBibliotecaData';

// Tipos específicos para PDFs
export interface PDFItem extends BibliotecaData {
  /** URL completa do arquivo PDF */
  pdfUrl: string;
  /** Se o PDF está disponível para visualização */
  isAvailable: boolean;
  /** Tamanho do arquivo em bytes (se disponível) */
  fileSize?: number;
  /** Data de última modificação */
  lastModified?: Date;
}

export interface PDFDataHookReturn {
  /** Dados filtrados dos PDFs */
  pdfData: PDFItem[];
  /** Dados agrupados por categoria */
  dataByCategory: Record<BibliotecaCategory, PDFItem[]>;
  /** Função para buscar PDF por ID */
  getPDFById: (id: string) => PDFItem | undefined;
  /** Função para abrir PDF em nova aba */
  openPDF: (item: PDFItem) => void;
  /** Função para fazer download do PDF */
  downloadPDF: (item: PDFItem) => void;
  /** Estados do hook original */
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: BibliotecaCategory | 'todos';
  setSelectedCategory: (category: BibliotecaCategory | 'todos') => void;
  isLoading: boolean;
  totalItems: number;
}

/**
 * Hook personalizado para gerenciar dados dos PDFs
 * Estende o useBibliotecaData com funcionalidades específicas para PDFs
 */
export function usePDFData(): PDFDataHookReturn {
  // Usar o hook existente como base
  const bibliotecaData = useBibliotecaData();

  // Função para determinar categoria do item baseado no arquivo
  const getCategoryFromItem = useCallback((item: BibliotecaData): BibliotecaCategory | null => {
    const filePath = item.arquivo.toLowerCase();
    
    if (filePath.includes('/publicações/') || filePath.includes('/publicacoes/')) {
      return 'publicacoes';
    }
    if (filePath.includes('/artigos/')) {
      return 'artigos';
    }
    if (filePath.includes('/tcc/')) {
      return 'tcc';
    }
    if (filePath.includes('/pesquisas/')) {
      return 'pesquisas';
    }
    
    return null;
  }, []);

  // Converter dados para formato PDF com URLs completas
  const pdfData = useMemo(() => {
    return bibliotecaData.data.map((item): PDFItem => {
      // AIDEV: Garantir que a URL esteja devidamente codificada para lidar com espaços e acentos
      const encodedUrl = encodeURI(item.arquivo);
      return {
        ...item,
        pdfUrl: encodedUrl, // Caminho da Public/ com encoding seguro
        isAvailable: true, // Assumir que todos estão disponíveis
        // Adicionar propriedades específicas de PDF se necessário
      };
    });
  }, [bibliotecaData.data]);

  // Agrupar dados por categoria
  const dataByCategory = useMemo(() => {
    const grouped: Record<BibliotecaCategory, PDFItem[]> = {
      publicacoes: [],
      artigos: [],
      tcc: [],
      pesquisas: [],
    };

    pdfData.forEach((item) => {
      const category = getCategoryFromItem(item);
      if (category && grouped[category]) {
        grouped[category].push(item);
      }
    });

    return grouped;
  }, [pdfData, getCategoryFromItem]);

  // Função para buscar PDF por ID
  const getPDFById = useCallback((id: string): PDFItem | undefined => {
    return pdfData.find(item => item.id === id);
  }, [pdfData]);

  // Função para abrir PDF em nova aba
  const openPDF = useCallback((item: PDFItem) => {
    // AIDEV-NOTE: Abre o PDF em nova aba para leitura
    // Usa window.open para garantir que abre em nova aba
    const pdfUrl = item.pdfUrl;
    
    try {
      const newWindow = window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      
      if (!newWindow) {
        // Fallback se popup foi bloqueado
        console.warn('Popup bloqueado, tentando download direto');
        downloadPDF(item);
      } else {
        // Focar na nova aba
        newWindow.focus();
      }
    } catch (error) {
      console.error('Erro ao abrir PDF:', error);
      // Fallback para download
      downloadPDF(item);
    }
  }, []);

  // Função para fazer download do PDF
  const downloadPDF = useCallback((item: PDFItem) => {
    // AIDEV-NOTE: Força o download do PDF
    try {
      const link = document.createElement('a');
      link.href = item.pdfUrl;
      link.download = `${item.titulo}.pdf`;
      link.target = '_blank';
      
      // Adicionar ao DOM temporariamente
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao fazer download do PDF:', error);
      // Fallback: abrir em nova aba
      window.open(item.pdfUrl, '_blank');
    }
  }, []);

  return {
    pdfData,
    dataByCategory,
    getPDFById,
    openPDF,
    downloadPDF,
    searchTerm: bibliotecaData.searchTerm,
    setSearchTerm: bibliotecaData.setSearchTerm,
    selectedCategory: bibliotecaData.selectedCategory,
    setSelectedCategory: bibliotecaData.setSelectedCategory,
    isLoading: bibliotecaData.isLoading,
    totalItems: pdfData.length,
  };
}

// Hook específico para uma categoria
export function usePDFDataByCategory(category: BibliotecaCategory) {
  const { dataByCategory, ...rest } = usePDFData();
  
  return {
    pdfData: dataByCategory?.[category] || [],
    ...rest,
  };
}

// Utilitários para trabalhar com PDFs
export const PDFUtils = {
  /**
   * Formata o tamanho do arquivo em formato legível
   */
  formatFileSize: (bytes?: number): string => {
    if (!bytes) return 'Tamanho desconhecido';
    
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  },

  /**
   * Verifica se um arquivo é PDF baseado na extensão
   */
  isPDFFile: (filename: string): boolean => {
    return filename.toLowerCase().endsWith('.pdf');
  },

  /**
   * Extrai o nome do arquivo sem extensão
   */
  getFileNameWithoutExtension: (filename: string): string => {
    return filename.replace(/\.[^/.]+$/, '');
  },

  /**
   * Gera URL de preview para o PDF
   */
  getPreviewUrl: (pdfUrl: string): string => {
    // Para PDFs locais, retorna a URL direta
    return pdfUrl;
  },
} as const;