import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm text-slate-600">
            Palavra-chave
          </label>
          <Input
            placeholder="Ex.: Barra do Bugres, artesanato, fotos"
            value={values.keyword}
            onChange={(event) => onChange({ keyword: event.target.value })}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-600">
            Tipo de material
          </label>
          <Select
            value={values.material}
            onValueChange={(value) => onChange({ material: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {materialOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-600">Período</label>
          <Select
            value={values.period}
            onValueChange={(value) =>
              onChange({ period: value as AcervoFilterValues["period"] })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="qualquer">Qualquer período</SelectItem>
              <SelectItem value="antigo">Anterior a 1950</SelectItem>
              <SelectItem value="moderno">1950-2000</SelectItem>
              <SelectItem value="recente">2000 em diante</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button className="gap-2" onClick={onSearch}>
          <Search className="h-4 w-4" />
          Pesquisar
        </Button>
      </div>
    </div>
  )
}
