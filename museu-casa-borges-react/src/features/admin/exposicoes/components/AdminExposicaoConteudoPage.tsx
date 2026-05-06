"use client"

import { useState } from "react"
import { Alert, Button, Space, Typography } from "antd"

import {
  BlockEditor,
  blocksToSecaoInputs,
} from "./BlockEditor/BlockEditor"
import { exposicaoSecoesToBlocks } from "@/features/admin/exposicoes/utils/secoes-to-blocks"
import { readAdminApiError } from "@/features/admin/utils/read-admin-api-error"
import type { ExposicaoVirtualComSecoesDTO } from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"

interface Props {
  exposicao: ExposicaoVirtualComSecoesDTO
}

export function AdminExposicaoConteudoPage({ exposicao }: Props) {
  const [blocks, setBlocks] = useState(() => exposicaoSecoesToBlocks(exposicao))
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const secoes = blocksToSecaoInputs(blocks)
      const response = await fetch(`/api/admin/exposicoes/virtuais/${exposicao.id}/secoes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secoes }),
      })

      if (!response.ok) {
        throw new Error(await readAdminApiError(response))
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar seções.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
      <div className="flex items-center justify-between">
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {exposicao.titulo}
          </Typography.Title>
          <Typography.Text type="secondary">
            Editar conteúdo — /{exposicao.slug}
          </Typography.Text>
        </div>
        <Button type="primary" onClick={handleSave} loading={saving}>
          Salvar Conteúdo
        </Button>
      </div>

      {error && <Alert type="error" title={error} showIcon closable />}
      {success && <Alert type="success" title="Conteúdo salvo com sucesso!" showIcon />}

      <BlockEditor
        key={exposicao.id}
        blocks={blocks}
        onBlocksChange={setBlocks}
      />
    </Space>
  )
}
