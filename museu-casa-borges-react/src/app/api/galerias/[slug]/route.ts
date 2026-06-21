import { NextResponse } from "next/server"
import { getGaleriaBySlug } from "@/features/galerias/server/public-galerias.service"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const data = await getGaleriaBySlug(slug)
    if (!data) {
      return NextResponse.json({ message: "Galeria não encontrada." }, { status: 404 })
    }
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao carregar galeria." },
      { status: 500 }
    )
  }
}
