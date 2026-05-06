import type { Json } from "@/lib/database.types"

/**
 * Converte linhas de seção (JSONB `dados`) no formato esperado por ContentPage.
 * Camada de mapeamento dedicada — páginas públicas não repetem lógica de parsing.
 */

export type SecaoPublicRow = {
  tipo: string
  dados: Json
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function parseTextDados(dados: Json): string {
  if (!isRecord(dados)) return ""
  const c = dados.content
  return typeof c === "string" ? c : ""
}

function parseImageDados(dados: Json): {
  src: string
  alt: string
  caption?: string
  href?: string
} {
  if (!isRecord(dados)) {
    return { src: "", alt: "" }
  }
  return {
    src: typeof dados.src === "string" ? dados.src : "",
    alt: typeof dados.alt === "string" ? dados.alt : "",
    caption: typeof dados.caption === "string" ? dados.caption : undefined,
    href: typeof dados.href === "string" ? dados.href : undefined,
  }
}

function parseGridItems(dados: Json): Array<{
  src: string
  alt: string
  caption?: string
  href?: string
  width: number
  height: number
}> {
  if (!isRecord(dados)) return []
  const raw = dados.items
  if (!Array.isArray(raw)) return []
  return raw.map((item) => {
    const o = isRecord(item) ? item : {}
    return {
      src: typeof o.src === "string" ? o.src : "",
      alt: typeof o.alt === "string" ? o.alt : "",
      caption: typeof o.caption === "string" ? o.caption : undefined,
      href: typeof o.href === "string" ? o.href : undefined,
      width: 400,
      height: 300,
    }
  })
}

export interface MapSecoesOptions {
  /** Prefixo único para content em image_grid (ex.: slug da exposição ou do artista) */
  gridContentKey: string
  /** Se true, repassa `href` das imagens para ImageFigure (links clicáveis). */
  imageIncludeHref?: boolean
  /** Classes Tailwind opcionais na seção image_grid (ex.: "mt-4"). */
  imageGridClassName?: string
}

/**
 * Retorna objetos compatíveis com `sections` do ContentPage (tipagem estrutural).
 */
export function mapSecoesRowsToContentSections(
  secoes: SecaoPublicRow[],
  options: MapSecoesOptions
) {
  const {
    gridContentKey,
    imageIncludeHref = false,
    imageGridClassName,
  } = options

  return secoes.map((secao) => {
    switch (secao.tipo) {
      case "text":
        return {
          type: "text" as const,
          content: parseTextDados(secao.dados),
        }
      case "subtitle":
        return {
          type: "subtitle" as const,
          content: parseTextDados(secao.dados),
        }
      case "image": {
        const img = parseImageDados(secao.dados)
        const baseProps = {
          width: 800,
          height: 600,
          /** Largura útil para leitura; altura é limitada no ImageFigure */
          className: "max-w-2xl mx-auto",
        }
        const href =
          imageIncludeHref && img.href ? { href: img.href } : {}
        return {
          type: "image" as const,
          content: `${img.src}|${img.alt}|${img.caption ?? ""}`,
          imageProps: {
            ...baseProps,
            ...href,
          },
        }
      }
      case "image_grid":
        return {
          type: "image_grid" as const,
          content: `grid-${gridContentKey}`,
          items: parseGridItems(secao.dados),
          ...(imageGridClassName ? { className: imageGridClassName } : {}),
        }
      default:
        return {
          type: "text" as const,
          content: "",
        }
    }
  })
}
