import type {
  AdminCollectionDefinitionDTO,
  AdminDashboardDTO,
  AdminModulePageDTO,
  AdminModuleSlug,
  AdminModuleSummaryDTO,
  AdminNavigationItemDTO,
} from "@/features/admin/dto/admin.dto"

const navigation: AdminNavigationItemDTO[] = [
  { label: "Dashboard", href: "/admin", iconKey: "layout-panel-top" },
  { label: "Acervo", href: "/admin/acervo", iconKey: "archive", module: "acervo" },
  { label: "Biblioteca", href: "/admin/biblioteca", iconKey: "book-open", module: "biblioteca" },
  { label: "Exposições", href: "/admin/exposicoes", iconKey: "sparkles", module: "exposicoes" },
  { label: "Visitas", href: "/admin/visitas", iconKey: "calendar", module: "visitas" },
  { label: "Galerias", href: "/admin/galerias", iconKey: "images", module: "galerias" },
  { label: "Notícias", href: "/admin/noticias", iconKey: "newspaper", module: "noticias" },
]

const modules: AdminModuleSummaryDTO[] = [
  {
    slug: "acervo",
    title: "Acervo",
    description: "Gerencia manuscritos, fotografias, documentos, audiovisual e coleções a partir de uma mesma taxonomia editorial.",
    iconKey: "archive",
    href: "/admin/acervo",
    readiness: "pronto_para_integracao",
    collections: ["Categorias", "Itens do acervo", "Mídias", "Publicação"],
    primaryAction: { label: "Abrir módulo", href: "/admin/acervo", tone: "primaria" },
    secondaryAction: { label: "Ver arquitetura", href: "/admin/acervo", tone: "secundaria" },
  },
  {
    slug: "biblioteca",
    title: "Biblioteca",
    description: "Centraliza publicações, pesquisas, artigos e TCCs com upload de arquivo, metadados e indexação por categoria.",
    iconKey: "book-open",
    href: "/admin/biblioteca",
    readiness: "pronto_para_integracao",
    collections: ["Documentos digitais", "Autores", "Categorias", "Arquivos"],
    primaryAction: { label: "Abrir módulo", href: "/admin/biblioteca", tone: "primaria" },
    secondaryAction: { label: "Ver arquitetura", href: "/admin/biblioteca", tone: "secundaria" },
  },
  {
    slug: "exposicoes",
    title: "Exposições",
    description: "Gerencia exposições virtuais, artistas, obras e textos curatoriais com editor de blocos e publicação dinâmica.",
    iconKey: "sparkles",
    href: "/admin/exposicoes",
    readiness: "funcional",
    collections: ["Exposições Virtuais", "Artistas", "Exposições Permanentes", "Exposições Temporárias"],
    primaryAction: { label: "Gerenciar exposições", href: "/admin/exposicoes", tone: "primaria" },
    secondaryAction: { label: "Ver arquitetura", href: "/admin/exposicoes", tone: "secundaria" },
  },
  {
    slug: "visitas",
    title: "Visitas",
    description: "Gerencia solicitações de visitação guiada enviadas pelo formulário do site.",
    iconKey: "calendar",
    href: "/admin/visitas",
    readiness: "funcional",
    collections: ["Solicitações", "Aceites", "Recusas"],
    primaryAction: { label: "Ver solicitações", href: "/admin/visitas", tone: "primaria" },
    secondaryAction: { label: "Abrir módulo", href: "/admin/visitas", tone: "secundaria" },
  },
  {
    slug: "galerias",
    title: "Galerias",
    description: "Gerencia álbuns, capas, itens de galeria e ordenação para páginas visuais orientadas por mídia.",
    iconKey: "images",
    href: "/admin/galerias",
    readiness: "funcional",
    collections: ["Álbuns", "Itens de galeria", "Capa", "Ordenação"],
    primaryAction: { label: "Abrir módulo", href: "/admin/galerias", tone: "primaria" },
    secondaryAction: { label: "Ver arquitetura", href: "/admin/galerias", tone: "secundaria" },
  },
  {
    slug: "noticias",
    title: "Notícias",
    description: "Cadastra avisos visuais exibidos em popup na página inicial para divulgar eventos e comunicados.",
    iconKey: "newspaper",
    href: "/admin/noticias",
    readiness: "funcional",
    collections: ["Popup inicial", "Imagem", "Período", "Publicação"],
    primaryAction: { label: "Gerenciar notícias", href: "/admin/noticias", tone: "primaria" },
    secondaryAction: { label: "Abrir módulo", href: "/admin/noticias", tone: "secundaria" },
  },
]

