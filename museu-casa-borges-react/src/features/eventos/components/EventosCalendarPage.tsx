"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from "@fullcalendar/list"
import interactionPlugin from "@fullcalendar/interaction"
import ptBrLocale from "@fullcalendar/core/locales/pt-br"
import type { EventClickArg, EventInput } from "@fullcalendar/core"
import type { DateClickArg } from "@fullcalendar/interaction"
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ListFilter,
  Plus,
  Search,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EventoFormDialog } from "@/features/eventos/components/EventoFormDialog"
import { VisitaCalendarioDialog } from "@/features/eventos/components/VisitaCalendarioDialog"
import type { EventoDTO, EventoInputDTO, EventoStatus, EventoTipo } from "@/features/eventos/dto/eventos.dto"
import { EVENTO_STATUS_LABELS, EVENTO_TIPO_LABELS } from "@/features/eventos/dto/eventos.dto"
import {
  eventoToCalendarEvent,
  matchesVisitaSearch,
  visitaToCalendarEvent,
} from "@/features/eventos/utils/calendar-events"
import { readEventosApiError } from "@/features/eventos/utils/read-eventos-api-error"
import type { SolicitacaoVisitaDTO } from "@/features/visitas/dto/visitas.dto"
import "@/features/eventos/styles/eventos-calendar.css"

type CalendarView = "dayGridMonth" | "timeGridWeek" | "timeGridDay" | "listMonth"

type Props = {
  isAdmin: boolean
  adminName?: string
}

const VIEW_OPTIONS: { key: CalendarView; label: string }[] = [
  { key: "dayGridMonth", label: "Mês" },
  { key: "timeGridWeek", label: "Semana" },
  { key: "timeGridDay", label: "Dia" },
  { key: "listMonth", label: "Agenda" },
]

function matchesFilters(
  evento: EventoDTO,
  search: string,
  statusFilter: EventoStatus[],
  tiposVisiveis: Record<EventoTipo, boolean>
) {
  if (!tiposVisiveis[evento.tipo]) return false
  if (statusFilter.length > 0 && !statusFilter.includes(evento.status)) return false

  if (search.trim()) {
    const term = search.trim().toLowerCase()
    const haystack = [evento.titulo, evento.descricao, evento.local]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
    if (!haystack.includes(term)) return false
  }

  return true
}

