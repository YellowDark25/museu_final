"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { AdminIcon } from "@/features/admin/components/AdminIcon"
import type { AdminNavigationItemDTO } from "@/features/admin/dto/admin.dto"

type Props = {
  navigation: AdminNavigationItemDTO[]
}

export function AdminSidebar({ navigation }: Props) {
  const pathname = usePathname()

  return (
    <aside className="flex w-full flex-shrink-0 flex-col border-b border-slate-200 bg-white px-4 py-5 lg:w-64 lg:border-b-0 lg:border-r lg:px-4 lg:py-6">

      <nav className="mt-6 flex flex-col gap-2 lg:flex-1 lg:overflow-y-auto">
        {navigation.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-[#d12424] text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-100"
              )}
            >
              <AdminIcon iconKey={item.iconKey} className="h-4 w-4" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
