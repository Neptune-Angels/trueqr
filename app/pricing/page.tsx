'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@/lib/supabase';
import Footer from '@/components/Footer';

// Note: metadata export is incompatible with 'use client'.
// SEO meta is handled via layout or a separate server component wrapper if needed.

const FREE_FEATURES = [
  'Static QR codes — permanent',
  'All QR types (URL, WiFi, vCard, email, phone, text)',
  'Color customization',
  'PNG + SVG download',
  'No account required',
  'No watermark',
  'No scan limits',
];

const PRO_FEATURES = [
  'Everything in Free',
  'Dynamic QR codes (edit destination after printing)',
  'Scan analytics (count, location, device, time)',
  'Custom landing pages',
  'Logo embedding',
  'Bulk generation (up to 25)',
  'Email support',
];

const BUSINESS_FEATURES = [
  'Everything in Pro',
  'REST API access',
  'Bulk generation (up to 500)',
  '3 team seats',
  'White-label (remove TrueQR branding)',
  'Custom domain short links',
  'Priority support',
];

function FreeCta() {
  return (
    <a
      href="/"
      className="text-center py-2.5 rounded-xl font-medium text-sm transition-colors bg-gray-800 hover:bg-gray-700 text-white block"
    >
      Generate now — free
    </a>
  );
}

function ProCta() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createBrowserClient();
    supabase.auth.getUser().then(({ data: { user } }) => setAuthed(!!user));
  }, []);

  async function handleCheckout() {
    // Require auth before checkout
    if (!authed) {
      window.location.href = '/signup?next=/pricing';
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      if (res.status === 401) {
        window.location.href = '/signup?next=/pricing';
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full text-center py-2.5 rounded-xl font-medium text-sm transition-colors bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Redirecting to checkout…
          </>
        ) : (
          'Start free trial'
        )}
      </button>
      {error && <p className="text-red-400 text-xs mt-2 text-center">{error}</p>}
    </div>
  );
}

function BusinessCta() {
  return (
    <a
      href="/signup"
      className="text-center py-2.5 rounded-xl font-medium text-sm transition-colors bg-gray-800 hover:bg-gray-700 text-white block"
    >
      Start free trial
    </a>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-3">Simple, honest pricing</h1>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Static QR codes are free forever — no trial period, no expiration, no account required.
          Pay only for dynamic codes and analytics.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {/* Free tier */}
          <div className="rounded-2xl p-6 border flex flex-col bg-gray-900 border-gray-800">
            <h2 className="text-xl font-bold mb-1">Free</h2>
            <div className="mb-4">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-gray-500 text-sm ml-1">forever</span>
            </div>
            <ul className="text-sm text-gray-300 space-y-2 mb-8 flex-1">
              {FREE_FEATURES.map(f => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <FreeCta />
          </div>

          {/* Pro tier */}
          <div className="rounded-2xl p-6 border flex flex-col bg-indigo-950 border-indigo-600 ring-1 ring-indigo-600">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">Most popular</span>
            <h2 className="text-xl font-bold mb-1">Pro</h2>
            <div className="mb-4">
              <span className="text-3xl font-bold">$12</span>
              <span className="text-gray-500 text-sm ml-1">/month</span>
            </div>
            <ul className="text-sm text-gray-300 space-y-2 mb-8 flex-1">
              {PRO_FEATURES.map(f => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <ProCta />
          </div>

          {/* Business tier */}
          <div className="rounded-2xl p-6 border flex flex-col bg-gray-900 border-gray-800">
            <h2 className="text-xl font-bold mb-1">Business</h2>
            <div className="mb-4">
              <span className="text-3xl font-bold">$29</span>
              <span className="text-gray-500 text-sm ml-1">/month</span>
            </div>
            <ul className="text-sm text-gray-300 space-y-2 mb-8 flex-1">
              {BUSINESS_FEATURES.map(f => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <BusinessCta />
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Common questions</h2>
          {[
            {
              q: 'Will my free QR codes ever stop working?',
              a: 'No. Free static QR codes encode your URL directly in the image. There is no server involved, so there is nothing to expire or deactivate. Your code will work as long as the destination URL exists — completely independent of TrueQR.',
            },
            {
              q: "What's the difference between static and dynamic QR codes?",
              a: 'Static QR codes encode the destination directly in the pixel pattern. Dynamic QR codes encode a short redirect URL (e.g. trueqr.com/r/abc) that our server forwards to your actual destination. Dynamic codes can be updated after printing, but they require an active subscription to stay live.',
            },
            {
              q: 'Can I cancel my Pro subscription?',
              a: 'Yes, any time. Your dynamic QR codes will stop redirecting when the subscription ends, but your static codes are unaffected.',
            },
            {
              q: 'Do I need an account for free static codes?',
              a: "No. Generate, download, done. We don't require an email address.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-gray-800 py-5">
              <h3 className="font-semibold mb-2">{q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
