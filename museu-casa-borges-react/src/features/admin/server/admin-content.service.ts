import {
  adminDashboardSeed,
  getAdminModulePageSeed,
} from "@/features/admin/config/admin-content.config"
import type {
  AdminDashboardDTO,
  AdminModulePageDTO,
  AdminModuleSlug,
} from "@/features/admin/dto/admin.dto"

const hiddenAdminModules = new Set<AdminModuleSlug>([
  "paginas",
  "equipe",
  "configuracoes",
])

function getVisibleAdminDashboardData(): AdminDashboardDTO {
  return {
    ...adminDashboardSeed,
    navigation: adminDashboardSeed.navigation.filter(
      (item) => !item.module || !hiddenAdminModules.has(item.module)
    ),
    modules: adminDashboardSeed.modules.filter(
      (module) => !hiddenAdminModules.has(module.slug)
    ),
  }
}

export async function getAdminDashboardData(): Promise<AdminDashboardDTO> {
  return getVisibleAdminDashboardData()
}

export async function getAdminModuleData(
  slug: AdminModuleSlug
): Promise<AdminModulePageDTO | null> {
  return getAdminModulePageSeed(slug)
}
