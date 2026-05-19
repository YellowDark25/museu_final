"use client"

import { useEffect, useState } from "react"
import {
  Alert,
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Result,
  TimePicker,
  Typography,
} from "antd"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"

import { VisitasAntdRegistry } from "@/features/visitas/components/VisitasAntdRegistry"
import "@/features/visitas/styles/visitas-form.css"

dayjs.locale("pt-br")

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type FormValues = {
  email: string
  nomeInstituicao: string
  objetivoVisita?: string
  numeroPessoas?: string
  telefone: string
  endereco?: string
  dataVisita: Dayjs
  horarioVisita: Dayjs
  comentarios?: string
}

function AgendarVisitaDialogContent({ open, onOpenChange }: Props) {
  const [form] = Form.useForm<FormValues>()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!open) return
    form.resetFields()
    setError(null)
    setSuccess(false)
  }, [open, form])

  function handleClose() {
    onOpenChange(false)
  }

  async function handleSubmit(values: FormValues) {
    setSaving(true)
    setError(null)

    try {
      const response = await fetch("/api/visitas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email.trim(),
          nomeInstituicao: values.nomeInstituicao.trim(),
          objetivoVisita: values.objetivoVisita?.trim() || null,
          numeroPessoas: values.numeroPessoas?.trim() || null,
          telefone: values.telefone.trim(),
          endereco: values.endereco?.trim() || null,
          dataVisita: values.dataVisita.format("YYYY-MM-DD"),
          horarioVisita: values.horarioVisita.format("HH:mm:ss"),
          comentarios: values.comentarios?.trim() || null,
        }),
      })

      const payload = (await response.json()) as { message?: string }
      if (!response.ok) {
        throw new Error(payload.message ?? "Não foi possível enviar a solicitação.")
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar solicitação.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      title="Agende sua visita"
      open={open}
      onCancel={handleClose}
      footer={null}
      width={760}
      centered
      destroyOnHidden
      wrapClassName="visitas-agendamento-modal"
      styles={{
        body: { overflow: "visible", paddingTop: 8 },
        content: { overflow: "hidden" },
      }}
    >
      {success ? (
        <Result
          status="success"
          title="Solicitação enviada!"
          subTitle="Entraremos em contato por e-mail para confirmar sua visita."
          extra={
            <Button type="primary" onClick={handleClose}>
              Fechar
            </Button>
          }
        />
      ) : (
        <>
          <Typography.Paragraph type="secondary" className="!mb-4">
            Formulário para agendamento de visitação guiada no Museu Casa Borges.
            <br />
            Horário de funcionamento: de terça a sexta, das 08:00–11:30 e das 13:30–17:00.
          </Typography.Paragraph>

          <Form<FormValues>
            form={form}
            layout="vertical"
            requiredMark="optional"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: "Informe o e-mail." },
                { type: "email", message: "E-mail inválido." },
              ]}
            >
              <Input placeholder="seu@email.com" />
            </Form.Item>

            <Form.Item
              label="Nome / Instituição"
              name="nomeInstituicao"
              rules={[{ required: true, message: "Informe o nome ou instituição." }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Objetivo da visita" name="objetivoVisita">
              <Input.TextArea rows={2} />
            </Form.Item>

            <Form.Item label="Número de pessoas" name="numeroPessoas">
              <Input placeholder="Ex.: 25 alunos" />
            </Form.Item>

            <Form.Item
              label="Telefone"
              name="telefone"
              rules={[{ required: true, message: "Informe o telefone." }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Endereço" name="endereco">
              <Input />
            </Form.Item>

            <div className="visitas-form-datetime-grid">
              <Form.Item
                label="Data da visita"
                name="dataVisita"
                rules={[{ required: true, message: "Informe a data." }]}
              >
                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
              </Form.Item>
              <Form.Item
                label="Horário da visita"
                name="horarioVisita"
                rules={[{ required: true, message: "Informe o horário." }]}
              >
                <TimePicker style={{ width: "100%" }} format="HH:mm" minuteStep={15} />
              </Form.Item>
            </div>

            <Form.Item label="Comentários" name="comentarios">
              <Input.TextArea rows={3} />
            </Form.Item>

            {error && <Alert type="error" message={error} showIcon className="mb-4" />}

            <div className="flex justify-end gap-2">
              <Button onClick={handleClose}>Cancelar</Button>
              <Button type="primary" htmlType="submit" loading={saving}>
                Enviar solicitação
              </Button>
            </div>
          </Form>
        </>
      )}
    </Modal>
  )
}

export function AgendarVisitaDialog(props: Props) {
  return (
    <VisitasAntdRegistry>
      <AgendarVisitaDialogContent {...props} />
    </VisitasAntdRegistry>
  )
}
