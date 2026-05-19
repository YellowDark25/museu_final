import { NextResponse } from "next/server"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import { getAdminVisitasOverview } from "@/features/visitas/server/visitas.service"

export async function GET() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 })
  }

  try {
    const overview = await getAdminVisitasOverview()
    return NextResponse.json(overview)
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao carregar visitas." },
      { status: 500 }
    )
  }
}
