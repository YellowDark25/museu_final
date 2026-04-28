"use client"

import {
  Archive,
  BookOpen,
  Images,
  LayoutPanelTop,
  Settings,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react"

import type { AdminIconKey } from "@/features/admin/dto/admin.dto"

const iconMap: Record<AdminIconKey, LucideIcon> = {
  archive: Archive,
  "book-open": BookOpen,
  images: Images,
  "layout-panel-top": LayoutPanelTop,
  settings: Settings,
  sparkles: Sparkles,
  users: Users,
}

type Props = {
  iconKey: AdminIconKey
  className?: string
}

export function AdminIcon({ iconKey, className }: Props) {
  const Icon = iconMap[iconKey]

  return <Icon className={className} />
}
