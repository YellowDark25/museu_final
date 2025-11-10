// AIDEV-NOTE: Provider de acessibilidade WCAG 2.1 AA completo

'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AccessibilityContextType {
  highContrast: boolean
  fontSize: 'small' | 'medium' | 'large'
  reducedMotion: boolean
  screenReaderMode: boolean
  toggleHighContrast: () => void
  setFontSize: (size: 'small' | 'medium' | 'large') => void
  toggleReducedMotion: () => void
  toggleScreenReaderMode: () => void
  announceToScreenReader: (message: string) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

/**
 * Hook para usar o contexto de acessibilidade
 */
export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility deve ser usado dentro de AccessibilityProvider')
  }
  return context
}

interface AccessibilityProviderProps {
  children: React.ReactNode
}

/**
 * Provider de acessibilidade com funcionalidades WCAG 2.1 AA
 */
export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSizeState] = useState<'small' | 'medium' | 'large'>('medium')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [screenReaderMode, setScreenReaderMode] = useState(false)
  const [announcement, setAnnouncement] = useState('')

  // AIDEV-NOTE: Detectar preferências do sistema
  useEffect(() => {
    // Detectar preferência de movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(prefersReducedMotion.matches)

    // Detectar preferência de alto contraste
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)')
    setHighContrast(prefersHighContrast.matches)

    // Carregar preferências salvas
    const savedPrefs = localStorage.getItem('accessibility-preferences')
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs)
      setHighContrast(prefs.highContrast ?? prefersHighContrast.matches)
      setFontSizeState(prefs.fontSize ?? 'medium')
      setReducedMotion(prefs.reducedMotion ?? prefersReducedMotion.matches)
      setScreenReaderMode(prefs.screenReaderMode ?? false)
    }

    // Listeners para mudanças nas preferências do sistema
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    const handleContrastChange = (e: MediaQueryListEvent) => setHighContrast(e.matches)

    prefersReducedMotion.addEventListener('change', handleMotionChange)
    prefersHighContrast.addEventListener('change', handleContrastChange)

    return () => {
      prefersReducedMotion.removeEventListener('change', handleMotionChange)
      prefersHighContrast.removeEventListener('change', handleContrastChange)
    }
  }, [])

  // AIDEV-NOTE: Aplicar classes CSS baseadas nas preferências
  useEffect(() => {
    const root = document.documentElement
    
    // Alto contraste
    if (highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Tamanho da fonte
    root.classList.remove('font-small', 'font-medium', 'font-large')
    root.classList.add(`font-${fontSize}`)

    // Movimento reduzido
    if (reducedMotion) {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }

    // Modo leitor de tela
    if (screenReaderMode) {
      root.classList.add('screen-reader-mode')
    } else {
      root.classList.remove('screen-reader-mode')
    }

    // Salvar preferências
    const preferences = {
      highContrast,
      fontSize,
      reducedMotion,
      screenReaderMode
    }
    localStorage.setItem('accessibility-preferences', JSON.stringify(preferences))
  }, [highContrast, fontSize, reducedMotion, screenReaderMode])

  // AIDEV-NOTE: Funções de controle
  const toggleHighContrast = () => {
    setHighContrast(!highContrast)
    announceToScreenReader(`Alto contraste ${!highContrast ? 'ativado' : 'desativado'}`)
  }

  const setFontSize = (size: 'small' | 'medium' | 'large') => {
    setFontSizeState(size)
    const sizeLabels = { small: 'pequeno', medium: 'médio', large: 'grande' }
    announceToScreenReader(`Tamanho da fonte alterado para ${sizeLabels[size]}`)
  }

  const toggleReducedMotion = () => {
    setReducedMotion(!reducedMotion)
    announceToScreenReader(`Movimento reduzido ${!reducedMotion ? 'ativado' : 'desativado'}`)
  }

  const toggleScreenReaderMode = () => {
    setScreenReaderMode(!screenReaderMode)
    announceToScreenReader(`Modo leitor de tela ${!screenReaderMode ? 'ativado' : 'desativado'}`)
  }

  const announceToScreenReader = (message: string) => {
    setAnnouncement(message)
    setTimeout(() => setAnnouncement(''), 1000)
  }

  const contextValue: AccessibilityContextType = {
    highContrast,
    fontSize,
    reducedMotion,
    screenReaderMode,
    toggleHighContrast,
    setFontSize,
    toggleReducedMotion,
    toggleScreenReaderMode,
    announceToScreenReader
  }

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
      
      {/* AIDEV-NOTE: Região de anúncios para leitores de tela */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {announcement}
      </div>
    </AccessibilityContext.Provider>
  )
}

