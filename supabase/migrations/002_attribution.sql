-- Migration 002: Attribution fields on qr_codes
-- Adds UTM-style tagging: source, medium, campaign

ALTER TABLE public.qr_codes
  ADD COLUMN IF NOT EXISTS utm_source   TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium   TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT;

CREATE INDEX IF NOT EXISTS idx_qr_codes_utm_campaign ON public.qr_codes(utm_campaign)
  WHERE utm_campaign IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_qr_codes_utm_source ON public.qr_codes(utm_source)
  WHERE utm_source IS NOT NULL;
