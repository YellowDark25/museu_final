import { NextResponse } from "next/server"

import {
  getAdminCookieOptions,
  getAdminSessionCookieName,
} from "@/features/admin/auth/server/admin-auth.service"

export async function POST() {
  const response = NextResponse.json({
    ok: true,
    message: "Sessão encerrada.",
    redirectTo: "/admin/login",
  })

  response.cookies.set(
    getAdminSessionCookieName(),
    "",
    getAdminCookieOptions()
  )

  return response
}
