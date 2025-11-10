'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  Instagram,
  Facebook
} from 'lucide-react'

/**
 * AIDEV-NOTE: Página de Contato do Museu Casa Borges
 * Inclui formulário de contato, informações de localização e redes sociais
 * Formulário com validação básica e animações
 */
export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      assunto: '',
      mensagem: ''
    })
    setIsSubmitting(false)
  }

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
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Formulário de Contato */}
              <motion.div variants={cardVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-800">
                      Envie sua Mensagem
                    </CardTitle>
                    <CardDescription>
                      Preencha o formulário abaixo e entraremos em contato em breve
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                            Nome Completo *
                          </label>
                          <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--museu-red)] focus:border-transparent transition-all duration-200"
                            placeholder="Seu nome completo"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            E-mail *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--museu-red)] focus:border-transparent transition-all duration-200"
                            placeholder="seu@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                            Telefone
                          </label>
                          <input
                            type="tel"
                            id="telefone"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--museu-red)] focus:border-transparent transition-all duration-200"
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                        <div>
                          <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">
                            Assunto *
                          </label>
                          <select
                            id="assunto"
                            name="assunto"
                            value={formData.assunto}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--museu-red)] focus:border-transparent transition-all duration-200"
                          >
                            <option value="">Selecione um assunto</option>
                            <option value="visita">Informações sobre Visita</option>
                            <option value="agendamento">Agendamento de Grupo</option>
                            <option value="exposicoes">Exposições</option>
                            <option value="educativo">Programa Educativo</option>
                            <option value="eventos">Eventos</option>
                            <option value="outros">Outros</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                          Mensagem *
                        </label>
                        <textarea
                          id="mensagem"
                          name="mensagem"
                          value={formData.mensagem}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--museu-red)] focus:border-transparent transition-all duration-200 resize-vertical"
                          placeholder="Digite sua mensagem aqui..."
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-[var(--museu-red)] hover:bg-red-700 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Enviando...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Send className="w-4 h-4 mr-2" />
                            Enviar Mensagem
                          </div>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Informações de Contato */}
              <motion.div variants={cardVariants} className="space-y-6">
                {/* Informações Gerais */}
                <Card>
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
                        <p className="text-gray-600">(11) 1234-5678</p>
                        <p className="text-sm text-gray-500">Segunda a Sexta, 9h às 17h</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[var(--museu-red)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-[var(--museu-red)]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">E-mail</h4>
                        <p className="text-gray-600">contato@museucasaborges.com.br</p>
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
                          Rua Principal, 123<br />
                          Centro Histórico<br />
                          CEP: 12345-678
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Horários */}
                <Card>
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
                        <span className="font-medium text-green-600">9h às 16h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Domingo</span>
                        <span className="font-medium text-green-600">10h às 15h</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Redes Sociais */}
                <Card>
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
              className="bg-gray-300 rounded-lg h-96 flex items-center justify-center"
            >
              <div className="text-center text-gray-600">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-medium">Mapa Interativo</p>
                <p className="text-sm">Integração com Google Maps em breve</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
  )
}
