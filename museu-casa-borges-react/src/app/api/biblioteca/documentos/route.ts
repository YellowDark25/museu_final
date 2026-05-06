import { NextResponse } from "next/server"

import { listPublicBibliotecaDocumentos } from "@/features/admin/biblioteca/server/admin-biblioteca.service"

export async function GET() {
  try {
    const documentos = await listPublicBibliotecaDocumentos()

    return NextResponse.json({ documentos })
  } catch {
    return NextResponse.json(
      { message: "Não foi possível carregar a biblioteca." },
      { status: 500 }
    )
  }
}
