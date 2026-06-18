import { NextRequest, NextResponse } from "next/server"

const SESSION_COOKIE = "museu_analytics_sid"

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

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const response = NextResponse.next()

  if (!shouldTrack(pathname)) {
    return response
  }

  let sessionId = req.cookies.get(SESSION_COOKIE)?.value
  if (!sessionId) {
    sessionId = generateSessionId()
    response.cookies.set(SESSION_COOKIE, sessionId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: "lax",
    })
  }

  const baseUrl = req.nextUrl.origin
  const referrer = req.headers.get("referer") ?? undefined

  // fire-and-forget: não bloqueia a resposta ao visitante
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
