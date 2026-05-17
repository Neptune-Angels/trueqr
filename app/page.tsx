import QRGenerator from '@/components/QRGenerator';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'TrueQR — Free QR Code Generator. No Tricks, No Expiration.',
  description:
    "Generate permanent, free QR codes instantly. No account required. No expiration. We explain exactly what you're getting before you generate. Static QR codes are free forever.",
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TrueQR',
    url: 'https://trueqr.co',
    description:
      'Free QR code generator. Create permanent static QR codes for URLs, WiFi, vCards, email, phone, and text — no account required, no expiration, no tricks.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern web browser',
    offers: [
      {
        '@type': 'Offer',
        name: 'Free',
        price: '0',
        priceCurrency: 'USD',
        description: 'Permanent static QR codes — no account, no expiration, no watermark.',
      },
      {
        '@type': 'Offer',
        name: 'Pro',
        price: '12.00',
        priceCurrency: 'USD',
        billingIncrement: 'Month',
        description: 'Dynamic QR codes with editable destination and scan analytics.',
      },
    ],
    featureList: [
      'URL QR codes',
      'WiFi QR codes',
      'vCard QR codes',
      'Email QR codes',
      'Phone QR codes',
      'Text QR codes',
      'PNG and SVG download',
      'Custom colors and logo',
      'No account required',
      'No expiration',
      'Dynamic QR codes with analytics (Pro)',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '127',
      bestRating: '5',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "What's the difference between a static and dynamic QR code?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A static QR code encodes your destination directly into the pixel pattern — no server required, no expiration possible. A dynamic QR code encodes a short redirect URL that routes through a third-party server. When that subscription lapses, the code breaks. TrueQR static codes are free and permanent. Dynamic codes are available on paid plans.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will my free QR code ever expire?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "No. TrueQR's free QR codes are static — the destination is encoded directly into the image. There is no server involved, so there is nothing to expire or deactivate. The code you download today will scan correctly in 10 years.",
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to create an account to generate a QR code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Generate, download, done. TrueQR does not require an email address, phone number, or credit card for free static QR codes.',
        },
      },
      {
        '@type': 'Question',
        name: "Why do other QR generators' free codes stop working?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most QR generators create dynamic codes by default without explaining the difference. Dynamic codes route through their servers. When your free trial ends or their pricing changes, your code breaks. TrueQR always creates static codes on the free tier and clearly explains which type you are getting.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use TrueQR QR codes for commercial purposes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. There are no restrictions on commercial use. Use TrueQR codes on business cards, storefronts, packaging, and marketing materials on any plan.',
        },
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to create a free QR code',
    description: 'Generate a permanent QR code in under 30 seconds — no account required.',
    totalTime: 'PT30S',
    tool: { '@type': 'HowToTool', name: 'TrueQR — Free QR Code Generator' },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Choose your QR type',
        text: 'Select from URL, WiFi, vCard, email, phone, or plain text.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Fill in your details',
        text: 'Enter your URL, network credentials, contact info, or message. Customize color and size.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Download and use forever',
        text: 'Click Generate, then download PNG or SVG. Your static QR code works forever with no server needed.',
      },
    ],
  },
];

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Choose your QR type',
    desc: 'Select from URL, WiFi, vCard, email, phone, or plain text. Each type encodes information in the optimal format for that use case.',
  },
  {
    step: '2',
    title: 'Fill in your details',
    desc: 'Enter your URL, network credentials, contact info, or message. Customize the color and size to match your brand.',
  },
  {
    step: '3',
    title: 'Download and use forever',
    desc: 'Click Generate, then download PNG or SVG. Your static QR code is ready to print, embed, or share — and it will work forever.',
  },
];

