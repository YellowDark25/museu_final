import { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import { ContentPage } from '@/components/ui/ContentPage'
import { ImageFigure } from '@/components/ui/ImageFigure'
import { AuthorCredit } from '@/components/ui/AuthorCredit'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, BookOpen, Award, Quote } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Julio Cortázar - Museu Casa Borges',
  description: 'Conheça a vida e obra de Julio Cortázar, um dos maiores escritores da literatura argentina e latino-americana.',
  keywords: 'Julio Cortázar, literatura argentina, contos, Rayuela, O Jogo da Amarelinha, realismo fantástico'
}

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
    &lt;Layout&gt;
      &lt;ContentPage
        title="Julio Cortázar"
        subtitle="Mestre do Realismo Fantástico"
        backgroundImage="/images/fundo2.jpg"
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
                  Julio Cortázar (1914-1984) foi um dos escritores mais inovadores e influentes 
                  da literatura argentina e latino-americana. Nascido em Bruxelas e criado na Argentina, 
                  Cortázar revolucionou a narrativa moderna com sua abordagem experimental e seu 
                  domínio do realismo fantástico.
                &lt;/p&gt;
                &lt;p className="text-lg leading-relaxed text-gray-600 mb-6"&gt;
                  Sua obra-prima, "Rayuela" (O Jogo da Amarelinha), publicada em 1963, é considerada 
                  um marco da literatura experimental, propondo múltiplas formas de leitura e 
                  questionando as convenções narrativas tradicionais.
                &lt;/p&gt;
                &lt;p className="text-lg leading-relaxed text-gray-600"&gt;
                  Cortázar viveu grande parte de sua vida adulta em Paris, onde desenvolveu uma 
                  perspectiva única sobre a identidade latino-americana e a condição humana moderna. 
                  Seus contos, marcados pelo fantástico que irrompe no cotidiano, influenciaram 
                  gerações de escritores.
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
                      &lt;strong&gt;Nascimento:&lt;/strong&gt; 26 de agosto de 1914
                    &lt;/div&gt;
                    &lt;div&gt;
                      &lt;strong&gt;Local:&lt;/strong&gt; Bruxelas, Bélgica
                    &lt;/div&gt;
                    &lt;div&gt;
                      &lt;strong&gt;Falecimento:&lt;/strong&gt; 12 de fevereiro de 1984
                    &lt;/div&gt;
                    &lt;div&gt;
                      &lt;strong&gt;Nacionalidade:&lt;/strong&gt; Argentina/Francesa
                    &lt;/div&gt;
                    &lt;div&gt;
                      &lt;strong&gt;Gêneros:&lt;/strong&gt; Conto, Romance, Ensaio
                    &lt;/div&gt;
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
              &lt;TabsList className="grid w-full grid-cols-4"&gt;
                &lt;TabsTrigger value="obras"&gt;Principais Obras&lt;/TabsTrigger&gt;
                &lt;TabsTrigger value="cronologia"&gt;Cronologia&lt;/TabsTrigger&gt;
                &lt;TabsTrigger value="estilo"&gt;Estilo Literário&lt;/TabsTrigger&gt;
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
                      &lt;div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"&gt;
                        &lt;span className="text-blue-600 font-bold text-sm"&gt;{item.ano}&lt;/span&gt;
                      &lt;/div&gt;
                      &lt;div&gt;
                        &lt;p className="text-gray-800 font-medium"&gt;{item.evento}&lt;/p&gt;
                      &lt;/div&gt;
                    &lt;/motion.div&gt;
                  ))}
                &lt;/div&gt;
              &lt;/TabsContent&gt;

              &lt;TabsContent value="estilo" className="mt-8"&gt;
                &lt;div className="grid md:grid-cols-2 gap-8"&gt;
                  &lt;Card&gt;
                    &lt;CardHeader&gt;
                      &lt;CardTitle className="flex items-center gap-2"&gt;
                        &lt;BookOpen className="h-5 w-5" /&gt;
                        Características Literárias
                      &lt;/CardTitle&gt;
                    &lt;/CardHeader&gt;
                    &lt;CardContent className="space-y-4"&gt;
                      &lt;div&gt;
                        &lt;h4 className="font-semibold text-gray-800 mb-2"&gt;Realismo Fantástico&lt;/h4&gt;
                        &lt;p className="text-gray-600 text-sm"&gt;
                          Mestre em inserir elementos fantásticos no cotidiano de forma natural e perturbadora.
                        &lt;/p&gt;
                      &lt;/div&gt;
                      &lt;div&gt;
                        &lt;h4 className="font-semibold text-gray-800 mb-2"&gt;Narrativa Experimental&lt;/h4&gt;
                        &lt;p className="text-gray-600 text-sm"&gt;
                          Inovador em estruturas narrativas, especialmente em "Rayuela" com sua leitura não-linear.
                        &lt;/p&gt;
                      &lt;/div&gt;
                      &lt;div&gt;
                        &lt;h4 className="font-semibold text-gray-800 mb-2"&gt;Linguagem Poética&lt;/h4&gt;
                        &lt;p className="text-gray-600 text-sm"&gt;
                          Prosa de alta qualidade poética, com atenção especial ao ritmo e à musicalidade.
                        &lt;/p&gt;
                      &lt;/div&gt;
                    &lt;/CardContent&gt;
                  &lt;/Card&gt;

                  &lt;Card&gt;
                    &lt;CardHeader&gt;
                      &lt;CardTitle className="flex items-center gap-2"&gt;
                        &lt;Award className="h-5 w-5" /&gt;
                        Influência e Legado
                      &lt;/CardTitle&gt;
                    &lt;/CardHeader&gt;
                    &lt;CardContent className="space-y-4"&gt;
                      &lt;div&gt;
                        &lt;h4 className="font-semibold text-gray-800 mb-2"&gt;Boom Latino-americano&lt;/h4&gt;
                        &lt;p className="text-gray-600 text-sm"&gt;
                          Figura central do boom da literatura latino-americana dos anos 1960-70.
                        &lt;/p&gt;
                      &lt;/div&gt;
                      &lt;div&gt;
                        &lt;h4 className="font-semibold text-gray-800 mb-2"&gt;Influência Global&lt;/h4&gt;
                        &lt;p className="text-gray-600 text-sm"&gt;
                          Suas técnicas narrativas influenciaram escritores em todo o mundo.
                        &lt;/p&gt;
                      &lt;/div&gt;
                      &lt;div&gt;
                        &lt;h4 className="font-semibold text-gray-800 mb-2"&gt;Traduções&lt;/h4&gt;
                        &lt;p className="text-gray-600 text-sm"&gt;
                          Obras traduzidas para mais de 30 idiomas, com reconhecimento mundial.
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
                          &lt;Quote className="h-8 w-8 text-blue-500 mb-4" /&gt;
                          &lt;blockquote className="text-lg italic text-gray-700 leading-relaxed"&gt;
                            "{citacao}"
                          &lt;/blockquote&gt;
                          &lt;footer className="mt-4 text-sm text-gray-500"&gt;
                            — Julio Cortázar
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
