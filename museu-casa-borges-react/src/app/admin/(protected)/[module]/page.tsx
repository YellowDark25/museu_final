import { notFound } from "next/navigation"

import { AdminModuleView } from "@/features/admin/components/AdminModuleView"
import type { AdminModuleSlug } from "@/features/admin/dto/admin.dto"
import { getAdminModuleData } from "@/features/admin/server/admin-content.service"

type Props = {
  params: Promise<{
    module: string
  }>
}

export default async function AdminModulePage({ params }: Props) {
  const { module } = await params
  const data = await getAdminModuleData(module as AdminModuleSlug)

  if (!data) {
    notFound()
  }

  return <AdminModuleView data={data} />
}
