import { Badge } from "@/components/ui/badge"
import Image from "next/image"

/**
 * HeroAcervo
 * Componente de cabeçalho/hero da página de acervo.
 * Exibe título, descrição e um badge "Acesso Livre".
 */
export default function HeroAcervo() {
  return (
    <section className="relative w-full text-white overflow-hidden">
      {/* Background Image with Overlay */}
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
            ACERVO DO MUSEU CASA BORGES
          </h1>
          <p className="text-base sm:text-lg opacity-90 mb-6 drop-shadow-md">
            Explore nossa coleção de fotografias históricas, documentos e objetos que contam a rica história de Barra do Bugres e região.
          </p>
        </div>
      </div>
    </section>
  )
}
