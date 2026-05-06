"use client"

import { useState } from "react"
import { Button } from "antd"

import type {
  ExposicaoPermanenteDTO,
  ExposicaoPermanenteInputDTO,
  ExposicaoTemporariaDTO,
  ExposicaoTemporariaInputDTO,
} from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"

type PermInitial = Pick<
  ExposicaoPermanenteDTO,
  "titulo" | "descricao" | "imagemCapa" | "publicado" | "ordem"
>

export function AdminExposicaoPermanenteSimpleForm({
  initial,
  onSave,
  loading,
}: {
  initial: PermInitial | null
  onSave: (input: ExposicaoPermanenteInputDTO) => Promise<void>
  loading: boolean
}) {
  const [titulo, setTitulo] = useState(initial?.titulo ?? "")
  const [descricao, setDescricao] = useState(initial?.descricao ?? "")
  const [imagemCapa, setImagemCapa] = useState(initial?.imagemCapa ?? "")
  const [publicado, setPublicado] = useState(initial?.publicado ?? false)
  const [ordem, setOrdem] = useState(initial?.ordem ?? 0)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSave({
      titulo,
      descricao: descricao || undefined,
      imagemCapa: imagemCapa || undefined,
      publicado,
      ordem,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-4">
      <ExposicaoCommonFields
        titulo={titulo}
        setTitulo={setTitulo}
        descricao={descricao}
        setDescricao={setDescricao}
        imagemCapa={imagemCapa}
        setImagemCapa={setImagemCapa}
        publicado={publicado}
        setPublicado={setPublicado}
        ordem={ordem}
        setOrdem={setOrdem}
      />
      <Button type="primary" htmlType="submit" loading={loading} block>
        Salvar
      </Button>
    </form>
  )
}

type TempInitial = Pick<
  ExposicaoTemporariaDTO,
  "titulo" | "descricao" | "imagemCapa" | "publicado" | "ordem" | "dataInicio" | "dataFim"
>

export function AdminExposicaoTemporariaSimpleForm({
  initial,
  onSave,
  loading,
}: {
  initial: TempInitial | null
  onSave: (input: ExposicaoTemporariaInputDTO) => Promise<void>
  loading: boolean
}) {
  const [titulo, setTitulo] = useState(initial?.titulo ?? "")
  const [descricao, setDescricao] = useState(initial?.descricao ?? "")
  const [imagemCapa, setImagemCapa] = useState(initial?.imagemCapa ?? "")
  const [publicado, setPublicado] = useState(initial?.publicado ?? false)
  const [ordem, setOrdem] = useState(initial?.ordem ?? 0)
  const [dataInicio, setDataInicio] = useState(initial?.dataInicio ?? "")
  const [dataFim, setDataFim] = useState(initial?.dataFim ?? "")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSave({
      titulo,
      descricao: descricao || undefined,
      imagemCapa: imagemCapa || undefined,
      publicado,
      ordem,
      dataInicio: dataInicio || undefined,
      dataFim: dataFim || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-4">
      <ExposicaoCommonFields
        titulo={titulo}
        setTitulo={setTitulo}
        descricao={descricao}
        setDescricao={setDescricao}
        imagemCapa={imagemCapa}
        setImagemCapa={setImagemCapa}
        publicado={publicado}
        setPublicado={setPublicado}
        ordem={ordem}
        setOrdem={setOrdem}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium mb-1">Data início</label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Data fim</label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <Button type="primary" htmlType="submit" loading={loading} block>
        Salvar
      </Button>
    </form>
  )
}

function ExposicaoCommonFields(props: {
  titulo: string
  setTitulo: (v: string) => void
  descricao: string
  setDescricao: (v: string) => void
  imagemCapa: string
  setImagemCapa: (v: string) => void
  publicado: boolean
  setPublicado: (v: boolean) => void
  ordem: number
  setOrdem: (v: number) => void
}) {
  const {
    titulo,
    setTitulo,
    descricao,
    setDescricao,
    imagemCapa,
    setImagemCapa,
    publicado,
    setPublicado,
    ordem,
    setOrdem,
  } = props

  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">Título *</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">URL da imagem de capa</label>
        <input
          type="text"
          value={imagemCapa}
          onChange={(e) => setImagemCapa(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={publicado}
            onChange={(e) => setPublicado(e.target.checked)}
          />
          Publicada
        </label>
        <div>
          <label className="text-sm mr-2">Ordem:</label>
          <input
            type="number"
            value={ordem}
            onChange={(e) => setOrdem(Number(e.target.value))}
            className="w-16 p-1 border rounded"
          />
        </div>
      </div>
    </>
  )
}
