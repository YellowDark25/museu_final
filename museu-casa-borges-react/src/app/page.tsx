'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, MapPin, Users, BookOpen } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { useSEO } from '@/hooks/useSEO'
import { Newsletter } from '@/components/newsletter/Newsletter'

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

  const highlights = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Acervo Digital',
      description: 'Explore nossa coleção de documentos, fotografias e objetos históricos',
      href: '/acervo',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Exposições',
      description: 'Descubra nossas exposições permanentes e temporárias',
      href: '/exposicoes',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Visitas Guiadas',
      description: 'Agende sua visita e conheça a história de Herculano Borges',
      href: '/contato',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Localização',
      description: 'Encontre-nos no centro histórico de Cuiabá',
      href: '/contato',
      color: 'bg-red-50 text-red-600'
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background com animação */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-[var(--museu-red)] via-red-700 to-red-900 opacity-90" />
          <motion.div
            className="absolute inset-0 bg-[url('/images/fundo1.jpg')] bg-cover bg-center"
            animate={{
              backgroundImage: [
                "url('/images/fundo1.jpg')",
                "url('/images/fundo2.jpg')",
                "url('/images/fundo3.jpg')",
                "url('/images/fundo4.jpg')",
                "url('/images/fundo1.jpg')"
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Conteúdo Hero */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              MUSEU
              <br />
              <span className="text-[var(--museu-light-salmon)]">CASA BORGES</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Preservando a memória e cultura de Mato Grosso através do legado 
              de Herculano Borges e da rica história regional
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
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
                className="border-white text-white hover:bg-white hover:text-[var(--museu-red)] text-lg px-8 py-6 rounded-full font-semibold"
              >
                <Link href="/o-museu">
                  Sobre o Museu
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-800">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {item.description}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="group-hover:bg-[var(--museu-red)] group-hover:text-white group-hover:border-[var(--museu-red)] transition-all duration-300"
                    >
                      <Link href={item.href}>
                        Saiba Mais
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-[var(--museu-red)] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Visite o Museu Casa Borges
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Venha conhecer pessoalmente nossa coleção e mergulhar na história de Mato Grosso
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-[var(--museu-red)] hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold"
              >
                <Link href="/contato">
                  Agendar Visita
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[var(--museu-red)] text-lg px-8 py-6 rounded-full font-semibold"
              >
                <Link href="/tour">
                  Tour Virtual
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Newsletter />
          </div>
        </div>
      </section>
    </>
  )
}
