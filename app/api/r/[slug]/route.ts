import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Look up the slug in qr_codes table
  const { data: qrCode, error } = await supabaseAdmin
    .from('qr_codes')
    .select('id, destination_url, is_active, scan_count')
    .eq('slug', slug)
    .single();

  if (error || !qrCode) {
    return NextResponse.json(
      { error: 'QR code not found' },
      { status: 404 }
    );
  }

  if (!qrCode.is_active) {
    return NextResponse.json(
      { error: 'This QR code is no longer active' },
      { status: 410 }
    );
  }

  // Increment scan_count asynchronously (fire and forget — don't block the redirect)
  void supabaseAdmin
    .from('qr_codes')
    .update({ scan_count: (qrCode.scan_count ?? 0) + 1 })
    .eq('id', qrCode.id);

  // Log the scan to qr_scans asynchronously
  const userAgent = request.headers.get('user-agent') ?? undefined;
  const referer = request.headers.get('referer') ?? undefined;

  void supabaseAdmin
    .from('qr_scans')
    .insert({
      qr_code_id: qrCode.id,
      user_agent: userAgent,
      referer: referer,
      // country: can be populated via Vercel edge geo headers (e.g., request.geo?.country)
    });

  // 302 redirect to destination
  return NextResponse.redirect(qrCode.destination_url, { status: 302 });
}
