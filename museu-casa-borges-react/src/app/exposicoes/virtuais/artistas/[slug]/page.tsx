import { notFound } from 'next/navigation'
import ContentPage from '@/components/content/ContentPage'
import { supabase } from '@/lib/supabase'
import { mapSecoesRowsToContentSections } from '@/features/exposicoes/public/map-section-rows-to-content-sections'
import type { Metadata } from 'next'

type Params = { slug: string }

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params

  const { data: artista } = await supabase
    .from('artistas_exposicao')
    .select('nome')
    .eq('slug', slug)
    .eq('publicado', true)
    .maybeSingle()

  if (!artista) return { title: 'Artista não encontrado' }

  return {
    title: `${artista.nome} | Artistas do Museu Casa Borges`,
  }
}

export default async function ArtistaVirtualPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params

  const { data: artista } = await supabase
    .from('artistas_exposicao')
    .select('*')
    .eq('slug', slug)
    .eq('publicado', true)
    .maybeSingle()

  if (!artista) {
    notFound()
  }

  const { data: secoes } = await supabase
    .from('artistas_exposicao_secoes')
    .select('*')
    .eq('artista_id', artista.id)
    .order('ordem')

  const sections = mapSecoesRowsToContentSections(secoes ?? [], {
    gridContentKey: artista.slug,
    imageIncludeHref: false,
  })

  return (
    <ContentPage
      title={artista.nome}
      sections={sections}
    />
  )
}
