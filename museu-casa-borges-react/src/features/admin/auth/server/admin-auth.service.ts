import { createHmac, scryptSync, timingSafeEqual } from "node:crypto"

import { cookies } from "next/headers"

import { supabase } from "@/lib/supabase"
import type {
  AdminAuthResponseDTO,
  AdminLoginInputDTO,
  AdminSessionDTO,
} from "@/features/admin/auth/dto/admin-auth.dto"

const ADMIN_SESSION_COOKIE_NAME = "mcb_admin_session"
const DEV_ADMIN_SESSION_SECRET = "mcb-local-session-secret"

type SessionPayload = {
  sub: number
  name: string
  email: string
  role: "admin"
  exp: number
  iat: number
}

function isProduction() {
  return process.env.NODE_ENV === "production"
}

export function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 64).toString("hex")
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return timingSafeEqual(leftBuffer, rightBuffer)
}

function getSessionSecret() {
  const sessionSecret = process.env.ADMIN_SESSION_SECRET?.trim()

  if (sessionSecret) {
    return sessionSecret
  }

  if (isProduction()) {
    throw new Error("O segredo da sessão administrativa não foi configurado.")
  }

  return DEV_ADMIN_SESSION_SECRET
}

function getSessionDurationHours() {
  const sessionDurationHours = Number(process.env.ADMIN_SESSION_DURATION_HOURS ?? 12)

  if (Number.isFinite(sessionDurationHours) && sessionDurationHours > 0) {
    return sessionDurationHours
  }

  return 12
}

function signSessionPayload(encodedPayload: string, secret: string) {
  return createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64url")
}

function createSessionToken(session: AdminSessionDTO) {
  const payload: SessionPayload = {
    sub: session.userId,
    name: session.name,
    email: session.email,
    role: session.role,
    exp: Math.floor(new Date(session.expiresAt).getTime() / 1000),
    iat: Math.floor(Date.now() / 1000),
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const signature = signSessionPayload(encodedPayload, getSessionSecret())

  return `${encodedPayload}.${signature}`
}

function parseSessionToken(token: string): SessionPayload | null {
  const [encodedPayload, signature] = token.split(".")

  if (!encodedPayload || !signature) {
    return null
  }

  const expectedSignature = signSessionPayload(
    encodedPayload,
    getSessionSecret()
  )

  if (!safeCompare(signature, expectedSignature)) {
    return null
  }

  let payload: SessionPayload

  try {
    payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as SessionPayload
  } catch {
    return null
  }

  if (payload.exp * 1000 <= Date.now()) {
    return null
  }

  return payload
}

function createSession(user: {
  id: number
  nome: string
  email: string
}): AdminSessionDTO {
  const expiresAt = new Date(
    Date.now() + getSessionDurationHours() * 60 * 60 * 1000
  ).toISOString()

  return {
    userId: user.id,
    name: user.nome,
    email: user.email.toLowerCase(),
    role: "admin",
    expiresAt,
  }
}

export function getAdminSessionCookieName() {
  return ADMIN_SESSION_COOKIE_NAME
}

export function getAdminCookieOptions(expiresAt?: string) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isProduction(),
    path: "/",
    expires: expiresAt ? new Date(expiresAt) : new Date(0),
  }
}

export async function authenticateAdmin(
  credentials: AdminLoginInputDTO
): Promise<AdminAuthResponseDTO> {
  const email = credentials.email.trim().toLowerCase()
  const password = credentials.password
  const fieldErrors: Record<string, string> = {}

  if (!email) {
    fieldErrors.email = "Informe o e-mail de acesso."
  }

  if (!password) {
    fieldErrors.password = "Informe a senha de acesso."
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Preencha os campos obrigatórios.",
      fieldErrors,
    }
  }

  const { data: user } = await supabase
    .from("admin_users")
    .select("id, nome, email, password_hash, password_salt, ativo")
    .eq("email", email)
    .maybeSingle()

  if (!user || !user.ativo) {
    return {
      ok: false,
      message: "Credenciais inválidas.",
      fieldErrors: {},
    }
  }

  const receivedHash = hashPassword(password, user.password_salt)
  const isValidEmail = safeCompare(email, user.email.toLowerCase())
  const isValidPassword = safeCompare(receivedHash, user.password_hash)

  if (!isValidEmail || !isValidPassword) {
    return {
      ok: false,
      message: "Credenciais inválidas.",
      fieldErrors: {},
    }
  }

  await supabase
    .from("admin_users")
    .update({
      ultimo_login_em: new Date().toISOString(),
      atualizado_em: new Date().toISOString(),
    })
    .eq("id", user.id)

  const session = createSession(user)

  return {
    ok: true,
    message: "Login realizado com sucesso.",
    redirectTo: "/admin",
    session,
  }
}

export async function getAdminSession(): Promise<AdminSessionDTO | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value

  if (!token) {
    return null
  }

  const payload = parseSessionToken(token)

  if (!payload) {
    return null
  }

  const { data: user } = await supabase
    .from("admin_users")
    .select("id, nome, email, ativo")
    .eq("id", payload.sub)
    .maybeSingle()

  if (
    !user ||
    !user.ativo ||
    !safeCompare(user.email.toLowerCase(), payload.email.toLowerCase())
  ) {
    return null
  }

  return {
    userId: user.id,
    name: user.nome,
    email: user.email.toLowerCase(),
    role: payload.role,
    expiresAt: new Date(payload.exp * 1000).toISOString(),
  }
}

export function buildAdminSessionToken(session: AdminSessionDTO) {
  return createSessionToken(session)
}
