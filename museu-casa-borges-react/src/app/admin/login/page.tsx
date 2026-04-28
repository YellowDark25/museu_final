import { redirect } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { AdminLoginForm } from "@/features/admin/auth/components/AdminLoginForm"
import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"

export default async function AdminLoginPage() {
  const session = await getAdminSession()

  if (session) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
            Admin seguro
          </Badge>
          <div className="mt-6 space-y-4">
            <h1 className="text-3xl font-semibold leading-tight">
              Acesso administrativo do Museu Casa Borges
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              Este painel centraliza a gestão do acervo, biblioteca, exposições, galerias,
              páginas institucionais, equipe e configurações globais do site.
            </p>
          </div>

          <div className="mt-8 space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div>
              <h2 className="text-sm font-semibold text-white">Validação de acesso</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                O login é validado no servidor e a sessão é persistida em cookie HttpOnly.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Estratégia</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                A área administrativa foi desenhada para evoluir por módulos e contratos DTO,
                mantendo a interface desacoplada da persistência.
              </p>
            </div>
          </div>
        </section>

        <div className="self-center">
          <AdminLoginForm
            title="Entrar no painel"
            description="Use suas credenciais administrativas para acessar o backoffice do museu."
          />
        </div>
      </div>
    </div>
  )
}
