'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Building, 
  Users, 
  BookOpen, 
  Award, 
  Calendar,
  Heart,
  Target,
  Eye,
  Globe,
  Clock,
  MapPin,
  Star,
  Camera,
  Palette,
  Music,
  GraduationCap,
  Lightbulb,
  Handshake,
  ExternalLink
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

/**
 * AIDEV-NOTE: Componente client para animações framer-motion
 * Separado do componente principal para permitir metadata export no Server Component
 * Contém informações reais e específicas do Museu Casa Borges
 */
export default function OMuseuContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">
      {/* AIDEV-NOTE: Hero section com imagem de fundo e título principal */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="/images/fundo2.jpg"
          alt="Museu Casa Borges"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              O Museu Casa Borges
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Preservando a memória cultural de Mato Grosso
            </p>
          </motion.div>
        </div>
      </section>

      {/* AIDEV-NOTE: Seção principal com história real do museu */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center">
            O Museu Casa Borges
          </h2>
          
          <div className="prose prose-lg max-w-4xl mx-auto text-slate-700">
            <p className="text-lg leading-relaxed mb-6">
              O Museu Casa Borges surgiu da iniciativa de professores, historiadores, artistas e artesãos do município de Barra do Bugres, inicialmente institucionalizado através de um projeto de extensão, parceria entre a <strong>Universidade do Estado de Mato Grosso - UNEMAT</strong> e o <strong>Departamento de Cultura do município</strong>. Instalado em uma casa histórica, patrimônio cultural da cidade, teve sua primeira atividade em <strong>julho de 2018</strong>, realizando desde então, 13 ações culturais até o final de 2019.
            </p>
          </div>
        </motion.div>

        {/* AIDEV-NOTE: Primeira imagem histórica */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl mb-4">
              <Image
                src="/sobre/museu.jpg"
                alt="Oficina de cerâmica ministrada por Claudemir Oliveira"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center text-slate-600 italic">
              Oficina de cerâmica ministrada por Claudemir Oliveira. Outubro de 2018.<br />
              Foto: João Mário Adrião
            </p>
          </div>
        </motion.div>

        {/* AIDEV-NOTE: Continuação da história */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <div className="prose prose-lg max-w-4xl mx-auto text-slate-700">
            <p className="text-lg leading-relaxed mb-6">
              Em 2020, impedido de realizar as ações presenciais, passou a publicar em seu site exposições virtuais.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Em 2022 o Museu retornou com as atividades presenciais, sendo reinaugurado, após obras de requalificação dos espaços, com a exposição <strong>"Permanências Urbanas"</strong>.
            </p>
          </div>
        </motion.div>

        {/* AIDEV-NOTE: Segunda imagem histórica */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl mb-4">
              <Image
                src="/sobre/museu1.jpg"
                alt="Reinauguração do Museu Casa Borges"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center text-slate-600 italic">
              Reinauguração do Museu Casa Borges, em 15/06/2022.<br />
              Foto: SMEC - Prefeitura Municipal de Barra do Bugres.
            </p>
          </div>
        </motion.div>

        {/* AIDEV-NOTE: Informações sobre público e comunidade */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-16"
        >
          <div className="prose prose-lg max-w-4xl mx-auto text-slate-700">
            <p className="text-lg leading-relaxed mb-8">
              Sempre contando com a participação voluntária de artistas, artesão, alunos, professores e a comunidade de Barra do Bugres, tem como público alvo os estudantes das escolas do município.
            </p>
          </div>
        </motion.div>

        {/* AIDEV-NOTE: Seção sobre SMEC e gestão atual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-16"
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Gestão Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-3xl mx-auto text-slate-700 text-center">
                <p className="text-lg leading-relaxed">
                  Atualmente o Museu Casa Borges é gerido pela <strong>SMEC - Secretaria Municipal de Educação e Cultura</strong> da Prefeitura Municipal de Barra do Bugres, mantendo seu compromisso com a preservação da memória cultural local e a educação patrimonial.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AIDEV-NOTE: Seção sobre Lei Municipal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mb-16"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-amber-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Base Legal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-3xl mx-auto text-slate-700 text-center">
                <p className="text-lg leading-relaxed mb-4">
                  O Museu Casa Borges foi oficialmente criado através da <strong>Lei Municipal nº 1.533/2018</strong>, que estabelece suas diretrizes de funcionamento e objetivos institucionais.
                </p>
                <div className="flex justify-center">
                  <Link 
                    href="https://barradobugres.mt.gov.br/transparencia" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Portal da Transparência - Barra do Bugres
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AIDEV-NOTE: Seção final com informações práticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-center bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Visite o Museu Casa Borges
          </h3>
          <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
            Conheça a rica história cultural de Barra do Bugres e Mato Grosso. 
            O museu está localizado em uma casa histórica, patrimônio cultural da cidade.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-6">
            <Card className="border-0 shadow-md">
              <CardHeader className="text-center pb-3">
                <MapPin className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Casa histórica no centro de<br />
                  Barra do Bugres - MT
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardHeader className="text-center pb-3">
                <Users className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Público Alvo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Estudantes das escolas<br />
                  do município e comunidade
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Visita
            </Button>
            <Button size="lg" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
              <BookOpen className="w-5 h-5 mr-2" />
              Exposições Atuais
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}