/**
 * Componente de Skip Links para navegação por teclado
 */
export function SkipLinks() {
  return (
    <div className="skip-links">
      <a 
        href="#main-content" 
        className="skip-link"
        onFocus={(e) => e.target.scrollIntoView()}
      >
        Pular para o conteúdo principal
      </a>
      <a 
        href="#main-navigation" 
        className="skip-link"
        onFocus={(e) => e.target.scrollIntoView()}
      >
        Pular para a navegação
      </a>
      <a 
        href="#footer" 
        className="skip-link"
        onFocus={(e) => e.target.scrollIntoView()}
      >
        Pular para o rodapé
      </a>
    </div>
  )
}

/**
 * Componente de controles de acessibilidade
 */
export function AccessibilityControls() {
  const {
    highContrast,
    fontSize,
    reducedMotion,
    screenReaderMode,
    toggleHighContrast,
    setFontSize,
    toggleReducedMotion,
    toggleScreenReaderMode
  } = useAccessibility()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* AIDEV-NOTE: Botão de abertura dos controles */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="accessibility-toggle"
        aria-label="Abrir controles de acessibilidade"
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9M15 22.5L21 23V21L15 20.5M11 7H13V9H11M11 15H13V17H11M7 7H9V9H7M7 15H9V17H7"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* AIDEV-NOTE: Painel de controles */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="accessibility-panel"
            className="accessibility-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-labelledby="accessibility-title"
            aria-modal="false"
          >
            <div className="accessibility-panel-content">
              <h2 id="accessibility-title" className="accessibility-title">
                Controles de Acessibilidade
              </h2>

              <div className="accessibility-controls-grid">
                {/* AIDEV-NOTE: Controle de alto contraste */}
                <div className="control-group">
                  <label className="control-label">
                    <input
                      type="checkbox"
                      checked={highContrast}
                      onChange={toggleHighContrast}
                      className="control-checkbox"
                    />
                    Alto Contraste
                  </label>
                </div>

                {/* AIDEV-NOTE: Controle de tamanho da fonte */}
                <div className="control-group">
                  <span className="control-label">Tamanho da Fonte</span>
                  <div className="font-size-controls">
                    {(['small', 'medium', 'large'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setFontSize(size)}
                        className={`font-size-btn ${fontSize === size ? 'active' : ''}`}
                        aria-pressed={fontSize === size}
                      >
                        {size === 'small' ? 'A' : size === 'medium' ? 'A' : 'A'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AIDEV-NOTE: Controle de movimento reduzido */}
                <div className="control-group">
                  <label className="control-label">
                    <input
                      type="checkbox"
                      checked={reducedMotion}
                      onChange={toggleReducedMotion}
                      className="control-checkbox"
                    />
                    Reduzir Animações
                  </label>
                </div>

                {/* AIDEV-NOTE: Modo leitor de tela */}
                <div className="control-group">
                  <label className="control-label">
                    <input
                      type="checkbox"
                      checked={screenReaderMode}
                      onChange={toggleScreenReaderMode}
                      className="control-checkbox"
                    />
                    Modo Leitor de Tela
                  </label>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="accessibility-close"
                aria-label="Fechar controles de acessibilidade"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}