'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Download, ShoppingCart, Star, Calendar, Users, FileText, Award } from 'lucide-react'
import Image from 'next/image'

export default function PublicacoesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* AIDEV-NOTE: Hero section com foco em publicações */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="/images/fundo4.jpg"
          alt="Publicações do Museu"
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
            <h1 className="text-5xl font-bold mb-4">Publicações</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Catálogos, livros e materiais educativos sobre Borges e literatura argentina
            </p>
            <Badge className="mt-4 bg-blue-600 hover:bg-blue-700">
              Loja Online
            </Badge>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* AIDEV-NOTE: Estatísticas das publicações */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">Títulos</p>
              <p className="text-2xl font-bold text-blue-600">150+</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Download className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">Downloads</p>
              <p className="text-2xl font-bold text-blue-600">50K+</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Award className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">Premiados</p>
              <p className="text-2xl font-bold text-blue-600">25</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">Autores</p>
              <p className="text-2xl font-bold text-blue-600">80+</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* AIDEV-NOTE: Conteúdo principal organizado em tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="catalogos" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="catalogos">Catálogos</TabsTrigger>
              <TabsTrigger value="livros">Livros</TabsTrigger>
              <TabsTrigger value="educativos">Educativos</TabsTrigger>
              <TabsTrigger value="digitais">Digitais</TabsTrigger>
            </TabsList>

            <TabsContent value="catalogos" className="mt-6">
              <div className="space-y-6">
                {/* AIDEV-NOTE: Catálogos de exposições */}
                <Card>
                  <CardHeader>
                    <CardTitle>Catálogos de Exposições</CardTitle>
                    <CardDescription>
                      Publicações especializadas sobre nossas exposições
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-blue-600" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">Borges: Vida e Obra</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Catálogo da exposição permanente com ensaios críticos e iconografia inédita.
                          </p>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline">2024</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">4.8</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              R$ 45
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="aspect-[3/4] bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-emerald-600" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">O Universo Borgiano</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Análise profunda dos temas e símbolos recorrentes na obra do autor.
                          </p>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline">2023</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">4.9</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              R$ 38
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-purple-600" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">Literatura Argentina Contemporânea</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Panorama da literatura argentina do século XX com foco em Borges.
                          </p>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline">2024</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">4.7</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              R$ 52
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="aspect-[3/4] bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-orange-600" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">Patrimônio Cultural Argentino</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            A importância de Borges no patrimônio cultural da Argentina.
                          </p>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline">2023</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">4.6</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              R$ 42
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="aspect-[3/4] bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-cyan-600" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">Borges e o Fantástico</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Exposição temporária sobre os elementos fantásticos na obra borgiana.
                          </p>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline">2024</Badge>
                            <Badge className="bg-red-100 text-red-800">Novo</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              R$ 48
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="aspect-[3/4] bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-green-600" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">Casas Históricas</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Catálogo das casas históricas preservadas pelo museu.
                          </p>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline">2023</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">4.5</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              R$ 35
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>

                {/* AIDEV-NOTE: Lançamentos recentes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Lançamentos Recentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-16 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Borges e o Cinema</h3>
                          <p className="text-sm text-muted-foreground">
                            Análise das adaptações cinematográficas da obra borgiana
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-blue-100 text-blue-800">Novo</Badge>
                            <Badge variant="outline">Março 2024</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">R$ 55</p>
                          <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                            Comprar
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-16 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Guia de Visita Ilustrado</h3>
                          <p className="text-sm text-muted-foreground">
                            Roteiro completo pelas exposições com ilustrações exclusivas
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-emerald-100 text-emerald-800">Novo</Badge>
                            <Badge variant="outline">Fevereiro 2024</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">R$ 25</p>
                          <Button size="sm" className="mt-2 bg-emerald-600 hover:bg-emerald-700">
                            Comprar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="livros" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Livros Acadêmicos</CardTitle>
                    <CardDescription>
                      Estudos críticos e ensaios sobre Borges e literatura argentina
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-[3/4] bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-indigo-600" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">Ensaios Borgianos</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Coletânea de ensaios críticos por especialistas internacionais
                          </p>
                          <p className="text-xs text-muted-foreground mb-3">
                            Org. Maria Silva • 320 páginas
                          </p>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline">Acadêmico</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">4.9</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                              R$ 68
                            </Button>
                            <Button size="sm" variant="outline">
                              Preview
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-[3/4] bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-rose-600" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">Borges e a Filosofia</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Análise dos conceitos filosóficos na obra borgiana
                          </p>
                          <p className="text-xs text-muted-foreground mb-3">
                            João Santos • 280 páginas
                          </p>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline">Filosofia</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">4.7</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-rose-600 hover:bg-rose-700">
                              R$ 62
                            </Button>
                            <Button size="sm" variant="outline">
                              Preview
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-[3/4] bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-amber-600" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">O Labirinto Borgiano</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Estudo sobre a simbologia do labirinto em Borges
                          </p>
                          <p className="text-xs text-muted-foreground mb-3">
                            Ana Rodriguez • 240 páginas
                          </p>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline">Simbologia</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">4.8</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700">
                              R$ 58
                            </Button>
                            <Button size="sm" variant="outline">
                              Preview
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Séries Especiais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h3 className="font-semibold">Coleção Estudos Borgianos</h3>
                        <p className="text-sm text-muted-foreground">
                          Série dedicada exclusivamente aos estudos críticos sobre Jorge Luis Borges
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">12 volumes</Badge>
                          <Badge className="bg-blue-100 text-blue-800">Série Completa: R$ 480</Badge>
                        </div>
                      </div>
                      
                      <div className="border-l-4 border-emerald-500 pl-4">
                        <h3 className="font-semibold">Literatura Argentina Contemporânea</h3>
                        <p className="text-sm text-muted-foreground">
                          Panorama da literatura argentina do século XX e XXI
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">8 volumes</Badge>
                          <Badge className="bg-emerald-100 text-emerald-800">Série Completa: R$ 320</Badge>
                        </div>
                      </div>
                      
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h3 className="font-semibold">Patrimônio Cultural</h3>
                        <p className="text-sm text-muted-foreground">
                          Estudos sobre preservação e valorização do patrimônio cultural argentino
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">6 volumes</Badge>
                          <Badge className="bg-purple-100 text-purple-800">Série Completa: R$ 240</Badge>
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
                    <CardTitle>Material Educativo</CardTitle>
                    <CardDescription>
                      Recursos pedagógicos para professores e estudantes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Para Professores</h3>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Guia do Professor</h4>
                            <p className="text-sm text-muted-foreground">
                              Manual completo para ensinar Borges em sala de aula
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant="outline">PDF • 120 páginas</Badge>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <Download className="h-4 w-4 mr-1" />
                                Grátis
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Planos de Aula</h4>
                            <p className="text-sm text-muted-foreground">
                              Sequências didáticas prontas para diferentes níveis
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant="outline">PDF • 80 páginas</Badge>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <Download className="h-4 w-4 mr-1" />
                                Grátis
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Atividades Interativas</h4>
                            <p className="text-sm text-muted-foreground">
                              Jogos e exercícios para engajar os estudantes
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant="outline">PDF • 60 páginas</Badge>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <Download className="h-4 w-4 mr-1" />
                                Grátis
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Para Estudantes</h3>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Borges para Jovens</h4>
                            <p className="text-sm text-muted-foreground">
                              Introdução acessível à obra borgiana para adolescentes
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant="outline">Livro • 160 páginas</Badge>
                              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                R$ 28
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Caderno de Atividades</h4>
                            <p className="text-sm text-muted-foreground">
                              Exercícios e jogos sobre a vida e obra de Borges
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant="outline">Impresso • 40 páginas</Badge>
                              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                R$ 15
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Kit de Leitura</h4>
                            <p className="text-sm text-muted-foreground">
                              Seleção de contos com glossário e atividades
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant="outline">Kit • 3 livros</Badge>
                              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                R$ 45
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recursos Multimídia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <h3 className="font-semibold">Audiolivros</h3>
                        <p className="text-sm text-muted-foreground">
                          Contos narrados por atores profissionais
                        </p>
                        <Badge variant="outline" className="mt-2">12 títulos</Badge>
                      </div>
                      
                      <div className="text-center p-4 border rounded-lg">
                        <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <h3 className="font-semibold">Vídeoaulas</h3>
                        <p className="text-sm text-muted-foreground">
                          Aulas sobre contexto histórico e análise literária
                        </p>
                        <Badge variant="outline" className="mt-2">20 vídeos</Badge>
                      </div>
                      
                      <div className="text-center p-4 border rounded-lg">
                        <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <h3 className="font-semibold">Documentários</h3>
                        <p className="text-sm text-muted-foreground">
                          Filmes sobre a vida e obra de Borges
                        </p>
                        <Badge variant="outline" className="mt-2">5 filmes</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="digitais" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Publicações Digitais</CardTitle>
                    <CardDescription>
                      Acesso imediato a conteúdo digital especializado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">E-books</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <Download className="h-5 w-5 text-blue-600" />
                            <div className="flex-1">
                              <h4 className="font-semibold">Obras Completas Digitais</h4>
                              <p className="text-sm text-muted-foreground">
                                Todos os livros de Borges em formato digital
                              </p>
                            </div>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              R$ 89
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <Download className="h-5 w-5 text-emerald-600" />
                            <div className="flex-1">
                              <h4 className="font-semibold">Ensaios Críticos</h4>
                              <p className="text-sm text-muted-foreground">
                                Coletânea de estudos acadêmicos
                              </p>
                            </div>
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                              R$ 45
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <Download className="h-5 w-5 text-purple-600" />
                            <div className="flex-1">
                              <h4 className="font-semibold">Biografias Ilustradas</h4>
                              <p className="text-sm text-muted-foreground">
                                Vida de Borges com imagens raras
                              </p>
                            </div>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              R$ 32
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Assinaturas</h3>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg bg-blue-50">
                            <h4 className="font-semibold">Acesso Premium</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              Acesso ilimitado a todo conteúdo digital
                            </p>
                            <ul className="text-sm space-y-1 mb-3">
                              <li>• Todos os e-books</li>
                              <li>• Audiolivros completos</li>
                              <li>• Vídeoaulas exclusivas</li>
                              <li>• Atualizações mensais</li>
                            </ul>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                              R$ 29/mês
                            </Button>
                          </div>
                          
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold">Acesso Básico</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              Seleção de conteúdo essencial
                            </p>
                            <ul className="text-sm space-y-1 mb-3">
                              <li>• 10 e-books por mês</li>
                              <li>• Audiolivros selecionados</li>
                              <li>• Vídeoaulas básicas</li>
                            </ul>
                            <Button variant="outline" className="w-full">
                              R$ 15/mês
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Aplicativo Móvel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="h-10 w-10 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Museu Borges App</h3>
                      <p className="text-muted-foreground mb-4">
                        Acesse todo o conteúdo digital do museu em seu dispositivo móvel
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button className="bg-black text-white hover:bg-gray-800">
                          App Store
                        </Button>
                        <Button className="bg-green-600 text-white hover:bg-green-700">
                          Google Play
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* AIDEV-NOTE: Call to action para newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Fique por Dentro dos Lançamentos
              </h2>
              <p className="mb-6">
                Receba notificações sobre novas publicações, promoções especiais 
                e conteúdo exclusivo do Museu Casa de Borges
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Assinar Newsletter
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Ver Catálogo Completo
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
