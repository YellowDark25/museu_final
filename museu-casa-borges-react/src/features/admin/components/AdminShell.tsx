import Link from "next/link"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { AdminLogoutButton } from "@/features/admin/auth/components/AdminLogoutButton"
import { AdminSidebar } from "@/features/admin/components/AdminSidebar"
import type { AdminNavigationItemDTO } from "@/features/admin/dto/admin.dto"
import type { AdminSessionDTO } from "@/features/admin/auth/dto/admin-auth.dto"

type Props = {
  navigation: AdminNavigationItemDTO[]
  session: AdminSessionDTO
  children: ReactNode
}

export function AdminShell({ navigation, session, children }: Props) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-slate-100 lg:flex-row">
      <AdminSidebar navigation={navigation} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col px-4 py-6 lg:px-6 lg:py-6">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">
                Backoffice central
              </p>
              <h1 className="text-2xl font-semibold text-slate-950">
                Administração de conteúdo
              </h1>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
                Sessão ativa: <span className="font-medium text-slate-900">{session.name}</span>
              </div>

              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/acervo">Ver site público</Link>
              </Button>

              <AdminLogoutButton />
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