const WHY_TRUEQR = [
  {
    icon: '🆓',
    title: 'Free forever',
    desc: 'Static QR codes physically encode your destination directly into the pattern. No server needed — which means no subscription can take them away from you.',
  },
  {
    icon: '🚫',
    title: 'No account needed',
    desc: "Generate, download, done. We don't require an email address, phone number, or credit card to hand you a PNG file.",
  },
  {
    icon: '📴',
    title: 'Works offline',
    desc: "Because your data is baked into the QR pattern itself, scanners don't need internet access to read it. Perfect for menus, signs, and print materials.",
  },
];

const FAQ = [
  {
    q: "What's the difference between a static and dynamic QR code?",
    a: "A static QR code encodes your destination (URL, text, contact info) directly into the black-and-white pattern. It requires no server and cannot expire. A dynamic QR code encodes a redirect URL — meaning a third-party server must be running to forward scans to your actual destination. That server requires a subscription to stay active, and when the subscription lapses, the code breaks.",
  },
  {
    q: 'Will my free QR code ever expire?',
    a: "No. TrueQR's free QR codes are static. There's no server involved, so there's nothing to expire, break, or be held behind a paywall. The code you download today will scan correctly in 10 years.",
  },
  {
    q: "Why do other QR generators' free codes stop working?",
    a: 'Most popular QR generators create dynamic codes by default — or without telling you. Dynamic codes route through their servers. When your free trial ends or they change their pricing, your code breaks. We create static codes and always tell you which type you\'re getting.',
  },
  {
    q: 'When would I want a dynamic QR code?',
    a: 'Dynamic codes make sense when you need to change the destination after printing (e.g., you printed 10,000 menus and your menu URL changed), or when you need scan analytics (how many scans, from where, at what time). TrueQR offers dynamic codes on paid plans starting at $12/month.',
  },
  {
    q: 'Can I use TrueQR QR codes for commercial purposes?',
    a: 'Yes. There are no restrictions on how you use QR codes generated on TrueQR. Use them on business cards, storefronts, packaging, marketing materials, or anywhere else — free or paid plan.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* JSON-LD Structured Data */}
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-950 border border-emerald-800 text-emerald-400 text-sm px-3 py-1 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          No expiration. No account. No tricks.
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          The honest QR code generator
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-2">
          Static QR codes are{' '}
          <strong className="text-white">free forever</strong> — they encode
          your URL directly, require no server, and cannot expire. No surprises
          after you print your flyers.
        </p>
        <p className="text-sm text-gray-600 mb-10">
          Dynamic QR codes (editable destination + scan analytics) are a paid
          subscription. We&apos;ll always tell you which is which.
        </p>
        <QRGenerator />
      </section>

      {/* Trust bar */}
      <section className="border-t border-gray-800 py-8">
        <div className="max-w-3xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          {[
            { label: 'Free static QR codes', sub: 'Permanent. No account.' },
            { label: 'PNG + SVG download', sub: 'Print-ready files.' },
            { label: 'No watermark', sub: 'Ever. On free tier.' },
          ].map(({ label, sub }) => (
            <div key={label}>
              <div className="text-white font-semibold text-sm">{label}</div>
              <div className="text-gray-500 text-xs mt-1">{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-2 text-center">How it works</h2>
        <p className="text-gray-500 text-center text-sm mb-10">
          Generate a permanent QR code in under 30 seconds — no account required.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div
              key={step}
              className="relative bg-gray-900 rounded-xl p-6 border border-gray-800 text-center"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                {step}
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why TrueQR */}
      <section className="max-w-3xl mx-auto px-4 py-16 border-t border-gray-800">
        <h2 className="text-2xl font-bold mb-2 text-center">Why TrueQR?</h2>
        <p className="text-gray-500 text-center text-sm mb-10">
          We built the tool we wished existed when we got burned by expiring free QR codes.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {WHY_TRUEQR.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center"
            >
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-4 py-16 border-t border-gray-800">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Frequently asked questions
        </h2>
        <p className="text-gray-500 text-center text-sm mb-10">
          Everything you need to know about static vs dynamic QR codes.
        </p>
        <div className="space-y-6">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="font-semibold text-white mb-2">{q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
