import type { ReactNode } from "react"

import { AcervoAntdRegistry } from "@/features/acervo/components/AcervoAntdRegistry"

type Props = {
  children: ReactNode
}

export default function AcervoLayout({ children }: Props) {
  return <AcervoAntdRegistry>{children}</AcervoAntdRegistry>
}
