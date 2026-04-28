import { NextResponse } from "next/server"
import { getPublicAcervoStats } from "@/features/acervo/server/public-acervo.service"

export async function GET() {
  const stats = await getPublicAcervoStats()

  return NextResponse.json(stats)
}
