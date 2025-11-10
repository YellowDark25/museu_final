'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, MapPin, Clock, Users, Camera, Info, Star } from 'lucide-react'
import Image from 'next/image'

export default function CasaBalatiponePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* AIDEV-NOTE: Hero section com imagem de fundo e informações principais da Casa Balatiponé */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="/images/fundo3.jpg"
          alt="Casa Balatiponé"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl font-bold mb-4">Casa Balatiponé</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Joia da arquitetura colonial argentina preservada no tempo
            </p>
            <div className="flex gap-2 justify-center mt-4">
              <Badge className="bg-emerald-600 hover:bg-emerald-700">
                Século XVII
              </Badge>
              <Badge className="bg-teal-600 hover:bg-teal-700">
                Patrimônio Nacional
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* AIDEV-NOTE: Informações básicas em cards com ícones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
              <p className="font-semibold">Construída em</p>
              <p className="text-sm text-muted-foreground">1680</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
              <p className="font-semibold">Localização</p>
              <p className="text-sm text-muted-foreground">Buenos Aires</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
              <p className="font-semibold">Status</p>
              <p className="text-sm text-muted-foreground">Monumento Histórico</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
              <p className="font-semibold">Restauração</p>
              <p className="text-sm text-muted-foreground">1995-2000</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* AIDEV-NOTE: Conteúdo principal organizado em tabs para melhor navegação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="historia" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="historia">História</TabsTrigger>
              <TabsTrigger value="arquitetura">Arquitetura</TabsTrigger>
              <TabsTrigger value="colecao">Coleção</TabsTrigger>
              <TabsTrigger value="eventos">Eventos</TabsTrigger>
              <TabsTrigger value="visita">Visita</TabsTrigger>
            </TabsList>

            <TabsContent value="historia" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    História da Casa Balatiponé
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Fundação Colonial</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A Casa Balatiponé foi construída em 1680 por Don Francisco Balatiponé, um comerciante 
                      espanhol que se estabeleceu em Buenos Aires durante o período colonial. A casa representa 
                      um dos mais antigos exemplares da arquitetura residencial colonial preservados na Argentina.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Era da Independência</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Durante as guerras de independência argentina (1810-1820), a casa serviu como ponto de 
                      encontro para revolucionários e intelectuais. Figuras históricas como Manuel Belgrano 
                      e Mariano Moreno frequentaram seus salões, discutindo os rumos da nação nascente.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Século XIX e XX</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      No século XIX, a casa passou por diferentes proprietários, mantendo sempre sua importância 
                      social e cultural. No século XX, foi adquirida pelo governo argentino e transformada em 
                      museu, preservando sua arquitetura original e abrigando importantes coleções históricas.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Patrimônio Nacional</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Em 1942, a Casa Balatiponé foi declarada Monumento Histórico Nacional, reconhecendo 
                      sua importância para a história argentina. Desde então, tem sido cuidadosamente 
                      preservada como testemunho vivo do período colonial e da formação da identidade nacional.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="arquitetura" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Características Arquitetônicas</CardTitle>
                  <CardDescription>
                    Exemplo excepcional da arquitetura colonial hispano-americana
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Estrutura Principal</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Paredes de adobe e tijolo</li>
                        <li>• Telhado de telhas coloniais espanholas</li>
                        <li>• Pátio central com galeria</li>
                        <li>• Janelas com grades de ferro forjado</li>
                        <li>• Pisos de ladrilho original</li>
                        <li>• Vigas de madeira aparentes</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Elementos Decorativos</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Azulejos sevilhanos originais</li>
                        <li>• Trabalhos em ferro forjado artesanal</li>
                        <li>• Pinturas murais do século XVII</li>
                        <li>• Mobiliário colonial preservado</li>
                        <li>• Altar doméstico barroco</li>
                        <li>• Jardim com espécies nativas</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Planta Arquitetônica</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A casa segue o modelo típico da arquitetura colonial hispano-americana: um pátio central 
                      rodeado por cômodos dispostos em forma de U. Esta configuração proporcionava ventilação 
                      natural, proteção contra o clima e criava um espaço de convivência familiar protegido.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Técnicas Construtivas</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A construção emprega técnicas tradicionais espanholas adaptadas aos materiais locais: 
                      adobe para as paredes, madeira de quebracho para as estruturas, e telhas de barro 
                      cozido para a cobertura. Estas técnicas garantiram a durabilidade da construção 
                      por mais de três séculos.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="colecao" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Coleção Permanente</CardTitle>
                  <CardDescription>
                    Acervo histórico e artístico dos séculos XVII ao XIX
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Mobiliário Colonial</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Arcas de madeira entalhada (séc. XVII)</li>
                        <li>• Cadeiras de couro repujado</li>
                        <li>• Mesa de refeitório original</li>
                        <li>• Cama com dossel colonial</li>
                        <li>• Oratório doméstico barroco</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Arte Sacra</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Imagens religiosas coloniais</li>
                        <li>• Pinturas sobre madeira</li>
                        <li>• Prataria litúrgica</li>
                        <li>• Livros de oração manuscritos</li>
                        <li>• Ex-votos e milagres</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Documentos Históricos</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A casa abriga uma importante coleção de documentos históricos, incluindo cartas, 
                      contratos comerciais, mapas antigos e registros familiares que documentam a vida 
                      cotidiana durante o período colonial e os primeiros anos da independência argentina.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Objetos Cotidianos</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Uma rica coleção de objetos do dia a dia colonial: utensílios de cozinha, 
                      instrumentos de trabalho, jogos, roupas e acessórios que oferecem uma visão 
                      íntima da vida doméstica nos séculos XVII e XVIII.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="eventos" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Eventos e Atividades</CardTitle>
                  <CardDescription>
                    Programação cultural e educativa
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Eventos Regulares</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Concertos de música barroca (mensais)</li>
                        <li>• Palestras sobre história colonial</li>
                        <li>• Oficinas de artesanato tradicional</li>
                        <li>• Noites de poesia e literatura</li>
                        <li>• Exposições temporárias</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Programas Educativos</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Visitas escolares temáticas</li>
                        <li>• Cursos de história argentina</li>
                        <li>• Workshops de conservação</li>
                        <li>• Programa de jovens guias</li>
                        <li>• Pesquisa acadêmica</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Eventos Especiais</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-emerald-500 pl-4">
                        <h4 className="font-semibold">Semana da Independência (Maio)</h4>
                        <p className="text-sm text-muted-foreground">
                          Recreações históricas e atividades comemorativas
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-emerald-500 pl-4">
                        <h4 className="font-semibold">Noite dos Museus (Novembro)</h4>
                        <p className="text-sm text-muted-foreground">
                          Abertura noturna especial com programação cultural
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-emerald-500 pl-4">
                        <h4 className="font-semibold">Festival Colonial (Dezembro)</h4>
                        <p className="text-sm text-muted-foreground">
                          Celebração da cultura colonial com música, dança e gastronomia
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visita" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações para Visitantes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Horários de Funcionamento</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Terça a Sexta:</span>
                          <span>10h às 18h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sábados:</span>
                          <span>10h às 16h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Domingos:</span>
                          <span>11h às 15h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Segundas:</span>
                          <span className="text-red-600">Fechado</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Ingressos</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Entrada Geral:</span>
                          <span>$500 ARS</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estudantes:</span>
                          <span>$250 ARS</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Idosos (65+):</span>
                          <span>$250 ARS</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Crianças (-12):</span>
                          <span className="text-green-600">Gratuito</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Serviços Disponíveis</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <Camera className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                        <p className="text-sm">Visitas Guiadas</p>
                      </div>
                      <div className="text-center">
                        <Info className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                        <p className="text-sm">Audioguia</p>
                      </div>
                      <div className="text-center">
                        <Users className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                        <p className="text-sm">Grupos Escolares</p>
                      </div>
                      <div className="text-center">
                        <MapPin className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                        <p className="text-sm">Biblioteca</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Acessibilidade</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A casa conta com adaptações para pessoas com mobilidade reduzida, incluindo 
                      rampas de acesso, banheiros adaptados e percursos alternativos. Visitas 
                      especiais podem ser agendadas para pessoas com necessidades específicas.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      Agendar Visita
                    </Button>
                    <Button variant="outline">
                      Ver Localização
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
