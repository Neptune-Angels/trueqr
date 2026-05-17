import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

export async function POST(request: NextRequest) {
  try {
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

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'You must be signed in to subscribe. Please create an account first.' },
        { status: 401 }
      );
    }

    // Parse billing interval from query or body
    const url = new URL(request.url);
    const billingParam = url.searchParams.get('billing');
    let billing: 'monthly' | 'annual' = 'monthly';
    try {
      const body = await request.json();
      if (body.billing === 'annual') billing = 'annual';
    } catch { /* no body or not JSON */ }
    if (billingParam === 'annual') billing = 'annual';

    const isAnnual = billing === 'annual';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: user.email,
      client_reference_id: user.id,
      subscription_data: {
        trial_period_days: 7,
        metadata: { billing },
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: isAnnual ? 9900 : 1200,
            recurring: { interval: isAnnual ? 'year' : 'month' },
            product_data: {
              name: isAnnual ? 'TrueQR Pro (Annual)' : 'TrueQR Pro',
              description: 'Dynamic QR codes, analytics, logo embed, bulk generate',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
