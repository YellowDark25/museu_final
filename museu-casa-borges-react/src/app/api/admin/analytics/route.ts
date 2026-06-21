import { NextRequest, NextResponse } from "next/server"
import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import { getAdminAnalyticsOverview } from "@/features/analytics/server/analytics.service"

export async function GET(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const month =
    req.nextUrl.searchParams.get("month") ??
    new Date().toISOString().slice(0, 7) // 'YYYY-MM'

  if (!/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json({ error: "Parâmetro month inválido" }, { status: 400 })
  }

  const data = await getAdminAnalyticsOverview(month)
  return NextResponse.json(data)
}
