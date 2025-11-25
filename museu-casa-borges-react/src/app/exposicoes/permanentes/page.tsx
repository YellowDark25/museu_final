"use client"
import { Metadata } from 'next'
import ContentPage from '@/components/content/ContentPage'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Clock, MapPin, Users, Camera } from 'lucide-react'
import Image from 'next/image'

// metadata removido neste componente client

// AIDEV-NOTE: Página de exposições permanentes com informações detalhadas sobre cada exposição fixa
// Utiliza componentes reutilizáveis e animações para criar uma experiência envolvente
export default function ExposicoesPermanentes() {
  const exposicoesPermanentes = [
    {
      id: 1,
      titulo: "Jorge Luis Borges: Vida e Obra",
      descricao: "Uma jornada pela vida e obra do grande escritor argentino, desde seus primeiros escritos até suas obras mais conhecidas.",
      localizacao: "Sala Principal",
      duracao: "45-60 minutos",
      capacidade: "30 pessoas",
      destaque: true,
      imagem: "/images/fundo1.jpg",
      detalhes: [
        "Manuscritos originais",
        "Primeiras edições",
        "Fotografias pessoais",
        "Objetos pessoais",
        "Linha do tempo interativa"
      ]
    },
    {
      id: 2,
      titulo: "Literatura Argentina Contemporânea",
      descricao: "Panorama da literatura argentina do século XX, com foco nos movimentos literários e autores influenciados por Borges.",
      localizacao: "Sala Secundária",
      duracao: "30-45 minutos",
      capacidade: "25 pessoas",
      destaque: false,
      imagem: "/images/fundo2.jpg",
      detalhes: [
        "Obras de contemporâneos",
        "Movimentos literários",
        "Influências e legado",
        "Crítica literária",
        "Documentos históricos"
      ]
    },
    {
      id: 3,
      titulo: "O Universo Borgiano",
      descricao: "Exploração dos temas recorrentes na obra de Borges: labirintos, espelhos, bibliotecas e o infinito.",
      localizacao: "Sala Temática",
      duracao: "40-50 minutos",
      capacidade: "20 pessoas",
      destaque: true,
      imagem: "/images/fundo3.jpg",
      detalhes: [
        "Instalação interativa",
        "Labirinto literário",
        "Biblioteca infinita",
        "Espelhos conceituais",
        "Experiência imersiva"
      ]
    },
    {
      id: 4,
      titulo: "Patrimônio Cultural Argentino",
      descricao: "A importância da preservação do patrimônio cultural argentino e o papel da literatura na identidade nacional.",
      localizacao: "Galeria Cultural",
      duracao: "35-40 minutos",
      capacidade: "40 pessoas",
      destaque: false,
      imagem: "/images/fundo4.jpg",
      detalhes: [
        "História cultural",
        "Preservação patrimonial",
        "Identidade nacional",
        "Documentos históricos",
        "Multimídia interativa"
      ]
    }
  ]

  return (      <ContentPage
        title="Exposições Permanentes"
        subtitle="Descubra as exposições fixas que contam a história de Jorge Luis Borges e da literatura argentina"
        backgroundImage="/images/fundo1.jpg"
      >
        <div className="space-y-12">
          {/* Introdução */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nossas exposições permanentes oferecem uma visão abrangente da vida e obra de Jorge Luis Borges, 
              bem como do contexto cultural e literário que o influenciou. Cada exposição foi cuidadosamente 
              curada para proporcionar uma experiência educativa e inspiradora.
            </p>
          </motion.div>

          {/* Grid de Exposições */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {exposicoesPermanentes.map((exposicao, index) => (
              <motion.div
                key={exposicao.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`h-full transition-all duration-300 hover:shadow-xl ${
                  exposicao.destaque ? 'ring-2 ring-primary/20' : ''
                }`}>
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={exposicao.imagem}
                      alt={exposicao.titulo}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {exposicao.destaque && (
                      <Badge className="absolute top-4 right-4 bg-primary">
                        Destaque
                      </Badge>
                    )}
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{exposicao.titulo}</CardTitle>
                    <CardDescription className="text-base">
                      {exposicao.descricao}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Informações Práticas */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{exposicao.localizacao}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{exposicao.duracao}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{exposicao.capacidade}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Camera className="h-4 w-4 text-primary" />
                        <span>Fotos permitidas</span>
                      </div>
                    </div>

                    {/* Destaques da Exposição */}
                    <div>
                      <h4 className="font-semibold mb-2">Destaques:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {exposicao.detalhes.map((detalhe, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {detalhe}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full" variant="outline">
                      Saiba Mais
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Informações Adicionais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-muted/50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-4">Informações Importantes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Horários de Funcionamento</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Terça a Sexta: 9h às 17h</li>
                  <li>Sábados: 10h às 18h</li>
                  <li>Domingos: 10h às 16h</li>
                  <li>Fechado às segundas-feiras</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Visitas Guiadas</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Disponíveis em português e espanhol</li>
                  <li>Agendamento recomendado</li>
                  <li>Grupos de até 15 pessoas</li>
                  <li>Duração: 90 minutos</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </ContentPage>  )
}
