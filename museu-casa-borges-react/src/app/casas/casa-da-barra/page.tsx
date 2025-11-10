'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, MapPin, Clock, Users, Camera, Info } from 'lucide-react'
import Image from 'next/image'

export default function CasaDaBarraPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* AIDEV-NOTE: Hero section com imagem de fundo e informações principais da Casa da Barra */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="/images/fundo2.jpg"
          alt="Casa da Barra"
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
            <h1 className="text-5xl font-bold mb-4">Casa da Barra</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Patrimônio histórico preservado da arquitetura colonial brasileira
            </p>
            <Badge className="mt-4 bg-amber-600 hover:bg-amber-700">
              Século XVIII
            </Badge>
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
              <Calendar className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <p className="font-semibold">Construída em</p>
              <p className="text-sm text-muted-foreground">1750</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <p className="font-semibold">Localização</p>
              <p className="text-sm text-muted-foreground">Barra, Salvador</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <p className="font-semibold">Estilo</p>
              <p className="text-sm text-muted-foreground">Colonial</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <p className="font-semibold">Restauração</p>
              <p className="text-sm text-muted-foreground">1985-1990</p>
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="historia">História</TabsTrigger>
              <TabsTrigger value="arquitetura">Arquitetura</TabsTrigger>
              <TabsTrigger value="restauracao">Restauração</TabsTrigger>
              <TabsTrigger value="visita">Visita</TabsTrigger>
            </TabsList>

            <TabsContent value="historia" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    História da Casa da Barra
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Origens Coloniais</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A Casa da Barra foi construída em meados do século XVIII por uma família de comerciantes portugueses 
                      que se estabeleceram na região da Barra, em Salvador. A casa representa um exemplo típico da 
                      arquitetura residencial colonial brasileira, adaptada ao clima tropical.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Período Imperial</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Durante o século XIX, a casa passou por várias mãos, servindo como residência de importantes 
                      figuras da sociedade baiana. Neste período, foram realizadas algumas modificações na estrutura 
                      original, incluindo a adição de elementos decorativos neoclássicos.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Século XX</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      No início do século XX, a casa enfrentou um período de abandono e deterioração. Foi apenas 
                      na década de 1980 que iniciativas de preservação patrimonial levaram à sua restauração 
                      e transformação em patrimônio histórico protegido.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="arquitetura" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Características Arquitetônicas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Estrutura Principal</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Paredes de pedra e cal</li>
                        <li>• Telhado de telhas coloniais</li>
                        <li>• Pé-direito alto (4,5 metros)</li>
                        <li>• Janelas com rótulas de madeira</li>
                        <li>• Piso de ladrilho hidráulico</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Elementos Decorativos</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Azulejos portugueses originais</li>
                        <li>• Trabalhos em ferro forjado</li>
                        <li>• Pinturas murais do século XVIII</li>
                        <li>• Mobiliário de época preservado</li>
                        <li>• Jardim interno com fonte</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Adaptações Climáticas</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A casa apresenta características típicas da arquitetura colonial adaptada ao clima tropical: 
                      varandas amplas para proteção solar, ventilação cruzada através de janelas estrategicamente 
                      posicionadas, e uso de materiais locais resistentes à umidade.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="restauracao" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Processo de Restauração</CardTitle>
                  <CardDescription>
                    Cronologia dos trabalhos de preservação e restauro
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-amber-500 pl-4">
                      <h3 className="font-semibold">1985 - Diagnóstico Inicial</h3>
                      <p className="text-sm text-muted-foreground">
                        Levantamento arquitetônico completo e avaliação do estado de conservação
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-amber-500 pl-4">
                      <h3 className="font-semibold">1986-1987 - Estrutura</h3>
                      <p className="text-sm text-muted-foreground">
                        Consolidação das fundações e restauro das paredes de pedra
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-amber-500 pl-4">
                      <h3 className="font-semibold">1988-1989 - Cobertura e Interiores</h3>
                      <p className="text-sm text-muted-foreground">
                        Restauração do telhado e recuperação dos elementos decorativos internos
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-amber-500 pl-4">
                      <h3 className="font-semibold">1990 - Finalização</h3>
                      <p className="text-sm text-muted-foreground">
                        Instalação de sistemas modernos e abertura ao público
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Técnicas Utilizadas</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A restauração seguiu rigorosamente as normas internacionais de preservação patrimonial, 
                      utilizando materiais e técnicas tradicionais sempre que possível. Foram empregadas 
                      argamassas de cal, pigmentos naturais e madeiras nativas para manter a autenticidade 
                      histórica da construção.
                    </p>
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
                          <span>9h às 17h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sábados:</span>
                          <span>9h às 15h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Domingos:</span>
                          <span>10h às 14h</span>
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
                          <span>R$ 15,00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estudantes:</span>
                          <span>R$ 7,50</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Idosos (60+):</span>
                          <span>R$ 7,50</span>
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
                        <Camera className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                        <p className="text-sm">Visitas Guiadas</p>
                      </div>
                      <div className="text-center">
                        <Info className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                        <p className="text-sm">Audioguia</p>
                      </div>
                      <div className="text-center">
                        <Users className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                        <p className="text-sm">Grupos Escolares</p>
                      </div>
                      <div className="text-center">
                        <MapPin className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                        <p className="text-sm">Loja de Souvenirs</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="bg-amber-600 hover:bg-amber-700">
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
