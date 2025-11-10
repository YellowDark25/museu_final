'use client'

import { usePathname } from 'next/navigation'

/**
 * AIDEV-NOTE: Hook personalizado para gerenciar SEO de forma consistente
 * Facilita a aplicação de metadados em todas as páginas do museu
 * Inclui configurações específicas para instituições culturais
 */

interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  imageAlt?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
  noindex?: boolean
  nofollow?: boolean
  canonical?: string
}

const defaultSEO = {
  siteName: 'Museu Casa Borges',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://museucasaborges.org.br',
  defaultTitle: 'Museu Casa Borges - Patrimônio Cultural de Mato Grosso',
  defaultDescription: 'Descubra a rica história e cultura de Mato Grosso no Museu Casa Borges. Exposições permanentes, acervo histórico, eventos culturais e muito mais.',
  defaultImage: '/images/og-default.jpg',
  defaultKeywords: [
    'museu',
    'casa borges',
    'mato grosso',
    'cultura',
    'história',
    'patrimônio',
    'exposições',
    'arte',
    'educação',
    'turismo cultural',
    'cuiabá',
    'centro-oeste'
  ],
  twitterHandle: '@museucasaborges',
  facebookPage: 'https://facebook.com/museucasaborges',
  instagramHandle: '@museucasaborges'
}

// Configurações específicas por página
const pageConfigs: Record<string, Partial<SEOConfig>> = {
  '/': {
    title: 'Início',
    description: 'Bem-vindo ao Museu Casa Borges. Explore nossa rica coleção de arte e história de Mato Grosso.',
    keywords: ['museu', 'casa borges', 'início', 'bem-vindo']
  },
  '/sobre': {
    title: 'Sobre o Museu',
    description: 'Conheça a história do Museu Casa Borges, nossa missão e importância para a preservação cultural de Mato Grosso.',
    keywords: ['sobre', 'história do museu', 'missão', 'preservação cultural']
  },
  '/acervo': {
    title: 'Acervo',
    description: 'Explore nosso rico acervo com peças históricas, obras de arte e documentos que contam a história de Mato Grosso.',
    keywords: ['acervo', 'coleção', 'obras de arte', 'peças históricas']
  },
  '/exposicoes': {
    title: 'Exposições',
    description: 'Descubra nossas exposições permanentes e temporárias com curadoria especializada.',
    keywords: ['exposições', 'mostras', 'curadoria', 'arte contemporânea']
  },
  '/eventos': {
    title: 'Eventos',
    description: 'Participe dos eventos culturais, palestras, workshops e atividades educativas do museu.',
    keywords: ['eventos', 'palestras', 'workshops', 'atividades educativas']
  },
  '/educativo': {
    title: 'Educativo',
    description: 'Programas educativos para escolas, famílias e grupos. Aprenda de forma interativa e divertida.',
    keywords: ['educativo', 'programas educacionais', 'escolas', 'aprendizado']
  },
  '/visita': {
    title: 'Planeje sua Visita',
    description: 'Informações sobre horários, ingressos, localização e dicas para aproveitar ao máximo sua visita.',
    keywords: ['visita', 'horários', 'ingressos', 'localização', 'dicas']
  },
  '/biblioteca': {
    title: 'Biblioteca',
    description: 'Acesse nossa biblioteca especializada em história e cultura de Mato Grosso.',
    keywords: ['biblioteca', 'pesquisa', 'livros', 'documentos históricos']
  },
  '/pesquisa': {
    title: 'Pesquisa',
    description: 'Centro de pesquisa em história e cultura regional. Recursos para pesquisadores e acadêmicos.',
    keywords: ['pesquisa', 'acadêmico', 'história regional', 'cultura']
  },
  '/galerias': {
    title: 'Galerias',
    description: 'Explore nossas galerias virtuais e físicas com exposições interativas.',
    keywords: ['galerias', 'exposições virtuais', 'interativo']
  },
  '/contato': {
    title: 'Contato',
    description: 'Entre em contato conosco. Endereço, telefone, e-mail e formulário de contato.',
    keywords: ['contato', 'endereço', 'telefone', 'email']
  },
  '/casa-balatipone': {
    title: 'Casa Balatipone',
    description: 'Conheça a histórica Casa Balatipone, parte importante do patrimônio arquitetônico de Mato Grosso.',
    keywords: ['casa balatipone', 'patrimônio arquitetônico', 'história']
  },
  '/casa-da-barra': {
    title: 'Casa da Barra',
    description: 'Descubra a Casa da Barra e sua importância na história cultural da região.',
    keywords: ['casa da barra', 'história cultural', 'patrimônio']
  },
  '/publicacoes': {
    title: 'Publicações',
    description: 'Acesse nossas publicações, catálogos, livros e materiais educativos.',
    keywords: ['publicações', 'catálogos', 'livros', 'materiais educativos']
  }
}

