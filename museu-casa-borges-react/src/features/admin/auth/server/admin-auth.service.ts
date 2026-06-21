import { createSupabaseAuthClient } from "@/lib/supabase-auth"
import type { AdminSessionDTO } from "@/features/admin/auth/dto/admin-auth.dto"

/**
 * Retorna a sessão do admin autenticado via Supabase Auth,
 * ou null se não houver sessão válida.
 */
export async function getAdminSession(): Promise<AdminSessionDTO | null> {
  const supabase = await createSupabaseAuthClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const name =
    (user.user_metadata?.name as string | undefined) ??
    user.email?.split("@")[0] ??
    "Admin"

  const expiresAt = new Date(
    Date.now() + 12 * 60 * 60 * 1000
  ).toISOString()

  return {
    userId: user.id,
    name,
    email: user.email ?? "",
    role: "admin",
    expiresAt,
  }
}
