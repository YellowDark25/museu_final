"use client"

import { SearchOutlined } from "@ant-design/icons"
import { Button, Card, Col, Input, Row, Select, Typography } from "antd"

export type AcervoFilterValues = {
  keyword: string
  material: string
  period: "qualquer" | "antigo" | "moderno" | "recente"
}

export type AcervoMaterialOption = {
  value: string
  label: string
}

type Props = {
  values: AcervoFilterValues
  materialOptions: AcervoMaterialOption[]
  onChange: (patch: Partial<AcervoFilterValues>) => void
  onSearch?: () => void
}

export default function SearchBarAcervo({
  values,
  materialOptions,
  onChange,
  onSearch,
}: Props) {
  const periodOptions = [
    { value: "qualquer" as const, label: "Qualquer período" },
    { value: "antigo" as const, label: "Anterior a 1950" },
    { value: "moderno" as const, label: "1950-2000" },
    { value: "recente" as const, label: "2000 em diante" },
  ]

  return (
    <Card variant="borderless" className="shadow-sm" styles={{ body: { padding: 20 } }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Typography.Text className="mb-1 block text-slate-600">
            Palavra-chave
          </Typography.Text>
          <Input
            placeholder="Ex.: Barra do Bugres, artesanato, fotos"
            value={values.keyword}
            onChange={(e) => onChange({ keyword: e.target.value })}
            allowClear
          />
        </Col>

        <Col xs={24} md={8}>
          <Typography.Text className="mb-1 block text-slate-600">
            Tipo de material
          </Typography.Text>
          <Select
            className="w-full"
            value={values.material}
            onChange={(value) => onChange({ material: value })}
            options={materialOptions}
          />
        </Col>

        <Col xs={24} md={8}>
          <Typography.Text className="mb-1 block text-slate-600">Período</Typography.Text>
          <Select
            className="w-full"
            value={values.period}
            onChange={(value) =>
              onChange({ period: value as AcervoFilterValues["period"] })
            }
            options={periodOptions}
          />
        </Col>
      </Row>

      <div className="mt-4 flex justify-end">
        <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
          Pesquisar
        </Button>
      </div>
    </Card>
  )
}
