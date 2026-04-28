import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminIcon } from "@/features/admin/components/AdminIcon"
import type { AdminModulePageDTO, AdminModuleReadiness } from "@/features/admin/dto/admin.dto"

type Props = {
  data: AdminModulePageDTO
}

function readinessLabel(readiness: AdminModuleReadiness) {
  if (readiness === "pronto_para_integracao") return "Pronto para integração"
  if (readiness === "em_planejamento") return "Em planejamento"
  return "Fundação"
}

function fieldTypeLabel(type: string) {
  return type.replace(/_/g, " ")
}

export function AdminModuleView({ data }: Props) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-3 text-slate-900">
                <AdminIcon iconKey={data.module.iconKey} className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-slate-950">
                  {data.module.title}
                </h2>
                <p className="text-sm text-slate-500">
                  {readinessLabel(data.module.readiness)}
                </p>
              </div>
            </div>
            <p className="max-w-3xl text-sm leading-6 text-slate-600">
              {data.module.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.module.collections.map((collection) => (
              <Badge key={collection} variant="secondary" className="rounded-full">
                {collection}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {data.kpis.map((kpi) => (
          <Card key={kpi.label} className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader className="space-y-1">
              <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
              <CardTitle className="text-2xl">{kpi.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-slate-600">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-950">Contratos DTO</h3>
          <p className="text-sm text-slate-600">
            Cada coleção abaixo representa a fronteira de dados recomendada entre interface administrativa, serviços e persistência.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {data.collections.map((collection) => (
            <Card key={collection.key} className="rounded-2xl border-slate-200 shadow-sm">
              <CardHeader className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-lg">{collection.title}</CardTitle>
                  <Badge variant="outline" className="rounded-full">
                    {collection.dtoName}
                  </Badge>
                </div>
                <p className="text-sm leading-6 text-slate-600">
                  {collection.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {collection.fields.map((field) => (
                  <div key={field.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900">{field.label}</p>
                      <Badge variant="secondary" className="rounded-full">
                        {fieldTypeLabel(field.type)}
                      </Badge>
                      <Badge variant={field.required ? "default" : "outline"} className="rounded-full">
                        {field.required ? "Obrigatório" : "Opcional"}
                      </Badge>
                      {field.multiple ? (
                        <Badge variant="outline" className="rounded-full">
                          Múltiplo
                        </Badge>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {field.helpText}
                    </p>
                    {field.options?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {field.options.map((option) => (
                          <Badge key={option.value} variant="secondary" className="rounded-full">
                            {option.label}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                    {field.accept?.length ? (
                      <p className="mt-3 text-xs uppercase tracking-wide text-slate-400">
                        Aceita: {field.accept.join(", ")}
                      </p>
                    ) : null}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Fluxo operacional</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.workflows.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900">{step.title}</h4>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Decisões de arquitetura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.architectureNotes.map((note) => (
              <div key={note.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="text-sm font-semibold text-slate-900">{note.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {note.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
