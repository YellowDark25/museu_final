'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Search, BookOpen, FileText, Database, Users, Download, Eye, Filter } from 'lucide-react'
import Image from 'next/image'

export default function PesquisaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* AIDEV-NOTE: Hero section com foco em pesquisa e acervo */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="/images/fundo3.jpg"
          alt="Centro de Pesquisa"
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
            <h1 className="text-5xl font-bold mb-4">Centro de Pesquisa</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Acervo digital e físico para pesquisadores, estudantes e interessados na obra borgiana
            </p>
            <Badge className="mt-4 bg-emerald-600 hover:bg-emerald-700">
              Acesso Livre
            </Badge>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* AIDEV-NOTE: Estatísticas do acervo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
              <p className="font-semibold">Documentos</p>
              <p className="text-2xl font-bold text-emerald-600">5.000+</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <FileText className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
              <p className="font-semibold">Artigos</p>
              <p className="text-2xl font-bold text-emerald-600">1.200+</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Database className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
              <p className="font-semibold">Digitalizados</p>
              <p className="text-2xl font-bold text-emerald-600">80%</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
              <p className="font-semibold">Pesquisadores</p>
              <p className="text-2xl font-bold text-emerald-600">300+</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* AIDEV-NOTE: Barra de pesquisa principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center mb-6">Pesquisar no Acervo</h2>
              <div className="flex gap-4 max-w-4xl mx-auto">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Digite palavras-chave, autor, título ou tema..."
                    className="pl-10 h-12"
                  />
                </div>
                <Button className="h-12 px-8 bg-emerald-600 hover:bg-emerald-700">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
                <Button variant="outline" className="h-12 px-6">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                <Badge variant="outline">Borges</Badge>
                <Badge variant="outline">Literatura Argentina</Badge>
                <Badge variant="outline">Manuscritos</Badge>
                <Badge variant="outline">Correspondências</Badge>
                <Badge variant="outline">Fotografias</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AIDEV-NOTE: Conteúdo principal organizado em tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="acervo" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="acervo">Acervo</TabsTrigger>
              <TabsTrigger value="digital">Biblioteca Digital</TabsTrigger>
              <TabsTrigger value="projetos">Projetos</TabsTrigger>
              <TabsTrigger value="servicos">Serviços</TabsTrigger>
            </TabsList>

            <TabsContent value="acervo" className="mt-6">
              <div className="space-y-6">
                {/* AIDEV-NOTE: Coleções do acervo */}
                <Card>
                  <CardHeader>
                    <CardTitle>Coleções Especiais</CardTitle>
                    <CardDescription>
                      Principais conjuntos documentais do centro de pesquisa
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <BookOpen className="h-8 w-8 text-emerald-600" />
                          </div>
                          <h3 className="text-lg font-semibold">Arquivo Borges</h3>
                          <Badge variant="outline">1.500 itens</Badge>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li>• Manuscritos originais</li>
                          <li>• Correspondências pessoais</li>
                          <li>• Primeiras edições</li>
                          <li>• Fotografias raras</li>
                        </ul>
                        <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
                          Explorar Coleção
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <FileText className="h-8 w-8 text-blue-600" />
                          </div>
                          <h3 className="text-lg font-semibold">Literatura Argentina</h3>
                          <Badge variant="outline">2.000 itens</Badge>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li>• Obras completas de autores</li>
                          <li>• Crítica literária especializada</li>
                          <li>• Revistas e periódicos</li>
                          <li>• Teses e dissertações</li>
                        </ul>
                        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                          Explorar Coleção
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Database className="h-8 w-8 text-purple-600" />
                          </div>
                          <h3 className="text-lg font-semibold">Arquivo Audiovisual</h3>
                          <Badge variant="outline">800 itens</Badge>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li>• Entrevistas gravadas</li>
                          <li>• Documentários</li>
                          <li>• Conferências e palestras</li>
                          <li>• Material promocional</li>
                        </ul>
                        <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                          Explorar Coleção
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Users className="h-8 w-8 text-orange-600" />
                          </div>
                          <h3 className="text-lg font-semibold">Estudos Críticos</h3>
                          <Badge variant="outline">1.200 itens</Badge>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li>• Análises acadêmicas</li>
                          <li>• Ensaios interpretativos</li>
                          <li>• Comparações literárias</li>
                          <li>• Traduções comentadas</li>
                        </ul>
                        <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
                          Explorar Coleção
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Eye className="h-8 w-8 text-red-600" />
                          </div>
                          <h3 className="text-lg font-semibold">Iconografia</h3>
                          <Badge variant="outline">600 itens</Badge>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li>• Retratos e fotografias</li>
                          <li>• Ilustrações de obras</li>
                          <li>• Capas de livros</li>
                          <li>• Material gráfico</li>
                        </ul>
                        <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
                          Explorar Coleção
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Download className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold">Arquivo Digital</h3>
                          <Badge variant="outline">4.000 itens</Badge>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li>• Documentos digitalizados</li>
                          <li>• E-books e artigos</li>
                          <li>• Bases de dados</li>
                          <li>• Recursos multimídia</li>
                        </ul>
                        <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                          Explorar Coleção
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>

                {/* AIDEV-NOTE: Destaques recentes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Aquisições Recentes</CardTitle>
                    <CardDescription>
                      Novos materiais incorporados ao acervo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-emerald-500 pl-4">
                        <h3 className="font-semibold">Correspondência Inédita (2024)</h3>
                        <p className="text-sm text-muted-foreground">
                          Cartas entre Borges e Octavio Paz descobertas em arquivo particular
                        </p>
                        <Badge className="mt-1 bg-emerald-100 text-emerald-800">Novo</Badge>
                      </div>
                      
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h3 className="font-semibold">Arquivo Fotográfico Familiar (2024)</h3>
                        <p className="text-sm text-muted-foreground">
                          Doação da família com 200 fotografias inéditas do período juvenil
                        </p>
                        <Badge className="mt-1 bg-blue-100 text-blue-800">Doação</Badge>
                      </div>
                      
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h3 className="font-semibold">Manuscritos de "El Aleph" (2023)</h3>
                        <p className="text-sm text-muted-foreground">
                          Versões preliminares com anotações do autor adquiridas em leilão
                        </p>
                        <Badge className="mt-1 bg-purple-100 text-purple-800">Aquisição</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="digital" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Biblioteca Digital</CardTitle>
                    <CardDescription>
                      Acesso online ao acervo digitalizado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Recursos Disponíveis</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <BookOpen className="h-5 w-5 text-emerald-600" />
                            <div>
                              <h4 className="font-semibold">Textos Completos</h4>
                              <p className="text-sm text-muted-foreground">
                                Obras digitalizadas em alta resolução
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <Search className="h-5 w-5 text-emerald-600" />
                            <div>
                              <h4 className="font-semibold">Busca Avançada</h4>
                              <p className="text-sm text-muted-foreground">
                                Filtros por tipo, data, autor e tema
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <Download className="h-5 w-5 text-emerald-600" />
                            <div>
                              <h4 className="font-semibold">Download Gratuito</h4>
                              <p className="text-sm text-muted-foreground">
                                Formatos PDF, EPUB e outros
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Coleções Digitais</h3>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Obras Completas Digitais</h4>
                            <p className="text-sm text-muted-foreground">
                              Todos os livros de Borges em formato digital
                            </p>
                            <Badge variant="outline" className="mt-1">50 volumes</Badge>
                          </div>
                          
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Arquivo de Periódicos</h4>
                            <p className="text-sm text-muted-foreground">
                              Revistas e jornais com publicações do autor
                            </p>
                            <Badge variant="outline" className="mt-1">300 edições</Badge>
                          </div>
                          
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Galeria Multimídia</h4>
                            <p className="text-sm text-muted-foreground">
                              Áudios, vídeos e imagens históricas
                            </p>
                            <Badge variant="outline" className="mt-1">500 arquivos</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ferramentas de Pesquisa</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <Search className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                        <h3 className="font-semibold">Busca Semântica</h3>
                        <p className="text-sm text-muted-foreground">
                          Encontre conteúdo por significado
                        </p>
                      </div>
                      
                      <div className="text-center p-4 border rounded-lg">
                        <FileText className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                        <h3 className="font-semibold">Análise de Texto</h3>
                        <p className="text-sm text-muted-foreground">
                          Ferramentas de análise literária
                        </p>
                      </div>
                      
                      <div className="text-center p-4 border rounded-lg">
                        <Database className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                        <h3 className="font-semibold">API de Dados</h3>
                        <p className="text-sm text-muted-foreground">
                          Acesso programático ao acervo
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="projetos" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Projetos de Pesquisa</CardTitle>
                    <CardDescription>
                      Iniciativas acadêmicas e científicas em andamento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border-l-4 border-emerald-500 pl-6">
                        <h3 className="text-xl font-semibold mb-2">Borges Digital</h3>
                        <p className="text-muted-foreground mb-3">
                          Digitalização completa do arquivo pessoal de Jorge Luis Borges 
                          com tecnologia de ponta para preservação e acesso.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-semibold">Objetivos:</h4>
                            <ul className="text-sm space-y-1 mt-2">
                              <li>• Digitalizar 100% do acervo físico</li>
                              <li>• Criar metadados detalhados</li>
                              <li>• Desenvolver plataforma de acesso</li>
                              <li>• Garantir preservação digital</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold">Status:</h4>
                            <ul className="text-sm space-y-1 mt-2">
                              <li>• Duração: 2022-2025</li>
                              <li>• Progresso: 65%</li>
                              <li>• Financiamento: CNPq/FAPESP</li>
                              <li>• Equipe: 12 pesquisadores</li>
                            </ul>
                          </div>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-800">Em Andamento</Badge>
                      </div>
                      
                      <div className="border-l-4 border-blue-500 pl-6">
                        <h3 className="text-xl font-semibold mb-2">Rede Latino-americana de Estudos Borgianos</h3>
                        <p className="text-muted-foreground mb-3">
                          Colaboração internacional para mapeamento e análise da influência 
                          de Borges na literatura contemporânea.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-semibold">Parceiros:</h4>
                            <ul className="text-sm space-y-1 mt-2">
                              <li>• Universidad de Buenos Aires</li>
                              <li>• UNAM (México)</li>
                              <li>• Universidad de Chile</li>
                              <li>• USP (Brasil)</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold">Atividades:</h4>
                            <ul className="text-sm space-y-1 mt-2">
                              <li>• Simpósios anuais</li>
                              <li>• Publicações conjuntas</li>
                              <li>• Intercâmbio de pesquisadores</li>
                              <li>• Base de dados compartilhada</li>
                            </ul>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">Internacional</Badge>
                      </div>
                      
                      <div className="border-l-4 border-purple-500 pl-6">
                        <h3 className="text-xl font-semibold mb-2">Inteligência Artificial e Literatura</h3>
                        <p className="text-muted-foreground mb-3">
                          Aplicação de IA para análise estilística e descoberta de padrões 
                          na obra borgiana e influências.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-semibold">Tecnologias:</h4>
                            <ul className="text-sm space-y-1 mt-2">
                              <li>• Processamento de linguagem natural</li>
                              <li>• Machine learning</li>
                              <li>• Análise de redes semânticas</li>
                              <li>• Visualização de dados</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold">Resultados:</h4>
                            <ul className="text-sm space-y-1 mt-2">
                              <li>• Mapeamento de influências</li>
                              <li>• Análise de estilo</li>
                              <li>• Descoberta de conexões</li>
                              <li>• Ferramentas de pesquisa</li>
                            </ul>
                          </div>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800">Inovador</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="servicos" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Serviços para Pesquisadores</CardTitle>
                    <CardDescription>
                      Apoio especializado para estudos e pesquisas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Consulta Presencial</h3>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Sala de Pesquisa</h4>
                            <p className="text-sm text-muted-foreground">
                              Espaço climatizado com acesso supervisionado ao acervo
                            </p>
                            <Badge variant="outline" className="mt-1">Segunda a sexta</Badge>
                          </div>
                          
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Orientação Especializada</h4>
                            <p className="text-sm text-muted-foreground">
                              Bibliotecários especializados para auxiliar na pesquisa
                            </p>
                            <Badge variant="outline" className="mt-1">Agendamento</Badge>
                          </div>
                          
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Digitalização Sob Demanda</h4>
                            <p className="text-sm text-muted-foreground">
                              Reprodução digital de documentos para pesquisa
                            </p>
                            <Badge variant="outline" className="mt-1">Taxa aplicável</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Serviços Online</h3>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Consulta Remota</h4>
                            <p className="text-sm text-muted-foreground">
                              Pesquisa no catálogo online e acesso a documentos digitais
                            </p>
                            <Badge variant="outline" className="mt-1">24/7</Badge>
                          </div>
                          
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Levantamento Bibliográfico</h4>
                            <p className="text-sm text-muted-foreground">
                              Elaboração de bibliografias especializadas por tema
                            </p>
                            <Badge variant="outline" className="mt-1">Sob consulta</Badge>
                          </div>
                          
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-semibold">Assessoria Acadêmica</h4>
                            <p className="text-sm text-muted-foreground">
                              Orientação para teses, dissertações e artigos
                            </p>
                            <Badge variant="outline" className="mt-1">Agendamento</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Como Utilizar os Serviços</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-emerald-600 font-bold">1</span>
                        </div>
                        <h3 className="font-semibold mb-2">Cadastro</h3>
                        <p className="text-sm text-muted-foreground">
                          Registre-se como pesquisador fornecendo dados acadêmicos e projeto de pesquisa
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-emerald-600 font-bold">2</span>
                        </div>
                        <h3 className="font-semibold mb-2">Agendamento</h3>
                        <p className="text-sm text-muted-foreground">
                          Agende sua visita ou consulta online através do sistema de reservas
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-emerald-600 font-bold">3</span>
                        </div>
                        <h3 className="font-semibold mb-2">Pesquisa</h3>
                        <p className="text-sm text-muted-foreground">
                          Acesse o acervo com apoio da nossa equipe especializada
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Requisitos para Pesquisadores:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Vínculo acadêmico ou projeto de pesquisa aprovado</li>
                        <li>• Documento de identificação com foto</li>
                        <li>• Termo de responsabilidade assinado</li>
                        <li>• Agendamento prévio para consulta presencial</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* AIDEV-NOTE: Call to action para pesquisadores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Inicie sua Pesquisa Hoje
              </h2>
              <p className="mb-6">
                Acesse nosso acervo especializado e conte com o apoio de nossa equipe 
                para desenvolver sua pesquisa sobre Borges e literatura argentina
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-emerald-600 hover:bg-gray-100">
                  Cadastrar-se como Pesquisador
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                  Agendar Visita
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
