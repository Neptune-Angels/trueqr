import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
// Resend restricts onboarding@resend.dev to the account owner's email until domain is verified.
// Once trueqr.co domain is verified, switch TO_EMAIL to conor@neufamily.com and FROM_EMAIL to noreply@trueqr.co
const TO_EMAIL = 'elmerintheflesh@hotmail.com';
const FROM_EMAIL = 'onboarding@resend.dev';

export async function POST(request: NextRequest) {
  let body: { name?: string; email?: string; subject?: string; message?: string };
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { name, email, subject, message } = body;
  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: 'Message too long' }, { status: 400 });
  }

  // Check if sender is a Pro user
  let isPro = false;
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from('users').select('plan').eq('id', user.id).single();
      isPro = data?.plan === 'pro';
    }
  } catch { /* non-authenticated is fine */ }

  const subjectLine = `[TrueQR${isPro ? ' PRO' : ''}] ${subject}: ${name}`;

  // Send to Conor
  const toRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: subjectLine,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#111">New TrueQR Support Request</h2>
          ${isPro ? '<p style="display:inline-block;background:#10b981;color:#fff;padding:2px 10px;border-radius:4px;font-size:13px;font-weight:600">PRO USER</p>' : ''}
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr><td style="padding:8px;color:#666;width:80px">Name</td><td style="padding:8px;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px;color:#666">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;color:#666">Subject</td><td style="padding:8px">${subject}</td></tr>
          </table>
          <div style="background:#f5f5f5;border-left:4px solid #10b981;padding:16px;border-radius:4px;white-space:pre-wrap">${message.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>
          <p style="color:#999;font-size:12px;margin-top:24px">Sent from trueqr.co/contact</p>
        </div>
      `,
      reply_to: email,
    }),
  });

  if (!toRes.ok) {
    const errText = await toRes.text();
    console.error('Resend error:', errText);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }

  // Auto-reply disabled until trueqr.co domain is verified on Resend
  // Resend blocks onboarding@resend.dev sends to non-account addresses

  return NextResponse.json({ ok: true });
}
