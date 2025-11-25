"use client"
import { Metadata } from 'next'
import ContentPage from '@/components/content/ContentPage'
import { AuthorCredit } from '@/components/ui/AuthorCredit'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, BookOpen, Award, ArrowRight, Users, Globe } from 'lucide-react'
import Link from 'next/link'

// metadata removido neste componente client

// AIDEV-NOTE: Página índice dos artistas e escritores
// Serve como hub de navegação para todas as páginas individuais de autores
// Apresenta cards interativos com informações resumidas e links para páginas detalhadas

export default function ArtistasPage() {
  const artistas = [
    {
      nome: "Jorge Luis Borges",
      slug: "jorge-luis-borges",
      nacionalidade: "Argentina",
      periodo: "1899-1986",
      generos: ["Conto", "Poesia", "Ensaio"],
      descricao: "Mestre da literatura fantástica e um dos escritores mais influentes do século XX.",
      obraDestaque: "Ficções",
      premios: ["Prêmio Cervantes", "Prêmio Internacional de Literatura"],
      cor: "blue"
    },
    {
      nome: "Julio Cortázar",
      slug: "julio-cortazar",
      nacionalidade: "Argentina",
      periodo: "1914-1984",
      generos: ["Conto", "Romance", "Ensaio"],
      descricao: "Revolucionou a narrativa moderna com sua abordagem experimental e realismo fantástico.",
      obraDestaque: "Rayuela (O Jogo da Amarelinha)",
      premios: ["Prêmio Médicis", "Prêmio Nacional de Literatura"],
      cor: "purple"
    },
    {
      nome: "Octavio Paz",
      slug: "octavio-paz",
      nacionalidade: "México",
      periodo: "1914-1998",
      generos: ["Poesia", "Ensaio", "Crítica"],
      descricao: "Poeta da solidão e do tempo, Prêmio Nobel de Literatura de 1990.",
      obraDestaque: "O Labirinto da Solidão",
      premios: ["Prêmio Nobel", "Prêmio Cervantes", "Prêmio Jerusalem"],
      cor: "green"
    },
    {
      nome: "Gabriel García Márquez",
      slug: "gabriel-garcia-marquez",
      nacionalidade: "Colômbia",
      periodo: "1927-2014",
      generos: ["Romance", "Conto", "Jornalismo"],
      descricao: "Mestre do realismo mágico e uma das vozes mais importantes da literatura mundial.",
      obraDestaque: "Cem Anos de Solidão",
      premios: ["Prêmio Nobel", "Prêmio Neustadt", "Prêmio Rómulo Gallegos"],
      cor: "orange"
    }
  ]

  const estatisticas = [
    {
      numero: "4",
      label: "Grandes Autores",
      icone: Users,
      cor: "blue"
    },
    {
      numero: "2",
      label: "Prêmios Nobel",
      icone: Award,
      cor: "yellow"
    },
    {
      numero: "40+",
      label: "Idiomas Traduzidos",
      icone: Globe,
      cor: "green"
    },
    {
      numero: "200+",
      label: "Obras Publicadas",
      icone: BookOpen,
      cor: "purple"
    }
  ]

  const getCorClasses = (cor: string) => {
    const cores = {
      blue: "border-blue-200 hover:border-blue-300 hover:shadow-blue-100",
      purple: "border-purple-200 hover:border-purple-300 hover:shadow-purple-100",
      green: "border-green-200 hover:border-green-300 hover:shadow-green-100",
      orange: "border-orange-200 hover:border-orange-300 hover:shadow-orange-100",
      yellow: "border-yellow-200 hover:border-yellow-300 hover:shadow-yellow-100"
    }
    return cores[cor as keyof typeof cores] || cores.blue
  }

  const getBadgeClasses = (cor: string) => {
    const cores = {
      blue: "bg-blue-100 text-blue-800",
      purple: "bg-purple-100 text-purple-800",
      green: "bg-green-100 text-green-800",
      orange: "bg-orange-100 text-orange-800",
      yellow: "bg-yellow-100 text-yellow-800"
    }
    return cores[cor as keyof typeof cores] || cores.blue
  }

  return (
    <ContentPage title="Artistas e Escritores" subtitle="Grandes Nomes da Literatura Latino-Americana" contentWidthClass="max-w-6xl">
      <div className="space-y-12">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="prose prose-lg max-w-none text-center">
          <p className="text-xl leading-relaxed text-gray-700 mb-8">
            Explore a vida e obra dos grandes mestres da literatura argentina e latino-americana. Cada autor representa uma voz única que contribuiu para o rico panorama cultural de nossa região, influenciando gerações de leitores e escritores em todo o mundo.
          </p>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {estatisticas.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className={`text-center ${getCorClasses(stat.cor)}`}>
                  <CardContent className="p-6">
                    <stat.icone className={`h-8 w-8 mx-auto mb-3 text-${stat.cor}-600`} />
                    <div className={`text-3xl font-bold text-${stat.cor}-600 mb-1`}>{stat.numero}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <div className="grid md:grid-cols-2 gap-8">
            {artistas.map((artista, index) => (
              <motion.div key={artista.slug} initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 * index }}>
                <Card className={`h-full transition-all duration-300 ${getCorClasses(artista.cor)} hover:shadow-lg`}>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">{artista.nome}</CardTitle>
                      <Badge variant="outline" className={getBadgeClasses(artista.cor)}>{artista.nacionalidade}</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {artista.periodo}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">{artista.descricao}</p>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Obra em Destaque:</h4>
                      <p className="text-gray-600 italic">{artista.obraDestaque}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Gêneros Literários:</h4>
                      <div className="flex flex-wrap gap-2">
                        {artista.generos.map((genero) => (
                          <Badge key={genero} variant="secondary" className="text-xs">{genero}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Principais Prêmios:</h4>
                      <div className="flex flex-wrap gap-2">
                        {artista.premios.slice(0, 2).map((premio) => (
                          <Badge key={premio} variant="outline" className="text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            {premio}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4">
                      <Link href={`/artistas/${artista.slug}`}>
                        <Button className="w-full group">
                          Conhecer Biografia Completa
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center">O Boom Latino-Americano</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-center">
                Os autores apresentados aqui foram figuras centrais do "boom" da literatura latino-americana dos anos 1960-70, um movimento que levou nossa literatura ao reconhecimento mundial. Suas obras transcenderam fronteiras geográficas e linguísticas, estabelecendo a América Latina como uma das regiões mais criativas e inovadoras da literatura contemporânea.
              </p>
              <div className="text-center mt-6">
                <Link href="/sobre">
                  <Button variant="outline">
                    Saiba Mais Sobre o Museu
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <AuthorCredit author="Curadoria Museu Casa Borges" date="2024" description="Conteúdo baseado em pesquisa acadêmica e fontes históricas" />
      </div>
    </ContentPage>
  )
}
