"use client"

import {
  Alert,
  Button,
  Card,
  Col,
  Empty,
  Flex,
  Image,
  Row,
  Space,
  Statistic,
  Tabs,
  Tag,
  Typography,
} from "antd"
import { useCallback, useMemo, useState } from "react"

import type {
  AdminAcervoCategoryDTO,
  AdminAcervoCategoryInputDTO,
  AdminAcervoMediaDTO,
  AdminAcervoMediaInputDTO,
  AdminAcervoOverviewDTO,
} from "@/features/admin/acervo/dto/admin-acervo.dto"
import { MUSEU_RED } from "@/features/admin/config/admin-antd-theme"
import { useAdminAcervoManager } from "@/features/admin/acervo/hooks/useAdminAcervoManager"
import { AdminAcervoCategoryForm } from "@/features/admin/acervo/components/AdminAcervoCategoryForm"
import { AdminAcervoMediaForm } from "@/features/admin/acervo/components/AdminAcervoMediaForm"

type Props = {
  initialData: AdminAcervoOverviewDTO
}

function formatDate(value: string | null) {
  if (!value) {
    return "Sem data"
  }

  return new Intl.DateTimeFormat("pt-BR").format(new Date(value))
}

function mediaTypeLabel(value: string | null) {
  if (!value) {
    return "Sem tipo"
  }

  if (value === "imagem") return "Imagem"
  if (value === "documento") return "Documento"
  if (value === "video") return "Vídeo"
  if (value === "audio") return "Áudio"
  return value
}

