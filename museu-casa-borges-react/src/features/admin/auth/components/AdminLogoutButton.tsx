"use client"

import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export function AdminLogoutButton() {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  const handleLogout = useCallback(async () => {
    setPending(true)

    try {
      await fetch("/api/admin/auth/logout", {
        method: "POST",
      })
      router.replace("/admin/login")
      router.refresh()
    } finally {
      setPending(false)
    }
  }, [router])

  return (
    <Button variant="outline" onClick={handleLogout} disabled={pending}>
      {pending ? "Saindo..." : "Sair"}
    </Button>
  )
}
