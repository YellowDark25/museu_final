'use client'

import { Metadata } from 'next'
import { ImageGallery, GalleryImage } from '@/components/gallery'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, MapPin, Users, Clock, Leaf } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// AIDEV-NOTE: Imagens do evento baseadas no projeto original
const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/INDEX/album1/foto1.jpg',
    alt: 'Abertura do evento Dia do Meio Ambiente',
    title: 'Abertura do Evento',
    description: 'Cerimônia de abertura com apresentação do Projeto Doce Vida',
    category: 'Cerimônia'
  },
  {
    id: '2',
    src: '/INDEX/album1/foto2.jpg',
    alt: 'Atividades educativas sobre sustentabilidade',
    title: 'Atividades Educativas',
    description: 'Oficinas e demonstrações sobre práticas sustentáveis',
    category: 'Educação'
  },
  {
    id: '3',
    src: '/INDEX/album1/foto3.jpg',
    alt: 'Exposição de plantas nativas',
    title: 'Plantas Nativas',
    description: 'Mostra de espécies vegetais nativas da região',
    category: 'Exposição'
  },
  {
    id: '4',
    src: '/INDEX/album1/foto4.jpg',
    alt: 'Participantes em atividade de plantio',
    title: 'Atividade de Plantio',
    description: 'Participantes engajados em atividades de plantio e jardinagem',
    category: 'Atividade'
  },
  {
    id: '5',
    src: '/INDEX/album1/foto5.jpg',
    alt: 'Demonstração de compostagem',
    title: 'Compostagem',
    description: 'Demonstração prática de técnicas de compostagem doméstica',
    category: 'Demonstração'
  },
  {
    id: '6',
    src: '/INDEX/album1/foto6.jpg',
    alt: 'Crianças participando das atividades',
    title: 'Participação Infantil',
    description: 'Crianças aprendendo sobre cuidados com o meio ambiente',
    category: 'Educação'
  },
  {
    id: '7',
    src: '/INDEX/album1/foto7.jpg',
    alt: 'Palestra sobre sustentabilidade',
    title: 'Palestra Educativa',
    description: 'Apresentação sobre práticas sustentáveis e preservação ambiental',
    category: 'Palestra'
  },
  {
    id: '8',
    src: '/INDEX/album1/foto8.jpg',
    alt: 'Encerramento com grupo de participantes',
    title: 'Encerramento',
    description: 'Foto final com todos os participantes do evento',
    category: 'Encerramento'
  }
]

export default function DioMeioAmbientePage() {
  return (
        <>
        {/* AIDEV-NOTE: Header da galeria */}
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
                  <Badge variant="secondary" className="mb-3 bg-green-100 text-green-800">
                    <Leaf className="h-4 w-4 mr-1" />
                    Evento Ambiental
                  </Badge>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Dia do Meio Ambiente - Projeto Doce Vida
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl">
                    Celebração do Dia Mundial do Meio Ambiente com atividades 
                    educativas, oficinas de sustentabilidade e conscientização 
                    ambiental para toda a família.
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <div className="bg-green-50 rounded-lg p-6 space-y-4 border border-green-200">
                    <div className="flex items-center text-green-700">
                      <Calendar className="h-5 w-5 mr-3" />
                      <span>10 de junho de 2023</span>
                    </div>
                    <div className="flex items-center text-green-700">
                      <Clock className="h-5 w-5 mr-3" />
                      <span>9h às 16h</span>
                    </div>
                    <div className="flex items-center text-green-700">
                      <MapPin className="h-5 w-5 mr-3" />
                      <span>Jardim do Museu</span>
                    </div>
                    <div className="flex items-center text-green-700">
                      <Users className="h-5 w-5 mr-3" />
                      <span>80+ participantes</span>
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
                title="Dia do Meio Ambiente"
                description="Celebração com atividades educativas e sustentáveis"
              />
            </motion.div>
          </div>
        </section>

        {/* AIDEV-NOTE: Informações sobre o evento */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Projeto Doce Vida
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    O "Projeto Doce Vida" é uma iniciativa do museu que promove 
                    a consciência ambiental através de atividades práticas e 
                    educativas. No Dia Mundial do Meio Ambiente, organizamos 
                    uma programação especial com foco na sustentabilidade e 
                    preservação da natureza.
                  </p>
                  <p>
                    O evento contou com oficinas de compostagem, plantio de 
                    mudas nativas, demonstrações de práticas sustentáveis e 
                    palestras educativas sobre a importância da preservação 
                    ambiental para as futuras gerações.
                  </p>
                  <p>
                    Famílias inteiras participaram das atividades, criando um 
                    ambiente de aprendizado colaborativo e conscientização 
                    sobre nosso papel na proteção do meio ambiente.
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Atividades Realizadas
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <Leaf className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      Oficina de compostagem doméstica
                    </li>
                    <li className="flex items-start">
                      <Leaf className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      Plantio de mudas nativas da região
                    </li>
                    <li className="flex items-start">
                      <Leaf className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      Exposição de plantas medicinais
                    </li>
                    <li className="flex items-start">
                      <Leaf className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      Palestra sobre sustentabilidade urbana
                    </li>
                    <li className="flex items-start">
                      <Leaf className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      Atividades educativas para crianças
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
                    src="/INDEX/album1/foto9.jpg"
                    alt="Atividades do Dia do Meio Ambiente"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="bg-white rounded-lg p-6 shadow-lg border border-green-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Impacto do Evento
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">50+</div>
                      <div className="text-sm text-gray-600">Mudas Plantadas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">80+</div>
                      <div className="text-sm text-gray-600">Participantes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">25</div>
                      <div className="text-sm text-gray-600">Famílias</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">6h</div>
                      <div className="text-sm text-gray-600">de Atividades</div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 rounded-lg p-6 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3">
                    Parceiros do Evento
                  </h4>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li>• Secretaria Municipal de Meio Ambiente</li>
                    <li>• Instituto de Botânica Local</li>
                    <li>• Cooperativa de Reciclagem</li>
                    <li>• Escola Municipal Vizinha</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AIDEV-NOTE: Depoimentos e feedback */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Depoimentos dos Participantes
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Veja o que os participantes disseram sobre o evento
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Maria Silva",
                  role: "Mãe de família",
                  comment: "Foi uma experiência incrível! Meus filhos aprenderam muito sobre sustentabilidade de forma divertida."
                },
                {
                  name: "João Santos",
                  role: "Professor",
                  comment: "Evento muito bem organizado. Trouxe minha turma e todos ficaram encantados com as atividades."
                },
                {
                  name: "Ana Costa",
                  role: "Ambientalista",
                  comment: "Iniciativas como essa são fundamentais para conscientizar a comunidade sobre a importância da preservação."
                }
              ].map((depoimento, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-lg border border-green-100"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                      {depoimento.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">{depoimento.name}</h4>
                      <p className="text-sm text-gray-600">{depoimento.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{depoimento.comment}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AIDEV-NOTE: Call to action para próximos eventos */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Participe dos Próximos Eventos
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Fique por dentro das próximas atividades do Projeto Doce Vida 
                e outros eventos ambientais do museu. Juntos podemos fazer a diferença!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/eventos">
                  <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                    <Calendar className="h-5 w-5 mr-2" />
                    Próximos Eventos
                  </Button>
                </Link>
                <Link href="/educativo">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-50">
                    <Leaf className="h-5 w-5 mr-2" />
                    Programas Educativos
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
        </>
  )
}
