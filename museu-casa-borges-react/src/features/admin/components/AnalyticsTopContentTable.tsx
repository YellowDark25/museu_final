"use client"

import { Table } from "antd"
import type { AnalyticsTopContentItem } from "@/features/analytics/dto/analytics.dto"

interface Props {
  data: AnalyticsTopContentItem[]
}

export function AnalyticsTopContentTable({ data }: Props) {
  const max = data[0]?.views ?? 1

  const columns = [
    {
      title: "#",
      key: "rank",
      width: 48,
      render: (_: unknown, __: unknown, index: number) => (
        <span className="text-slate-400 text-sm">{index + 1}</span>
      ),
    },
    {
      title: "Página",
      dataIndex: "label",
      key: "label",
      render: (label: string, row: AnalyticsTopContentItem) => (
        <div>
          <p className="text-sm font-medium text-slate-800">{label}</p>
          <p className="text-xs text-slate-400">{row.path}</p>
        </div>
      ),
    },
    {
      title: "Acessos",
      dataIndex: "views",
      key: "views",
      width: 160,
      render: (views: number) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-red-500"
              style={{ width: `${(views / max) * 100}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-slate-700 w-10 text-right">
            {views.toLocaleString("pt-BR")}
          </span>
        </div>
      ),
    },
  ]

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="path"
      pagination={false}
      size="small"
      locale={{ emptyText: "Nenhum dado de acesso ainda" }}
    />
  )
}
