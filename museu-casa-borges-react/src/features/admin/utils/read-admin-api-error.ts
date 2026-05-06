/**
 * Extrai mensagem de erro de respostas JSON das rotas /api/admin/*.
 * Mantém um único ponto de parsing para hooks do admin (SRP / DRY).
 */
export async function readAdminApiError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { message?: string }
    if (typeof body.message === "string" && body.message.trim()) {
      return body.message
    }
  } catch {
    // corpo não JSON ou vazio
  }
  return "Não foi possível concluir a operação."
}
