"use client"

import Image from "next/image"

/**
 * Hero com HTML semântico (sem Typography antd) para hidratação estável.
 */
export default function HeroAcervo() {
  return (
    <section className="relative w-full overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fundo3.jpg"
          alt="Fundo Acervo - Museu Casa Borges"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-24">
        <div className="max-w-3xl">
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
            ACERVO DO MUSEU CASA BORGES
          </h1>
          <p className="mb-0 text-base leading-relaxed text-white/90 drop-shadow-md sm:text-lg">
            Explore nossa coleção de fotografias históricas, documentos e objetos que
            contam a rica história de Barra do Bugres e região.
          </p>
        </div>
      </div>
    </section>
  )
}
