'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Users, GraduationCap, Target, Award, Download, Calendar, Clock } from 'lucide-react'
import Image from 'next/image'

export default function EducativoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* AIDEV-NOTE: Hero section com foco no setor educativo */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="/images/fundo2.jpg"
          alt="Setor Educativo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl font-bold mb-4">Setor Educativo</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Transformando conhecimento em experiência através da educação patrimonial
            </p>
            <Badge className="mt-4 bg-blue-600 hover:bg-blue-700">
              Educação de Qualidade
            </Badge>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* AIDEV-NOTE: Estatísticas do setor educativo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <GraduationCap className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">Estudantes/Ano</p>
              <p className="text-2xl font-bold text-blue-600">2.500+</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">Professores</p>
              <p className="text-2xl font-bold text-blue-600">150+</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">Programas</p>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Award className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">Satisfação</p>
              <p className="text-2xl font-bold text-blue-600">98%</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* AIDEV-NOTE: Conteúdo principal organizado em tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="programas" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="programas">Programas</TabsTrigger>
              <TabsTrigger value="visitas">Visitas</TabsTrigger>
              <TabsTrigger value="recursos">Recursos</TabsTrigger>
              <TabsTrigger value="formacao">Formação</TabsTrigger>
            </TabsList>

            <TabsContent value="programas" className="mt-6">
              <div className="space-y-6">
                {/* AIDEV-NOTE: Programas educativos por faixa etária */}
                <Card>
                  <CardHeader>
                    <CardTitle>Programas por Faixa Etária</CardTitle>
                    <CardDescription>
                      Atividades pedagógicas adaptadas para cada idade
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <BookOpen className="h-8 w-8 text-blue-600" />
                          </div>
                          <h3 className="text-lg font-semibold">Pequenos Exploradores</h3>
                          <Badge variant="outline">4-6 anos</Badge>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li>• Contação de histórias adaptadas</li>
                          <li>• Atividades lúdicas e sensoriais</li>
                          <li>• Oficinas de arte e criatividade</li>
                          <li>• Jogos educativos temáticos</li>
                        </ul>
                        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                          Agendar Visita
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <GraduationCap className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold">Jovens Descobridores</h3>
                          <Badge variant="outline">7-11 anos</Badge>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li>• Visitas temáticas interativas</li>
                          <li>• Oficinas de escrita criativa</li>
                          <li>• Caça ao tesouro literário</li>
                          <li>• Projeto "Meu Primeiro Livro"</li>
                        </ul>
                        <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                          Agendar Visita
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Target className="h-8 w-8 text-purple-600" />
                          </div>
                          <h3 className="text-lg font-semibold">Adolescentes Críticos</h3>
                          <Badge variant="outline">12-17 anos</Badge>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li>• Debates sobre literatura contemporânea</li>
                          <li>• Oficinas de análise crítica</li>
                          <li>• Projeto "Jovens Curadores"</li>
                          <li>• Saraus e apresentações</li>
                        </ul>
                        <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                          Agendar Visita
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>

                {/* AIDEV-NOTE: Programas especiais */}
                <Card>
                  <CardHeader>
                    <CardTitle>Programas Especiais</CardTitle>
                    <CardDescription>
                      Iniciativas diferenciadas para públicos específicos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h3 className="font-semibold">Inclusão e Acessibilidade</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Programas adaptados para pessoas com deficiência
                          </p>
                          <div className="flex gap-2">
                            <Badge variant="outline">Libras</Badge>
                            <Badge variant="outline">Braille</Badge>
                            <Badge variant="outline">Audiodescrição</Badge>
                          </div>
                        </div>
                        
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h3 className="font-semibold">Terceira Idade</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Atividades especiais para grupos da melhor idade
                          </p>
                          <div className="flex gap-2">
                            <Badge variant="outline">Memórias</Badge>
                            <Badge variant="outline">Nostalgia</Badge>
                            <Badge variant="outline">Socialização</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h3 className="font-semibold">Famílias</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Atividades para toda a família participar juntas
                          </p>
                          <div className="flex gap-2">
                            <Badge variant="outline">Intergeracional</Badge>
                            <Badge variant="outline">Lúdico</Badge>
                            <Badge variant="outline">Colaborativo</Badge>
                          </div>
                        </div>
                        
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h3 className="font-semibold">Comunidade Local</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Parcerias com organizações e grupos comunitários
                          </p>
                          <div className="flex gap-2">
                            <Badge variant="outline">Parcerias</Badge>
                            <Badge variant="outline">Gratuito</Badge>
                            <Badge variant="outline">Territorial</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="visitas" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Modalidades de Visita</CardTitle>
                    <CardDescription>
                      Diferentes formatos para atender às necessidades pedagógicas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Visitas Guiadas</h3>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Visita Padrão (1h30)
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Percurso completo pelas exposições permanentes com mediação educativa
                            </p>
                            <Badge className="mt-2">Até 30 pessoas</Badge>
                          </div>
                          
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Visita Temática (2h)
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Foco em temas específicos como "Borges e o Infinito" ou "Literatura Argentina"
                            </p>
                            <Badge className="mt-2">Até 25 pessoas</Badge>
                          </div>
                          
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Visita Dramatizada (1h45)
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Encenações e performances durante o percurso museológico
                            </p>
                            <Badge className="mt-2">Até 20 pessoas</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Atividades Complementares</h3>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold">Oficinas Práticas</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Atividades hands-on relacionadas aos conteúdos da visita
                            </p>
                            <div className="flex gap-1 mt-2">
                              <Badge variant="outline" className="text-xs">Escrita</Badge>
                              <Badge variant="outline" className="text-xs">Arte</Badge>
                              <Badge variant="outline" className="text-xs">Teatro</Badge>
                            </div>
                          </div>
                          
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold">Debates e Reflexões</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Discussões mediadas sobre temas contemporâneos
                            </p>
                            <div className="flex gap-1 mt-2">
                              <Badge variant="outline" className="text-xs">Crítico</Badge>
                              <Badge variant="outline" className="text-xs">Reflexivo</Badge>
                              <Badge variant="outline" className="text-xs">Participativo</Badge>
                            </div>
                          </div>
                          
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold">Produção de Conteúdo</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Criação de materiais pelos próprios estudantes
                            </p>
                            <div className="flex gap-1 mt-2">
                              <Badge variant="outline" className="text-xs">Vídeo</Badge>
                              <Badge variant="outline" className="text-xs">Podcast</Badge>
                              <Badge variant="outline" className="text-xs">Blog</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Como Agendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-blue-600 font-bold">1</span>
                        </div>
                        <h3 className="font-semibold mb-2">Contato Inicial</h3>
                        <p className="text-sm text-muted-foreground">
                          Entre em contato pelo telefone ou e-mail com pelo menos 15 dias de antecedência
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-blue-600 font-bold">2</span>
                        </div>
                        <h3 className="font-semibold mb-2">Planejamento</h3>
                        <p className="text-sm text-muted-foreground">
                          Nossa equipe ajudará a definir o melhor formato de acordo com seus objetivos
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-blue-600 font-bold">3</span>
                        </div>
                        <h3 className="font-semibold mb-2">Confirmação</h3>
                        <p className="text-sm text-muted-foreground">
                          Receba a confirmação com todas as informações da sua visita educativa
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Informações Importantes:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Visitas gratuitas para escolas públicas</li>
                        <li>• Desconto especial para escolas particulares</li>
                        <li>• Material didático complementar disponível</li>
                        <li>• Acompanhamento pós-visita opcional</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recursos" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recursos Educativos</CardTitle>
                    <CardDescription>
                      Materiais gratuitos para professores e estudantes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <Download className="h-8 w-8 text-blue-600 mb-3" />
                        <h3 className="font-semibold mb-2">Guias Didáticos</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Material completo para preparação e acompanhamento das visitas
                        </p>
                        <Button variant="outline" className="w-full">
                          Download PDF
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <BookOpen className="h-8 w-8 text-blue-600 mb-3" />
                        <h3 className="font-semibold mb-2">Atividades Pré-Visita</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Exercícios e dinâmicas para preparar os estudantes
                        </p>
                        <Button variant="outline" className="w-full">
                          Acessar Material
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <Target className="h-8 w-8 text-blue-600 mb-3" />
                        <h3 className="font-semibold mb-2">Atividades Pós-Visita</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Propostas para continuidade do aprendizado em sala
                        </p>
                        <Button variant="outline" className="w-full">
                          Ver Sugestões
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <Users className="h-8 w-8 text-blue-600 mb-3" />
                        <h3 className="font-semibold mb-2">Jogos Educativos</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Atividades lúdicas para diferentes faixas etárias
                        </p>
                        <Button variant="outline" className="w-full">
                          Baixar Jogos
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <Calendar className="h-8 w-8 text-blue-600 mb-3" />
                        <h3 className="font-semibold mb-2">Cronograma Anual</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Planejamento de atividades para o ano letivo
                        </p>
                        <Button variant="outline" className="w-full">
                          Ver Cronograma
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <Award className="h-8 w-8 text-blue-600 mb-3" />
                        <h3 className="font-semibold mb-2">Certificados</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Certificação para professores e estudantes participantes
                        </p>
                        <Button variant="outline" className="w-full">
                          Solicitar
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="formacao" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Formação Continuada</CardTitle>
                    <CardDescription>
                      Capacitação para educadores e profissionais da área
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border-l-4 border-blue-500 pl-6">
                        <h3 className="text-xl font-semibold mb-2">Curso de Educação Patrimonial</h3>
                        <p className="text-muted-foreground mb-3">
                          Programa de 40 horas com certificação, abordando metodologias 
                          inovadoras para o ensino em espaços museais.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-semibold">Módulos:</h4>
                            <ul className="text-sm space-y-1 mt-2">
                              <li>• Fundamentos da Educação Patrimonial</li>
                              <li>• Metodologias Ativas em Museus</li>
                              <li>• Tecnologias Educacionais</li>
                              <li>• Avaliação e Acompanhamento</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold">Informações:</h4>
                            <ul className="text-sm space-y-1 mt-2">
                              <li>• Duração: 8 semanas</li>
                              <li>• Modalidade: Híbrida</li>
                              <li>• Vagas: 30 por turma</li>
                              <li>• Investimento: R$ 150,00</li>
                            </ul>
                          </div>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Inscrever-se
                        </Button>
                      </div>
                      
                      <div className="border-l-4 border-green-500 pl-6">
                        <h3 className="text-xl font-semibold mb-2">Workshop de Mediação Cultural</h3>
                        <p className="text-muted-foreground mb-3">
                          Capacitação intensiva para desenvolvimento de habilidades 
                          de mediação e comunicação em espaços culturais.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-semibold">Conteúdo:</h4>
                            <ul className="text-sm space-y-1 mt-2">
                              <li>• Técnicas de Comunicação</li>
                              <li>• Gestão de Grupos</li>
                              <li>• Adaptação de Linguagem</li>
                              <li>• Prática Supervisionada</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold">Detalhes:</h4>
                            <ul className="text-sm space-y-1 mt-2">
                              <li>• Duração: 16 horas</li>
                              <li>• Modalidade: Presencial</li>
                              <li>• Vagas: 20 por turma</li>
                              <li>• Investimento: R$ 80,00</li>
                            </ul>
                          </div>
                        </div>
                        <Button className="bg-green-600 hover:bg-green-700">
                          Inscrever-se
                        </Button>
                      </div>
                      
                      <div className="border-l-4 border-purple-500 pl-6">
                        <h3 className="text-xl font-semibold mb-2">Grupo de Estudos Mensal</h3>
                        <p className="text-muted-foreground mb-3">
                          Encontros mensais para discussão de práticas educativas, 
                          troca de experiências e atualização profissional.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-semibold">Formato:</h4>
                            <ul className="text-sm space-y-1 mt-2">
                              <li>• Apresentações de casos</li>
                              <li>• Debates temáticos</li>
                              <li>• Oficinas práticas</li>
                              <li>• Networking profissional</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold">Participação:</h4>
                            <ul className="text-sm space-y-1 mt-2">
                              <li>• Terceira sexta do mês</li>
                              <li>• 19h às 21h</li>
                              <li>• Aberto a todos</li>
                              <li>• Gratuito</li>
                            </ul>
                          </div>
                        </div>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          Participar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* AIDEV-NOTE: Call to action para contato do setor educativo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Transforme sua Visita em Aprendizado
              </h2>
              <p className="mb-6">
                Entre em contato com nosso setor educativo e descubra como podemos 
                enriquecer a experiência educativa dos seus estudantes
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Agendar Visita
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Baixar Materiais
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
