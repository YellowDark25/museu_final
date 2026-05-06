import { createClient } from "@supabase/supabase-js"

import type { Database } from "@/lib/database.types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    "Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no arquivo .env"
  )
}

// Singleton para evitar múltiplas instâncias em dev (hot reload).
// Usa service_role para operações de servidor — nunca exponha ao browser.
const globalForSupabase = globalThis as unknown as {
  supabase: ReturnType<typeof createClient<Database>> | undefined
}

export const supabase =
  globalForSupabase.supabase ??
  createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

if (process.env.NODE_ENV !== "production") {
  globalForSupabase.supabase = supabase
}