export function AdminAcervoPage({ initialData }: Props) {
  const {
    categories,
    media,
    kpis,
    categoryPending,
    mediaPending,
    categoryError,
    mediaError,
    createCategory,
    updateCategory,
    deleteCategory,
    createMedia,
    updateMedia,
    deleteMedia,
  } = useAdminAcervoManager(initialData)

  const [selectedCategory, setSelectedCategory] =
    useState<AdminAcervoCategoryDTO | null>(null)
  const [selectedMedia, setSelectedMedia] = useState<AdminAcervoMediaDTO | null>(null)

  const handleCategorySubmit = useCallback(
    async (input: AdminAcervoCategoryInputDTO) => {
      if (selectedCategory) {
        await updateCategory(selectedCategory.id, input)
        setSelectedCategory(null)
        return
      }

      await createCategory(input)
    },
    [createCategory, selectedCategory, updateCategory]
  )

  const handleMediaCreate = useCallback(
    async (input: AdminAcervoMediaInputDTO, file: File) => {
      await createMedia(input, file)
    },
    [createMedia]
  )

  const handleMediaUpdate = useCallback(
    async (mediaId: number, input: AdminAcervoMediaInputDTO) => {
      await updateMedia(mediaId, input)
      setSelectedMedia(null)
    },
    [updateMedia]
  )

  const categoriasTab = useMemo(
    () => (
      <Row gutter={[24, 24]}>
        <Col xs={24} xl={12}>
          <Card
            title={selectedCategory ? "Editar categoria" : "Nova categoria"}
            variant="borderless"
            className="shadow-sm"
          >
            {categoryError ? (
              <Alert type="error" message={categoryError} showIcon className="mb-4" />
            ) : null}
            <AdminAcervoCategoryForm
              pending={categoryPending}
              category={selectedCategory}
              onSubmit={handleCategorySubmit}
              onCancel={() => setSelectedCategory(null)}
            />
          </Card>
        </Col>

        <Col xs={24} xl={12}>
          <Card title="Categorias cadastradas" variant="borderless" className="shadow-sm">
            {categories.length === 0 ? (
              <Empty description="Nenhuma categoria cadastrada ainda." />
            ) : (
              <Flex vertical gap={16}>
                {categories.map((category) => (
                  <Card
                    key={category.id}
                    size="small"
                    variant="outlined"
                    className="border-slate-200/90 shadow-none transition-shadow hover:shadow-md"
                    styles={{
                      body: { padding: "16px 18px" },
                    }}
                  >
                    <Flex vertical gap={14}>
                      <Flex
                        justify="space-between"
                        align="flex-start"
                        gap={16}
                        wrap="wrap"
                      >
                        <Typography.Title
                          level={5}
                          style={{ margin: 0, flex: "1 1 160px", minWidth: 0 }}
                        >
                          {category.nome}
                        </Typography.Title>
                        <Space size={10} wrap className="shrink-0">
                          <Button
                            type="default"
                            onClick={() => setSelectedCategory(category)}
                          >
                            Editar
                          </Button>
                          <Button
                            danger
                            type="primary"
                            ghost
                            onClick={() => deleteCategory(category.id)}
                            disabled={categoryPending}
                          >
                            Excluir
                          </Button>
                        </Space>
                      </Flex>

                      <Flex vertical gap={8}>
                        <Typography.Text type="secondary" className="text-xs uppercase tracking-wide">
                          Metadados
                        </Typography.Text>
                        <Flex gap={8} wrap align="center">
                          {category.tipo ? (
                            <Tag variant="filled" color="default">
                              {category.tipo}
                            </Tag>
                          ) : null}
                          <Tag variant="filled">#{category.ordem}</Tag>
                          <Tag variant="filled">
                            {category.layoutPublico === "galeria"
                              ? "Galeria"
                              : "Lista de itens"}
                          </Tag>
                          <Tag variant="filled">
                            {category.mediaCount}{" "}
                            {category.mediaCount === 1 ? "mídia" : "mídias"}
                          </Tag>
                        </Flex>
                      </Flex>

                      <Flex vertical gap={8}>
                        <Typography.Text type="secondary" className="text-xs uppercase tracking-wide">
                          Situação
                        </Typography.Text>
                        <Flex gap={8} wrap align="center">
                          <Tag color={category.ativa ? "success" : "default"}>
                            {category.ativa ? "Ativa" : "Inativa"}
                          </Tag>
                          <Tag color={category.exibirComoAba ? MUSEU_RED : "default"}>
                            {category.exibirComoAba ? "Aba pública" : "Oculta"}
                          </Tag>
                        </Flex>
                      </Flex>

                      <Typography.Paragraph
                        type="secondary"
                        style={{ marginBottom: 0, lineHeight: 1.6 }}
                      >
                        {category.descricao || "Sem descrição cadastrada."}
                      </Typography.Paragraph>

                      <Flex
                        wrap="wrap"
                        gap={16}
                        align="center"
                        className="border-t border-slate-100 pt-3"
                      >
                        <Typography.Text type="secondary" className="text-sm">
                          <Typography.Text strong className="text-slate-600">
                            Slug público:{" "}
                          </Typography.Text>
                          {category.slug || "Será gerado automaticamente"}
                        </Typography.Text>
                        <Typography.Text
                          type="secondary"
                          className="text-xs uppercase tracking-wide"
                        >
                          Criada em {formatDate(category.criadoEm)}
                        </Typography.Text>
                      </Flex>
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
      categories,
      categoryError,
      categoryPending,
      deleteCategory,
      handleCategorySubmit,
      selectedCategory,
    ]
  )

  const midiasTab = useMemo(
    () => (
      <Row gutter={[24, 24]}>
        <Col xs={24} xl={12}>
          <Card
            title={selectedMedia ? "Editar mídia" : "Nova mídia"}
            variant="borderless"
            className="shadow-sm"
          >
            {mediaError ? (
              <Alert type="error" message={mediaError} showIcon className="mb-4" />
            ) : null}
            <AdminAcervoMediaForm
              pending={mediaPending}
              categories={categories}
              media={selectedMedia}
              onCreate={handleMediaCreate}
              onUpdate={handleMediaUpdate}
              onCancel={() => setSelectedMedia(null)}
            />
          </Card>
        </Col>

        <Col xs={24} xl={12}>
          <Card title="Mídias cadastradas" variant="borderless" className="shadow-sm">
            {media.length === 0 ? (
              <Empty description="Nenhuma mídia cadastrada ainda." />
            ) : (
              <Flex vertical gap={16}>
                {media.map((entry) => (
                  <Card
                    key={entry.id}
                    size="small"
                    variant="outlined"
                    className="border-slate-200/90 shadow-none transition-shadow hover:shadow-md"
                    styles={{ body: { padding: "16px 18px" } }}
                  >
                    <Flex
                      justify="space-between"
                      align="flex-start"
                      gap={16}
                      wrap="wrap"
                    >
                      <Flex gap={16} style={{ flex: "1 1 240px", minWidth: 0 }}>
                        {entry.tipo === "imagem" ? (
                          <Image
                            src={entry.url}
                            alt={
                              entry.nome?.trim() ||
                              entry.legenda ||
                              entry.categoriaNome ||
                              "Mídia do acervo"
                            }
                            width={96}
                            height={96}
                            className="!h-24 !w-24 shrink-0 rounded-2xl object-cover"
                            preview
                          />
                        ) : (
                          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-center text-xs font-medium text-slate-500">
                            {mediaTypeLabel(entry.tipo)}
                          </div>
                        )}

                        <Flex vertical gap={10} style={{ minWidth: 0 }}>
                          <Flex gap={8} wrap align="center">
                            <Typography.Title level={5} style={{ margin: 0 }}>
                              {entry.nome?.trim() ||
                                entry.categoriaNome ||
                                "Mídia"}
                            </Typography.Title>
                            {entry.nome?.trim() && entry.categoriaNome ? (
                              <Tag variant="filled">{entry.categoriaNome}</Tag>
                            ) : null}
                            <Tag variant="filled">{mediaTypeLabel(entry.tipo)}</Tag>
                            <Tag variant="filled">Ordem {entry.ordem}</Tag>
                          </Flex>
                          <Typography.Paragraph
                            type="secondary"
                            style={{ marginBottom: 0, lineHeight: 1.6 }}
                          >
                            {entry.legenda || "Sem legenda cadastrada."}
                          </Typography.Paragraph>
                          <Typography.Link
                            href={entry.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Abrir arquivo
                          </Typography.Link>
                        </Flex>
                      </Flex>

                      <Space size={10} wrap className="shrink-0">
                        <Button
                          type="default"
                          onClick={() => setSelectedMedia(entry)}
                        >
                          Editar
                        </Button>
                        <Button
                          danger
                          type="primary"
                          ghost
                          onClick={() => deleteMedia(entry.id)}
                          disabled={mediaPending}
                        >
                          Excluir
                        </Button>
                      </Space>
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
      categories,
      deleteMedia,
      handleMediaCreate,
      handleMediaUpdate,
      media,
      mediaError,
      mediaPending,
      selectedMedia,
    ]
  )

  const tabItems = useMemo(
    () => [
      { key: "categorias", label: "Categorias", children: categoriasTab },
      { key: "midias", label: "Mídias", children: midiasTab },
    ],
    [categoriasTab, midiasTab]
  )

  return (
    <div className="space-y-6">

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic title="Categorias" value={kpis.categoryCount} />
            <Typography.Paragraph type="secondary" className="!mb-0 !mt-3">
              Estruture as abas públicas do acervo com slug, ordem, layout e
              regras de visibilidade.
            </Typography.Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic title="Mídias" value={kpis.mediaCount} />
            <Typography.Paragraph type="secondary" className="!mb-0 !mt-3">
              Arquivos vinculados às categorias com ordem, tipo e legenda.
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="categorias" items={tabItems} size="large" />
    </div>
  )
}
