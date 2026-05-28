"use client"

import {
  Archive,
  BookOpen,
  Calendar,
  Images,
  LayoutPanelTop,
  Newspaper,
  Settings,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react"

import type { AdminIconKey } from "@/features/admin/dto/admin.dto"

const iconMap: Record<AdminIconKey, LucideIcon> = {
  archive: Archive,
  "book-open": BookOpen,
  calendar: Calendar,
  images: Images,
  "layout-panel-top": LayoutPanelTop,
  settings: Settings,
  sparkles: Sparkles,
  newspaper: Newspaper,
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
