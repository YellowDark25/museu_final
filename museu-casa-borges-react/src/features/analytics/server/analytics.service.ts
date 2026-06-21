import { supabase } from "@/lib/supabase"
import type {
  AdminAnalyticsOverviewDTO,
  AnalyticsHeatmapDay,
  AnalyticsTopContentItem,
} from "../dto/analytics.dto"

const PATH_LABELS: Record<string, string> = {
  "/": "Início",
  "/sobre": "Sobre o Museu",
  "/visitas": "Visitas",
  "/acervo": "Acervo",
  "/biblioteca": "Biblioteca",
  "/eventos": "Eventos",
  "/exposicoes": "Exposições",
  "/exposicoes/virtuais": "Exposições Virtuais",
}

export function labelForPath(path: string): string {
  if (PATH_LABELS[path]) return PATH_LABELS[path]
  const segments = path.split("/").filter(Boolean)
  if (segments[0] === "exposicoes" && segments[1] === "virtuais" && segments[2]) {
    return `Exposição virtual: ${decodeURIComponent(segments[2])}`
  }
  if (segments[0] === "acervo" && segments[1]) {
    return `Acervo: ${decodeURIComponent(segments[1])}`
  }
  if (segments[0] === "biblioteca" && segments[1]) {
    return `Biblioteca: ${decodeURIComponent(segments[1])}`
  }
  return path
}

export async function getAdminAnalyticsOverview(
  month: string // 'YYYY-MM'
): Promise<AdminAnalyticsOverviewDTO> {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const [y, m] = month.split("-").map(Number)
  const monthStart = new Date(Date.UTC(y, m - 1, 1)).toISOString()
  const monthEnd = new Date(Date.UTC(y, m, 1)).toISOString()

  const [last30Result, monthResult, firstResult] = await Promise.all([
    supabase
      .from("analytics_page_views")
      .select("path, session_id")
      .gte("created_at", thirtyDaysAgo),

    supabase
      .from("analytics_page_views")
      .select("path, created_at")
      .gte("created_at", monthStart)
      .lt("created_at", monthEnd),

    supabase
      .from("analytics_page_views")
      .select("created_at")
      .order("created_at", { ascending: true })
      .limit(1),
  ])

  const rows30 = last30Result.data ?? []
  const totalPageviews = rows30.length
  const uniqueVisitors = new Set(rows30.map((r) => r.session_id)).size
  const pagesAccessed = new Set(rows30.map((r) => r.path)).size

  // top content: count by path from last 30 days
  const pathCounts: Record<string, number> = {}
  for (const row of rows30) {
    pathCounts[row.path] = (pathCounts[row.path] ?? 0) + 1
  }
  const topContent: AnalyticsTopContentItem[] = Object.entries(pathCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, views]) => ({ path, label: labelForPath(path), views }))

  // heatmap: count by day for the selected month
  const dayCounts: Record<string, number> = {}
  for (const row of monthResult.data ?? []) {
    const date = row.created_at.slice(0, 10)
    dayCounts[date] = (dayCounts[date] ?? 0) + 1
  }
  const monthlyHeatmap: AnalyticsHeatmapDay[] = Object.entries(dayCounts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, count]) => ({ date, count }))

  const collectionStarted = firstResult.data?.[0]?.created_at?.slice(0, 10) ?? null

  return {
    totalPageviews,
    uniqueVisitors,
    pagesAccessed,
    topContent,
    monthlyHeatmap,
    month,
    collectionStarted,
  }
}
