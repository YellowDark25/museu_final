"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalyticsMonthHeatmap } from "./AnalyticsMonthHeatmap"
import { AnalyticsTopContentTable } from "./AnalyticsTopContentTable"
import type { AdminAnalyticsOverviewDTO } from "@/features/analytics/dto/analytics.dto"

type Props = {
  data: AdminAnalyticsOverviewDTO
}

function KpiCard({ label, value, description }: { label: string; value: string; description?: string }) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader className="space-y-1 pb-2">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <CardTitle className="text-3xl font-bold text-slate-900">{value}</CardTitle>
      </CardHeader>
      {description && (
        <CardContent>
          <p className="text-xs text-slate-500">{description}</p>
        </CardContent>
      )}
    </Card>
  )
}

function buildMonthOptions(): { value: string; label: string }[] {
  const options = []
  const now = new Date()
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
    const label = d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
    options.push({ value, label: label.charAt(0).toUpperCase() + label.slice(1) })
  }
  return options
}

export function AdminDashboard({ data: initialData }: Props) {
  const [data, setData] = useState(initialData)
  const [selectedMonth, setSelectedMonth] = useState(initialData.month)
  const [loading, setLoading] = useState(false)

  const monthOptions = buildMonthOptions()

  async function handleMonthChange(month: string) {
    setSelectedMonth(month)
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/analytics?month=${month}`)
      if (res.ok) {
        const newData: AdminAnalyticsOverviewDTO = await res.json()
        setData(newData)
      }
    } finally {
      setLoading(false)
    }
  }

  const noDataYet =
    data.collectionStarted === null &&
    data.totalPageviews === 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-slate-900">Analytics</h2>
        <p className="text-sm text-slate-500">
          Acessos ao site público · últimos 30 dias / mês selecionado
        </p>
      </div>

      {noDataYet && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          A coleta de dados foi iniciada. As métricas aparecerão após os primeiros acessos ao site.
        </div>
      )}

      {/* KPIs */}
      <section className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Pageviews (30 dias)"
          value={data.totalPageviews.toLocaleString("pt-BR")}
          description="Total de páginas carregadas nos últimos 30 dias."
        />
        <KpiCard
          label="Visitantes únicos"
          value={data.uniqueVisitors.toLocaleString("pt-BR")}
          description="Sessões anônimas distintas nos últimos 30 dias."
        />
        <KpiCard
          label="Páginas acessadas"
          value={data.pagesAccessed.toLocaleString("pt-BR")}
          description="Caminhos únicos visitados nos últimos 30 dias."
        />
      </section>

      {/* Heatmap + Top Content */}
      <section className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base font-semibold">Mapa de calor</CardTitle>
            <select
              value={selectedMonth}
              onChange={(e) => handleMonthChange(e.target.value)}
              disabled={loading}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
            >
              {monthOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex h-48 items-center justify-center text-sm text-slate-400">
                Carregando…
              </div>
            ) : (
              <AnalyticsMonthHeatmap data={data.monthlyHeatmap} month={data.month} />
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Top 10 páginas (30 dias)</CardTitle>
          </CardHeader>
          <CardContent className="p-0 pb-4">
            <AnalyticsTopContentTable data={data.topContent} />
          </CardContent>
        </Card>
      </section>

      {data.collectionStarted && (
        <p className="text-xs text-slate-400 text-center">
          Coleta iniciada em {new Date(data.collectionStarted).toLocaleDateString("pt-BR")}
        </p>
      )}
    </div>
  )
}
