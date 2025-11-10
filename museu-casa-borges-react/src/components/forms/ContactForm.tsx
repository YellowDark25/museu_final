'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Check, AlertCircle, User, Mail, MessageSquare, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

/**
 * AIDEV-NOTE: Componente ContactForm do Museu Casa Borges
 * Formulário de contato completo com validação e feedback
 * Implementa acessibilidade WCAG 2.1 AA e UX otimizada
 */

interface ContactFormProps {
  className?: string
}

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // AIDEV-NOTE: Opções de assunto para o select
  const subjectOptions = [
    { value: 'visita', label: 'Agendamento de Visita' },
    { value: 'pesquisa', label: 'Pesquisa Acadêmica' },
    { value: 'acervo', label: 'Informações sobre Acervo' },
    { value: 'evento', label: 'Eventos e Exposições' },
    { value: 'imprensa', label: 'Imprensa' },
    { value: 'parceria', label: 'Parcerias' },
    { value: 'outros', label: 'Outros Assuntos' }
  ]

  // AIDEV-NOTE: Validação de email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // AIDEV-NOTE: Atualizar dados do formulário
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (status === 'error') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  // AIDEV-NOTE: Validação do formulário
  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage('Nome é obrigatório.')
      return false
    }

    if (!formData.email.trim()) {
      setErrorMessage('Email é obrigatório.')
      return false
    }

    if (!isValidEmail(formData.email)) {
      setErrorMessage('Por favor, insira um email válido.')
      return false
    }

    if (!formData.subject) {
      setErrorMessage('Por favor, selecione um assunto.')
      return false
    }

    if (!formData.message.trim()) {
      setErrorMessage('Mensagem é obrigatória.')
      return false
    }

    if (formData.message.trim().length < 10) {
      setErrorMessage('Mensagem deve ter pelo menos 10 caracteres.')
      return false
    }

    return true
  }

  // AIDEV-NOTE: Submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setStatus('error')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')
    setErrorMessage('')

    try {
      // AIDEV-NOTE: Simular envio - em produção conectar com API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Aqui seria feita a chamada para a API
      console.log('Contact form submission:', formData)
      
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      setStatus('error')
      setErrorMessage('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-[var(--museu-red)]/10 rounded-full mb-4"
        >
          <MessageSquare className="w-8 h-8 text-[var(--museu-red)]" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Entre em Contato
        </h2>
        
        <p className="text-gray-600">
          Envie sua mensagem e entraremos em contato em breve
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <motion.div variants={fieldVariants}>
            <Label htmlFor="contact-name" className="text-gray-700 font-medium">
              Nome completo *
            </Label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Seu nome completo"
                className="pl-10 border-gray-300 focus:border-[var(--museu-red)] focus:ring-[var(--museu-red)]"
                required
                disabled={isSubmitting}
              />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div variants={fieldVariants}>
            <Label htmlFor="contact-email" className="text-gray-700 font-medium">
              Email *
            </Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="seu@email.com"
                className="pl-10 border-gray-300 focus:border-[var(--museu-red)] focus:ring-[var(--museu-red)]"
                required
                disabled={isSubmitting}
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Telefone */}
          <motion.div variants={fieldVariants}>
            <Label htmlFor="contact-phone" className="text-gray-700 font-medium">
              Telefone
            </Label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="contact-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(11) 99999-9999"
                className="pl-10 border-gray-300 focus:border-[var(--museu-red)] focus:ring-[var(--museu-red)]"
                disabled={isSubmitting}
              />
            </div>
          </motion.div>

          {/* Assunto */}
          <motion.div variants={fieldVariants}>
            <Label htmlFor="contact-subject" className="text-gray-700 font-medium">
              Assunto *
            </Label>
            <Select
              value={formData.subject}
              onValueChange={(value) => handleInputChange('subject', value)}
              disabled={isSubmitting}
            >
              <SelectTrigger className="mt-1 border-gray-300 focus:border-[var(--museu-red)] focus:ring-[var(--museu-red)]">
                <SelectValue placeholder="Selecione um assunto" />
              </SelectTrigger>
              <SelectContent>
                {subjectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        </div>

        {/* Mensagem */}
        <motion.div variants={fieldVariants}>
          <Label htmlFor="contact-message" className="text-gray-700 font-medium">
            Mensagem *
          </Label>
          <Textarea
            id="contact-message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="Escreva sua mensagem aqui..."
            rows={6}
            className="mt-1 border-gray-300 focus:border-[var(--museu-red)] focus:ring-[var(--museu-red)] resize-none"
            required
            disabled={isSubmitting}
          />
          <p className="text-sm text-gray-500 mt-1">
            Mínimo de 10 caracteres ({formData.message.length}/10)
          </p>
        </motion.div>

        {/* Status Messages */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-800">
              Mensagem enviada com sucesso! Entraremos em contato em breve.
            </span>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-sm text-red-800">{errorMessage}</span>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.div
          variants={fieldVariants}
          className="pt-4"
        >
          <Button
            type="submit"
            disabled={isSubmitting || status === 'success'}
            className="w-full bg-[var(--museu-red)] hover:bg-red-700 text-white font-semibold py-3 px-6 transition-all duration-200"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : status === 'success' ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Enviado!
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensagem
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}