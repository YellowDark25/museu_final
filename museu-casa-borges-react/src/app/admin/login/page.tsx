import { redirect } from "next/navigation"
import Image from "next/image"

import { AdminLoginForm } from "@/features/admin/auth/components/AdminLoginForm"
import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"

export default async function AdminLoginPage() {
  const session = await getAdminSession()

  if (session) {
    redirect("/admin")
  }

  return (
    <div className="grid w-full min-h-[calc(100svh-4rem)] lg:grid-cols-2">
      <section className="relative hidden h-full min-h-[calc(100svh-4rem)] lg:block">
        <Image
          src="/images/fundo1.jpg"
          alt="Vista do Museu Casa Borges"
          fill
          className="object-cover object-[35%_center]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
      </section>

      <div className="flex items-center justify-center bg-slate-100 px-6 py-10 lg:px-12">
        <div className="w-full max-w-md">
          <AdminLoginForm
            title="Entrar no painel"
            description="Use suas credenciais administrativas para acessar o backoffice do museu."
          />
        </div>
      </div>
    </div>
  )
}