const collectionsByModule: Record<AdminModuleSlug, AdminCollectionDefinitionDTO[]> = {
  acervo: [
    {
      key: "acervo-categorias",
      title: "Categorias do acervo",
      description: "Agrupamento editorial das abas públicas; cada categoria contém mídias diretamente.",
      dtoName: "AcervoCategoriaDTO",
      fields: [
        { name: "nome", label: "Nome", type: "texto", required: true, helpText: "Nome da aba e do agrupamento no painel." },
        { name: "slug", label: "Slug", type: "slug", required: true, helpText: "Identificador estável na URL pública." },
        { name: "descricao", label: "Descrição", type: "richtext", required: false, helpText: "Texto introdutório da aba no site." },
        { name: "layoutPublico", label: "Layout", type: "select", required: true, helpText: "Lista ou galeria de fotos.", options: [
          { value: "lista", label: "Lista" },
          { value: "galeria", label: "Galeria" },
        ] },
      ],
    },
    {
      key: "acervo-midias",
      title: "Mídias do acervo",
      description: "Arquivos vinculados a uma categoria (sem camada intermediária de item).",
      dtoName: "AcervoMediaDTO",
      fields: [
        { name: "tipo", label: "Tipo da mídia", type: "select", required: true, helpText: "Define o comportamento do player e da visualização.", options: [
          { value: "imagem", label: "Imagem" },
          { value: "pdf", label: "PDF" },
          { value: "video", label: "Vídeo" },
          { value: "audio", label: "Áudio" },
        ] },
        { name: "arquivo", label: "Arquivo", type: "arquivo", required: true, helpText: "Upload físico do ativo em storage.", accept: [".jpg", ".jpeg", ".png", ".webp", ".pdf", ".mp4", ".mp3"] },
        { name: "legenda", label: "Legenda", type: "textarea", required: false, helpText: "Texto curto para contexto e acessibilidade." },
        { name: "ordem", label: "Ordem", type: "numero", required: false, helpText: "Usado para controle fino da ordem de apresentação." },
        { name: "categoriaId", label: "Categoria", type: "select", required: true, helpText: "Define em qual aba a mídia aparece.", options: [] },
      ],
    },
  ],
  biblioteca: [
    {
      key: "biblioteca-documentos",
      title: "Documentos digitais",
      description: "DTO voltado para acervo bibliográfico, reaproveitável entre publicações, pesquisas, artigos e TCCs.",
      dtoName: "BibliotecaDocumentoDTO",
      fields: [
        { name: "titulo", label: "Título", type: "texto", required: true, helpText: "Nome do documento exibido em listagens e busca." },
        { name: "autor", label: "Autor", type: "texto", required: false, helpText: "Campo normalizado para buscas por autoria." },
        { name: "categoria", label: "Categoria", type: "select", required: true, helpText: "Agrupa o documento na aba correta.", options: [
          { value: "publicacoes", label: "Publicações" },
          { value: "pesquisas", label: "Pesquisas" },
          { value: "artigos", label: "Artigos" },
          { value: "tcc", label: "TCC" },
        ] },
        { name: "ano", label: "Ano", type: "numero", required: false, helpText: "Suporta ordenação cronológica e filtros históricos." },
        { name: "arquivo", label: "Arquivo PDF", type: "arquivo", required: true, helpText: "Documento armazenado em storage.", accept: [".pdf"] },
      ],
    },
  ],
  exposicoes: [
    {
      key: "exposicoes",
      title: "Exposições",
      description: "DTO mestre para cada exposição virtual, com controle de publicação e hero próprio.",
      dtoName: "ExposicaoDTO",
      fields: [
        { name: "titulo", label: "Título", type: "texto", required: true, helpText: "Nome principal da exposição." },
        { name: "slug", label: "Slug", type: "slug", required: true, helpText: "Chave de rota pública estável." },
        { name: "descricao", label: "Descrição", type: "richtext", required: true, helpText: "Texto curatorial principal." },
        { name: "imagemCapa", label: "Imagem de capa", type: "imagem", required: false, helpText: "Capa principal da exposição.", accept: [".jpg", ".jpeg", ".png", ".webp"] },
      ],
    },
    {
      key: "artistas",
      title: "Artistas e obras",
      description: "DTO para artistas relacionados a uma exposição, com suportes multimídia e informações biográficas.",
      dtoName: "ArtistaExposicaoDTO",
      fields: [
        { name: "nome", label: "Nome", type: "texto", required: true, helpText: "Nome do artista." },
        { name: "bio", label: "Biografia", type: "richtext", required: false, helpText: "Texto usado em páginas individuais do artista." },
        { name: "galeria", label: "Galeria de obras", type: "galeria", required: false, helpText: "Conjunto de imagens relacionadas ao artista.", multiple: true, accept: [".jpg", ".jpeg", ".png", ".webp"] },
      ],
    },
  ],
  visitas: [
    {
      key: "solicitacoes-visita",
      title: "Solicitações de visita",
      description: "Pedidos enviados pelo formulário público de agendamento.",
      dtoName: "SolicitacaoVisitaDTO",
      fields: [
        { name: "email", label: "E-mail", type: "texto", required: true, helpText: "Contato do solicitante." },
        { name: "nomeInstituicao", label: "Nome / Instituição", type: "texto", required: true, helpText: "Identificação do grupo visitante." },
        { name: "dataVisita", label: "Data", type: "data", required: true, helpText: "Data desejada para a visita." },
        { name: "status", label: "Status", type: "select", required: true, helpText: "Pendente, aceita ou recusada.", options: [
          { value: "pendente", label: "Pendente" },
          { value: "aceita", label: "Aceita" },
          { value: "recusada", label: "Recusada" },
        ] },
      ],
    },
  ],
  galerias: [
    {
      key: "galerias",
      title: "Álbuns de galeria",
      description: "DTO para álbuns visuais independentes do acervo, com capa e taxonomia própria.",
      dtoName: "GaleriaAlbumDTO",
      fields: [
        { name: "titulo", label: "Título", type: "texto", required: true, helpText: "Nome público do álbum." },
        { name: "slug", label: "Slug", type: "slug", required: true, helpText: "Identificador da rota pública." },
        { name: "capa", label: "Imagem de capa", type: "imagem", required: true, helpText: "Imagem principal do card da galeria.", accept: [".jpg", ".jpeg", ".png", ".webp"] },
        { name: "itens", label: "Itens", type: "galeria", required: true, helpText: "Mídias internas do álbum com ordenação manual.", multiple: true, accept: [".jpg", ".jpeg", ".png", ".webp"] },
      ],
    },
  ],
  noticias: [
    {
      key: "noticias-popup",
      title: "Popup da página inicial",
      description: "Aviso visual exibido ao abrir a homepage para divulgar eventos e comunicados.",
      dtoName: "NoticiaDTO",
      fields: [
        { name: "titulo", label: "Título", type: "texto", required: true, helpText: "Nome interno da notícia." },
        { name: "imagemUrl", label: "Imagem", type: "imagem", required: true, helpText: "Arte exibida no popup.", accept: [".jpg", ".jpeg", ".png", ".webp"] },
        { name: "linkDestino", label: "Link", type: "url", required: false, helpText: "Destino ao clicar na imagem." },
        { name: "publicado", label: "Publicada", type: "booleano", required: true, helpText: "Controla visibilidade pública." },
      ],
    },
  ],
  paginas: [
    {
      key: "paginas",
      title: "Páginas institucionais",
      description: "DTO genérico para páginas editoriais que compartilham hero, blocos e SEO.",
      dtoName: "PaginaInstitucionalDTO",
      fields: [
        { name: "slug", label: "Slug", type: "slug", required: true, helpText: "Define a URL pública da página." },
        { name: "titulo", label: "Título", type: "texto", required: true, helpText: "Título principal renderizado no hero." },
        { name: "subtitulo", label: "Subtítulo", type: "textarea", required: false, helpText: "Resumo editorial curto para topo de página." },
        { name: "blocos", label: "Blocos de conteúdo", type: "richtext", required: true, helpText: "Estrutura editorial modular para conteúdo rico." },
        { name: "seoTitle", label: "SEO title", type: "texto", required: false, helpText: "Título específico para metadados." },
      ],
    },
  ],
  equipe: [
    {
      key: "equipe",
      title: "Membros da equipe",
      description: "DTO de apresentação institucional para equipe, colaboradores e convidados.",
      dtoName: "EquipeMemberDTO",
      fields: [
        { name: "nome", label: "Nome", type: "texto", required: true, helpText: "Nome do membro." },
        { name: "cargo", label: "Cargo", type: "texto", required: true, helpText: "Função exibida no card institucional." },
        { name: "bio", label: "Biografia", type: "richtext", required: false, helpText: "Descrição curta ou longa do membro." },
        { name: "foto", label: "Foto", type: "imagem", required: false, helpText: "Imagem de perfil do membro.", accept: [".jpg", ".jpeg", ".png", ".webp"] },
        { name: "ordem", label: "Ordem", type: "numero", required: false, helpText: "Controla destaque e organização visual." },
      ],
    },
  ],
  configuracoes: [
    {
      key: "site-settings",
      title: "Configurações globais",
      description: "DTO para dados globais do museu, reduzindo conteúdo duplicado em componentes de layout.",
      dtoName: "SiteSettingsDTO",
      fields: [
        { name: "telefone", label: "Telefone", type: "texto", required: false, helpText: "Telefone principal exibido no site." },
        { name: "email", label: "E-mail", type: "texto", required: false, helpText: "Contato institucional principal." },
        { name: "endereco", label: "Endereço", type: "textarea", required: false, helpText: "Endereço público e dados de visita." },
        { name: "horarios", label: "Horários", type: "textarea", required: false, helpText: "Horários de funcionamento do museu." },
        { name: "redes", label: "Redes sociais", type: "url", required: false, helpText: "Links públicos institucionais." },
      ],
    },
  ],
}

