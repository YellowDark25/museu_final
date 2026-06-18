export interface AnalyticsTopContentItem {
  path: string
  label: string
  views: number
}

export interface AnalyticsHeatmapDay {
  date: string // 'YYYY-MM-DD'
  count: number
}

export interface AdminAnalyticsOverviewDTO {
  totalPageviews: number
  uniqueVisitors: number
  pagesAccessed: number
  topContent: AnalyticsTopContentItem[]
  monthlyHeatmap: AnalyticsHeatmapDay[]
  month: string // 'YYYY-MM'
  collectionStarted: string | null // ISO date of first recorded pageview
}
