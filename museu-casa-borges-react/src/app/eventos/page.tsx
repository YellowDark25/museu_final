'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Clock, MapPin, Users, Ticket, Star, Music, BookOpen, Camera } from 'lucide-react'
import Image from 'next/image'

export default function EventosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* AIDEV-NOTE: Hero section com imagem de fundo e título da página de eventos */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="/images/fundo4.jpg"
          alt="Eventos do Museu"
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
            <h1 className="text-5xl font-bold mb-4">Eventos e Atividades</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Programação cultural diversificada para toda a família
            </p>
            <Badge className="mt-4 bg-purple-600 hover:bg-purple-700">
              Agenda Atualizada
            </Badge>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* AIDEV-NOTE: Estatísticas dos eventos em cards animados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="font-semibold">Eventos/Mês</p>
              <p className="text-2xl font-bold text-purple-600">15+</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="font-semibold">Participantes</p>
              <p className="text-2xl font-bold text-purple-600">500+</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="font-semibold">Avaliação</p>
              <p className="text-2xl font-bold text-purple-600">4.8★</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Ticket className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="font-semibold">Gratuitos</p>
              <p className="text-2xl font-bold text-purple-600">80%</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* AIDEV-NOTE: Conteúdo principal organizado em tabs para diferentes tipos de eventos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="proximos" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="proximos">Próximos</TabsTrigger>
              <TabsTrigger value="regulares">Regulares</TabsTrigger>
              <TabsTrigger value="especiais">Especiais</TabsTrigger>
              <TabsTrigger value="educativos">Educativos</TabsTrigger>
            </TabsList>

            <TabsContent value="proximos" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* AIDEV-NOTE: Cards de eventos próximos com animações e informações detalhadas */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge className="bg-red-100 text-red-800">Hoje</Badge>
                        <Music className="h-5 w-5 text-purple-600" />
                      </div>
                      <CardTitle className="text-lg">Concerto de Tango</CardTitle>
                      <CardDescription>
                        Apresentação especial com o Quarteto Buenos Aires
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>19h30 - 21h00</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>Auditório Principal</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="h-4 w-4 text-muted-foreground" />
                          <span>R$ 25,00</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                        Comprar Ingresso
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge className="bg-orange-100 text-orange-800">Amanhã</Badge>
                        <BookOpen className="h-5 w-5 text-purple-600" />
                      </div>
                      <CardTitle className="text-lg">Palestra: Borges e o Infinito</CardTitle>
                      <CardDescription>
                        Com o Prof. Dr. Carlos Mendes da UFRJ
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>15h00 - 16h30</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>Sala de Conferências</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="h-4 w-4 text-muted-foreground" />
                          <span className="text-green-600">Gratuito</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                        Inscrever-se
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge className="bg-blue-100 text-blue-800">15 Jan</Badge>
                        <Camera className="h-5 w-5 text-purple-600" />
                      </div>
                      <CardTitle className="text-lg">Oficina de Fotografia</CardTitle>
                      <CardDescription>
                        Técnicas de fotografia em museus e patrimônio
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>9h00 - 12h00</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>Laboratório Digital</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="h-4 w-4 text-muted-foreground" />
                          <span>R$ 40,00</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                        Inscrever-se
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="regulares" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Eventos Semanais</CardTitle>
                    <CardDescription>
                      Programação fixa que acontece todas as semanas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="border-l-4 border-purple-500 pl-4">
                          <h3 className="font-semibold">Terças Literárias</h3>
                          <p className="text-sm text-muted-foreground">
                            Toda terça, 19h - Discussão de obras clássicas
                          </p>
                          <Badge variant="outline" className="mt-1">Gratuito</Badge>
                        </div>
                        
                        <div className="border-l-4 border-purple-500 pl-4">
                          <h3 className="font-semibold">Quinta Cultural</h3>
                          <p className="text-sm text-muted-foreground">
                            Toda quinta, 18h - Apresentações artísticas variadas
                          </p>
                          <Badge variant="outline" className="mt-1">R$ 15,00</Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="border-l-4 border-purple-500 pl-4">
                          <h3 className="font-semibold">Sábado Família</h3>
                          <p className="text-sm text-muted-foreground">
                            Todo sábado, 14h - Atividades para toda família
                          </p>
                          <Badge variant="outline" className="mt-1">Gratuito</Badge>
                        </div>
                        
                        <div className="border-l-4 border-purple-500 pl-4">
                          <h3 className="font-semibold">Domingo Poético</h3>
                          <p className="text-sm text-muted-foreground">
                            Todo domingo, 16h - Sarau de poesia e música
                          </p>
                          <Badge variant="outline" className="mt-1">R$ 10,00</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Eventos Mensais</CardTitle>
                    <CardDescription>
                      Programação especial que acontece uma vez por mês
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <Music className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <h3 className="font-semibold">Concerto Mensal</h3>
                        <p className="text-sm text-muted-foreground">
                          Primeira sexta do mês
                        </p>
                      </div>
                      
                      <div className="text-center p-4 border rounded-lg">
                        <BookOpen className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <h3 className="font-semibold">Clube do Livro</h3>
                        <p className="text-sm text-muted-foreground">
                          Terceiro sábado do mês
                        </p>
                      </div>
                      
                      <div className="text-center p-4 border rounded-lg">
                        <Camera className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <h3 className="font-semibold">Mostra de Cinema</h3>
                        <p className="text-sm text-muted-foreground">
                          Último domingo do mês
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="especiais" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Eventos Anuais Especiais</CardTitle>
                    <CardDescription>
                      Grandes celebrações e festivais do museu
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border-l-4 border-purple-500 pl-6">
                        <h3 className="text-xl font-semibold mb-2">Festival Borges (Agosto)</h3>
                        <p className="text-muted-foreground mb-3">
                          Semana dedicada à obra e vida de Jorge Luis Borges com palestras, 
                          exposições, concertos e atividades interativas.
                        </p>
                        <div className="flex gap-2">
                          <Badge>Palestras</Badge>
                          <Badge>Exposições</Badge>
                          <Badge>Concertos</Badge>
                          <Badge>Oficinas</Badge>
                        </div>
                      </div>
                      
                      <div className="border-l-4 border-purple-500 pl-6">
                        <h3 className="text-xl font-semibold mb-2">Noite dos Museus (Maio)</h3>
                        <p className="text-muted-foreground mb-3">
                          Abertura noturna especial com programação cultural diversificada, 
                          visitas guiadas e apresentações artísticas.
                        </p>
                        <div className="flex gap-2">
                          <Badge>Visitas Noturnas</Badge>
                          <Badge>Performances</Badge>
                          <Badge>Gastronomia</Badge>
                        </div>
                      </div>
                      
                      <div className="border-l-4 border-purple-500 pl-6">
                        <h3 className="text-xl font-semibold mb-2">Semana do Patrimônio (Setembro)</h3>
                        <p className="text-muted-foreground mb-3">
                          Celebração do patrimônio cultural com atividades educativas, 
                          workshops de conservação e debates sobre preservação.
                        </p>
                        <div className="flex gap-2">
                          <Badge>Educação</Badge>
                          <Badge>Conservação</Badge>
                          <Badge>Debates</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="educativos" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Programas Educativos</CardTitle>
                    <CardDescription>
                      Atividades voltadas para diferentes faixas etárias e níveis de ensino
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Educação Infantil</h3>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Contação de Histórias</h4>
                            <p className="text-sm text-muted-foreground">
                              Adaptações de contos de Borges para crianças
                            </p>
                            <Badge variant="outline" className="mt-1">4-8 anos</Badge>
                          </div>
                          
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Oficina de Desenho</h4>
                            <p className="text-sm text-muted-foreground">
                              Ilustrando personagens e cenários literários
                            </p>
                            <Badge variant="outline" className="mt-1">6-10 anos</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Ensino Fundamental</h3>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Visitas Temáticas</h4>
                            <p className="text-sm text-muted-foreground">
                              Roteiros adaptados ao currículo escolar
                            </p>
                            <Badge variant="outline" className="mt-1">8-14 anos</Badge>
                          </div>
                          
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Projeto Jovens Escritores</h4>
                            <p className="text-sm text-muted-foreground">
                              Oficinas de criação literária e poesia
                            </p>
                            <Badge variant="outline" className="mt-1">12-16 anos</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Programas para Professores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <BookOpen className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <h3 className="font-semibold">Curso de Formação</h3>
                        <p className="text-sm text-muted-foreground">
                          40h de capacitação em educação patrimonial
                        </p>
                      </div>
                      
                      <div className="text-center p-4 border rounded-lg">
                        <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <h3 className="font-semibold">Grupo de Estudos</h3>
                        <p className="text-sm text-muted-foreground">
                          Encontros mensais para troca de experiências
                        </p>
                      </div>
                      
                      <div className="text-center p-4 border rounded-lg">
                        <Star className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <h3 className="font-semibold">Material Didático</h3>
                        <p className="text-sm text-muted-foreground">
                          Recursos educativos gratuitos para download
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* AIDEV-NOTE: Seção de inscrição para newsletter de eventos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Não Perca Nenhum Evento!
              </h2>
              <p className="mb-6">
                Inscreva-se em nossa newsletter e receba a programação completa em primeira mão
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-4 py-2 rounded-lg text-black"
                />
                <Button className="bg-white text-purple-600 hover:bg-gray-100">
                  Inscrever
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
