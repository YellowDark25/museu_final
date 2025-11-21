// AIDEV-NOTE: Configuração do react-pdf para renderização de PDFs
// Necessário para configurar o worker do pdfjs-dist
import { pdfjs } from 'react-pdf';

// Configuração do worker do PDF.js para Next.js
// Observação:
// - A partir do pdfjs-dist v4, o worker é distribuído como módulo ESM (.mjs)
// - Evitar URLs com protocolo relativo (//), pois em ambiente http local pode tentar http e falhar
// - Usar CDN com HTTPS explícito e caminho .mjs para evitar o erro "Setting up fake worker failed"
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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