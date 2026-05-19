"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { SolicitacaoVisitaDTO } from "@/features/visitas/dto/visitas.dto"
import { VISITA_STATUS_LABELS } from "@/features/visitas/dto/visitas.dto"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  visita: SolicitacaoVisitaDTO | null
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(`${value}T12:00:00`))
}

function formatTime(value: string) {
  return value.slice(0, 5)
}

export function VisitaCalendarioDialog({ open, onOpenChange, visita }: Props) {
  if (!visita) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Visita guiada confirmada</DialogTitle>
          <DialogDescription>
            Agendamento aceito e exibido na programação do museu.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Badge className="bg-green-600 hover:bg-green-600">
              {VISITA_STATUS_LABELS[visita.status]}
            </Badge>
          </div>
          <p>
            <span className="font-medium text-gray-700">Solicitante:</span> {visita.nomeInstituicao}
          </p>
          <p>
            <span className="font-medium text-gray-700">E-mail:</span> {visita.email}
          </p>
          <p>
            <span className="font-medium text-gray-700">Telefone:</span> {visita.telefone}
          </p>
          <p>
            <span className="font-medium text-gray-700">Data e horário:</span>{" "}
            {formatDate(visita.dataVisita)} às {formatTime(visita.horarioVisita)}
          </p>
          {visita.numeroPessoas && (
            <p>
              <span className="font-medium text-gray-700">Pessoas:</span> {visita.numeroPessoas}
            </p>
          )}
          {visita.endereco && (
            <p>
              <span className="font-medium text-gray-700">Endereço:</span> {visita.endereco}
            </p>
          )}
          {visita.objetivoVisita && (
            <p>
              <span className="font-medium text-gray-700">Objetivo:</span> {visita.objetivoVisita}
            </p>
          )}
          {visita.comentarios && (
            <p>
              <span className="font-medium text-gray-700">Comentários:</span> {visita.comentarios}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button type="button" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
