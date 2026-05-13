import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { createClient } from '@supabase/supabase-js';

/** Generate a random alphanumeric slug of the given length */
function generateSlug(length = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/** Extract authenticated user from the request using the user's JWT */
async function getAuthUser(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.slice(7);

  // Create a user-context client to verify the JWT
  const userClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${token}` } },
    }
  );

  const { data: { user }, error } = await userClient.auth.getUser();
  if (error || !user) return null;
  return user;
}

/** POST /api/qr — Create a new dynamic QR code */
export async function POST(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { name?: string; destination_url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { name, destination_url } = body;

  if (!name || !destination_url) {
    return NextResponse.json(
      { error: 'Missing required fields: name, destination_url' },
      { status: 400 }
    );
  }

  // Validate URL
  try {
    new URL(destination_url);
  } catch {
    return NextResponse.json({ error: 'Invalid destination_url' }, { status: 400 });
  }

  // Ensure user record exists in public.users
  await supabaseAdmin
    .from('users')
    .upsert({ id: user.id, email: user.email ?? '' }, { onConflict: 'id' });

  // Generate a unique slug (retry on collision)
  let slug = generateSlug(8);
  let attempts = 0;
  while (attempts < 5) {
    const { data: existing } = await supabaseAdmin
      .from('qr_codes')
      .select('id')
      .eq('slug', slug)
      .single();
    if (!existing) break;
    slug = generateSlug(8);
    attempts++;
  }

  const { data: qrCode, error } = await supabaseAdmin
    .from('qr_codes')
    .insert({
      user_id: user.id,
      slug,
      destination_url,
      name,
    })
    .select()
    .single();

  if (error || !qrCode) {
    console.error('Failed to create QR code:', error);
    return NextResponse.json(
      { error: 'Failed to create QR code' },
      { status: 500 }
    );
  }

  const redirectUrl = `https://trueqr.co/r/${slug}`;

  return NextResponse.json(
    {
      id: qrCode.id,
      slug: qrCode.slug,
      name: qrCode.name,
      destination_url: qrCode.destination_url,
      redirect_url: redirectUrl,
      scan_count: qrCode.scan_count,
      is_active: qrCode.is_active,
      created_at: qrCode.created_at,
    },
    { status: 201 }
  );
}

/** GET /api/qr — List authenticated user's QR codes with scan counts */
export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: qrCodes, error } = await supabaseAdmin
    .from('qr_codes')
    .select('id, slug, name, destination_url, scan_count, is_active, created_at, updated_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch QR codes:', error);
    return NextResponse.json({ error: 'Failed to fetch QR codes' }, { status: 500 });
  }

  const codes = (qrCodes ?? []).map((qr) => ({
    ...qr,
    redirect_url: `https://trueqr.co/r/${qr.slug}`,
  }));

  return NextResponse.json({ qr_codes: codes });
}
