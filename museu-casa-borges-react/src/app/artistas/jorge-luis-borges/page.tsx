import { Metadata } from 'next'
import ContentPage from '@/components/content/ContentPage'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import { Calendar, BookOpen, Award, Quote, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Jorge Luis Borges | Museu Casa Borges',
  description: 'Conheça a vida e obra de Jorge Luis Borges, o grande escritor argentino. Biografia, obras principais, cronologia e legado literário.',
  keywords: ['Jorge Luis Borges', 'escritor argentino', 'literatura', 'biografia', 'obras', 'labirintos', 'ficções'],
}

// AIDEV-NOTE: Página dedicada a Jorge Luis Borges com biografia completa, obras e cronologia
// Utiliza tabs para organizar o conteúdo e animações para engajamento
export default function JorgeLuisBorges() {
  const obrasDestaque = [
    {
      titulo: "Ficções",
      ano: 1944,
      tipo: "Contos",
      descricao: "Coletânea que inclui alguns dos contos mais famosos de Borges, como 'O Jardim de Veredas que se Bifurcam' e 'A Biblioteca de Babel'.",
      importancia: "Obra fundamental que estabeleceu Borges como mestre do conto fantástico."
    },
    {
      titulo: "O Aleph",
      ano: 1949,
      tipo: "Contos",
      descricao: "Coletânea que inclui o famoso conto homônimo, explorando temas como o infinito e a percepção da realidade.",
      importancia: "Considerada uma das obras-primas da literatura universal."
    },
    {
      titulo: "Labirintos",
      ano: 1962,
      tipo: "Antologia",
      descricao: "Seleção de contos, ensaios e poemas que apresenta o melhor da obra borgiana.",
      importancia: "Primeira grande antologia internacional de Borges."
    },
    {
      titulo: "O Livro de Areia",
      ano: 1975,
      tipo: "Contos",
      descricao: "Última grande coletânea de contos de Borges, incluindo reflexões sobre a literatura e a realidade.",
      importancia: "Síntese madura de sua visão literária e filosófica."
    }
  ]

  const cronologia = [
    { ano: 1899, evento: "Nasce em Buenos Aires, Argentina, em 24 de agosto" },
    { ano: 1914, evento: "Viaja com a família para a Europa, onde permanece durante a Primeira Guerra Mundial" },
    { ano: 1921, evento: "Retorna a Buenos Aires e publica seu primeiro livro de poemas, 'Fervor de Buenos Aires'" },
    { ano: 1930, evento: "Publica 'Evaristo Carriego', sua primeira obra em prosa" },
    { ano: 1935, evento: "Publica 'História Universal da Infâmia', seus primeiros contos" },
    { ano: 1944, evento: "Publica 'Ficções', que o consagra internacionalmente" },
    { ano: 1949, evento: "Publica 'O Aleph', consolidando sua reputação mundial" },
    { ano: 1955, evento: "É nomeado diretor da Biblioteca Nacional Argentina" },
    { ano: 1961, evento: "Recebe o Prêmio Formentor, dividido com Samuel Beckett" },
    { ano: 1986, evento: "Morre em Genebra, Suíça, em 14 de junho" }
  ]

  const premios = [
    { nome: "Prêmio Nacional de Literatura", ano: 1957, pais: "Argentina" },
    { nome: "Prêmio Formentor", ano: 1961, pais: "Internacional" },
    { nome: "Prêmio Cervantes", ano: 1979, pais: "Espanha" },
    { nome: "Prêmio Balzan", ano: 1980, pais: "Itália" },
    { nome: "Ordem do Mérito Italiano", ano: 1984, pais: "Itália" }
  ]

  const citacoes = [
    {
      texto: "Sempre imaginei que o Paraíso seria uma espécie de biblioteca.",
      contexto: "Sobre sua paixão pelos livros"
    },
    {
      texto: "A realidade não é sempre provável, nem verossímil.",
      contexto: "Sobre a natureza da ficção"
    },
    {
      texto: "Escrevo para mim e para meus amigos, e para atenuar o curso do tempo.",
      contexto: "Sobre sua motivação para escrever"
    }
  ]

  return (      <ContentPage
        title="Jorge Luis Borges"
        subtitle="O mestre dos labirintos literários e criador de universos infinitos"
        backgroundImage="/images/fundo1.jpg"
      >
        <div className="space-y-12">
          {/* Introdução com Foto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          >
            <div className="lg:col-span-2 space-y-6">
              <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Jorge Francisco Isidoro Luis Borges Acevedo (1899-1986) foi um escritor, poeta, 
                  tradutor e crítico literário argentino, considerado um dos autores mais importantes 
                  da literatura universal do século XX.
                </p>
                <p>
                  Conhecido por seus contos fantásticos e ensaios, Borges criou um universo literário 
                  único, povoado por labirintos, bibliotecas infinitas, espelhos e jogos com o tempo 
                  e a realidade. Sua obra influenciou gerações de escritores ao redor do mundo.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">1899-1986</Badge>
                <Badge variant="secondary">Escritor</Badge>
                <Badge variant="secondary">Poeta</Badge>
                <Badge variant="secondary">Ensaísta</Badge>
                <Badge variant="secondary">Bibliotecário</Badge>
              </div>
            </div>
            
            <div className="relative">
              <Card className="overflow-hidden">
                <div className="relative h-80 bg-muted">
                  <Image
                    src="/images/fundo2.jpg"
                    alt="Jorge Luis Borges"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Jorge Luis Borges (1899-1986)
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Tabs com Conteúdo Detalhado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="biografia" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="biografia">Biografia</TabsTrigger>
                <TabsTrigger value="obras">Obras</TabsTrigger>
                <TabsTrigger value="cronologia">Cronologia</TabsTrigger>
                <TabsTrigger value="premios">Prêmios</TabsTrigger>
                <TabsTrigger value="citacoes">Citações</TabsTrigger>
              </TabsList>

              <TabsContent value="biografia" className="mt-8">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Vida e Formação
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Jorge Luis Borges nasceu em Buenos Aires em 1899, em uma família culta e cosmopolita. 
                        Seu pai, Jorge Guillermo Borges, era advogado e escritor, e sua mãe, Leonor Acevedo Suárez, 
                        vinha de uma família tradicional uruguaia.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Em 1914, a família viajou para a Europa, onde Borges completou seus estudos secundários 
                        em Genebra. Durante este período, aprendeu francês, alemão e latim, além de descobrir 
                        autores que marcariam profundamente sua obra, como Walt Whitman e Edgar Allan Poe.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Retornando a Buenos Aires em 1921, Borges iniciou sua carreira literária publicando 
                        poemas em revistas locais. Trabalhou como bibliotecário por quase duas décadas, 
                        experiência que influenciou profundamente sua visão da literatura e do conhecimento.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Estilo e Influências</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        A obra de Borges caracteriza-se pela erudição, pela precisão da linguagem e pela 
                        exploração de temas como o infinito, os labirintos, os espelhos, a literatura dentro 
                        da literatura e os jogos com o tempo e a identidade. Suas influências incluem a 
                        literatura inglesa, a filosofia, a matemática e a teologia.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="obras" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {obrasDestaque.map((obra, index) => (
                    <motion.div
                      key={obra.titulo}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            {obra.titulo}
                            <Badge variant="outline">{obra.ano}</Badge>
                          </CardTitle>
                          <CardDescription>{obra.tipo}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            {obra.descricao}
                          </p>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-primary">
                              {obra.importancia}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Saiba Mais
                          </Button>
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
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex items-center gap-2 min-w-0">
                              <Calendar className="h-4 w-4 text-primary" />
                              <Badge variant="outline" className="font-mono">
                                {item.ano}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground flex-1">
                              {item.evento}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="premios" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {premios.map((premio, index) => (
                    <motion.div
                      key={premio.nome}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                          <h3 className="font-semibold">{premio.nome}</h3>
                          <p className="text-sm text-muted-foreground">{premio.pais}</p>
                          <Badge variant="outline" className="mt-2">
                            {premio.ano}
                          </Badge>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="citacoes" className="mt-8">
                <div className="space-y-6">
                  {citacoes.map((citacao, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Quote className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                            <div className="space-y-2">
                              <blockquote className="text-lg italic text-foreground">
                                "{citacao.texto}"
                              </blockquote>
                              <p className="text-sm text-muted-foreground">
                                {citacao.contexto}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-primary/5 rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Explore Mais sobre Borges</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Descubra mais sobre a vida e obra de Jorge Luis Borges através de nossas exposições, 
              tours virtuais e atividades educativas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>Ver Exposições</Button>
              <Button variant="outline">Tour Virtual</Button>
              <Button variant="outline">Biblioteca Digital</Button>
            </div>
          </motion.div>
        </div>
      </ContentPage>  )
}
