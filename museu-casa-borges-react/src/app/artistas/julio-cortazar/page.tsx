"use client"
import { Metadata } from 'next'
import ContentPage from '@/components/content/ContentPage'
import { AuthorCredit } from '@/components/ui/AuthorCredit'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, BookOpen, Award, Quote } from 'lucide-react'

// metadata removido neste componente client

// AIDEV-NOTE: Página dedicada ao escritor Julio Cortázar
// Apresenta biografia completa, principais obras, cronologia e citações famosas
// Utiliza componentes reutilizáveis e animações para uma experiência envolvente

export default function JulioCortazarPage() {
  const obras = [
    {
      titulo: "Rayuela (O Jogo da Amarelinha)",
      ano: 1963,
      tipo: "Romance",
      descricao: "Obra-prima experimental que revolucionou a narrativa moderna"
    },
    {
      titulo: "Casa Tomada",
      ano: 1946,
      tipo: "Conto",
      descricao: "Um dos contos mais famosos da literatura fantástica argentina"
    },
    {
      titulo: "As Armas Secretas",
      ano: 1959,
      tipo: "Coletânea",
      descricao: "Coletânea de contos que inclui 'O Perseguidor'"
    },
    {
      titulo: "Bestiário",
      ano: 1951,
      tipo: "Coletânea",
      descricao: "Primeira coletânea de contos publicada"
    },
    {
      titulo: "62: Modelo para Armar",
      ano: 1968,
      tipo: "Romance",
      descricao: "Romance experimental baseado no capítulo 62 de Rayuela"
    },
    {
      titulo: "Histórias de Cronópios e de Famas",
      ano: 1962,
      tipo: "Contos",
      descricao: "Textos lúdicos e fantásticos sobre seres imaginários"
    }
  ]

  const cronologia = [
    { ano: 1914, evento: "Nasce em Bruxelas, Bélgica" },
    { ano: 1918, evento: "Família retorna à Argentina" },
    { ano: 1932, evento: "Forma-se como professor" },
    { ano: 1946, evento: "Publica 'Casa Tomada' na revista Sur" },
    { ano: 1951, evento: "Publica 'Bestiário', sua primeira coletânea" },
    { ano: 1951, evento: "Muda-se para Paris com bolsa de estudos" },
    { ano: 1963, evento: "Publica 'Rayuela', sua obra-prima" },
    { ano: 1967, evento: "Obtém nacionalidade francesa" },
    { ano: 1984, evento: "Falece em Paris aos 69 anos" }
  ]

  const citacoes = [
    "Nada está perdido se se tem a coragem de proclamar que tudo está perdido e que é preciso começar de novo.",
    "A única maneira de escapar do labirinto da solidão é através da comunicação humana.",
    "Eu acredito que a literatura deve ser uma forma de conhecimento, não apenas entretenimento.",
    "O fantástico irrompe no cotidiano como uma rachadura na realidade."
  ]

  return (
    <ContentPage title="Julio Cortázar" subtitle="Mestre do Realismo Fantástico" contentWidthClass="max-w-6xl">
      <div className="space-y-12">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="prose prose-lg max-w-none">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <p className="text-xl leading-relaxed text-gray-700 mb-6">
                Julio Cortázar (1914-1984) foi um dos escritores mais inovadores e influentes da literatura argentina e latino-americana. Nascido em Bruxelas e criado na Argentina, Cortázar revolucionou a narrativa moderna com sua abordagem experimental e seu domínio do realismo fantástico.
              </p>
              <p className="text-lg leading-relaxed text-gray-600 mb-6">
                Sua obra-prima, "Rayuela" (O Jogo da Amarelinha), publicada em 1963, é considerada um marco da literatura experimental, propondo múltiplas formas de leitura e questionando as convenções narrativas tradicionais.
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                Cortázar viveu grande parte de sua vida adulta em Paris, onde desenvolveu uma perspectiva única sobre a identidade latino-americana e a condição humana moderna. Seus contos, marcados pelo fantástico que irrompe no cotidiano, influenciaram gerações de escritores.
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
                    <strong>Nascimento:</strong> 26 de agosto de 1914
                  </div>
                  <div>
                    <strong>Local:</strong> Bruxelas, Bélgica
                  </div>
                  <div>
                    <strong>Falecimento:</strong> 12 de fevereiro de 1984
                  </div>
                  <div>
                    <strong>Nacionalidade:</strong> Argentina/Francesa
                  </div>
                  <div>
                    <strong>Gêneros:</strong> Conto, Romance, Ensaio
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Tabs defaultValue="obras" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="obras">Principais Obras</TabsTrigger>
              <TabsTrigger value="cronologia">Cronologia</TabsTrigger>
              <TabsTrigger value="estilo">Estilo Literário</TabsTrigger>
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

            <TabsContent value="cronologia" className="mt-8">
              <div className="space-y-4">
                {cronologia.map((item, index) => (
                  <motion.div key={item.ano} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">{item.ano}</span>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">{item.evento}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="estilo" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Características Literárias
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Realismo Fantástico</h4>
                      <p className="text-gray-600 text-sm">Mestre em inserir elementos fantásticos no cotidiano de forma natural e perturbadora.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Narrativa Experimental</h4>
                      <p className="text-gray-600 text-sm">Inovador em estruturas narrativas, especialmente em "Rayuela" com sua leitura não-linear.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Linguagem Poética</h4>
                      <p className="text-gray-600 text-sm">Prosa de alta qualidade poética, com atenção especial ao ritmo e à musicalidade.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Influência e Legado
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Boom Latino-americano</h4>
                      <p className="text-gray-600 text-sm">Figura central do boom da literatura latino-americana dos anos 1960-70.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Influência Global</h4>
                      <p className="text-gray-600 text-sm">Suas técnicas narrativas influenciaram escritores em todo o mundo.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Traduções</h4>
                      <p className="text-gray-600 text-sm">Obras traduzidas para mais de 30 idiomas, com reconhecimento mundial.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="citacoes" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {citacoes.map((citacao, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <Quote className="h-8 w-8 text-blue-500 mb-4" />
                        <blockquote className="text-lg italic text-gray-700 leading-relaxed">"{citacao}"</blockquote>
                        <footer className="mt-4 text-sm text-gray-500">— Julio Cortázar</footer>
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
