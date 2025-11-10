'use client'

import { Metadata } from 'next'
import { ImageGallery, GalleryImage } from '@/components/gallery'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, MapPin, Users, Clock, GraduationCap, BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// AIDEV-NOTE: Imagens da visita baseadas no projeto original
const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/INDEX/album2/foto1.jpg',
    alt: 'Chegada do grupo da UFMT ao museu',
    title: 'Chegada da UFMT',
    description: 'Recepção do grupo de estudantes e professores da Universidade Federal de Mato Grosso',
    category: 'Recepção'
  },
  {
    id: '2',
    src: '/INDEX/album2/foto2.jpg',
    alt: 'Apresentação da história do museu',
    title: 'Apresentação Institucional',
    description: 'Introdução à história e missão do Museu Casa Borges',
    category: 'Apresentação'
  },
  {
    id: '3',
    src: '/INDEX/album2/foto3.jpg',
    alt: 'Visita guiada pelas salas do museu',
    title: 'Visita Guiada',
    description: 'Percurso pelas principais salas e exposições do museu',
    category: 'Tour'
  },
  {
    id: '4',
    src: '/INDEX/album2/foto4.jpg',
    alt: 'Estudantes observando o acervo',
    title: 'Exploração do Acervo',
    description: 'Estudantes analisando peças históricas e documentos',
    category: 'Estudo'
  },
  {
    id: '5',
    src: '/INDEX/album2/foto5.jpg',
    alt: 'Discussão sobre preservação histórica',
    title: 'Discussão Acadêmica',
    description: 'Debate sobre métodos de preservação e pesquisa histórica',
    category: 'Discussão'
  },
  {
    id: '6',
    src: '/INDEX/album2/foto6.jpg',
    alt: 'Interação com educadores do museu',
    title: 'Intercâmbio Educativo',
    description: 'Troca de experiências entre educadores e pesquisadores',
    category: 'Educação'
  },
  {
    id: '7',
    src: '/INDEX/album2/foto7.jpg',
    alt: 'Sessão de perguntas e respostas',
    title: 'Sessão de Q&A',
    description: 'Momento de esclarecimento de dúvidas e aprofundamento',
    category: 'Interação'
  },
  {
    id: '8',
    src: '/INDEX/album2/foto8.jpg',
    alt: 'Foto final do grupo',
    title: 'Registro Final',
    description: 'Foto comemorativa com todo o grupo da UFMT',
    category: 'Encerramento'
  },
  {
    id: '9',
    src: '/INDEX/album2/foto9.jpg',
    alt: 'Avaliação da visita',
    title: 'Avaliação',
    description: 'Feedback dos participantes sobre a experiência',
    category: 'Feedback'
  },
  {
    id: '10',
    src: '/INDEX/album2/foto10.jpg',
    alt: 'Despedida e agradecimentos',
    title: 'Despedida',
    description: 'Momento de despedida e agradecimentos mútuos',
    category: 'Despedida'
  }
]