const moduleKpis: Record<AdminModuleSlug, AdminModulePageDTO["kpis"]> = {
  acervo: [
    { label: "Modelo principal", value: "Categoria + Midia", description: "Mídias vinculadas diretamente às categorias do acervo." },
    { label: "Subcoleções", value: "2", description: "Categorias e mídias." },
    { label: "Origem atual", value: "Prisma / PostgreSQL", description: "Persistência via API administrativa." },
  ],
  biblioteca: [
    { label: "Modelo principal", value: "BibliotecaDocumentoDTO", description: "Contrato único para PDFs e metadados editoriais." },
    { label: "Categorias", value: "4", description: "Publicações, pesquisas, artigos e TCCs." },
    { label: "Origem atual", value: "Arquivos públicos", description: "Acervo digital ainda é lido do diretório public." },
  ],
  exposicoes: [
    { label: "Modelo principal", value: "ExposicaoVirtualDTO", description: "DTO com título, slug, capa, seções JSONB e controle de publicação." },
    { label: "Artistas", value: "ArtistaExposicaoDTO", description: "Entidade separada com seções próprias, vinculada a uma exposição virtual." },
    { label: "Origem", value: "Supabase", description: "Dados migrados do código para tabelas dinâmicas no banco de dados." },
  ],
  visitas: [
    { label: "Modelo principal", value: "SolicitacaoVisitaDTO", description: "Pedidos de visitação guiada com fluxo de aprovação." },
    { label: "Status", value: "3 estados", description: "Pendente, aceita e recusada." },
    { label: "Origem", value: "Formulário do site", description: "Substitui o Google Forms de agendamento." },
  ],
  galerias: [
    { label: "Modelo principal", value: "GaleriaAlbumDTO", description: "Contrato para álbum, capa e mídias internas." },
    { label: "Conteúdo", value: "Visual-first", description: "Estrutura orientada por capa, data e itens." },
    { label: "Origem atual", value: "Supabase", description: "Álbuns e itens gerenciados no banco de dados via admin." },
  ],
  noticias: [
    { label: "Modelo principal", value: "NoticiaDTO", description: "Contrato para popup visual na homepage." },
    { label: "Exibição", value: "Automática", description: "Abre ao carregar a página inicial quando publicada." },
    { label: "Origem", value: "Supabase", description: "Imagem em storage e metadados na tabela noticias." },
  ],
  paginas: [
    { label: "Modelo principal", value: "PaginaInstitucionalDTO", description: "Contrato genérico para páginas institucionais." },
    { label: "Estratégia", value: "Blocos", description: "Permite reutilização de hero, CTA e conteúdo rico." },
    { label: "Origem atual", value: "Componentes fixos", description: "Textos e imagens estão espalhados no app router." },
  ],
  equipe: [
    { label: "Modelo principal", value: "EquipeMemberDTO", description: "Contrato enxuto para membros e colaboradores." },
    { label: "Conteúdo", value: "Perfil + ordem", description: "Suporta cards, biografia e destaque visual." },
    { label: "Origem atual", value: "Sobre estático", description: "Equipe atual está declarada na página institucional." },
  ],
  configuracoes: [
    { label: "Modelo principal", value: "SiteSettingsDTO", description: "Contrato para dados globais do site." },
    { label: "Escopo", value: "Global", description: "Atende header, footer, contato e visita." },
    { label: "Origem atual", value: "Espalhado", description: "Informações ainda estão replicadas em múltiplas páginas." },
  ],
}

