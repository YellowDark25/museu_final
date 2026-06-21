"use client"

import {
  Alert,
  Button,
  Card,
  Col,
  Popconfirm,
  Row,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd"
import type { ColumnsType } from "antd/es/table"
import { useState } from "react"
import Image from "next/image"
import type { AdminGaleriasOverviewDTO, GaleriaAlbumDTO } from "@/features/galerias/dto/galerias.dto"
import { AdminGaleriaForm } from "./AdminGaleriaForm"
import { AdminGaleriaItensManager } from "./AdminGaleriaItensManager"
import { useAdminGaleriasManager } from "@/features/admin/galerias/hooks/useAdminGaleriasManager"
import { MUSEU_RED } from "@/features/admin/config/admin-antd-theme"

type Props = {
  initialData: AdminGaleriasOverviewDTO
}

function formatDate(value: string | null) {
  if (!value) return "—"
  return new Intl.DateTimeFormat("pt-BR").format(new Date(value + "T12:00:00"))
}

export function AdminGaleriasPage({ initialData }: Props) {
  const { data, pending, error, saveGaleria, deleteGaleria, addItem, deleteItem } =
    useAdminGaleriasManager(initialData)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<GaleriaAlbumDTO | null>(null)
  const [itensAlbum, setItensAlbum] = useState<GaleriaAlbumDTO | null>(null)

  function openNew() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(album: GaleriaAlbumDTO) {
    setEditing(album)
    setFormOpen(true)
  }

  async function openItens(album: GaleriaAlbumDTO) {
    // Busca álbum completo com itens
    const res = await fetch(`/api/admin/galerias`)
    if (res.ok) {
      const overview: AdminGaleriasOverviewDTO = await res.json()
      const full = overview.albuns.find((a) => a.id === album.id)
      // Busca os itens via rota do álbum
      const albumRes = await fetch(`/api/galerias/${album.slug}`)
      if (albumRes.ok) {
        const albumData: GaleriaAlbumDTO = await albumRes.json()
        setItensAlbum(albumData)
        return
      }
    }
    setItensAlbum(album)
  }

  const columns: ColumnsType<GaleriaAlbumDTO> = [
    {
      title: "Capa",
      dataIndex: "capaUrl",
      key: "capa",
      width: 100,
      render: (url: string | null) =>
        url ? (
          <div className="relative h-16 w-24 rounded overflow-hidden bg-slate-100">
            <Image src={url} alt="" fill className="object-cover" />
          </div>
        ) : (
          <div className="h-16 w-24 rounded bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
            Sem capa
          </div>
        ),
    },
    {
      title: "Título",
      dataIndex: "titulo",
      key: "titulo",
      render: (titulo: string, row) => (
        <div>
          <p className="font-medium text-slate-800">{titulo}</p>
          <p className="text-xs text-slate-400">/galerias/{row.slug}</p>
        </div>
      ),
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
      width: 120,
      render: (v: string | null) => (v ? <Tag>{v}</Tag> : "—"),
    },
    {
      title: "Data",
      dataIndex: "dataEvento",
      key: "data",
      width: 130,
      render: (v: string | null) => formatDate(v),
    },
    {
      title: "Fotos",
      dataIndex: "totalFotos",
      key: "fotos",
      width: 80,
      render: (n: number) => n ?? 0,
    },
    {
      title: "Status",
      dataIndex: "publicado",
      key: "publicado",
      width: 110,
      render: (v: boolean) =>
        v ? (
          <Tag color="green">Publicado</Tag>
        ) : (
          <Tag color="default">Rascunho</Tag>
        ),
    },
    {
      title: "Ações",
      key: "acoes",
      width: 200,
      render: (_, row) => (
        <div className="flex gap-2 flex-wrap">
          <Button size="small" onClick={() => openItens(row)}>
            Fotos
          </Button>
          <Button size="small" onClick={() => openEdit(row)}>
            Editar
          </Button>
          <Popconfirm
            title="Excluir álbum?"
            description="Todas as fotos do álbum também serão removidas."
            okText="Excluir"
            okButtonProps={{ danger: true }}
            cancelText="Cancelar"
            onConfirm={() => deleteGaleria(row.id)}
          >
            <Button size="small" danger>
              Excluir
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Typography.Title level={4} className="!mb-0">
          Galerias Fotográficas
        </Typography.Title>
        <Button type="primary" onClick={openNew} style={{ backgroundColor: MUSEU_RED }}>
          + Novo álbum
        </Button>
      </div>

      {error && <Alert type="error" message={error} showIcon />}

      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total de álbuns" value={data.total} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Publicados" value={data.publicadas} valueStyle={{ color: "#52c41a" }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total de fotos" value={data.totalFotos} />
          </Card>
        </Col>
      </Row>

      <Table
        dataSource={data.albuns}
        columns={columns}
        rowKey="id"
        loading={pending}
        pagination={{ pageSize: 20 }}
        size="middle"
        locale={{ emptyText: "Nenhum álbum cadastrado ainda." }}
      />

      <AdminGaleriaForm
        open={formOpen}
        editing={editing}
        onSave={async (input, id) => {
          await saveGaleria(input, id)
          setFormOpen(false)
        }}
        onCancel={() => setFormOpen(false)}
        loading={pending}
      />

      {itensAlbum && (
        <AdminGaleriaItensManager
          album={itensAlbum}
          open={!!itensAlbum}
          onClose={() => setItensAlbum(null)}
          onAddItem={async (albumId, url) => {
            await addItem(albumId, url)
            // Atualiza album com itens
            const res = await fetch(`/api/galerias/${itensAlbum.slug}`)
            if (res.ok) setItensAlbum(await res.json())
          }}
          onDeleteItem={async (albumId, itemId) => {
            await deleteItem(albumId, itemId)
            const res = await fetch(`/api/galerias/${itensAlbum.slug}`)
            if (res.ok) setItensAlbum(await res.json())
          }}
        />
      )}
    </div>
  )
}
