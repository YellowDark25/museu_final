'use client'

import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { getMuseumGoogleMapsUrl } from '@/config/museum-location'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  ExternalLink,
} from 'lucide-react'

const LocationMap = dynamic(() => import('@/components/maps/LocationMap'), {
  ssr: false,
  loading: () => (
    <motion.div className="flex h-96 animate-pulse items-center justify-center rounded-lg bg-gray-200">
      <p className="text-gray-600">Carregando mapa...</p>
    </motion.div>
  ),
})

/**
 * AIDEV-NOTE: Página de Contato do Museu Casa Borges
 * Inclui formulário de contato, informações de localização e redes sociais
 * Formulário com validação básica e animações
 */
export default function ContatoPage() {
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

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
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
              Entre em Contato
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Estamos aqui para ajudar! Entre em contato conosco para dúvidas, agendamentos ou sugestões
            </motion.p>
          </div>
        </section>

        {/* Conteúdo Principal */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Informações de Contato */}
              <motion.div variants={cardVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-800">
                      Informações de Contato
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[var(--museu-red)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-[var(--museu-red)]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Telefone</h4>
                        <p className="text-gray-600">(65) 3123-4567</p>
                        <p className="text-sm text-gray-500">Terça a Sexta, 8h - 11:30h e 13:30h - 17h</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[var(--museu-red)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-[var(--museu-red)]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">E-mail</h4>
                        <p className="text-gray-600">museucasaborges@unemat.br</p>
                        <p className="text-sm text-gray-500">Respondemos em até 24 horas</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[var(--museu-red)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-[var(--museu-red)]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Endereço</h4>
                        <p className="text-gray-600">
                          R. Voluntários da Pátria, 80<br />
                          São Sebastião<br />
                          Barra do Bugres - MT, 78390-000
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Horários */}
              <motion.div variants={cardVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl text-gray-800">
                      <Clock className="w-6 h-6 mr-3 text-[var(--museu-red)]" />
                      Horários de Funcionamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Segunda-feira</span>
                        <span className="font-medium text-red-600">Fechado</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Terça a Sexta</span>
                        <span className="font-medium text-green-600">9h às 17h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sábado</span>
                        <span className="font-medium text-red-600">Fechado</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Domingo</span>
                        <span className="font-medium text-red-600">Fechado</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Redes Sociais */}
              <motion.div variants={cardVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">
                      Siga-nos nas Redes Sociais
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      <a
                        href="https://instagram.com/museucasaborges"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:scale-110 transition-transform duration-200"
                      >
                        <Instagram className="w-6 h-6" />
                      </a>
                      <a
                        href="https://facebook.com/museucasaborges"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform duration-200"
                      >
                        <Facebook className="w-6 h-6" />
                      </a>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      Acompanhe nossas novidades, exposições e eventos especiais
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Mapa */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Nossa Localização
              </h2>
              <p className="text-lg text-gray-600">
                Estamos localizados no coração do centro histórico
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <LocationMap />
              <motion.div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-sm text-gray-500">
                  Mapa por{' '}
                  <a
                    href="https://www.openstreetmap.org/copyright"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-gray-700"
                  >
                    OpenStreetMap
                  </a>
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-[var(--museu-red)] text-[var(--museu-red)] hover:bg-[var(--museu-red)] hover:text-white"
                >
                  <a
                    href={getMuseumGoogleMapsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Abrir no Google Maps
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
  )
}
