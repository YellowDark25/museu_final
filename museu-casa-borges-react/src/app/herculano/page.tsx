"use client"
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  BookOpen, 
  Award, 
  Calendar,
  Heart,
  Scroll,
  Feather,
  Globe,
  Clock,
  MapPin,
  Star,
  Camera,
  Palette,
  Music,
  GraduationCap,
  Lightbulb,
  Home,
  Building
} from 'lucide-react'
import Image from 'next/image'
import { Metadata } from 'next'

/**
 * AIDEV-NOTE: Página dedicada a Herculano Borges
 * Apresenta biografia, contribuições e legado histórico
 * Utiliza tabs para organizar cronologia, obras e reconhecimentos
 * Design responsivo com animações e microinterações
 */
/**
 * HerculanoPage
 * Componente client com animações e conteúdo biográfico
 */
export default function HerculanoPage() {
  const cronologia = [
    {
      ano: "1850",
      evento: "Nascimento em Mato Grosso",
      descricao: "Nasce em uma família tradicional da região, em meio ao período de expansão territorial."
    },
    {
      ano: "1870",
      evento: "Início da carreira literária",
      descricao: "Publica seus primeiros escritos sobre a cultura e história regional."
    },
    {
      ano: "1885",
      evento: "Fundação da biblioteca pessoal",
      descricao: "Estabelece uma das maiores coleções de livros da região, aberta ao público."
    },
    {
      ano: "1900",
      evento: "Obra principal publicada",
      descricao: "Lança 'Memórias do Pantanal', considerada sua obra-prima."
    },
    {
      ano: "1920",
      evento: "Reconhecimento nacional",
      descricao: "Recebe honrarias por sua contribuição à preservação da cultura regional."
    }
  ]

  const obras = [
    {
      titulo: "Memórias do Pantanal",
      ano: "1900",
      descricao: "Relatos históricos e culturais sobre a região pantaneira",
      categoria: "História"
    },
    {
      titulo: "Contos da Fronteira",
      ano: "1895",
      descricao: "Coletânea de narrativas sobre a vida na fronteira",
      categoria: "Literatura"
    },
    {
      titulo: "Tradições Mato-grossenses",
      ano: "1910",
      descricao: "Documentação das tradições e costumes locais",
      categoria: "Etnografia"
    },
    {
      titulo: "Cartas a um Jovem Escritor",
      ano: "1915",
      descricao: "Correspondência sobre literatura e vida intelectual",
      categoria: "Epistolar"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">
      {/* AIDEV-NOTE: Hero section com retrato e informações principais */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="/images/fundo2.jpg"
          alt="Herculano Borges"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Herculano Borges</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Guardião da Memória e Cultura Regional
            </p>
            <Badge className="mt-4 bg-amber-600 text-white hover:bg-amber-700">
              <Calendar className="w-4 h-4 mr-2" />
              1850 - 1925
            </Badge>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* AIDEV-NOTE: Seção biográfica principal */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                <User className="w-4 h-4 mr-2" />
                Biografia
              </Badge>
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Um Visionário da Preservação Cultural
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Herculano Borges foi uma figura fundamental na preservação da memória 
                e cultura de Mato Grosso. Nascido em 1850, dedicou sua vida à 
                documentação das tradições, costumes e histórias da região pantaneira.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Escritor, historiador e colecionador, Herculano construiu uma das 
                maiores bibliotecas particulares do Centro-Oeste, que posteriormente 
                se tornou a base do acervo do museu que hoje leva seu nome.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Sua obra transcende a literatura, abrangendo estudos etnográficos, 
                documentação histórica e preservação de tradições orais que, sem 
                seu trabalho, poderiam ter se perdido no tempo.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/fundo2.jpg"
                alt="Retrato de Herculano Borges"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* AIDEV-NOTE: Tabs com cronologia, obras e legado */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Tabs defaultValue="cronologia" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="cronologia" className="text-lg">
                <Clock className="w-5 h-5 mr-2" />
                Cronologia
              </TabsTrigger>
              <TabsTrigger value="obras" className="text-lg">
                <BookOpen className="w-5 h-5 mr-2" />
                Obras
              </TabsTrigger>
              <TabsTrigger value="legado" className="text-lg">
                <Award className="w-5 h-5 mr-2" />
                Legado
              </TabsTrigger>
            </TabsList>

            {/* Cronologia */}
            <TabsContent value="cronologia">
              <div className="space-y-6">
                {cronologia.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="border-l-4 border-l-amber-500 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Badge className="bg-amber-100 text-amber-800 text-lg px-3 py-1">
                            {item.ano}
                          </Badge>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">
                              {item.evento}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {item.descricao}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Obras */}
            <TabsContent value="obras">
              <div className="grid md:grid-cols-2 gap-6">
                {obras.map((obra, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-xl text-gray-800">
                            {obra.titulo}
                          </CardTitle>
                          <Badge variant="outline" className="text-sm">
                            {obra.ano}
                          </Badge>
                        </div>
                        <Badge className="w-fit bg-blue-100 text-blue-800">
                          <Scroll className="w-4 h-4 mr-1" />
                          {obra.categoria}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed">
                          {obra.descricao}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Legado */}
            <TabsContent value="legado">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardHeader>
                    <CardTitle className="text-2xl text-green-800 flex items-center">
                      <Building className="w-6 h-6 mr-3" />
                      Patrimônio Arquitetônico
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      A casa onde Herculano viveu é hoje um patrimônio histórico 
                      preservado, mantendo a arquitetura original do século XIX 
                      e servindo como testemunho da vida intelectual da época.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-green-500 mr-2" />
                        Arquitetura colonial preservada
                      </li>
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-green-500 mr-2" />
                        Biblioteca original mantida
                      </li>
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-green-500 mr-2" />
                        Mobiliário de época
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50">
                  <CardHeader>
                    <CardTitle className="text-2xl text-purple-800 flex items-center">
                      <BookOpen className="w-6 h-6 mr-3" />
                      Acervo Literário
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Sua coleção de mais de 3.000 volumes forma a base do acervo 
                      do museu, incluindo primeiras edições, manuscritos raros e 
                      documentos históricos únicos.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-purple-500 mr-2" />
                        Manuscritos originais
                      </li>
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-purple-500 mr-2" />
                        Primeiras edições raras
                      </li>
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-purple-500 mr-2" />
                        Correspondências históricas
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
                  <CardHeader>
                    <CardTitle className="text-2xl text-amber-800 flex items-center">
                      <GraduationCap className="w-6 h-6 mr-3" />
                      Impacto Educacional
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Herculano foi pioneiro na educação regional, formando 
                      gerações de escritores e intelectuais que continuaram 
                      seu trabalho de preservação cultural.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-amber-500 mr-2" />
                        Mentor de jovens escritores
                      </li>
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-amber-500 mr-2" />
                        Fundador de círculos literários
                      </li>
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-amber-500 mr-2" />
                        Promotor da educação popular
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardHeader>
                    <CardTitle className="text-2xl text-blue-800 flex items-center">
                      <Heart className="w-6 h-6 mr-3" />
                      Reconhecimento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Sua contribuição é reconhecida nacionalmente, com 
                      instituições, ruas e prêmios literários que levam seu nome 
                      em homenagem ao seu legado.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-blue-500 mr-2" />
                        Patrono de bibliotecas
                      </li>
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-blue-500 mr-2" />
                        Nome em logradouros públicos
                      </li>
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-blue-500 mr-2" />
                        Prêmio literário regional
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.section>

        {/* AIDEV-NOTE: Call to action para explorar mais */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold mb-6">
                Explore o Legado de Herculano
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Visite a casa onde viveu e trabalhou, explore seu acervo pessoal 
                e descubra como sua visão moldou a preservação cultural regional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="secondary" className="px-8 py-3">
                    <Home className="w-5 h-5 mr-2" />
                    Visitar Casa Herculano
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-amber-600">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Explorar Acervo
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}
