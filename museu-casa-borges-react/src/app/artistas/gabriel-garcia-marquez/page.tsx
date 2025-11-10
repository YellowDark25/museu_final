import { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import { ContentPage } from '@/components/ui/ContentPage'
import { ImageFigure } from '@/components/ui/ImageFigure'
import { AuthorCredit } from '@/components/ui/AuthorCredit'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, BookOpen, Award, Quote, Trophy, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gabriel García Márquez - Museu Casa Borges',
  description: 'Conheça a vida e obra de Gabriel García Márquez, mestre do realismo mágico e Prêmio Nobel de Literatura de 1982.',
  keywords: 'Gabriel García Márquez, realismo mágico, Cem Anos de Solidão, literatura colombiana, Nobel Literatura'
}

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
    &lt;Layout&gt;
      &lt;ContentPage
        title="Gabriel García Márquez"
        subtitle="Mestre do Realismo Mágico"
        backgroundImage="/images/fundo4.jpg"
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
                  Gabriel García Márquez (1927-2014), conhecido carinhosamente como "Gabo", 
                  foi um dos escritores mais influentes do século XX e o principal expoente 
                  do realismo mágico. Nascido em Aracataca, na costa caribenha da Colômbia, 
                  transformou sua terra natal na mítica Macondo.
                &lt;/p&gt;
                &lt;p className="text-lg leading-relaxed text-gray-600 mb-6"&gt;
                  Sua obra-prima, "Cem Anos de Solidão" (1967), é considerada uma das maiores 
                  realizações da literatura mundial, narrando a saga épica da família Buendía 
                  através de múltiplas gerações. O romance estabeleceu García Márquez como 
                  figura central do boom latino-americano.
                &lt;/p&gt;
                &lt;p className="text-lg leading-relaxed text-gray-600"&gt;
                  Jornalista de formação, García Márquez soube combinar sua experiência 
                  profissional com uma imaginação extraordinária, criando um estilo único 
                  que influenciou escritores em todo o mundo. Seu Nobel de Literatura em 
                  1982 coroou uma carreira dedicada a dar voz à América Latina.
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
                      &lt;strong&gt;Nascimento:&lt;/strong&gt; 6 de março de 1927
                    &lt;/div&gt;
                    &lt;div&gt;
                      &lt;strong&gt;Local:&lt;/strong&gt; Aracataca, Colômbia
                    &lt;/div&gt;
                    &lt;div&gt;
                      &lt;strong&gt;Falecimento:&lt;/strong&gt; 17 de abril de 2014
                    &lt;/div&gt;
                    &lt;div&gt;
                      &lt;strong&gt;Nacionalidade:&lt;/strong&gt; Colombiana
                    &lt;/div&gt;
                    &lt;div&gt;
                      &lt;strong&gt;Gêneros:&lt;/strong&gt; Romance, Conto, Jornalismo
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
                      1982
                    &lt;/Badge&gt;
                    &lt;p className="text-sm text-gray-600 mt-2"&gt;
                      Primeiro colombiano a receber o prêmio
                    &lt;/p&gt;
                  &lt;/CardContent&gt;
                &lt;/Card&gt;

                &lt;Card&gt;
                  &lt;CardHeader&gt;
                    &lt;CardTitle className="flex items-center gap-2"&gt;
                      &lt;Globe className="h-5 w-5 text-blue-600" /&gt;
                      Alcance Global
                    &lt;/CardTitle&gt;
                  &lt;/CardHeader&gt;
                  &lt;CardContent&gt;
                    &lt;p className="text-sm text-gray-600"&gt;
                      Obras traduzidas para mais de 40 idiomas
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
                &lt;TabsTrigger value="tecnicas"&gt;Técnicas Narrativas&lt;/TabsTrigger&gt;
                &lt;TabsTrigger value="premios"&gt;Prêmios&lt;/TabsTrigger&gt;
                &lt;TabsTrigger value="cronologia"&gt;Cronologia&lt;/TabsTrigger&gt;
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

              &lt;TabsContent value="tecnicas" className="mt-8"&gt;
                &lt;div className="grid md:grid-cols-2 gap-6"&gt;
                  {tecnicas.map((tecnica, index) =&gt; (
                    &lt;motion.div
                      key={tecnica.nome}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    &gt;
                      &lt;Card className="h-full hover:shadow-lg transition-shadow"&gt;
                        &lt;CardHeader&gt;
                          &lt;CardTitle className="text-lg flex items-center gap-2"&gt;
                            &lt;BookOpen className="h-5 w-5 text-purple-600" /&gt;
                            {tecnica.nome}
                          &lt;/CardTitle&gt;
                        &lt;/CardHeader&gt;
                        &lt;CardContent&gt;
                          &lt;p className="text-gray-600"&gt;{tecnica.descricao}&lt;/p&gt;
                        &lt;/CardContent&gt;
                      &lt;/Card&gt;
                    &lt;/motion.div&gt;
                  ))}
                &lt;/div&gt;

                &lt;div className="mt-8"&gt;
                  &lt;Card&gt;
                    &lt;CardHeader&gt;
                      &lt;CardTitle&gt;O Realismo Mágico de García Márquez&lt;/CardTitle&gt;
                    &lt;/CardHeader&gt;
                    &lt;CardContent className="prose max-w-none"&gt;
                      &lt;p className="text-gray-700 leading-relaxed"&gt;
                        García Márquez revolucionou a literatura ao criar um estilo onde o extraordinário 
                        convive naturalmente com o cotidiano. Em suas narrativas, personagens podem voar, 
                        chover flores ou viver mais de cem anos, e tudo isso é apresentado com a mesma 
                        naturalidade de eventos corriqueiros. Esta técnica não apenas encantou leitores 
                        mundialmente, mas também ofereceu uma nova forma de compreender e narrar a 
                        realidade latino-americana.
                      &lt;/p&gt;
                    &lt;/CardContent&gt;
                  &lt;/Card&gt;
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
                      &lt;div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center"&gt;
                        &lt;span className="text-purple-600 font-bold text-sm"&gt;{item.ano}&lt;/span&gt;
                      &lt;/div&gt;
                      &lt;div&gt;
                        &lt;p className="text-gray-800 font-medium"&gt;{item.evento}&lt;/p&gt;
                      &lt;/div&gt;
                    &lt;/motion.div&gt;
                  ))}
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
                          &lt;Quote className="h-8 w-8 text-purple-500 mb-4" /&gt;
                          &lt;blockquote className="text-lg italic text-gray-700 leading-relaxed"&gt;
                            "{citacao}"
                          &lt;/blockquote&gt;
                          &lt;footer className="mt-4 text-sm text-gray-500"&gt;
                            — Gabriel García Márquez
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
