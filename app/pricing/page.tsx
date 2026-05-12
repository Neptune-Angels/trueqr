export const metadata = {
  title: 'Pricing — TrueQR',
  description: 'Simple, transparent pricing. Free static QR codes forever. Pro at $12/mo for dynamic QR codes and analytics.',
};

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    highlight: false,
    features: [
      'Static QR codes — permanent',
      'All QR types (URL, WiFi, vCard, email, phone, text)',
      'Color customization',
      'PNG + SVG download',
      'No account required',
      'No watermark',
      'No scan limits',
    ],
    cta: 'Generate now — free',
    ctaHref: '/',
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/month',
    highlight: true,
    features: [
      'Everything in Free',
      'Dynamic QR codes (edit destination after printing)',
      'Scan analytics (count, location, device, time)',
      'Custom landing pages',
      'Logo embedding',
      'Bulk generation (up to 25)',
      'Email support',
    ],
    cta: 'Start free trial',
    ctaHref: '/signup',
  },
  {
    name: 'Business',
    price: '$29',
    period: '/month',
    highlight: false,
    features: [
      'Everything in Pro',
      'REST API access',
      'Bulk generation (up to 500)',
      '3 team seats',
      'White-label (remove TrueQR branding)',
      'Custom domain short links',
      'Priority support',
    ],
    cta: 'Start free trial',
    ctaHref: '/signup',
  },
];

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
          {TIERS.map(tier => (
            <div
              key={tier.name}
              className={`rounded-2xl p-6 border flex flex-col ${
                tier.highlight
                  ? 'bg-indigo-950 border-indigo-600 ring-1 ring-indigo-600'
                  : 'bg-gray-900 border-gray-800'
              }`}
            >
              {tier.highlight && (
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">Most popular</span>
              )}
              <h2 className="text-xl font-bold mb-1">{tier.name}</h2>
              <div className="mb-4">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className="text-gray-500 text-sm ml-1">{tier.period}</span>
              </div>
              <ul className="text-sm text-gray-300 space-y-2 mb-8 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={tier.ctaHref}
                className={`text-center py-2.5 rounded-xl font-medium text-sm transition-colors ${
                  tier.highlight
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
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
              q: 'What\'s the difference between static and dynamic QR codes?',
              a: 'Static QR codes encode the destination directly in the pixel pattern. Dynamic QR codes encode a short redirect URL (e.g. trueqr.com/r/abc) that our server forwards to your actual destination. Dynamic codes can be updated after printing, but they require an active subscription to stay live.',
            },
            {
              q: 'Can I cancel my Pro subscription?',
              a: 'Yes, any time. Your dynamic QR codes will stop redirecting when the subscription ends, but your static codes are unaffected.',
            },
            {
              q: 'Do I need an account for free static codes?',
              a: 'No. Generate, download, done. We don\'t require an email address.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-gray-800 py-5">
              <h3 className="font-semibold mb-2">{q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
