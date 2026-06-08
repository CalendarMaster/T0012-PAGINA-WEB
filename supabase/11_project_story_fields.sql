-- Agrega campos de mini historia a cada proyecto
-- Estructura: Desafío del cliente → Intervención MI Studio → Resultado generado
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS challenge    text,
  ADD COLUMN IF NOT EXISTS intervention text,
  ADD COLUMN IF NOT EXISTS result       text;
