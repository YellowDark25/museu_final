'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react'

/**
 * AIDEV-NOTE: Componente Footer do Museu Casa Borges
 * Contém informações de contato, horários, links úteis e redes sociais
 * Design responsivo com animações sutis
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Contato',
      items: [
        {
          icon: <MapPin size={16} />,
          text: 'Rua Borges de Barros, 123',
          subtext: 'Centro - Cuiabá/MT'
        },
        {
          icon: <Phone size={16} />,
          text: '(65) 3123-4567',
          href: 'tel:+556531234567'
        },
        {
          icon: <Mail size={16} />,
          text: 'contato@museucasaborges.org.br',
          href: 'mailto:contato@museucasaborges.org.br'
        }
      ]
    },
    {
      title: 'Horários',
      items: [
        {
          icon: <Clock size={16} />,
          text: 'Terça a Sexta',
          subtext: '9h às 17h'
        },
        {
          icon: <Clock size={16} />,
          text: 'Sábados',
          subtext: '9h às 15h'
        },
        {
          icon: <Clock size={16} />,
          text: 'Domingos e Feriados',
          subtext: 'Fechado'
        }
      ]
    },
    {
      title: 'Links Úteis',
      items: [
        { text: 'Sobre o Museu', href: '/o-museu' },
        { text: 'Acervo', href: '/acervo' },
        { text: 'Exposições', href: '/exposicoes' },
        { text: 'Galeria', href: '/galeria' },
        { text: 'Publicações', href: '/publicacoes' },
        { text: 'Contato', href: '/contato' }
      ]
    }
  ]

  return (
    <footer id="footer" className="bg-[var(--museu-black)] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-[var(--museu-red)] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="font-semibold text-lg">MUSEU CASA BORGES</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Preservando a memória e cultura de Mato Grosso através do legado 
              de Herculano Borges e da rica história regional.
            </p>
            
            {/* Redes Sociais */}
            <div className="flex space-x-4">
              <motion.a
                href="https://instagram.com/museucasaborges"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-[var(--museu-red)] rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                aria-label="Instagram do Museu Casa Borges"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="https://facebook.com/museucasaborges"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-[var(--museu-red)] rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                aria-label="Facebook do Museu Casa Borges"
              >
                <Facebook size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Seções do Footer */}
          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-lg mb-4 text-[var(--museu-red)]">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex items-start space-x-2 text-gray-300 hover:text-white transition-colors group"
                      >
                        {item.icon && (
                          <span className="mt-1 text-[var(--museu-red)] group-hover:scale-110 transition-transform">
                            {item.icon}
                          </span>
                        )}
                        <div>
                          <span className="text-sm">{item.text}</span>
                          {item.subtext && (
                            <div className="text-xs text-gray-400">{item.subtext}</div>
                          )}
                        </div>
                      </Link>
                    ) : (
                      <div className="flex items-start space-x-2 text-gray-300">
                        {item.icon && (
                          <span className="mt-1 text-[var(--museu-red)]">
                            {item.icon}
                          </span>
                        )}
                        <div>
                          <span className="text-sm">{item.text}</span>
                          {item.subtext && (
                            <div className="text-xs text-gray-400">{item.subtext}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Linha divisória e Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Museu Casa Borges. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/politica-privacidade"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos-uso"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Termos de Uso
              </Link>
              <Link
                href="/acessibilidade"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Acessibilidade
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}