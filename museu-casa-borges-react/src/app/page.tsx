'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Calendar, MapPin, Users, BookOpen } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { AgendarVisitaButton } from '@/components/visitas/AgendarVisitaButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSEO } from '@/hooks/useSEO'
import { Badge } from '@/components/ui/badge'

/**
 * Hook de carrossel de imagens de fundo com troca automática.
 */
function useBackgroundCarousel(images: string[], intervalMs: number = 8000) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const intervalId = window.setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex + 1) % images.length)
    }, intervalMs)

    return () => window.clearInterval(intervalId)
  }, [images, intervalMs])

  return images[currentIndex] ?? images[0]
}

/**
 * AIDEV-NOTE: Página inicial do Museu Casa Borges
 * Hero section com banner animado, destaques e call-to-actions
 * Design responsivo com microinterações
 */
export default function Home() {
  // AIDEV-NOTE: SEO otimizado para a página inicial
  const { seoData } = useSEO({
    title: 'Início',
    description: 'Bem-vindo ao Museu Casa Borges. Explore nossa rica coleção de arte e história de Mato Grosso, exposições permanentes e eventos culturais.',
    keywords: ['museu', 'casa borges', 'mato grosso', 'cultura', 'história', 'exposições', 'cuiabá'],
    image: '/images/fundo1.jpg'
  })

  const backgroundImages = [
    '/images/fundo1.jpg',
    '/images/fundo2.jpg',
    '/images/fundo3.jpg',
    '/images/fundo4.jpg'
  ]

  const currentBackground = useBackgroundCarousel(backgroundImages, 8000)

  const highlights = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Acervo Digital',
      description: 'Explore nossa coleção de documentos, fotografias e objetos históricos',
      href: '/acervo',
      color: 'bg-blue-50 text-blue-600',
      tags: ['Documentos', 'Fotografias', 'Objetos']
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Exposições',
      description: 'Descubra nossas exposições permanentes e temporárias',
      href: '/exposicoes/virtuais',
      color: 'bg-green-50 text-green-600',
      tags: ['Permanentes', 'Temporárias', 'Curadoria']
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Visitas Guiadas',
      description: 'Agende sua visita e conheça a história de Herculano Borges',
      href: '/contato',
      color: 'bg-purple-50 text-purple-600',
      tags: ['Agendamento', 'Grupos', 'Guias']
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Localização',
      description: 'Encontre-nos no centro histórico de Cuiabá',
      href: '/contato',
      color: 'bg-red-50 text-red-600',
      tags: ['Centro Histórico', 'Mapa', 'Acessibilidade']
    }
  ]

  const discoverySections = [
    {
      id: 'exposicoes-acervo',
      title: 'Exposições e Acervo',
      subtitle: 'Conheça as exposições em cartaz e explore o acervo digital do museu.',
      ctaLabel: 'Ver exposições',
      ctaHref: '/exposicoes',
      items: highlights.slice(0, 2)
    }
  ]

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords.join(', ')} />
        <meta name="author" content={seoData.author} />
        
        {/* Open Graph */}
        <meta property="og:type" content={seoData.type} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.image} />
        <meta property="og:image:alt" content={seoData.imageAlt} />
        <meta property="og:url" content={seoData.canonical} />
        <meta property="og:site_name" content="Museu Casa Borges" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@museucasaborges" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.image} />
        <meta name="twitter:image:alt" content={seoData.imageAlt} />
        
        {/* Canonical */}
        <link rel="canonical" href={seoData.canonical} />
        
        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoData.structuredData)
          }}
        />
      </Head>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[var(--museu-red)] via-red-700 to-red-900 text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-left space-y-8"
            >
              <div>
                <div className="mb-6">
                  <h1 className="sr-only">Museu Casa Borges</h1>
                  <Image
                    src="/logo.png"
                    alt="Logo do Museu Casa Borges"
                    width={360}
                    height={160}
                    className="w-48 sm:w-64 md:w-72 lg:w-80 h-auto"
                    priority
                  />
                </div>
                <p className="max-w-xl text-base md:text-lg text-white/85">
                  Um espaço dedicado à preservação da memória, da arte e da cultura.
                  Explore exposições, acervos e experiências que contam a história do nosso território.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[var(--museu-red)] hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold group"
                >
                  <Link href="/acervo">
                    Explorar Acervo
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white text-[var(--museu-red)] hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold group"
                >
                  <Link href="/o-museu">
                    Sobre o Museu
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              className="relative h-full w-full"
            >
              <div className="relative h-[50vh] min-h-[320px] lg:min-h-[420px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black/20 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentBackground}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                  >
                    <Image
                      src={currentBackground}
                      alt="Vista do Museu Casa Borges"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Destaques Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="texto-titulo text-4xl md:text-5xl font-bold text-[var(--museu-red)] mb-4">
              Descubra Nossa História
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore as diferentes facetas do nosso museu e mergulhe na rica cultura de Mato Grosso
            </p>
          </motion.div>

          <div className="space-y-16">
            {discoverySections.map((section, sectionIndex) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
                className="border-t border-gray-200 pt-10"
              >
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                  <div className="text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 max-w-xl mt-2">
                      {section.subtitle}
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    className="self-start md:self-auto text-[var(--museu-red)] hover:underline font-semibold group"
                  >
                    <Link href={section.ctaHref}>
                      {section.ctaLabel}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {section.items.map((item) => (
                    <div key={item.title} className="group">
                      <Card className="h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 shadow-lg bg-white rounded-2xl overflow-hidden">
                        <div className="h-1 w-full bg-gradient-to-r from-[var(--museu-red)]/70 via-[var(--museu-red)] to-[var(--museu-red)]/70" />
                        <CardHeader className="pb-4">
                          <div className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            {item.icon}
                          </div>
                          <CardTitle className="text-xl font-semibold text-gray-800">
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-1">
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {item.tags?.map((tag) => (
                              <Badge key={tag} variant="outline" className="rounded-full text-xs px-3 py-1">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            asChild
                            variant="outline"
                            className="mt-auto self-start transition-all duration-300"
                          >
                            <Link href={item.href}>
                              Saiba Mais
                              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-8 md:py-10 bg-[var(--museu-red)] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Visite o Museu Casa Borges
            </h2>
            <p className="text-lg mb-4 max-w-2xl mx-auto opacity-90">
              Venha conhecer pessoalmente nossa coleção e mergulhar na história de Mato Grosso
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <AgendarVisitaButton
                size="lg"
                className="bg-white text-[var(--museu-red)] hover:bg-gray-100 border-white text-base px-6 py-3 rounded-full font-semibold"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section removida conforme solicitação */}
    </>
  )
}
