"use client"

import { InboxOutlined } from "@ant-design/icons"
import { useCallback, useEffect, useState } from "react"

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
  AdminBibliotecaDocumentoDTO,
  AdminBibliotecaDocumentoInputDTO,
  AdminBibliotecaTabDTO,
} from "@/features/admin/biblioteca/dto/admin-biblioteca.dto"

type Props = {
  pending: boolean
  documento?: AdminBibliotecaDocumentoDTO | null
  onCreate: (input: AdminBibliotecaDocumentoInputDTO, file: File) => Promise<void>
  onUpdate: (
    documentId: number,
    input: AdminBibliotecaDocumentoInputDTO,
    file?: File
  ) => Promise<void>
  onCancel?: () => void
}

type FormValues = {
  titulo: string
  autor: string
  tipo: AdminBibliotecaTabDTO
  dataPublicacao: string
  descricao: string
  topicos: string
  ordem: number
}

const TAB_OPTIONS: { value: AdminBibliotecaTabDTO; label: string }[] = [
  { value: "publicacoes", label: "Publicações" },
  { value: "pesquisas", label: "Pesquisas" },
  { value: "artigos", label: "Artigos" },
  { value: "tcc", label: "TCCs" },
]

const initialValues: FormValues = {
  titulo: "",
  autor: "",
  tipo: "publicacoes",
  dataPublicacao: "",
  descricao: "",
  topicos: "",
  ordem: 0,
}

function parseTopicos(raw: string): string[] {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
}

function toInput(values: FormValues): AdminBibliotecaDocumentoInputDTO {
  return {
    titulo: values.titulo,
    autor: values.autor.trim() ? values.autor.trim() : null,
    descricao: values.descricao.trim() ? values.descricao.trim() : null,
    tipo: values.tipo,
    dataPublicacao: values.dataPublicacao.trim()
      ? values.dataPublicacao.trim()
      : null,
    topicos: parseTopicos(values.topicos),
    ano: null,
    visualizacoes: 0,
    rating: 5,
    ordem: Number(values.ordem ?? 0),
  }
}

export function AdminBibliotecaDocumentForm({
  pending,
  documento,
  onCreate,
  onUpdate,
  onCancel,
}: Props) {
  const [form] = Form.useForm<FormValues>()
  const [file, setFile] = useState<File | null>(null)
  const [uploadList, setUploadList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (!documento) {
      form.setFieldsValue(initialValues)
      setFile(null)
      setUploadList([])
      return
    }

    form.setFieldsValue({
      titulo: documento.titulo,
      autor: documento.autor ?? "",
      tipo: (documento.tipo ?? "publicacoes") as AdminBibliotecaTabDTO,
      dataPublicacao: documento.dataPublicacao ?? "",
      descricao: documento.descricao ?? "",
      topicos: documento.topicos.join(", "),
      ordem: documento.ordem,
    })
    setFile(null)
    setUploadList([])
  }, [documento, form])

  const handleFinish = useCallback(
    async (values: FormValues) => {
      const base = toInput(values)

      if (documento) {
        await onUpdate(
          documento.id,
          {
            ...base,
            visualizacoes: documento.visualizacoes,
            rating: documento.rating,
          },
          file ?? undefined
        )
        return
      }

      if (!file) {
        message.error("Selecione um arquivo PDF.")
        return
      }

      await onCreate(base, file)
      form.setFieldsValue(initialValues)
      setFile(null)
      setUploadList([])
    },
    [documento, file, form, message, onCreate, onUpdate]
  )

  const uploadProps = {
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

  return (
    <Form<FormValues>
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
      disabled={pending}
      requiredMark="optional"
    >
      <Form.Item
        name="titulo"
        label="Nome da obra"
        rules={[{ required: true, message: "Informe o nome da obra." }]}
      >
        <Input placeholder="Título exibido nos cards e na biblioteca" maxLength={300} showCount />
      </Form.Item>

      <Form.Item name="autor" label="Autor">
        <Input placeholder="Nome do autor ou instituição" maxLength={200} />
      </Form.Item>

      <div className="grid gap-4 md:grid-cols-2">
        <Form.Item name="tipo" label="Aba da biblioteca">
          <Select options={TAB_OPTIONS} />
        </Form.Item>

        <Form.Item name="dataPublicacao" label="Data de publicação">
          <Input type="date" />
        </Form.Item>
      </div>

      <Form.Item
        name="descricao"
        label="Descrição"
        tooltip="Resumo exibido no card da biblioteca pública."
      >
        <Input.TextArea rows={4} placeholder="Breve descrição editorial" />
      </Form.Item>

      <Form.Item
        name="topicos"
        label="Tópicos (tags)"
        tooltip="Separe por vírgula. Ex.: História local, Barra do Bugres"
      >
        <Input placeholder="Ex.: História Local, Município, Cultura" />
      </Form.Item>

      <Form.Item name="ordem" label="Ordem na lista">
        <InputNumber min={0} className="w-full" />
      </Form.Item>

      <div className="mb-4">
        <Typography.Text className="mb-2 block">
          Arquivo PDF {!documento ? <Typography.Text type="danger">*</Typography.Text> : null}
        </Typography.Text>
        {documento && !file ? (
          <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <Typography.Text type="secondary">
              Arquivo atual:{" "}
              <Typography.Link
                href={documento.urlArquivo ?? "#"}
                target="_blank"
                rel="noreferrer"
              >
                abrir PDF
              </Typography.Link>
            </Typography.Text>
            <Typography.Paragraph type="secondary" className="!mb-0 !mt-2 text-xs">
              Para substituir o PDF, envie um novo arquivo abaixo.
            </Typography.Paragraph>
          </div>
        ) : null}
        <Upload.Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Clique ou arraste o PDF para esta área</p>
          <p className="ant-upload-hint">Somente PDF, até 40&nbsp;MB.</p>
        </Upload.Dragger>
      </div>

      <Form.Item className="mb-0">
        <Space wrap className="w-full">
          <Button
            type="primary"
            htmlType="submit"
            loading={pending}
            block
            className="sm:inline-block sm:min-w-[200px]"
          >
            {documento ? "Salvar alterações" : "Cadastrar documento"}
          </Button>
          {documento && onCancel ? (
            <Button
              onClick={onCancel}
              disabled={pending}
              block
              className="sm:inline-block sm:min-w-[200px]"
            >
              Cancelar edição
            </Button>
          ) : null}
        </Space>
      </Form.Item>
    </Form>
  )
}
