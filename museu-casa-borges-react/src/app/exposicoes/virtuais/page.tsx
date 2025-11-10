import { Metadata } from 'next'
import ContentPage from '@/components/content/ContentPage'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Play, Download, Share2, Eye, Headphones, Monitor } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Exposições Virtuais | Museu Casa Borges',
  description: 'Explore as exposições virtuais do Museu Casa Borges com tours 360°, galerias interativas e experiências digitais imersivas.',
  keywords: ['exposições virtuais', 'tour 360°', 'realidade virtual', 'galeria digital', 'experiência imersiva'],
}

// AIDEV-NOTE: Página de exposições virtuais com tours 360°, galerias interativas e conteúdo digital
// Oferece experiências imersivas e acessíveis para visitantes remotos
export default function ExposicoesVirtuais() {
  const exposicoesVirtuais = [
    {
      id: 1,
      titulo: "Tour Virtual Completo do Museu",
      descricao: "Explore todas as salas do museu em uma experiência 360° completa, com narração em português e espanhol.",
      tipo: "tour_360",
      duracao: "45 minutos",
      idiomas: ["Português", "Español", "English"],
      qualidade: "4K",
      downloads: 15420,
      visualizacoes: 89650,
      imagem: "/images/fundo1.jpg",
      recursos: [
        "Navegação 360° completa",
        "Narração profissional",
        "Zoom em alta resolução",
        "Pontos de interesse interativos",
        "Trilha sonora original"
      ],
      disponivel: true
    },
    {
      id: 2,
      titulo: "Galeria Digital: Manuscritos de Borges",
      descricao: "Uma coleção digital interativa dos manuscritos originais de Jorge Luis Borges, com análises detalhadas.",
      tipo: "galeria_digital",
      duracao: "Livre",
      idiomas: ["Português", "Español"],
      qualidade: "Ultra HD",
      downloads: 8930,
      visualizacoes: 45230,
      imagem: "/images/fundo2.jpg",
      recursos: [
        "Manuscritos em alta resolução",
        "Análise paleográfica",
        "Comparação de versões",
        "Notas explicativas",
        "Busca por palavra-chave"
      ],
      disponivel: true
    },
    {
      id: 3,
      titulo: "Experiência VR: O Labirinto de Borges",
      descricao: "Uma experiência de realidade virtual que recria os labirintos conceituais presentes na obra borgiana.",
      tipo: "realidade_virtual",
      duracao: "20 minutos",
      idiomas: ["Português", "Español", "English"],
      qualidade: "VR 8K",
      downloads: 3450,
      visualizacoes: 12890,
      imagem: "/images/fundo3.jpg",
      recursos: [
        "Experiência VR completa",
        "Interação por gestos",
        "Ambientação sonora 3D",
        "Múltiplos caminhos",
        "Compatível com Oculus/Meta"
      ],
      disponivel: true
    },
    {
      id: 4,
      titulo: "Audioguia Interativo",
      descricao: "Um audioguia completo com narrações, música e efeitos sonoros para acompanhar sua visita virtual ou presencial.",
      tipo: "audioguia",
      duracao: "60 minutos",
      idiomas: ["Português", "Español", "English", "Français"],
      qualidade: "Hi-Fi",
      downloads: 23670,
      visualizacoes: 67890,
      imagem: "/images/fundo4.jpg",
      recursos: [
        "Narração profissional",
        "Trilha sonora original",
        "Sincronização automática",
        "Modo offline disponível",
        "Acessibilidade para deficientes visuais"
      ],
      disponivel: true
    },
    {
      id: 5,
      titulo: "Documentário: A Buenos Aires de Borges",
      descricao: "Um documentário exclusivo sobre os lugares de Buenos Aires que marcaram a vida e obra de Jorge Luis Borges.",
      tipo: "documentario",
      duracao: "35 minutos",
      idiomas: ["Português", "Español"],
      qualidade: "4K HDR",
      downloads: 5670,
      visualizacoes: 28450,
      imagem: "/images/fundo1.jpg",
      recursos: [
        "Filmagem em 4K HDR",
        "Entrevistas exclusivas",
        "Imagens históricas raras",
        "Locações autênticas",
        "Legendas em múltiplos idiomas"
      ],
      disponivel: false
    }
  ]

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'tour_360':
        return <Monitor className="h-5 w-5" />
      case 'galeria_digital':
        return <Eye className="h-5 w-5" />
      case 'realidade_virtual':
        return <Play className="h-5 w-5" />
      case 'audioguia':
        return <Headphones className="h-5 w-5" />
      case 'documentario':
        return <Play className="h-5 w-5" />
      default:
        return <Monitor className="h-5 w-5" />
    }
  }

  const getTipoBadge = (tipo: string) => {
    const badges = {
      'tour_360': { label: 'Tour 360°', color: 'bg-blue-500' },
      'galeria_digital': { label: 'Galeria Digital', color: 'bg-green-500' },
      'realidade_virtual': { label: 'Realidade Virtual', color: 'bg-purple-500' },
      'audioguia': { label: 'Audioguia', color: 'bg-orange-500' },
      'documentario': { label: 'Documentário', color: 'bg-red-500' }
    }
    
    const badge = badges[tipo as keyof typeof badges]
    return <Badge className={badge.color}>{badge.label}</Badge>
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('pt-BR')
  }

  return (      <ContentPage
        title="Exposições Virtuais"
        subtitle="Explore o museu e suas coleções através de experiências digitais imersivas e interativas"
        backgroundImage="/images/fundo3.jpg"
      >
        <div className="space-y-12">
          {/* Introdução */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nossas exposições virtuais oferecem uma nova forma de explorar o universo de Jorge Luis Borges. 
              Através de tecnologias avançadas como realidade virtual, tours 360° e galerias interativas, 
              você pode vivenciar o museu de qualquer lugar do mundo.
            </p>
          </motion.div>

          {/* Estatísticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Experiências Virtuais</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">244K+</div>
              <div className="text-sm text-muted-foreground">Visualizações</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">57K+</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Idiomas</div>
            </div>
          </motion.div>

          {/* Grid de Exposições Virtuais */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {exposicoesVirtuais.map((exposicao, index) => (
              <motion.div
                key={exposicao.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`h-full transition-all duration-300 hover:shadow-xl ${
                  !exposicao.disponivel ? 'opacity-75' : ''
                }`}>
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={exposicao.imagem}
                      alt={exposicao.titulo}
                      fill
                      className={`object-cover transition-transform duration-300 hover:scale-105 ${
                        !exposicao.disponivel ? 'grayscale' : ''
                      }`}
                    />
                    <div className="absolute top-4 left-4">
                      {getTipoBadge(exposicao.tipo)}
                    </div>
                    {!exposicao.disponivel && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary">Em Breve</Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      {getTipoIcon(exposicao.tipo)}
                      {exposicao.titulo}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {exposicao.descricao}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Informações Técnicas */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Duração:</span> {exposicao.duracao}
                      </div>
                      <div>
                        <span className="font-medium">Qualidade:</span> {exposicao.qualidade}
                      </div>
                      <div>
                        <span className="font-medium">Idiomas:</span> {exposicao.idiomas.length}
                      </div>
                      <div>
                        <span className="font-medium">Visualizações:</span> {formatNumber(exposicao.visualizacoes)}
                      </div>
                    </div>

                    {/* Idiomas Disponíveis */}
                    <div>
                      <span className="font-medium text-sm">Idiomas disponíveis:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {exposicao.idiomas.map((idioma) => (
                          <Badge key={idioma} variant="outline" className="text-xs">
                            {idioma}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Recursos */}
                    <div>
                      <span className="font-medium text-sm">Recursos:</span>
                      <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                        {exposicao.recursos.slice(0, 3).map((recurso, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {recurso}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        disabled={!exposicao.disponivel}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {exposicao.disponivel ? 'Iniciar' : 'Em Breve'}
                      </Button>
                      <Button variant="outline" size="icon" disabled={!exposicao.disponivel}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" disabled={!exposicao.disponivel}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Requisitos Técnicos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-muted/50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Requisitos Técnicos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Tours 360° e Galerias</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Navegador moderno (Chrome, Firefox, Safari)</li>
                  <li>• Conexão de internet estável (5 Mbps+)</li>
                  <li>• Resolução mínima: 1280x720</li>
                  <li>• JavaScript habilitado</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Realidade Virtual</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Headset VR compatível</li>
                  <li>• PC com placa de vídeo dedicada</li>
                  <li>• 8GB RAM mínimo</li>
                  <li>• Espaço livre: 2GB</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Audioguias</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Fones de ouvido recomendados</li>
                  <li>• Aplicativo móvel disponível</li>
                  <li>• Modo offline suportado</li>
                  <li>• Compatível com leitores de tela</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </ContentPage>  )
}
