import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

import type { Database } from "@/lib/database.types"

/**
 * Cliente Supabase SSR para autenticação.
 * Lê e escreve cookies de sessão automaticamente via next/headers.
 * Usa a chave anon (não a service role) pois opera no contexto do usuário autenticado.
 */
export async function createSupabaseAuthClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Em Server Components (read-only), ignora silenciosamente.
            // Em Route Handlers e Server Actions, funciona normalmente.
          }
        },
      },
    }
  )
}
