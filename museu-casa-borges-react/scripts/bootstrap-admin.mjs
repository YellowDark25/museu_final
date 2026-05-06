import { randomBytes, scryptSync } from "node:crypto"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY antes de executar este script."
  )
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const isProduction = process.env.NODE_ENV === "production"
const email =
  process.env.ADMIN_BOOTSTRAP_EMAIL?.trim().toLowerCase() ??
  (isProduction ? undefined : "admin@museucasaborges.local")
const password =
  process.env.ADMIN_BOOTSTRAP_PASSWORD?.trim() ??
  (isProduction ? undefined : "admin123")
const name =
  process.env.ADMIN_BOOTSTRAP_NAME?.trim() ||
  "Administrador Museu Casa Borges"

if (!email || !password) {
  console.error(
    "Defina ADMIN_BOOTSTRAP_EMAIL e ADMIN_BOOTSTRAP_PASSWORD para criar o admin."
  )
  process.exit(1)
}

const passwordSalt = randomBytes(16).toString("hex")
const passwordHash = scryptSync(password, passwordSalt, 64).toString("hex")
const now = new Date().toISOString()

try {
  const { data: adminUser, error } = await supabase
    .from("admin_users")
    .upsert(
      {
        email,
        nome: name,
        password_salt: passwordSalt,
        password_hash: passwordHash,
        ativo: true,
        atualizado_em: now,
      },
      { onConflict: "email" }
    )
    .select("id, email, nome, ativo")
    .single()

  if (error) throw error

  console.log(JSON.stringify({ ok: true, adminUser }, null, 2))
} catch (error) {
  console.error(error)
  process.exitCode = 1
}
