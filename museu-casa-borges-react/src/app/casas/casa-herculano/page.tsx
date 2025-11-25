"use client"
import { Metadata } from 'next'
import ContentPage from '@/components/content/ContentPage'
import { AuthorCredit } from '@/components/ui/AuthorCredit'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, 
  MapPin, 
  Home, 
  Users, 
  ArrowLeft, 
  Clock, 
  Camera,
  Ruler,
  Hammer,
  TreePine,
  Palette
} from 'lucide-react'
import Link from 'next/link'



// AIDEV-NOTE: Página detalhada da Casa Herculano
// Apresenta informações completas sobre história, arquitetura, restauração e galeria
// Inclui tabs para organizar diferentes aspectos da casa histórica

export default function CasaHerculanoPage() {
  const informacoesBasicas = {
    nome: "Casa Herculano",
    periodo: "1850-1870",
    estilo: "Colonial Argentino",
    localizacao: "Rua San Martín, 245 - Centro Histórico",
    area: "320 m²",
    comodos: 8,
    status: "Restaurada",
    proprietarioOriginal: "Família Herculano",
    arquiteto: "Desconhecido (Construção Popular)"
  }

  const caracteristicasArquitetonicas = [
    {
      titulo: "Pátio Central",
      descricao: "Elemento central da casa, típico da arquitetura colonial, onde se desenvolvia a vida familiar.",
      icone: Home
    },
    {
      titulo: "Paredes de Adobe",
      descricao: "Construção em adobe e tijolo cru, técnica tradicional que proporciona isolamento térmico.",
      icone: Hammer
    },
    {
      titulo: "Telhado de Telhas",
      descricao: "Cobertura em telhas de barro cozido, com estrutura de madeira nativa da região.",
      icone: TreePine
    },
    {
      titulo: "Galeria Perimetral",
      descricao: "Corredor coberto que circunda o pátio, protegendo os ambientes internos.",
      icone: Ruler
    }
  ]

  const cronologiaRestauracao = [
    {
      ano: "1995",
      evento: "Aquisição pelo Museu",
      descricao: "Casa adquirida em estado de deterioração avançada"
    },
    {
      ano: "1996-1998",
      evento: "Pesquisa Histórica",
      descricao: "Levantamento documental e arqueológico da propriedade"
    },
    {
      ano: "1999-2002",
      evento: "Restauração Estrutural",
      descricao: "Consolidação das paredes e reconstrução do telhado"
    },
    {
      ano: "2003-2005",
      evento: "Restauração Decorativa",
      descricao: "Recuperação de pinturas murais e elementos ornamentais"
    },
    {
      ano: "2006",
      evento: "Abertura ao Público",
      descricao: "Inauguração como casa-museu com visitas guiadas"
    }
  ]

  const ambientes = [
    {
      nome: "Sala Principal",
      descricao: "Ambiente de recepção com mobiliário de época e pinturas murais restauradas.",
      area: "25 m²",
      caracteristicas: ["Piso de ladrilhos", "Teto com vigas aparentes", "Janelas com grades de ferro"]
    },
    {
      nome: "Quarto dos Pais",
      descricao: "Dormitório principal com cama de ferro e móveis originais da família.",
      area: "20 m²",
      caracteristicas: ["Armário de madeira", "Lavatório de mármore", "Espelho biselado"]
    },
    {
      nome: "Cozinha",
      descricao: "Cozinha com fogão a lenha e utensílios domésticos do século XIX.",
      area: "15 m²",
      caracteristicas: ["Fogão de ferro", "Prateleiras de madeira", "Poço interno"]
    },
    {
      nome: "Pátio Central",
      descricao: "Coração da casa com jardim, poço e galeria coberta ao redor.",
      area: "80 m²",
      caracteristicas: ["Poço artesiano", "Jardim com plantas nativas", "Galeria com colunas"]
    }
  ]

  return (      <ContentPage
        title="Casa Herculano"
        subtitle="Arquitetura Colonial do Século XIX"
        backgroundImage="/images/fundo3.jpg"
      >
        <div className="space-y-8">
          {/* Navegação */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/casas">
              <Button variant="outline" className="mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar às Casas Históricas
              </Button>
            </Link>
          </motion.div>

          {/* Informações Básicas */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-blue-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{informacoesBasicas.nome}</CardTitle>
                    <CardDescription className="text-lg">
                      {informacoesBasicas.estilo} • {informacoesBasicas.periodo}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {informacoesBasicas.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-semibold">Localização</div>
                      <div className="text-sm text-gray-600">{informacoesBasicas.localizacao}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-semibold">Área Total</div>
                      <div className="text-sm text-gray-600">{informacoesBasicas.area}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-semibold">Cômodos</div>
                      <div className="text-sm text-gray-600">{informacoesBasicas.comodos} ambientes</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-semibold">Proprietário Original</div>
                      <div className="text-sm text-gray-600">{informacoesBasicas.proprietarioOriginal}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Tabs com Conteúdo Detalhado */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="historia" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="historia">História</TabsTrigger>
                <TabsTrigger value="arquitetura">Arquitetura</TabsTrigger>
                <TabsTrigger value="ambientes">Ambientes</TabsTrigger>
                <TabsTrigger value="restauracao">Restauração</TabsTrigger>
              </TabsList>

              <TabsContent value="historia" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      História da Casa
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      A Casa Herculano foi construída entre 1850 e 1870 pela família de mesmo nome, 
                      imigrantes espanhóis que se estabeleceram na região durante o período de 
                      expansão urbana do século XIX. A casa representa um exemplo típico da 
                      arquitetura residencial colonial argentina, adaptada às condições climáticas 
                      e materiais disponíveis na região.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Durante décadas, a casa abrigou três gerações da família Herculano, que se 
                      dedicavam ao comércio local e à agricultura. A propriedade manteve suas 
                      características originais até meados do século XX, quando foi abandonada 
                      após a morte do último descendente direto.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Em 1995, o Museu Casa Borges adquiriu a propriedade com o objetivo de 
                      preservar este importante exemplo da arquitetura doméstica do século XIX. 
                      Após um extenso processo de restauração, a casa foi aberta ao público em 
                      2006, permitindo que visitantes experimentem como era a vida familiar 
                      durante o período colonial.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="arquitetura" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {caracteristicasArquitetonicas.map((caracteristica, index) => (
                    <motion.div
                      key={caracteristica.titulo}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <caracteristica.icone className="h-5 w-5 text-blue-600" />
                            {caracteristica.titulo}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700">{caracteristica.descricao}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Características Técnicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-2">Materiais Utilizados:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Adobe e tijolo cru nas paredes</li>
                          <li>• Madeira nativa para estruturas</li>
                          <li>• Telhas de barro cozido</li>
                          <li>• Pedra calcária nas fundações</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Técnicas Construtivas:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Paredes portantes de adobe</li>
                          <li>• Fundações de pedra argamassada</li>
                          <li>• Cobertura em duas águas</li>
                          <li>• Pisos de ladrilho cerâmico</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ambientes" className="space-y-6">
                <div className="grid gap-6">
                  {ambientes.map((ambiente, index) => (
                    <motion.div
                      key={ambiente.nome}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{ambiente.nome}</CardTitle>
                            <Badge variant="outline">{ambiente.area}</Badge>
                          </div>
                          <CardDescription>{ambiente.descricao}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div>
                            <h4 className="font-semibold mb-2">Características:</h4>
                            <div className="flex flex-wrap gap-2">
                              {ambiente.caracteristicas.map((caracteristica) => (
                                <Badge key={caracteristica} variant="secondary" className="text-xs">
                                  {caracteristica}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="restauracao" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Hammer className="h-5 w-5" />
                      Processo de Restauração
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {cronologiaRestauracao.map((etapa, index) => (
                        <motion.div
                          key={etapa.ano}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex gap-4"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{etapa.evento}</h4>
                              <Badge variant="outline">{etapa.ano}</Badge>
                            </div>
                            <p className="text-gray-700 text-sm">{etapa.descricao}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.section>

          {/* Informações de Visita */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-xl text-center">
                  Visite a Casa Herculano
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 text-center">
                  <div>
                    <h4 className="font-semibold mb-2">Horários de Visita</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Terça a Domingo: 9h às 17h<br />
                      Visitas guiadas a cada hora
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Duração</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Aproximadamente 45 minutos<br />
                      Grupos de até 15 pessoas
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <Link href="/visita">
                    <Button>
                      <Camera className="h-4 w-4 mr-2" />
                      Agendar Visita Guiada
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Créditos */}
          <AuthorCredit 
            author="Departamento de Preservação - Museu Casa Borges"
            date="2024"
            description="Informações baseadas em pesquisa arquitetônica e documental"
          />
        </div>
      </ContentPage>  )
}