export function useSEO(customConfig?: SEOConfig) {
  const pathname = usePathname()
  
  // Obter configuração da página atual
  const pageConfig = pageConfigs[pathname] || {}
  
  // Mesclar configurações
  const config = {
    ...pageConfig,
    ...customConfig
  }

  // Construir título completo
  const fullTitle = config.title 
    ? `${config.title} | ${defaultSEO.siteName}`
    : defaultSEO.defaultTitle

  // URL canônica
  const canonicalUrl = config.canonical || `${defaultSEO.siteUrl}${pathname}`
  
  // Imagem para redes sociais
  const ogImage = config.image || defaultSEO.defaultImage
  const fullImageUrl = ogImage.startsWith('http') 
    ? ogImage 
    : `${defaultSEO.siteUrl}${ogImage}`

  // Keywords combinadas
  const allKeywords = [
    ...defaultSEO.defaultKeywords, 
    ...(config.keywords || [])
  ]
  
  // Descrição final
  const finalDescription = config.description || defaultSEO.defaultDescription

  // Schema.org estruturado baseado no tipo de página
  const generateStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "Museum",
      "name": defaultSEO.siteName,
      "description": finalDescription,
      "url": defaultSEO.siteUrl,
      "image": fullImageUrl,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rua Borges de Barros, 123",
        "addressLocality": "Cuiabá",
        "addressRegion": "MT",
        "postalCode": "78000-000",
        "addressCountry": "BR"
      },
      "telephone": "+55-65-3123-4567",
      "email": "contato@museucasaborges.org.br",
      "openingHours": [
        "Tu-Fr 09:00-17:00",
        "Sa-Su 10:00-16:00"
      ],
      "priceRange": "Gratuito",
      "sameAs": [
        defaultSEO.facebookPage,
        `https://instagram.com/${defaultSEO.instagramHandle.replace('@', '')}`
      ]
    }

    // Adicionar dados específicos por tipo de página
    if (pathname === '/eventos') {
      return {
        ...baseData,
        "@type": ["Museum", "EventVenue"],
        "events": {
          "@type": "Event",
          "name": "Eventos Culturais",
          "description": "Programação regular de eventos culturais e educativos"
        }
      }
    }

    if (pathname === '/exposicoes') {
      return {
        ...baseData,
        "@type": ["Museum", "ExhibitionEvent"],
        "exhibitions": {
          "@type": "ExhibitionEvent",
          "name": "Exposições Permanentes e Temporárias",
          "description": "Exposições curadas com foco na cultura de Mato Grosso"
        }
      }
    }

    return baseData
  }

  return {
    // Dados processados para uso
    seoData: {
      title: fullTitle,
      description: finalDescription,
      keywords: allKeywords,
      image: fullImageUrl,
      imageAlt: config.imageAlt || `${config.title || 'Página'} - ${defaultSEO.siteName}`,
      canonical: canonicalUrl,
      type: config.type || 'website',
      publishedTime: config.publishedTime,
      modifiedTime: config.modifiedTime,
      author: config.author || defaultSEO.siteName,
      section: config.section,
      tags: config.tags || [],
      noindex: config.noindex || false,
      nofollow: config.nofollow || false,
      structuredData: generateStructuredData()
    },
    
    // Configurações padrão
    defaultSEO,
    
    // Funções utilitárias
    generatePageTitle: (title: string) => `${title} | ${defaultSEO.siteName}`,
    generateImageUrl: (imagePath: string) => 
      imagePath.startsWith('http') ? imagePath : `${defaultSEO.siteUrl}${imagePath}`,
    generateCanonicalUrl: (path: string) => `${defaultSEO.siteUrl}${path}`,
    
    // Breadcrumbs para SEO
    generateBreadcrumbs: () => {
      const pathSegments = pathname.split('/').filter(Boolean)
      const breadcrumbs = [
        { name: 'Início', url: '/' }
      ]
      
      let currentPath = ''
      pathSegments.forEach(segment => {
        currentPath += `/${segment}`
        const pageConfig = pageConfigs[currentPath]
        breadcrumbs.push({
          name: pageConfig?.title || segment.charAt(0).toUpperCase() + segment.slice(1),
          url: currentPath
        })
      })
      
      return breadcrumbs
    }
  }
}

// Hook específico para artigos/posts
export function useArticleSEO(articleData: {
  title: string
  description: string
  publishedTime: string
  modifiedTime?: string
  author: string
  tags: string[]
  image?: string
}) {
  return useSEO({
    ...articleData,
    type: 'article',
    section: 'Artigos'
  })
}