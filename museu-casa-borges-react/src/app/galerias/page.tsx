'use client'

import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Camera, Calendar, Users, Image as ImageIcon, Play, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// AIDEV-NOTE: Dados das galerias disponíveis baseadas no projeto original
const galleries = [
  {
    id: 'oficina-tinta-terra',
    title: 'Making off da Oficina Tinta de Terra',
    description: 'Registros da oficina de produção de tinta natural realizada em 26 de outubro de 2023',
    date: '26 de outubro de 2023',
    category: 'Oficinas',
    imageCount: 25,
    coverImage: '/INDEX/oficinatinta/foto10.jpeg',
    slug: 'oficina-tinta-terra',
    featured: true
  },
  {
    id: 'dia-meio-ambiente',
    title: 'Dia do Meio Ambiente - Projeto Doce Vida',
    description: 'Celebração do Dia Mundial do Meio Ambiente com atividades educativas e sustentáveis',
    date: '10 de junho de 2023',
    category: 'Eventos',
    imageCount: 8,
    coverImage: '/INDEX/album1/foto9.jpg',
    slug: 'dia-meio-ambiente',
    featured: true
  },
  {
    id: 'visita-ufmt',
    title: 'Visita da UFMT',
    description: 'Recepção de estudantes e professores da Universidade Federal de Mato Grosso',
    date: '18 de maio de 2023',
    category: 'Visitas',
    imageCount: 10,
    coverImage: '/INDEX/album2/foto7.jpg',
    slug: 'visita-ufmt',
    featured: true
  }
]

// AIDEV-NOTE: Estatísticas das galerias
const stats = [
  { label: 'Total de Fotos', value: '150+', icon: ImageIcon },
  { label: 'Eventos Registrados', value: '25', icon: Calendar },
  { label: 'Visitantes Fotografados', value: '500+', icon: Users },
  { label: 'Oficinas Documentadas', value: '12', icon: Camera }
]

export default function GaleriasPage() {
  return (        {/* AIDEV-NOTE: Hero section com imagem de fundo */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/INDEX/fundo1.jpg"
              alt="Galeria do Museu"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Galerias Fotográficas
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Registros visuais da vida cultural e educativa do museu
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Camera className="h-5 w-5 mr-2" />
                  Documentação Visual
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Calendar className="h-5 w-5 mr-2" />
                  Eventos e Atividades
                </Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AIDEV-NOTE: Estatísticas das galerias */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-4">
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* AIDEV-NOTE: Galerias em destaque */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Galerias em Destaque
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore nossos registros fotográficos mais recentes e significativos
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleries.map((gallery, index) => (
                <motion.div
                  key={gallery.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={gallery.coverImage}
                        alt={gallery.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      
                      {/* AIDEV-NOTE: Overlay com informações */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      
                      {/* AIDEV-NOTE: Badge de categoria */}
                      <Badge 
                        variant="secondary" 
                        className="absolute top-4 left-4 bg-white/90 text-gray-800"
                      >
                        {gallery.category}
                      </Badge>

                      {/* AIDEV-NOTE: Contador de imagens */}
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        <ImageIcon className="h-4 w-4 inline mr-1" />
                        {gallery.imageCount}
                      </div>

                      {/* AIDEV-NOTE: Informações na parte inferior */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-lg font-bold mb-1 line-clamp-2">
                          {gallery.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-200">
                          <Calendar className="h-4 w-4 mr-1" />
                          {gallery.date}
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {gallery.description}
                      </p>
                      
                      <Link href={`/galerias/${gallery.slug}`}>
                        <Button className="w-full group">
                          Ver Galeria
                          <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AIDEV-NOTE: Seção de informações sobre as galerias */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Documentando Nossa História
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Nossas galerias fotográficas capturam momentos especiais da vida do museu, 
                  desde oficinas educativas até visitas de grupos e eventos culturais. 
                  Cada imagem conta uma história e preserva a memória de nossas atividades.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3">
                      <Camera className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Registro Profissional</h3>
                      <p className="text-gray-600">Documentação de alta qualidade de todos os eventos</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Memória Coletiva</h3>
                      <p className="text-gray-600">Preservação da história e das experiências compartilhadas</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/INDEX/fundo2.jpg"
                    alt="Atividades do museu"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AIDEV-NOTE: Call to action */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Participe de Nossos Eventos
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Venha fazer parte da nossa história! Participe de nossas oficinas, 
                eventos e atividades culturais e apareça em nossas próximas galerias.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/eventos">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Calendar className="h-5 w-5 mr-2" />
                    Ver Próximos Eventos
                  </Button>
                </Link>
                <Link href="/contato">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Entre em Contato
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>  )
}