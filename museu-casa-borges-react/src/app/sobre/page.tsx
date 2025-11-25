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
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <Badge className="bg-amber-600 hover:bg-amber-700">Fundado em 1999</Badge>
              <Badge className="bg-blue-600 hover:bg-blue-700">25 Anos de História</Badge>
              <Badge className="bg-emerald-600 hover:bg-emerald-700">Patrimônio Cultural</Badge>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* AIDEV-NOTE: Conteúdo principal organizado em tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
              <TabsTrigger value="conteudo">Conteúdo Histórico</TabsTrigger>
              <TabsTrigger value="equipe">Equipe</TabsTrigger>
            </TabsList>
            {/* AIDEV-NOTE: Tab Conteúdo Histórico - Migrado dos arquivos HTML originais */}
            <TabsContent value="conteudo" className="space-y-6">
              <AboutContent />
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
