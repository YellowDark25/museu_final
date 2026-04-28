"use client"

import { useCallback, useMemo, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type {
  AdminAuthErrorDTO,
  AdminAuthResponseDTO,
  AdminLoginFieldErrorsDTO,
} from "@/features/admin/auth/dto/admin-auth.dto"

type Props = {
  title: string
  description: string
}

const initialFieldErrors: AdminLoginFieldErrorsDTO = {}

export function AdminLoginForm({ title, description }: Props) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] =
    useState<AdminLoginFieldErrorsDTO>(initialFieldErrors)

  const isDisabled = useMemo(() => pending, [pending])

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setPending(true)
      setMessage(null)
      setFieldErrors(initialFieldErrors)

      try {
        const response = await fetch("/api/admin/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
        const result = (await response.json()) as AdminAuthResponseDTO

        if (!response.ok || !result.ok) {
          const errorResult = result as AdminAuthErrorDTO
          setMessage(errorResult.message)
          setFieldErrors(errorResult.fieldErrors)
          return
        }

        router.replace(result.redirectTo)
        router.refresh()
      } catch {
        setMessage("Não foi possível validar o login agora.")
      } finally {
        setPending(false)
      }
    },
    [email, password, router]
  )

  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">E-mail</Label>
            <Input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="admin@museucasaborges.local"
              disabled={isDisabled}
            />
            {fieldErrors.email ? (
              <p className="text-sm text-red-600">{fieldErrors.email}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-password">Senha</Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
              disabled={isDisabled}
            />
            {fieldErrors.password ? (
              <p className="text-sm text-red-600">{fieldErrors.password}</p>
            ) : null}
          </div>

          {message ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {message}
            </div>
          ) : null}

          <Button type="submit" className="w-full" disabled={isDisabled}>
            {pending ? "Validando acesso..." : "Entrar no painel"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
