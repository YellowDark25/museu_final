import { NextResponse } from "next/server"
import { listGaleriasPublicas } from "@/features/galerias/server/public-galerias.service"

export async function GET() {
  try {
    const data = await listGaleriasPublicas()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao carregar galerias." },
      { status: 500 }
    )
  }
}
