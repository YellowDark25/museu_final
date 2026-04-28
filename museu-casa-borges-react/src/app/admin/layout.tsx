import type { ReactNode } from "react"

import { AdminAntdRegistry } from "@/features/admin/components/AdminAntdRegistry"

type Props = {
  children: ReactNode
}

export default function AdminLayout({ children }: Props) {
  return <AdminAntdRegistry>{children}</AdminAntdRegistry>
}
