import { NextResponse } from "next/server"

import { getPublicAcervoOverview } from "@/features/acervo/server/public-acervo.service"

export async function GET() {
  const overview = await getPublicAcervoOverview()

  return NextResponse.json(overview)
}
