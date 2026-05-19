CREATE TABLE IF NOT EXISTS public.solicitacoes_visita (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  nome_instituicao TEXT NOT NULL,
  objetivo_visita TEXT,
  numero_pessoas TEXT,
  telefone TEXT NOT NULL,
  endereco TEXT,
  data_visita DATE NOT NULL,
  horario_visita TIME NOT NULL,
  comentarios TEXT,
  status TEXT NOT NULL DEFAULT 'pendente'
    CHECK (status IN ('pendente', 'aceita', 'recusada')),
  observacao_admin TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  respondido_em TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_solicitacoes_visita_status ON public.solicitacoes_visita (status);
CREATE INDEX IF NOT EXISTS idx_solicitacoes_visita_data ON public.solicitacoes_visita (data_visita);

CREATE OR REPLACE FUNCTION public.set_solicitacoes_visita_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_solicitacoes_visita_updated_at ON public.solicitacoes_visita;
CREATE TRIGGER trg_solicitacoes_visita_updated_at
  BEFORE UPDATE ON public.solicitacoes_visita
  FOR EACH ROW
  EXECUTE FUNCTION public.set_solicitacoes_visita_updated_at();

ALTER TABLE public.solicitacoes_visita ENABLE ROW LEVEL SECURITY;
