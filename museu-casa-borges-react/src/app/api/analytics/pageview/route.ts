import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

const SECTION_MAP: Record<string, string> = {
  exposicoes: "exposicoes",
  acervo: "acervo",
  biblioteca: "biblioteca",
  eventos: "eventos",
  visitas: "visitas",
  sobre: "sobre",
}

function deriveSection(path: string): string | null {
  const segment = path.split("/").filter(Boolean)[0] ?? ""
  return SECTION_MAP[segment] ?? (segment === "" ? "home" : null)
}

function getAnonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient<Database>(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { path, sessionId, referrer } = body as {
      path?: string
      sessionId?: string
      referrer?: string
    }

    if (!path || typeof path !== "string" || path.length > 500) {
      return NextResponse.json({ error: "invalid path" }, { status: 400 })
    }
    if (!sessionId || typeof sessionId !== "string" || sessionId.length > 64) {
      return NextResponse.json({ error: "invalid sessionId" }, { status: 400 })
    }
    if (!path.startsWith("/")) {
      return NextResponse.json({ error: "invalid path" }, { status: 400 })
    }

    const section = deriveSection(path)

    const supabase = getAnonClient()
    await supabase.from("analytics_page_views").insert({
      path,
      section,
      session_id: sessionId,
      referrer: referrer?.slice(0, 500) ?? null,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 })
  }
}
