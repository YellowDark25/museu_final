-- Pop-ups de notícias / eventos exibidos na página inicial
CREATE TABLE IF NOT EXISTS public.noticias (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  imagem_url TEXT NOT NULL,
  link_destino TEXT,
  publicado BOOLEAN NOT NULL DEFAULT false,
  exibir_popup BOOLEAN NOT NULL DEFAULT true,
  data_inicio TIMESTAMPTZ,
  data_fim TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_noticias_publicado ON public.noticias (publicado);
CREATE INDEX IF NOT EXISTS idx_noticias_exibir_popup ON public.noticias (exibir_popup);

CREATE OR REPLACE FUNCTION public.set_noticias_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_noticias_updated_at ON public.noticias;
CREATE TRIGGER trg_noticias_updated_at
  BEFORE UPDATE ON public.noticias
  FOR EACH ROW
  EXECUTE FUNCTION public.set_noticias_updated_at();

ALTER TABLE public.noticias ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS noticias_select_publicados ON public.noticias;
CREATE POLICY noticias_select_publicados
  ON public.noticias
  FOR SELECT
  TO anon, authenticated
  USING (publicado = true);
