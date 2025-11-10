// AIDEV-NOTE: Configuração do react-pdf para renderização de PDFs
// Necessário para configurar o worker do pdfjs-dist
import { pdfjs } from 'react-pdf';

// Configuração do worker do PDF.js para Next.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// Configurações padrão para renderização
export const PDF_CONFIG = {
  // Configurações de qualidade da miniatura
  THUMBNAIL_SCALE: 0.5, // Escala para miniaturas (menor = mais rápido)
  THUMBNAIL_WIDTH: 200, // Largura padrão das miniaturas
  THUMBNAIL_HEIGHT: 280, // Altura padrão das miniaturas
  
  // Configurações de cache
  CACHE_SIZE: 50, // Número máximo de miniaturas em cache
  
  // Configurações de loading
  LOADING_TIMEOUT: 10000, // Timeout para carregamento em ms
} as const;

// Tipos para configuração
export type PDFConfigType = typeof PDF_CONFIG;