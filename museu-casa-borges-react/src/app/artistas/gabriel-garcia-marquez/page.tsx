"use client"
import { Metadata } from 'next'
import ContentPage from '@/components/content/ContentPage'
import { AuthorCredit } from '@/components/ui/AuthorCredit'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, BookOpen, Award, Quote, Trophy, Globe } from 'lucide-react'

// metadata removido neste componente client

// AIDEV-NOTE: Página dedicada ao escritor Gabriel García Márquez
// Apresenta biografia, principais obras, técnicas narrativas e influência mundial
// Destaca sua contribuição ao realismo mágico e à literatura latino-americana

export default function GabrielGarciaMarquezPage() {
  const obras = [
    {
      titulo: "Cem Anos de Solidão",
      ano: 1967,
      tipo: "Romance",
      descricao: "Obra-prima do realismo mágico que narra a saga da família Buendía"
    },
    {
      titulo: "O Amor nos Tempos do Cólera",
      ano: 1985,
      tipo: "Romance",
      descricao: "História de amor épica que atravessa mais de cinquenta anos"
    },
    {
      titulo: "Crônica de uma Morte Anunciada",
      ano: 1981,
      tipo: "Novela",
      descricao: "Narrativa sobre um crime anunciado em uma pequena cidade"
    },
    {
      titulo: "O Outono do Patriarca",
      ano: 1975,
      tipo: "Romance",
      descricao: "Retrato poético e cruel do poder absoluto na América Latina"
    },
    {
      titulo: "Ninguém Escreve ao Coronel",
      ano: 1961,
      tipo: "Novela",
      descricao: "História tocante sobre esperança e dignidade na adversidade"
    },
    {
      titulo: "A Incrível e Triste História da Cândida Eréndira",
      ano: 1972,
      tipo: "Contos",
      descricao: "Coletânea de contos que consolidou sua técnica narrativa"
    }
  ]

  const premios = [
    {
      ano: 1982,
      premio: "Prêmio Nobel de Literatura",
      descricao: "Por seus romances e contos, nos quais o fantástico e o real se combinam em um mundo ricamente composto de imaginação"
    },
    {
      ano: 1971,
      premio: "Prêmio Neustadt",
      descricao: "Reconhecimento internacional por sua contribuição à literatura"
    },
    {
      ano: 1977,
      premio: "Prêmio Rómulo Gallegos",
      descricao: "Por 'O Outono do Patriarca'"
    },
    {
      ano: 1981,
      premio: "Prêmio de Literatura em Língua Francesa",
      descricao: "Reconhecimento na França por sua obra traduzida"
    }
  ]

  const cronologia = [
    { ano: 1927, evento: "Nasce em Aracataca, Colômbia" },
    { ano: 1947, evento: "Inicia estudos de Direito em Bogotá" },
    { ano: 1948, evento: "Começa carreira jornalística" },
    { ano: 1955, evento: "Publica 'A Folhagem'" },
    { ano: 1961, evento: "Publica 'Ninguém Escreve ao Coronel'" },
    { ano: 1967, evento: "Publica 'Cem Anos de Solidão'" },
    { ano: 1975, evento: "Publica 'O Outono do Patriarca'" },
    { ano: 1982, evento: "Recebe o Prêmio Nobel de Literatura" },
    { ano: 2014, evento: "Falece na Cidade do México aos 87 anos" }
  ]

  const tecnicas = [
    {
      nome: "Realismo Mágico",
      descricao: "Fusão natural entre elementos fantásticos e realidade cotidiana"
    },
    {
      nome: "Tempo Circular",
      descricao: "Narrativa que rompe com a linearidade temporal tradicional"
    },
    {
      nome: "Hipérbole Poética",
      descricao: "Uso de exageros poéticos para intensificar a narrativa"
    },
    {
      nome: "Oralidade",
      descricao: "Incorporação da tradição oral caribenha na literatura escrita"
    }
  ]

  const citacoes = [
    "A vida não é a que a gente viveu, e sim a que a gente recorda, e como recorda para contá-la.",
    "É impossível explicar como, quando e por que me apaixonei pela primeira vez. Foi em Paris, em um outono tardio.",
    "O segredo da boa velhice não é outra coisa senão um pacto honrado com a solidão.",
    "Sempre haverá algo que impeça de ser completamente feliz: isso se chama vida."
  ]

  return (
    <ContentPage title="Gabriel García Márquez" subtitle="Mestre do Realismo Mágico" contentWidthClass="max-w-6xl">
      <div className="space-y-12">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="prose prose-lg max-w-none">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <p className="text-xl leading-relaxed text-gray-700 mb-6">
                Gabriel García Márquez (1927-2014), conhecido carinhosamente como "Gabo", foi um dos escritores mais influentes do século XX e o principal expoente do realismo mágico. Nascido em Aracataca, na costa caribenha da Colômbia, transformou sua terra natal na mítica Macondo.
              </p>
              <p className="text-lg leading-relaxed text-gray-600 mb-6">
                Sua obra-prima, "Cem Anos de Solidão" (1967), é considerada uma das maiores realizações da literatura mundial, narrando a saga épica da família Buendía através de múltiplas gerações. O romance estabeleceu García Márquez como figura central do boom latino-americano.
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                Jornalista de formação, García Márquez soube combinar sua experiência profissional com uma imaginação extraordinária, criando um estilo único que influenciou escritores em todo o mundo. Seu Nobel de Literatura em 1982 coroou uma carreira dedicada a dar voz à América Latina.
              </p>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Dados Biográficos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <strong>Nascimento:</strong> 6 de março de 1927
                  </div>
                  <div>
                    <strong>Local:</strong> Aracataca, Colômbia
                  </div>
                  <div>
                    <strong>Falecimento:</strong> 17 de abril de 2014
                  </div>
                  <div>
                    <strong>Nacionalidade:</strong> Colombiana
                  </div>
                  <div>
                    <strong>Gêneros:</strong> Romance, Conto, Jornalismo
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    Nobel de Literatura
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="default" className="bg-yellow-100 text-yellow-800">1982</Badge>
                  <p className="text-sm text-gray-600 mt-2">Primeiro colombiano a receber o prêmio</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    Alcance Global
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Obras traduzidas para mais de 40 idiomas</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Tabs defaultValue="obras" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="obras">Principais Obras</TabsTrigger>
              <TabsTrigger value="tecnicas">Técnicas Narrativas</TabsTrigger>
              <TabsTrigger value="premios">Prêmios</TabsTrigger>
              <TabsTrigger value="cronologia">Cronologia</TabsTrigger>
              <TabsTrigger value="citacoes">Citações</TabsTrigger>
            </TabsList>

            <TabsContent value="obras" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {obras.map((obra, index) => (
                  <motion.div key={obra.titulo} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{obra.titulo}</CardTitle>
                          <Badge variant="secondary">{obra.ano}</Badge>
                        </div>
                        <CardDescription>
                          <Badge variant="outline">{obra.tipo}</Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{obra.descricao}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tecnicas" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {tecnicas.map((tecnica, index) => (
                  <motion.div key={tecnica.nome} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-purple-600" />
                          {tecnica.nome}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{tecnica.descricao}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>O Realismo Mágico de García Márquez</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      García Márquez revolucionou a literatura ao criar um estilo onde o extraordinário convive naturalmente com o cotidiano. Em suas narrativas, personagens podem voar, chover flores ou viver mais de cem anos, e tudo isso é apresentado com a mesma naturalidade de eventos corriqueiros. Esta técnica não apenas encantou leitores mundialmente, mas também ofereceu uma nova forma de compreender e narrar a realidade latino-americana.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="premios" className="mt-8">
              <div className="space-y-6">
                {premios.map((premio, index) => (
                  <motion.div key={premio.ano} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Award className="h-5 w-5 text-yellow-600" />
                            {premio.premio}
                          </CardTitle>
                          <Badge variant="default" className="bg-yellow-100 text-yellow-800">{premio.ano}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{premio.descricao}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cronologia" className="mt-8">
              <div className="space-y-4">
                {cronologia.map((item, index) => (
                  <motion.div key={item.ano} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border">
                    <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-sm">{item.ano}</span>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">{item.evento}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="citacoes" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {citacoes.map((citacao, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <Quote className="h-8 w-8 text-purple-500 mb-4" />
                        <blockquote className="text-lg italic text-gray-700 leading-relaxed">"{citacao}"</blockquote>
                        <footer className="mt-4 text-sm text-gray-500">— Gabriel García Márquez</footer>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.section>

        <AuthorCredit author="Curadoria Museu Casa Borges" date="2024" description="Conteúdo baseado em pesquisa acadêmica e fontes históricas" />
      </div>
    </ContentPage>
  )
}
