import {
  adminDashboardSeed,
  getAdminModulePageSeed,
} from "@/features/admin/config/admin-content.config"
import type {
  AdminDashboardDTO,
  AdminModulePageDTO,
  AdminModuleSlug,
} from "@/features/admin/dto/admin.dto"

export async function getAdminDashboardData(): Promise<AdminDashboardDTO> {
  return adminDashboardSeed
}

export async function getAdminModuleData(
  slug: AdminModuleSlug
): Promise<AdminModulePageDTO | null> {
  return getAdminModulePageSeed(slug)
}
