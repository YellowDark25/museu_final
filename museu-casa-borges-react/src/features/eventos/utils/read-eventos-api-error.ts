export async function readEventosApiError(response: Response) {
  try {
    const payload = (await response.json()) as { message?: string }
    return payload.message ?? "Não foi possível concluir a operação."
  } catch {
    return "Não foi possível concluir a operação."
  }
}
