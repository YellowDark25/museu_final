import { NextResponse } from "next/server"

import { createSupabaseAuthClient } from "@/lib/supabase-auth"

export async function POST() {
  const supabase = await createSupabaseAuthClient()
  await supabase.auth.signOut()

  return NextResponse.json({
    ok: true,
    message: "Sessão encerrada.",
    redirectTo: "/admin/login",
  })
}
