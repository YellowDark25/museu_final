import type { EventInput } from "@fullcalendar/core"

import type { EventoDTO } from "@/features/eventos/dto/eventos.dto"
import type { SolicitacaoVisitaDTO } from "@/features/visitas/dto/visitas.dto"

export const VISITA_CALENDARIO_COR = "#16a34a"

export function eventoToCalendarEvent(evento: EventoDTO): EventInput {
  return {
    id: `evento-${evento.id}`,
    title: evento.titulo,
    start: evento.dataInicio,
    end: evento.dataFim ?? undefined,
    backgroundColor: evento.cor,
    borderColor: evento.cor,
    extendedProps: { kind: "evento", evento },
  }
}

export function visitaToCalendarEvent(visita: SolicitacaoVisitaDTO): EventInput {
  const hora = visita.horarioVisita.slice(0, 5)
  const startLocal = `${visita.dataVisita}T${hora}:00`
  const startDate = new Date(startLocal)
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000)

  return {
    id: `visita-${visita.id}`,
    title: `${hora} Visita — ${visita.nomeInstituicao}`,
    start: startLocal,
    end: endDate.toISOString(),
    backgroundColor: VISITA_CALENDARIO_COR,
    borderColor: VISITA_CALENDARIO_COR,
    editable: false,
    extendedProps: { kind: "visita", visita },
  }
}

export function matchesVisitaSearch(visita: SolicitacaoVisitaDTO, search: string) {
  if (!search.trim()) return true
  const term = search.trim().toLowerCase()
  const haystack = [
    visita.nomeInstituicao,
    visita.email,
    visita.objetivoVisita,
    visita.telefone,
    visita.numeroPessoas,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
  return haystack.includes(term)
}
