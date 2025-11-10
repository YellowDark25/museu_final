'use client'

import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

/**
 * AIDEV-NOTE: Página de Exposições do Museu Casa Borges
 * Lista exposições permanentes e temporárias com informações detalhadas
 * Utiliza cards animados e layout responsivo
 */
export default function ExposicoesPage() {
  const exposicoesPermanentes = [
    {
      id: 1,
      title: "Memórias da Casa",
      description: "Uma viagem pela história da casa e seus antigos moradores, revelando histórias fascinantes do cotidiano de épocas passadas.",
      image: "/images/fundo1.jpg",
      local: "Sala Principal",
      duracao: "Permanente",
      visitantes: "Todas as idades"
    },
    {
      id: 2,
      title: "Patrimônio Cultural Local",
      description: "Exposição dedicada aos objetos, tradições e costumes que formam a identidade cultural da região.",
      image: "/images/fundo2.jpg",
      local: "Ala Norte",
      duracao: "Permanente",
      visitantes: "Todas as idades"
    },
    {
      id: 3,
      title: "Arte e Artesanato Regional",
      description: "Mostra permanente com obras de artistas locais e peças de artesanato tradicional da região.",
      image: "/images/fundo3.jpg",
      local: "Galeria de Arte",
      duracao: "Permanente",
      visitantes: "Todas as idades"
    }
  ]

  const exposicoesTemporarias = [
    {
      id: 4,
      title: "Fotografia Histórica: 100 Anos em Imagens",
      description: "Uma coleção única de fotografias que documentam a evolução da cidade ao longo de um século.",
      image: "/images/fundo4.jpg",
      local: "Sala de Exposições Temporárias",
      inicio: "15 de Janeiro, 2024",
      fim: "30 de Março, 2024",
      visitantes: "Todas as idades",
      status: "Em cartaz"
    },
    {
      id: 5,
      title: "Tradições Culinárias: Sabores da Memória",
      description: "Exposição interativa sobre a gastronomia tradicional local, com receitas, utensílios e histórias familiares.",
      image: "/images/fundo1.jpg",
      local: "Espaço Cultural",
      inicio: "10 de Abril, 2024",
      fim: "15 de Junho, 2024",
      visitantes: "Todas as idades",
      status: "Próxima"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-[var(--museu-red)] to-red-700">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Exposições
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Descubra nossas exposições permanentes e temporárias que contam a rica história e cultura da nossa região
            </motion.p>
          </div>
        </section>

        {/* Exposições Permanentes */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Exposições Permanentes
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Nossas exposições permanentes estão sempre disponíveis para visitação
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {exposicoesPermanentes.map((exposicao) => (
                <motion.div key={exposicao.id} variants={cardVariants}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={exposicao.image}
                        alt={exposicao.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-800">
                        {exposicao.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {exposicao.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-[var(--museu-red)]" />
                        {exposicao.local}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-[var(--museu-red)]" />
                        {exposicao.duracao}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-[var(--museu-red)]" />
                        {exposicao.visitantes}
                      </div>
                      <Button className="w-full mt-4 bg-[var(--museu-red)] hover:bg-red-700">
                        Saiba Mais
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Exposições Temporárias */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Exposições Temporárias
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Exposições especiais com duração limitada - não perca!
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {exposicoesTemporarias.map((exposicao) => (
                <motion.div key={exposicao.id} variants={cardVariants}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-64 overflow-hidden rounded-t-lg">
                      <Image
                        src={exposicao.image}
                        alt={exposicao.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                        exposicao.status === 'Em cartaz' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-blue-500 text-white'
                      }`}>
                        {exposicao.status}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-800">
                        {exposicao.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {exposicao.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-[var(--museu-red)]" />
                        {exposicao.local}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-[var(--museu-red)]" />
                        {exposicao.inicio} - {exposicao.fim}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-[var(--museu-red)]" />
                        {exposicao.visitantes}
                      </div>
                      <Button className="w-full mt-4 bg-[var(--museu-red)] hover:bg-red-700">
                        {exposicao.status === 'Em cartaz' ? 'Visite Agora' : 'Agende sua Visita'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-[var(--museu-red)]">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Planeje sua Visita
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Venha conhecer nossas exposições e mergulhe na rica história e cultura da nossa região
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  size="lg"
                  className="bg-white text-[var(--museu-red)] hover:bg-gray-100"
                >
                  <Link href="/visita">
                    Informações para Visitantes
                  </Link>
                </Button>
                <Button 
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[var(--museu-red)]"
                >
                  <Link href="/contato">
                    Entre em Contato
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>  )
}
