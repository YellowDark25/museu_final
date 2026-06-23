"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { usePDFData, usePDFDataByCategory } from '@/hooks/usePDFData'
import { PDFGrid } from '@/components/shared/PDFGrid'
import Image from 'next/image'

/**
 * BibliotecaClient
 * Componente client com busca, filtros e renderização de PDFs
 */
export default function BibliotecaClient() {
  const [activeTab, setActiveTab] = useState('publicacoes')
  const [isMounted, setIsMounted] = useState(false)
  const searchParams = useSearchParams()

  const { pdfData, dataByCategory, isLoading, openPDF, downloadPDF } = usePDFData()

  const categoryData = usePDFDataByCategory(activeTab as 'publicacoes' | 'pesquisas' | 'artigos' | 'tcc')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const categoria = searchParams.get('categoria')
    if (categoria) {
      const categoryMap: { [key: string]: string } = {
        publicacoes: 'publicacoes',
        pesquisas: 'pesquisas',
        artigos: 'artigos',
        tcc: 'tcc'
      }

      const mappedCategory = categoryMap[categoria] || 'publicacoes'
      setActiveTab(mappedCategory)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">
      <section className="relative w-full text-white overflow-hidden">
        <div className="absolute inset-0 z-0 h-96 md:h-auto">
          <Image
            src="/images/fundo2.jpg"
            alt="Biblioteca Digital do Museu"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
              BIBLIOTECA DIGITAL
            </h1>
            <p className="text-base sm:text-lg opacity-90 mb-6 drop-shadow-md">
              Acesse nossa coleção digital de livros, artigos, teses e recursos 
              especializados sobre a história e cultura de Barra do Bugres e Região.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto gap-1 sm:gap-0">
              <TabsTrigger value="publicacoes" className="text-xs sm:text-sm py-2">Publicações</TabsTrigger>
              <TabsTrigger value="pesquisas" className="text-xs sm:text-sm py-2">Pesquisas</TabsTrigger>
              <TabsTrigger value="artigos" className="text-xs sm:text-sm py-2">Artigos</TabsTrigger>
              <TabsTrigger value="tcc" className="text-xs sm:text-sm py-2">TCCs</TabsTrigger>
            </TabsList>

            <TabsContent value="publicacoes" className="mt-6">
              <PDFGrid 
                pdfs={dataByCategory?.publicacoes || []} 
                title="Publicações Disponíveis"
                description="Livros e publicações sobre a história e cultura de Barra do Bugres"
                emptyMessage="Nenhuma publicação encontrada"
                onPDFRead={openPDF}
                onPDFDownload={downloadPDF}
              />
            </TabsContent>

            <TabsContent value="pesquisas" className="mt-6">
              <PDFGrid 
                pdfs={dataByCategory?.pesquisas || []} 
                title="Pesquisas e Estudos"
                description="Pesquisas científicas e estudos sobre a região"
                emptyMessage="Nenhuma pesquisa encontrada"
                onPDFRead={openPDF}
                onPDFDownload={downloadPDF}
              />
            </TabsContent>

            <TabsContent value="artigos" className="mt-6">
              <PDFGrid 
                pdfs={dataByCategory?.artigos || []} 
                title="Artigos Acadêmicos"
                description="Artigos científicos e acadêmicos relacionados à região"
                emptyMessage="Nenhum artigo encontrado"
                onPDFRead={openPDF}
                onPDFDownload={downloadPDF}
              />
            </TabsContent>

            <TabsContent value="tcc" className="mt-6">
              <PDFGrid 
                pdfs={dataByCategory?.tcc || []} 
                title="Trabalhos de Conclusão de Curso"
                description="TCCs e monografias sobre temas regionais"
                emptyMessage="Nenhum TCC encontrado"
                onPDFRead={openPDF}
                onPDFDownload={downloadPDF}
              />
            </TabsContent>

          </Tabs>
        </motion.div>

      </div>
    </div>
  )
}