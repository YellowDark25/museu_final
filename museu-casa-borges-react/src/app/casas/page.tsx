import { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import { ContentPage } from '@/components/ui/ContentPage'
import { AuthorCredit } from '@/components/ui/AuthorCredit'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, Home, Users, ArrowRight, Clock, Camera } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Casas Históricas - Museu Casa Borges',
  description: 'Explore as casas históricas preservadas pelo museu, cada uma contando uma parte importante da história cultural argentina.',
  keywords: 'casas históricas, patrimônio, arquitetura, história argentina, preservação cultural'
}

// AIDEV-NOTE: Página índice das casas históricas
// Apresenta todas as casas preservadas pelo museu com informações detalhadas
// Serve como hub de navegação para páginas individuais de cada casa

export default function CasasPage() {
  const casas = [
    {
      nome: "Casa Herculano",
      slug: "casa-herculano",
      periodo: "Século XIX",
      estilo: "Colonial Argentino",
      localizacao: "Centro Histórico",
      descricao: "Uma das casas mais antigas da região, preserva a arquitetura colonial típica do século XIX.",
      caracteristicas: ["Pátio Central", "Telhado de Telhas", "Paredes de Adobe"],
      status: "Restaurada",
      visitasGuiadas: true,
      cor: "blue"
    },
    {
      nome: "Casa da Barra",
      slug: "casa-barra",
      periodo: "1890-1920",
      estilo: "Eclético",
      localizacao: "Bairro da Barra",
      descricao: "Residência que exemplifica a transição arquitetônica do final do século XIX para o início do XX.",
      caracteristicas: ["Fachada Ornamentada", "Vitrais", "Jardim Histórico"],
      status: "Em Restauração",
      visitasGuiadas: false,
      cor: "green"
    },
    {
      nome: "Casa Balatiponé",
      slug: "casa-balatipone",
      periodo: "1850-1880",
      estilo: "Rural Tradicional",
      localizacao: "Zona Rural",
      descricao: "Casa rural que representa o modo de vida tradicional das famílias do interior argentino.",
      caracteristicas: ["Galeria Frontal", "Cozinha a Lenha", "Poço Artesiano"],
      status: "Preservada",
      visitasGuiadas: true,
      cor: "orange"
    }
  ]

  const estatisticas = [
    {
      numero: "3",
      label: "Casas Preservadas",
      icone: Home,
      cor: "blue"
    },
    {
      numero: "150+",
      label: "Anos de História",
      icone: Clock,
      cor: "green"
    },
    {
      numero: "2",
      label: "Visitas Guiadas",
      icone: Users,
      cor: "purple"
    },
    {
      numero: "500+",
      label: "Fotos Históricas",
      icone: Camera,
      cor: "orange"
    }
  ]

  const getCorClasses = (cor: string) => {
    const cores = {
      blue: "border-blue-200 hover:border-blue-300 hover:shadow-blue-100",
      green: "border-green-200 hover:border-green-300 hover:shadow-green-100",
      orange: "border-orange-200 hover:border-orange-300 hover:shadow-orange-100",
      purple: "border-purple-200 hover:border-purple-300 hover:shadow-purple-100"
    }
    return cores[cor as keyof typeof cores] || cores.blue
  }

  const getBadgeClasses = (cor: string) => {
    const cores = {
      blue: "bg-blue-100 text-blue-800",
      green: "bg-green-100 text-green-800",
      orange: "bg-orange-100 text-orange-800",
      purple: "bg-purple-100 text-purple-800"
    }
    return cores[cor as keyof typeof cores] || cores.blue
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Restaurada":
        return "bg-green-100 text-green-800"
      case "Em Restauração":
        return "bg-yellow-100 text-yellow-800"
      case "Preservada":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (      <ContentPage
        title="Casas Históricas"
        subtitle="Patrimônio Arquitetônico Preservado"
        backgroundImage="/images/fundo2.jpg"
      >
        <div className="space-y-12">
          {/* Introdução */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none text-center"
          >
            <p className="text-xl leading-relaxed text-gray-700 mb-8">
              Descubra as casas históricas preservadas pelo Museu Casa Borges, cada uma 
              representando diferentes períodos e estilos arquitetônicos da Argentina. 
              Estas residências contam a história de como viviam as famílias ao longo 
              dos séculos XIX e XX.
            </p>
          </motion.section>

          {/* Estatísticas */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {estatisticas.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`text-center ${getCorClasses(stat.cor)}`}>
                    <CardContent className="p-6">
                      <stat.icone className={`h-8 w-8 mx-auto mb-3 text-${stat.cor}-600`} />
                      <div className={`text-3xl font-bold text-${stat.cor}-600 mb-1`}>
                        {stat.numero}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Grid de Casas */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {casas.map((casa, index) => (
                <motion.div
                  key={casa.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className={`h-full transition-all duration-300 ${getCorClasses(casa.cor)} hover:shadow-lg`}>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl">{casa.nome}</CardTitle>
                        <Badge className={getStatusColor(casa.status)}>
                          {casa.status}
                        </Badge>
                      </div>
                      <CardDescription className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          {casa.periodo}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          {casa.localizacao}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        {casa.descricao}
                      </p>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Estilo Arquitetônico:</h4>
                        <Badge variant="outline" className={getBadgeClasses(casa.cor)}>
                          {casa.estilo}
                        </Badge>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Características:</h4>
                        <div className="flex flex-wrap gap-2">
                          {casa.caracteristicas.map((caracteristica) => (
                            <Badge key={caracteristica} variant="secondary" className="text-xs">
                              {caracteristica}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {casa.visitasGuiadas ? "Visitas guiadas disponíveis" : "Visitas em breve"}
                        </span>
                      </div>

                      <div className="pt-4">
                        <Link href={`/casas/${casa.slug}`}>
                          <Button className="w-full group" disabled={!casa.visitasGuiadas}>
                            {casa.visitasGuiadas ? "Explorar Casa" : "Em Breve"}
                            {casa.visitasGuiadas && (
                              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            )}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Seção de Preservação */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Preservação do Patrimônio
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-center mb-6">
                  O Museu Casa Borges dedica-se à preservação e restauração de casas históricas 
                  que representam diferentes períodos da arquitetura argentina. Cada casa é 
                  cuidadosamente mantida para preservar sua autenticidade histórica, permitindo 
                  que visitantes experimentem como era a vida em diferentes épocas.
                </p>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Técnicas de Restauração:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Uso de materiais originais da época</li>
                      <li>• Preservação de técnicas construtivas tradicionais</li>
                      <li>• Documentação fotográfica detalhada</li>
                      <li>• Pesquisa histórica aprofundada</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Importância Cultural:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Testemunho da evolução arquitetônica</li>
                      <li>• Preservação da memória familiar</li>
                      <li>• Educação sobre modos de vida históricos</li>
                      <li>• Valorização do patrimônio local</li>
                    </ul>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <Link href="/visita">
                    <Button variant="outline">
                      Agendar Visita Guiada
                      <ArrowRight className="h-4 w-4 ml-2" />
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
            description="Informações baseadas em pesquisa arquitetônica e histórica"
          />
        </div>
      </ContentPage>  )
}
