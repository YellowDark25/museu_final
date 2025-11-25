"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HeroAcervo from "@/components/acervo/HeroAcervo"
import StatsCards from "@/components/acervo/StatsCards"
import SearchBarAcervo, { AcervoFilterValues } from "@/components/acervo/SearchBarAcervo"
import ManuscritosSection from "@/components/acervo/tabs/ManuscritosSection"
import FotografiasSection from "@/components/acervo/tabs/FotografiasSection"
import DocumentosSection from "@/components/acervo/tabs/DocumentosSection"
import AudiovisualSection from "@/components/acervo/tabs/AudiovisualSection"
import ColecoesSection from "@/components/acervo/tabs/ColecoesSection"
import { useAcervoStats } from "@/hooks/useAcervoStats"

/**
 * AcervoClient
 * Componente client que gerencia filtros, tabs e renderização do acervo
 */
export default function AcervoClient() {
  const [activeTab, setActiveTab] = useState<string>("manuscritos")
  const searchParams = useSearchParams()

  const { stats, loading } = useAcervoStats()

  const [filters, setFilters] = useState<AcervoFilterValues>({
    keyword: "",
    material: "todos",
    period: "qualquer",
  })

  const handleFilterChange = (patch: Partial<AcervoFilterValues>) => {
    setFilters((prev) => {
      const next = { ...prev, ...patch }
      if (patch.material && patch.material !== "todos") {
        const map: Record<string, string> = {
          documentos: "documentos",
          fotografias: "fotografias",
          audiovisual: "audiovisual",
        }
        const nextTab = map[patch.material]
        if (nextTab) setActiveTab(nextTab)
      }
      return next
    })
  }

  const onSearch = () => {
    if (filters.material !== "todos") {
      const map: Record<string, string> = {
        documentos: "documentos",
        fotografias: "fotografias",
        audiovisual: "audiovisual",
      }
      const nextTab = map[filters.material]
      if (nextTab) setActiveTab(nextTab)
    }
  }

  useEffect(() => {
    const categoriaParam = searchParams.get("categoria")
    if (!categoriaParam) return
    const categoriaMap: Record<string, string> = {
      obras: "manuscritos",
      documentos: "documentos",
      fotografias: "fotografias",
      audiovisual: "audiovisual",
      colecoes: "colecoes",
    }
    const tab = categoriaMap[categoriaParam] || categoriaParam
    if (["manuscritos", "fotografias", "documentos", "audiovisual", "colecoes"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <HeroAcervo />

      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <StatsCards stats={stats} loading={loading} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-8">
          <SearchBarAcervo values={filters} onChange={handleFilterChange} onSearch={onSearch} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="manuscritos">Manuscritos</TabsTrigger>
              <TabsTrigger value="fotografias">Fotografias</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
              <TabsTrigger value="audiovisual">Audiovisual</TabsTrigger>
              <TabsTrigger value="colecoes">Coleções</TabsTrigger>
            </TabsList>

            <TabsContent value="manuscritos" className="mt-6">
              <ManuscritosSection />
            </TabsContent>

            <TabsContent value="fotografias" className="mt-6">
              <FotografiasSection query={{ keyword: filters.keyword, period: filters.period }} />
            </TabsContent>

            <TabsContent value="documentos" className="mt-6">
              <DocumentosSection />
            </TabsContent>

            <TabsContent value="audiovisual" className="mt-6">
              <AudiovisualSection />
            </TabsContent>

            <TabsContent value="colecoes" className="mt-6">
              <ColecoesSection stats={stats} loading={loading} />
            </TabsContent>
          </Tabs>
        </motion.div>

      </div>
    </div>
  )
}