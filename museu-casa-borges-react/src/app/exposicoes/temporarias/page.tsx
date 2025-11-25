'use client'
import { Metadata } from 'next'
import ContentPage from '@/components/content/ContentPage'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, Ticket } from 'lucide-react'
import Image from 'next/image'

// Metadata removida para compatibilidade com Client Component

// AIDEV-NOTE: Página de exposições temporárias com informações sobre mostras atuais e futuras
// Inclui sistema de status (em cartaz, próximas, encerradas) e informações detalhadas
export default function ExposicoesTemporarias() {
  const exposicoesTemporarias = [
    {
      id: 1,
      titulo: "Borges e o Cinema: Diálogos Impossíveis",
      descricao: "Uma exploração das relações entre a obra de Borges e a linguagem cinematográfica, mostrando como seus contos influenciaram diretores ao redor do mundo.",
      dataInicio: "2024-01-15",
      dataFim: "2024-04-30",
      status: "em_cartaz",
      localizacao: "Galeria Temporária A",
      preco: "R$ 15,00",
      capacidade: "50 pessoas",
      imagem: "/images/fundo1.jpg",
      curador: "Dr. María Elena Vázquez",
      detalhes: [
        "Storyboards de filmes inspirados em Borges",
        "Entrevistas com diretores",
        "Projeções de curtas-metragens",
        "Análises comparativas",
        "Sessões de cinema temáticas"
      ]
    },
    {
      id: 2,
      titulo: "Labirintos Literários: Borges e seus Contemporâneos",
      descricao: "Uma mostra que conecta a obra de Borges com outros grandes escritores de sua época, explorando influências mútuas e diálogos literários.",
      dataInicio: "2024-02-01",
      dataFim: "2024-05-15",
      status: "em_cartaz",
      localizacao: "Galeria Temporária B",
      preco: "R$ 12,00",
      capacidade: "40 pessoas",
      imagem: "/images/fundo2.jpg",
      curador: "Prof. Carlos Mendoza",
      detalhes: [
        "Correspondências entre autores",
        "Primeiras edições raras",
        "Fotografias históricas",
        "Documentos inéditos",
        "Mesa redonda com especialistas"
      ]
    },
    {
      id: 3,
      titulo: "O Aleph Digital: Borges na Era da Informação",
      descricao: "Como as ideias de Borges sobre bibliotecas infinitas e labirintos se relacionam com a internet e a era digital.",
      dataInicio: "2024-05-01",
      dataFim: "2024-08-30",
      status: "proxima",
      localizacao: "Espaço Multimídia",
      preco: "R$ 18,00",
      capacidade: "30 pessoas",
      imagem: "/images/fundo3.jpg",
      curador: "Dra. Ana Cristina Silva",
      detalhes: [
        "Instalações interativas",
        "Realidade virtual",
        "Arte digital",
        "Workshops de tecnologia",
        "Palestras sobre literatura digital"
      ]
    },
    {
      id: 4,
      titulo: "Memórias de Buenos Aires: A Cidade de Borges",
      descricao: "Uma retrospectiva da Buenos Aires que Borges conheceu e amou, através de fotografias, mapas e relatos históricos.",
      dataInicio: "2023-10-01",
      dataFim: "2024-01-31",
      status: "encerrada",
      localizacao: "Galeria Histórica",
      preco: "R$ 10,00",
      capacidade: "60 pessoas",
      imagem: "/images/fundo4.jpg",
      curador: "Prof. Roberto Fernández",
      detalhes: [
        "Fotografias históricas",
        "Mapas antigos da cidade",
        "Relatos de contemporâneos",
        "Objetos urbanos históricos",
        "Caminhadas temáticas"
      ]
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'em_cartaz':
        return <Badge className="bg-green-500">Em Cartaz</Badge>
      case 'proxima':
        return <Badge className="bg-blue-500">Próxima</Badge>
      case 'encerrada':
        return <Badge variant="secondary">Encerrada</Badge>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const exposicoesAtivas = exposicoesTemporarias.filter(exp => exp.status !== 'encerrada')
  const exposicoesEncerradas = exposicoesTemporarias.filter(exp => exp.status === 'encerrada')

  return (      <ContentPage
        title="Exposições Temporárias"
        subtitle="Descubra nossas mostras especiais que exploram diferentes aspectos da obra de Borges e da literatura mundial"
        backgroundImage="/images/fundo2.jpg"
      >
        <div className="space-y-12">
          {/* Exposições Ativas */}
          <section>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-8"
            >
              Em Cartaz e Próximas
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {exposicoesAtivas.map((exposicao, index) => (
                <motion.div
                  key={exposicao.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full transition-all duration-300 hover:shadow-xl">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={exposicao.imagem}
                        alt={exposicao.titulo}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-4 right-4">
                        {getStatusBadge(exposicao.status)}
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-xl">{exposicao.titulo}</CardTitle>
                      <CardDescription className="text-base">
                        {exposicao.descricao}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        Curadoria: {exposicao.curador}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Informações da Exposição */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{formatDate(exposicao.dataInicio)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{formatDate(exposicao.dataFim)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{exposicao.localizacao}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="h-4 w-4 text-primary" />
                          <span>{exposicao.preco}</span>
                        </div>
                      </div>

                      {/* Destaques */}
                      <div>
                        <h4 className="font-semibold mb-2">Destaques:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {exposicao.detalhes.slice(0, 3).map((detalhe, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {detalhe}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1" disabled={exposicao.status === 'proxima'}>
                          {exposicao.status === 'proxima' ? 'Em Breve' : 'Comprar Ingresso'}
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Saiba Mais
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Exposições Encerradas */}
          {exposicoesEncerradas.length > 0 && (
            <section>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl font-bold mb-8"
              >
                Exposições Encerradas
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exposicoesEncerradas.map((exposicao, index) => (
                  <motion.div
                    key={exposicao.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="transition-all duration-300 hover:shadow-lg opacity-75">
                      <div className="relative h-32 overflow-hidden rounded-t-lg">
                        <Image
                          src={exposicao.imagem}
                          alt={exposicao.titulo}
                          fill
                          className="object-cover grayscale"
                        />
                        <div className="absolute top-2 right-2">
                          {getStatusBadge(exposicao.status)}
                        </div>
                      </div>
                      
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{exposicao.titulo}</CardTitle>
                        <CardDescription className="text-sm">
                          {formatDate(exposicao.dataInicio)} - {formatDate(exposicao.dataFim)}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <Button variant="outline" size="sm" className="w-full">
                          Ver Arquivo
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-primary/5 rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Fique por Dentro</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Cadastre-se em nossa newsletter para receber informações sobre novas exposições, 
              eventos especiais e atividades culturais do Museu Casa Borges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
              />
              <Button>Cadastrar</Button>
            </div>
          </motion.div>
        </div>
      </ContentPage>  )
}
