-- Mantém o projeto ativo no plano gratuito (evita pausa por ~7 dias sem uso).
-- Executa uma consulta leve todo dia às 12:00 UTC (9h em Cuiabá).

CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'museu-keep-alive') THEN
    PERFORM cron.unschedule('museu-keep-alive');
  END IF;
END;
$$;

SELECT cron.schedule(
  'museu-keep-alive',
  '0 12 * * *',
  $$SELECT 1$$
);
