import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// Tipos para os valores de filtro
export type AcervoFilterValues = {
  keyword: string
  material: "todos" | "documentos" | "fotografias" | "audiovisual"
  period: "qualquer" | "antigo" | "moderno" | "recente"
}

type Props = {
  // Valores controlados dos filtros
  values: AcervoFilterValues
  // Callback para mudança de algum filtro específico
  onChange: (patch: Partial<AcervoFilterValues>) => void
  // Callback opcional ao clicar em Pesquisar
  onSearch?: () => void
}

/**
 * SearchBarAcervo
 * Componente controlado de filtros do Acervo.
 * - Recebe os valores e callbacks via props para sincronizar com a página.
 * - Emite alterações nos selects e input para o container (page.tsx).
 */
export default function SearchBarAcervo({ values, onChange, onSearch }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-slate-600 mb-1 block">Palavra-chave</label>
          <Input
            placeholder="Ex.: Barra do Bugres, artesanato, fotos"
            value={values.keyword}
            onChange={(e) => onChange({ keyword: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm text-slate-600 mb-1 block">Tipo de material</label>
          <Select value={values.material} onValueChange={(v) => onChange({ material: v as AcervoFilterValues["material"] })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="documentos">Documentos</SelectItem>
              <SelectItem value="fotografias">Fotografias</SelectItem>
              <SelectItem value="audiovisual">Audiovisual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm text-slate-600 mb-1 block">Período</label>
          <Select value={values.period} onValueChange={(v) => onChange({ period: v as AcervoFilterValues["period"] })}>
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
        <Button className="gap-2" onClick={onSearch}><Search className="w-4 h-4" /> Pesquisar</Button>
      </div>
    </div>
  )
}