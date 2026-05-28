import { redirect } from "next/navigation"
import type { ReactNode } from "react"

import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import { AdminShell } from "@/features/admin/components/AdminShell"
import { getAdminDashboardData } from "@/features/admin/server/admin-content.service"

type Props = {
  children: ReactNode
}

export default async function AdminProtectedLayout({ children }: Props) {
  const session = await getAdminSession()

  if (!session) {
    redirect("/admin/login")
  }

  const { navigation } = await getAdminDashboardData()

  return (
    <AdminShell navigation={navigation} session={session}>
      {children}
    </AdminShell>
  )
}
