"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { NoticiaDTO } from "@/features/noticias/dto/noticias.dto"

export function NoticiaPopup() {
  const [noticia, setNoticia] = useState<NoticiaDTO | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadNoticia() {
      try {
        const response = await fetch("/api/noticias")
        if (!response.ok) return

        const data = (await response.json()) as NoticiaDTO | null
        if (!cancelled && data?.imagemUrl) {
          setNoticia(data)
          setOpen(true)
        }
      } catch {
        // Popup opcional — falha silenciosa
      }
    }

    void loadNoticia()

    return () => {
      cancelled = true
    }
  }, [])

  if (!noticia) return null

  const image = (
    <Image
      src={noticia.imagemUrl}
      alt={noticia.titulo}
      width={960}
      height={540}
      className="h-auto max-h-[70vh] w-full rounded-lg object-contain"
      unoptimized
    />
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl border-none bg-white p-4 sm:p-6">
        <DialogHeader className="sr-only">
          <DialogTitle>{noticia.titulo}</DialogTitle>
          <DialogDescription>Aviso do Museu Casa Borges</DialogDescription>
        </DialogHeader>

        {noticia.linkDestino ? (
          <Link
            href={noticia.linkDestino}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-opacity hover:opacity-95"
            onClick={() => setOpen(false)}
          >
            {image}
          </Link>
        ) : (
          image
        )}
      </DialogContent>
    </Dialog>
  )
}