const moduleWorkflows: Record<AdminModuleSlug, AdminModulePageDTO["workflows"]> = {
  acervo: [
    { title: "Cadastrar item", description: "Criar DTO principal com categoria, metadados editoriais e status de publicação." },
    { title: "Anexar mídia", description: "Enviar ativos para storage e vincular o retorno ao DTO de mídia." },
    { title: "Publicar", description: "Liberar o item para aparecer automaticamente na aba pública correspondente." },
  ],
  biblioteca: [
    { title: "Cadastrar documento", description: "Registrar título, autor, categoria e metadados bibliográficos." },
    { title: "Subir PDF", description: "Persistir o arquivo em storage com política dedicada de acesso." },
    { title: "Indexar", description: "Permitir busca, ordenação por ano e agrupamento por aba." },
  ],
  exposicoes: [
    { title: "Criar exposição", description: "Definir hero, descrição e datas principais." },
    { title: "Relacionar artistas", description: "Vincular artistas, obras e seções curatoriais em fluxo incremental." },
    { title: "Publicar por etapas", description: "Liberar seções conforme a curadoria aprovar o conteúdo." },
  ],
  visitas: [
    { title: "Receber solicitação", description: "Visitante preenche o formulário no site." },
    { title: "Analisar pedido", description: "Equipe revisa data, horário e número de pessoas." },
    { title: "Aceitar ou recusar", description: "Confirma ou declina a visita pelo painel administrativo." },
  ],
  galerias: [
    { title: "Criar álbum", description: "Definir título, slug, capa e metadados principais." },
    { title: "Ordenar mídias", description: "Organizar a sequência visual de cada item com ordenação manual." },
    { title: "Publicar", description: "Exibir o álbum na página pública sem criar nova rota manual." },
  ],
  noticias: [
    { title: "Enviar imagem", description: "Fazer upload da arte do aviso ou evento." },
    { title: "Definir período", description: "Opcionalmente limitar quando o popup deve aparecer." },
    { title: "Publicar", description: "Ativar exibição automática na página inicial." },
  ],
  paginas: [
    { title: "Selecionar página", description: "Mapear o slug institucional correspondente ao módulo público." },
    { title: "Editar blocos", description: "Atualizar hero, textos, CTA e SEO sem tocar no código." },
    { title: "Revisar", description: "Publicar depois de validar o impacto visual na experiência pública." },
  ],
  equipe: [
    { title: "Cadastrar membro", description: "Preencher nome, cargo, foto e biografia." },
    { title: "Ordenar destaques", description: "Controlar a ordem de exibição na página institucional." },
    { title: "Publicar", description: "Sincronizar mudanças automaticamente com a área pública." },
  ],
  configuracoes: [
    { title: "Editar dados globais", description: "Centralizar contato, endereço, horários e redes sociais." },
    { title: "Atualizar branding", description: "Ajustar banners e informações institucionais recorrentes." },
    { title: "Propagar mudanças", description: "Refletir alterações em header, footer e páginas de apoio." },
  ],
}

