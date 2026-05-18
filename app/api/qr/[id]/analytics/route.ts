import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  // Verify ownership
  const { data: qr } = await supabaseAdmin
    .from('qr_codes')
    .select('id, name, slug, destination_url, scan_count, utm_source, utm_medium, utm_campaign')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (!qr) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // Get scans for last 30 days
  const since = new Date();
  since.setDate(since.getDate() - 30);

  const { data: scans, error: scansError } = await supabaseAdmin
    .from('qr_scans')
    .select('scanned_at, country, city, latitude, longitude')
    .eq('qr_code_id', id)
    .gte('scanned_at', since.toISOString())
    .order('scanned_at', { ascending: true });

  if (scansError) console.error('[analytics] qr_scans query error:', scansError.message, scansError.details);
  console.log('[analytics] qr_id:', id, 'scans found:', scans?.length ?? 0, 'since:', since.toISOString());

  // Group by date
  const byDate: Record<string, number> = {};
  const byCountry: Record<string, number> = {};

  // City heatmap aggregation
  const cityMap: Record<string, { city: string; lat: number; lng: number; count: number }> = {};

  for (const scan of scans ?? []) {
    const date = scan.scanned_at.substring(0, 10);
    byDate[date] = (byDate[date] || 0) + 1;
    const country = scan.country || 'Unknown';
    byCountry[country] = (byCountry[country] || 0) + 1;

    if (scan.city && scan.latitude != null && scan.longitude != null) {
      const key = `${scan.city}|${Math.round(scan.latitude * 10) / 10}|${Math.round(scan.longitude * 10) / 10}`;
      if (!cityMap[key]) cityMap[key] = { city: scan.city, lat: scan.latitude, lng: scan.longitude, count: 0 };
      cityMap[key].count++;
    }
  }

  // Fill in all 30 days (so chart has no gaps)
  const last30: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().substring(0, 10);
    last30.push({ date: dateStr, count: byDate[dateStr] || 0 });
  }

  const topCountries = Object.entries(byCountry)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([country, count]) => ({ country, count }));

  const attribution = {
    source:   qr.utm_source   ?? null,
    medium:   qr.utm_medium   ?? null,
    campaign: qr.utm_campaign ?? null,
  };

  const cityHeatmap = Object.values(cityMap).sort((a, b) => b.count - a.count);

  return NextResponse.json({
    qr,
    total_scans: qr.scan_count,
    last_30_days: last30,
    top_countries: topCountries,
    attribution,
    city_heatmap: cityHeatmap,
  });
}
