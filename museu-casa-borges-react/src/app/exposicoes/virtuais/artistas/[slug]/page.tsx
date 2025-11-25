import ContentPage from '@/components/content/ContentPage'

type Params = { slug: string }

/**
 * Página de artista da exposição virtual "Os Artistas do Museu Casa Borges".
 * Renderiza biografia e obras com base no conteúdo migrado da pasta INDEX.
 */
export default async function ArtistaVirtualPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params

  const ARTISTES: Record<string, {
    title: string
    subtitle?: string
    sections: Array<{ type: 'text' | 'subtitle' | 'image'; content: string; imageProps?: any }>
    author?: string
  }> = {
    luis: {
      title: 'Luis Carlos Moura',
      subtitle: 'Publicado em 20 de Dezembro, 2021',
      sections: [
        { type: 'image', content: '/exposicoes/artistas/Luis.jpeg|Luis Carlos Moura|Retrato', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'subtitle', content: 'Biografia' },
        { type: 'text', content: 'Artista tangaraense, vive no mundo do silêncio, em que seus olhos são a sua audição e suas mãos são o seu dizer. Expressa sua arte em telas, desenhos e esculturas para mostrar as belezas da nossa terra. As cores vibrantes representam a energia que essa terra possui.' },
        { type: 'text', content: 'A arte de desenhar teve início na juventude, forma de acalmar as angústias causadas pela falta da audição. Com o tempo, ampliou habilidades para pintura em tela e escultura em madeira. Os trabalhos são realizados no lar e expostos em redes sociais, com apoio da família, amigos e professores.' },
        { type: 'subtitle', content: 'Obras' },
        { type: 'image', content: '/exposicoes/artistas/Luis/foto1.jpeg|Obra 1|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/artistas/Luis/foto4.jpg|Obra 4|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/artistas/Luis/foto8.jpg|Obra 8|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/artistas/Luis/foto14.jpg|Obra 14|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } }
      ]
    },
    francisco: {
      title: 'Francisco de Assis',
      subtitle: 'Publicado em 25 de Novembro, 2021',
      sections: [
        { type: 'image', content: '/exposicoes/artistas/Francisco.jpg|Francisco de Assis|Retrato', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'subtitle', content: 'Biografia' },
        { type: 'text', content: 'Natural de Condado (PB), reside em Cuiabá desde 2005. Arquiteto e urbanista, pós-graduado em Sistema Viário e Mobilidade Urbana e em Arquitetura e Arte Sacra. Atua com projetos, desenhos, pinturas e xilogravuras. Série iniciada em 2014 registra aspectos afetivos do sertão nordestino.' },
        { type: 'subtitle', content: 'Obras' },
        { type: 'image', content: '/exposicoes/artistas/Francisco/foto2.jpg|Macambira – técnica mista sobre papel|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/artistas/Francisco/foto3.jpg|Casas e Jatobás – acrílico sobre papel|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/artistas/Francisco/foto8.jpg|Açude Condado – acrílico sobre papel|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } }
      ]
    },
    claudyo: {
      title: 'Claudyo Casares',
      subtitle: 'Publicado em 05 de Novembro, 2021',
      sections: [
        { type: 'image', content: '/exposicoes/artistas/Claudyo.jpg|Claudyo Casares|Retrato', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'subtitle', content: 'Biografia' },
        { type: 'text', content: 'Nascido em Tietê (SP), radicado em Cuiabá há mais de 30 anos. Desenho arquitetônico de 1977 a 1997; em 1997 decide viver integralmente como artista plástico. Estudou Arquitetura e Urbanismo na UNEMAT.' },
        { type: 'text', content: 'Sua obra passeia por referências de Picasso, Matisse e Mondrian. Com a releitura da “Guernica”, participou de eventos na Europa e recebeu prêmios. Em “Gatonças”, reflete impactos ambientais nos biomas de Mato Grosso.' },
        { type: 'subtitle', content: 'Obras' },
        { type: 'image', content: '/exposicoes/artistas/Claudyo/foto1.jpg|Guernica: Um pesadelo que não termina – Acrílico|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/artistas/Claudyo/foto2.jpg|Releitura de “A Dança” de Matisse – Acrílico|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/artistas/Claudyo/foto4.jpg|Gatonças – Acrílico|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } }
      ]
    },
    carlos: {
      title: 'Carlos Pina',
      subtitle: 'Publicado em 25 de Outubro, 2021',
      sections: [
        { type: 'image', content: '/exposicoes/artistas/Carlos.jpg|Carlos Pina|Retrato', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'subtitle', content: 'Biografia' },
        { type: 'text', content: 'Cuiabano, arquiteto e urbanista; especialização em Iluminação e Design de Interiores. Desde 2018 expõe obras nas redes e ministra cursos. Fundador do Urban Sketchers Cuiabá. Participou de mostras e tem ilustrações publicadas.' },
        { type: 'text', content: 'Inspirações em paisagens urbanas, predominando aquarela, marcadores e técnicas mistas. Produção constante por observação direta e acervo fotográfico.' },
        { type: 'subtitle', content: 'Obras' },
        { type: 'image', content: '/exposicoes/artistas/Carlos/foto1.png|Siriri Cuiabano – desenho em tablet|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/artistas/Carlos/foto3.png|Armazém Oliveira – tablet|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/artistas/Carlos/foto8.jpg|Rio Paraguai – aquarela e nanquim|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } }
      ]
    },
    luisb: {
      title: 'Luis Badaró',
      subtitle: 'Publicado em 16 de Setembro, 2021',
      sections: [
        { type: 'image', content: '/exposicoes/artistas/LuisB.jpg|Luis Badaró|Retrato', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'subtitle', content: 'Biografia' },
        { type: 'text', content: 'Artista plástico e arquiteto de Rondonópolis. Mistura o real e o imaginário, transformando pensamentos e sentimentos em imagens visíveis. Obras em diferentes cidades no Brasil e exterior.' },
        { type: 'subtitle', content: 'Obras' },
        { type: 'image', content: '/exposicoes/artistas/LuisB/foto1.jpg|Longa Viagem – 100x80|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/artistas/LuisB/foto4.jpg|Manifesto Inconsciente – acrílica|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/artistas/LuisB/foto9.jpg|Sonho Lúcido – acrílica sobre madeira|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } }
      ]
    },
    maninho: {
      title: 'Maninho',
      subtitle: 'Publicado em 31 de Agosto, 2021',
      sections: [
        { type: 'image', content: '/exposicoes/artistas/Maninho.jpg|Maninho|Retrato', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'subtitle', content: 'Biografia' },
        { type: 'text', content: 'Manoel José Faria Oliveira, morador de Barra do Bugres. Professor de ciências biológicas por 15 anos; coordenador do projeto “Ponto de Cultura Me Chama Que Eu Vou”. Desde 2017 desenvolve técnica de pintura sobre tela.' },
        { type: 'subtitle', content: 'Obras' },
        { type: 'image', content: '/exposicoes/artistas/Maninho/01.jpg|Obra 1|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/artistas/Maninho/04.jpg|Obra 4|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/artistas/Maninho/07.jpg|Obra 7|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } }
      ]
    },
    judite: {
      title: 'Judite Malaquias',
      subtitle: 'Publicado em 05 de Agosto, 2021',
      sections: [
        { type: 'image', content: '/exposicoes/artistas/Judite.jpg|Judite Malaquias|Retrato', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'subtitle', content: 'Obras' },
        { type: 'image', content: '/exposicoes/artistas/Judite/07.jpg|Obra 7|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/artistas/Judite/10.jpg|Obra 10|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/artistas/Judite/14.jpg|Obra 14|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } }
      ]
    },
    joao: {
      title: 'João Pedro de Arruda Neto',
      subtitle: 'Publicado em 27 de Junho, 2021',
      sections: [
        { type: 'image', content: '/exposicoes/artistas/Joao.jpeg|João Pedro de Arruda Neto|Retrato', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'subtitle', content: 'Biografia' },
        { type: 'text', content: 'Nasceu em Cuiabá em 1935. Estudou na École Nationale Supérieure des Beaux-Arts (Paris). A partir de 1961, em Poconé, pintou paisagens, naturezas-mortas e retratos, inicialmente a óleo; depois adotou técnica com linhas em crayon. Participou de diversas exposições no Brasil e exterior.' },
        { type: 'subtitle', content: 'Obras' },
        { type: 'image', content: '/exposicoes/artistas/João/01.jpg|Acrílica sobre tela|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/artistas/João/05.jpg|Óleo sobre tela|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/artistas/João/09.JPG|Obra|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } }
      ]
    }
  }

  const data = ARTISTES[slug]
  if (!data) {
    return (
      <ContentPage
        title="Artista não encontrado"
        subtitle="Volte à galeria e escolha outro artista"
        sections={[{ type: 'text', content: 'Conteúdo indisponível.' }]}
        variant="compact"
      />
    )
  }

  return (
    <ContentPage
      title={data.title}
      subtitle={data.subtitle}
      sections={data.sections}
      author={data.author}
      variant="compact"
      contentWidthClass="max-w-5xl"
    />
  )
}