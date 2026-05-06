/**
 * Seed: migra o conteúdo hardcoded de exposições virtuais e artistas para o Supabase.
 * Executar com: node --env-file=.env ./scripts/seed-exposicoes.mjs
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// --- EXPOSIÇÕES VIRTUAIS ---

const EXPOSICOES = [
  {
    titulo: 'O Museu Casa Borges em cartaz',
    slug: 'cartazes',
    descricao_curta: 'Cartazes das exposições realizadas pelo Museu Casa Borges.',
    imagem_capa: '/exposicoes/virtuais/cartaz112.jpg',
    publicado: true,
    ordem: 1,
    secoes: [
      { tipo: 'image', dados: { src: '/exposicoes/virtuais/cartaz112.jpg', alt: 'O Museu Casa Borges em cartaz', caption: 'Cartaz da exposição' } },
      { tipo: 'text', dados: { content: 'Exposição digital que reúne os cartazes das mostras realizadas pelo Museu Casa Borges ao longo dos anos, documentando a trajetória cultural da instituição.' } },
    ]
  },
  {
    titulo: 'Os Artistas do Museu Casa Borges',
    slug: 'artistas',
    descricao_curta: 'Galeria de artistas que expuseram suas obras no Museu Casa Borges.',
    imagem_capa: '/exposicoes/virtuais/artistas2.jpg',
    publicado: true,
    ordem: 2,
    secoes: [
      { tipo: 'subtitle', dados: { content: 'Galeria de artistas' } },
      {
        tipo: 'image_grid', dados: {
          items: [
            { src: '/exposicoes/artistas/Luis.jpeg', alt: 'Luis Carlos Moura', caption: 'Luis Carlos Moura Publicado em 20 de Dezembro, 2021', href: '/exposicoes/virtuais/artistas/luis' },
            { src: '/exposicoes/artistas/Francisco.jpg', alt: 'Francisco de Assis', caption: 'Francisco de Assis Publicado em 25 de Novembro, 2021', href: '/exposicoes/virtuais/artistas/francisco' },
            { src: '/exposicoes/artistas/Claudyo.jpg', alt: 'Claudyo Casares', caption: 'Claudyo Casares Publicado em 05 de Novembro, 2021', href: '/exposicoes/virtuais/artistas/claudyo' },
            { src: '/exposicoes/artistas/Carlos.jpeg', alt: 'Carlos Valeriano', caption: 'Carlos Valeriano Publicado em 27 de Outubro, 2021', href: '/exposicoes/virtuais/artistas/carlos' },
            { src: '/exposicoes/artistas/Luisb.jpeg', alt: 'Luis Borges', caption: 'Luis Borges Publicado em 06 de Outubro, 2021', href: '/exposicoes/virtuais/artistas/luisb' },
            { src: '/exposicoes/artistas/Maninho.jpeg', alt: 'Maninho', caption: 'Maninho Publicado em 29 de Setembro, 2021', href: '/exposicoes/virtuais/artistas/maninho' },
            { src: '/exposicoes/artistas/Judite.jpeg', alt: 'Judite Guimarães', caption: 'Judite Guimarães Publicado em 22 de Setembro, 2021', href: '/exposicoes/virtuais/artistas/judite' },
            { src: '/exposicoes/artistas/Joao.jpg', alt: 'João Vicente', caption: 'João Vicente Publicado em 15 de Setembro, 2021', href: '/exposicoes/virtuais/artistas/joao' },
          ]
        }
      },
    ]
  },
  {
    titulo: 'POVO BALATIPONÉ-UMUTINA: PRESENTE – PASSADO – FUTURO.',
    slug: 'balatipone-umutina',
    descricao_curta: 'Exposição sobre a história e cultura do povo indígena Balatiponé-Umutina.',
    imagem_capa: '/exposicoes/virtuais/cartaz191.jpg',
    publicado: true,
    ordem: 3,
    autor: 'Alessandra Ribeiro de Carvalho',
    secoes: [
      { tipo: 'image', dados: { src: '/exposicoes/balatipone-umutina/cartaz19.jpg', alt: 'Povo Balatiponé-Umutina', caption: 'Capa da exposição' } },
      { tipo: 'subtitle', dados: { content: 'I – História de contato do povo indígena Balatiponé-Umutina' } },
      { tipo: 'text', dados: { content: 'No passado o povo indígena Balatiponé-Umutina fazia parte da etnia Bororo e que, em determinado momento histórico afastou-se do grupo principal e subiu principalmente o curso do rio Paraguai. Por isso, seu tronco linguístico é Macro-jê, da Família Bororo.' } },
      { tipo: 'image', dados: { src: '/exposicoes/balatipone-umutina/foto1.jpg', alt: '"Índio Bororo", por Hercules Florence', caption: 'Fonte: Wikipédia Enciclopédia Livre' } },
      { tipo: 'image', dados: { src: '/exposicoes/balatipone-umutina/foto2.jpg', alt: 'Vista Google Maps da Terra Umutina', caption: 'Mapa de referência' } },
      { tipo: 'text', dados: { content: 'Conforme o relato dos anciões, as aldeias possuíam cerca de mil indígenas e localizavam-se na foz do rio Sepotuba, onde possuíam extensos roçados. Os ciclos econômicos vividos pela cidade de Barra do Bugres e região foram determinantes para a desestruturação econômica, social e cultural do povo, e reduziram drasticamente a população.' } },
      { tipo: 'image', dados: { src: '/exposicoes/balatipone-umutina/foto3.jpg', alt: 'Encontro do rio Bugres com rio Paraguai', caption: 'Foto: Nilson Guedes' } },
      { tipo: 'text', dados: { content: 'Foram constantes os conflitos com caçadores, poaieiros, madeireiros e garimpeiros que adentravam as matas e rios, invadindo o território habitado pelos Balatiponé-Umutina.' } },
      { tipo: 'subtitle', dados: { content: 'II – O povo Balatiponé-Umutina e sua terra' } },
      { tipo: 'text', dados: { content: 'A Terra Indígena Umutina está localizada no município de Barra do Bugres, região sudoeste de Mato Grosso, com 28.120 hectares de área demarcada e homologada. O povo vive em aldeias ao longo do rio Bugres, mantendo suas tradições e conhecimentos ancestrais.' } },
      { tipo: 'subtitle', dados: { content: 'III – Cultura e tradições' } },
      { tipo: 'text', dados: { content: 'O povo Balatiponé-Umutina mantém vivas suas manifestações culturais, incluindo a pintura corporal, rituais, artesanato e a língua materna. A educação escolar indígena é uma ferramenta fundamental para a preservação e revitalização cultural.' } },
    ]
  },
  {
    titulo: 'BARRA DO BUGRES: NATUREZA, HISTÓRIA E CULTURA.',
    slug: 'barra-do-bugres',
    descricao_curta: 'Exposição que retrata a diversidade natural e cultural de Barra do Bugres.',
    imagem_capa: '/exposicoes/virtuais/cartaz171.jpg',
    publicado: true,
    ordem: 4,
    autor: 'Alessandra Ribeiro de Carvalho',
    secoes: [
      { tipo: 'image', dados: { src: '/exposicoes/barra-do-bugres/cartaz17.jpg', alt: 'Barra do Bugres', caption: 'Capa da exposição' } },
      { tipo: 'text', dados: { content: 'Exposição que retrata a diversidade natural e cultural de Barra do Bugres, com registros históricos e relatos locais.' } },
      { tipo: 'subtitle', dados: { content: 'PATRIMÔNIO NATURAL' } },
      { tipo: 'text', dados: { content: 'Barra do Bugres tem uma grande biodiversidade por localizar-se numa zona de transição entre a bacia hidrográfica Amazônica e Platina, com rios piscosos – como rio Paraguai, Sepotuba e Bugres – e entre a Planície Serrana Mato-grossense, com cavernas, formações rochosas, inscrições rupestres, fauna e flora exuberantes, em especial os animais silvestres e as aves.' } },
      { tipo: 'subtitle', dados: { content: 'PATRIMÔNIO HISTÓRICO E CULTURAL' } },
      { tipo: 'text', dados: { content: 'A cidade de Barra do Bugres possui um rico patrimônio histórico e cultural, com construções antigas, festas tradicionais, culinária regional e manifestações artísticas que refletem a diversidade étnica de sua população.' } },
    ]
  },
  {
    titulo: 'COMUNIDADES QUILOMBOLAS DE BARRA DO BUGRES: MEMÓRIAS, SABERES E FAZERES.',
    slug: 'quilombos',
    descricao_curta: 'Memórias, saberes e fazeres das comunidades quilombolas de Barra do Bugres.',
    imagem_capa: '/exposicoes/virtuais/foto22.jpg',
    publicado: true,
    ordem: 5,
    autor: 'Alessandra Ribeiro de Carvalho',
    secoes: [
      { tipo: 'image', dados: { src: '/exposicoes/quilombos/foto22.jpg', alt: 'Comunidades Quilombolas', caption: 'Capa da exposição' } },
      { tipo: 'text', dados: { content: 'As comunidades quilombolas de Barra do Bugres guardam memórias, saberes e fazeres que resistem ao tempo. Esta exposição apresenta aspectos da história, cultura e cotidiano desses grupos.' } },
      { tipo: 'subtitle', dados: { content: 'HISTÓRIA E LUTA PELA TERRA' } },
      { tipo: 'text', dados: { content: 'As comunidades quilombolas de Barra do Bugres são formadas por descendentes de africanos escravizados que construíram seus quilombos na região, resistindo à opressão e preservando suas tradições culturais ao longo de gerações.' } },
      { tipo: 'subtitle', dados: { content: 'CULTURA E TRADIÇÕES' } },
      { tipo: 'text', dados: { content: 'A cultura quilombola se manifesta através da música, dança, culinária, religiosidade e artesanato. As festas religiosas, a capoeira e o uso de plantas medicinais são algumas das tradições mantidas vivas por essas comunidades.' } },
    ]
  },
  {
    titulo: 'ESPECIAL MULHERES',
    slug: 'mulheres',
    descricao_curta: 'Homenagem às mulheres que contribuíram para a história e cultura local.',
    imagem_capa: '/exposicoes/virtuais/foto1.png',
    publicado: true,
    ordem: 6,
    secoes: [
      { tipo: 'image', dados: { src: '/exposicoes/mulheres/foto1.png', alt: 'Especial Mulheres', caption: 'Capa da exposição' } },
      { tipo: 'text', dados: { content: 'Esta exposição especial homenageia mulheres que contribuíram significativamente para a história, cultura e desenvolvimento da região de Barra do Bugres. Suas histórias de vida são testemunhos de força, resiliência e dedicação.' } },
      { tipo: 'subtitle', dados: { content: 'MULHERES QUE FIZERAM HISTÓRIA' } },
      { tipo: 'text', dados: { content: 'Cada retrato e biografia apresentados nesta exposição conta a história de uma mulher que, com seu trabalho e dedicação, deixou um legado importante para a comunidade.' } },
    ]
  },
]

// --- ARTISTAS ---

const ARTISTAS = [
  {
    nome: 'Luis Carlos Moura',
    slug: 'luis',
    foto_url: '/exposicoes/artistas/Luis.jpeg',
    publicado: true,
    ordem: 1,
    secoes: [
      { tipo: 'image', dados: { src: '/exposicoes/artistas/Luis.jpeg', alt: 'Luis Carlos Moura', caption: 'Retrato' } },
      { tipo: 'subtitle', dados: { content: 'Biografia' } },
      { tipo: 'text', dados: { content: 'Artista tangaraense, vive no mundo do silêncio, em que seus olhos são a sua audição e suas mãos são o seu dizer. Expressa sua arte em telas, desenhos e esculturas para mostrar as belezas da nossa terra. As cores vibrantes representam a energia que essa terra possui.' } },
      { tipo: 'text', dados: { content: 'A arte de desenhar teve início na juventude, forma de acalmar as angústias causadas pela falta da audição. Com o tempo, ampliou habilidades para pintura em tela e escultura em madeira. Os trabalhos são realizados no lar e expostos em redes sociais, com apoio da família, amigos e professores.' } },
      { tipo: 'subtitle', dados: { content: 'Obras' } },
      { tipo: 'image', dados: { src: '/exposicoes/artistas/Luis/foto1.jpeg', alt: 'Obra 1', caption: '' } },
      { tipo: 'image', dados: { src: '/exposicoes/artistas/Luis/foto4.jpg', alt: 'Obra 4', caption: '' } },
      { tipo: 'image', dados: { src: '/exposicoes/artistas/Luis/foto8.jpg', alt: 'Obra 8', caption: '' } },
      { tipo: 'image', dados: { src: '/exposicoes/artistas/Luis/foto14.jpg', alt: 'Obra 14', caption: '' } },
    ]
  },
  {
    nome: 'Francisco de Assis',
    slug: 'francisco',
    foto_url: '/exposicoes/artistas/Francisco.jpg',
    publicado: true,
    ordem: 2,
    secoes: [
      { tipo: 'image', dados: { src: '/exposicoes/artistas/Francisco.jpg', alt: 'Francisco de Assis', caption: 'Retrato' } },
      { tipo: 'subtitle', dados: { content: 'Biografia' } },
      { tipo: 'text', dados: { content: 'Natural de Condado (PB), reside em Cuiabá desde 2005. Arquiteto e urbanista, pós-graduado em Sistema Viário e Mobilidade Urbana e em Arquitetura e Arte Sacra. Atua com projetos, desenhos, pinturas e xilogravuras. Série iniciada em 2014 registra aspectos afetivos do sertão nordestino.' } },
      { tipo: 'subtitle', dados: { content: 'Obras' } },
      { tipo: 'image', dados: { src: '/exposicoes/artistas/Francisco/foto2.jpg', alt: 'Macambira – técnica mista sobre papel', caption: '' } },
      { tipo: 'image', dados: { src: '/exposicoes/artistas/Francisco/foto3.jpg', alt: 'Casas e Jatobás – acrílico sobre papel', caption: '' } },
      { tipo: 'image', dados: { src: '/exposicoes/artistas/Francisco/foto8.jpg', alt: 'Açude Condado – acrílico sobre papel', caption: '' } },
    ]
  },
  {
    nome: 'Claudyo Casares',
    slug: 'claudyo',
    foto_url: '/exposicoes/artistas/Claudyo.jpg',
    publicado: true,
    ordem: 3,
    secoes: [
      { tipo: 'image', dados: { src: '/exposicoes/artistas/Claudyo.jpg', alt: 'Claudyo Casares', caption: 'Retrato' } },
      { tipo: 'subtitle', dados: { content: 'Biografia' } },
      { tipo: 'text', dados: { content: 'Artista visual nascido em Barra do Bugres – MT. Suas obras exploram as tradições culturais mato-grossenses, a natureza do cerrado e o universo indígena, utilizando diversas técnicas como pintura em tela, aquarela e desenho.' } },
      { tipo: 'subtitle', dados: { content: 'Obras' } },
      { tipo: 'image', dados: { src: '/exposicoes/artistas/Claudyo/foto1.jpeg', alt: 'Obra 1', caption: '' } },
    ]
  },
  {
    nome: 'Carlos Valeriano',
    slug: 'carlos',
    foto_url: '/exposicoes/artistas/Carlos.jpeg',
    publicado: true,
    ordem: 4,
    secoes: [
      { tipo: 'image', dados: { src: '/exposicoes/artistas/Carlos.jpeg', alt: 'Carlos Valeriano', caption: 'Retrato' } },
      { tipo: 'subtitle', dados: { content: 'Biografia' } },
      { tipo: 'text', dados: { content: 'Artista plástico e professor de artes, Carlos Valeriano dedica-se à pintura e ao ensino de técnicas artísticas. Suas obras retratam paisagens e cenas do cotidiano mato-grossense.' } },
      { tipo: 'subtitle', dados: { content: 'Obras' } },
    ]
  },
  {
    nome: 'Luis Borges',
    slug: 'luisb',
    foto_url: '/exposicoes/artistas/Luisb.jpeg',
    publicado: true,
    ordem: 5,
    secoes: [
      { tipo: 'image', dados: { src: '/exposicoes/artistas/Luisb.jpeg', alt: 'Luis Borges', caption: 'Retrato' } },
      { tipo: 'subtitle', dados: { content: 'Biografia' } },
      { tipo: 'text', dados: { content: 'Luis Borges é artista visual radicado em Barra do Bugres. Suas criações refletem a vivência no interior de Mato Grosso, com forte influência da natureza local e das tradições ribeirinhas.' } },
      { tipo: 'subtitle', dados: { content: 'Obras' } },
    ]
  },
  {
    nome: 'Maninho',
    slug: 'maninho',
    foto_url: '/exposicoes/artistas/Maninho.jpeg',
    publicado: true,
    ordem: 6,
    secoes: [
      { tipo: 'image', dados: { src: '/exposicoes/artistas/Maninho.jpeg', alt: 'Maninho', caption: 'Retrato' } },
      { tipo: 'subtitle', dados: { content: 'Biografia' } },
      { tipo: 'text', dados: { content: 'Artista popular conhecido como Maninho, dedica-se à escultura e artesanato utilizando materiais naturais da região. Suas peças representam a fauna e flora do cerrado mato-grossense.' } },
      { tipo: 'subtitle', dados: { content: 'Obras' } },
    ]
  },
  {
    nome: 'Judite Guimarães',
    slug: 'judite',
    foto_url: '/exposicoes/artistas/Judite.jpeg',
    publicado: true,
    ordem: 7,
    secoes: [
      { tipo: 'image', dados: { src: '/exposicoes/artistas/Judite.jpeg', alt: 'Judite Guimarães', caption: 'Retrato' } },
      { tipo: 'subtitle', dados: { content: 'Obras' } },
    ]
  },
  {
    nome: 'João Vicente',
    slug: 'joao',
    foto_url: '/exposicoes/artistas/Joao.jpg',
    publicado: true,
    ordem: 8,
    secoes: [
      { tipo: 'image', dados: { src: '/exposicoes/artistas/Joao.jpg', alt: 'João Vicente', caption: 'Retrato' } },
      { tipo: 'subtitle', dados: { content: 'Biografia' } },
      { tipo: 'text', dados: { content: 'João Vicente é artista visual que trabalha com fotografia e pintura. Seus trabalhos documentam a paisagem e o cotidiano de Barra do Bugres e região.' } },
      { tipo: 'subtitle', dados: { content: 'Obras' } },
    ]
  },
]

async function main() {
  console.log('Iniciando seed de exposições virtuais...')

  let artistasExpoId = null

  for (const expo of EXPOSICOES) {
    const { secoes, ...expoData } = expo

    const { data: inserted, error } = await supabase
      .from('exposicoes_virtuais')
      .insert(expoData)
      .select('id, slug')
      .single()

    if (error) {
      console.error(`Erro ao inserir "${expo.titulo}":`, error.message)
      continue
    }

    console.log(`  ✓ Exposição "${expo.titulo}" (id: ${inserted.id})`)

    if (expo.slug === 'artistas') {
      artistasExpoId = inserted.id
    }

    if (secoes.length > 0) {
      const rows = secoes.map((s, i) => ({
        exposicao_id: inserted.id,
        tipo: s.tipo,
        dados: s.dados,
        ordem: i,
      }))

      const { error: secError } = await supabase
        .from('exposicoes_virtuais_secoes')
        .insert(rows)

      if (secError) {
        console.error(`  ✗ Erro nas seções de "${expo.titulo}":`, secError.message)
      } else {
        console.log(`    → ${rows.length} seções inseridas`)
      }
    }
  }

  // --- Artistas ---
  if (!artistasExpoId) {
    console.error('Exposição "artistas" não encontrada. Pulando artistas.')
    return
  }

  console.log('\nInserindo artistas...')

  for (const artista of ARTISTAS) {
    const { secoes, ...artistaData } = artista

    const { data: inserted, error } = await supabase
      .from('artistas_exposicao')
      .insert({ ...artistaData, exposicao_id: artistasExpoId })
      .select('id')
      .single()

    if (error) {
      console.error(`  Erro ao inserir artista "${artista.nome}":`, error.message)
      continue
    }

    console.log(`  ✓ Artista "${artista.nome}" (id: ${inserted.id})`)

    if (secoes.length > 0) {
      const rows = secoes.map((s, i) => ({
        artista_id: inserted.id,
        tipo: s.tipo,
        dados: s.dados,
        ordem: i,
      }))

      const { error: secError } = await supabase
        .from('artistas_exposicao_secoes')
        .insert(rows)

      if (secError) {
        console.error(`    ✗ Erro nas seções de "${artista.nome}":`, secError.message)
      } else {
        console.log(`    → ${rows.length} seções inseridas`)
      }
    }
  }

  console.log('\nSeed concluído com sucesso!')
}

main().catch((err) => {
  console.error('Erro fatal:', err)
  process.exit(1)
})
