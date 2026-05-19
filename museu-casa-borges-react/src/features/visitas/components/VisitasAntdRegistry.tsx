"use client"

import type { ReactNode } from "react"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import { ConfigProvider } from "antd"
import ptBR from "antd/locale/pt_BR"
import type { ThemeConfig } from "antd"

import { MUSEU_RED } from "@/features/admin/config/admin-antd-theme"

/** Tema neutro nos campos; vermelho só em botão primário */
export const visitasFormAntdTheme: ThemeConfig = {
  token: {
    colorPrimary: MUSEU_RED,
    colorBorder: "#d9d9d9",
    colorText: "#1f2937",
  },
  components: {
    Input: {
      activeBorderColor: "#94a3b8",
      hoverBorderColor: "#94a3b8",
      activeShadow: "0 0 0 2px rgba(148, 163, 184, 0.2)",
    },
    DatePicker: {
      activeBorderColor: "#94a3b8",
      hoverBorderColor: "#94a3b8",
      activeShadow: "0 0 0 2px rgba(148, 163, 184, 0.2)",
    },
  },
}

type Props = {
  children: ReactNode
}

export function VisitasAntdRegistry({ children }: Props) {
  return (
    <AntdRegistry>
      <ConfigProvider locale={ptBR} theme={visitasFormAntdTheme}>
        {children}
      </ConfigProvider>
    </AntdRegistry>
  )
}
