'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

interface ImageFigureProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  className?: string
  /** URL para navegação ao clicar na figura (opcional). */
  href?: string
}

interface GridItem {
  src: string
  alt: string
  caption?: string
  href?: string
  width?: number
  height?: number
}

interface ContentSection {
  type: 'text' | 'image' | 'subtitle' | 'image_grid'
  content: string
  imageProps?: Omit<ImageFigureProps, 'src' | 'alt'>
  className?: string
  /**
   * Itens para grids de imagens. Usado quando type === 'image_grid'.
   */
  items?: GridItem[]
}

interface ContentPageProps {
  title: string
  subtitle?: string
  sections?: ContentSection[]
  author?: string
  className?: string
  /**
   * Controla a largura máxima do conteúdo. Padrão: "max-w-4xl".
   * Em páginas com grids (ex.: Exposições Virtuais), pode ser útil ampliar para "max-w-6xl" ou "max-w-7xl".
   */
  contentWidthClass?: string
  /**
   * Variante de densidade visual. "compact" usa tipografia e espaçamentos menores.
   */
  variant?: 'default' | 'compact'
  children?: React.ReactNode
}

/**
 * AIDEV-NOTE: Componente ImageFigure reutilizável
 * Renderiza imagens com caption e otimização Next.js
 */
export function ImageFigure({ 
  src, 
  alt, 
  caption, 
  width = 800, 
  height = 600, 
  className = '',
  href 
}: ImageFigureProps) {
  /**
   * Renderiza a figura de imagem. Se "href" for fornecido, toda a figura
   * torna-se clicável e navega para a rota indicada usando Next/Link.
   *
   * AIDEV-NOTE: Ajuste para imagens remotas
   * Quando o src for uma URL externa (http/https), usamos <img> padrão para evitar
   * restrições de domínio do next/image. Para caminhos locais (/public), usamos next/image
   * com otimização.
   */
  const isRemote = src.startsWith('http://') || src.startsWith('https://')
  const FigureContent = (
    <motion.figure
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`imagem-paginas my-8 ${className}`}
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-0">
          <div className="relative overflow-hidden group">
            {isRemote ? (
              // Renderização de imagens externas sem next/image
              <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="img-fluid w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              // Renderização otimizada para assets locais via next/image
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="img-fluid w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            )}
            {caption && (
              <motion.figcaption
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center text-sm text-gray-600 p-4 bg-gray-50"
              >
                {caption}
              </motion.figcaption>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.figure>
  )

  // Se houver href, torna a figura clicável com Link
  return href ? (
    <Link href={href} prefetch={false} aria-label={alt} className="block">
      {FigureContent}
    </Link>
  ) : (
    FigureContent
  )
}

/**
 * AIDEV-NOTE: Componente ContentPage principal
 * Template reutilizável para páginas de conteúdo do museu
 * Suporta texto, imagens e subtítulos com animações
 */
/**
 * Função: ContentPage
 * Objetivo: Template reutilizável para páginas de conteúdo do museu.
 * Atualizações:
 * - Adicionado suporte ao tipo de seção 'image_grid' para renderização em grade.
 * - Adicionado prop 'contentWidthClass' para controlar a largura máxima do conteúdo.
 */
export default function ContentPage({ 
  title, 
  subtitle, 
  sections, 
  author, 
  className = '',
  contentWidthClass,
  variant = 'default',
  children
}: ContentPageProps) {
  const isCompact = variant === 'compact'
  const widthClass = contentWidthClass ?? (isCompact ? 'max-w-3xl' : 'max-w-4xl')
  const titleClass = isCompact ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'
  const subTitleClass = isCompact ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
  const sectionSubtitleClass = isCompact ? 'text-xl' : 'text-2xl'

  return (
    <div className={`texto_meio container mx-auto px-4 py-12 ${className}`}>
      <div className={`${widthClass} mx-auto`}>
        {/* Título Principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h1 className={`font-bold text-[var(--museu-red)] mb-4 ${titleClass}`}>
            {title}
          </h1>
          {subtitle && (
            <h2 className={`text-gray-700 font-light ${subTitleClass}`}>
              {subtitle}
            </h2>
          )}
        </motion.div>

        {/* Conteúdo das Seções */}
        <div className="space-y-8">
          {(sections ?? []).map((section, index) => {
            const delay = index * 0.1

            switch (section.type) {
              case 'text':
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay }}
                    viewport={{ once: true }}
                    className={`recuo-primeira-linha justificado text-gray-800 leading-relaxed ${section.className || ''}`}
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                )

              case 'subtitle':
                return (
                  <motion.h3
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay }}
                    viewport={{ once: true }}
                    className={`font-semibold text-[var(--museu-red)] mt-12 mb-6 ${sectionSubtitleClass} ${section.className || ''}`}
                  >
                    {section.content}
                  </motion.h3>
                )

              case 'image':
                const [src, alt, caption] = section.content.split('|')
                return (
                  <ImageFigure
                    key={index}
                    src={src}
                    alt={alt || 'Imagem do Museu Casa Borges'}
                    caption={caption}
                    className={section.className}
                    {...section.imageProps}
                  />
                )

              case 'image_grid':
                // Renderiza um grid responsivo de figuras de imagem
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay }}
                    viewport={{ once: true }}
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${section.className || ''}`}
                  >
                    {(section.items || []).map((item, i) => (
                      <ImageFigure
                        key={i}
                        src={item.src}
                        alt={item.alt}
                        caption={item.caption}
                        width={item.width ?? 400}
                        height={item.height ?? 300}
                        href={item.href}
                        className="my-0"
                      />
                    ))}
                  </motion.div>
                )

              default:
                return null
            }
          })}
        </div>

        {children}

        {/* Crédito do Autor */}
        {author && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="margens-autor text-right text-gray-600 italic mt-12 pt-8 border-t border-gray-200"
          >
            <p className="text-sm">
              <span className="font-medium">Texto:</span> {author}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}