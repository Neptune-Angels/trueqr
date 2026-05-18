import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { normalizeUrl } from '@/lib/url-utils';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';

async function getAuthUser() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/** GET /api/qr/[id] — Get single QR code */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from('qr_codes')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ...data, redirect_url: `https://trueqr.co/r/${data.slug}` });
}

/** PATCH /api/qr/[id] — Update destination URL */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  let body: { destination_url?: string; name?: string; folder_id?: string | null; utm_source?: string | null; utm_medium?: string | null; utm_campaign?: string | null };
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const updates: Record<string, string | null> = {};
  if (body.destination_url) {
    const normalized = normalizeUrl(body.destination_url);
    try { new URL(normalized); } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }
    updates.destination_url = normalized;
  }
  if (body.name) updates.name = body.name;
  if ('folder_id' in body) updates.folder_id = body.folder_id ?? null;
  if ('utm_source'   in body) updates.utm_source   = body.utm_source   ?? null;
  if ('utm_medium'   in body) updates.utm_medium   = body.utm_medium   ?? null;
  if ('utm_campaign' in body) updates.utm_campaign = body.utm_campaign ?? null;

  if (Object.keys(updates).length === 0)
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from('qr_codes')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error || !data) return NextResponse.json({ error: 'Update failed or not found' }, { status: 404 });
  return NextResponse.json({ ...data, redirect_url: `https://trueqr.co/r/${data.slug}` });
}
