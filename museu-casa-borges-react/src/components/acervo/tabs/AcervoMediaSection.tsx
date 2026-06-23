"use client"

import { Button, Card, Col, Empty, Row, Space, Tag, Typography } from "antd"
import type { PublicAcervoMediaDTO } from "@/features/acervo/dto/public-acervo.dto"

type Props = {
  title: string
  description: string
  emptyTitle: string
  emptyDescription: string
  media: PublicAcervoMediaDTO[]
  keyword?: string
}

function mediaTypeLabel(value: string | null) {
  if (!value) {
    return "Arquivo"
  }
  if (value === "imagem") return "Imagem"
  if (value === "documento") return "Documento"
  if (value === "video") return "Vídeo"
  if (value === "audio") return "Áudio"
  return value
}

export default function AcervoMediaSection({
  title,
  description,
  emptyTitle,
  emptyDescription,
  media,
  keyword,
}: Props) {
  const normalizedKeyword = keyword?.trim().toLowerCase() ?? ""
  const visibleMedia = normalizedKeyword
    ? media.filter((entry) =>
        [entry.nome, entry.legenda, entry.tipo, entry.categoriaNome, entry.url]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(normalizedKeyword)
          )
      )
    : media

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Typography.Title level={3} className="!mb-2">
          {title}
        </Typography.Title>
        <Typography.Paragraph type="secondary" className="!mb-0 max-w-3xl mx-auto">
          {description}
        </Typography.Paragraph>
      </div>

      {visibleMedia.length === 0 ? (
        <Empty
          description={
            <span>
              <Typography.Text strong className="block">
                {emptyTitle}
              </Typography.Text>
              <Typography.Text type="secondary" className="mt-1 block">
                {emptyDescription}
              </Typography.Text>
            </span>
          }
        />
      ) : (
        <Row gutter={[16, 16]}>
          {visibleMedia.map((entry) => (
            <Col xs={24} sm={12} xl={8} key={entry.id}>
              <Card variant="borderless" className="h-full shadow-sm" styles={{ body: { padding: "16px" } }}>
                <Space orientation="vertical" size="middle" className="w-full">
                  <Space wrap size={8}>
                    {entry.categoriaNome ? (
                      <Tag color="default" variant="filled">
                        {entry.categoriaNome}
                      </Tag>
                    ) : null}
                    <Tag variant="filled">{mediaTypeLabel(entry.tipo)}</Tag>
                  </Space>
                  <Typography.Title level={4} className="!mb-0 !text-lg">
                    {entry.nome?.trim() ||
                      entry.legenda?.trim() ||
                      "Mídia sem título"}
                  </Typography.Title>
                  <Typography.Text type="secondary" className="text-sm">
                    {mediaTypeLabel(entry.tipo)}
                  </Typography.Text>
                  <Button type="default" href={entry.url} target="_blank" rel="noreferrer">
                    Abrir arquivo
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}
