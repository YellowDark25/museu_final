-- Tabela de eventos do calendário cultural
CREATE TABLE IF NOT EXISTS public.eventos (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  descricao TEXT,
  data_inicio TIMESTAMPTZ NOT NULL,
  data_fim TIMESTAMPTZ,
  local TEXT,
  categoria TEXT NOT NULL DEFAULT 'proximos'
    CHECK (categoria IN ('proximos', 'regulares', 'especiais', 'educativos')),
  tipo TEXT NOT NULL DEFAULT 'atividade'
    CHECK (tipo IN ('processo', 'atividade', 'tarefa')),
  status TEXT NOT NULL DEFAULT 'pendente'
    CHECK (status IN ('pendente', 'atrasada', 'concluida', 'cancelada')),
  cor TEXT NOT NULL DEFAULT '#7c3aed',
  gratuito BOOLEAN NOT NULL DEFAULT true,
  valor_ingresso NUMERIC(10, 2),
  vagas INTEGER,
  publicado BOOLEAN NOT NULL DEFAULT false,
  ordem INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_eventos_data_inicio ON public.eventos (data_inicio);
CREATE INDEX IF NOT EXISTS idx_eventos_publicado ON public.eventos (publicado);
CREATE INDEX IF NOT EXISTS idx_eventos_categoria ON public.eventos (categoria);
CREATE INDEX IF NOT EXISTS idx_eventos_status ON public.eventos (status);

CREATE OR REPLACE FUNCTION public.set_eventos_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_eventos_updated_at ON public.eventos;
CREATE TRIGGER trg_eventos_updated_at
  BEFORE UPDATE ON public.eventos
  FOR EACH ROW
  EXECUTE FUNCTION public.set_eventos_updated_at();

ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS eventos_select_publicados ON public.eventos;
CREATE POLICY eventos_select_publicados
  ON public.eventos
  FOR SELECT
  TO anon, authenticated
  USING (publicado = true);
