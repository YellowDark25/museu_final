import { Suspense } from 'react'
import BibliotecaClient from './BibliotecaClient'

/**
 * BibliotecaPage
 * Componente server que encapsula o cliente em Suspense
 */
export default function BibliotecaPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <BibliotecaClient />
    </Suspense>
  )
}
