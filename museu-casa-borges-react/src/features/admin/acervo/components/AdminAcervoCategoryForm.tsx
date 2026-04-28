"use client"

import { useCallback, useEffect } from "react"

import { Button, Checkbox, Form, Input, InputNumber, Select, Space } from "antd"
import type {
  AdminAcervoCategoryDTO,
  AdminAcervoCategoryInputDTO,
} from "@/features/admin/acervo/dto/admin-acervo.dto"

type Props = {
  pending: boolean
  category?: AdminAcervoCategoryDTO | null
  onSubmit: (input: AdminAcervoCategoryInputDTO) => Promise<void>
  onCancel?: () => void
}

const initialValues: AdminAcervoCategoryInputDTO = {
  nome: "",
  slug: "",
  tipo: "",
  descricao: "",
  ordem: 0,
  ativa: true,
  exibirComoAba: true,
  layoutPublico: "lista",
}

export function AdminAcervoCategoryForm({
  pending,
  category,
  onSubmit,
  onCancel,
}: Props) {
  const [form] = Form.useForm<AdminAcervoCategoryInputDTO>()

  useEffect(() => {
    if (!category) {
      form.setFieldsValue(initialValues)
      return
    }

    form.setFieldsValue({
      nome: category.nome,
      slug: category.slug ?? "",
      tipo: category.tipo ?? "",
      descricao: category.descricao ?? "",
      ordem: category.ordem,
      ativa: category.ativa,
      exibirComoAba: category.exibirComoAba,
      layoutPublico: category.layoutPublico,
    })
  }, [category, form])

  const handleFinish = useCallback(
    async (values: AdminAcervoCategoryInputDTO) => {
      await onSubmit(values)
      if (!category) {
        form.setFieldsValue(initialValues)
      }
    },
    [category, form, onSubmit]
  )

  return (
    <Form<AdminAcervoCategoryInputDTO>
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
      disabled={pending}
      requiredMark="optional"
    >
      <Form.Item
        name="nome"
        label="Nome da categoria"
        rules={[{ required: true, message: "Informe o nome da categoria." }]}
      >
        <Input placeholder="Fotografias históricas" />
      </Form.Item>

      <Form.Item name="tipo" label="Tipo interno">
        <Input placeholder="fotografias" />
      </Form.Item>

      <Space orientation="vertical" size="middle" className="w-full" style={{ display: "flex" }}>
        <div className="grid w-full gap-4 md:grid-cols-2">
          <Form.Item name="slug" label="Slug público">
            <Input placeholder="fotografias-historicas" />
          </Form.Item>

          <Form.Item name="ordem" label="Ordem na página">
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </div>

        <div className="grid w-full gap-4 md:grid-cols-2">
          <Form.Item name="layoutPublico" label="Modo de exibição">
            <Select
              options={[
                { value: "lista", label: "Lista de itens" },
                { value: "galeria", label: "Galeria de fotos" },
              ]}
            />
          </Form.Item>

          <Form.Item name="descricao" label="Descrição">
            <Input.TextArea
              rows={4}
              placeholder="Contexto editorial da categoria"
            />
          </Form.Item>
        </div>
      </Space>

      <div className="grid gap-4 md:grid-cols-2">
        <Form.Item name="ativa" valuePropName="checked" className="mb-0">
          <Checkbox>Categoria ativa no acervo</Checkbox>
        </Form.Item>

        <Form.Item name="exibirComoAba" valuePropName="checked" className="mb-0">
          <Checkbox>Exibir como aba pública</Checkbox>
        </Form.Item>
      </div>

      <Form.Item className="mb-0 mt-6">
        <Space wrap className="w-full">
          <Button type="primary" htmlType="submit" loading={pending} block className="sm:inline-block sm:min-w-[200px]">
            {category ? "Atualizar categoria" : "Criar categoria"}
          </Button>
          {category && onCancel ? (
            <Button onClick={onCancel} disabled={pending} block className="sm:inline-block sm:min-w-[200px]">
              Cancelar edição
            </Button>
          ) : null}
        </Space>
      </Form.Item>
    </Form>
  )
}
