import { createServerClient } from "@supabase/ssr"
import { NextRequest, NextResponse } from "next/server"

const ANALYTICS_SESSION_COOKIE = "museu_analytics_sid"

const IGNORED_PREFIXES = [
  "/admin",
  "/api",
  "/_next",
  "/__nextjs",
]

const IGNORED_EXTENSIONS = /\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|map)$/i

function shouldTrack(pathname: string): boolean {
  if (IGNORED_EXTENSIONS.test(pathname)) return false
  for (const prefix of IGNORED_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(prefix + "/")) return false
  }
  return true
}

function generateSessionId(): string {
  return crypto.randomUUID()
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Supabase Auth: renova o token de sessão em todas as rotas do admin
  // para que o access token (1h) seja atualizado sem precisar re-login.
  let response = NextResponse.next({ request: req })

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return req.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              req.cookies.set(name, value)
            )
            response = NextResponse.next({ request: req })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    await supabase.auth.getUser()
    return response
  }

  // Analytics: rastreia pageviews do site público
  if (!shouldTrack(pathname)) {
    return response
  }

  let sessionId = req.cookies.get(ANALYTICS_SESSION_COOKIE)?.value
  if (!sessionId) {
    sessionId = generateSessionId()
    response.cookies.set(ANALYTICS_SESSION_COOKIE, sessionId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: "lax",
    })
  }

  const baseUrl = req.nextUrl.origin
  const referrer = req.headers.get("referer") ?? undefined

  fetch(`${baseUrl}/api/analytics/pageview`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: pathname, sessionId, referrer }),
  }).catch(() => {})

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
