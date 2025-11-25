'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Compass, 
  BookOpen, 
  Heart,
  Feather,
  Users,
  TreePine,
  Mountain,
  Waves,
  Sun,
  Flower,
  Palette,
  Music
} from 'lucide-react'

/**
 * Componente Cliente: Conteúdo da página de Identidade Cultural.
 * - Responsável por animações (Framer Motion) e interações.
 * - Mantém a estrutura visual e semântica original da página.
 * - Deve ser utilizado dentro de uma página Server Component que exporta metadata.
 */
export default function IdentidadeContent() {
  const elementosIdentidade = [
    {
      titulo: "Raízes Pantaneiras",
      icone: <Waves className="w-8 h-8" />,
      descricao: "Nossa identidade está profundamente conectada com o Pantanal, suas águas, fauna e flora únicas.",
      cor: "from-blue-500 to-cyan-500"
    },
    {
      titulo: "Tradições Orais",
      icone: <Feather className="w-8 h-8" />,
      descricao: "Preservamos as histórias, lendas e saberes transmitidos através das gerações.",
      cor: "from-purple-500 to-violet-500"
    },
    {
      titulo: "Diversidade Cultural",
      icone: <Users className="w-8 h-8" />,
      descricao: "Celebramos a rica mistura de culturas indígenas, africanas e europeias da região.",
      cor: "from-green-500 to-emerald-500"
    },
    {
      titulo: "Literatura Regional",
      icone: <BookOpen className="w-8 h-8" />,
      descricao: "Valorizamos os escritores e obras que retratam a alma e essência de nossa terra.",
      cor: "from-amber-500 to-orange-500"
    }
  ]

  const simbolos = [
    {
      nome: "Ipê Amarelo",
      significado: "Resistência e renovação",
      descricao: "Árvore símbolo de Mato Grosso, representa nossa capacidade de florescer mesmo em tempos difíceis.",
      categoria: "Flora"
    },
    {
      nome: "Tuiuiú",
      significado: "Majestade e liberdade",
      descricao: "Ave símbolo do Pantanal, representa a grandeza e a liberdade de nossa região.",
      categoria: "Fauna"
    },
    {
      nome: "Rio Cuiabá",
      significado: "Vida e movimento",
      descricao: "As águas que dão vida à nossa região e conectam diferentes culturas.",
      categoria: "Geografia"
    },
    {
      nome: "Cerrado",
      significado: "Diversidade e adaptação",
      descricao: "Bioma que representa nossa capacidade de adaptação e riqueza natural.",
      categoria: "Bioma"
    }
  ]

  const valores = [
    {
      valor: "Preservação",
      descricao: "Mantemos viva a memória e as tradições para as futuras gerações",
      icone: <Heart className="w-6 h-6" />
    },
    {
      valor: "Inclusão",
      descricao: "Acolhemos todas as vozes e histórias que compõem nossa identidade",
      icone: <Users className="w-6 h-6" />
    },
    {
      valor: "Autenticidade",
      descricao: "Valorizamos o que é genuinamente nosso, sem perder a universalidade",
      icone: <BookOpen className="w-6 h-6" />
    },
    {
      valor: "Inovação",
      descricao: "Buscamos formas criativas de apresentar nossa cultura ao mundo",
      icone: <Compass className="w-6 h-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">
      {/* Hero section com elementos visuais da identidade */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="/images/fundo2.jpg"
          alt="Identidade Cultural"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Nossa Identidade</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              As raízes que nos definem e os valores que nos guiam
            </p>
            <Badge className="mt-4 bg-amber-600 text-white hover:bg-amber-700">
              <Compass className="w-4 h-4 mr-2" />
              Cultura Regional
            </Badge>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Seção introdutória sobre identidade */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              O Que Nos Define
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nossa identidade é tecida pelos fios da história, tradição e inovação. 
              Somos guardiões de uma cultura rica e diversa, que se manifesta em cada 
              exposição, cada livro preservado e cada história contada.
            </p>
          </div>

          {/* Elementos da identidade */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {elementosIdentidade.map((elemento, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${elemento.cor}`} />
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${elemento.cor} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                      {elemento.icone}
                    </div>
                    <CardTitle className="text-xl text-gray-800">
                      {elemento.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {elemento.descricao}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tabs com símbolos, valores e manifestações */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Tabs defaultValue="simbolos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="simbolos" className="text-lg">
                <TreePine className="w-5 h-5 mr-2" />
                Símbolos
              </TabsTrigger>
              <TabsTrigger value="valores" className="text-lg">
                <Heart className="w-5 h-5 mr-2" />
                Valores
              </TabsTrigger>
              <TabsTrigger value="manifestacoes" className="text-lg">
                <Palette className="w-5 h-5 mr-2" />
                Manifestações
              </TabsTrigger>
            </TabsList>

            {/* Símbolos */}
            <TabsContent value="simbolos">
              <div className="grid md:grid-cols-2 gap-6">
                {simbolos.map((simbolo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-2xl text-gray-800">
                            {simbolo.nome}
                          </CardTitle>
                          <Badge variant="outline" className="text-sm">
                            {simbolo.categoria}
                          </Badge>
                        </div>
                        <CardDescription className="text-lg font-medium text-amber-600">
                          {simbolo.significado}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed">
                          {simbolo.descricao}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Valores */}
            <TabsContent value="valores">
              <div className="grid md:grid-cols-2 gap-6">
                {valores.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                            {item.icone}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-3 text-gray-800">
                              {item.valor}
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

            {/* Manifestações */}
            <TabsContent value="manifestacoes">
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Music className="w-8 h-8 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl text-blue-800">
                        Música e Dança
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-center leading-relaxed">
                        Siriri, cururu e outras manifestações musicais que ecoam 
                        nossa alma cultural em eventos e celebrações.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Palette className="w-8 h-8 text-green-600" />
                      </div>
                      <CardTitle className="text-xl text-green-800">
                        Artes Visuais
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-center leading-relaxed">
                        Pinturas, esculturas e artesanatos que retratam nossa 
                        paisagem, fauna e tradições regionais.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-violet-50">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-purple-600" />
                      </div>
                      <CardTitle className="text-xl text-purple-800">
                        Literatura
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-center leading-relaxed">
                        Obras que capturam a essência de nossa terra, desde 
                        crônicas históricas até poesia contemporânea.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-orange-50">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sun className="w-8 h-8 text-amber-600" />
                      </div>
                      <CardTitle className="text-xl text-amber-800">
                        Festivais
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-center leading-relaxed">
                        Celebrações que reúnem a comunidade em torno de nossas 
                        tradições, fortalecendo laços culturais.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-red-50 to-pink-50">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Flower className="w-8 h-8 text-red-600" />
                      </div>
                      <CardTitle className="text-xl text-red-800">
                        Gastronomia
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-center leading-relaxed">
                        Sabores únicos que contam nossa história através de 
                        pratos tradicionais e ingredientes regionais.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-teal-50 to-cyan-50">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mountain className="w-8 h-8 text-teal-600" />
                      </div>
                      <CardTitle className="text-xl text-teal-800">
                        Artesanato
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-center leading-relaxed">
                        Técnicas ancestrais preservadas em cerâmica, tecelagem 
                        e trabalhos em madeira e fibras naturais.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.section>

        {/* Seção de compromisso com a identidade */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold mb-6">
                Nosso Compromisso
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
                Mantemos viva nossa identidade cultural através da preservação, 
                pesquisa e difusão. Cada visitante que passa por nossas portas 
                leva consigo um pedaço de nossa alma cultural.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="secondary" className="px-8 py-3">
                    <Compass className="w-5 h-5 mr-2" />
                    Explore Nossa Cultura
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-green-600">
                    <Users className="w-5 h-5 mr-2" />
                    Participe Conosco
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