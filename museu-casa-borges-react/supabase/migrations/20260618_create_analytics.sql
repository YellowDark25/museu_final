-- Tabela de pageviews anônimos para analytics first-party
CREATE TABLE IF NOT EXISTS public.analytics_page_views (
  id BIGSERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  section TEXT,
  session_id TEXT NOT NULL,
  referrer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics_page_views (created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_path ON public.analytics_page_views (path);
CREATE INDEX IF NOT EXISTS idx_analytics_session ON public.analytics_page_views (session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_section ON public.analytics_page_views (section);

ALTER TABLE public.analytics_page_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS analytics_insert_anon ON public.analytics_page_views;
CREATE POLICY analytics_insert_anon
  ON public.analytics_page_views
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
