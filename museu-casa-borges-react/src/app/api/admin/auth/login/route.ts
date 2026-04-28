import { NextResponse } from "next/server"

import type { AdminLoginInputDTO } from "@/features/admin/auth/dto/admin-auth.dto"
import {
  authenticateAdmin,
  buildAdminSessionToken,
  getAdminCookieOptions,
  getAdminSessionCookieName,
} from "@/features/admin/auth/server/admin-auth.service"

export async function POST(request: Request) {
  let body: AdminLoginInputDTO

  try {
    body = (await request.json()) as AdminLoginInputDTO
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Payload de login inválido.",
        fieldErrors: {},
      },
      { status: 400 }
    )
  }

  const result = await authenticateAdmin(body)

  if (!result.ok) {
    return NextResponse.json(result, { status: 401 })
  }

  const response = NextResponse.json(result)
  response.cookies.set(
    getAdminSessionCookieName(),
    buildAdminSessionToken(result.session),
    getAdminCookieOptions(result.session.expiresAt)
  )

  return response
}
