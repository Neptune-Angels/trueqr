import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { normalizeUrl } from '@/lib/url-utils';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/** Generate a random alphanumeric slug of the given length */
function generateSlug(length = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/** Get authenticated user from cookie-based session */
async function getAuthUser() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

/** POST /api/qr — Create a new dynamic QR code */
export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { name?: string; destination_url?: string; style_config?: Record<string, string>; landing_config?: Record<string, unknown>; utm_source?: string; utm_medium?: string; utm_campaign?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { destination_url: rawDest, style_config, landing_config, utm_source, utm_medium, utm_campaign } = body;
  let { name } = body;

  if (!rawDest) {
    return NextResponse.json(
      { error: 'Missing required field: destination_url' },
      { status: 400 }
    );
  }

  // '__links__' is a sentinel meaning the URL will be set after slug generation
  const isLinksType = rawDest === '__links__';

  // Auto-generate name if not provided
  if (!name) {
    if (isLinksType) {
      const cfg = landing_config as any;
      name = cfg?.title || 'Links Page';
    } else {
      try { name = new URL(rawDest).hostname.replace(/^www\./, '') || 'QR Code'; }
      catch { name = 'QR Code'; }
    }
  }

  if (!isLinksType) {
    const normalized = normalizeUrl(rawDest);
    try { new URL(normalized); } catch {
      return NextResponse.json({ error: 'Invalid destination_url' }, { status: 400 });
    }
    // Use the normalized URL
    if (normalized !== rawDest) (body as Record<string, unknown>).destination_url = normalized;
  }

  // Ensure user record exists in public.users
  await supabaseAdmin
    .from('users')
    .upsert({ id: user.id, email: user.email ?? '' }, { onConflict: 'id' });

  // Generate a unique slug (retry on collision)
  let slug = generateSlug(8);
  for (let i = 0; i < 5; i++) {
    const { data: existing } = await supabaseAdmin
      .from('qr_codes').select('id').eq('slug', slug).single();
    if (!existing) break;
    slug = generateSlug(8);
  }

  const destination_url = isLinksType ? `https://trueqr.co/l/${slug}` : normalizeUrl(rawDest);

  const { data: qrCode, error } = await supabaseAdmin
    .from('qr_codes')
    .insert({
      user_id: user.id, slug, destination_url, name,
      ...(style_config   ? { style_config }   : {}),
      ...(landing_config ? { landing_config } : {}),
      ...(utm_source   ? { utm_source }   : {}),
      ...(utm_medium   ? { utm_medium }   : {}),
      ...(utm_campaign ? { utm_campaign } : {}),
    })
    .select()
    .single();

  if (error || !qrCode) {
    console.error('Failed to create QR code:', error);
    return NextResponse.json({ error: 'Failed to create QR code' }, { status: 500 });
  }

  return NextResponse.json({
    id: qrCode.id, slug: qrCode.slug, name: qrCode.name,
    destination_url: qrCode.destination_url,
    redirect_url: `https://trueqr.co/r/${slug}`,
    scan_count: qrCode.scan_count, is_active: qrCode.is_active,
    created_at: qrCode.created_at,
  }, { status: 201 });
}

/** GET /api/qr — List authenticated user's QR codes */
export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: qrCodes, error } = await supabaseAdmin
    .from('qr_codes')
    .select('id, slug, name, destination_url, scan_count, is_active, created_at, updated_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch QR codes' }, { status: 500 });
  }

  return NextResponse.json({
    qr_codes: (qrCodes ?? []).map(qr => ({
      ...qr, redirect_url: `https://trueqr.co/r/${qr.slug}`,
    }))
  });
}

/** DELETE /api/qr?id=xxx — Delete a QR code */
export async function DELETE(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { error } = await supabaseAdmin
    .from('qr_codes')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  return NextResponse.json({ success: true });
}
