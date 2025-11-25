import { Metadata } from 'next'
import IdentidadeContent from '@/components/identidade/IdentidadeContent'

export const metadata: Metadata = {
  title: 'Identidade Cultural | Museu Casa Jorge Luis Borges',
  description: 'Descubra a identidade cultural única do Museu Casa Jorge Luis Borges e sua conexão com as tradições regionais.',
  keywords: 'identidade cultural, tradições, Mato Grosso, cultura regional, patrimônio, valores culturais',
}

/**
 * Função: IdentidadePage (Server Component)
 * Objetivo: Disponibiliza a metadata da rota e renderiza o componente cliente
 *           IdentidadeContent, que contém as animações via framer-motion.
 * Observações:
 * - Mantemos este arquivo como Server Component para suportar metadata.
 * - Toda a lógica de UI/cliente e animações está isolada em
 *   src/components/identidade/IdentidadeContent.tsx (Client Component com 'use client').
 */
export default function IdentidadePage() {
  // Renderiza o componente cliente diretamente. Server Component mantém apenas metadata.
  return <IdentidadeContent />
}
