import { notFound } from 'next/navigation'
import ContentPage from '@/components/content/ContentPage'
import { supabase } from '@/lib/supabase'
import { mapSecoesRowsToContentSections } from '@/features/exposicoes/public/map-section-rows-to-content-sections'
import type { Metadata } from 'next'

type Params = { slug: string }

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params

  const { data: expo } = await supabase
    .from('exposicoes_virtuais')
    .select('titulo, descricao_curta')
    .eq('slug', slug)
    .eq('publicado', true)
    .maybeSingle()

  if (!expo) return { title: 'Exposição não encontrada' }

  return {
    title: `${expo.titulo} | Museu Casa Borges`,
    description: expo.descricao_curta || undefined,
  }
}

export default async function ExposicaoVirtualPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params

  const { data: expo } = await supabase
    .from('exposicoes_virtuais')
    .select('*')
    .eq('slug', slug)
    .eq('publicado', true)
    .maybeSingle()

  if (!expo) {
    notFound()
  }

  const { data: secoes } = await supabase
    .from('exposicoes_virtuais_secoes')
    .select('*')
    .eq('exposicao_id', expo.id)
    .order('ordem')

  const sections = mapSecoesRowsToContentSections(secoes ?? [], {
    gridContentKey: expo.slug,
    imageIncludeHref: true,
    imageGridClassName: 'mt-4',
  })

  return (
    <ContentPage
      title={expo.titulo}
      subtitle={expo.descricao_curta || undefined}
      sections={sections}
      author={expo.autor || undefined}
    />
  )
}
