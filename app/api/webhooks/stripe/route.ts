import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase-admin';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/**
 * POST /api/webhooks/stripe
 * Handles Stripe webhook events for subscription management.
 * Must be configured as a raw body endpoint (no JSON parsing middleware).
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'customer.subscription.updated': {
        // Handle plan downgrades/upgrades if needed
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      default:
        // Unhandled event type — acknowledge receipt
        console.log(`Unhandled Stripe event type: ${event.type}`);
    }
  } catch (err) {
    console.error(`Error handling Stripe event ${event.type}:`, err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

/**
 * Handle checkout.session.completed:
 * Creates or updates the user record, setting plan to 'pro'.
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;
  const supabaseUserId = session.client_reference_id; // set at checkout creation
  const email = session.customer_email ?? session.customer_details?.email ?? '';

  // Priority 1: use client_reference_id (Supabase user ID) — most reliable
  if (supabaseUserId) {
    await supabaseAdmin
      .from('users')
      .upsert(
        {
          id: supabaseUserId,
          email,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          plan: 'pro',
        },
        { onConflict: 'id' }
      );
    return;
  }

  // Priority 2: existing user already has this customer ID
  const { data: existingUser } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (existingUser) {
    await supabaseAdmin
      .from('users')
      .update({
        stripe_subscription_id: subscriptionId,
        plan: 'pro',
      })
      .eq('id', existingUser.id);
    return;
  }

  // Priority 3: look up by email — paginate to avoid missing users past page 1
  if (email) {
    let matchedId: string | null = null;
    let page = 1;
    while (!matchedId) {
      const { data: authPage } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 1000 });
      if (!authPage?.users?.length) break;
      const found = authPage.users.find((u) => u.email === email);
      if (found) { matchedId = found.id; break; }
      if (!authPage.users.length || authPage.users.length < 1000) break;
      page++;
    }

    if (matchedId) {
      await supabaseAdmin
        .from('users')
        .upsert(
          {
            id: matchedId,
            email,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            plan: 'pro',
          },
          { onConflict: 'id' }
        );
    } else {
      // Unknown user — store pending record for post-signup linking
      console.log(`Checkout for unknown user: ${email}, customer: ${customerId}`);
      await supabaseAdmin
        .from('pending_upgrades')
        .upsert(
          {
            email,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            plan: 'pro',
            created_at: new Date().toISOString(),
          },
          { onConflict: 'email' }
        )
        .then(({ error }) => {
          if (error) console.log('pending_upgrades not yet created, skipping:', error.message);
        });
    }
  }
}

/**
 * Handle customer.subscription.deleted:
 * Sets user plan back to 'free'.
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  await supabaseAdmin
    .from('users')
    .update({
      plan: 'free',
      stripe_subscription_id: null,
    })
    .eq('stripe_customer_id', customerId);
}

/**
 * Handle customer.subscription.updated:
 * Updates the plan based on subscription status.
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  const isActive =
    subscription.status === 'active' || subscription.status === 'trialing';

  await supabaseAdmin
    .from('users')
    .update({
      plan: isActive ? 'pro' : 'free',
      stripe_subscription_id: subscription.id,
    })
    .eq('stripe_customer_id', customerId);
}