const moduleArchitectureNotes: Record<AdminModuleSlug, AdminModulePageDTO["architectureNotes"]> = {
  acervo: [
    { title: "DTO primeiro", description: "A UI administrativa deve depender de contratos DTO e não diretamente do schema Prisma, permitindo evolução sem quebrar o front." },
    { title: "Storage desacoplado", description: "Arquivos binários devem ser tratados fora do banco, com Prisma recebendo apenas metadados e referências estáveis." },
  ],
  biblioteca: [
    { title: "Contrato único de documento", description: "Mesmo com abas diferentes, um DTO compartilhado reduz duplicação e facilita filtros cross-category." },
    { title: "Indexação consistente", description: "Campos como autor, ano e categoria precisam ser normalizados para busca e ordenação previsíveis." },
  ],
  exposicoes: [
    { title: "Curadoria modular", description: "Exposição, artistas e mídias devem ter contratos separados para permitir publicação progressiva." },
    { title: "Slug estável", description: "O slug precisa ser imutável ou controlado por versionamento para não quebrar links curatoriais." },
  ],
  visitas: [
    { title: "Fluxo de aprovação", description: "Solicitações entram como pendentes e só mudam de status por ação explícita do admin." },
    { title: "Dados completos", description: "O formulário replica os campos do Google Forms para não perder contexto na triagem." },
  ],
  galerias: [
    { title: "Ordenação explícita", description: "Galerias são sensíveis a ordem, então o contrato precisa manter prioridade visual como dado de primeira classe." },
    { title: "Capa desacoplada", description: "A imagem de capa deve ser um campo próprio para evitar inferência a partir do primeiro item." },
  ],
  noticias: [
    { title: "Popup único", description: "Apenas uma notícia ativa como popup por vez evita sobreposição de avisos na homepage." },
    { title: "Agendamento opcional", description: "Datas de início e fim permitem campanhas temporárias sem intervenção manual." },
  ],
  paginas: [
    { title: "Páginas como conteúdo", description: "Separar texto institucional do código reduz retrabalho e permite operação editorial sem deploy." },
    { title: "Blocos reutilizáveis", description: "A modelagem por blocos evita DTOs gigantes e amplia reuso entre páginas." },
  ],
  equipe: [
    { title: "Domínio simples", description: "Equipe deve permanecer enxuta, com foco em apresentação institucional e ordenação." },
    { title: "Imagem opcional", description: "O contrato deve permitir membros sem foto para não bloquear publicação." },
  ],
  configuracoes: [
    { title: "Fonte única", description: "Dados globais precisam sair do código e virar uma única fonte de verdade para o site." },
    { title: "Baixa cardinalidade", description: "Esse módulo deve ser estável, pequeno e com forte controle de edição." },
  ],
}

