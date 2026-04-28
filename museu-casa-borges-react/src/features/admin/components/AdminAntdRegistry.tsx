"use client"

import type { ReactNode } from "react"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import { App, ConfigProvider } from "antd"
import ptBR from "antd/locale/pt_BR"

import { adminAntdTheme } from "@/features/admin/config/admin-antd-theme"

type Props = {
  children: ReactNode
}

export function AdminAntdRegistry({ children }: Props) {
  return (
    <AntdRegistry>
      <ConfigProvider locale={ptBR} theme={adminAntdTheme}>
        <App>{children}</App>
      </ConfigProvider>
    </AntdRegistry>
  )
}
