'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  BookOpen, 
  Library,
  FileText,
  GraduationCap
} from 'lucide-react'
import { usePDFData, usePDFDataByCategory } from '@/hooks/usePDFData'
import { PDFGrid } from '@/components/shared/PDFGrid'
import Image from 'next/image'

/**
 * AIDEV-NOTE: Página da Biblioteca Digital do Museu Casa Borges
 * Integra os novos componentes de PDF (PDFGrid, PDFCard) para uma experiência moderna
 * Utiliza dados reais dos PDFs encontrados nas pastas do projeto
 * Implementa busca, filtros e visualização responsiva
 */

export default function BibliotecaPage() {
  // AIDEV-NOTE: Estado para controle das abas baseado em parâmetros de URL
  const [activeTab, setActiveTab] = useState('publicacoes')
  const [isMounted, setIsMounted] = useState(false)
  const searchParams = useSearchParams()

  // AIDEV-NOTE: Hook para carregar dados reais dos arquivos PDF
  const { pdfData, dataByCategory, isLoading, openPDF, downloadPDF } = usePDFData()
  
  // AIDEV-NOTE: Calcular estatísticas localmente baseado nos dados disponíveis
  const stats = useMemo(() => {
    if (!dataByCategory) {
      return {
        publicacoes: 0,
        pesquisas: 0,
        artigos: 0,
        tcc: 0
      }
    }
    
    return {
      publicacoes: dataByCategory.publicacoes?.length || 0,
      pesquisas: dataByCategory.pesquisas?.length || 0,
      artigos: dataByCategory.artigos?.length || 0,
      tcc: dataByCategory.tcc?.length || 0
    }
  }, [dataByCategory])
  
  // AIDEV-NOTE: Hook específico para categoria ativa
  const categoryData = usePDFDataByCategory(activeTab as 'publicacoes' | 'pesquisas' | 'artigos' | 'tcc')

  // AIDEV-NOTE: Efeito para controlar hidratação e evitar erros de SSR
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // AIDEV-NOTE: Efeito para ler parâmetro 'categoria' da URL e definir aba ativa
  useEffect(() => {
    const categoria = searchParams.get('categoria')
    if (categoria) {
      // Mapear categorias da URL para nomes das abas
      const categoryMap: { [key: string]: string } = {
        'publicacoes': 'publicacoes',
        'pesquisas': 'pesquisas', 
        'artigos': 'artigos',
        'tcc': 'tcc'
      }
      
      const mappedCategory = categoryMap[categoria] || 'publicacoes'
      setActiveTab(mappedCategory)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">
      {/* AIDEV-NOTE: Hero section com foco na biblioteca digital */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="/images/fundo2.jpg"
          alt="Biblioteca Digital do Museu"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl font-bold mb-4">Biblioteca Digital</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Acesse nossa coleção digital de livros, artigos, teses e recursos 
              especializados sobre Jorge Luis Borges e literatura argentina
            </p>
            <Badge className="mt-4 bg-amber-600 hover:bg-amber-700">
              Acesso Gratuito
            </Badge>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* AIDEV-NOTE: Estatísticas da biblioteca com dados reais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <p className="font-semibold">Publicações</p>
              <p className="text-2xl font-bold text-amber-600">{stats.publicacoes}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Search className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <p className="font-semibold">Pesquisas</p>
              <p className="text-2xl font-bold text-amber-600">{stats.pesquisas}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <FileText className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <p className="font-semibold">Artigos</p>
              <p className="text-2xl font-bold text-amber-600">{stats.artigos}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <GraduationCap className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <p className="font-semibold">TCCs</p>
              <p className="text-2xl font-bold text-amber-600">{stats.tcc}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* AIDEV-NOTE: Barra de pesquisa principal simplificada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Library className="h-5 w-5" />
                Biblioteca Digital
              </CardTitle>
              <CardDescription>
                Explore nossa coleção de publicações, pesquisas, artigos e trabalhos acadêmicos sobre a história e cultura de Barra do Bugres
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* AIDEV-NOTE: Conteúdo principal organizado em tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="publicacoes">Publicações</TabsTrigger>
              <TabsTrigger value="pesquisas">Pesquisas</TabsTrigger>
              <TabsTrigger value="artigos">Artigos</TabsTrigger>
              <TabsTrigger value="tcc">TCCs</TabsTrigger>
            </TabsList>

            {/* AIDEV-NOTE: Conteúdo da aba Publicações */}
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

            {/* AIDEV-NOTE: Conteúdo da aba Pesquisas */}
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

            {/* AIDEV-NOTE: Conteúdo da aba Artigos */}
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

            {/* AIDEV-NOTE: Conteúdo da aba TCCs */}
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

            {/* AIDEV-NOTE: Seções de metodologia/áreas removidas conforme solicitação */}
          </Tabs>
        </motion.div>

        {/* AIDEV-NOTE: CTA final removido conforme solicitação */}
      </div>
    </div>
  )
}