export const adminDashboardSeed: AdminDashboardDTO = {
  title: "CMS Administrativo do Museu",
  description: "Base inicial do backoffice para gerenciar conteúdo orientado a DTOs, módulos de domínio e futura integração com Prisma e storage.",
  kpis: [
    { label: "Módulos planejados", value: "6", description: "Admin único com domínios separados por responsabilidade." },
    { label: "Contratos DTO iniciais", value: "8", description: "Cada módulo já nasce com contratos e coleções sugeridas." },
    { label: "Estratégia", value: "CMS modular", description: "Prisma como persistência e storage para arquivos." },
  ],
  navigation,
  modules,
  recentActivity: [
    { module: "Arquitetura", title: "Backoffice unificado definido", description: "A estrutura administrativa passa a ser orientada por módulos em vez de páginas isoladas.", status: "publicado", timestampLabel: "Agora" },
    { module: "Acervo", title: "DTOs do módulo mapeados", description: "Itens e mídias do acervo já possuem contratos de referência para futuras rotas e formulários.", status: "rascunho", timestampLabel: "Planejamento" },
  ],
  architectureNotes: [
    { title: "Camada DTO", description: "O painel deve trabalhar com DTOs como fronteira estável entre UI, serviços e persistência." },
    { title: "Módulos independentes", description: "Cada domínio do CMS evolui separadamente, mas compartilha navegação, padrões de publicação e gestão de mídia." },
    { title: "Estrutura pronta para Prisma", description: "Os serviços da feature admin podem trocar dados estáticos por Prisma sem reescrever a camada visual." },
  ],
}

export function getAdminModuleSummary(slug: AdminModuleSlug) {
  return modules.find((module) => module.slug === slug)
}

export function getAdminModulePageSeed(slug: AdminModuleSlug): AdminModulePageDTO | null {
  const module = getAdminModuleSummary(slug)
  if (!module) {
    return null
  }

  return {
    module,
    kpis: moduleKpis[slug],
    collections: collectionsByModule[slug],
    workflows: moduleWorkflows[slug],
    architectureNotes: moduleArchitectureNotes[slug],
  }
}
