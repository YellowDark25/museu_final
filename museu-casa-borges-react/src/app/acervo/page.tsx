import { Suspense } from "react"
import AcervoClient from "./AcervoClient"
import { getPublicAcervoOverview } from "@/features/acervo/server/public-acervo.service"

/**
 * AcervoPage
 * Função principal da página de Acervo. Controla:
 * - Leitura do parâmetro de URL (?categoria) para definir a aba ativa
 * - Busca das estatísticas via hook compartilhado useAcervoStats
 * - Renderização dos componentes modularizados (Hero, Cards, Busca e Abas)
 * Objetivo: reduzir o tamanho do antigo page.tsx (>800 linhas) em componentes
 * menores e reutilizáveis, mantendo a mesma UI e comportamento.
 */
/**
 * AcervoPage
 * Componente server que encapsula o cliente em Suspense
 */
export default async function AcervoPage() {
  const overview = await getPublicAcervoOverview()

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <AcervoClient overview={overview} />
    </Suspense>
  )
}
