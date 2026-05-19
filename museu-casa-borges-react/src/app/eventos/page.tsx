import { getAdminSession } from "@/features/admin/auth/server/admin-auth.service"
import { EventosCalendarPage } from "@/features/eventos/components/EventosCalendarPage"

export const metadata = {
  title: "Eventos | Museu Casa Borges",
  description: "Calendário de eventos e atividades culturais do Museu Casa Borges.",
}

export default async function EventosPage() {
  const session = await getAdminSession()

  return (
    <EventosCalendarPage
      isAdmin={Boolean(session)}
      adminName={session?.name}
    />
  )
}
