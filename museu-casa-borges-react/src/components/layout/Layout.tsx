'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

/**
 * AIDEV-NOTE: Layout principal do Museu Casa Borges
 * Combina Header e Footer com área de conteúdo principal
 * Inclui animações de transição entre páginas
 */
export default function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--museu-white)]">
      <Header />
      
      <motion.main
        id="main-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.5, 
          ease: 'easeInOut',
          type: 'tween'
        }}
        className={`flex-1 ${className}`}
        role="main"
        aria-label="Conteúdo principal"
      >
        {children}
      </motion.main>
      
      <Footer />
    </div>
  )
}