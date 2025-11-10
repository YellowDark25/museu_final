import { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import { ContentPage } from '@/components/ui/ContentPage'
import { AuthorCredit } from '@/components/ui/AuthorCredit'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Heart, 
  BookOpen, 
  Palette, 
  Music, 
  Camera,
  MapPin,
  Calendar,
  ArrowRight,
  Globe,
  Award,
  Target
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Comunidades - Museu Casa Borges',
  description: 'Conheça os projetos sociais e culturais do Museu Casa Borges com diferentes comunidades locais, promovendo inclusão e educação.',
  keywords: 'comunidades, projetos sociais, educação, cultura, inclusão, workshops, oficinas'
}

// AIDEV-NOTE: Página das comunidades e projetos sociais
// Apresenta os diferentes programas comunitários do museu
// Inclui informações sobre workshops, oficinas e parcerias locais

export default function ComunidadesPage() {
  const projetos = [
    {
      nome: "Oficinas de Leitura",
      categoria: "Educação",
      publico: "Crianças e Adolescentes",
      participantes: 120,
      descricao: "Programa de incentivo à leitura com foco na literatura argentina e latino-americana.",
      atividades: ["Círculos de leitura", "Contação de histórias", "Criação literária"],
      frequencia: "Semanal",
      local: "Biblioteca do Museu",
      cor: "blue",
      icone: BookOpen
    },
    {
      nome: "Arte e Cultura Popular",
      categoria: "Arte",
      publico: "Adultos e Idosos",
      participantes: 85,
      descricao: "Workshops de arte tradicional argentina, incluindo pintura, cerâmica e artesanato.",
      atividades: ["Pintura em tela", "Cerâmica", "Artesanato tradicional"],
      frequencia: "Quinzenal",
      local: "Ateliê Comunitário",
      cor: "purple",
      icone: Palette
    },
    {
      nome: "Música e Tradição",
      categoria: "Música",
      publico: "Todas as Idades",
      participantes: 95,
      descricao: "Ensino de instrumentos tradicionais e formação de grupos musicais comunitários.",
      atividades: ["Aulas de violão", "Coro comunitário", "Apresentações públicas"],
      frequencia: "Bi-semanal",
      local: "Auditório do Museu",
      cor: "green",
      icone: Music
    },
    {
      nome: "Memória Fotográfica",
      categoria: "Documentação",
      publico: "Jovens e Adultos",
      participantes: 60,
      descricao: "Projeto de documentação da história local através da fotografia comunitária.",
      atividades: ["Oficinas de fotografia", "Arquivo histórico", "Exposições"],
      frequencia: "Mensal",
      local: "Laboratório de Imagem",
      cor: "orange",
      icone: Camera
    }
  ]

  const impactos = [
    {
      numero: "360+",
      label: "Participantes Ativos",
      icone: Users,
      cor: "blue"
    },
    {
      numero: "15",
      label: "Comunidades Atendidas",
      icone: Globe,
      cor: "green"
    },
    {
      numero: "50+",
      label: "Workshops Realizados",
      icone: Target,
      cor: "purple"
    },
    {
      numero: "8",
      label: "Prêmios Recebidos",
      icone: Award,
      cor: "orange"
    }
  ]

  const parcerias = [
    {
      nome: "Escola Municipal San Martín",
      tipo: "Educacional",
      atividade: "Programa de leitura para estudantes"
    },
    {
      nome: "Centro Comunitário Bairro Norte",
      tipo: "Social",
      atividade: "Oficinas de arte para terceira idade"
    },
    {
      nome: "Associação Cultural Borges",
      tipo: "Cultural",
      atividade: "Eventos literários e musicais"
    },
    {
      nome: "Biblioteca Popular Central",
      tipo: "Educacional",
      atividade: "Intercâmbio de acervos e atividades"
    }
  ]

  const getCorClasses = (cor: string) => {
    const cores = {
      blue: "border-blue-200 hover:border-blue-300 hover:shadow-blue-100",
      purple: "border-purple-200 hover:border-purple-300 hover:shadow-purple-100",
      green: "border-green-200 hover:border-green-300 hover:shadow-green-100",
      orange: "border-orange-200 hover:border-orange-300 hover:shadow-orange-100"
    }
    return cores[cor as keyof typeof cores] || cores.blue
  }

  const getBadgeClasses = (cor: string) => {
    const cores = {
      blue: "bg-blue-100 text-blue-800",
      purple: "bg-purple-100 text-purple-800",
      green: "bg-green-100 text-green-800",
      orange: "bg-orange-100 text-orange-800"
    }
    return cores[cor as keyof typeof cores] || cores.blue
  }

  return (      <ContentPage
        title="Comunidades"
        subtitle="Projetos Sociais e Culturais"
        backgroundImage="/images/fundo4.jpg"
      >
        <div className="space-y-12">
          {/* Introdução */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none text-center"
          >
            <p className="text-xl leading-relaxed text-gray-700 mb-8">
              O Museu Casa Borges acredita que a cultura deve ser acessível a todos. 
              Através de nossos projetos comunitários, levamos arte, literatura e 
              educação para diferentes grupos sociais, fortalecendo os laços entre 
              o museu e a comunidade local.
            </p>
          </motion.section>

          {/* Impactos */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {impactos.map((impacto, index) => (
                <motion.div
                  key={impacto.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`text-center ${getCorClasses(impacto.cor)}`}>
                    <CardContent className="p-6">
                      <impacto.icone className={`h-8 w-8 mx-auto mb-3 text-${impacto.cor}-600`} />
                      <div className={`text-3xl font-bold text-${impacto.cor}-600 mb-1`}>
                        {impacto.numero}
                      </div>
                      <div className="text-sm text-gray-600">{impacto.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Projetos Ativos */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Projetos Ativos</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Conheça nossos programas em andamento que atendem diferentes faixas etárias 
                e interesses, sempre com foco na inclusão e no desenvolvimento cultural.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {projetos.map((projeto, index) => (
                <motion.div
                  key={projeto.nome}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className={`h-full transition-all duration-300 ${getCorClasses(projeto.cor)} hover:shadow-lg`}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-${projeto.cor}-100`}>
                            <projeto.icone className={`h-5 w-5 text-${projeto.cor}-600`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{projeto.nome}</CardTitle>
                            <CardDescription>{projeto.categoria}</CardDescription>
                          </div>
                        </div>
                        <Badge className={getBadgeClasses(projeto.cor)}>
                          {projeto.participantes} pessoas
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        {projeto.descricao}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="font-semibold">Público:</span>
                          </div>
                          <p className="text-gray-600">{projeto.publico}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="font-semibold">Frequência:</span>
                          </div>
                          <p className="text-gray-600">{projeto.frequencia}</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="font-semibold text-sm">Local:</span>
                        </div>
                        <p className="text-gray-600 text-sm">{projeto.local}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Atividades:</h4>
                        <div className="flex flex-wrap gap-2">
                          {projeto.atividades.map((atividade) => (
                            <Badge key={atividade} variant="secondary" className="text-xs">
                              {atividade}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <Link href="/contato">
                          <Button className="w-full group">
                            Participar do Projeto
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Parcerias */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Parcerias Comunitárias
                </CardTitle>
                <CardDescription className="text-center">
                  Trabalhamos em conjunto com organizações locais para ampliar nosso impacto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {parcerias.map((parceria, index) => (
                    <motion.div
                      key={parceria.nome}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-white rounded-lg border"
                    >
                      <Heart className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">{parceria.nome}</h4>
                        <Badge variant="outline" className="text-xs mb-2">
                          {parceria.tipo}
                        </Badge>
                        <p className="text-sm text-gray-600">{parceria.atividade}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Como Participar */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Como Participar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-2">1. Inscreva-se</h4>
                    <p className="text-sm text-gray-600">
                      Entre em contato conosco para se inscrever nos projetos de seu interesse
                    </p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">2. Participe</h4>
                    <p className="text-sm text-gray-600">
                      Compareça às atividades programadas e faça parte da nossa comunidade
                    </p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold mb-2">3. Compartilhe</h4>
                    <p className="text-sm text-gray-600">
                      Ajude a divulgar nossos projetos e traga mais pessoas para participar
                    </p>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <Link href="/contato">
                    <Button size="lg">
                      <Users className="h-4 w-4 mr-2" />
                      Entrar em Contato
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Créditos */}
          <AuthorCredit 
            author="Departamento de Ação Social - Museu Casa Borges"
            date="2024"
            description="Informações sobre projetos comunitários em andamento"
          />
        </div>
      </ContentPage>  )
}
