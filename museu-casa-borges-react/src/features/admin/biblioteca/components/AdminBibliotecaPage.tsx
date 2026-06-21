"use client"

import {
  Alert,
  Button,
  Card,
  Col,
  Empty,
  Flex,
  Row,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd"
import { useCallback, useMemo, useState } from "react"

import type { AdminBibliotecaDocumentoDTO } from "@/features/admin/biblioteca/dto/admin-biblioteca.dto"
import { useAdminBibliotecaManager } from "@/features/admin/biblioteca/hooks/useAdminBibliotecaManager"
import { AdminBibliotecaDocumentForm } from "@/features/admin/biblioteca/components/AdminBibliotecaDocumentForm"
import type { AdminBibliotecaOverviewDTO } from "@/features/admin/biblioteca/dto/admin-biblioteca.dto"
import { MUSEU_RED } from "@/features/admin/config/admin-antd-theme"

type Props = {
  initialData: AdminBibliotecaOverviewDTO
}

const TAB_LABELS: Record<string, string> = {
  publicacoes: "Publicações",
  pesquisas: "Pesquisas",
  artigos: "Artigos",
  tcc: "TCCs",
}

function formatDate(value: string | null) {
  if (!value) {
    return "—"
  }

  return new Intl.DateTimeFormat("pt-BR").format(new Date(`${value}T12:00:00`))
}

export function AdminBibliotecaPage({ initialData }: Props) {
  const {
    documentos,
    kpis,
    pending,
    error,
    createDocument,
    updateDocument,
    deleteDocument,
  } = useAdminBibliotecaManager(initialData)

  const [selected, setSelected] = useState<AdminBibliotecaDocumentoDTO | null>(null)

  const handleCreate = useCallback(
    async (...args: Parameters<typeof createDocument>) => {
      await createDocument(...args)
    },
    [createDocument]
  )

  const handleUpdate = useCallback(
    async (...args: Parameters<typeof updateDocument>) => {
      await updateDocument(...args)
      setSelected(null)
    },
    [updateDocument]
  )

  const statisticsRow = useMemo(
    () => (
      <Row gutter={[16, 16]}>
        <Col xs={12} lg={6}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic title="Documentos" value={kpis.total} />
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic title="Publicações" value={kpis.publicacoes} />
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic title="Pesquisas" value={kpis.pesquisas} />
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic title="Artigos / TCC" value={kpis.artigos + kpis.tcc} />
          </Card>
        </Col>
      </Row>
    ),
    [kpis]
  )

  const documentosTab = useMemo(
    () => (
      <Row gutter={[24, 24]}>
        <Col xs={24} xl={12}>
          <Card
            title={selected ? "Editar documento" : "Novo documento"}
            variant="borderless"
            className="shadow-sm"
          >
            {error ? (
              <Alert type="error" title={error} showIcon className="mb-4" />
            ) : null}
            <AdminBibliotecaDocumentForm
              pending={pending}
              documento={selected}
              onCreate={handleCreate}
              onUpdate={handleUpdate}
              onCancel={() => setSelected(null)}
            />
          </Card>
        </Col>

        <Col xs={24} xl={12}>
          <Card title="Documentos cadastrados" variant="borderless" className="shadow-sm">
            {documentos.length === 0 ? (
              <Empty description="Nenhum documento no banco ainda." />
            ) : (
              <Flex vertical gap={16}>
                {documentos.map((doc) => (
                  <Card
                    key={doc.id}
                    size="small"
                    variant="outlined"
                    className="border-slate-200/90 shadow-none transition-shadow hover:shadow-md"
                    styles={{
                      body: { padding: "16px 18px" },
                    }}
                  >
                    <Flex vertical gap={12}>
                      <Flex
                        justify="space-between"
                        align="flex-start"
                        gap={16}
                        wrap="wrap"
                      >
                        <Typography.Title
                          level={5}
                          style={{ margin: 0, flex: "1 1 200px", minWidth: 0 }}
                        >
                          {doc.titulo}
                        </Typography.Title>
                        <Space size={10} wrap className="shrink-0">
                          <Button type="default" onClick={() => setSelected(doc)}>
                            Editar
                          </Button>
                          <Button
                            danger
                            type="primary"
                            ghost
                            onClick={() => deleteDocument(doc.id)}
                            disabled={pending}
                          >
                            Excluir
                          </Button>
                        </Space>
                      </Flex>

                      <Flex gap={8} wrap align="center">
                        {doc.tipo ? (
                          <Tag color={MUSEU_RED}>{TAB_LABELS[doc.tipo] ?? doc.tipo}</Tag>
                        ) : null}
                        <Tag>Ordem {doc.ordem}</Tag>
                        {doc.autor ? <Tag variant="filled">{doc.autor}</Tag> : null}
                      </Flex>

                      <Typography.Paragraph
                        type="secondary"
                        style={{ marginBottom: 0, lineHeight: 1.6 }}
                      >
                        {doc.descricao || "Sem descrição."}
                      </Typography.Paragraph>

                      <Flex wrap="wrap" gap={16} className="border-t border-slate-100 pt-3">
                        <Typography.Text type="secondary" className="text-sm">
                          <Typography.Text strong className="text-slate-600">
                            Publicação:{" "}
                          </Typography.Text>
                          {formatDate(doc.dataPublicacao)}
                        </Typography.Text>
                        <Typography.Link
                          href={doc.urlArquivo ?? "#"}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Abrir PDF
                        </Typography.Link>
                      </Flex>

                      {doc.topicos.length > 0 ? (
                        <Flex gap={6} wrap>
                          {doc.topicos.map((t) => (
                            <Tag key={t} variant="filled">
                              {t}
                            </Tag>
                          ))}
                        </Flex>
                      ) : null}
                    </Flex>
                  </Card>
                ))}
              </Flex>
            )}
          </Card>
        </Col>
      </Row>
    ),
    [
      deleteDocument,
      documentos,
      error,
      handleCreate,
      handleUpdate,
      pending,
      selected,
    ]
  )

  return (
    <div className="space-y-6">
      {statisticsRow}
      {documentosTab}
    </div>
  )
}
