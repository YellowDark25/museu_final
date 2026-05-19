"use client"

import { useState, type ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import { AgendarVisitaDialog } from "@/components/visitas/AgendarVisitaDialog"

type ButtonProps = ComponentProps<typeof Button>

type Props = ButtonProps & {
  label?: string
}

export function AgendarVisitaButton({ label = "Agendar Visita", children, onClick, ...props }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        type="button"
        onClick={(event) => {
          onClick?.(event)
          setOpen(true)
        }}
        {...props}
      >
        {children ?? label}
      </Button>
      <AgendarVisitaDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
