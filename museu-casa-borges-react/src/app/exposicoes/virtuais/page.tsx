import { Metadata } from 'next'
import ContentPage from '@/components/content/ContentPage'
import { supabase } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Exposições Virtuais | Museu Casa Borges',
  description: 'Explore as exposições virtuais do Museu Casa Borges com tours 360°, galerias interativas e experiências digitais imersivas.',
  keywords: ['exposições virtuais', 'tour 360°', 'realidade virtual', 'galeria digital', 'experiência imersiva'],
}

export const revalidate = 60

export default async function ExposicoesVirtuais() {
  const { data: exposicoes } = await supabase
    .from('exposicoes_virtuais')
    .select('id, titulo, slug, descricao_curta, imagem_capa, ordem')
    .eq('publicado', true)
    .order('ordem')
    .order('titulo')

  const items = (exposicoes ?? []).map((expo) => ({
    src: expo.imagem_capa || '/exposicoes/virtuais/placeholder.jpg',
    alt: expo.titulo,
    caption: expo.titulo,
    href: `/exposicoes/virtuais/${expo.slug}`,
    width: 340,
    height: 230,
  }))

  const sections = [
    { type: 'subtitle' as const, content: 'Exposições disponíveis' },
    {
      type: 'image_grid' as const,
      content: 'grid-exposicoes-virtuais',
      items,
      className: 'mt-4',
    },
  ]

  return (
    <ContentPage
      title="Exposições Virtuais"
      subtitle="Explore o museu e suas coleções através de experiências digitais imersivas"
      sections={sections}
      contentWidthClass="max-w-7xl"
    />
  )
}
