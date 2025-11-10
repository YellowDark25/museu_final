'use client'

import { Metadata } from 'next'
import { ImageGallery, GalleryImage } from '@/components/gallery'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, MapPin, Users, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// AIDEV-NOTE: Imagens da oficina baseadas no projeto original
const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/INDEX/oficinatinta/foto1.jpeg',
    alt: 'Preparação dos materiais para a oficina',
    title: 'Preparação dos Materiais',
    description: 'Organização dos ingredientes naturais para produção da tinta de terra',
    category: 'Preparação'
  },
  {
    id: '2',
    src: '/INDEX/oficinatinta/foto2.jpeg',
    alt: 'Participantes reunidos para início da oficina',
    title: 'Início da Oficina',
    description: 'Participantes se reunindo para conhecer o processo de produção',
    category: 'Atividade'
  },
  {
    id: '3',
    src: '/INDEX/oficinatinta/foto3.jpeg',
    alt: 'Demonstração da técnica de mistura',
    title: 'Técnica de Mistura',
    description: 'Demonstração prática da técnica tradicional de mistura dos pigmentos',
    category: 'Técnica'
  },
  {
    id: '4',
    src: '/INDEX/oficinatinta/foto4.jpeg',
    alt: 'Processo de peneiramento da terra',
    title: 'Peneiramento da Terra',
    description: 'Processo cuidadoso de peneiramento para obter a textura ideal',
    category: 'Processo'
  },
  {
    id: '5',
    src: '/INDEX/oficinatinta/foto5.jpeg',
    alt: 'Adição de aglutinantes naturais',
    title: 'Aglutinantes Naturais',
    description: 'Incorporação de aglutinantes naturais para dar consistência à tinta',
    category: 'Processo'
  },
  {
    id: '6',
    src: '/INDEX/oficinatinta/foto6.jpeg',
    alt: 'Teste de cores e tonalidades',
    title: 'Teste de Cores',
    description: 'Experimentação com diferentes tonalidades e intensidades',
    category: 'Experimentação'
  },
  {
    id: '7',
    src: '/INDEX/oficinatinta/foto7.jpeg',
    alt: 'Aplicação da tinta em superfície teste',
    title: 'Aplicação Teste',
    description: 'Primeira aplicação da tinta produzida em superfície de teste',
    category: 'Aplicação'
  },
  {
    id: '8',
    src: '/INDEX/oficinatinta/foto8.jpeg',
    alt: 'Participantes trabalhando em grupo',
    title: 'Trabalho em Grupo',
    description: 'Colaboração entre participantes durante o processo criativo',
    category: 'Atividade'
  },
  {
    id: '9',
    src: '/INDEX/oficinatinta/foto9.jpeg',
    alt: 'Resultado final das tintas produzidas',
    title: 'Tintas Produzidas',
    description: 'Variedade de tintas naturais produzidas durante a oficina',
    category: 'Resultado'
  },
  {
    id: '10',
    src: '/INDEX/oficinatinta/foto10.jpeg',
    alt: 'Grupo final de participantes',
    title: 'Encerramento',
    description: 'Foto final com todos os participantes e suas criações',
    category: 'Encerramento'
  }
]

export default function OficinaPage() {
  return (        {/* AIDEV-NOTE: Header da galeria */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/galerias">
                <Button variant="ghost" className="mb-6">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar às Galerias
                </Button>
              </Link>

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <Badge variant="secondary" className="mb-3">
                    Oficina Educativa
                  </Badge>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Making off da Oficina Tinta de Terra
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl">
                    Registros fotográficos da oficina de produção de tinta natural 
                    utilizando terra e pigmentos orgânicos, realizada em parceria 
                    com artistas locais e educadores ambientais.
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-3" />
                      <span>26 de outubro de 2023</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-3" />
                      <span>14h às 17h</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-3" />
                      <span>Ateliê do Museu</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-3" />
                      <span>15 participantes</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AIDEV-NOTE: Galeria de imagens */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ImageGallery 
                images={galleryImages}
                title="Oficina Tinta de Terra"
                description="Processo completo de produção de tinta natural"
              />
            </motion.div>
          </div>
        </section>

        {/* AIDEV-NOTE: Informações sobre a oficina */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Sobre a Oficina
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    A oficina "Tinta de Terra" foi uma experiência única que conectou 
                    participantes com técnicas ancestrais de produção de pigmentos naturais. 
                    Utilizando terra local, argila e outros materiais orgânicos, os 
                    participantes aprenderam a criar suas próprias tintas ecológicas.
                  </p>
                  <p>
                    O processo envolveu desde a coleta e preparação dos materiais até 
                    a aplicação final das tintas em diferentes superfícies. Cada 
                    participante pôde experimentar com diferentes tonalidades e 
                    texturas, criando um conjunto único de cores naturais.
                  </p>
                  <p>
                    Esta atividade faz parte do nosso programa de educação ambiental 
                    e sustentabilidade, promovendo o uso de materiais naturais e 
                    técnicas tradicionais de produção artística.
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Objetivos da Oficina
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Ensinar técnicas tradicionais de produção de pigmentos
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Promover consciência ambiental e sustentabilidade
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Conectar participantes com materiais naturais locais
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Estimular a criatividade e experimentação artística
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/INDEX/oficinatinta/foto10.jpeg"
                    alt="Resultado final da oficina"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Materiais Utilizados
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Pigmentos Naturais</h4>
                      <ul className="space-y-1">
                        <li>• Terra vermelha local</li>
                        <li>• Argila branca</li>
                        <li>• Óxido de ferro</li>
                        <li>• Carvão vegetal</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Aglutinantes</h4>
                      <ul className="space-y-1">
                        <li>• Goma arábica</li>
                        <li>• Clara de ovo</li>
                        <li>• Mel orgânico</li>
                        <li>• Água filtrada</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AIDEV-NOTE: Call to action para próximas oficinas */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Interessado em Participar?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Fique atento às nossas próximas oficinas e atividades educativas. 
                Inscreva-se em nossa newsletter para receber informações sobre 
                novos eventos e oportunidades de aprendizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/eventos">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Calendar className="h-5 w-5 mr-2" />
                    Próximas Oficinas
                  </Button>
                </Link>
                <Link href="/educativo">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Setor Educativo
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>  )
}
