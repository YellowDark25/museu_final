import { createClient } from "@supabase/supabase-js"

import type { Database } from "@/lib/database.types"

type SupabaseServerClient = ReturnType<typeof createClient<Database>>

const globalForSupabase = globalThis as unknown as {
  supabase: SupabaseServerClient | undefined
}

function assertEnvAndCreate(): SupabaseServerClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

  if (!url || !key) {
    throw new Error(
      "Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY (ficheiro .env local ou variáveis de ambiente no painel Vercel → Settings → Environment Variables)."
    )
  }

  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

/**
 * Cliente servidor (service role). Só valida env na primeira utilização —
 * evita falhar o `next build` quando o bundle analisa rotas sem secrets injetados.
 */
export function getSupabase(): SupabaseServerClient {
  if (!globalForSupabase.supabase) {
    globalForSupabase.supabase = assertEnvAndCreate()
  }
  return globalForSupabase.supabase
}

/**
 * Proxy compatível com `import { supabase } from "@/lib/supabase"` existente.
 * O primeiro `.from()` / método chamado dispara a criação do cliente.
 */
export const supabase = new Proxy({} as SupabaseServerClient, {
  get(_target, prop) {
    const client = getSupabase()
    const value = Reflect.get(client as object, prop, client)
    if (typeof value === "function") {
      return value.bind(client)
    }
    return value
  },
})