export function EventosCalendarPage({ isAdmin, adminName }: Props) {
  const calendarRef = useRef<FullCalendar | null>(null)
  const [eventos, setEventos] = useState<EventoDTO[]>([])
  const [visitasAceitas, setVisitasAceitas] = useState<SolicitacaoVisitaDTO[]>([])
  const [verVisitas, setVerVisitas] = useState(true)
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState<CalendarView>("dayGridMonth")
  const [currentTitle, setCurrentTitle] = useState("")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<EventoStatus[]>(["pendente", "atrasada"])
  const [tiposVisiveis, setTiposVisiveis] = useState<Record<EventoTipo, boolean>>({
    processo: true,
    atividade: true,
    tarefa: true,
  })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedEvento, setSelectedEvento] = useState<EventoDTO | null>(null)
  const [selectedVisita, setSelectedVisita] = useState<SolicitacaoVisitaDTO | null>(null)
  const [visitaDialogOpen, setVisitaDialogOpen] = useState(false)
  const [defaultStart, setDefaultStart] = useState<string | undefined>()
  const [loadError, setLoadError] = useState<string | null>(null)

  const fetchCalendario = useCallback(
    async (start?: string, end?: string) => {
      setLoading(true)
      setLoadError(null)
      try {
        const params = new URLSearchParams()
        if (start) params.set("start", start)
        if (end) params.set("end", end)
        const query = params.toString()
        const eventosEndpoint = isAdmin ? "/api/admin/eventos" : "/api/eventos"

        const [eventosRes, visitasRes] = await Promise.all([
          fetch(`${eventosEndpoint}?${query}`),
          fetch(`/api/visitas/aceitas?${query}`),
        ])

        if (!eventosRes.ok) throw new Error(await readEventosApiError(eventosRes))
        if (!visitasRes.ok) {
          const visitasPayload = (await visitasRes.json()) as { message?: string }
          throw new Error(visitasPayload.message ?? "Erro ao carregar visitas.")
        }

        setEventos((await eventosRes.json()) as EventoDTO[])
        setVisitasAceitas((await visitasRes.json()) as SolicitacaoVisitaDTO[])
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : "Erro ao carregar o calendário.")
      } finally {
        setLoading(false)
      }
    },
    [isAdmin]
  )

  const filteredEventos = useMemo(
    () => eventos.filter((e) => matchesFilters(e, search, statusFilter, tiposVisiveis)),
    [eventos, search, statusFilter, tiposVisiveis]
  )

  const filteredVisitas = useMemo(
    () =>
      verVisitas ? visitasAceitas.filter((v) => matchesVisitaSearch(v, search)) : [],
    [visitasAceitas, verVisitas, search]
  )

  const calendarEvents = useMemo(
    () => [
      ...filteredEventos.map(eventoToCalendarEvent),
      ...filteredVisitas.map(visitaToCalendarEvent),
    ],
    [filteredEventos, filteredVisitas]
  )

  const handleDatesSet = useCallback(
    (info: { start: Date; end: Date; view: { title: string } }) => {
      setCurrentTitle(info.view.title)
      void fetchCalendario(info.start.toISOString(), info.end.toISOString())
    },
    [fetchCalendario]
  )

  const api = () => calendarRef.current?.getApi()

  function openCreate(start?: string) {
    if (!isAdmin) return
    setSelectedEvento(null)
    setDefaultStart(start)
    setDialogOpen(true)
  }

  function openEdit(evento: EventoDTO) {
    setSelectedEvento(evento)
    setDefaultStart(undefined)
    setDialogOpen(true)
  }

  function openVisita(visita: SolicitacaoVisitaDTO) {
    setSelectedVisita(visita)
    setVisitaDialogOpen(true)
  }

  async function refreshCalendar() {
    const view = api()?.view
    if (view) await fetchCalendario(view.activeStart.toISOString(), view.activeEnd.toISOString())
  }

  async function handleSave(input: EventoInputDTO, id?: number) {
    const response = await fetch(id ? `/api/admin/eventos/${id}` : "/api/admin/eventos", {
      method: id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })
    if (!response.ok) throw new Error(await readEventosApiError(response))
    await refreshCalendar()
  }

  async function handleDelete(id: number) {
    const response = await fetch(`/api/admin/eventos/${id}`, { method: "DELETE" })
    if (!response.ok) throw new Error(await readEventosApiError(response))
    await refreshCalendar()
  }

  const statusLabel =
    statusFilter.length > 0
      ? statusFilter.map((s) => EVENTO_STATUS_LABELS[s]).join(", ")
      : "Todos os status"

  return (
    <div className="eventos-calendario min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-600">
            {isAdmin
              ? "Gerencie a programação cultural do museu."
              : "Confira a programação cultural publicada."}
          </p>
          {!isAdmin && (
            <Link href="/admin/login">
              <Button variant="outline" size="sm">
                Área administrativa
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] space-y-4 px-4 py-6">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2 text-lg font-semibold text-gray-800">
              <CalendarDays className="h-5 w-5 text-orange-600" />
              Calendário de Eventos
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              {isAdmin && adminName && (
                <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                  {adminName}
                </div>
              )}
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Pesquisar eventos e visitas..."
                  className="pl-9"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() =>
                  setStatusFilter((c) => (c.length > 0 ? [] : ["pendente", "atrasada"]))
                }
              >
                <ListFilter className="h-4 w-4" />
                {statusLabel}
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              {(Object.keys(EVENTO_TIPO_LABELS) as EventoTipo[]).map((tipo) => (
                <label key={tipo} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={tiposVisiveis[tipo]}
                    onChange={() =>
                      setTiposVisiveis((c) => ({ ...c, [tipo]: !c[tipo] }))
                    }
                    className="accent-orange-600"
                  />
                  Ver {EVENTO_TIPO_LABELS[tipo].toLowerCase()}s
                </label>
              ))}
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={verVisitas}
                  onChange={() => setVerVisitas((v) => !v)}
                  className="accent-green-600"
                />
                Ver visitas aceitas
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => api()?.today()}>
              Hoje
            </Button>
            <Button type="button" variant="outline" size="icon" onClick={() => api()?.prev()}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="icon" onClick={() => api()?.next()}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold text-gray-800 capitalize">{currentTitle}</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-lg border border-gray-200 p-0.5">
              {VIEW_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => {
                    setCurrentView(option.key)
                    api()?.changeView(option.key)
                  }}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                    currentView === option.key
                      ? "bg-orange-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {isAdmin && (
              <Button onClick={() => openCreate()} className="bg-orange-600 hover:bg-orange-700">
                <Plus className="mr-1 h-4 w-4" />
                Novo evento
              </Button>
            )}
          </div>
        </div>

        {loadError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {loadError}
            {!isAdmin && (
              <>
                {" "}
                <Link href="/admin/login" className="underline">
                  Entrar no admin
                </Link>{" "}
                para gerenciar.
              </>
            )}
          </div>
        )}

        <div className="relative rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/70 text-sm text-gray-500">
              Carregando calendário...
            </div>
          )}
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView={currentView}
            locale={ptBrLocale}
            headerToolbar={false}
            height="auto"
            events={calendarEvents}
            editable={isAdmin}
            selectable={isAdmin}
            eventClick={(info: EventClickArg) => {
              const kind = info.event.extendedProps.kind as string | undefined
              if (kind === "visita") {
                const visita = info.event.extendedProps.visita as SolicitacaoVisitaDTO | undefined
                if (visita) openVisita(visita)
                return
              }
              const evento = info.event.extendedProps.evento as EventoDTO | undefined
              if (evento) openEdit(evento)
            }}
            dateClick={(info: DateClickArg) => {
              if (isAdmin) openCreate(info.date.toISOString())
            }}
            datesSet={handleDatesSet}
            slotMinTime="07:00:00"
            slotMaxTime="22:00:00"
            allDaySlot={false}
            nowIndicator
            eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
            noEventsContent="Nenhum evento ou visita neste período"
          />
        </div>
      </div>

      <VisitaCalendarioDialog
        open={visitaDialogOpen}
        onOpenChange={setVisitaDialogOpen}
        visita={selectedVisita}
      />

      <EventoFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        evento={selectedEvento}
        defaultStart={defaultStart}
        isAdmin={isAdmin}
        onSave={handleSave}
        onDelete={isAdmin ? handleDelete : undefined}
      />
    </div>
  )
}
