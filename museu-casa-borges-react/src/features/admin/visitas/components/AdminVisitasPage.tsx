"use client"

import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Modal,
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

import type { AdminVisitasOverviewDTO, SolicitacaoVisitaDTO } from "@/features/visitas/dto/visitas.dto"
import { VISITA_STATUS_LABELS } from "@/features/visitas/dto/visitas.dto"
import { useAdminVisitasManager } from "@/features/admin/visitas/hooks/useAdminVisitasManager"
import { MUSEU_RED } from "@/features/admin/config/admin-antd-theme"

type Props = {
  initialData: AdminVisitasOverviewDTO
}

const statusColors: Record<string, string> = {
  pendente: "gold",
  aceita: "green",
  recusada: "red",
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(`${value}T12:00:00`))
}

function formatTime(value: string) {
  return value.slice(0, 5)
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value))
}

export function AdminVisitasPage({ initialData }: Props) {
  const { solicitacoes, kpis, pending, error, updateStatus } = useAdminVisitasManager(initialData)
  const [selected, setSelected] = useState<SolicitacaoVisitaDTO | null>(null)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [rejectTarget, setRejectTarget] = useState<SolicitacaoVisitaDTO | null>(null)
  const [observacao, setObservacao] = useState("")

  const columns: ColumnsType<SolicitacaoVisitaDTO> = useMemo(
    () => [
      {
        title: "Solicitante",
        key: "solicitante",
        render: (_, row) => (
          <div>
            <Typography.Text strong>{row.nomeInstituicao}</Typography.Text>
            <br />
            <Typography.Text type="secondary" className="text-xs">
              {row.email}
            </Typography.Text>
          </div>
        ),
      },
      {
        title: "Data / Horário",
        key: "data",
        render: (_, row) => (
          <span>
            {formatDate(row.dataVisita)} às {formatTime(row.horarioVisita)}
          </span>
        ),
      },
      {
        title: "Pessoas",
        dataIndex: "numeroPessoas",
        key: "pessoas",
        render: (value: string | null) => value ?? "—",
      },
      {
        title: "Telefone",
        dataIndex: "telefone",
        key: "telefone",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: SolicitacaoVisitaDTO["status"]) => (
          <Tag color={statusColors[status]}>{VISITA_STATUS_LABELS[status]}</Tag>
        ),
      },
      {
        title: "Recebida em",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (value: string) => formatDateTime(value),
      },
      {
        title: "Ações",
        key: "acoes",
        render: (_, row) => (
          <Space wrap>
            <Button size="small" onClick={() => setSelected(row)}>
              Detalhes
            </Button>
            {row.status === "pendente" && (
              <>
                <Popconfirm
                  title="Aceitar esta solicitação de visita?"
                  onConfirm={() => updateStatus(row.id, "aceita")}
                  okText="Aceitar"
                  cancelText="Cancelar"
                >
                  <Button size="small" type="primary" style={{ background: MUSEU_RED }}>
                    Aceitar
                  </Button>
                </Popconfirm>
                <Button
                  size="small"
                  danger
                  onClick={() => {
                    setRejectTarget(row)
                    setObservacao("")
                    setRejectModalOpen(true)
                  }}
                >
                  Recusar
                </Button>
              </>
            )}
          </Space>
        ),
      },
    ],
    [updateStatus]
  )

  async function handleReject() {
    if (!rejectTarget) return
    await updateStatus(rejectTarget.id, "recusada", observacao)
    setRejectModalOpen(false)
    setRejectTarget(null)
    setObservacao("")
  }

  return (
    <div className="space-y-6">
      <div>
        <Typography.Title level={3} style={{ marginBottom: 4 }}>
          Visitas
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          Solicitações de visitação guiada enviadas pelo site. Aceite ou recuse cada pedido.
        </Typography.Paragraph>
      </div>

      {error && <Alert type="error" message={error} showIcon />}

      <Row gutter={[16, 16]}>
        <Col xs={12} lg={6}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic title="Total" value={kpis.total} />
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic title="Pendentes" value={kpis.pendentes} styles={{ content: { color: "#d97706" } }} />
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic title="Aceitas" value={kpis.aceitas} styles={{ content: { color: "#16a34a" } }} />
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic title="Recusadas" value={kpis.recusadas} styles={{ content: { color: "#dc2626" } }} />
          </Card>
        </Col>
      </Row>

      <Card variant="borderless" className="shadow-sm">
        <Table
          rowKey="id"
          loading={pending}
          columns={columns}
          dataSource={solicitacoes}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          locale={{ emptyText: "Nenhuma solicitação de visita registrada." }}
        />
      </Card>

      <Modal
        title="Detalhes da solicitação"
        open={Boolean(selected)}
        onCancel={() => setSelected(null)}
        footer={[
          <Button key="close" onClick={() => setSelected(null)}>
            Fechar
          </Button>,
        ]}
        width={640}
      >
        {selected && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Nome / Instituição">
              {selected.nomeInstituicao}
            </Descriptions.Item>
            <Descriptions.Item label="E-mail">{selected.email}</Descriptions.Item>
            <Descriptions.Item label="Telefone">{selected.telefone}</Descriptions.Item>
            <Descriptions.Item label="Endereço">{selected.endereco ?? "—"}</Descriptions.Item>
            <Descriptions.Item label="Data da visita">
              {formatDate(selected.dataVisita)}
            </Descriptions.Item>
            <Descriptions.Item label="Horário">
              {formatTime(selected.horarioVisita)}
            </Descriptions.Item>
            <Descriptions.Item label="Nº de pessoas">
              {selected.numeroPessoas ?? "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Objetivo">
              {selected.objetivoVisita ?? "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Comentários">
              {selected.comentarios ?? "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={statusColors[selected.status]}>
                {VISITA_STATUS_LABELS[selected.status]}
              </Tag>
            </Descriptions.Item>
            {selected.observacaoAdmin && (
              <Descriptions.Item label="Observação admin">
                {selected.observacaoAdmin}
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>

      <Modal
        title="Recusar solicitação"
        open={rejectModalOpen}
        onCancel={() => setRejectModalOpen(false)}
        onOk={handleReject}
        okText="Confirmar recusa"
        okButtonProps={{ danger: true }}
        confirmLoading={pending}
      >
        <Typography.Paragraph>
          Opcionalmente, informe o motivo da recusa (visível apenas no painel).
        </Typography.Paragraph>
        <textarea
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          placeholder="Motivo da recusa..."
        />
      </Modal>
    </div>
  )
}
