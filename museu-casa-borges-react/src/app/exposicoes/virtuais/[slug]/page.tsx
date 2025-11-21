import ContentPage from '@/components/content/ContentPage'
import { notFound } from 'next/navigation'

type Params = { slug: string }

/**
 * ExposicaoVirtualPage
 *
 * Página dinâmica para cada exposição virtual. Recebe o parâmetro "slug"
 * e renderiza o conteúdo correspondente usando o componente ContentPage.
 * Inclui tratamento de erros quando o slug não possui conteúdo mapeado.
 */
export default function ExposicaoVirtualPage({ params }: { params: Params }) {
  const { slug } = params

  /**
   * Mapa de conteúdo das exposições virtuais.
   * Quando expandirmos o sistema, basta adicionar novos slugs aqui.
   */
  const EXPO_CONTENT: Record<string, {
    title: string
    subtitle?: string
    sections: Array<{ type: 'text' | 'subtitle' | 'image'; content: string; imageProps?: any }>
    author?: string
  }> = {
    'balatipone-umutina': {
      title: 'POVO BALATIPONÉ-UMUTINA: PRESENTE – PASSADO – FUTURO.',
      subtitle: 'Publicado em 26 de setembro de 2020',
      sections: [
        {
          type: 'image',
          // Capa da exposição (imagem migrada do diretório INDEX/balatiponé)
          content: '/exposicoes/balatipone-umutina/cartaz19.jpg|Povo Balatiponé-Umutina|Capa da exposição',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        {
          type: 'subtitle',
          content: 'I – História de contato do povo indígena Balatiponé-Umutina'
        },
        {
          type: 'text',
          content:
            'No passado o povo indígena Balatiponé-Umutina fazia parte da etnia Bororo e que, em determinado momento histórico afastou-se do grupo principal e subiu principalmente o curso do rio Paraguai. Por isso, seu tronco linguístico é Macro-jê, da Família Bororo.'
        },
        {
          type: 'image',
          content:
            '/exposicoes/balatipone-umutina/foto1.jpg|“Índio Bororo”, por Hercules Florence, pintor francês, durante a Expedição Langsdorff à Amazônia (1825 – 1829).|Fonte: Wikipédia Enciclopédia Livre',
          imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' }
        },
        {
          type: 'image',
          content:
            '/exposicoes/balatipone-umutina/foto2.jpg|Vista Google Maps da Terra Umutina e a área do Rio Sepotuba – Cerca de 160km a pé|Mapa de referência',
          imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' }
        },
        {
          type: 'text',
          content:
            'Conforme o relato dos anciões, as aldeias possuíam cerca de mil indígenas e localizavam-se na foz do rio Sepotuba, onde possuíam extensos roçados. Os ciclos econômicos vividos pela cidade de Barra do Bugres e região foram determinantes para a desestruturação econômica, social e cultural do povo, e reduziram drasticamente a população.'
        },
        {
          type: 'image',
          content:
            '/exposicoes/balatipone-umutina/foto3.jpg|Encontro do rio Bugres com rio Paraguai; à direita (parte superior) é a região que localiza a TI Balatiponé-Umutina.|Foto: Nilson Guedes',
          imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' }
        },
        {
          type: 'text',
          content:
            'Foram constantes os conflitos com caçadores, poaieiros, madeireiros e garimpeiros que adentravam as matas e rios, invadindo o território habitado pelos Balatiponé-Umutina.'
        },
        {
          type: 'image',
          content:
            '/exposicoes/balatipone-umutina/foto4.jpg|Monumento em Barra do Bugres em homenagem aos poaieiros.|Registro de 2020',
          imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' }
        },
        {
          type: 'text',
          content:
            'O ciclo econômico da poaia na região do Território Indígena foi um conflito econômico, cultural, social e ambiental complexo. Se por um lado desenvolvia economicamente o município, por outro dizimava o povo originário Balatiponé.'
        },
        {
          type: 'image',
          content:
            '/exposicoes/balatipone-umutina/foto5.jpg|Foto José Louro restaurada por Mario Friedlander.|Os Umutina',
          imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' }
        },
        {
          type: 'image',
          content:
            '/exposicoes/balatipone-umutina/foto6.jpg|Marechal Cândido Rondon – responsável pela implantação dos ramais telegráficos (1911) na região.|Fonte: Wikipédia',
          imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' }
        },
        {
          type: 'text',
          content:
            'As instalações dos ramais telegráficos em 1911 na região ligaram a capital, o interior e outros estados. Como os Balatiponé-Umutina tornaram-se um empecilho para as obras, Rondon e sua equipe elaboraram planos para sua “pacificação”.'
        },
        {
          type: 'image',
          content:
            '/exposicoes/balatipone-umutina/foto7.jpg|O ritual de boas-vindas Umutina sempre utilizou o arco e a flecha; hoje a aldeia tem alguns dos melhores arqueiros indígenas do Brasil.|Foto: Comunidade Indígena Umutina',
          imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' }
        },
        {
          type: 'text',
          content:
            'Após a pacificação, os Balatiponé-Umutina viveram um período triste de sua história: o contato permanente com o SPI resultou na transmissão de doenças (principalmente sarampo e pneumonia), diminuindo a população e enfraquecendo a língua e os costumes.'
        },
        {
          type: 'image',
          content:
            '/exposicoes/balatipone-umutina/foto8.jpg|Penas, dentes de animais de caça e pinturas corporais sempre fizeram parte da cultura Balatiponé.|Foto: José Louro; restauração de Mario Friedlander',
          imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' }
        },
        {
          type: 'image',
          content:
            '/exposicoes/balatipone-umutina/foto9.jpg|A mulher Umutina usava cabelos curtos, saias de algodão e adornos de plumagem.|Foto: José Louro; restauração de Mário Friedlander',
          imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' }
        },
        {
          type: 'text',
          content:
            'Deste período, restaram quinze bravos guerreiros e guerreiras que permaneceram na mata, cultivando conhecimentos tradicionais na aldeia Massepô, onde foram coletados elementos da língua e cultura Balatiponé-Umutina para as gerações presentes e futuras.'
        },
        {
          type: 'image',
          content:
            '/exposicoes/balatipone-umutina/foto10.jpg|Trajes usados em rituais e apresentações culturais representam uma cultura integrada à natureza.|Foto: Mário Friedlander',
          imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' }
        },
        {
          type: 'subtitle',
          content: 'II – Cultura material e imaterial Balatiponé-Umutina'
        },
        {
          type: 'text',
          content:
            'A cultura material e imaterial do povo Balatiponé-Umutina está ligada ao seu modo de pensar e conceber a vida, o mundo e o universo. Desta cosmovisão nascem narrativas míticas que contam a origem do povo e o nascimento de outras etnias e do não índio.'
        },
        {
          type: 'image',
          content:
            '/exposicoes/balatipone-umutina/foto11.jpg|Apresentação cultural Umutina na Caminhada da Natureza.|Foto: Alessandra Ribeiro de Carvalho',
          imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' }
        },
        {
          type: 'text',
          content:
            'Os adornos masculinos caracterizam-se pelo uso das plumagens representadas pelo xúare (bracelete), bolo (diadema), hákikano (cocar), mitotanobo (brincos). Os jukuitáokopó (colar de dente de onça), botorikaréokopó (colares de dente de queixada) e joywaokopó (colar de dente de cateto).'
        },
        {
          type: 'image',
          content: '/exposicoes/balatipone-umutina/foto19.jpg|Apresentação cultural Caminhada da Natureza.|Foto: Alessandra Carvalho (2013)',
          imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' }
        },
        {
          type: 'text',
          content:
            'A ametá (saia tubular) é feita de fibras de tucum ou algodão; bracelete de penugem e colares com dentes de animais ou sementes coloridas compõem as vestimentas tradicionais.'
        },
        {
          type: 'image',
          content: '/exposicoes/balatipone-umutina/foto20.jpg|As tradições das vestimentas são orgulho do povo Umutina.|Foto: Leocílio Boroponepá Filho',
          imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' }
        },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto21.jpg|Alunas em apresentações culturais.|Foto: Leocílio Boroponepá Filho', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto22.jpg|Registro cultural|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto23.jpg|Registro cultural|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto24.jpg|Registro cultural|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto25.jpg|Registro cultural|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto26.jpg|Registro cultural|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto27.jpg|Registro cultural|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto28.jpg|Registro cultural|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto29.jpg|Registro cultural|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto30.jpg|Registro cultural|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto31.jpg|Registro cultural|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto32.jpg|Registro cultural|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto33.jpg|Registro cultural|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        {
          type: 'text',
          content:
            'A pintura corporal masculina e feminina utiliza jenipapo, urucum e argila branca. As masculinas simbolizam o tamanduá-bandeira e peixes como cachara e pintado.'
        },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto34.jpg|Cada pintura corporal tem significado próprio.|Foto: João Mário Adrião', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto35.jpg|Pinturas remetem aos animais e peixes da Terra Umutina.|Foto: Leocílio Boroponepá Filho', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto36.jpg|Pintura corporal|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto37.jpg|A pintura corporal é usada em rituais, apresentações, caça e outras atividades tradicionais.|Fotos: João Mário Arruda Adrião', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        {
          type: 'text',
          content:
            'As pinturas corporais femininas simbolizam formas de couro de cobras e o peixe cachara, e têm como objetivo ressaltar a musculatura nas danças.'
        },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto38.jpg|Ritual Umutina em apresentação cultural.|Foto: Alessandra Carvalho (2011)', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto39.jpg|A pintura corporal masculina destaca a musculatura.|Foto: Edivando Zakimayer', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        {
          type: 'text',
          content:
            'Os instrumentos musicais incluem chocalhos de pé e mão, flautas de taboca e buriti, e chifre de boi. As artes incluem cestarias feitas de taboca, palha de babaçu, talas de buriti e cipós.'
        },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto40.jpg|Chocalhos.|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto41.jpg|Tecer palhas é uma arte milenar.|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto42.jpg|O artesanato indígena Umutina retrata também sua identidade.|Fotos: Alessandra Carvalho', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'subtitle', content: 'III – A presença da educação escolar oficial entre o povo Balatiponé-Umutina' },
        {
          type: 'text',
          content:
            'A identidade Balatiponé-Umutina e a manutenção dos conhecimentos tradicionais vêm sendo fortalecidos na Escola Estadual Julá Paré, garantindo direitos como o Território.'
        },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto43.jpg|Foto de José Louro restaurada por Mário Friedlander.|Educação e memória', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        {
          type: 'text',
          content:
            'O primeiro momento da educação escolar oficial inicia-se com a equipe de Rondon e o Posto Fraternidade Umutina, buscando apagar a identidade indígena e proibindo a língua; posteriormente, a partir do fim dos anos 1980, professores indígenas assumem a sala e os anciões passam a compartilhar conhecimentos.'
        },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto44.jpg|Pintura na parede do antigo prédio do SPI.|Foto: Comunidade Indígena Umutina', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto45.jpg|Professor Márcio com alunos da E.E. Julá Paré.|Foto: Comunidade Indígena Umutina', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto46.jpg|Anciãos passam a compartilhar conhecimentos por meio da escola.|Foto: Comunidade Indígena Umutina', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto47.jpg|A língua materna passa a ser usada como currículo escolar.|Foto: Comunidade Indígena Umutina', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/balatipone-umutina/foto48.jpg|Registro escolar|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } }
      ],
      author: 'Marcio Monzilar Corezomaé – Professor/Mestre da Escola Estadual Julá Paré, 2019.'
    },
    'cartazes': {
      title: 'O Museu Casa Borges em cartaz',
      subtitle: 'Seleção de cartazes de exposições e eventos',
      sections: [
        {
          type: 'image',
          content: '/exposicoes/cartazes/cartaz112.jpg|O Museu Casa Borges em cartaz|Capa da exposição',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        {
          type: 'text',
          content:
            'Coleção de cartazes históricos de atividades do Museu Casa Borges e seus parceiros, preservando memória visual de eventos e exposições.'
        }
      ]
    },
    // Exposição: Os Artistas do Museu Casa Borges
    // Esta entrada reúne mini perfis com imagens e datas de publicação dos artistas apresentados na página INDEX/Artista.html.
    'artistas': {
      title: 'Os Artistas do Museu Casa Borges',
      subtitle: 'Obras e trajetórias de artistas locais e regionais',
      sections: [
        {
          type: 'image',
          content: '/exposicoes/artistas/artistas2.jpg|Os Artistas do Museu Casa Borges|Capa da exposição',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        {
          type: 'subtitle',
          content: 'Galeria de artistas'
        },
        {
          type: 'image',
          content: '/exposicoes/artistas/Luis.jpeg|Luis Carlos Moura|Publicado em 20 de Dezembro, 2021',
          imageProps: { width: 640, height: 640, className: 'max-w-xl mx-auto' }
        },
        {
          type: 'image',
          content: '/exposicoes/artistas/Francisco.jpg|Francisco de Assis|Publicado em 25 de Novembro, 2021',
          imageProps: { width: 640, height: 640, className: 'max-w-xl mx-auto' }
        },
        {
          type: 'image',
          content: '/exposicoes/artistas/Claudyo.jpg|Claudyo Casares|Publicado em 05 de Novembro, 2021',
          imageProps: { width: 640, height: 640, className: 'max-w-xl mx-auto' }
        },
        {
          type: 'image',
          content: '/exposicoes/artistas/Carlos.jpg|Carlos Pina|Publicado em 25 de Outubro, 2021',
          imageProps: { width: 640, height: 640, className: 'max-w-xl mx-auto' }
        },
        {
          type: 'image',
          content: '/exposicoes/artistas/LuisB.jpg|Luis Badaró|Publicado em 16 de Setembro, 2021',
          imageProps: { width: 640, height: 640, className: 'max-w-xl mx-auto' }
        },
        {
          type: 'image',
          content: '/exposicoes/artistas/Maninho.jpg|Maninho|Publicado em 31 de Agosto, 2021',
          imageProps: { width: 640, height: 640, className: 'max-w-xl mx-auto' }
        },
        {
          type: 'image',
          content: '/exposicoes/artistas/Judite.jpg|Judite Malaquias|Publicado em 05 de Agosto, 2021',
          imageProps: { width: 640, height: 640, className: 'max-w-xl mx-auto' }
        },
        {
          type: 'image',
          content: '/exposicoes/artistas/Joao.jpeg|João Pedro de Arruda Neto|Publicado em 27 de Junho, 2021',
          imageProps: { width: 640, height: 640, className: 'max-w-xl mx-auto' }
        }
      ]
    },
    'barra-do-bugres': {
      title: 'BARRA DO BUGRES: NATUREZA, HISTÓRIA E CULTURA.',
      subtitle: 'Paisagens, patrimônio e memória da cidade',
      sections: [
        {
          type: 'image',
          content: '/exposicoes/barra-do-bugres/28.jpg|Barra do Bugres|Capa da exposição',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        {
          type: 'text',
          content:
            'Exposição que retrata a diversidade natural e cultural de Barra do Bugres, com registros históricos e relatos locais.'
        },
        {
          type: 'subtitle',
          content: 'PATRIMÔNIO NATURAL'
        },
        {
          type: 'text',
          content:
            'Barra do Bugres tem uma grande biodiversidade por localizar-se numa zona de transição entre a bacia hidrográfica Amazônica e Platina, com rios piscosos – como rio Paraguai, Sepotuba e Bugres – e entre a Planície Serrana Mato-grossense, com cavernas, cânions, formações rochosas, inscrições rupestres, fauna e flora exuberantes, em especial os animais silvestres e as aves.\nAutoria: Alessandra Ribeiro de Carvalho.'
        },
        { type: 'image', content: '/exposicoes/barra-do-bugres/1.jpg|RIO JUBA – Por: Anderson Portilho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/2.jpg|RIO JUBA – Por: Anderson Portilho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/3.jpg|RIO JUBA – Por: Anderson Portilho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/4.jpg|RIO JUBA – Por: Anderson Portilho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/5.webp|RIO PARAGUAI – Por: João Mário de Arruda Adrião|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/6.webp|RIO PARAGUAI – Por: João Mário de Arruda Adrião|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/7.webp|Garganta Camarinha, Rio Jauquara – Por: Miguel Santana|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/8.webp|Vão, Rio Paraguai – Por: Lara Nunes|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/9.webp|Cânion na Serra Camarinha – Por: Nilson Guedes|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/10.webp|Pescador, Rio Paraguai – Por: Lara Nunes|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/11.webp|Pescadores, Rio Paraguai – Por: Lara Nunes|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/12.webp|Rio Paraguai – Por: Kelly Serschon|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/13.webp|Ponte sobre Rio Paraguai – Por: Kelly Serschon|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/14.webp|Gruta na Serra das Araras – Por: Rayssa Gabriely Alves|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/15.webp|Arara e céu refletidos nas águas do Rio Bugres – Por: João Mário de Arruda Adrião|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        {
          type: 'subtitle',
          content: 'PATRIMÔNIO ARTÍSTICO E CULTURAL'
        },
        {
          type: 'text',
          content:
            'A cidade de Barra do Bugres tem sua fundação no final do século XIX, e em 1944 é criado o município de Barra do Bugres, com seu território desmembrado dos municípios de Diamantino, Cáceres e Rosário Oeste. A exploração da poaia, erva cujas raízes possuem efeitos terapêuticos, deu início ao ciclo de crescimento econômico do município, influenciando na formação populacional de grande diversidade étnica, composta de descendentes quilombolas, indígenas, migrantes do sul, sudeste e nordeste do país, gerando uma grande diversidade cultural e artística em Barra do Bugres, como as comunidades tradicionais indígenas e remanescentes quilombolas, suas manifestações culturais, a arquitetura vernacular, as festas tradicionais, como a de Santa Cruz, o festival regional de pesca de Barra do Bugres, e as tradições das danças de Siriri e São Gonçalo.\nAutoria: Alessandra Ribeiro de Carvalho.'
        },
        { type: 'image', content: '/exposicoes/barra-do-bugres/16.webp|Fogão a lenha de uma casa quilombola – Foto: João Mário de Arruda Adrião|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/17.jpg|Apresentação cultural – Foto: Rafael Bento|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/18.webp|Tecer: Arte Umutina – Por: Alessandra Ribeiro de Carvalho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/19.webp|Indígena Umutina – Foto: Mário Friedlander|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/20.jpg|Guerreiros Umutina – Por: Leocílio Boroponepá Filho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/21.webp|Indígena Umutina – Foto: Leocílio Boroponepá Filho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/22.webp|Pesca com timbó – Por: João Mário de Arruda Adrião|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/23.webp|Traje Umutina – Por: Leocílio Boroponepá Filho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/24.webp|Indígena Umutina – Por: Leocílio Boroponepá Filho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/25.webp|Indígena Umutina – Por: Mário Friedlander|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/26.webp|Umutinas – Por: Mário Friedlander|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/27.png|Tradições bugrenses – Foto: Rafael Bento|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/28.jpg|Siriri – Por: Maria Inez|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/29.webp|Viola de cocho – Por: Alessandra Ribeiro de Carvalho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/30.webp|Judite Malaquias, artista plástica, no Museu Casa Borges – Por: Lara Nunes|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/31.webp|Judite Malaquias, artista plástica – Por: Lara Nunes|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/32.webp|Pesca na escadaria do Rio Paraguai – Por: Kelly Serschon|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/33.webp|Festival de pesca no Rio Paraguai – Por: Nilson Guedes|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/34.jpg|Festival de pesca, Rio Paraguai – Por: João Mário de Arruda Adrião|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/35.webp|Festival de pesca, Rio Paraguai – Por: Nilson Guedes|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/36.webp|Festival de pesca, Rio Paraguai – Por: Nilson Guedes|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        {
          type: 'subtitle',
          content: 'PATRIMÔNIO ARQUITETÔNICO'
        },
        {
          type: 'text',
          content:
            'No final do século XIX, em terras do povo indígena Umutina às margens do Rio Paraguai, grupos procedentes de Cuiabá adentraram o sertão em busca da raiz da poaia, que se destacava na economia exportadora de Mato Grosso pelo porto de Cáceres. Essa busca fez surgir o povoado na confluência dos rios Bugres e Paraguai, que se tornou a cidade de Barra do Bugres. Ainda resistem construções ladeadas por ruas de paralelepípedos que evocam a memória do tempo da poaia.\nAutoria: Carlos Edinei de Oliveira.'
        },
        { type: 'image', content: '/exposicoes/barra-do-bugres/37.webp|Casa Borges, Museu de Barra do Bugres – Por: Alessandra Ribeiro de Carvalho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/38.webp|Antiga Igreja de Santa Cruz, 1936 – Por: Alessandra Ribeiro de Carvalho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/39.webp|Coreto da praça – Por: João Mário de Arruda Adrião|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/40.webp|Casa José Ourives – Por: Alessandra Ribeiro de Carvalho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/41.webp|Casa de taipa, Comunidade Baixio – Por: João Mário de Arruda Adrião|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/42.webp|Crucifixo e ponte do Rio Paraguai – Por: João Mário de Arruda Adrião|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/43.webp|Poaieiro|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/44.webp|Detalhe da primeira prefeitura – Por: Alessandra Ribeiro de Carvalho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/45.webp|Casa tombada de Marechal Rondon – Território Umutina – Por: Alessandra Ribeiro de Carvalho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/46.webp|Aldeia Uapo, Território Umutina – Por: Anderson Portilho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/47.webp|Poaieiro – Por: Juliano Cunha|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/48.webp|Histórico do município no monumento ao Poaieiro – Por: Juliano Cunha|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/49.webp|Monumento 15 Mártires – Por: Alessandra Ribeiro de Carvalho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/50.webp|Monumento 15 Mártires – Por: Alessandra Ribeiro de Carvalho|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/51.webp|Rio Paraguai sob a ponte – Por: Kelly Serschon|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/52.webp|Vista panorâmica com a Casa José Ourives – Por: Kelly Serschon|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/53.webp|Casa ribeirinha com varanda – Por: Kelly Serschon|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'image', content: '/exposicoes/barra-do-bugres/54.webp|Casa de madeira – Por: João Mário de Arruda Adrião|', imageProps: { width: 800, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'subtitle', content: 'FONTES' },
        {
          type: 'text',
          content:
            'MORAES, Cleonice Aparecida de. História e trajetórias: um estudo sobre o cotidiano dos poaeiros em Barra do Bugres. Dissertação. 2004.\nCARVALHO, Alessandra Ribeiro. Museu do Peixe: Monografia apresentada para Conclusão do Curso de Graduação em Arquitetura e Urbanismo pela Universidade do Estado de Mato Grosso (Unemat), 2011.\nBARRA DO BUGRES, Prefeitura Municipal. História de Barra do Bugres. s/data.\nBarra do Bugres/MT. Julho de 2020.'
        },
        { type: 'subtitle', content: 'REALIZAÇÃO' },
        { type: 'text', content: 'Projeto de Extensão Museu Casa Borges, Unemat campus Barra do Bugres e Departamento de Cultura, da Secretaria Municipal de Educação e Cultura.' },
        { type: 'subtitle', content: 'APOIO' },
        { type: 'text', content: 'Secretaria de Desenvolvimento Econômico, Meio Ambiente e Turismo de Barra do Bugres/MT.' },
        { type: 'subtitle', content: 'ASSESSORIA' },
        { type: 'text', content: 'Alessandra Ribeiro de Carvalho.' },
        { type: 'subtitle', content: 'COORDENAÇÃO' },
        { type: 'text', content: 'João Mário Arruda Adrião.' }
      ]
    },
    'quilombos': {
      title: 'COMUNIDADES QUILOMBOLAS DE BARRA DO BUGRES: MEMÓRIAS, SABERES E FAZERES.',
      subtitle: 'Memórias e saberes das comunidades quilombolas',
      sections: [
        {
          type: 'image',
          content: '/exposicoes/quilombos/danca.jpg|Comunidades Quilombolas|Capa da exposição',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        {
          type: 'subtitle',
          content: 'Comunidades Remanescentes de Quilombos'
        },
        {
          type: 'text',
          content:
            'Estão identificadas oficialmente cinco Comunidades Remanescentes de Quilombos em Barra do Bugres, denominadas: Água Doce, Baixio, Morro Redondo, Vaca Morta e Vãozinho.'
        },
        { type: 'image', content: '/exposicoes/quilombos/mapa.jpg|Mapa ilustrando a localização das comunidades – Por: Larissa Borges|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        {
          type: 'text',
          content:
            'Essas comunidades se refugiaram próximas à nascente do rio Jauquara, para se protegerem do trabalho forçado da época, localizando-se nas áreas mais altas entre as Serra do Canal, Camarinha e Limboso – na Província Serrana do Cerrado, unidade geomorfológica com cerca de 400 km de extensão, que vai desde o Pantanal até a região do Planalto dos Parecis.'
        },
        { type: 'image', content: '/exposicoes/quilombos/jauquara.jpg|Rio Jauquara (2010) – Foto: Alessandra Carvalho|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Na região da Serra podem ser encontradas lindas cachoeiras, cavernas e trilhas ecológicas propícias para o desenvolvimento do ecoturismo.' },
        { type: 'text', content: 'O território autodenominado Vão Grande é formado por cinco comunidades: São José do Baixio, Morro Redondo, Camarinha, Vaca Morta e Retiro. Esse território é composto por cerca de 200 moradores e está localizado a cerca de 80 km da cidade de Barra do Bugres.' },
        { type: 'image', content: '/exposicoes/quilombos/salto.jpg|Vista do salto do Vão Grande – Foto: Mário Friedlander|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        {
          type: 'text',
          content:
            'Essas comunidades quilombolas trazem consigo manifestações culturais tradicionais mato-grossenses, com a religiosidade católica em seus festejos, como as festas de Santos, com rodas de cururu usando a viola de cocho e outros instrumentos típicos, além das danças de Siriri e São Gonçalo.'
        },
        { type: 'image', content: '/exposicoes/quilombos/danca.jpg|As danças tradicionais são resgatadas pelos jovens da comunidade – Foto: Alessandra Carvalho|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Entre as festas mais conhecidas estão: a Festa de Santo Antônio, a de São José, a Festa de Santa Cruz e a de São Gonçalo, que estão no calendário anual da comunidade.' },
        { type: 'subtitle', content: 'Fonte' },
        { type: 'text', content: 'Texto adaptado do site Descubra Mato Grosso: http://www.descubramatogrosso.com.br/pt/atracoes/barra-do-bugres/vao-grande' }
      ]
    },
    'mulheres': {
      title: 'ESPECIAL MULHERES',
      subtitle: 'Força, luta e dignidade das mulheres de Barra do Bugres',
      sections: [
        {
          type: 'image',
          content: '/exposicoes/mulheres/1.webp|Especial Mulheres|Fotógrafa: Gabryelle Guedes',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        { type: 'text', content: 'Publicado em 8 de abril de 2020 por Museu Casa Borges.' },
        { type: 'text', content: 'Muito mais que uma comemoração, um marco de luta por dignidade, igualdade entre gêneros e por uma sociedade verdadeiramente justa e democrática! O mês de março é considerado o mês da mulher, mas sabemos que não é só esse mês que podemos tudo. O “dia da mulher”, celebrado simbolicamente em 8 de março, não é uma data meramente comercial: seu significado vai muito além disso! Sendo iniciado nos anos 60, o movimento feminista ganhou corpo e, em 1975, o 8 de março foi reconhecido oficialmente pelas Nações Unidas.' },
        { type: 'text', content: 'A data nasceu da força, coragem e resistência das mulheres que iniciaram e enfrentaram aquilo que já não mais lhes cabia e fizeram acontecer. Deixando de lado palavras e conversas miúdas, foram pra cima e conquistaram. Assim seguem até hoje, quebrando tabus e visões pré-definidas por uma sociedade machista e patriarcal. Queremos respeito e reconhecimento por quem realmente somos.' },
        { type: 'text', content: 'O Museu Casa Borges traria nos dias 25 e 26 de março uma exposição de imagens das fortes mulheres de Barra do Bugres, representando todas as mulheres. Em decorrência das medidas sanitárias, a exposição foi adaptada para esta apresentação virtual.' },
        { type: 'text', content: 'Na adolescência ajudava a mãe com os afazeres de casa produzindo fios de rede. Após o casamento com Herculano Borges, dedicou-se aos cuidados dos 10 filhos biológicos e uma neta. Fazia salgados e doces para vender e montou também uma pensão em sua casa, onde vários moradores vinham comprar refeições e se alimentavam na varanda. Hoje, com idade avançada, continua cuidando dos netos com muito carinho e amor.' },
        { type: 'image', content: '/exposicoes/mulheres/2.webp|Fotógrafa: Kelly Serschon|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: '89 anos, nasceu em Itaipu, na região do Vão Grande, onde morou e trabalhou como roceira. Depois casou e veio para Barra do Bugres, trabalhou na Barra Álcool e nunca teve oportunidade de frequentar uma escola. Tem 7 filhos. Em sua juventude, diz que dançava siriri a noite inteira.' },
        { type: 'image', content: '/exposicoes/mulheres/3.webp|Fotógrafa: Kelly Serschon|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Professora de letras: “Sou uma mulher pequena em tamanho e imensa em ser. Não me aceitava, tinha medo e era complexada. Saí de casa com 15 anos por não me sujeitar a ser dona de casa. Não tinha pretensão de ser professora, mas quando entendi que podia ajudar pessoas e mudar a história delas, me apaixonei. Tenho ânsia de viver e não posso voltar a refazer minha história, mas posso construir de forma diferente juntando a menininha, a mocinha e a velhinha que sou.”' },
        { type: 'image', content: '/exposicoes/mulheres/4.webp|Fotógrafa: Kelly Serschon|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Professora: “Sou uma mulher que luta pelos movimentos feministas e da diversidade. Há 20 anos no Comitê Popular da Bacia do Rio Paraguai, em proteção das águas, da natureza e da vida. Minha luta é para que eu e outras mulheres consigamos ser livres, pois sei que muitas sofrem agressão e violência doméstica. Liberdade! As mulheres podem tudo e precisamos de respeito.”' },
        { type: 'image', content: '/exposicoes/mulheres/5.webp|Fotógrafa: Kelly Serschon|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Adelina, 58, papelaria e bicicletas; Neuza, 46, professora; Camila, 29, empresária (locações de brinquedos); Ediala, 29, confeiteira.' },
        { type: 'image', content: '/exposicoes/mulheres/6.webp|Fotógrafa: Kelly Serschon|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Turismóloga, funcionária pública de Barra do Bugres: “Eu amo tudo o que faço! Meu papel é auxiliar o desenvolvimento econômico, social, cultural e turístico, principalmente dos povos originários e remanescentes quilombolas. Ainda é um desafio ser líder mulher em um sistema histórico patriarcal.”' },
        { type: 'image', content: '/exposicoes/mulheres/7.webp|Fotógrafa: Gabryelle Guedes|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Investigadora: “Apoio a causa de mulheres que passam por situações de violência e vulnerabilidade. Busco realizar projetos de apoio em Barra do Bugres. A mulher hoje está mais atenta aos seus direitos, buscando independência, estudando, se qualificando. O objetivo não é mais apenas casar e ter filhos: é ser independente e feliz. Violência não! Queremos paz.”' },
        { type: 'image', content: '/exposicoes/mulheres/8.webp|Fotógrafa: Kelly Serschon|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Costureira e presidente do Bairro Nova Esperança: “Sempre busquei ocupação para os moradores, apresentando a parte cultural do bairro. Como mulher eu sempre tento mostrar que somos capazes, que temos autonomia e voz ativa.”' },
        { type: 'image', content: '/exposicoes/mulheres/9.webp|Fotógrafa: Viviane Dourado|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Empresária e cozinheira: “Sou guerreira, trabalho das 5h às 23h. Passei por momentos difíceis e já pensei em desistir, mas tenho motivos para continuar. Minha família é tudo.”' },
        { type: 'image', content: '/exposicoes/mulheres/10.webp|Fotógrafa: Kelly Serschon|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Autônoma: “Aos 12 anos tive leucemia. Hoje sou voluntária no hospital do câncer, em ações solidárias e projetos. O papel de todo ser humano é servir o próximo na medida do possível.”' },
        { type: 'image', content: '/exposicoes/mulheres/11.webp|Fotógrafa: Kelly Serschon|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Professora de educação física e advogada: “Sou batalhadora, nunca fugi dos desafios. Sempre é tempo de ressignificar e dar novo sentido.”' },
        { type: 'image', content: '/exposicoes/mulheres/12.webp|Fotógrafa: Kelly Serschon|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Pescadora: “Nada me atrapalha de fazer o que deve ser feito. Me vejo como uma mulher corajosa e vou à luta faça sol ou faça chuva.”' },
        { type: 'image', content: '/exposicoes/mulheres/13.webp|Fotógrafa: Gabryelle Guedes|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Pedagoga e funcionária pública da cultura: “Sou alegria pura, representei muito para Barra do Bugres com festivais musicais e ações sociais. Cultura é importante na vida das crianças.”' },
        { type: 'image', content: '/exposicoes/mulheres/14.webp|Fotógrafa: Kelly Serschón|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Proprietária de Pensão Universitária: “Eu sempre procurei dar exemplos. Toda mulher tem uma força muito grande. Nada nem ninguém pode superar o que tem dentro de você.”' },
        { type: 'image', content: '/exposicoes/mulheres/15.webp|Fotógrafa: Gabryelle Guedes|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Professora da Escola Estadual Jula Paré, TI Umutina/Balotiponé. Primeira indígena doutora em Antropologia pela UnB: “Ser mulher indígena, brasileira, hoje é uma questão política. Resistimos.”' },
        { type: 'image', content: '/exposicoes/mulheres/16.webp|Fotógrafa: Kelly Serschón|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Tuta – voluntária na Apae: “Iniciei minha participação como voluntária na instituição, a qual amo e dou meu amor e cuidados como propósito de vida.”' },
        { type: 'image', content: '/exposicoes/mulheres/17.webp|Fotógrafa: Kelly Serschón|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Enfermeira e maquiadora: “Sou autêntica e acolhedora, tenho a arte de cuidar. Busco elevar a autoestima de mulheres.”' },
        { type: 'image', content: '/exposicoes/mulheres/18.webp|Fotógrafa: Viviane Dourado|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Veterinária: “Já sofri preconceito por ser mulher. Sou forte e independente e aconselho às mulheres buscarem essa independência. Amo animais.”' },
        { type: 'image', content: '/exposicoes/mulheres/19.webp|Fotógrafa: Gabryelle Guedes|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Salgadeira e feirante: “Sou uma mulher guerreira e alto astral. Já sofri preconceito e hoje prefiro trabalhar por conta própria, gerando emprego para outras mulheres.”' },
        { type: 'image', content: '/exposicoes/mulheres/20.webp|Fotógrafa: Viviane Dourado|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Formada em estética e administração, chefe no setor de transporte: “No início foi um desafio, mas uso estratégias para cumprir minhas atividades com sucesso e segurança.”' },
        { type: 'image', content: '/exposicoes/mulheres/21.webp|Fotógrafa: Kelly Serschón|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Empresária de paisagismo e confecções: “Sempre acreditei em meus sonhos. Eu sonho alto, sonho grande, e desde pequena eu era assim.”' },
        { type: 'image', content: '/exposicoes/mulheres/22.webp|Fotógrafa: Kelly Serschón|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Aromaterapeuta e massoterapeuta: “Ajudando pessoas principalmente em áreas emocionais. Meu propósito é mostrar que é possível tratar problemas com produtos naturais.”' },
        { type: 'image', content: '/exposicoes/mulheres/23.webp|Fotógrafa: Kelly Serschón|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Empresária: “Sempre com sorrisão no rosto. Fui inspirada por outras mulheres a abrir meu negócio. Influencio pessoas a terem vida equilibrada e amor próprio.”' },
        { type: 'image', content: '/exposicoes/mulheres/24.webp|Fotógrafa: Viviane Dourado|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Artesã: “Sou radiante como o sol, brilhante como as estrelas. As pessoas devem dar aos outros aquilo que gostariam de receber.”' },
        { type: 'image', content: '/exposicoes/mulheres/25.webp|Fotógrafa: Natalia Cantini|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } },
        { type: 'text', content: 'Funcionária pública aposentada: “Sempre batalhei para que as pessoas tivessem informação e conquistassem seu espaço, principalmente as mais carentes. A Apae é referência em Barra do Bugres.”' },
        { type: 'subtitle', content: 'Créditos' },
        { type: 'text', content: 'Coordenação: Priscila Waldow e João Mário Arruda Adrião. Entrevistas: Viviane Pereira Dourado; Gabryelle Guedes; Larissa Borges Lourenço; Larissa Pompermayer. Fotografia: Kelly Serschón; Gabryelle Guedes; Natalia Cantini; Viviane Pereira Dourado. Edição de montagem: Gabryelle Guedes. Assessoria de Projeto: Alessandra Ribeiro de Carvalho.' },
        { type: 'subtitle', content: 'Realização e apoio' },
        { type: 'text', content: 'Realização: Projeto de Extensão Museu Casa Borges, Unemat campus Barra do Bugres/MT. Apoio: Departamento de Cultura da Secretaria Municipal de Educação e Cultura e Secretaria de Desenvolvimento Econômico, Meio Ambiente e Turismo de Barra do Bugres/MT.' },
        { type: 'image', content: '/exposicoes/mulheres/26.webp|Encerramento|', imageProps: { width: 900, height: 600, className: 'max-w-3xl mx-auto' } }
      ]
    },
    /**
     * AIDEV-NOTE: Exposição "Comunidades Quilombolas de Barra do Bugres"
     * Slug: comunidades
     * Conteúdo inicial com textos principais e imagens já disponíveis em /public/exposicoes/quilombos.
     * Imagens adicionais da página original (INDEX/Comunidades) serão incorporadas em próxima etapa.
     */
    comunidades: {
      title: 'Comunidades Quilombolas de Barra do Bugres',
      subtitle: 'Memórias, histórias e cultura das comunidades Vão Grande, Água Doce e Camarinha',
      author:
        'Comunidades Vão Grande, Água Doce e Camarinha; Equipe do Projeto Museu Casa Borges',
      sections: [
        // Capa da exposição com legenda original
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/1.jpg|Rio Juba|RIO JUBA – Por: Anderson Portilho',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        {
          type: 'text',
          content:
            'Esta exposição reúne a memória, a história e a cultura das comunidades quilombolas de Barra do Bugres, como Vão Grande, Água Doce e Camarinha. O conteúdo foi produzido com a participação de moradores, professores e pesquisadores vinculados ao Museu Casa Borges, valorizando as lutas pela terra, os saberes e fazeres, a religiosidade e as festividades que marcam a vida dessas comunidades.'
        },
        // O início e localização
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/2.jpg|Localização das comunidades|As Comunidades Remanescentes Quilombolas ficam localizadas entre as serras da região de Barra do Bugres, MT',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/4.jpg|Salto do Vão Grande|Vista do salto do Vão Grande. Foto Mário Friedlander.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        { type: 'subtitle', content: 'A Invasão das Terras' },
        {
          type: 'text',
          content:
            'Ao longo do século XX e início do XXI, as comunidades quilombolas enfrentaram invasões de seus territórios por fazendeiros e empreendimentos. Resistiram por meio de mobilizações, denúncias e parcerias, na busca pelo reconhecimento de seus direitos ancestrais e coletivos.'
        },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/20.jpg|Conquista e luta|A terra é uma conquista, mas sempre uma luta. Foto Alessandra Carvalho.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/22.jpg|Vista aérea|Vista aérea da região da Comunidade Camarinha – Serra Camarinha. Foto Mário Friedlander. As comunidades se refugiavam nas regiões mais altas.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        { type: 'subtitle', content: 'A Luta Pela Terra' },
        {
          type: 'text',
          content:
            'As lutas incluem processos de titulação, ações judiciais, organização comunitária e fortalecimento da identidade quilombola. A escola e os projetos educativos tornaram-se espaços fundamentais de documentação e protagonismo juvenil.'
        },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/23.jpg|Serra e comunidade|Comunidade Camarinha fica bem próxima à serra. Foto João Mário Adrião.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/24.jpg|Vista panorâmica|Vista panorâmica da Comunidade Camarinha. Foto João Mário Adrião.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        { type: 'subtitle', content: 'Modo de Vida, Saberes e Fazeres' },
        {
          type: 'text',
          content:
            'A vida quilombola é marcada pela agricultura tradicional (roça de toco), pelo manejo sustentável, pela pesca nos rios e pelo uso de ervas medicinais. Os ciclos da lua orientam plantios e colheitas, e os mais velhos transmitem conhecimentos aos jovens.'
        },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/35.jpg|Banana na economia|A comercialização da banana é principal meio de sobrevivência das comunidades. Foto Alessandra Carvalho.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/38.jpg|Produções agrícolas|Produções agrícolas na comunidade Água Doce. Foto Moacir Rodrigues.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/39.jpg|Calendário agrícola|O calendário agrícola das comunidades depende tanto da natureza, quanto da religiosidade. Foto Alessandra Carvalho.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/40.jpg|Currículo e tradições|Repasse das tradições fazem parte do currículo escolar. Foto Antônio Marcos Pereira.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        { type: 'subtitle', content: 'Educação Escolar Quilombola' },
        {
          type: 'text',
          content:
            'A escola quilombola integra conteúdos da vida comunitária, como etnomatemática, história local e cuidado com o ambiente. Projetos pedagógicos registram memórias, cartografias afetivas e práticas de cuidado, fortalecendo a identidade e o protagonismo dos estudantes.'
        },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/32.jpg|Aulas práticas|As aulas práticas resgatam a tradição. Sala de aulas nas estruturas adaptadas.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/34.jpg|Ervas medicinais|Aula prática de ervas medicinais usadas pelas comunidades. Foto Antônio Marcos Pereira Silva.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        { type: 'subtitle', content: 'Festividades e Religiosidade' },
        {
          type: 'text',
          content:
            'As festas de santo, os altares domésticos e as rodas de cururu expressam a espiritualidade e a sociabilidade das comunidades. Os preparativos envolvem toda a comunidade, com capitão do mastro, comidas tradicionais e cantorias que atravessam gerações.'
        },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/52.jpg|São José do Baixio|Comunidade São José do Baixiu leva o nome em homenagem a São José, santo padroeiro da Comunidade. Foto João Mário Adrião.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/53.jpg|Altar e casa enfeitada|A casa é toda enfeitada, mas o altar sempre é centro da festa. Foto João Mário.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/57.jpg|Rituais da festa|Da escolha do gado ao erguer o mastro na festa, tudo passa por um ritual, uma tradição. Foto Alessandra Carvalho.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/60.jpg|Devoção e tradição|Devoção e tradição. Foto Maria Helena Tavares.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/61.jpg|Altar de Nossa Senhora|Altar de devoção de Nossa Senhora Aparecida. Foto João Mário Arruda Adrião.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        // Continuação das Festividades e Religiosidade (conforme HTML)
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/59.webp|Tradições|Tradições. Fotos Maria Inez e Alessandra Carvalho',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        { type: 'subtitle', content: 'Capitão do Mastro' },
        {
          type: 'text',
          content:
            'Todos têm sua função, o capitão do mastro vai tirar e limpar, aí depois tem que subir, amarrar a cruzeta que falam, um pauzinho pequeno pra bandeira não cair, no mastro já fica o gancho embaixo, em cima tem que amarrar, a dele é até depois que descer o mastro guardar ele, aí acaba a função do capitão do mastro”. (Morador da Comunidade Baixio, março de 2019).'
        },
        { type: 'subtitle', content: 'Nossa Senhora Aparecida' },
        {
          type: 'text',
          content:
            'Pra mim eu tenho muita fé em Nossa Senhora Aparecida [...] é uma fé que nós temos em Nossa Senhora Aparecida, ela mesmo ajuda nós, parece que eu não sei mais ficar sem fazer essa festa nenhum ano e tenho certeza que eles também não, que quando vai chegando perto da data da festa eles já vai pensando nós temos que fazer isso, aquilo, chamam os irmãos mais velhos para conversar com eles como que vai ser feito, o que teremos que fazer antes do dia da festa.” (Filha de festeiro, entrevista realizada em setembro de 2016).'
        },
        { type: 'subtitle', content: 'A Chegada dos Visitantes' },
        {
          type: 'text',
          content:
            'Todos ajudavam a organizar, uns chegavam adiantado três quatro dias, outros chegavam na véspera da festa. Era muito bonito; hoje todo mundo tem seu emprego e se perder ele, perdeu.” (Festeiro, entrevista realizada em setembro de 2016).'
        },
        // Imagens sem legenda explícita
        { type: 'image', content: '/exposicoes/comunidades/62.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'image', content: '/exposicoes/comunidades/63.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'image', content: '/exposicoes/comunidades/64.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'image', content: '/exposicoes/comunidades/65.webp|Decorações para os festejos|Decorações para os festejos. Fotos Alessandra Carvalho', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'subtitle', content: 'Religiosidade' },
        { type: 'text', content: 'Os moradores da Comunidade Baixio, como das outras quatro comunidades, em sua maioria, são católicos e professam sua fé e religiosidade nas festas de Santo, nas rezas, nos terços, rezados praticamente todas as semanas e nas missas celebradas uma vez por mês. (Madalena Santana de SALES, professora E. E. José Mariano Bento, 2020).' },
        { type: 'image', content: '/exposicoes/comunidades/66.webp|Altar de devoção|Altar de devoção. Foto Alessandra Carvalho', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'subtitle', content: 'Códigos' },
        { type: 'text', content: 'Nas comunidades quilombolas existem os códigos que somente eles entendem. Durante os festejos em adoração ao Santo, no momento da ladainha ou da dança do São Gonçalo, eles se comunicam entre si, de maneira peculiar que somente os mais atentos ou os que conhecem essa forma de comunicação percebem. Quando existe um código público no qual agir assim significa um sinal conspiratório, é piscar”. (Madalena Santana de SALES, professora E. E. José Mariano Bento, 2020).' },
        { type: 'image', content: '/exposicoes/comunidades/67.webp|Espiritualidade e fé|Espiritualidade e fé. Foto Maria Helena Tavares', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'subtitle', content: 'Cururueiro e Capelão' },
        { type: 'text', content: 'Pelo jeito que daqui uns tempos vai acabar, vai acabar cururueiro e capelão, porque esses novos de agora não se interessam mais por isso, de jeito nenhum [...] Então é esse restante que ainda tem hoje e esses de agora pelo jeito que a gente vê não tem mais esse interesse e nós todos sabemos que nós já estamos do meio pro fim, bem dizer…” (Morador da Comunidade Baixio. Março de 2019).' },
        { type: 'image', content: '/exposicoes/comunidades/68.webp|Cururu e natureza|Cururu canta a natureza e a beleza da camponesa. Foto Maria Helena Tavares e Leila Campos', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'image', content: '/exposicoes/comunidades/69.webp|Cururu e beleza|Cururu canta a natureza e a beleza da camponesa. Foto Maria Helena Tavares e Leila Campos', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'subtitle', content: 'A Festa Continua' },
        { type: 'text', content: 'Aqui nós não deixa acabar, porque nós inventamos qualquer coisa, gente vai espalhando gente pega uma viola, canta siriri ou então canta cururu; não quer dizer que nós vamos dormir, também tem que passar a noite brincando, festando. Nós inventa qualquer brincadeira, eu sei que a festa continua”. (Morador da Comunidade Baixio. Março de 2019).' },
        { type: 'image', content: '/exposicoes/comunidades/70.webp|Festeiros|Festeiros após apresentação cultural. Foto Alessandra Carvalho.', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'subtitle', content: 'Os Rios e a Natureza' },
        {
          type: 'text',
          content:
            'O Rio Jauquara e seus afluentes estruturam o modo de vida local, fornecendo alimento, trabalho e lazer. As comunidades pautam a defesa das águas e denunciam impactos como agrotóxicos, hidrelétricas e falta de saneamento básico.'
        },
        { type: 'subtitle', content: 'Saneamento Básico' },
        { type: 'text', content: 'Um dos grandes problemas da comunidade Morro Redondo, assim como nas demais comunidades, é a falta de saneamento básico, sendo a água o maior de seus problemas. Na terra de um dos moradores há uma mina de água salobra. A mina de água doce que existe está na propriedade do fazendeiro, e temem que o rebanho bovino acabe por destruí-la. (Madalena Santana de SALES, professora E. E. José Mariano Bento, 2020).' },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/71.jpg|Saneamento básico|Projeto Piloto de saneamento básico do curso de Arquitetura e Urbanismo da Unemat. Foto João Mário Adrião, 2017.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        { type: 'subtitle', content: 'Travessia' },
        { type: 'text', content: 'Quando o rio Jauquara estava cheio, o percurso que o transporte escolar faz demora, aproximadamente, uma hora. Os alunos precisam trocar de ônibus, atravessar a passarela; do outro lado há outro ônibus à espera”. (Madalena Santana de SALES, professora E. E. José Mariano Bento, 2020).' },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/72.jpg|Passarela do Jauquara|Passarela sob o rio Jauquara. Foto João Mário Arruda Adrião.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        { type: 'subtitle', content: 'Usina Hidrelétrica' },
        { type: 'text', content: 'Há estudos sobre o potencial do Rio Jauquara na produção de energia elétrica. O Sindicato dos Trabalhadores Rurais de Barra do Bugres, juntamente com a Associação de Pequenos Produtores Rurais São José do Baxius e Menino Jesus – Morro Redondo, desde 2008 solicita ao INCRA informações sobre a possível construção de Usina Hidrelétrica no rio Jauquara, informando o quanto isto pode prejudicar as famílias quilombolas da região de Vão Grande. (Madalena Santana de SALES, 2020).' },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/73.jpg|Ora e luta|Comunidade ora e luta pra sobreviver. Foto Leila Campos.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        { type: 'subtitle', content: 'Projetos e Parcerias' },
        { type: 'text', content: 'As comunidades quilombolas, por seus aspectos culturais e naturais e pela localização geográfica, sempre foram foco de atenção de Universidades Estaduais, Federais e outras instituições, que veem no seu patrimônio uma fonte de pesquisa e de integração social, turismo e lazer. (Alessandra CARVALHO, Turismóloga de Barra do Bugres, 2020).' },
        { type: 'image', content: '/exposicoes/comunidades/74.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'image', content: '/exposicoes/comunidades/75.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'image', content: '/exposicoes/comunidades/76.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'image', content: '/exposicoes/comunidades/77.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'image', content: '/exposicoes/comunidades/78.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'image', content: '/exposicoes/comunidades/79.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'image', content: '/exposicoes/comunidades/80.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'subtitle', content: 'As Intempéries' },
        { type: 'text', content: 'Dois períodos caracterizam a região e dificultam a vida de todas as comunidades rurais: a cheia (dezembro a março), com atoleiros e enchentes, e a seca (principalmente entre julho e início de outubro), que além de prejudicar a lavoura, aumenta o número de queimadas. A luta pela sobrevivência supera essas intempéries e faz com que as comunidades resistam e preservem sua cultura, entre o fogo ou a tempestade. (Alessandra CARVALHO, 2020).' },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/81.jpg|Intempéries|Queimada casa Tradicional. Foto Alessandra Carvalho.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        { type: 'subtitle', content: 'Dia do Rio Jauquara' },
        { type: 'text', content: 'Renascendo das colinas suas forças sem igual, cortando serras e montanhas com destino ao Pantanal. Trazendo esperança e vida para nossos corações seu existir é uma herança pras futuras gerações. Rio Jauquara, rio Jauquara vai aqui a minha luta, essas águas que não param. Rio Jauquara suas águas cor de anil, és aqui minha homenagem 28 de abril. (Autoria: Benedito Ilino da Silva. Abril de 2019).' },
        { type: 'image', content: '/exposicoes/comunidades/82.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'image', content: '/exposicoes/comunidades/83.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'image', content: '/exposicoes/comunidades/84.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'image', content: '/exposicoes/comunidades/85.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        {
          type: 'image',
          content:
            '/exposicoes/comunidades/86.jpg|Rio Jauquara|Rio Jauquara. Fotos Alessandra Carvalho, Viviane Dourado e Moacir Silva.',
          imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' }
        },
        { type: 'subtitle', content: 'Relatos e contos de alunos da Escola Estadual José Mariano Bento sobre suas memórias.' },
        { type: 'image', content: '/exposicoes/comunidades/88.webp|Rio Jauquara|Rio Jauquara. Fotos Alessandra Carvalho, Viviane Dourado e Moacir Silva', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'subtitle', content: 'As histórias dos alunos vão além da vida cotidiana, relatam as grandes dificuldades vividas por longos anos.' },
        { type: 'image', content: '/exposicoes/comunidades/89.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'image', content: '/exposicoes/comunidades/90.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'subtitle', content: 'Lembranças, memórias…' },
        { type: 'image', content: '/exposicoes/comunidades/91.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'image', content: '/exposicoes/comunidades/92.webp|Registro sem legenda|', imageProps: { width: 1024, height: 640, className: 'max-w-4xl mx-auto' } },
        { type: 'subtitle', content: 'FONTES' },
        { type: 'text', content: 'Reis, Débora Camila Mendes. Casa da Benção: Proposta de uma casa de oração para comunidade quilombola São José do Baixios-MT. Monografia/UNEMAT. Barra do Bugres/MT, 2013.' },
        { type: 'text', content: 'DIAS, Maria Helena Tavares. Entre memórias e narrativas dos Festeiros das Feastas de Santo do território quilombola Vão Grande, 2017. Dissertação (Mestrado em Educação) – UFMT, Cuiabá, 2017.' },
        { type: 'text', content: 'SALES, Madalena Santana de. Os Fazeres e os Saberes Etnomatemáticos Praticados Pelos Habitantes do Território Quilombola Vão Grande. Dissertação (Mestrado em Ensino de Ciências e Matemática) – UNEMAT, 2020.' },
        { type: 'text', content: 'ADRIÃO, João Mário de Arruda; CARVALHO, Alessandra Ribeiro de; DEMARTINI, Juliana. A casa no quilombo Baixius. VI Seminário Mato-Grossense de Habitação de Interesse Social. Cuiabá/MT, 2015. UNEMAT.' },
        { type: 'text', content: 'SILVA, Antonio Marcos Pereira da et al. Uso de Plantas Medicinais no Quilombo. Escola Estadual José Mariano Bento. Quilombo Baixio, Barra do Bugres – MT, 2015.' },
        { type: 'subtitle', content: 'Equipe' },
        { type: 'text', content: 'Representantes das Comunidades: Berenice Pereira (Distrito Currupira); Ariluce Lina da Silva (Comunidade Vaca Morta, Porto Estrela); Moacir Rodrigues da Silva (Comunidade Água Doce); Rafael Bento (Comunidade São José do Baixio).' },
        { type: 'text', content: 'Professores da Escola Estadual José Mariano Bento: Maria Helena Tavares; Antônio Marcos Pereira da Silva; Madalena Santana de Sales; Márcia Resende de Sousa; Leila Campos.' },
        { type: 'text', content: 'Edição, produção e assessoria: Alessandra Ribeiro de Carvalho (Turismóloga da Prefeitura Municipal de Barra do Bugres); Gabryelle Guedes Soares (Acadêmica de Arquitetura e Urbanismo/UNEMAT, bolsista); Larissa Borges Lourenço (Arquiteta, bolsista); Viviane Dourado (Acadêmica de Arquitetura e Urbanismo/UNEMAT, bolsista); João Mário Arruda Adrião (Professor do curso de Arquitetura e Urbanismo/UNEMAT).' },
        { type: 'text', content: 'Colaboradores: Rodrigo Faccioni (Agricultor e ex-secretário municipal de Desenvolvimento Sustentável de Barra do Bugres/MT); Dalva Cristiana do Nascimento (Economia Solidária); Acadêmicos da Escola Estadual José Mariano Bento.' }
      ]
    }
  }

  const data = EXPO_CONTENT[slug]
  if (!data) {
    // Tratamento de erro: slug não mapeado
    return (
      <ContentPage
        title="Exposição não encontrada"
        subtitle="Não localizamos conteúdo para esta exposição."
        sections={[
          {
            type: 'text',
            content:
              'Esta exposição ainda não foi migrada para a nova plataforma. Por favor, retorne à página de Exposições Virtuais e escolha outra opção.'
          },
          {
            type: 'image',
            content: '/exposicoes/virtuais/cartaz112.jpg|Voltar|Exposição indisponível',
            imageProps: { href: '/exposicoes/virtuais', width: 1024, height: 640 }
          }
        ]}
      />
    )
  }

  return (
    <ContentPage
      title={data.title}
      subtitle={data.subtitle}
      sections={data.sections}
      author={data.author}
    />
  )
}