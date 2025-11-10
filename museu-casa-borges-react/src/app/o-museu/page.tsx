import { Metadata } from 'next'
import OMuseuContent from '@/components/o-museu/OMuseuContent'

export const metadata: Metadata = {
  title: 'O Museu | Museu Casa Jorge Luis Borges',
  description: 'Conheça a história, missão e valores do Museu Casa Jorge Luis Borges, dedicado à preservação da memória cultural.',
  keywords: 'museu, história, missão, valores, cultura, preservação, memória',
}

/**
 * AIDEV-NOTE: Página institucional "O Museu" - Server Component
 * Mantém export metadata para SEO e importa componente client para animações
 * Separação clara entre Server Component (metadata) e Client Component (interatividade)
 */
export default function OMuseuPage() {
  return <OMuseuContent />
}
