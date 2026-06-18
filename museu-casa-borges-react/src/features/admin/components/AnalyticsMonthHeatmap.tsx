"use client"

import { useMemo } from "react"
import type { AnalyticsHeatmapDay } from "@/features/analytics/dto/analytics.dto"

interface Props {
  data: AnalyticsHeatmapDay[]
  month: string // 'YYYY-MM'
}

const DAYS_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

function intensityClass(count: number, max: number): string {
  if (count === 0) return "bg-slate-100"
  const ratio = count / Math.max(max, 1)
  if (ratio < 0.25) return "bg-red-200"
  if (ratio < 0.55) return "bg-red-400"
  if (ratio < 0.8) return "bg-red-600"
  return "bg-red-800"
}

export function AnalyticsMonthHeatmap({ data, month }: Props) {
  const countsByDate = useMemo(() => {
    const map: Record<string, number> = {}
    for (const d of data) map[d.date] = d.count
    return map
  }, [data])

  const { days, startOffset } = useMemo(() => {
    const [y, m] = month.split("-").map(Number)
    const firstDay = new Date(y, m - 1, 1)
    const lastDay = new Date(y, m, 0)
    const daysInMonth = lastDay.getDate()
    return {
      days: daysInMonth,
      startOffset: firstDay.getDay(), // 0 = Sunday
    }
  }, [month])

  const maxCount = useMemo(
    () => Math.max(0, ...Object.values(countsByDate)),
    [countsByDate]
  )

  const cells: { date: string | null; count: number }[] = []
  for (let i = 0; i < startOffset; i++) cells.push({ date: null, count: 0 })
  const [y, m] = month.split("-")
  for (let d = 1; d <= days; d++) {
    const date = `${y}-${m}-${String(d).padStart(2, "0")}`
    cells.push({ date, count: countsByDate[date] ?? 0 })
  }

  return (
    <div className="select-none">
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500 mb-1">
        {DAYS_SHORT.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, idx) =>
          cell.date === null ? (
            <div key={`empty-${idx}`} className="h-8 rounded" />
          ) : (
            <div
              key={cell.date}
              title={`${cell.date}: ${cell.count} acesso${cell.count !== 1 ? "s" : ""}`}
              className={`h-8 rounded flex items-center justify-center text-xs font-medium cursor-default transition-opacity hover:opacity-80 ${intensityClass(cell.count, maxCount)} ${cell.count > 0 && maxCount > 0 && maxCount < 5 ? "" : ""}`}
            >
              <span className={cell.count > 0 ? "text-white drop-shadow-sm" : "text-slate-400"}>
                {parseInt(cell.date.split("-")[2], 10)}
              </span>
            </div>
          )
        )}
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
        <span>Menos</span>
        {["bg-slate-100", "bg-red-200", "bg-red-400", "bg-red-600", "bg-red-800"].map((cls) => (
          <span key={cls} className={`h-3 w-3 rounded ${cls} border border-slate-200`} />
        ))}
        <span>Mais</span>
      </div>
    </div>
  )
}
