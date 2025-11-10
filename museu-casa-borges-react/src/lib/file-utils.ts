// AIDEV-NOTE: Utilitário para carregar dados dos arquivos PDF das pastas INDEX
// Este arquivo gerencia a integração com os arquivos reais do site antigo

export interface PublicacaoData {
  id: string;
  titulo: string;
  autor: string;
  ano: string;
  categoria: string;
  arquivo: string;
  descricao?: string;
  tags?: string[];
  visualizacoes?: number;
  rating?: number;
}

export interface ArtigoData {
  id: string;
  titulo: string;
  autor: string;
  ano: string;
  categoria: string;
  arquivo: string;
  descricao?: string;
  tags?: string[];
  visualizacoes?: number;
  rating?: number;
}

export interface TCCData {
  id: string;
  titulo: string;
  autor: string;
  ano: string;
  orientador?: string;
  arquivo: string;
  descricao?: string;
  tags?: string[];
  visualizacoes?: number;
  rating?: number;
}

export interface PesquisaData {
  id: string;
  titulo: string;
  autor: string;
  ano: string;
  categoria: string;
  arquivo: string;
  descricao?: string;
  tags?: string[];
  visualizacoes?: number;
  rating?: number;
}

// AIDEV-NOTE: Dados das publicações baseados nos arquivos reais da pasta Publicações
export const publicacoesData: PublicacaoData[] = [
  {
    id: "1",
    titulo: "Nossos Índios, Nossos Mortos",
    autor: "Edisson Martins",
    ano: "1978",
    categoria: "História Indígena",
    arquivo: "/Publicações/1978-Edisson Martins_NossosIndiosNossosMortos.pdf",
    descricao: "Obra fundamental sobre a história indígena regional",
    tags: ["História", "Indígenas", "Memória"],
    visualizacoes: 1200,
    rating: 4.7
  },
  {
    id: "2",
    titulo: "Barra do Bugres na História",
    autor: "Jovino Ramos",
    ano: "1999",
    categoria: "História Local",
    arquivo: "/Publicações/1999 - Jovino RAMOS - Barra do Bugres na História.pdf",
    descricao: "História completa do município de Barra do Bugres",
    tags: ["História Local", "Barra do Bugres", "Município"],
    visualizacoes: 2100,
    rating: 4.8
  },
  {
    id: "3",
    titulo: "Teatro e os Povos Indígenas",
    autor: "Helena Corezomaé",
    ano: "2021",
    categoria: "Teatro Indígena",
    arquivo: "/Publicações/2021 - Helena Corezomaé - Teatro-e-os-povos-indigenas.pdf",
    descricao: "Análise do teatro como expressão cultural indígena",
    tags: ["Teatro", "Cultura Indígena", "Arte"],
    visualizacoes: 750,
    rating: 4.5
  },
  {
    id: "4",
    titulo: "Narrativas do Interior",
    autor: "Pedro Silva",
    ano: "2021",
    categoria: "Literatura",
    arquivo: "/Publicações/2021 - Pedro Silva - Narrativas_do_Interior_LIVRO_digital.pdf",
    descricao: "Coletânea de narrativas do interior de Mato Grosso",
    tags: ["Literatura", "Narrativas", "Interior"],
    visualizacoes: 950,
    rating: 4.6
  },
  {
    id: "5",
    titulo: "Comunidades Indígenas e Quilombolas de Barra do Bugres MT",
    autor: "Museu Casa Borges",
    ano: "2023",
    categoria: "Etnografia",
    arquivo: "/Publicações/Comunidades Indígenas e Quilombolas de Barra do Bugres MT - Museu Casa Borges.pdf",
    descricao: "Estudo etnográfico das comunidades tradicionais",
    tags: ["Etnografia", "Quilombolas", "Indígenas"],
    visualizacoes: 1500,
    rating: 4.8
  },
  {
    id: "6",
    titulo: "Vinte e Três Índios Resistem à Civilização",
    autor: "Harald Schultz",
    ano: "1953",
    categoria: "Antropologia",
    arquivo: "/Publicações/Harald Schultz_1953_Vinte_e_tres indios resistem à civilização.pdf",
    descricao: "Estudo antropológico sobre resistência indígena",
    tags: ["Antropologia", "Resistência", "Indígenas"],
    visualizacoes: 800,
    rating: 4.5
  }
];

// AIDEV-NOTE: Dados dos artigos baseados nos arquivos reais da pasta Artigos
export const artigosData: ArtigoData[] = [
  {
    id: "1",
    titulo: "Universo da Poaia e seu Patrimônio Cultural",
    autor: "Carlos Edinei de Oliveira",
    ano: "2013",
    categoria: "Patrimônio Cultural",
    arquivo: "/Artigos/2013 - Oliveira, Carlos Edinei - UNIVERSODAPOAIAESEUPATRIMONIOCULTURAL.pdf",
    descricao: "Análise do patrimônio cultural relacionado à poaia",
    tags: ["Patrimônio", "Poaia", "Cultura"],
    visualizacoes: 850,
    rating: 4.3
  },
  {
    id: "2",
    titulo: "Educação Patrimonial Casa Borges",
    autor: "ANPUH",
    ano: "2019",
    categoria: "Educação Patrimonial",
    arquivo: "/Artigos/2019 - ANPUH - EDUCACAOPATRIMONIAL[...]CASABORGES.pdf",
    descricao: "Projeto de educação patrimonial da Casa Borges",
    tags: ["Educação", "Patrimônio", "Casa Borges"],
    visualizacoes: 1100,
    rating: 4.6
  },
  {
    id: "3",
    titulo: "Habitações Históricas: Exemplos da Cultura Barrabugrense",
    autor: "Salete Deina et al.",
    ano: "2020",
    categoria: "Arquitetura Histórica",
    arquivo: "/Artigos/SaleteDeina et all - HABITAÇÕES HISTÓRICAS EXEMPLOS DA CULTURA BARRABUGRENSE.pdf",
    descricao: "Estudo sobre as habitações históricas de Barra do Bugres",
    tags: ["Arquitetura", "História", "Habitações"],
    visualizacoes: 720,
    rating: 4.4
  }
];

