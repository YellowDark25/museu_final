import { redirect } from "next/navigation"
import type { ReactNode } from "react"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import { adminDashboardSeed } from "@/features/admin/config/admin-content.config"
import { AdminShell } from "@/features/admin/components/AdminShell"

type Props = {
  children: ReactNode
}

export default async function AdminProtectedLayout({ children }: Props) {
  const session = await getAdminSession()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <AdminShell navigation={adminDashboardSeed.navigation} session={session}>
      {children}
    </AdminShell>
  )
}
