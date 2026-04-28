"use client"

import type { ReactNode } from "react"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import { ConfigProvider } from "antd"
import ptBR from "antd/locale/pt_BR"

import { adminAntdTheme } from "@/features/admin/config/admin-antd-theme"

type Props = {
  children: ReactNode
}

export function AcervoAntdRegistry({ children }: Props) {
  return (
    <AntdRegistry>
      <ConfigProvider locale={ptBR} theme={adminAntdTheme}>
        {children}
      </ConfigProvider>
    </AntdRegistry>
  )
}
