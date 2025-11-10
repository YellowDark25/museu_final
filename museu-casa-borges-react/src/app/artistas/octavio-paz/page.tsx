import { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import { ContentPage } from '@/components/ui/ContentPage'
import { ImageFigure } from '@/components/ui/ImageFigure'
import { AuthorCredit } from '@/components/ui/AuthorCredit'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, BookOpen, Award, Quote, Trophy } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Octavio Paz - Museu Casa Borges',
  description: 'Conheça a vida e obra de Octavio Paz, poeta mexicano e Prêmio Nobel de Literatura de 1990.',
  keywords: 'Octavio Paz, poesia mexicana, Nobel Literatura, ensaio, Labirinto da Solidão, surrealismo'
}

// AIDEV-NOTE: Página dedicada ao poeta e ensaísta Octavio Paz
// Apresenta biografia, principais obras, prêmios e contribuições literárias
// Destaca sua importância na literatura hispano-americana e mundial

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
    &lt;Layout&gt;
      &lt;ContentPage
        title="Octavio Paz"
        subtitle="Poeta da Solidão e do Tempo"
        backgroundImage="/images/fundo3.jpg"
      &gt;
        &lt;div className="space-y-12"&gt;
          {/* Biografia Principal */}
          &lt;motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          &gt;
            &lt;div className="grid md:grid-cols-3 gap-8 items-start"&gt;
              &lt;div className="md:col-span-2"&gt;
                &lt;p className="text-xl leading-relaxed text-gray-700 mb-6"&gt;
                  Octavio Paz (1914-1998) foi um dos maiores poetas e ensaístas do século XX, 
                  reconhecido mundialmente com o Prêmio Nobel de Literatura em 1990. Nascido 
                  na Cidade do México, Paz dedicou sua vida à exploração da condição humana 
                  através da poesia e do ensaio.
                &lt;/p&gt;
                &lt;p className="text-lg leading-relaxed text-gray-600 mb-6"&gt;
                  Sua obra mais conhecida, "O Labirinto da Solidão" (1950), é uma análise 
                  profunda da identidade mexicana e, por extensão, da condição humana universal. 
                  Como poeta, destacou-se pela fusão entre tradição e vanguarda, explorando 
                  temas como o tempo, a solidão e a busca do sagrado.
                &lt;/p&gt;
                &lt;p className="text-lg leading-relaxed text-gray-600"&gt;
                  Diplomata de carreira, Paz viveu em diversos países, experiência que 
                  enriqueceu sua visão cosmopolita e sua compreensão das diferentes culturas. 
                  Sua obra poética e ensaística estabeleceu pontes entre o Oriente e o Ocidente, 
                  entre a tradição e a modernidade.
                &lt;/p&gt;
              &lt;/div&gt;
              &lt;div className="space-y-4"&gt;
                &lt;Card&gt;
                  &lt;CardHeader&gt;
                    &lt;CardTitle className="flex items-center gap-2"&gt;
                      &lt;Calendar className="h-5 w-5" /&gt;
                      Dados Biográficos
                    &lt;/CardTitle&gt;
                  &lt;/CardHeader&gt;
                  &lt;CardContent className="space-y-2"&gt;
                    &lt;div&gt;
                      &lt;strong&gt;Nascimento:&lt;/strong&gt; 31 de março de 1914
                    &lt;/div&gt;
                    &lt;div&gt;
                      &lt;strong&gt;Local:&lt;/strong&gt; Cidade do México, México
                    &lt;/div&gt;
                    &lt;div&gt;
                      &lt;strong&gt;Falecimento:&lt;/strong&gt; 19 de abril de 1998
                    &lt;/div&gt;
                    &lt;div&gt;
                      &lt;strong&gt;Nacionalidade:&lt;/strong&gt; Mexicana
                    &lt;/div&gt;
                    &lt;div&gt;
                      &lt;strong&gt;Gêneros:&lt;/strong&gt; Poesia, Ensaio, Crítica
                    &lt;/div&gt;
                  &lt;/CardContent&gt;
                &lt;/Card&gt;

                &lt;Card&gt;
                  &lt;CardHeader&gt;
                    &lt;CardTitle className="flex items-center gap-2"&gt;
                      &lt;Trophy className="h-5 w-5 text-yellow-600" /&gt;
                      Nobel de Literatura
                    &lt;/CardTitle&gt;
                  &lt;/CardHeader&gt;
                  &lt;CardContent&gt;
                    &lt;Badge variant="default" className="bg-yellow-100 text-yellow-800"&gt;
                      1990
                    &lt;/Badge&gt;
                    &lt;p className="text-sm text-gray-600 mt-2"&gt;
                      Primeiro escritor mexicano a receber o prêmio
                    &lt;/p&gt;
                  &lt;/CardContent&gt;
                &lt;/Card&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/motion.section&gt;

          {/* Tabs com conteúdo detalhado */}
          &lt;motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          &gt;
            &lt;Tabs defaultValue="obras" className="w-full"&gt;
              &lt;TabsList className="grid w-full grid-cols-5"&gt;
                &lt;TabsTrigger value="obras"&gt;Principais Obras&lt;/TabsTrigger&gt;
                &lt;TabsTrigger value="premios"&gt;Prêmios&lt;/TabsTrigger&gt;
                &lt;TabsTrigger value="cronologia"&gt;Cronologia&lt;/TabsTrigger&gt;
                &lt;TabsTrigger value="temas"&gt;Temas Centrais&lt;/TabsTrigger&gt;
                &lt;TabsTrigger value="citacoes"&gt;Citações&lt;/TabsTrigger&gt;
              &lt;/TabsList&gt;

              &lt;TabsContent value="obras" className="mt-8"&gt;
                &lt;div className="grid md:grid-cols-2 gap-6"&gt;
                  {obras.map((obra, index) =&gt; (
                    &lt;motion.div
                      key={obra.titulo}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    &gt;
                      &lt;Card className="h-full hover:shadow-lg transition-shadow"&gt;
                        &lt;CardHeader&gt;
                          &lt;div className="flex justify-between items-start"&gt;
                            &lt;CardTitle className="text-lg"&gt;{obra.titulo}&lt;/CardTitle&gt;
                            &lt;Badge variant="secondary"&gt;{obra.ano}&lt;/Badge&gt;
                          &lt;/div&gt;
                          &lt;CardDescription&gt;
                            &lt;Badge variant="outline"&gt;{obra.tipo}&lt;/Badge&gt;
                          &lt;/CardDescription&gt;
                        &lt;/CardHeader&gt;
                        &lt;CardContent&gt;
                          &lt;p className="text-gray-600"&gt;{obra.descricao}&lt;/p&gt;
                        &lt;/CardContent&gt;
                      &lt;/Card&gt;
                    &lt;/motion.div&gt;
                  ))}
                &lt;/div&gt;
              &lt;/TabsContent&gt;

              &lt;TabsContent value="premios" className="mt-8"&gt;
                &lt;div className="space-y-6"&gt;
                  {premios.map((premio, index) =&gt; (
                    &lt;motion.div
                      key={premio.ano}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    &gt;
                      &lt;Card className="hover:shadow-lg transition-shadow"&gt;
                        &lt;CardHeader&gt;
                          &lt;div className="flex justify-between items-start"&gt;
                            &lt;CardTitle className="text-lg flex items-center gap-2"&gt;
                              &lt;Award className="h-5 w-5 text-yellow-600" /&gt;
                              {premio.premio}
                            &lt;/CardTitle&gt;
                            &lt;Badge variant="default" className="bg-yellow-100 text-yellow-800"&gt;
                              {premio.ano}
                            &lt;/Badge&gt;
                          &lt;/div&gt;
                        &lt;/CardHeader&gt;
                        &lt;CardContent&gt;
                          &lt;p className="text-gray-600"&gt;{premio.descricao}&lt;/p&gt;
                        &lt;/CardContent&gt;
                      &lt;/Card&gt;
                    &lt;/motion.div&gt;
                  ))}
                &lt;/div&gt;
              &lt;/TabsContent&gt;

              &lt;TabsContent value="cronologia" className="mt-8"&gt;
                &lt;div className="space-y-4"&gt;
                  {cronologia.map((item, index) =&gt; (
                    &lt;motion.div
                      key={item.ano}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border"
                    &gt;
                      &lt;div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"&gt;
                        &lt;span className="text-green-600 font-bold text-sm"&gt;{item.ano}&lt;/span&gt;
                      &lt;/div&gt;
                      &lt;div&gt;
                        &lt;p className="text-gray-800 font-medium"&gt;{item.evento}&lt;/p&gt;
                      &lt;/div&gt;
                    &lt;/motion.div&gt;
                  ))}
                &lt;/div&gt;
              &lt;/TabsContent&gt;

              &lt;TabsContent value="temas" className="mt-8"&gt;
                &lt;div className="grid md:grid-cols-2 gap-8"&gt;
                  &lt;Card&gt;
                    &lt;CardHeader&gt;
                      &lt;CardTitle className="flex items-center gap-2"&gt;
                        &lt;BookOpen className="h-5 w-5" /&gt;
                        Temas Poéticos
                      &lt;/CardTitle&gt;
                    &lt;/CardHeader&gt;
                    &lt;CardContent className="space-y-4"&gt;
                      &lt;div&gt;
                        &lt;h4 className="font-semibold text-gray-800 mb-2"&gt;Solidão e Comunhão&lt;/h4&gt;
                        &lt;p className="text-gray-600 text-sm"&gt;
                          Exploração da condição humana entre o isolamento e a busca de conexão.
                        &lt;/p&gt;
                      &lt;/div&gt;
                      &lt;div&gt;
                        &lt;h4 className="font-semibold text-gray-800 mb-2"&gt;Tempo e Eternidade&lt;/h4&gt;
                        &lt;p className="text-gray-600 text-sm"&gt;
                          Reflexões sobre a temporalidade e a busca do momento eterno.
                        &lt;/p&gt;
                      &lt;/div&gt;
                      &lt;div&gt;
                        &lt;h4 className="font-semibold text-gray-800 mb-2"&gt;Oriente e Ocidente&lt;/h4&gt;
                        &lt;p className="text-gray-600 text-sm"&gt;
                          Síntese entre filosofias orientais e tradição ocidental.
                        &lt;/p&gt;
                      &lt;/div&gt;
                    &lt;/CardContent&gt;
                  &lt;/Card&gt;

                  &lt;Card&gt;
                    &lt;CardHeader&gt;
                      &lt;CardTitle className="flex items-center gap-2"&gt;
                        &lt;Award className="h-5 w-5" /&gt;
                        Contribuições Literárias
                      &lt;/CardTitle&gt;
                    &lt;/CardHeader&gt;
                    &lt;CardContent className="space-y-4"&gt;
                      &lt;div&gt;
                        &lt;h4 className="font-semibold text-gray-800 mb-2"&gt;Renovação Poética&lt;/h4&gt;
                        &lt;p className="text-gray-600 text-sm"&gt;
                          Modernização da poesia hispano-americana sem perder as raízes.
                        &lt;/p&gt;
                      &lt;/div&gt;
                      &lt;div&gt;
                        &lt;h4 className="font-semibold text-gray-800 mb-2"&gt;Ensaio Moderno&lt;/h4&gt;
                        &lt;p className="text-gray-600 text-sm"&gt;
                          Criação de um novo modelo de ensaio literário e cultural.
                        &lt;/p&gt;
                      &lt;/div&gt;
                      &lt;div&gt;
                        &lt;h4 className="font-semibold text-gray-800 mb-2"&gt;Crítica Cultural&lt;/h4&gt;
                        &lt;p className="text-gray-600 text-sm"&gt;
                          Análise profunda da identidade latino-americana.
                        &lt;/p&gt;
                      &lt;/div&gt;
                    &lt;/CardContent&gt;
                  &lt;/Card&gt;
                &lt;/div&gt;
              &lt;/TabsContent&gt;

              &lt;TabsContent value="citacoes" className="mt-8"&gt;
                &lt;div className="grid md:grid-cols-2 gap-6"&gt;
                  {citacoes.map((citacao, index) =&gt; (
                    &lt;motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    &gt;
                      &lt;Card className="h-full"&gt;
                        &lt;CardContent className="p-6"&gt;
                          &lt;Quote className="h-8 w-8 text-green-500 mb-4" /&gt;
                          &lt;blockquote className="text-lg italic text-gray-700 leading-relaxed"&gt;
                            "{citacao}"
                          &lt;/blockquote&gt;
                          &lt;footer className="mt-4 text-sm text-gray-500"&gt;
                            — Octavio Paz
                          &lt;/footer&gt;
                        &lt;/CardContent&gt;
                      &lt;/Card&gt;
                    &lt;/motion.div&gt;
                  ))}
                &lt;/div&gt;
              &lt;/TabsContent&gt;
            &lt;/Tabs&gt;
          &lt;/motion.section&gt;

          {/* Créditos */}
          &lt;AuthorCredit 
            author="Curadoria Museu Casa Borges"
            date="2024"
            description="Conteúdo baseado em pesquisa acadêmica e fontes históricas"
          /&gt;
        &lt;/div&gt;
      &lt;/ContentPage&gt;
    &lt;/Layout&gt;
  )
}
