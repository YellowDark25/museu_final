"use client"
import { Metadata } from 'next'
import ContentPage from '@/components/content/ContentPage'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Trophy, Award, BookOpen, Quote } from 'lucide-react'
import { AuthorCredit } from '@/components/ui/AuthorCredit'

// metadata removido neste componente client

// AIDEV-NOTE: Página dedicada ao poeta e ensaísta Octavio Paz
// Apresenta biografia, principais obras, prêmios e contribuições literárias
// Destaca sua importância na literatura hispano-americana e mundial

/**
 * Página de artista: Octavio Paz
 * Renderização enxuta e válida para produção, substituindo conteúdo codificado por JSX correto.
 */
export default function OctavioPazPage() {
  const obras = [
    {
      titulo: "O Labirinto da Solidão",
      ano: 1950,
      tipo: "Ensaio",
      descricao: "Análise profunda da identidade e psicologia mexicana"
    },
    {
      titulo: "Pedra do Sol",
      ano: 1957,
      tipo: "Poema",
      descricao: "Poema épico de 584 versos inspirado no calendário asteca"
    },
    {
      titulo: "Águia ou Sol?",
      ano: 1951,
      tipo: "Poesia",
      descricao: "Coletânea que marca sua fase surrealista"
    },
    {
      titulo: "O Arco e a Lira",
      ano: 1956,
      tipo: "Ensaio",
      descricao: "Reflexões sobre a natureza da poesia e da criação artística"
    },
    {
      titulo: "Conjunções e Disjunções",
      ano: 1969,
      tipo: "Ensaio",
      descricao: "Análise das relações entre Oriente e Ocidente"
    },
    {
      titulo: "Liberdade sob Palavra",
      ano: 1949,
      tipo: "Poesia",
      descricao: "Primeira grande coletânea poética"
    }
  ]

  const premios = [
    {
      ano: 1990,
      premio: "Prêmio Nobel de Literatura",
      descricao: "Por sua escrita apaixonada com amplos horizontes, caracterizada por inteligência sensual e integridade humanística"
    },
    {
      ano: 1982,
      premio: "Prêmio Cervantes",
      descricao: "Máximo reconhecimento das letras hispânicas"
    },
    {
      ano: 1977,
      premio: "Prêmio Jerusalem",
      descricao: "Por sua contribuição à liberdade do indivíduo na sociedade"
    },
    {
      ano: 1984,
      premio: "Prêmio da Paz dos Livreiros Alemães",
      descricao: "Reconhecimento por sua obra pacifista e humanística"
    }
  ]

  const cronologia = [
    { ano: 1914, evento: "Nasce na Cidade do México" },
    { ano: 1937, evento: "Publica seu primeiro livro de poemas" },
    { ano: 1943, evento: "Recebe bolsa Guggenheim nos EUA" },
    { ano: 1945, evento: "Ingressa no serviço diplomático mexicano" },
    { ano: 1950, evento: "Publica 'O Labirinto da Solidão'" },
    { ano: 1962, evento: "Torna-se embaixador do México na Índia" },
    { ano: 1968, evento: "Renuncia ao cargo em protesto ao massacre de Tlatelolco" },
    { ano: 1990, evento: "Recebe o Prêmio Nobel de Literatura" },
    { ano: 1998, evento: "Falece na Cidade do México aos 84 anos" }
  ]

  const citacoes = [
    "A solidão é o fundo último da condição humana. O homem é o único ser que se sente só e o único que é busca de outro.",
    "Entre ir e ficar duvido: de um lado, o vento e as folhas; de outro, a unidade e suas conjunções.",
    "A poesia é conhecimento, salvação, poder, abandono. Operação capaz de transformar o mundo.",
    "Aprender a morrer é aprender a ser livre."
  ]

  return (
    <ContentPage title="Octavio Paz" subtitle="Poeta da Solidão e do Tempo" contentWidthClass="max-w-6xl">
      <div className="space-y-12">
          {/* Biografia Principal */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="prose prose-lg max-w-none">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-2">
                <p className="text-xl leading-relaxed text-gray-700 mb-6">
                  Octavio Paz (1914-1998) foi um dos maiores poetas e ensaístas do século XX, reconhecido mundialmente com o Prêmio Nobel de Literatura em 1990.
                </p>
                <p className="text-lg leading-relaxed text-gray-600 mb-6">
                  Sua obra mais conhecida, "O Labirinto da Solidão" (1950), analisa a identidade mexicana e a condição humana universal.
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
                      <strong>Nascimento:</strong> 31 de março de 1914
                    </div>
                    <div>
                      <strong>Falecimento:</strong> 19 de abril de 1998
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
                    <Badge variant="default" className="bg-yellow-100 text-yellow-800">1990</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.section>

          {/* Tabs com conteúdo detalhado */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Tabs defaultValue="obras" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="obras">Principais Obras</TabsTrigger>
                <TabsTrigger value="premios">Prêmios</TabsTrigger>
                <TabsTrigger value="cronologia">Cronologia</TabsTrigger>
                <TabsTrigger value="temas">Temas Centrais</TabsTrigger>
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

              <TabsContent value="premios" className="mt-8">
                <div className="space-y-6">
                  {premios.map((premio, index) => (
                    <motion.div
                      key={premio.ano}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Award className="h-5 w-5 text-yellow-600" />
                              {premio.premio}
                            </CardTitle>
                            <Badge variant="default" className="bg-yellow-100 text-yellow-800">
                              {premio.ano}
                            </Badge>
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
                    <motion.div
                      key={item.ano}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border"
                    >
                      <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">{item.ano}</span>
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">{item.evento}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="temas" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Temas Poéticos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Solidão e Comunhão</h4>
                        <p className="text-gray-600 text-sm">
                          Exploração da condição humana entre o isolamento e a busca de conexão.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Tempo e Eternidade</h4>
                        <p className="text-gray-600 text-sm">
                          Reflexões sobre a temporalidade e a busca do momento eterno.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Oriente e Ocidente</h4>
                        <p className="text-gray-600 text-sm">
                          Síntese entre filosofias orientais e tradição ocidental.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Contribuições Literárias
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Renovação Poética</h4>
                        <p className="text-gray-600 text-sm">
                          Modernização da poesia hispano-americana sem perder as raízes.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Ensaio Moderno</h4>
                        <p className="text-gray-600 text-sm">
                          Criação de um novo modelo de ensaio literário e cultural.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Crítica Cultural</h4>
                        <p className="text-gray-600 text-sm">
                          Análise profunda da identidade latino-americana.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="citacoes" className="mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {citacoes.map((citacao, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardContent className="p-6">
                          <Quote className="h-8 w-8 text-green-500 mb-4" />
                          <blockquote className="text-lg italic text-gray-700 leading-relaxed">
                            "{citacao}"
                          </blockquote>
                          <footer className="mt-4 text-sm text-gray-500">
                            — Octavio Paz
                          </footer>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.section>

          <AuthorCredit 
            author="Curadoria Museu Casa Borges"
            date="2024"
            description="Conteúdo baseado em pesquisa acadêmica e fontes históricas"
          />
        </div>
      </ContentPage>
  )
}