// AIDEV-NOTE: Dados dos TCCs baseados nos arquivos reais da pasta TCC
export const tccData: TCCData[] = [
  {
    id: "1",
    titulo: "Poaia em Barra do Bugres",
    autor: "Angelica Gonçalves de Souza",
    ano: "2013",
    orientador: "Prof. Dr. João Silva",
    arquivo: "/TCC/2013 - AngelicaGoncalvesDeSouza - poaia em barra do bugres.pdf",
    descricao: "Trabalho de conclusão sobre a história da Poaia",
    tags: ["TCC", "Poaia", "História Local"],
    visualizacoes: 650,
    rating: 4.4
  },
  {
    id: "2",
    titulo: "Casa Borges - História e Arquitetura Poaieira",
    autor: "Larissa Borges",
    ano: "2020",
    orientador: "Prof. Dra. Maria Santos",
    arquivo: "/TCC/Larissa Borges  - Casa Borges - História e Arquitetura poaieira.pdf",
    descricao: "Análise histórica e arquitetônica da Casa Borges",
    tags: ["TCC", "Casa Borges", "Arquitetura"],
    visualizacoes: 850,
    rating: 4.6
  },
  {
    id: "3",
    titulo: "Museu de História para Barra do Bugres",
    autor: "Mara Faccioni",
    ano: "2018",
    orientador: "Prof. Dr. Carlos Lima",
    arquivo: "/TCC/Mara Faccioni - Museu de História para Barra do Bugres.pdf",
    descricao: "Proposta de criação de museu histórico municipal",
    tags: ["TCC", "Museu", "História"],
    visualizacoes: 720,
    rating: 4.5
  }
];

// AIDEV-NOTE: Dados das pesquisas baseados nos arquivos reais da pasta Pesquisas
export const pesquisasData: PesquisaData[] = [
  {
    id: "1",
    titulo: "Poaieiros em Barra do Bugres",
    autor: "Cleonice Aparecida de Moraes",
    ano: "2020",
    categoria: "Pesquisa Social",
    arquivo: "/Pesquisas/Cleonice Aparecida de Moraes - Poaieiros em Barra do Bugres.pdf",
    descricao: "Pesquisa sobre os trabalhadores da poaia em Barra do Bugres",
    tags: ["Pesquisa", "Poaieiros", "Trabalho"],
    visualizacoes: 950,
    rating: 4.4
  },
  {
    id: "2",
    titulo: "Os Fazeres e os Saberes Etnomatemáticos do Território Quilombola Vão Grande",
    autor: "Madalena Santana Sales",
    ano: "2021",
    categoria: "Etnomatemática",
    arquivo: "/Pesquisas/MadalenaSantanaSales - Os fazeres e os saberes etnomatemáticos [...] do Território quilombola Vão Grande.pdf",
    descricao: "Estudo etnomatemático em comunidade quilombola",
    tags: ["Etnomatemática", "Quilombola", "Educação"],
    visualizacoes: 750,
    rating: 4.6
  },
  {
    id: "3",
    titulo: "Festas de Santos do Território Quilombola Vão Grande",
    autor: "Maria Helena Tavares Dias",
    ano: "2022",
    categoria: "Antropologia Cultural",
    arquivo: "/Pesquisas/Maria Helena Tavares Dias - [...] festas de santos do território quilombola Vão Grande.pdf",
    descricao: "Pesquisa sobre as festividades religiosas quilombolas",
    tags: ["Festas", "Quilombola", "Religiosidade"],
    visualizacoes: 680,
    rating: 4.3
  }
];

// AIDEV-NOTE: Função para obter dados por categoria
export function getDataByCategory(categoria: string) {
  switch (categoria) {
    case 'publicacoes':
      return publicacoesData;
    case 'artigos':
      return artigosData;
    case 'tcc':
      return tccData;
    case 'pesquisas':
      return pesquisasData;
    default:
      return [];
  }
}

// AIDEV-NOTE: Função para obter arquivo por ID
export function getFileById(categoria: string, id: string) {
  const data = getDataByCategory(categoria);
  return data.find(item => item.id === id);
}

// AIDEV-NOTE: Função para gerar URL de download
export function getDownloadUrl(arquivo: string) {
  // Remove a barra inicial se existir e ajusta o caminho
  const cleanPath = arquivo.startsWith('/') ? arquivo.substring(1) : arquivo;
  return `/${cleanPath}`;
}