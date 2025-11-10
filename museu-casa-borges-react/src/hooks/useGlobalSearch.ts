'use client'

import { useState, useEffect } from 'react'

/**
 * AIDEV-NOTE: Hook para gerenciar o estado da busca global
 * Controla abertura/fechamento e atalhos de teclado
 * Implementa acessibilidade e usabilidade otimizada
 */

export function useGlobalSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // AIDEV-NOTE: Atalho de teclado Ctrl+K ou Cmd+K para abrir busca
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // AIDEV-NOTE: Prevenir scroll do body quando busca está aberta
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isSearchOpen])

  const openSearch = () => setIsSearchOpen(true)
  const closeSearch = () => setIsSearchOpen(false)
  const toggleSearch = () => setIsSearchOpen(prev => !prev)

  return {
    isSearchOpen,
    openSearch,
    closeSearch,
    toggleSearch
  }
}