export default function VisitaUFMTPage() {
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
                  <Badge variant="secondary" className="mb-3 bg-blue-100 text-blue-800">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    Visita Acadêmica
                  </Badge>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Visita da UFMT
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl">
                    Recepção de estudantes e professores da Universidade Federal 
                    de Mato Grosso para intercâmbio acadêmico e conhecimento do 
                    acervo histórico e cultural do museu.
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <div className="bg-blue-50 rounded-lg p-6 space-y-4 border border-blue-200">
                    <div className="flex items-center text-blue-700">
                      <Calendar className="h-5 w-5 mr-3" />
                      <span>18 de maio de 2023</span>
                    </div>
                    <div className="flex items-center text-blue-700">
                      <Clock className="h-5 w-5 mr-3" />
                      <span>14h às 17h</span>
                    </div>
                    <div className="flex items-center text-blue-700">
                      <MapPin className="h-5 w-5 mr-3" />
                      <span>Todo o Museu</span>
                    </div>
                    <div className="flex items-center text-blue-700">
                      <Users className="h-5 w-5 mr-3" />
                      <span>35 visitantes</span>
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
                title="Visita da UFMT"
                description="Intercâmbio acadêmico e cultural"
              />
            </motion.div>
          </div>
        </section>

        {/* AIDEV-NOTE: Informações sobre a visita */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Parceria Acadêmica
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    A visita da Universidade Federal de Mato Grosso (UFMT) 
                    representou um importante momento de intercâmbio acadêmico 
                    e cultural. O grupo, composto por estudantes de História, 
                    Museologia e Educação, veio conhecer nossas práticas de 
                    preservação e educação patrimonial.
                  </p>
                  <p>
                    Durante a visita, os participantes tiveram acesso exclusivo 
                    ao acervo, participaram de discussões sobre metodologias 
                    de pesquisa histórica e conheceram os projetos educativos 
                    desenvolvidos pelo museu.
                  </p>
                  <p>
                    Esta parceria fortalece os laços entre instituições de 
                    ensino e museus, promovendo a formação de futuros 
                    profissionais comprometidos com a preservação da memória 
                    e do patrimônio cultural.
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Atividades Realizadas
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <BookOpen className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      Apresentação institucional e histórica
                    </li>
                    <li className="flex items-start">
                      <BookOpen className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      Visita guiada ao acervo permanente
                    </li>
                    <li className="flex items-start">
                      <BookOpen className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      Acesso à reserva técnica
                    </li>
                    <li className="flex items-start">
                      <BookOpen className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      Discussão sobre metodologias de pesquisa
                    </li>
                    <li className="flex items-start">
                      <BookOpen className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      Troca de experiências educativas
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
                    src="/INDEX/album2/foto7.jpg"
                    alt="Discussão acadêmica durante a visita"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Perfil dos Visitantes
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">25</div>
                      <div className="text-sm text-gray-600">Estudantes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">8</div>
                      <div className="text-sm text-gray-600">Professores</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">3</div>
                      <div className="text-sm text-gray-600">Cursos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">3h</div>
                      <div className="text-sm text-gray-600">Duração</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-100 rounded-lg p-6 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">
                    Cursos Representados
                  </h4>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• História - Bacharelado e Licenciatura</li>
                    <li>• Museologia</li>
                    <li>• Educação - Pós-graduação</li>
                    <li>• Patrimônio Cultural</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AIDEV-NOTE: Depoimentos dos participantes */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Avaliação da Visita
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Feedback dos professores e estudantes da UFMT
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Prof. Dr. Carlos Mendes",
                  role: "Coordenador do Curso de História",
                  comment: "Experiência enriquecedora para nossos estudantes. A qualidade do acervo e a dedicação da equipe são exemplares."
                },
                {
                  name: "Ana Beatriz Santos",
                  role: "Estudante de Museologia",
                  comment: "Foi inspirador ver na prática como um museu pode ser um espaço vivo de educação e preservação cultural."
                },
                {
                  name: "Prof. Dra. Mariana Lima",
                  role: "Departamento de Educação",
                  comment: "As metodologias educativas apresentadas são inovadoras e podem ser adaptadas em outros contextos."
                }
              ].map((depoimento, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-lg border border-blue-100"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
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

        {/* AIDEV-NOTE: Resultados e parcerias futuras */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Resultados e Parcerias
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    A visita resultou em importantes desdobramentos para ambas 
                    as instituições. Foi estabelecido um protocolo de cooperação 
                    para futuras atividades conjuntas, incluindo estágios 
                    supervisionados e projetos de pesquisa colaborativos.
                  </p>
                  <p>
                    Os estudantes manifestaram interesse em desenvolver trabalhos 
                    de conclusão de curso relacionados ao acervo do museu, 
                    fortalecendo a produção acadêmica sobre a história local 
                    e regional.
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Próximos Passos
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Estágios Supervisionados</h4>
                        <p className="text-gray-600 text-sm">Recepção de estagiários dos cursos de História e Museologia</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Projetos de Pesquisa</h4>
                        <p className="text-gray-600 text-sm">Desenvolvimento de pesquisas colaborativas sobre o acervo</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Intercâmbio Contínuo</h4>
                        <p className="text-gray-600 text-sm">Visitas regulares e troca de experiências</p>
                      </div>
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
                    src="/INDEX/album2/foto10.jpg"
                    alt="Despedida do grupo da UFMT"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AIDEV-NOTE: Call to action para outras instituições */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Sua Instituição Também Pode Visitar
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Oferecemos visitas especializadas para grupos acadêmicos, 
                escolas e instituições de ensino. Entre em contato para 
                agendar uma experiência educativa personalizada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                    <Calendar className="h-5 w-5 mr-2" />
                    Agendar Visita
                  </Button>
                </Link>
                <Link href="/educativo">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Programas Educativos
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>  )
}
