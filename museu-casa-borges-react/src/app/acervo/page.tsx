'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  Filter, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Headphones, 
  Download, 
  Eye, 
  Heart,
  Calendar,
  User,
  Tag,
  Archive,
  BookOpen,
  Camera,
  Mic
} from 'lucide-react'
import Image from 'next/image'
import PhotoGallery from '@/components/acervo/PhotoGallery'

export default function AcervoPage() {
  // AIDEV-NOTE: Estado para controlar aba ativa baseada na URL
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('manuscritos')

  // AIDEV-NOTE: Lê o parâmetro 'categoria' da URL para definir a aba ativa
  useEffect(() => {
    const categoriaParam = searchParams.get('categoria')
    if (categoriaParam) {
      // Mapear categorias do header para abas da página
      const categoriaMap: { [key: string]: string } = {
        'obras': 'manuscritos',
        'documentos': 'documentos', 
        'fotografias': 'fotografias',
        'audiovisual': 'audiovisual',
        'colecoes': 'colecoes'
      }
      
      const tabToActivate = categoriaMap[categoriaParam] || categoriaParam
      if (['manuscritos', 'fotografias', 'documentos', 'audiovisual', 'colecoes'].includes(tabToActivate)) {
        setActiveTab(tabToActivate)
      }
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* AIDEV-NOTE: Hero section com foco no acervo digital */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="/images/fundo1.jpg"
          alt="Acervo Digital do Museu"
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
            <h1 className="text-5xl font-bold mb-4">ACERVO DO MUSEU CASA BORGES</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Explore nossa coleção de fotografias históricas, documentos e objetos que contam a rica história de Barra do Bugres e região.
            </p>
            <Badge className="mt-4 bg-blue-600 hover:bg-blue-700">
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
              <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">Documentos</p>
              <p className="text-2xl font-bold text-blue-600">2.847</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <ImageIcon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">Fotografias</p>
              <p className="text-2xl font-bold text-blue-600">1.523</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Video className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">Vídeos</p>
              <p className="text-2xl font-bold text-blue-600">186</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Headphones className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">Áudios</p>
              <p className="text-2xl font-bold text-blue-600">342</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* AIDEV-NOTE: Barra de pesquisa avançada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Pesquisar no Acervo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input 
                    placeholder="Digite palavras-chave, títulos, datas ou nomes..."
                    className="text-lg"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Tipo de Material" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os tipos</SelectItem>
                    <SelectItem value="manuscritos">Manuscritos</SelectItem>
                    <SelectItem value="fotografias">Fotografias</SelectItem>
                    <SelectItem value="documentos">Documentos</SelectItem>
                    <SelectItem value="videos">Vídeos</SelectItem>
                    <SelectItem value="audios">Áudios</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os períodos</SelectItem>
                    <SelectItem value="1920-1940">1920-1940</SelectItem>
                    <SelectItem value="1940-1960">1940-1960</SelectItem>
                    <SelectItem value="1960-1980">1960-1980</SelectItem>
                    <SelectItem value="1980-1986">1980-1986</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="manuscritos">Manuscritos</TabsTrigger>
              <TabsTrigger value="fotografias">Fotografias</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
              <TabsTrigger value="audiovisual">Audiovisual</TabsTrigger>
              <TabsTrigger value="colecoes">Coleções</TabsTrigger>
            </TabsList>

            <TabsContent value="manuscritos" className="mt-6">
              <div className="space-y-6">
                {/* AIDEV-NOTE: Manuscritos em destaque */}
                <Card>
                  <CardHeader>
                    <CardTitle>Manuscritos em Destaque</CardTitle>
                    <CardDescription>
                      Documentos originais escritos à mão por Jorge Luis Borges
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
                        <div className="aspect-[3/4] bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
                          <FileText className="h-16 w-16 text-amber-600" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">O Aleph - Manuscrito Original</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Manuscrito original do conto "O Aleph", com anotações e correções do autor
                          </p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline">1945</Badge>
                            <Badge className="bg-amber-100 text-amber-800">Raro</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              12 páginas
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              2.3k visualizações
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700">
                              <Eye className="h-4 w-4 mr-1" />
                              Visualizar
                            </Button>
                            <Button size="sm" variant="outline">
                              <Heart className="h-4 w-4" />
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
                        <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                          <FileText className="h-16 w-16 text-blue-600" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">Labirintos - Rascunhos</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Rascunhos e anotações para o livro "Labirintos", incluindo esquemas
                          </p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline">1962</Badge>
                            <Badge className="bg-blue-100 text-blue-800">Completo</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              28 páginas
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              1.8k visualizações
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                              <Eye className="h-4 w-4 mr-1" />
                              Visualizar
                            </Button>
                            <Button size="sm" variant="outline">
                              <Heart className="h-4 w-4" />
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
                        <div className="aspect-[3/4] bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
                          <FileText className="h-16 w-16 text-emerald-600" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">Cartas Pessoais</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Correspondência pessoal com escritores e intelectuais da época
                          </p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline">1950-1980</Badge>
                            <Badge className="bg-emerald-100 text-emerald-800">Coleção</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              156 cartas
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              3.1k visualizações
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                              <Eye className="h-4 w-4 mr-1" />
                              Visualizar
                            </Button>
                            <Button size="sm" variant="outline">
                              <Heart className="h-4 w-4" />
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
                        <div className="aspect-[3/4] bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
                          <FileText className="h-16 w-16 text-purple-600" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">Ficções - Primeira Versão</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Primeira versão manuscrita do livro "Ficções" com emendas
                          </p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline">1944</Badge>
                            <Badge className="bg-purple-100 text-purple-800">Histórico</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              45 páginas
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              4.2k visualizações
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                              <Eye className="h-4 w-4 mr-1" />
                              Visualizar
                            </Button>
                            <Button size="sm" variant="outline">
                              <Heart className="h-4 w-4" />
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
                        <div className="aspect-[3/4] bg-gradient-to-br from-rose-50 to-red-100 flex items-center justify-center">
                          <FileText className="h-16 w-16 text-rose-600" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">Poemas Inéditos</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Coleção de poemas inéditos encontrados nos arquivos pessoais
                          </p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline">1960-1970</Badge>
                            <Badge className="bg-rose-100 text-rose-800">Inédito</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              23 poemas
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              1.5k visualizações
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-rose-600 hover:bg-rose-700">
                              <Eye className="h-4 w-4 mr-1" />
                              Visualizar
                            </Button>
                            <Button size="sm" variant="outline">
                              <Heart className="h-4 w-4" />
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
                        <div className="aspect-[3/4] bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center">
                          <FileText className="h-16 w-16 text-cyan-600" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">Anotações de Leitura</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Anotações marginais em livros da biblioteca pessoal de Borges
                          </p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline">1930-1980</Badge>
                            <Badge className="bg-cyan-100 text-cyan-800">Pessoal</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              89 livros
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              2.7k visualizações
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                              <Eye className="h-4 w-4 mr-1" />
                              Visualizar
                            </Button>
                            <Button size="sm" variant="outline">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>

                {/* AIDEV-NOTE: Ferramentas de análise */}
                <Card>
                  <CardHeader>
                    <CardTitle>Ferramentas de Análise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <Search className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <h3 className="font-semibold">Busca por Texto</h3>
                        <p className="text-sm text-muted-foreground">
                          Pesquise palavras específicas nos manuscritos digitalizados
                        </p>
                      </div>
                      
                      <div className="text-center p-4 border rounded-lg">
                        <Filter className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <h3 className="font-semibold">Filtros Avançados</h3>
                        <p className="text-sm text-muted-foreground">
                          Filtre por data, tipo, tema ou estado de conservação
                        </p>
                      </div>
                      
                      <div className="text-center p-4 border rounded-lg">
                        <Download className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <h3 className="font-semibold">Download HD</h3>
                        <p className="text-sm text-muted-foreground">
                          Baixe imagens em alta resolução para pesquisa acadêmica
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="fotografias" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Galeria Fotográfica</CardTitle>
                    <CardDescription>
                      Fotografias históricas de Jorge Luis Borges e seu contexto
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PhotoGallery />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Coleções Temáticas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Retratos Oficiais</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Fotografias oficiais e retratos formais de Borges
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">127 fotos</Badge>
                          <Button size="sm">Ver Coleção</Button>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Vida Cotidiana</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Momentos informais e do dia a dia do escritor
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">89 fotos</Badge>
                          <Button size="sm">Ver Coleção</Button>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Eventos Literários</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Conferências, premiações e eventos culturais
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">156 fotos</Badge>
                          <Button size="sm">Ver Coleção</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documentos" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Documentos Históricos</CardTitle>
                    <CardDescription>
                      Documentos oficiais, contratos e correspondência institucional
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-12 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded flex items-center justify-center">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Certidão de Nascimento</h3>
                          <p className="text-sm text-muted-foreground">
                            Documento oficial de nascimento de Jorge Luis Borges
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">1899</Badge>
                            <Badge className="bg-blue-100 text-blue-800">Original</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-12 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded flex items-center justify-center">
                          <FileText className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Contratos Editoriais</h3>
                          <p className="text-sm text-muted-foreground">
                            Contratos com editoras para publicação de suas obras
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">1940-1980</Badge>
                            <Badge className="bg-emerald-100 text-emerald-800">Coleção</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-12 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded flex items-center justify-center">
                          <FileText className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Diplomas e Certificados</h3>
                          <p className="text-sm text-muted-foreground">
                            Diplomas honorários e certificados de reconhecimento
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">1950-1986</Badge>
                            <Badge className="bg-purple-100 text-purple-800">Honrarias</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="audiovisual" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Arquivo Audiovisual</CardTitle>
                    <CardDescription>
                      Gravações de entrevistas, conferências e documentários
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Gravações de Áudio</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <Mic className="h-8 w-8 text-blue-600" />
                            <div className="flex-1">
                              <h4 className="font-semibold">Entrevista BBC (1976)</h4>
                              <p className="text-sm text-muted-foreground">
                                Entrevista histórica para a BBC de Londres
                              </p>
                              <Badge variant="outline" className="mt-1">45 min</Badge>
                            </div>
                            <Button size="sm">
                              <Headphones className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <Mic className="h-8 w-8 text-emerald-600" />
                            <div className="flex-1">
                              <h4 className="font-semibold">Conferência em Harvard</h4>
                              <p className="text-sm text-muted-foreground">
                                Palestra sobre literatura fantástica
                              </p>
                              <Badge variant="outline" className="mt-1">1h 20min</Badge>
                            </div>
                            <Button size="sm">
                              <Headphones className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <Mic className="h-8 w-8 text-purple-600" />
                            <div className="flex-1">
                              <h4 className="font-semibold">Leitura de Poemas</h4>
                              <p className="text-sm text-muted-foreground">
                                Borges recitando seus próprios poemas
                              </p>
                              <Badge variant="outline" className="mt-1">32 min</Badge>
                            </div>
                            <Button size="sm">
                              <Headphones className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Material Audiovisual</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <Video className="h-8 w-8 text-red-600" />
                            <div className="flex-1">
                              <h4 className="font-semibold">Documentário "Borges"</h4>
                              <p className="text-sm text-muted-foreground">
                                Documentário biográfico completo
                              </p>
                              <Badge variant="outline" className="mt-1">90 min</Badge>
                            </div>
                            <Button size="sm">
                              <Video className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <Video className="h-8 w-8 text-orange-600" />
                            <div className="flex-1">
                              <h4 className="font-semibold">Entrevista TV Argentina</h4>
                              <p className="text-sm text-muted-foreground">
                                Última entrevista televisionada
                              </p>
                              <Badge variant="outline" className="mt-1">55 min</Badge>
                            </div>
                            <Button size="sm">
                              <Video className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <Video className="h-8 w-8 text-cyan-600" />
                            <div className="flex-1">
                              <h4 className="font-semibold">Visita à Biblioteca</h4>
                              <p className="text-sm text-muted-foreground">
                                Borges em sua biblioteca pessoal
                              </p>
                              <Badge variant="outline" className="mt-1">25 min</Badge>
                            </div>
                            <Button size="sm">
                              <Video className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="colecoes" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Coleções Especiais</CardTitle>
                    <CardDescription>
                      Coleções temáticas organizadas por especialistas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <Archive className="h-12 w-12 text-blue-600 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Arquivo Pessoal</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Documentos pessoais, cartas e anotações íntimas de Borges
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Documentos:</span>
                            <span>342</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Fotografias:</span>
                            <span>89</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Cartas:</span>
                            <span>156</span>
                          </div>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Explorar Coleção
                        </Button>
                      </div>
                      
                      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <BookOpen className="h-12 w-12 text-emerald-600 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Biblioteca Pessoal</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Livros da biblioteca pessoal com anotações marginais
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Livros:</span>
                            <span>1.247</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Anotações:</span>
                            <span>3.456</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Idiomas:</span>
                            <span>12</span>
                          </div>
                        </div>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                          Explorar Coleção
                        </Button>
                      </div>
                      
                      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <User className="h-12 w-12 text-purple-600 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Correspondência</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Cartas trocadas com escritores e intelectuais
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Correspondentes:</span>
                            <span>89</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Cartas:</span>
                            <span>567</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Período:</span>
                            <span>1920-1986</span>
                          </div>
                        </div>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          Explorar Coleção
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Projetos de Digitalização</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h3 className="font-semibold">Projeto Manuscritos</h3>
                        <p className="text-sm text-muted-foreground">
                          Digitalização em alta resolução de todos os manuscritos
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                          <span className="text-sm">85% concluído</span>
                        </div>
                      </div>
                      
                      <div className="border-l-4 border-emerald-500 pl-4">
                        <h3 className="font-semibold">Projeto Audiovisual</h3>
                        <p className="text-sm text-muted-foreground">
                          Restauração e digitalização de gravações históricas
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                          <span className="text-sm">65% concluído</span>
                        </div>
                      </div>
                      
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h3 className="font-semibold">Projeto Fotografias</h3>
                        <p className="text-sm text-muted-foreground">
                          Catalogação e digitalização do arquivo fotográfico
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                          <span className="text-sm">92% concluído</span>
                        </div>
                      </div>
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
          <Card className="bg-gradient-to-r from-slate-600 to-blue-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Para Pesquisadores e Acadêmicos
              </h2>
              <p className="mb-6">
                Solicite acesso especial ao acervo completo para pesquisas acadêmicas. 
                Oferecemos suporte especializado e acesso a materiais exclusivos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-slate-600 hover:bg-gray-100">
                  Solicitar Acesso Acadêmico
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-600">
                  Guia de Pesquisa
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
