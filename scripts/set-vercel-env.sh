#!/usr/bin/env bash
# set-vercel-env.sh
# Run this once to push the required environment variables to Vercel.
# Prerequisites: vercel CLI installed and authenticated (`vercel login`)
# Usage: bash scripts/set-vercel-env.sh

set -e

PROJECT="trueqr"

echo "Setting Vercel environment variables for project: $PROJECT"
echo "Set these in Vercel dashboard > Project Settings > Environment Variables:"
echo ""
echo "  STRIPE_SECRET_KEY                  (your Stripe secret key — server-side only)"
echo "  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (your Stripe publishable key)"
echo "  NEXT_PUBLIC_BASE_URL               https://trueqr.co"
echo "  NEXT_PUBLIC_SUPABASE_URL           (your Supabase project URL)"
echo "  NEXT_PUBLIC_SUPABASE_ANON_KEY      (your Supabase anon key)"
echo "  SUPABASE_SERVICE_ROLE_KEY          (your Supabase service role key)"
echo "  STRIPE_WEBHOOK_SECRET              (your Stripe webhook signing secret)"
