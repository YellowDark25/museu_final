"use client"

import { useState } from "react"
import {
  Alert,
  Button,
  Card,
  Col,
  Empty,
  Flex,
  Modal,
  Row,
  Space,
  Statistic,
  Tabs,
  Tag,
  Typography,
} from "antd"

import { MUSEU_RED } from "@/features/admin/config/admin-antd-theme"
import { useAdminExposicoesManager } from "@/features/admin/exposicoes/hooks/useAdminExposicoesManager"
import { AdminExposicaoVirtualForm } from "./AdminExposicaoVirtualForm"
import {
  AdminExposicaoPermanenteSimpleForm,
  AdminExposicaoTemporariaSimpleForm,
} from "./AdminExposicoesSimpleForms"
import type {
  AdminExposicoesOverviewDTO,
  ExposicaoVirtualDTO,
  ExposicaoVirtualInputDTO,
  ExposicaoPermanenteDTO,
  ExposicaoPermanenteInputDTO,
  ExposicaoTemporariaDTO,
  ExposicaoTemporariaInputDTO,
} from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"

type Props = {
  initialData: AdminExposicoesOverviewDTO
}

export function AdminExposicoesPage({ initialData }: Props) {
  const manager = useAdminExposicoesManager(initialData)
  const [editingVirtual, setEditingVirtual] = useState<ExposicaoVirtualDTO | null>(null)
  const [creatingVirtual, setCreatingVirtual] = useState(false)
  const [permForm, setPermForm] = useState<{ open: boolean; editing: ExposicaoPermanenteDTO | null }>({ open: false, editing: null })
  const [tempForm, setTempForm] = useState<{ open: boolean; editing: ExposicaoTemporariaDTO | null }>({ open: false, editing: null })

  async function handleCreateVirtual(input: ExposicaoVirtualInputDTO) {
    const expo = await manager.createVirtual(input)
    setCreatingVirtual(false)
    return expo
  }

  async function handleUpdateVirtual(input: ExposicaoVirtualInputDTO) {
    if (!editingVirtual) return
    await manager.updateVirtual(editingVirtual.id, input)
    setEditingVirtual(null)
  }

  async function handleDeleteVirtual(id: number) {
    Modal.confirm({
      title: "Excluir exposição virtual?",
      content: "Esta ação é irreversível e apagará todas as seções de conteúdo.",
      okText: "Excluir",
      okType: "danger",
      onOk: () => manager.deleteVirtual(id),
    })
  }

  async function handleSavePermanente(input: ExposicaoPermanenteInputDTO) {
    if (permForm.editing) {
      await manager.updatePermanente(permForm.editing.id, input)
    } else {
      await manager.createPermanente(input)
    }
    setPermForm({ open: false, editing: null })
  }

  async function handleDeletePermanente(id: number) {
    Modal.confirm({
      title: "Excluir exposição permanente?",
      okText: "Excluir",
      okType: "danger",
      onOk: () => manager.deletePermanente(id),
    })
  }

  async function handleSaveTemporaria(input: ExposicaoTemporariaInputDTO) {
    if (tempForm.editing) {
      await manager.updateTemporaria(tempForm.editing.id, input)
    } else {
      await manager.createTemporaria(input)
    }
    setTempForm({ open: false, editing: null })
  }

  async function handleDeleteTemporaria(id: number) {
    Modal.confirm({
      title: "Excluir exposição temporária?",
      okText: "Excluir",
      okType: "danger",
      onOk: () => manager.deleteTemporaria(id),
    })
  }

  const tabItems = [
    {
      key: "virtuais",
      label: `Virtuais (${manager.kpis.totalVirtuais})`,
      children: (
        <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
          <Flex justify="space-between" align="center">
            <Typography.Text type="secondary">
              {manager.kpis.publicadasVirtuais} publicada(s)
            </Typography.Text>
            <Button type="primary" onClick={() => setCreatingVirtual(true)}>
              Nova Exposição Virtual
            </Button>
          </Flex>

          {manager.virtuais.length === 0 ? (
            <Empty description="Nenhuma exposição virtual cadastrada" />
          ) : (
            <Row gutter={[16, 16]}>
              {manager.virtuais.map((expo) => (
                <Col key={expo.id} xs={24} md={12} lg={8}>
                  <Card
                    size="small"
                    title={expo.titulo}
                    extra={
                      <Tag color={expo.publicado ? "green" : "default"}>
                        {expo.publicado ? "Publicada" : "Rascunho"}
                      </Tag>
                    }
                    actions={[
                      <Button
                        key="edit"
                        type="link"
                        size="small"
                        onClick={() => setEditingVirtual(expo)}
                      >
                        Editar
                      </Button>,
                      <Button
                        key="content"
                        type="link"
                        size="small"
                        href={`/admin/exposicoes/virtuais/${expo.id}`}
                      >
                        Conteúdo
                      </Button>,
                      <Button
                        key="delete"
                        type="link"
                        danger
                        size="small"
                        onClick={() => handleDeleteVirtual(expo.id)}
                      >
                        Excluir
                      </Button>,
                    ]}
                  >
                    <Typography.Paragraph
                      ellipsis={{ rows: 2 }}
                      type="secondary"
                    >
                      {expo.descricaoCurta || "Sem descrição"}
                    </Typography.Paragraph>
                    <Typography.Text type="secondary" className="text-xs">
                      Slug: /{expo.slug}
                    </Typography.Text>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Space>
      ),
    },
    {
      key: "permanentes",
      label: `Permanentes (${manager.kpis.totalPermanentes})`,
      children: (
        <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
          <Flex justify="end">
            <Button
              type="primary"
              onClick={() => setPermForm({ open: true, editing: null })}
            >
              Nova Exposição Permanente
            </Button>
          </Flex>

          {manager.permanentes.length === 0 ? (
            <Empty description="Nenhuma exposição permanente cadastrada" />
          ) : (
            <Row gutter={[16, 16]}>
              {manager.permanentes.map((expo) => (
                <Col key={expo.id} xs={24} md={12}>
                  <Card
                    size="small"
                    title={expo.titulo}
                    extra={
                      <Tag color={expo.publicado ? "green" : "default"}>
                        {expo.publicado ? "Publicada" : "Rascunho"}
                      </Tag>
                    }
                    actions={[
                      <Button
                        key="edit"
                        type="link"
                        size="small"
                        onClick={() => setPermForm({ open: true, editing: expo })}
                      >
                        Editar
                      </Button>,
                      <Button
                        key="delete"
                        type="link"
                        danger
                        size="small"
                        onClick={() => handleDeletePermanente(expo.id)}
                      >
                        Excluir
                      </Button>,
                    ]}
                  >
                    <Typography.Paragraph ellipsis={{ rows: 2 }} type="secondary">
                      {expo.descricao || "Sem descrição"}
                    </Typography.Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Space>
      ),
    },
    {
      key: "temporarias",
      label: `Temporárias (${manager.kpis.totalTemporarias})`,
      children: (
        <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
          <Flex justify="end">
            <Button
              type="primary"
              onClick={() => setTempForm({ open: true, editing: null })}
            >
              Nova Exposição Temporária
            </Button>
          </Flex>

          {manager.temporarias.length === 0 ? (
            <Empty description="Nenhuma exposição temporária cadastrada" />
          ) : (
            <Row gutter={[16, 16]}>
              {manager.temporarias.map((expo) => (
                <Col key={expo.id} xs={24} md={12}>
                  <Card
                    size="small"
                    title={expo.titulo}
                    extra={
                      <Tag color={expo.publicado ? "green" : "default"}>
                        {expo.publicado ? "Publicada" : "Rascunho"}
                      </Tag>
                    }
                    actions={[
                      <Button
                        key="edit"
                        type="link"
                        size="small"
                        onClick={() => setTempForm({ open: true, editing: expo })}
                      >
                        Editar
                      </Button>,
                      <Button
                        key="delete"
                        type="link"
                        danger
                        size="small"
                        onClick={() => handleDeleteTemporaria(expo.id)}
                      >
                        Excluir
                      </Button>,
                    ]}
                  >
                    <Typography.Paragraph ellipsis={{ rows: 2 }} type="secondary">
                      {expo.descricao || "Sem descrição"}
                    </Typography.Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Space>
      ),
    },
  ]

  return (
    <Space orientation="vertical" size="large" style={{ width: "100%" }}>
      {manager.error && (
        <Alert type="error" title={manager.error} showIcon closable />
      )}

      <Row gutter={16}>
        <Col span={6}>
          <Statistic
            title="Virtuais"
            value={manager.kpis.totalVirtuais}
            styles={{ content: { color: MUSEU_RED } }}
          />
        </Col>
        <Col span={6}>
          <Statistic title="Permanentes" value={manager.kpis.totalPermanentes} />
        </Col>
        <Col span={6}>
          <Statistic title="Temporárias" value={manager.kpis.totalTemporarias} />
        </Col>
        <Col span={6}>
          <Statistic
            title="Publicadas (virtuais)"
            value={manager.kpis.publicadasVirtuais}
            styles={{ content: { color: "#52c41a" } }}
          />
        </Col>
      </Row>

      <Tabs items={tabItems} />

      {/* Modal para criar/editar virtual */}
      <AdminExposicaoVirtualForm
        open={creatingVirtual || editingVirtual !== null}
        editing={editingVirtual}
        onSave={editingVirtual ? handleUpdateVirtual : handleCreateVirtual}
        onCancel={() => {
          setCreatingVirtual(false)
          setEditingVirtual(null)
        }}
        loading={manager.pending}
      />

      {/* Modal para permanente */}
      <Modal
        title={permForm.editing ? "Editar Exposição Permanente" : "Nova Exposição Permanente"}
        open={permForm.open}
        onCancel={() => setPermForm({ open: false, editing: null })}
        footer={null}
        destroyOnHidden
      >
        <AdminExposicaoPermanenteSimpleForm
          initial={permForm.editing}
          onSave={handleSavePermanente}
          loading={manager.pending}
        />
      </Modal>

      {/* Modal para temporária */}
      <Modal
        title={tempForm.editing ? "Editar Exposição Temporária" : "Nova Exposição Temporária"}
        open={tempForm.open}
        onCancel={() => setTempForm({ open: false, editing: null })}
        footer={null}
        destroyOnHidden
      >
        <AdminExposicaoTemporariaSimpleForm
          initial={tempForm.editing}
          onSave={handleSaveTemporaria}
          loading={manager.pending}
        />
      </Modal>
    </Space>
  )
}
