import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const SYSTEM_PROMPT = `You are an AI assistant that converts plain-English requests into QR code configurations.

Supported QR types: URL, Text, Email, Phone, SMS, WiFi, vCard, Links, Business, Event, Coupon

Return ONLY valid JSON matching this schema — no markdown, no explanation outside the JSON:
{
  "qrType": "<one of the types above>",
  "name": "<short descriptive name for the QR code>",
  "fields": {
    // URL type
    "url": "<full URL including https://>",

    // Text type
    "text": "<text content>",

    // Email type
    "email": "<email address>",

    // Phone type
    "phone": "<phone number with country code>",

    // SMS type
    "smsPhone": "<phone number>",
    "smsMsg": "<message text>",

    // WiFi type
    "wifiSsid": "<network name>",
    "wifiPass": "<password>",
    "wifiType": "<WPA|WEP|nopass>",

    // vCard type
    "vcName": "<full name>",
    "vcPhone": "<phone>",
    "vcEmail": "<email>",
    "vcCompany": "<company>",

    // Links type (social tree)
    "pageTitle": "<page title>",
    "pageSubtitle": "<subtitle>",
    "accentColor": "<hex color>",
    "links": [{"label": "<label>", "url": "<url>"}],

    // Business type
    "bizName": "<business name>",
    "bizTagline": "<tagline>",
    "bizPhone": "<phone>",
    "bizEmail": "<email>",
    "bizWebsite": "<url>",
    "bizAddress": "<address>",

    // Event type
    "evtTitle": "<event title>",
    "evtDate": "<YYYY-MM-DD>",
    "evtTime": "<HH:MM>",
    "evtLocation": "<location>",
    "evtDesc": "<description>",
    "evtCta": "<button label e.g. RSVP>",
    "evtCtaUrl": "<url>",

    // Coupon type
    "cpnTitle": "<offer title>",
    "cpnCode": "<PROMO CODE>",
    "cpnDiscount": "<e.g. 20% OFF>",
    "cpnDesc": "<description/terms>",
    "cpnExpiry": "<YYYY-MM-DD or empty>"
  },
  "style": {
    "color": "<hex foreground, default #000000>",
    "bgColor": "<hex background, default #ffffff>",
    "dotStyle": "<square|rounded|dots|classy|classy-rounded|extra-rounded, default square>",
    "markerStyle": "<square|extra-rounded|dot, default square>"
  },
  "message": "<one friendly sentence explaining what you built>"
}

Rules:
- Only include fields relevant to the detected type (omit others)
- If information is missing, use sensible defaults or leave field empty
- For URLs always include https:// prefix
- Detect style hints: "rounded" → dotStyle rounded, "dots" → dotStyle dots, "green" → color #16a34a, "blue" → color #2563eb etc.
- If the request is about a business, prefer Business type over URL
- Keep "name" short (under 40 chars)
- "message" must be encouraging and specific to what was built`;

export async function POST(request: NextRequest) {
  // Auth check
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Pro check
  const { data: userRow } = await supabase.from('users').select('plan').eq('id', user.id).single();
  if (userRow?.plan !== 'pro') {
    return NextResponse.json({ error: 'AI Builder is a Pro feature. Upgrade to unlock it.', upgrade: true }, { status: 403 });
  }

  let body: { prompt?: string };
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const prompt = body.prompt?.trim();
  if (!prompt || prompt.length < 3) {
    return NextResponse.json({ error: 'Please describe what you want to create.' }, { status: 400 });
  }
  if (prompt.length > 1000) {
    return NextResponse.json({ error: 'Prompt too long. Keep it under 1000 characters.' }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'AI Builder is not configured yet.' }, { status: 503 });
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    console.error('Anthropic error:', res.status, await res.text());
    return NextResponse.json({ error: 'AI service error. Please try again.' }, { status: 502 });
  }

  const data = await res.json();
  const rawText = data.content?.[0]?.text ?? '';

  let parsed: Record<string, unknown>;
  try {
    // Extract the first {...} JSON object — model sometimes wraps in ```json fences
    // and adds trailing prose after the closing fence.
    let candidate = rawText.trim();
    const fenced = candidate.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenced) candidate = fenced[1];
    const first = candidate.indexOf('{');
    const last = candidate.lastIndexOf('}');
    if (first !== -1 && last > first) candidate = candidate.slice(first, last + 1);
    parsed = JSON.parse(candidate);
  } catch {
    console.error('Failed to parse AI response:', rawText);
    return NextResponse.json({ error: 'AI returned an unexpected response. Try rephrasing.' }, { status: 422 });
  }

  return NextResponse.json(parsed);
}
