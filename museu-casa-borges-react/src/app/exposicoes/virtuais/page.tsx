import { Metadata } from 'next'
import ContentPage from '@/components/content/ContentPage'

export const metadata: Metadata = {
  title: 'Exposições Virtuais | Museu Casa Borges',
  description: 'Explore as exposições virtuais do Museu Casa Borges com tours 360°, galerias interativas e experiências digitais imersivas.',
  keywords: ['exposições virtuais', 'tour 360°', 'realidade virtual', 'galeria digital', 'experiência imersiva'],
}

// AIDEV-NOTE: Página de exposições virtuais com tours 360°, galerias interativas e conteúdo digital
// Oferece experiências imersivas e acessíveis para visitantes remotos
/**
 * Função da página de Exposições Virtuais.
 * Objetivo: integrar as informações da página antiga INDEX/exposicao-virtual.html
 * ao novo template ContentPage, usando a estrutura de 'sections'.
 */
export default function ExposicoesVirtuais() {
  // Mapeamento dos seis itens presentes na página antiga
  const itensAntigos = [
    {
      titulo: 'O Museu Casa Borges em cartaz',
      // Imagem migrada do diretório INDEX/cartazes/cartaz112.jpg para public
      img: '/exposicoes/virtuais/cartaz112.jpg',
      alt: 'O Museu Casa Borges em cartaz',
      slug: 'cartazes'
    },
    {
      titulo: 'Os Artistas do Museu Casa Borges',
      // Imagem migrada do diretório INDEX/artistas/artistas2.jpg para public
      img: '/exposicoes/virtuais/artistas2.jpg',
      alt: 'Os Artistas do Museu Casa Borges',
      slug: 'artistas'
    },
    {
      titulo: 'POVO BALATIPONÉ-UMUTINA: PRESENTE – PASSADO – FUTURO.',
      // Imagem migrada do diretório INDEX/cartazes/cartaz191.jpg para public
      img: '/exposicoes/virtuais/cartaz191.jpg',
      alt: 'Povo Balatiponé-Umutina',
      slug: 'balatipone-umutina'
    },
    {
      titulo: 'BARRA DO BUGRES: NATUREZA, HISTÓRIA E CULTURA.',
      // Imagem migrada do diretório INDEX/cartazes/cartaz171.jpg para public
      img: '/exposicoes/virtuais/cartaz171.jpg',
      alt: 'Barra do Bugres: natureza, história e cultura',
      slug: 'barra-do-bugres'
    },
    {
      titulo: 'COMUNIDADES QUILOMBOLAS DE BARRA DO BUGRES: MEMÓRIAS, SABERES E FAZERES.',
      // Imagem migrada do diretório INDEX/cartazes/foto22.jpg para public
      img: '/exposicoes/virtuais/foto22.jpg',
      alt: 'Comunidades quilombolas de Barra do Bugres',
      slug: 'quilombos'
    },
    {
      titulo: 'ESPECIAL MULHERES',
      // Imagem migrada do diretório INDEX/cartazes/foto1.png para public
      img: '/exposicoes/virtuais/foto1.png',
      alt: 'Especial Mulheres',
      slug: 'mulheres'
    }
  ]

  // Montagem das sections para ContentPage
  const sections = [
    {
      type: 'text' as const,
      content:
        'As exposições virtuais a seguir foram inspiradas na antiga página do site. '+
        'A equipe está migrando gradualmente os materiais e imagens para o novo projeto React.'
    },
    { type: 'subtitle' as const, content: 'Exposições disponíveis' },
    // Imagens com legendas
    ...itensAntigos.map((item) => ({
      type: 'image' as const,
      content: `${item.img}|${item.alt}|${item.titulo}`,
      imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto', href: `/exposicoes/virtuais/${item.slug}` }
    })),
  ]

  return (
    <ContentPage
      title="Exposições Virtuais"
      subtitle="Explore o museu e suas coleções através de experiências digitais imersivas e interativas"
      sections={sections}
    />
  )
}
