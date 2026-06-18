'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Menu, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlobalSearch } from '@/components/search/GlobalSearch'
import { useGlobalSearch } from '@/hooks/useGlobalSearch'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/**
 * AIDEV-NOTE: Componente Header principal do Museu Casa Borges
 * Implementa navegação responsiva com dropdowns e links sociais
 * Baseado no design original com melhorias de UX e acessibilidade
 */
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const { isSearchOpen, openSearch, closeSearch } = useGlobalSearch()

  const navigationItems = [
    {
      title: 'Sobre',
      items: [
        { title: 'O Museu', href: '/o-museu' },
        { title: 'Herculano', href: '/herculano' }
      ]
    },
    {
      title: 'Calendário',
      href: '/eventos'
    },
    {
      title: 'Acervo',
      href: '/acervo'
    },
    {
      title: 'Biblioteca',
      href: '/biblioteca'
    },
    {
      title: 'Exposições',
      items: [
        { title: 'Virtuais', href: '/exposicoes/virtuais' },
      ]
    },
    {
      title: 'Galeria',
      href: '/galerias'
    },
    {
      title: 'Contato',
      href: '/contato'
    }
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-[var(--museu-red)] text-white shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logo1.jpg"
                alt="Logo Museu Casa Borges"
                width={50}
                height={50}
                priority
                className="rounded-full object-cover"
                style={{ width: 50, height: 50 }}
              />

            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex items-center space-x-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white font-medium text-base transition-all duration-200">
                  Sobre
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/o-museu"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none text-foreground">O Museu</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            História e informações institucionais
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/sobre?tab=equipe"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none text-foreground">Equipe</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Conheça nossa equipe
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="bg-transparent hover:bg-white/10 text-white font-medium text-base px-4 py-2 rounded-md transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap no-underline"
                >
                  <Link href="/eventos">Calendário</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  asChild 
                  className="bg-transparent hover:bg-white/10 text-white font-medium text-base px-4 py-2 rounded-md transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap no-underline"
                >
                  <Link href="/acervo">
                    Acervo
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white font-medium text-base transition-all duration-200">
                  Biblioteca
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {/* AIDEV-NOTE: Menu da Biblioteca simplificado
                    - Removidos os itens "Catálogo", "Serviços" e "Horários" conforme solicitação
                    - Mantida apenas a opção principal "Biblioteca"
                  */}
                  <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-1 bg-white border border-gray-200 shadow-lg rounded-lg">
                    <li>
                      <NavigationMenuLink asChild className="no-underline">
                        <Link
                          href="/biblioteca"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 text-gray-700"
                        >
                          <div className="text-sm font-medium leading-none text-gray-900 no-underline">Biblioteca</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-600 no-underline">
                            Acesso ao acervo bibliográfico
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white font-medium text-base transition-all duration-200">
                  Exposições
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-1 bg-white border border-gray-200 shadow-lg rounded-lg">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/exposicoes/virtuais"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 text-gray-700"
                        >
                          <div className="text-sm font-medium leading-none text-gray-900">Virtuais</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                            Tours virtuais
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  asChild 
                  className="bg-transparent hover:bg-white/10 text-white font-medium text-base px-4 py-2 rounded-md transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap no-underline"
                >
                  <Link href="/galerias">
                    Galeria
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  asChild 
                  className="bg-transparent hover:bg-white/10 text-white font-medium text-base px-4 py-2 rounded-md transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap no-underline"
                >
                  <Link href="/contato">
                    Contato
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search, Social Links & Mobile Menu */}
          <div className="flex items-center space-x-4">

            {/* Social Links */}
            <div className="hidden sm:flex items-center space-x-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href="/admin/login"
                  className="p-2 rounded-full hover:bg-red-700 transition-colors flex"
                  aria-label="Área administrativa"
                >
                  <User size={20} />
                </Link>
              </motion.div>
              <motion.a
                href="https://instagram.com/museucasaborges"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-red-700 transition-colors"
                aria-label="Instagram do Museu Casa Borges"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="https://facebook.com/museucasaborges"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-red-700 transition-colors"
                aria-label="Facebook do Museu Casa Borges"
              >
                <Facebook size={20} />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-red-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu de navegação"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-red-600 py-4"
          >
            <div className="space-y-2">
              {navigationItems.map((item, index) => (
                <div key={index}>
                  {item.items ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-white hover:bg-red-700"
                        >
                          {item.title}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        {item.items.map((subItem, subIndex) => (
                          <DropdownMenuItem key={subIndex} asChild>
                            <Link
                              href={subItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.title}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href={item.href!}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-red-700 rounded-md transition-colors"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Social Links */}
              <div className="flex items-center justify-center space-x-4 pt-4 border-t border-red-600">
                <Link
                  href="/admin/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-red-700 transition-colors"
                  aria-label="Área administrativa"
                >
                  <User size={20} />
                </Link>
                <a
                  href="https://instagram.com/museucasaborges"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-red-700 transition-colors"
                  aria-label="Instagram do Museu Casa Borges"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://facebook.com/museucasaborges"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-red-700 transition-colors"
                  aria-label="Facebook do Museu Casa Borges"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Global Search Component */}
      <GlobalSearch isOpen={isSearchOpen} onClose={closeSearch} />
    </motion.header>
  )
}
