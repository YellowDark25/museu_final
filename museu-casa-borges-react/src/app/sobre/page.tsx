'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Building, 
  Users, 
  BookOpen, 
  Award, 
  Calendar,
  Heart,
  Target,
  Eye,
  Globe,
  Clock,
  MapPin,
  Star,
  Camera,
  Palette,
  Music,
  GraduationCap,
  Lightbulb,
  Handshake
} from 'lucide-react'
import Image from 'next/image'
import AboutContent from '@/components/sobre/AboutContent'

/**
 * AIDEV-NOTE: Página Sobre do Museu Casa Jorge Luis Borges
 * Apresenta informações institucionais detalhadas, história, missão e equipe
 * Utiliza tabs para organizar o conteúdo e animações com framer-motion
 * Incorpora componentes do shadcn/ui para interface moderna e responsiva
 */
export default function SobrePage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('historia')

  // AIDEV-NOTE: Lê o parâmetro 'tab' da URL para definir a aba ativa
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam && ['historia', 'conteudo', 'missao', 'acervo', 'equipe', 'premios'].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">
      {/* AIDEV-NOTE: Hero section com imagem de fundo e informações principais */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="/images/fundo2.jpg"
          alt="Sobre o Museu Casa de Jorge Luis Borges"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl font-bold mb-4">Sobre o Museu</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Preservando a memória e o legado de Jorge Luis Borges, 
              um dos maiores escritores da literatura mundial
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <Badge className="bg-amber-600 hover:bg-amber-700">Fundado em 1999</Badge>
              <Badge className="bg-blue-600 hover:bg-blue-700">25 Anos de História</Badge>
              <Badge className="bg-emerald-600 hover:bg-emerald-700">Patrimônio Cultural</Badge>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* AIDEV-NOTE: Estatísticas principais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">500K+</div>
              <p className="text-sm text-muted-foreground">Visitantes</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
              <div className="text-2xl font-bold">15K+</div>
              <p className="text-sm text-muted-foreground">Documentos</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Camera className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">3K+</div>
              <p className="text-sm text-muted-foreground">Fotografias</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Award className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <div className="text-2xl font-bold">50+</div>
              <p className="text-sm text-muted-foreground">Prêmios</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* AIDEV-NOTE: Conteúdo principal organizado em tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
              <TabsTrigger value="historia">História</TabsTrigger>
              <TabsTrigger value="conteudo">Conteúdo Histórico</TabsTrigger>
              <TabsTrigger value="missao">Missão</TabsTrigger>
              <TabsTrigger value="acervo">Acervo</TabsTrigger>
              <TabsTrigger value="equipe">Equipe</TabsTrigger>
              <TabsTrigger value="premios">Prêmios</TabsTrigger>
            </TabsList>

            {/* AIDEV-NOTE: Tab História */}
            <TabsContent value="historia" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Nossa História
                  </CardTitle>
                  <CardDescription>
                    A trajetória de criação e desenvolvimento do museu
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-lg leading-relaxed">
                      O Museu Casa de Jorge Luis Borges foi inaugurado em 1999, na casa onde o escritor 
                      argentino viveu durante seus últimos anos. Localizada no coração de Buenos Aires, 
                      a residência foi cuidadosamente preservada e transformada em um espaço dedicado 
                      à memória e obra do autor.
                    </p>
                    
                    <p className="leading-relaxed">
                      A iniciativa partiu da Fundação Internacional Jorge Luis Borges, com o apoio 
                      do governo argentino e de instituições culturais internacionais. O objetivo 
                      era criar um centro de referência mundial sobre a vida e obra de Borges, 
                      preservando não apenas seus manuscritos e objetos pessoais, mas também 
                      o ambiente onde ele criou algumas de suas obras mais importantes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-amber-50">
                      <CardContent className="pt-6">
                        <Calendar className="h-8 w-8 text-amber-600 mb-3" />
                        <h3 className="font-semibold mb-2">Cronologia</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>1986</span>
                            <span>Morte de Borges</span>
                          </div>
                          <div className="flex justify-between">
                            <span>1995</span>
                            <span>Criação da Fundação</span>
                          </div>
                          <div className="flex justify-between">
                            <span>1999</span>
                            <span>Inauguração do Museu</span>
                          </div>
                          <div className="flex justify-between">
                            <span>2010</span>
                            <span>Expansão Digital</span>
                          </div>
                          <div className="flex justify-between">
                            <span>2024</span>
                            <span>Renovação Completa</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50">
                      <CardContent className="pt-6">
                        <MapPin className="h-8 w-8 text-blue-600 mb-3" />
                        <h3 className="font-semibold mb-2">Localização Histórica</h3>
                        <p className="text-sm leading-relaxed">
                          A casa está situada na Rua Maipú, no bairro de Palermo, uma região 
                          que Borges frequentava desde a infância e que aparece em muitas 
                          de suas obras. O edifício, construído em 1920, mantém a arquitetura 
                          original e foi declarado Patrimônio Cultural da Cidade.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AIDEV-NOTE: Tab Conteúdo Histórico - Migrado dos arquivos HTML originais */}
            <TabsContent value="conteudo" className="space-y-6">
              <AboutContent />
            </TabsContent>

            {/* AIDEV-NOTE: Tab Missão */}
            <TabsContent value="missao" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardContent className="pt-6 text-center">
                    <Target className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="font-bold text-lg mb-3">Missão</h3>
                    <p className="text-sm leading-relaxed">
                      Preservar, pesquisar e difundir o legado literário de Jorge Luis Borges, 
                      promovendo o acesso à cultura e incentivando novas gerações de leitores 
                      e escritores.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100">
                  <CardContent className="pt-6 text-center">
                    <Eye className="h-12 w-12 mx-auto mb-4 text-emerald-600" />
                    <h3 className="font-bold text-lg mb-3">Visão</h3>
                    <p className="text-sm leading-relaxed">
                      Ser reconhecido mundialmente como o principal centro de referência 
                      sobre Jorge Luis Borges, conectando culturas e promovendo o diálogo 
                      intercultural através da literatura.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                  <CardContent className="pt-6 text-center">
                    <Heart className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                    <h3 className="font-bold text-lg mb-3">Valores</h3>
                    <p className="text-sm leading-relaxed">
                      Excelência cultural, acessibilidade, preservação histórica, 
                      inovação educativa e compromisso com a democratização do 
                      conhecimento literário.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Objetivos Estratégicos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <BookOpen className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Preservação</h4>
                          <p className="text-sm text-muted-foreground">
                            Conservar e digitalizar todo o acervo borgiano para futuras gerações
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Educação</h4>
                          <p className="text-sm text-muted-foreground">
                            Desenvolver programas educativos inovadores para todas as idades
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Globe className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Internacionalização</h4>
                          <p className="text-sm text-muted-foreground">
                            Expandir o alcance global através de parcerias e tecnologia
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Comunidade</h4>
                          <p className="text-sm text-muted-foreground">
                            Fortalecer laços com a comunidade local e acadêmica internacional
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Palette className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Inovação</h4>
                          <p className="text-sm text-muted-foreground">
                            Utilizar tecnologias emergentes para experiências imersivas
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Handshake className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Parcerias</h4>
                          <p className="text-sm text-muted-foreground">
                            Colaborar com instituições culturais e educacionais mundiais
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AIDEV-NOTE: Tab Acervo */}
            <TabsContent value="acervo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Nosso Acervo
                  </CardTitle>
                  <CardDescription>
                    Uma das mais completas coleções borgianas do mundo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
                      <CardContent className="pt-6 text-center">
                        <BookOpen className="h-10 w-10 mx-auto mb-3 text-amber-600" />
                        <div className="text-2xl font-bold">2,500</div>
                        <p className="text-sm text-muted-foreground">Manuscritos Originais</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardContent className="pt-6 text-center">
                        <Camera className="h-10 w-10 mx-auto mb-3 text-blue-600" />
                        <div className="text-2xl font-bold">3,200</div>
                        <p className="text-sm text-muted-foreground">Fotografias</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100">
                      <CardContent className="pt-6 text-center">
                        <Music className="h-10 w-10 mx-auto mb-3 text-emerald-600" />
                        <div className="text-2xl font-bold">800</div>
                        <p className="text-sm text-muted-foreground">Gravações de Áudio</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                      <CardContent className="pt-6 text-center">
                        <Globe className="h-10 w-10 mx-auto mb-3 text-purple-600" />
                        <div className="text-2xl font-bold">15,000</div>
                        <p className="text-sm text-muted-foreground">Livros da Biblioteca</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 space-y-4">
                    <h3 className="text-lg font-semibold">Destaques da Coleção</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Manuscritos Únicos</h4>
                        <p className="text-sm text-muted-foreground">
                          Originais de "O Aleph", "Ficções" e "O Livro de Areia", 
                          incluindo rascunhos e anotações pessoais do autor.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Biblioteca Pessoal</h4>
                        <p className="text-sm text-muted-foreground">
                          Mais de 15.000 volumes da biblioteca pessoal de Borges, 
                          com anotações marginais e marcações do escritor.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Correspondências</h4>
                        <p className="text-sm text-muted-foreground">
                          Cartas trocadas com grandes nomes da literatura mundial, 
                          incluindo Octavio Paz, Italo Calvino e Susan Sontag.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Objetos Pessoais</h4>
                        <p className="text-sm text-muted-foreground">
                          Bengala, óculos, máquina de escrever e outros objetos 
                          que fizeram parte do cotidiano do escritor.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AIDEV-NOTE: Tab Equipe - Atualizada com fotos reais da equipe */}
            <TabsContent value="equipe" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Nossa Equipe
                  </CardTitle>
                  <CardDescription>
                    Profissionais dedicados à preservação e difusão da cultura e memória local
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* AIDEV-NOTE: Ana - Coordenadora Educativa */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="pt-6">
                          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                            <Image
                              src="/equipe/kleverson.png"
                              alt="Kleverson - Coordenadora Educativa"
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="font-semibold text-lg">Kleverson Silva Jara</h3>
                          <p className="text-sm text-muted-foreground mb-2">Desenvolvedor</p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* AIDEV-NOTE: Cláudia - Diretora Geral */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="pt-6">
                          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                            <Image
                              src="/equipe/Cláudia.jpeg"
                              alt="Cláudia Landin Negreiros - Coordenadora"
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="font-semibold text-lg">Cláudia Landin Negreiros</h3>
                          <p className="text-sm text-muted-foreground mb-2">Coordenadora</p>
                          <p className="text-xs text-gray-600">Responsável pela gestão e direção estratégica do museu</p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* AIDEV-NOTE: Helena - Curadora */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="pt-6">
                          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                            <Image
                              src="/equipe/Helena.jpeg"
                              alt="Helena - Curadora"
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="font-semibold text-lg">Helena</h3>
                          <p className="text-sm text-muted-foreground mb-2">Curadora</p>
                          <p className="text-xs text-gray-600">Especialista em curadoria e preservação do acervo histórico</p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* AIDEV-NOTE: João - Pesquisador */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="pt-6">
                          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                            <Image
                              src="/equipe/joão.jpeg"
                              alt="João - Pesquisador"
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="font-semibold text-lg">João</h3>
                          <p className="text-sm text-muted-foreground mb-2">Pesquisador</p>
                          <p className="text-xs text-gray-600">Responsável por pesquisas históricas e documentação</p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* AIDEV-NOTE: Michely - Coordenadora de Projetos */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="pt-6">
                          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                            <Image
                              src="/equipe/michely.jpeg"
                              alt="Michely - Coordenadora de Projetos"
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="font-semibold text-lg">Michely</h3>
                          <p className="text-sm text-muted-foreground mb-2">Coordenadora de Projetos</p>
                          <p className="text-xs text-gray-600">Gestão de projetos culturais e eventos do museu</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AIDEV-NOTE: Tab Prêmios */}
            <TabsContent value="premios" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Reconhecimentos e Prêmios
                  </CardTitle>
                  <CardDescription>
                    Honrarias recebidas ao longo de nossa trajetória
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
                        <CardContent className="pt-6">
                          <Star className="h-8 w-8 text-yellow-600 mb-3" />
                          <h3 className="font-semibold mb-2">Prêmio UNESCO</h3>
                          <p className="text-sm text-muted-foreground mb-2">2020</p>
                          <p className="text-xs">
                            Reconhecimento pela excelência na preservação do patrimônio literário mundial
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                        <CardContent className="pt-6">
                          <Award className="h-8 w-8 text-blue-600 mb-3" />
                          <h3 className="font-semibold mb-2">Melhor Museu Literário</h3>
                          <p className="text-sm text-muted-foreground mb-2">2019</p>
                          <p className="text-xs">
                            Prêmio da Associação Internacional de Museus Literários
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100">
                        <CardContent className="pt-6">
                          <Globe className="h-8 w-8 text-emerald-600 mb-3" />
                          <h3 className="font-semibold mb-2">Patrimônio Cultural</h3>
                          <p className="text-sm text-muted-foreground mb-2">2018</p>
                          <p className="text-xs">
                            Declarado Patrimônio Cultural da Humanidade pela UNESCO
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                        <CardContent className="pt-6">
                          <GraduationCap className="h-8 w-8 text-purple-600 mb-3" />
                          <h3 className="font-semibold mb-2">Excelência Educativa</h3>
                          <p className="text-sm text-muted-foreground mb-2">2017</p>
                          <p className="text-xs">
                            Prêmio Nacional de Educação Cultural Argentina
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                      <h3 className="font-semibold mb-4">Outros Reconhecimentos</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <p>• <strong>2021:</strong> Prêmio de Inovação Digital em Museus</p>
                          <p>• <strong>2020:</strong> Certificação de Acessibilidade Universal</p>
                          <p>• <strong>2019:</strong> Prêmio de Sustentabilidade Cultural</p>
                          <p>• <strong>2018:</strong> Reconhecimento de Excelência Turística</p>
                        </div>
                        <div className="space-y-2">
                          <p>• <strong>2017:</strong> Prêmio de Preservação Histórica</p>
                          <p>• <strong>2016:</strong> Certificação ISO 21500</p>
                          <p>• <strong>2015:</strong> Prêmio de Responsabilidade Social</p>
                          <p>• <strong>2014:</strong> Reconhecimento Internacional ICOM</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <Button className="bg-amber-600 hover:bg-amber-700">
                        <Award className="h-4 w-4 mr-2" />
                        Ver Todos os Prêmios
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* AIDEV-NOTE: Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-2xl font-bold mb-4">Visite-nos</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Venha conhecer pessoalmente este espaço único dedicado à memória de Jorge Luis Borges. 
                Uma experiência inesquecível para amantes da literatura.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                  <MapPin className="h-4 w-4 mr-2" />
                  Como Chegar
                </Button>
                <Button size="lg" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Horários de Funcionamento
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
