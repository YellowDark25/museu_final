"use client"

import {
  AudioOutlined,
  FileTextOutlined,
  PictureOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons"
import { Card, Col, Row, Statistic } from "antd"
import type { PublicAcervoStatsDTO } from "@/features/acervo/dto/public-acervo.dto"

type Props = {
  stats: PublicAcervoStatsDTO | null
  loading?: boolean
}

const iconStyle = { color: "var(--museu-red, #d12424)", fontSize: 22 }

export default function StatsCards({ stats, loading }: Props) {
  const items = [
    {
      label: "Documentos",
      value: stats?.documentos ?? 0,
      icon: <FileTextOutlined style={iconStyle} />,
    },
    {
      label: "Fotografias",
      value: stats?.fotografias ?? 0,
      icon: <PictureOutlined style={iconStyle} />,
    },
    {
      label: "Vídeos",
      value: stats?.videos ?? 0,
      icon: <VideoCameraOutlined style={iconStyle} />,
    },
    {
      label: "Áudios",
      value: stats?.audios ?? 0,
      icon: <AudioOutlined style={iconStyle} />,
    },
  ]

  return (
    <Row gutter={[16, 16]}>
      {items.map((it) => (
        <Col xs={12} sm={12} lg={6} key={it.label}>
          <Card variant="borderless" className="shadow-sm" styles={{ body: { padding: "14px 16px" } }}>
            <Statistic
              title={it.label}
              value={loading ? "…" : it.value}
              loading={loading}
              prefix={it.icon}
              styles={{ content: { fontWeight: 700 } }}
            />
          </Card>
        </Col>
      ))}
    </Row>
  )
}
