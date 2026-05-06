'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

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
   * restrições de domínio do next/image. Para caminhos relativos do site, usamos next/image.
   */
  const isRemote = src.startsWith('http://') || src.startsWith('https://')
  const FigureContent = (
    <motion.figure
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`imagem-paginas my-8 mx-auto w-fit max-w-full ${className}`}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="relative overflow-hidden rounded-lg group">
          {isRemote ? (
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="img-fluid mx-auto block h-auto max-h-[min(52vh,420px)] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="img-fluid mx-auto block h-auto max-h-[min(52vh,420px)] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          )}
        </div>
        {caption ? (
          <motion.figcaption
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full text-center text-sm text-gray-600 px-1 leading-snug"
          >
            {caption}
          </motion.figcaption>
        ) : null}
      </div>
    </motion.figure>
  )

  return href ? (
    <Link
      href={href}
      prefetch={false}
      aria-label={alt}
      className="mx-auto block w-fit max-w-full"
    >
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