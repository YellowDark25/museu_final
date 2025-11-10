// AIDEV-NOTE: Componente SEO otimizado para metadados e acessibilidade

import Head from 'next/head'

interface SEOHeadProps {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
  locale?: string
  alternateLocales?: string[]
  noindex?: boolean
  nofollow?: boolean
  canonical?: string
}

/**
 * Componente SEO otimizado com metadados completos
 * Implementa Open Graph, Twitter Cards, Schema.org e acessibilidade
 */
export default function SEOHead({
  title,
  description,
  keywords = [],
  image = '/images/og-default.jpg',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Museu Casa de Borges',
  section,
  tags = [],
  locale = 'pt_BR',
  alternateLocales = ['en_US'],
  noindex = false,
  nofollow = false,
  canonical
}: SEOHeadProps) {
  // AIDEV-NOTE: Configurações base do site
  const siteConfig = {
    siteName: 'Museu Casa de Borges',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://museucasaborges.com.br',
    twitterHandle: '@museucasaborges',
    facebookAppId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
    defaultImage: '/images/og-default.jpg'
  }

  // AIDEV-NOTE: URLs completas para metadados
  const fullUrl = url ? `${siteConfig.siteUrl}${url}` : siteConfig.siteUrl
  const fullImageUrl = image.startsWith('http') ? image : `${siteConfig.siteUrl}${image}`
  const canonicalUrl = canonical ? `${siteConfig.siteUrl}${canonical}` : fullUrl

  // AIDEV-NOTE: Título otimizado para SEO
  const fullTitle = title.includes(siteConfig.siteName) 
    ? title 
    : `${title} | ${siteConfig.siteName}`

  // AIDEV-NOTE: Keywords combinadas
  const allKeywords = [
    ...keywords,
    'Jorge Luis Borges',
    'museu',
    'literatura',
    'cultura',
    'Campo Grande',
    'Mato Grosso do Sul'
  ].join(', ')

  // AIDEV-NOTE: Schema.org JSON-LD
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebPage',
    name: title,
    description,
    url: fullUrl,
    image: fullImageUrl,
    author: {
      '@type': 'Organization',
      name: author,
      url: siteConfig.siteUrl
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.siteUrl}/images/logo1.jpg`
      }
    },
    ...(publishedTime && { datePublished: publishedTime }),
    ...(modifiedTime && { dateModified: modifiedTime }),
    ...(section && { articleSection: section }),
    ...(tags.length > 0 && { keywords: tags.join(', ') })
  }

  return (
    <Head>
      {/* AIDEV-NOTE: Meta tags básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />

      {/* AIDEV-NOTE: Robots meta */}
      <meta 
        name="robots" 
        content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} 
      />

      {/* AIDEV-NOTE: Viewport e acessibilidade */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content={locale.replace('_', '-')} />

      {/* AIDEV-NOTE: Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:locale" content={locale} />
      
      {alternateLocales.map(altLocale => (
        <meta key={altLocale} property="og:locale:alternate" content={altLocale} />
      ))}

      {/* AIDEV-NOTE: Open Graph específico para artigos */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* AIDEV-NOTE: Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />
      <meta name="twitter:creator" content={siteConfig.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {/* AIDEV-NOTE: Facebook App ID */}
      {siteConfig.facebookAppId && (
        <meta property="fb:app_id" content={siteConfig.facebookAppId} />
      )}

      {/* AIDEV-NOTE: Favicons e ícones */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#1f2937" />

      {/* AIDEV-NOTE: Preconnect para performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* AIDEV-NOTE: Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* AIDEV-NOTE: Hreflang para múltiplos idiomas */}
      <link rel="alternate" hrefLang="pt-BR" href={fullUrl} />
      <link rel="alternate" hrefLang="en" href={`${fullUrl}?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />
    </Head>
  )
}