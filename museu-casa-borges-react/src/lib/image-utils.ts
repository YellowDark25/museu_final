// AIDEV-NOTE: Utilitários para otimização de imagens e performance

/**
 * Gera um placeholder blur base64 para imagens
 * @param width - Largura do placeholder
 * @param height - Altura do placeholder
 * @param color - Cor base do placeholder (opcional)
 * @returns String base64 do placeholder
 */
export function generateBlurDataURL(
  width: number = 10,
  height: number = 10,
  color: string = '#f3f4f6'
): string {
  // AIDEV-NOTE: Criar canvas para gerar placeholder
  if (typeof window === 'undefined') {
    // Fallback para SSR
    return `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${color}"/></svg>`
    ).toString('base64')}`
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Gradiente suave para melhor aparência
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, adjustBrightness(color, -10))
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }

  return canvas.toDataURL('image/jpeg', 0.1)
}

/**
 * Ajusta o brilho de uma cor hexadecimal
 * @param hex - Cor em formato hexadecimal
 * @param percent - Porcentagem de ajuste (-100 a 100)
 * @returns Cor ajustada em hexadecimal
 */
function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt

  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
}

/**
 * Gera sizes responsivos baseado no layout
 * @param layout - Tipo de layout da imagem
 * @returns String de sizes para o componente Image
 */
export function getResponsiveSizes(layout: 'hero' | 'gallery' | 'thumbnail' | 'full' | 'card'): string {
  const sizeMap = {
    hero: '100vw',
    gallery: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    thumbnail: '(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px',
    full: '100vw',
    card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px'
  }

  return sizeMap[layout] || sizeMap.gallery
}

/**
 * Determina se uma imagem deve ter priority baseado na posição
 * @param index - Índice da imagem na lista
 * @param isAboveFold - Se a imagem está acima da dobra
 * @param isHero - Se é uma imagem hero
 * @returns Boolean indicando se deve ter priority
 */
export function shouldHavePriority(
  index: number = 0,
  isAboveFold: boolean = false,
  isHero: boolean = false
): boolean {
  // AIDEV-NOTE: Imagens hero sempre têm priority
  if (isHero) return true
  
  // AIDEV-NOTE: Primeiras 2 imagens acima da dobra têm priority
  if (isAboveFold && index < 2) return true
  
  return false
}

/**
 * Otimiza parâmetros de qualidade baseado no tipo de imagem
 * @param type - Tipo da imagem
 * @param isRetina - Se é uma tela de alta densidade
 * @returns Qualidade otimizada (0-100)
 */
export function getOptimalQuality(
  type: 'photo' | 'illustration' | 'icon' | 'thumbnail',
  isRetina: boolean = false
): number {
  const qualityMap = {
    photo: isRetina ? 85 : 80,
    illustration: isRetina ? 90 : 85,
    icon: 95,
    thumbnail: 75
  }

  return qualityMap[type] || 80
}

/**
 * Gera srcSet para imagens responsivas
 * @param baseSrc - URL base da imagem
 * @param widths - Array de larguras desejadas
 * @returns String de srcSet
 */
export function generateSrcSet(baseSrc: string, widths: number[] = [640, 828, 1200, 1920]): string {
  // AIDEV-NOTE: Para Next.js, o srcSet é gerado automaticamente
  // Esta função é útil para casos especiais ou imagens externas
  return widths
    .map(width => `${baseSrc}?w=${width} ${width}w`)
    .join(', ')
}

/**
 * Detecta se o navegador suporta WebP
 * @returns Promise<boolean> indicando suporte ao WebP
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false)
      return
    }

    const webP = new Image()
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2)
    }
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  })
}

/**
 * Calcula o aspect ratio de uma imagem
 * @param width - Largura da imagem
 * @param height - Altura da imagem
 * @returns String do aspect ratio para CSS
 */
export function getAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
  const divisor = gcd(width, height)
  return `${width / divisor} / ${height / divisor}`
}

/**
 * Configurações padrão para diferentes tipos de imagem
 */
export const imageDefaults = {
  hero: {
    quality: 85,
    priority: true,
    sizes: getResponsiveSizes('hero'),
    placeholder: 'blur' as const
  },
  gallery: {
    quality: 80,
    priority: false,
    sizes: getResponsiveSizes('gallery'),
    placeholder: 'blur' as const
  },
  thumbnail: {
    quality: 75,
    priority: false,
    sizes: getResponsiveSizes('thumbnail'),
    placeholder: 'blur' as const
  },
  card: {
    quality: 80,
    priority: false,
    sizes: getResponsiveSizes('card'),
    placeholder: 'blur' as const
  }
} as const

export type ImageType = keyof typeof imageDefaults