'use client'

import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Car, 
  Bus, 
  Wheelchair, 
  Users, 
  Camera, 
  Coffee,
  Gift,
  Info
} from 'lucide-react'
import Link from 'next/link'

/**
 * AIDEV-NOTE: Página de Informações para Visitantes
 * Contém horários, localização, acessibilidade e serviços disponíveis
 * Layout responsivo com cards informativos e animações
 */
export default function VisitaPage() {
  const horarios = [
    { dia: "Segunda-feira", horario: "Fechado" },
    { dia: "Terça a Sexta", horario: "9h às 17h" },
    { dia: "Sábado", horario: "9h às 16h" },
    { dia: "Domingo", horario: "10h às 15h" },
    { dia: "Feriados", horario: "Consulte nossa agenda" }
  ]

  const ingressos = [
    { tipo: "Entrada Geral", preco: "R$ 10,00", descricao: "Acesso a todas as exposições permanentes" },
    { tipo: "Estudantes", preco: "R$ 5,00", descricao: "Mediante apresentação de carteirinha" },
    { tipo: "Idosos (60+)", preco: "R$ 5,00", descricao: "Mediante apresentação de documento" },
    { tipo: "Crianças até 12 anos", preco: "Gratuito", descricao: "Acompanhadas de responsável" },
    { tipo: "Grupos (10+ pessoas)", preco: "R$ 8,00", descricao: "Agendamento obrigatório" }
  ]

  const servicos = [
    {
      icon: <Wheelchair className="w-6 h-6" />,
      titulo: "Acessibilidade",
      descricao: "Rampas de acesso, elevador e banheiros adaptados"
    },
    {
      icon: <Users className="w-6 h-6" />,
      titulo: "Visitas Guiadas",
      descricao: "Agendamento para grupos escolares e turísticos"
    },
    {
      icon: <Camera className="w-6 h-6" />,
      titulo: "Fotografia",
      descricao: "Permitida nas áreas comuns (sem flash)"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      titulo: "Café do Museu",
      descricao: "Espaço para lanche e descanso"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      titulo: "Loja do Museu",
      descricao: "Souvenirs, livros e produtos locais"
    },
    {
      icon: <Info className="w-6 h-6" />,
      titulo: "Audioguia",
      descricao: "Disponível em português e inglês"
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
              Planeje sua Visita
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Todas as informações que você precisa para aproveitar ao máximo sua experiência no museu
            </motion.p>
          </div>
        </section>

        {/* Informações Básicas */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Horários */}
              <motion.div variants={cardVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl text-gray-800">
                      <Clock className="w-6 h-6 mr-3 text-[var(--museu-red)]" />
                      Horários de Funcionamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {horarios.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <span className="font-medium text-gray-700">{item.dia}</span>
                          <span className={`font-semibold ${item.horario === 'Fechado' ? 'text-red-600' : 'text-green-600'}`}>
                            {item.horario}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Importante:</strong> A última entrada é permitida 30 minutos antes do fechamento.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Localização */}
              <motion.div variants={cardVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl text-gray-800">
                      <MapPin className="w-6 h-6 mr-3 text-[var(--museu-red)]" />
                      Como Chegar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Endereço</h4>
                      <p className="text-gray-600">
                        Rua Principal, 123<br />
                        Centro Histórico<br />
                        CEP: 12345-678
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Car className="w-5 h-5 mr-3 mt-1 text-[var(--museu-red)]" />
                        <div>
                          <h5 className="font-medium text-gray-800">De Carro</h5>
                          <p className="text-sm text-gray-600">Estacionamento gratuito disponível</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Bus className="w-5 h-5 mr-3 mt-1 text-[var(--museu-red)]" />
                        <div>
                          <h5 className="font-medium text-gray-800">Transporte Público</h5>
                          <p className="text-sm text-gray-600">Linhas 10, 15 e 22 - Ponto Centro</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button className="w-full bg-[var(--museu-red)] hover:bg-red-700">
                        Ver no Google Maps
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Ingressos */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Ingressos e Valores
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Confira nossos valores e descontos especiais
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {ingressos.map((ingresso, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="text-center">
                      <CardTitle className="text-xl text-gray-800">
                        {ingresso.tipo}
                      </CardTitle>
                      <div className="text-3xl font-bold text-[var(--museu-red)]">
                        {ingresso.preco}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-center">
                        {ingresso.descricao}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Serviços */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Serviços Disponíveis
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Conheça os serviços que oferecemos para tornar sua visita ainda melhor
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {servicos.map((servico, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 text-center">
                    <CardHeader>
                      <div className="w-16 h-16 bg-[var(--museu-red)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="text-[var(--museu-red)]">
                          {servico.icon}
                        </div>
                      </div>
                      <CardTitle className="text-xl text-gray-800">
                        {servico.titulo}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        {servico.descricao}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contato */}
        <section className="py-16 bg-[var(--museu-red)]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Precisa de Mais Informações?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Entre em contato conosco para agendamentos, visitas guiadas ou dúvidas
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-8">
                <div className="flex items-center justify-center text-white">
                  <Phone className="w-6 h-6 mr-3" />
                  <span className="text-lg">(11) 1234-5678</span>
                </div>
                <div className="flex items-center justify-center text-white">
                  <Mail className="w-6 h-6 mr-3" />
                  <span className="text-lg">contato@museucasaborges.com.br</span>
                </div>
              </div>

              <Button 
                asChild
                size="lg"
                className="bg-white text-[var(--museu-red)] hover:bg-gray-100"
              >
                <Link href="/contato">
                  Entre em Contato
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>  )
}
