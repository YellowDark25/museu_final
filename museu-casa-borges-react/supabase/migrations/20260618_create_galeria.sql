-- Álbuns de galeria fotográfica do museu
CREATE TABLE IF NOT EXISTS public.galeria_albuns (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  descricao TEXT,
  capa_url TEXT,
  data_evento DATE,
  categoria TEXT,
  publicado BOOLEAN NOT NULL DEFAULT false,
  ordem INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_galeria_albuns_publicado ON public.galeria_albuns (publicado);
CREATE INDEX IF NOT EXISTS idx_galeria_albuns_slug ON public.galeria_albuns (slug);
CREATE INDEX IF NOT EXISTS idx_galeria_albuns_ordem ON public.galeria_albuns (ordem);

-- Itens (fotos) de cada álbum
CREATE TABLE IF NOT EXISTS public.galeria_itens (
  id SERIAL PRIMARY KEY,
  album_id INT NOT NULL REFERENCES public.galeria_albuns(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  titulo TEXT,
  legenda TEXT,
  categoria_item TEXT,
  ordem INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_galeria_itens_album_id ON public.galeria_itens (album_id);
CREATE INDEX IF NOT EXISTS idx_galeria_itens_ordem ON public.galeria_itens (ordem);

-- Trigger updated_at para álbuns
CREATE OR REPLACE FUNCTION public.set_galeria_albuns_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_galeria_albuns_updated_at ON public.galeria_albuns;
CREATE TRIGGER trg_galeria_albuns_updated_at
  BEFORE UPDATE ON public.galeria_albuns
  FOR EACH ROW
  EXECUTE FUNCTION public.set_galeria_albuns_updated_at();

-- RLS
ALTER TABLE public.galeria_albuns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galeria_itens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS galeria_albuns_select_publicados ON public.galeria_albuns;
CREATE POLICY galeria_albuns_select_publicados
  ON public.galeria_albuns
  FOR SELECT
  TO anon, authenticated
  USING (publicado = true);

DROP POLICY IF EXISTS galeria_itens_select ON public.galeria_itens;
CREATE POLICY galeria_itens_select
  ON public.galeria_itens
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.galeria_albuns a
      WHERE a.id = album_id AND a.publicado = true
    )
  );
