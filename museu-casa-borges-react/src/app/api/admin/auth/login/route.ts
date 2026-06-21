import { NextResponse } from "next/server"

import { createSupabaseAuthClient } from "@/lib/supabase-auth"
import type { AdminLoginInputDTO } from "@/features/admin/auth/dto/admin-auth.dto"

export async function POST(request: Request) {
  let body: AdminLoginInputDTO

  try {
    body = (await request.json()) as AdminLoginInputDTO
  } catch {
    return NextResponse.json(
      { ok: false, message: "Payload de login inválido.", fieldErrors: {} },
      { status: 400 }
    )
  }

  const email = body.email?.trim().toLowerCase()
  const password = body.password

  if (!email || !password) {
    return NextResponse.json(
      {
        ok: false,
        message: "Preencha os campos obrigatórios.",
        fieldErrors: {
          ...(!email && { email: "Informe o e-mail de acesso." }),
          ...(!password && { password: "Informe a senha de acesso." }),
        },
      },
      { status: 400 }
    )
  }

  const supabase = await createSupabaseAuthClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return NextResponse.json(
      { ok: false, message: "Credenciais inválidas.", fieldErrors: {} },
      { status: 401 }
    )
  }

  return NextResponse.json({
    ok: true,
    message: "Login realizado com sucesso.",
    redirectTo: "/admin",
  })
}
