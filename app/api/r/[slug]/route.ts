import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data: qrCode, error } = await supabaseAdmin
    .from('qr_codes')
    .select('id, destination_url, is_active, scan_count')
    .eq('slug', slug)
    .single();

  if (error || !qrCode) {
    return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
  }

  if (!qrCode.is_active) {
    return NextResponse.json({ error: 'This QR code is no longer active' }, { status: 410 });
  }

  const userAgent = request.headers.get('user-agent') ?? undefined;
  const referer   = request.headers.get('referer')    ?? undefined;

  // Vercel geo headers — injected by the Edge Network on all plans
  const country  = request.headers.get('x-vercel-ip-country')   ?? undefined;
  const city     = request.headers.get('x-vercel-ip-city')       ?? undefined;
  const rawLat   = request.headers.get('x-vercel-ip-latitude');
  const rawLng   = request.headers.get('x-vercel-ip-longitude');
  const latitude  = rawLat  ? parseFloat(rawLat)  : undefined;
  const longitude = rawLng  ? parseFloat(rawLng)  : undefined;

  // Decode URL-encoded city name (Vercel encodes spaces etc.)
  const cityDecoded = city ? decodeURIComponent(city) : undefined;

  await Promise.allSettled([
    supabaseAdmin
      .from('qr_codes')
      .update({ scan_count: (qrCode.scan_count ?? 0) + 1 })
      .eq('id', qrCode.id),
    supabaseAdmin
      .from('qr_scans')
      .insert({
        qr_code_id: qrCode.id,
        user_agent: userAgent,
        referer:    referer,
        country:    country,
        city:       cityDecoded,
        latitude:   latitude  ?? null,
        longitude:  longitude ?? null,
      }),
  ]);

  return NextResponse.redirect(qrCode.destination_url, { status: 302 });
}
