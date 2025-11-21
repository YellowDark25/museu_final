import { Badge } from "@/components/ui/badge"

/**
 * HeroAcervo
 * Componente de cabeçalho/hero da página de acervo.
 * Exibe título, descrição e um badge "Acesso Livre".
 */
export default function HeroAcervo() {
  return (
    <section className="relative w-full bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            ACERVO DO MUSEU CASA BORGES
          </h1>
          <p className="text-base sm:text-lg opacity-90 mb-6">
            Explore nossa coleção de fotografias históricas, documentos e objetos que contam a rica história de Barra do Bugres e região.
          </p>
          <Badge className="bg-blue-500 hover:bg-blue-600">Acesso Livre</Badge>
        </div>
      </div>
    </section>
  )
}