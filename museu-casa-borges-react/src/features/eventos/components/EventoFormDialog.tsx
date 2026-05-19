"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Loader2, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type {
  EventoCategoria,
  EventoDTO,
  EventoInputDTO,
  EventoStatus,
  EventoTipo,
} from "@/features/eventos/dto/eventos.dto"
import {
  EVENTO_CATEGORIA_LABELS,
  EVENTO_STATUS_LABELS,
  EVENTO_TIPO_CORES,
  EVENTO_TIPO_LABELS,
} from "@/features/eventos/dto/eventos.dto"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  evento: EventoDTO | null
  defaultStart?: string
  isAdmin: boolean
  onSave: (input: EventoInputDTO, id?: number) => Promise<void>
  onDelete?: (id: number) => Promise<void>
}

function toLocalInputValue(iso: string | undefined) {
  if (!iso) return ""
  const date = new Date(iso)
  const offset = date.getTimezoneOffset()
  const local = new Date(date.getTime() - offset * 60_000)
  return local.toISOString().slice(0, 16)
}

function emptyForm(defaultStart?: string): EventoInputDTO {
  return {
    titulo: "",
    descricao: "",
    dataInicio: defaultStart ?? new Date().toISOString(),
    dataFim: null,
    local: "",
    categoria: "proximos",
    tipo: "atividade",
    status: "pendente",
    cor: EVENTO_TIPO_CORES.atividade,
    gratuito: true,
    valorIngresso: null,
    vagas: null,
    publicado: false,
    ordem: 0,
  }
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label>
        {label}
        {required ? " *" : ""}
      </Label>
      {children}
    </div>
  )
}

