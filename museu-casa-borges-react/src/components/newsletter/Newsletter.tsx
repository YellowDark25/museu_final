'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

/**
 * AIDEV-NOTE: Componente Newsletter do Museu Casa Borges
 * Implementa formulário de inscrição com validação e feedback
 * Design moderno com animações e acessibilidade WCAG 2.1 AA
 */

interface NewsletterProps {
  variant?: 'default' | 'compact' | 'sidebar'
  className?: string
}

export function Newsletter({ variant = 'default', className = '' }: NewsletterProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // AIDEV-NOTE: Validação de email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // AIDEV-NOTE: Submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !name) {
      setStatus('error')
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    if (!isValidEmail(email)) {
      setStatus('error')
      setErrorMessage('Por favor, insira um email válido.')
      return
    }

    if (!acceptTerms) {
      setStatus('error')
      setErrorMessage('É necessário aceitar os termos para continuar.')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')
    setErrorMessage('')

    try {
      // AIDEV-NOTE: Simular envio - em produção conectar com API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Aqui seria feita a chamada para a API
      console.log('Newsletter subscription:', { email, name })
      
      setStatus('success')
      setEmail('')
      setName('')
      setAcceptTerms(false)
    } catch (error) {
      setStatus('error')
      setErrorMessage('Erro ao processar inscrição. Tente novamente.')
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

  const isCompact = variant === 'compact'
  const isSidebar = variant === 'sidebar'

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`
        ${isCompact ? 'p-6' : isSidebar ? 'p-4' : 'p-8'}
        bg-gradient-to-br from-[var(--museu-red)] to-red-700 
        text-white rounded-2xl shadow-xl
        ${className}
      `}
    >
      {/* Header */}
      <div className={`text-center ${isCompact ? 'mb-4' : 'mb-6'}`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4"
        >
          <Mail className="w-6 h-6" />
        </motion.div>
        
        <h3 className={`font-bold ${isCompact ? 'text-lg' : 'text-xl'} mb-2`}>
          Newsletter Museu Casa Borges
        </h3>
        
        <p className={`text-white/90 ${isCompact ? 'text-sm' : 'text-base'}`}>
          {isCompact 
            ? 'Receba novidades sobre exposições e eventos'
            : 'Receba em primeira mão novidades sobre exposições, eventos e descobertas do acervo'
          }
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div>
          <Label htmlFor="newsletter-name" className="text-white text-sm font-medium">
            Nome completo *
          </Label>
          <Input
            id="newsletter-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome completo"
            className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="newsletter-email" className="text-white text-sm font-medium">
            Email *
          </Label>
          <Input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Termos */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="newsletter-terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-[var(--museu-red)]"
            disabled={isSubmitting}
          />
          <Label 
            htmlFor="newsletter-terms" 
            className="text-sm text-white/90 leading-relaxed cursor-pointer"
          >
            Aceito receber comunicações do Museu Casa Borges e concordo com a{' '}
            <a href="/privacidade" className="underline hover:text-white">
              política de privacidade
            </a>
          </Label>
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-2 p-3 bg-green-500/20 border border-green-400/30 rounded-lg"
          >
            <Check className="w-5 h-5 text-green-300" />
            <span className="text-sm text-green-100">
              Inscrição realizada com sucesso! Verifique seu email.
            </span>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-400/30 rounded-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-300" />
            <span className="text-sm text-red-100">{errorMessage}</span>
          </motion.div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || status === 'success'}
          className="w-full bg-white text-[var(--museu-red)] hover:bg-white/90 font-semibold py-3 transition-all duration-200"
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-[var(--museu-red)] border-t-transparent rounded-full"
            />
          ) : status === 'success' ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Inscrito!
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Inscrever-se
            </>
          )}
        </Button>
      </form>

      {/* Footer */}
      {!isCompact && (
        <p className="text-xs text-white/70 text-center mt-4">
          Você pode cancelar sua inscrição a qualquer momento.
        </p>
      )}
    </motion.div>
  )
}