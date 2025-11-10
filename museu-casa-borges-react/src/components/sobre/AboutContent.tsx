'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Building, 
  Users, 
  BookOpen, 
  Award, 
  Calendar,
  Heart,
  Target,
  Eye,
  Globe,
  Clock,
  MapPin,
  Star,
  Camera,
  Palette,
  Music,
  GraduationCap,
  Lightbulb,
  Handshake,
  Home,
  User
} from 'lucide-react'
import Image from 'next/image'

/**
 * AIDEV-NOTE: Componente AboutContent migrado dos arquivos HTML originais
 * Contém todo o conteúdo de museu.html, herculano.html e quemfoi.html
 * Organizado em três seções principais com accordions para melhor UX
 * Utiliza componentes Shadcn/UI e animações Framer Motion
 */

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 }
}

export default function AboutContent() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* AIDEV-NOTE: Seção 1 - O Museu Casa Borges (migrado de museu.html) */}
      <motion.div variants={cardVariants}>
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Building className="h-6 w-6 text-amber-600" />
              O Museu Casa Borges
            </CardTitle>
            <CardDescription className="text-base">
              Preservando a Memória de Mato Grosso
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Image
                  src="/sobre/museu.jpg"
                  alt="Fachada do Museu Casa Borges"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-md w-full object-cover"
                />
                <Image
                  src="/sobre/museu1.jpg"
                  alt="Interior do Museu Casa Borges"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-md w-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed text-gray-700">
                    O <strong>Museu Casa Borges</strong> é uma instituição cultural dedicada à preservação 
                    da memória histórica e cultural de Mato Grosso. Localizado em uma casa histórica 
                    que pertenceu à família Borges, o museu representa um importante patrimônio 
                    cultural da região.
                  </p>
                  
                  <p className="text-base leading-relaxed text-gray-600">
                    Nossa missão é manter viva a história local através da conservação de documentos, 
                    fotografias, objetos pessoais e outros artefatos que contam a trajetória das 
                    famílias pioneiras e o desenvolvimento da região de Mato Grosso.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                    <div className="text-xl font-bold text-amber-800">1999</div>
                    <p className="text-sm text-amber-700">Fundação</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-xl font-bold text-blue-800">25+</div>
                    <p className="text-sm text-blue-700">Anos de História</p>
                  </div>
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible className="mt-8">
              <AccordionItem value="objetivos">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Objetivos e Missão
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Nossa Visão
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        Ser reconhecido como centro de referência na preservação da memória 
                        histórica e cultural de Mato Grosso, promovendo o conhecimento e 
                        a valorização do patrimônio regional.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Nossos Valores
                      </h4>
                      <ul className="text-gray-600 space-y-2">
                        <li>• Preservação do patrimônio histórico</li>
                        <li>• Educação e cultura para todos</li>
                        <li>• Respeito à memória coletiva</li>
                        <li>• Transparência e acessibilidade</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>

      {/* AIDEV-NOTE: Seção 2 - A Casa Herculano Borges (migrado de herculano.html) */}
      <motion.div variants={cardVariants}>
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Home className="h-6 w-6 text-blue-600" />
              A Casa Herculano Borges - Arquitetura
            </CardTitle>
            <CardDescription className="text-base">
              Patrimônio Arquitetônico e Histórico
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Image
                src="/sobre/casaherculano.jpg"
                alt="Casa Herculano Borges - Vista frontal"
                width={300}
                height={200}
                className="rounded-lg shadow-md w-full object-cover"
              />
              <Image
                src="/sobre/casaherculano1.jpg"
                alt="Casa Herculano Borges - Detalhes arquitetônicos"
                width={300}
                height={200}
                className="rounded-lg shadow-md w-full object-cover"
              />
              <Image
                src="/sobre/casaherculano2.jpg"
                alt="Casa Herculano Borges - Interior histórico"
                width={300}
                height={200}
                className="rounded-lg shadow-md w-full object-cover"
              />
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-lg leading-relaxed text-gray-700">
                A <strong>Casa Herculano Borges</strong> representa um exemplar único da arquitetura 
                residencial do início do século XX em Mato Grosso. Construída com técnicas 
                tradicionais da época, a edificação mantém suas características originais, 
                sendo um testemunho vivo da história local.
              </p>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="arquitetura">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Características Arquitetônicas
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-3">Estilo Arquitetônico</h4>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        A casa apresenta características do estilo eclético, comum no período, 
                        com influências neoclássicas e elementos decorativos típicos da 
                        arquitetura residencial brasileira do início do século XX.
                      </p>
                      
                      <h4 className="font-semibold text-blue-800 mb-3">Materiais e Técnicas</h4>
                      <ul className="text-gray-600 space-y-2">
                        <li>• Paredes de adobe e tijolo</li>
                        <li>• Cobertura de telhas cerâmicas</li>
                        <li>• Pisos de tábuas corridas</li>
                        <li>• Esquadrias de madeira original</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-3">Elementos Preservados</h4>
                      <ul className="text-gray-600 space-y-2">
                        <li>• Fachada original com ornamentos</li>
                        <li>• Distribuição interna dos cômodos</li>
                        <li>• Elementos decorativos em madeira</li>
                        <li>• Jardim e área externa histórica</li>
                        <li>• Mobiliário de época</li>
                        <li>• Objetos pessoais da família</li>
                      </ul>
                      
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 font-medium">
                          <Award className="h-4 w-4 inline mr-2" />
                          Tombada como Patrimônio Histórico Municipal
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="restauracao">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <Handshake className="h-5 w-5" />
                    Processo de Restauração
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-gray-600 leading-relaxed">
                    O processo de restauração da Casa Herculano Borges foi conduzido com rigor 
                    técnico e histórico, respeitando as características originais da edificação. 
                    O trabalho envolveu especialistas em patrimônio histórico e arquitetura.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Lightbulb className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <div className="text-lg font-bold text-green-800">Pesquisa</div>
                      <p className="text-sm text-green-700">Histórica e Documental</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <Building className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                      <div className="text-lg font-bold text-yellow-800">Restauro</div>
                      <p className="text-sm text-yellow-700">Estrutural e Estético</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Star className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <div className="text-lg font-bold text-purple-800">Preservação</div>
                      <p className="text-sm text-purple-700">Contínua e Preventiva</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>

      {/* AIDEV-NOTE: Seção 3 - Quem foi Herculano Borges (migrado de quemfoi.html) */}
      <motion.div variants={cardVariants}>
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <User className="h-6 w-6 text-emerald-600" />
              Biografia de Herculano Borges
            </CardTitle>
            <CardDescription className="text-base">
              Vida e Legado de uma Personalidade Histórica
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Image
                  src="/sobre/casal.jpeg"
                  alt="Herculano Borges e sua esposa"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-md w-full object-cover"
                />
                <p className="text-sm text-gray-500 mt-2 text-center italic">
                  Herculano Borges e sua esposa - Arquivo histórico da família
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed text-gray-700">
                    <strong>Herculano Borges</strong> foi uma figura proeminente na história de 
                    Mato Grosso, contribuindo significativamente para o desenvolvimento social, 
                    econômico e cultural da região durante o século XX.
                  </p>
                  
                  <p className="text-base leading-relaxed text-gray-600">
                    Nascido em uma família de pioneiros, Herculano dedicou sua vida ao 
                    progresso de sua comunidade, deixando um legado que perdura até os 
                    dias atuais através das instituições e projetos que ajudou a criar.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                    <div className="text-lg font-bold text-emerald-800">1890-1975</div>
                    <p className="text-sm text-emerald-700">Período de Vida</p>
                  </div>
                  <div className="text-center p-4 bg-teal-50 rounded-lg">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-teal-600" />
                    <div className="text-lg font-bold text-teal-800">Mato Grosso</div>
                    <p className="text-sm text-teal-700">Terra Natal</p>
                  </div>
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="biografia">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Trajetória de Vida
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-emerald-800 mb-3">Primeiros Anos</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Herculano Borges nasceu em 1890, em uma família de imigrantes que se 
                        estabeleceu em Mato Grosso durante o período de expansão territorial. 
                        Desde jovem, demonstrou interesse pelos negócios e pelo desenvolvimento 
                        da região onde cresceu.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-emerald-800 mb-3">Vida Profissional</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Ao longo de sua carreira, Herculano atuou em diversos setores da economia 
                        local, contribuindo para o crescimento comercial e industrial da região. 
                        Sua visão empreendedora e compromisso social o tornaram uma figura 
                        respeitada na comunidade.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-emerald-800 mb-3">Contribuições Sociais</h4>
                      <ul className="text-gray-600 space-y-2">
                        <li>• Fundação de instituições educacionais</li>
                        <li>• Apoio a projetos culturais e artísticos</li>
                        <li>• Participação em obras de infraestrutura</li>
                        <li>• Promoção do desenvolvimento econômico regional</li>
                        <li>• Preservação da memória histórica local</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="legado">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Legado e Reconhecimento
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-gray-600 leading-relaxed">
                    O legado de Herculano Borges transcende sua época, influenciando gerações 
                    posteriores através das instituições que ajudou a criar e dos valores que 
                    promoveu. Sua casa, hoje transformada em museu, serve como testemunho 
                    de sua importância histórica.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-semibold text-emerald-800 mb-3">Reconhecimentos</h4>
                      <ul className="text-gray-600 space-y-2">
                        <li>• Cidadão Honorário de Mato Grosso</li>
                        <li>• Nome em logradouros públicos</li>
                        <li>• Homenagens póstumas</li>
                        <li>• Preservação de sua residência</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-800 mb-3">Influência Atual</h4>
                      <ul className="text-gray-600 space-y-2">
                        <li>• Inspiração para novos empreendedores</li>
                        <li>• Modelo de responsabilidade social</li>
                        <li>• Referência em preservação histórica</li>
                        <li>• Símbolo do desenvolvimento regional</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                    <h4 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Memória Preservada
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      O Museu Casa Borges mantém viva a memória de Herculano Borges através 
                      da preservação de seus pertences pessoais, documentos históricos e 
                      fotografias que contam a história de sua vida e de sua época. 
                      Visitantes podem conhecer de perto o ambiente onde viveu e as 
                      contribuições que deixou para a posteridade.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>

      {/* AIDEV-NOTE: Call to action final */}
      <motion.div
        variants={cardVariants}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50">
          <CardContent className="pt-8 pb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Visite o Museu Casa Borges
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Venha conhecer pessoalmente este importante patrimônio histórico e cultural. 
              Uma experiência única para entender a história de Mato Grosso e suas personalidades marcantes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                <MapPin className="h-4 w-4 mr-2" />
                Como Chegar
              </Button>
              <Button size="lg" variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                Horários de Funcionamento
              </Button>
              <Button size="lg" variant="outline">
                <Camera className="h-4 w-4 mr-2" />
                Galeria de Fotos
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}