export function EventoFormDialog({
  open,
  onOpenChange,
  evento,
  defaultStart,
  isAdmin,
  onSave,
  onDelete,
}: Props) {
  const [form, setForm] = useState<EventoInputDTO>(emptyForm(defaultStart))
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const readOnly = !isAdmin

  useEffect(() => {
    if (!open) return

    if (evento) {
      setForm({
        titulo: evento.titulo,
        descricao: evento.descricao ?? "",
        dataInicio: evento.dataInicio,
        dataFim: evento.dataFim,
        local: evento.local ?? "",
        categoria: evento.categoria,
        tipo: evento.tipo,
        status: evento.status,
        cor: evento.cor,
        gratuito: evento.gratuito,
        valorIngresso: evento.valorIngresso,
        vagas: evento.vagas,
        publicado: evento.publicado,
        ordem: evento.ordem,
      })
    } else {
      setForm(emptyForm(defaultStart))
    }
    setError(null)
  }, [open, evento, defaultStart])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (readOnly) return

    setSaving(true)
    setError(null)
    try {
      const dataInicio = new Date(form.dataInicio).toISOString()
      const dataFim = form.dataFim ? new Date(form.dataFim).toISOString() : null
      await onSave({ ...form, dataInicio, dataFim }, evento?.id)
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar evento.")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!evento?.id || !onDelete) return
    if (!window.confirm("Deseja excluir este evento?")) return

    setDeleting(true)
    setError(null)
    try {
      await onDelete(evento.id)
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir evento.")
    } finally {
      setDeleting(false)
    }
  }

  function updateTipo(tipo: EventoTipo) {
    setForm((current) => ({
      ...current,
      tipo,
      cor: EVENTO_TIPO_CORES[tipo],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{evento ? "Editar evento" : "Novo evento"}</DialogTitle>
          <DialogDescription>
            {readOnly
              ? "Visualização do evento. Faça login no admin para editar."
              : "Preencha os dados do evento cultural."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Título" required>
            <Input
              value={form.titulo}
              onChange={(e) => setForm((c) => ({ ...c, titulo: e.target.value }))}
              disabled={readOnly}
              required
            />
          </Field>

          <Field label="Descrição">
            <textarea
              value={form.descricao ?? ""}
              onChange={(e) => setForm((c) => ({ ...c, descricao: e.target.value }))}
              disabled={readOnly}
              rows={3}
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </Field>

          <Field label="Início" required>
            <Input
              type="datetime-local"
              value={toLocalInputValue(form.dataInicio)}
              onChange={(e) =>
                setForm((c) => ({
                  ...c,
                  dataInicio: e.target.value ? new Date(e.target.value).toISOString() : c.dataInicio,
                }))
              }
              disabled={readOnly}
              required
            />
          </Field>

          <Field label="Término">
            <Input
              type="datetime-local"
              value={toLocalInputValue(form.dataFim ?? undefined)}
              onChange={(e) =>
                setForm((c) => ({
                  ...c,
                  dataFim: e.target.value ? new Date(e.target.value).toISOString() : null,
                }))
              }
              disabled={readOnly}
            />
          </Field>

          <Field label="Local">
            <Input
              value={form.local ?? ""}
              onChange={(e) => setForm((c) => ({ ...c, local: e.target.value }))}
              disabled={readOnly}
              placeholder="Auditório Principal"
            />
          </Field>

          <Field label="Tipo">
            <select
              value={form.tipo}
              onChange={(e) => updateTipo(e.target.value as EventoTipo)}
              disabled={readOnly}
              className="border-input bg-background h-10 w-full rounded-md border px-3 text-sm"
            >
              {(Object.keys(EVENTO_TIPO_LABELS) as EventoTipo[]).map((tipo) => (
                <option key={tipo} value={tipo}>
                  {EVENTO_TIPO_LABELS[tipo]}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Categoria">
            <select
              value={form.categoria}
              onChange={(e) =>
                setForm((c) => ({ ...c, categoria: e.target.value as EventoCategoria }))
              }
              disabled={readOnly}
              className="border-input bg-background h-10 w-full rounded-md border px-3 text-sm"
            >
              {(Object.keys(EVENTO_CATEGORIA_LABELS) as EventoCategoria[]).map((cat) => (
                <option key={cat} value={cat}>
                  {EVENTO_CATEGORIA_LABELS[cat]}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) =>
                setForm((c) => ({ ...c, status: e.target.value as EventoStatus }))
              }
              disabled={readOnly}
              className="border-input bg-background h-10 w-full rounded-md border px-3 text-sm"
            >
              {(Object.keys(EVENTO_STATUS_LABELS) as EventoStatus[]).map((status) => (
                <option key={status} value={status}>
                  {EVENTO_STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </Field>

          <Checkboxes readOnly={readOnly} form={form} setForm={setForm} />

          {!form.gratuito && (
            <Field label="Valor do ingresso (R$)">
              <Input
                type="number"
                min={0}
                step="0.01"
                value={form.valorIngresso ?? ""}
                onChange={(e) =>
                  setForm((c) => ({
                    ...c,
                    valorIngresso: e.target.value ? Number(e.target.value) : null,
                  }))
                }
                disabled={readOnly}
              />
            </Field>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <DialogFooter className="gap-2 sm:justify-between">
            {isAdmin && evento && onDelete ? (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting || saving}
              >
                {deleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Excluir
              </Button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {readOnly ? "Fechar" : "Cancelar"}
              </Button>
              {!readOnly && (
                <Button type="submit" disabled={saving} className="bg-orange-600 hover:bg-orange-700">
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar
                </Button>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function Checkboxes({
  readOnly,
  form,
  setForm,
}: {
  readOnly: boolean
  form: EventoInputDTO
  setForm: React.Dispatch<React.SetStateAction<EventoInputDTO>>
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.gratuito}
          onChange={(e) => setForm((c) => ({ ...c, gratuito: e.target.checked }))}
          disabled={readOnly}
        />
        Gratuito
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.publicado}
          onChange={(e) => setForm((c) => ({ ...c, publicado: e.target.checked }))}
          disabled={readOnly}
        />
        Publicado
      </label>
    </div>
  )
}
