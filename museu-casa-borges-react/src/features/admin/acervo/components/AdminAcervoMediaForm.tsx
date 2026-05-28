"use client"

import { InboxOutlined } from "@ant-design/icons"
import { useCallback, useEffect, useMemo, useState } from "react"

import type { RcFile, UploadFile } from "antd/es/upload/interface"
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Typography,
  Upload,
} from "antd"
import type {
  AdminAcervoCategoryDTO,
  AdminAcervoMediaDTO,
  AdminAcervoMediaInputDTO,
} from "@/features/admin/acervo/dto/admin-acervo.dto"

type Props = {
  pending: boolean
  categories: AdminAcervoCategoryDTO[]
  media?: AdminAcervoMediaDTO | null
  onCreate: (input: AdminAcervoMediaInputDTO, file: File) => Promise<void>
  onUpdate: (mediaId: number, input: AdminAcervoMediaInputDTO) => Promise<void>
  onCancel?: () => void
}

type FormValues = {
  categoriaId: string
  nome: string
  tipo: string
  legenda: string
  ordem: number
}

const initialValues: FormValues = {
  categoriaId: "none",
  nome: "",
  tipo: "imagem",
  legenda: "",
  ordem: 0,
}

export function AdminAcervoMediaForm({
  pending,
  categories,
  media,
  onCreate,
  onUpdate,
  onCancel,
}: Props) {
  const [form] = Form.useForm<FormValues>()
  const [file, setFile] = useState<File | null>(null)
  const [uploadList, setUploadList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (!media) {
      form.setFieldsValue(initialValues)
      setFile(null)
      setUploadList([])
      return
    }

    form.setFieldsValue({
      categoriaId: media.categoriaId ? String(media.categoriaId) : "none",
      nome: media.nome ?? "",
      tipo: media.tipo ?? "imagem",
      legenda: media.legenda ?? "",
      ordem: media.ordem,
    })
    setFile(null)
    setUploadList([])
  }, [media, form])

  const normalizedInput = useCallback((values: FormValues): AdminAcervoMediaInputDTO => {
    return {
      categoriaId:
        values.categoriaId !== "none" ? Number(values.categoriaId) : null,
      nome: values.nome,
      tipo: values.tipo,
      legenda: values.legenda,
      ordem: Number(values.ordem ?? 0),
    }
  }, [])

  const categoryOptions = useMemo(
    () => [
      { value: "none", label: "Selecione uma categoria" },
      ...categories.map((c) => ({
        value: String(c.id),
        label: c.nome,
      })),
    ],
    [categories]
  )

  const handleFinish = useCallback(
    async (values: FormValues) => {
      const input = normalizedInput(values)

      if (media) {
        await onUpdate(media.id, input)
        return
      }

      if (!file) {
        message.error("Selecione um arquivo para upload.")
        return
      }

      await onCreate(input, file)
      form.setFieldsValue(initialValues)
      setFile(null)
      setUploadList([])
    },
    [file, form, media, message, normalizedInput, onCreate, onUpdate]
  )

  const uploadProps = !media
    ? {
        maxCount: 1 as const,
        fileList: uploadList,
        beforeUpload: (f: RcFile) => {
          setFile(f)
          setUploadList([
            {
              uid: "-1",
              name: f.name,
              status: "done",
              originFileObj: f,
            },
          ])
          return false
        },
        onRemove: () => {
          setFile(null)
          setUploadList([])
        },
      }
    : undefined

  return (
    <Form<FormValues>
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
      disabled={pending}
      requiredMark="optional"
    >
      <Form.Item name="categoriaId" label="Categoria">
        <Select showSearch optionFilterProp="label" options={categoryOptions} />
      </Form.Item>

      <Form.Item
        name="nome"
        label="Nome da mídia"
        tooltip="Título exibido no site e na lista do acervo. Opcional."
      >
        <Input placeholder="Ex.: Retrato do fundador — 1960" maxLength={200} showCount />
      </Form.Item>

      <div className="grid gap-4 md:grid-cols-2">
        <Form.Item name="tipo" label="Tipo">
          <Select
            options={[
              { value: "imagem", label: "Imagem" },
              { value: "documento", label: "Documento" },
              { value: "video", label: "Vídeo" },
              { value: "audio", label: "Áudio" },
            ]}
          />
        </Form.Item>

        <Form.Item name="ordem" label="Ordem">
          <InputNumber min={0} className="w-full" />
        </Form.Item>
      </div>

      {!media && uploadProps ? (
        <div className="mb-4">
          <Typography.Text className="mb-2 block">Arquivo</Typography.Text>
          <Upload.Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Clique ou arraste o arquivo para esta área</p>
            <p className="ant-upload-hint">
              Imagem, PDF, vídeo ou áudio até 20&nbsp;MB.
            </p>
          </Upload.Dragger>
        </div>
      ) : media ? (
        <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <Typography.Text type="secondary">
            Arquivo atual:{" "}
            <Typography.Link href={media.url} target="_blank" rel="noreferrer">
              visualizar mídia
            </Typography.Link>
          </Typography.Text>
        </div>
      ) : null}

      <Form.Item name="legenda" label="Legenda">
        <Input.TextArea rows={4} placeholder="Legenda ou contexto da mídia" />
      </Form.Item>

      <Form.Item className="mb-0">
        <Space wrap className="w-full">
          <Button type="primary" htmlType="submit" loading={pending} block className="sm:inline-block sm:min-w-[200px]">
            {media ? "Atualizar mídia" : "Enviar mídia"}
          </Button>
          {media && onCancel ? (
            <Button onClick={onCancel} disabled={pending} block className="sm:inline-block sm:min-w-[200px]">
              Cancelar edição
            </Button>
          ) : null}
        </Space>
      </Form.Item>
    </Form>
  )
}
