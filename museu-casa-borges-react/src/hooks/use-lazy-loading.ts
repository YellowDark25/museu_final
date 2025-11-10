'use client'

import { useEffect, useRef, useState } from 'react'

// AIDEV-NOTE: Interface para opções do intersection observer
interface UseLazyLoadingOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

// AIDEV-NOTE: Hook personalizado para lazy loading com intersection observer
export function useLazyLoading<T extends HTMLElement = HTMLDivElement>(
  options: UseLazyLoadingOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<T>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // AIDEV-NOTE: Verificar suporte ao intersection observer
    if (!('IntersectionObserver' in window)) {
      setIsIntersecting(true)
      setHasIntersected(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting
        setIsIntersecting(isVisible)

        if (isVisible && !hasIntersected) {
          setHasIntersected(true)
          
          // AIDEV-NOTE: Parar de observar se triggerOnce for true
          if (triggerOnce) {
            observer.unobserve(element)
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, hasIntersected])

  return {
    elementRef,
    isIntersecting,
    hasIntersected,
    isVisible: triggerOnce ? hasIntersected : isIntersecting,
  }
}

// AIDEV-NOTE: Hook para lazy loading de imagens específico
export function useImageLazyLoading(options?: UseLazyLoadingOptions) {
  const { elementRef, isVisible } = useLazyLoading<HTMLImageElement>(options)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  return {
    elementRef,
    isVisible,
    isLoaded,
    hasError,
    handleLoad,
    handleError,
    shouldLoad: isVisible,
  }
}

// AIDEV-NOTE: Hook para lazy loading de listas/galerias
export function useListLazyLoading<T = any>(
  items: T[],
  itemsPerBatch: number = 12,
  options?: UseLazyLoadingOptions
) {
  const [loadedItems, setLoadedItems] = useState<T[]>([])
  const [currentBatch, setCurrentBatch] = useState(1)
  const { elementRef, isVisible } = useLazyLoading(options)

  // AIDEV-NOTE: Carregar próximo lote quando elemento trigger fica visível
  useEffect(() => {
    if (isVisible && loadedItems.length < items.length) {
      const nextBatch = currentBatch + 1
      const newItems = items.slice(0, nextBatch * itemsPerBatch)
      setLoadedItems(newItems)
      setCurrentBatch(nextBatch)
    }
  }, [isVisible, items, itemsPerBatch, currentBatch, loadedItems.length])

  // AIDEV-NOTE: Inicializar com primeiro lote
  useEffect(() => {
    if (items.length > 0 && loadedItems.length === 0) {
      const initialItems = items.slice(0, itemsPerBatch)
      setLoadedItems(initialItems)
    }
  }, [items, itemsPerBatch, loadedItems.length])

  const hasMore = loadedItems.length < items.length
  const isLoading = isVisible && hasMore

  return {
    loadedItems,
    hasMore,
    isLoading,
    triggerRef: elementRef,
  }
}

export default useLazyLoading