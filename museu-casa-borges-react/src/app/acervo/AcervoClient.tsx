"use client"

import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"

import HeroAcervo from "@/components/acervo/HeroAcervo"
import SearchBarAcervo, { AcervoFilterValues } from "@/components/acervo/SearchBarAcervo"
import StatsCards from "@/components/acervo/StatsCards"
import AcervoMediaSection from "@/components/acervo/tabs/AcervoMediaSection"
import FotografiasSection from "@/components/acervo/tabs/FotografiasSection"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { PublicAcervoOverviewDTO } from "@/features/acervo/dto/public-acervo.dto"

type Props = {
  overview: PublicAcervoOverviewDTO
}

export default function AcervoClient({ overview }: Props) {
  const searchParams = useSearchParams()
  const materialOptions = useMemo(
    () => [
      { value: "todos", label: "Todos" },
      ...overview.tabs.map((tab) => ({
        value: tab.slug,
        label: tab.nome,
      })),
    ],
    [overview.tabs]
  )
  const firstTabSlug = overview.tabs[0]?.slug ?? ""
  const [activeTab, setActiveTab] = useState<string>(firstTabSlug)

  const [filters, setFilters] = useState<AcervoFilterValues>({
    keyword: "",
    material: "todos",
    period: "qualquer",
  })

  const availableTabSlugs = useMemo(
    () => new Set(overview.tabs.map((tab) => tab.slug)),
    [overview.tabs]
  )

  const handleFilterChange = useCallback((patch: Partial<AcervoFilterValues>) => {
    setFilters((prev) => {
      const next = { ...prev, ...patch }

      if (patch.material && patch.material !== "todos" && availableTabSlugs.has(patch.material)) {
        setActiveTab(patch.material)
      }

      return next
    })
  }, [availableTabSlugs])

  const onSearch = useCallback(() => {
    if (filters.material !== "todos" && availableTabSlugs.has(filters.material)) {
      setActiveTab(filters.material)
    }
  }, [availableTabSlugs, filters.material])

  useEffect(() => {
    if (!activeTab && firstTabSlug) {
      setActiveTab(firstTabSlug)
    }
  }, [activeTab, firstTabSlug])

  useEffect(() => {
    const categoriaParam = searchParams.get("categoria")

    if (!categoriaParam) {
      return
    }

    if (availableTabSlugs.has(categoriaParam)) {
      setActiveTab(categoriaParam)
      setFilters((current) => ({ ...current, material: categoriaParam }))
    }
  }, [availableTabSlugs, searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <HeroAcervo />

      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-10">
          <StatsCards stats={overview.stats} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-8">
          <SearchBarAcervo
            values={filters}
            materialOptions={materialOptions}
            onChange={handleFilterChange}
            onSearch={onSearch}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          {overview.tabs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">
                Nenhuma aba pública disponível
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Cadastre categorias ativas e marque a opção de exibição pública
                no painel administrativo para liberar novas abas no acervo.
              </p>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex h-auto w-full justify-start overflow-x-auto bg-muted p-1 md:grid md:auto-cols-fr md:grid-flow-col md:justify-center md:overflow-visible">
                {overview.tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.slug}
                    className="min-w-[140px] md:min-w-0"
                  >
                    {tab.nome}
                  </TabsTrigger>
                ))}
              </TabsList>

              {overview.tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.slug} className="mt-6">
                  {tab.layout === "galeria" ? (
                    <FotografiasSection
                      photos={tab.photos}
                      query={{ keyword: filters.keyword, period: filters.period }}
                    />
                  ) : (
                    <AcervoMediaSection
                      title={tab.nome}
                      description={
                        tab.descricao ||
                        `Explore as mídias disponíveis na aba ${tab.nome}.`
                      }
                      emptyTitle={`Nenhuma mídia em ${tab.nome}`}
                      emptyDescription="Cadastre arquivos nesta categoria para exibi-los ao público."
                      media={tab.media}
                      keyword={filters.keyword}
                    />
                  )}
                </TabsContent>
              ))}
            </Tabs>
          )}
        </motion.div>
      </div>
    </div>
  )
}
