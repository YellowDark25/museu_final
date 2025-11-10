'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, ArrowRight, FileText, Image, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

/**
 * AIDEV-NOTE: Componente de busca global do Museu Casa Borges
 * Implementa busca em tempo real com categorização de resultados
 * Design responsivo com animações fluidas e acessibilidade WCAG 2.1 AA
 */

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  category: 'page' | 'acervo' | 'evento' | 'exposicao' | 'artigo'
  image?: string
  date?: string
  relevance: number
}

interface GlobalSearchProps {
  isOpen: boolean
  onClose: () => void
  placeholder?: string
}

// Dados simulados para busca (em produção viria de uma API)
const searchData: SearchResult[] = [
  {
    id: '1',
    title: 'Sobre o Museu Casa Borges',
    description: 'Conheça a história e missão do Museu Casa Borges, dedicado à preservação da cultura de Mato Grosso.',
    url: '/sobre',
    category: 'page',
    relevance: 0.9
  },
  {
    id: '2',
    title: 'Acervo Digital',
    description: 'Explore nossa coleção digital com documentos, fotografias e objetos históricos.',
    url: '/acervo',
    category: 'acervo',
    relevance: 0.85
  },
  {
    id: '3',
    title: 'Exposições Permanentes',
    description: 'Descubra nossas exposições permanentes sobre a história de Mato Grosso.',
    url: '/exposicoes',
    category: 'exposicao',
    relevance: 0.8
  },
  {
    id: '4',
    title: 'Casa Balatipone',
    description: 'Patrimônio arquitetônico histórico de Mato Grosso.',
    url: '/casa-balatipone',
    category: 'page',
    relevance: 0.75
  },
  {
    id: '5',
    title: 'Eventos Culturais',
    description: 'Programação de eventos, palestras e atividades educativas.',
    url: '/eventos',
    category: 'evento',
    relevance: 0.7
  },
  {
    id: '6',
    title: 'Biblioteca Especializada',
    description: 'Acesso à biblioteca com foco em história e cultura regional.',
    url: '/biblioteca',
    category: 'page',
    relevance: 0.65
  }
]

const categoryIcons = {
  page: <FileText size={16} />,
  acervo: <Image size={16} />,
  evento: <Calendar size={16} />,
  exposicao: <MapPin size={16} />,
  artigo: <FileText size={16} />
}

const categoryLabels = {
  page: 'Página',
  acervo: 'Acervo',
  evento: 'Evento',
  exposicao: 'Exposição',
  artigo: 'Artigo'
}

export default function GlobalSearch({ isOpen, onClose, placeholder = 'Buscar no museu...' }: GlobalSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // AIDEV-NOTE: Foco automático quando o modal abre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // AIDEV-NOTE: Carregar buscas recentes do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('museu-recent-searches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // AIDEV-NOTE: Busca em tempo real com debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    const timeoutId = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  // AIDEV-NOTE: Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => prev > -1 ? prev - 1 : -1)
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleResultClick(results[selectedIndex])
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose])

  const performSearch = (searchQuery: string) => {
    // AIDEV-NOTE: Simulação de busca (em produção seria uma chamada à API)
    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => b.relevance - a.relevance)

    setResults(filtered)
    setIsLoading(false)
  }

  const handleResultClick = (result: SearchResult) => {
    // AIDEV-NOTE: Salvar busca recente
    const newRecentSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5)
    setRecentSearches(newRecentSearches)
    localStorage.setItem('museu-recent-searches', JSON.stringify(newRecentSearches))
    
    onClose()
  }

  const handleRecentSearchClick = (recentQuery: string) => {
    setQuery(recentQuery)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('museu-recent-searches')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* AIDEV-NOTE: Campo de busca */}
            <div className="flex items-center p-4 border-b border-gray-100">
              <Search className="text-gray-400 mr-3" size={20} />
              <Input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 border-0 focus:ring-0 text-lg placeholder:text-gray-400"
                aria-label="Campo de busca global"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="ml-2 text-gray-400 hover:text-gray-600"
                aria-label="Fechar busca"
              >
                <X size={20} />
              </Button>
            </div>

            {/* AIDEV-NOTE: Conteúdo da busca */}
            <div className="max-h-96 overflow-y-auto" ref={resultsRef}>
              {!query.trim() && recentSearches.length > 0 && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center">
                      <Clock size={16} className="mr-2" />
                      Buscas Recentes
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearRecentSearches}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Limpar
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((recentQuery, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearchClick(recentQuery)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {recentQuery}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query.trim() && (
                <div className="p-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--museu-red)]"></div>
                      <span className="ml-2 text-gray-600">Buscando...</span>
                    </div>
                  ) : results.length > 0 ? (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">
                        {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                      </h3>
                      {results.map((result, index) => (
                        <Link
                          key={result.id}
                          href={result.url}
                          onClick={() => handleResultClick(result)}
                          className={`block p-3 rounded-lg transition-colors ${
                            selectedIndex === index
                              ? 'bg-[var(--museu-red)]/10 border border-[var(--museu-red)]/20'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <span className="text-gray-400 mr-2">
                                  {categoryIcons[result.category]}
                                </span>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  {categoryLabels[result.category]}
                                </span>
                              </div>
                              <h4 className="font-medium text-gray-900 mb-1">
                                {result.title}
                              </h4>
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {result.description}
                              </p>
                            </div>
                            <ArrowRight 
                              size={16} 
                              className={`ml-3 text-gray-400 transition-colors ${
                                selectedIndex === index ? 'text-[var(--museu-red)]' : ''
                              }`} 
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Search size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Nenhum resultado encontrado
                      </h3>
                      <p className="text-gray-600">
                        Tente usar palavras-chave diferentes ou mais gerais.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* AIDEV-NOTE: Dicas de navegação */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">↑↓</kbd>
                    <span className="ml-1">navegar</span>
                  </span>
                  <span className="flex items-center">
                    <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">Enter</kbd>
                    <span className="ml-1">selecionar</span>
                  </span>
                </div>
                <span className="flex items-center">
                  <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">Esc</kbd>
                  <span className="ml-1">fechar</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export { GlobalSearch }