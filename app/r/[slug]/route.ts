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
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!qrCode.is_active) {
    return NextResponse.json({ error: 'This QR code is no longer active' }, { status: 410 });
  }

  // Await writes — fire-and-forget void gets killed by Vercel serverless before completing
  await Promise.allSettled([
    supabaseAdmin
      .from('qr_codes')
      .update({ scan_count: (qrCode.scan_count ?? 0) + 1 })
      .eq('id', qrCode.id),
    supabaseAdmin.from('qr_scans').insert({
      qr_code_id: qrCode.id,
      user_agent: request.headers.get('user-agent') ?? undefined,
      referer: request.headers.get('referer') ?? undefined,
    }),
  ]);

  return NextResponse.redirect(qrCode.destination_url, { status: 302 });
}
