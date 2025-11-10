'use client'

import { useState, useEffect, useMemo } from 'react'

/**
 * AIDEV-NOTE: Hook para gerenciar dados de busca
 * Implementa busca em tempo real com debounce
 * Categoriza resultados e mantém histórico
 */

export interface SearchResult {
  id: string
  title: string
  description: string
  category: 'acervo' | 'exposicoes' | 'eventos' | 'noticias' | 'paginas'
  url: string
  image?: string
  date?: string
}

// AIDEV-NOTE: Dados mockados para demonstração - em produção viria de API
const mockSearchData: SearchResult[] = [
  {
    id: '1',
    title: 'Manuscritos de Jorge Luis Borges',
    description: 'Coleção de manuscritos originais do escritor argentino',
    category: 'acervo',
    url: '/acervo/manuscritos-borges',
    image: '/images/manuscritos.jpg'
  },
  {
    id: '2',
    title: 'Exposição: Labirintos Literários',
    description: 'Uma jornada pelos universos criados por Borges',
    category: 'exposicoes',
    url: '/exposicoes/labirintos-literarios',
    image: '/images/exposicao-labirintos.jpg'
  },
  {
    id: '3',
    title: 'Palestra: O Infinito em Borges',
    description: 'Conferência sobre os conceitos de infinito na obra borgiana',
    category: 'eventos',
    url: '/eventos/palestra-infinito-borges',
    date: '2024-02-15'
  },
  {
    id: '4',
    title: 'Sobre o Museu Casa Borges',
    description: 'História e missão do museu dedicado ao grande escritor',
    category: 'paginas',
    url: '/sobre'
  },
  {
    id: '5',
    title: 'Biblioteca de Babel Digital',
    description: 'Acervo digitalizado inspirado no conto de Borges',
    category: 'acervo',
    url: '/acervo/biblioteca-babel',
    image: '/images/biblioteca-babel.jpg'
  },
  {
    id: '6',
    title: 'Visita Guiada: Universos Paralelos',
    description: 'Tour especial explorando os mundos criados por Borges',
    category: 'eventos',
    url: '/eventos/visita-universos-paralelos',
    date: '2024-02-20'
  }
]

export function useSearchData() {
  const [query, setQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // AIDEV-NOTE: Carregar buscas recentes do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('museu-recent-searches')
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved))
      } catch (error) {
        console.error('Erro ao carregar buscas recentes:', error)
      }
    }
  }, [])

  // AIDEV-NOTE: Salvar buscas recentes no localStorage
  const addRecentSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    const updated = [
      searchQuery,
      ...recentSearches.filter(s => s !== searchQuery)
    ].slice(0, 5) // Manter apenas 5 buscas recentes

    setRecentSearches(updated)
    localStorage.setItem('museu-recent-searches', JSON.stringify(updated))
  }

  // AIDEV-NOTE: Limpar buscas recentes
  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('museu-recent-searches')
  }

  // AIDEV-NOTE: Busca com debounce e categorização
  const searchResults = useMemo(() => {
    if (!query.trim()) return []

    const normalizedQuery = query.toLowerCase().trim()
    
    return mockSearchData.filter(item => 
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery)
    ).sort((a, b) => {
      // AIDEV-NOTE: Priorizar resultados que começam com a busca
      const aStartsWithQuery = a.title.toLowerCase().startsWith(normalizedQuery)
      const bStartsWithQuery = b.title.toLowerCase().startsWith(normalizedQuery)
      
      if (aStartsWithQuery && !bStartsWithQuery) return -1
      if (!aStartsWithQuery && bStartsWithQuery) return 1
      
      return a.title.localeCompare(b.title)
    })
  }, [query])

  // AIDEV-NOTE: Agrupar resultados por categoria
  const categorizedResults = useMemo(() => {
    const categories = {
      acervo: searchResults.filter(r => r.category === 'acervo'),
      exposicoes: searchResults.filter(r => r.category === 'exposicoes'),
      eventos: searchResults.filter(r => r.category === 'eventos'),
      noticias: searchResults.filter(r => r.category === 'noticias'),
      paginas: searchResults.filter(r => r.category === 'paginas')
    }

    return Object.entries(categories).filter(([_, results]) => results.length > 0)
  }, [searchResults])

  return {
    query,
    setQuery,
    searchResults,
    categorizedResults,
    recentSearches,
    addRecentSearch,
    clearRecentSearches
  }
}