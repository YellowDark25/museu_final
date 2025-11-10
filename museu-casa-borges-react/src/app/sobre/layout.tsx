import { Metadata } from 'next'

/**
 * AIDEV-NOTE: Layout para a página Sobre
 * Contém a metadata que foi removida do Client Component page.tsx
 * para resolver o erro de build do Next.js
 */
export const metadata: Metadata = {
  title: 'Sobre o Museu | Museu Casa Jorge Luis Borges',
  description: 'Conheça a história e missão do Museu Casa Jorge Luis Borges, dedicado à preservação do legado do grande escritor argentino.',
  keywords: 'museu, Jorge Luis Borges, literatura, cultura, preservação, memória, Argentina',
}

interface SobreLayoutProps {
  children: React.ReactNode
}

/**
 * Layout da seção Sobre
 * Permite que a página sobre/page.tsx seja um Client Component
 * enquanto mantém a metadata no Server Component
 */
export default function SobreLayout({ children }: SobreLayoutProps) {
  return <>{children}</>
}