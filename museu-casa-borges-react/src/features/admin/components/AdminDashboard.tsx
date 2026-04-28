import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminIcon } from "@/features/admin/components/AdminIcon"
import type { AdminDashboardDTO } from "@/features/admin/dto/admin.dto"

type Props = {
  data: AdminDashboardDTO
}

function readinessLabel(readiness: string) {
  if (readiness === "pronto_para_integracao") return "Pronto para integração"
  if (readiness === "em_planejamento") return "Em planejamento"
  return "Fundação"
}

export function AdminDashboard({ data }: Props) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
              Arquitetura CMS
            </Badge>
            <h2 className="text-3xl font-semibold text-slate-950">
              {data.title}
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-slate-600">
              {data.description}
            </p>
          </div>

          <Button asChild className="w-full sm:w-auto">
            <Link href="/admin/acervo">Começar pelo acervo</Link>
          </Button>
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

      <section className="grid gap-4 xl:grid-cols-2">
        {data.modules.map((module) => (
          <Card key={module.slug} className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-slate-100 p-3 text-slate-900">
                    <AdminIcon iconKey={module.iconKey} className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                    <p className="text-sm text-slate-500">
                      {readinessLabel(module.readiness)}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-6 text-slate-600">
                  {module.description}
                </p>
              </div>

              <Badge variant="outline" className="rounded-full">
                {module.collections.length} coleções
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {module.collections.map((collection) => (
                  <Badge key={collection} variant="secondary" className="rounded-full">
                    {collection}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="flex-1">
                  <Link href={module.primaryAction.href}>{module.primaryAction.label}</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href={module.secondaryAction.href}>{module.secondaryAction.label}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Notas arquiteturais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.architectureNotes.map((note) => (
              <div key={note.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900">{note.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{note.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Atividade recente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.recentActivity.map((activity) => (
              <div key={`${activity.module}-${activity.title}`} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
                  <Badge variant="outline" className="rounded-full">
                    {activity.status}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-slate-600">{activity.description}</p>
                <p className="mt-3 text-xs uppercase tracking-wide text-slate-400">
                  {activity.module} · {activity.timestampLabel}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
