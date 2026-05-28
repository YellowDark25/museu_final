"use client"

import {
  Alert,
  Button,
  Card,
  Col,
  Popconfirm,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd"
import type { ColumnsType } from "antd/es/table"
import { useMemo, useState } from "react"

import type { AdminNoticiasOverviewDTO, NoticiaDTO } from "@/features/noticias/dto/noticias.dto"
import { AdminNoticiaForm } from "@/features/admin/noticias/components/AdminNoticiaForm"
import { useAdminNoticiasManager } from "@/features/admin/noticias/hooks/useAdminNoticiasManager"
import { MUSEU_RED } from "@/features/admin/config/admin-antd-theme"

type Props = {
  initialData: AdminNoticiasOverviewDTO
}

function formatDate(value: string | null) {
  if (!value) return "—"
  return new Intl.DateTimeFormat("pt-BR").format(new Date(value))
}

export function AdminNoticiasPage({ initialData }: Props) {
  const { noticias, kpis, pending, error, saveNoticia, deleteNoticia } =
    useAdminNoticiasManager(initialData)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<NoticiaDTO | null>(null)

  const columns: ColumnsType<NoticiaDTO> = useMemo(
    () => [
      {
        title: "Imagem",
        dataIndex: "imagemUrl",
        key: "imagem",
        width: 120,
        render: (url: string) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="h-16 w-24 rounded object-cover" />
        ),
      },
      {
        title: "Título",
        dataIndex: "titulo",
        key: "titulo",
      },
      {
        title: "Período",
        key: "periodo",
        render: (_, row) => (
          <span>
            {formatDate(row.dataInicio)} — {formatDate(row.dataFim)}
          </span>
        ),
      },
      {
        title: "Status",
        key: "status",
        render: (_, row) => (
          <Space orientation="vertical" size={4}>
            <Tag color={row.publicado ? "green" : "default"}>
              {row.publicado ? "Publicada" : "Rascunho"}
            </Tag>
            {row.publicado && row.exibirPopup ? (
              <Tag color={MUSEU_RED}>Popup ativo</Tag>
            ) : null}
          </Space>
        ),
      },
      {
        title: "Ações",
        key: "acoes",
        render: (_, row) => (
          <Space>
            <Button
              size="small"
              onClick={() => {
                setEditing(row)
                setDialogOpen(true)
              }}
            >
              Editar
            </Button>
            <Popconfirm
              title="Excluir esta notícia?"
              okText="Excluir"
              cancelText="Cancelar"
              onConfirm={() => deleteNoticia(row.id)}
            >
              <Button size="small" danger loading={pending}>
                Excluir
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [deleteNoticia, pending]
  )

  async function handleSave(input: Parameters<typeof saveNoticia>[0]) {
    await saveNoticia(input, editing?.id)
    setDialogOpen(false)
    setEditing(null)
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Typography.Text type="secondary">Comunicação</Typography.Text>
            <Typography.Title level={3} className="!mb-0">
              Notícias e avisos
            </Typography.Title>
            <Typography.Paragraph className="!mb-0 max-w-2xl text-slate-600">
              Cadastre imagens para exibir um popup na página inicial ao abrir o site — ideal
              para divulgar eventos e avisos importantes.
            </Typography.Paragraph>
          </div>

          <Button
            type="primary"
            onClick={() => {
              setEditing(null)
              setDialogOpen(true)
            }}
          >
            Nova notícia
          </Button>
        </div>
      </Card>

      {error ? <Alert type="error" message={error} showIcon /> : null}

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <Statistic title="Total" value={kpis.total} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <Statistic title="Publicadas" value={kpis.publicadas} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <Statistic title="Popup ativo agora" value={kpis.popupAtivo} />
          </Card>
        </Col>
      </Row>

      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={noticias}
          loading={pending}
          pagination={{ pageSize: 8 }}
        />
      </Card>

      <AdminNoticiaForm
        open={dialogOpen}
        editing={editing}
        onSave={handleSave}
        onCancel={() => {
          setDialogOpen(false)
          setEditing(null)
        }}
        loading={pending}
      />
    </div>
  )
}
