import { redirect } from 'next/navigation';

/**
 * ExposicaoVirtualAliasPage
 *
 * Rota de compatibilidade para o endpoint legado "/exposicao-virtual".
 * Esta página existe apenas para redirecionar o usuário para a nova rota
 * "/exposicoes/virtuais" dentro do App Router do Next.js.
 *
 * Observação: usamos redirect() no Server Component para garantir um
 * redirecionamento imediato e sem renderização de conteúdo.
 */
export default function ExposicaoVirtualAliasPage() {
  // Redireciona imediatamente para a página oficial de Exposições Virtuais.
  redirect('/exposicoes/virtuais');
  return null;
}