import Footer from '@/components/Footer';

export const metadata = {
  title: 'Static vs Dynamic QR Code: What\'s the Difference? — TrueQR',
  description:
    'Static QR codes encode data directly and work forever — free. Dynamic QR codes route through a server, can be edited, and die when you stop paying. Learn which one you actually need.',
  openGraph: {
    title: 'Static vs Dynamic QR Code: What\'s the Difference?',
    description:
      'Static QR codes are permanent and free. Dynamic QR codes require a subscription — and break when you cancel. Here\'s everything you need to know before you generate one.',
    type: 'article',
    url: 'https://trueqr.co/blog/static-vs-dynamic-qr-code',
  },
};

export default function StaticVsDynamicPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <article className="max-w-2xl mx-auto px-4 pt-16 pb-20">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-gray-400 transition-colors">TrueQR</a>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Blog</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Static vs Dynamic QR Code</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight">
            Static vs Dynamic QR Code: What&apos;s the Difference and Which One Do You Need?
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Before you print a QR code on a business card, flyer, or product — you need to know this distinction. It could mean the difference between a code that works forever and one that dies the moment you stop paying a subscription.
          </p>
        </header>

        {/* Section: Static */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">What is a static QR code?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            A static QR code has your destination — a URL, phone number, WiFi password, contact card, or plain text — <strong className="text-white">encoded directly into the pixel pattern</strong> of the image itself. When someone scans it, their phone reads that data straight out of the image. No server is involved. No internet connection is required.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            This has some important implications:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 pl-2">
            <li>The destination is <strong className="text-white">fixed at creation</strong>. You can&apos;t change it later without generating a new code.</li>
            <li>It <strong className="text-white">works forever</strong> — there&apos;s no server to go down, no subscription to lapse, no company to go bankrupt.</li>
            <li>It <strong className="text-white">works offline</strong> — useful for menus, signs in areas with poor cell service, or product packaging.</li>
            <li>It&apos;s <strong className="text-white">genuinely free</strong> — generating an image file costs nothing, so no one can justify charging you for it.</li>
          </ul>
          <p className="text-gray-300 leading-relaxed">
            Static QR codes are what most people actually need. Business cards, event flyers, WiFi signs, product packaging, email signatures — static codes handle all of these perfectly.
          </p>
        </section>

        {/* Section: Dynamic */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">What is a dynamic QR code?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            A dynamic QR code doesn&apos;t encode your actual destination. Instead, it encodes a <strong className="text-white">short redirect URL</strong> — something like <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm text-gray-200">someservice.com/r/abc123</code> — that belongs to the QR code provider. When someone scans it, their phone hits that redirect URL, and the provider&apos;s server forwards them to your actual destination.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            That server-in-the-middle is what makes dynamic codes both powerful and risky:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 pl-2">
            <li><strong className="text-white">Editable destination:</strong> You can change where the code points without reprinting it — useful for menus or large print runs.</li>
            <li><strong className="text-white">Scan analytics:</strong> The server can log every scan, including time, location, and device type.</li>
            <li><strong className="text-white">Requires an active subscription:</strong> The redirect only works while the provider keeps their server running and your account active.</li>
            <li><strong className="text-white">Breaks when you cancel:</strong> If you stop paying — or if the provider shuts down — every printed code becomes a dead link.</li>
          </ul>
          <p className="text-gray-300 leading-relaxed">
            Dynamic codes are a legitimate tool for specific use cases. But they&apos;re often sold (and defaulted to) in situations where a static code would work better, is free, and would last forever.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Static vs Dynamic: Side-by-side comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-900 border-b border-gray-800">
                  <th className="px-4 py-3 font-semibold text-gray-400 w-1/3">Feature</th>
                  <th className="px-4 py-3 font-semibold text-emerald-400">Static QR Code</th>
                  <th className="px-4 py-3 font-semibold text-indigo-400">Dynamic QR Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="bg-gray-950">
                  <td className="px-4 py-3 text-gray-400">Cost</td>
                  <td className="px-4 py-3 text-gray-200">Free — always</td>
                  <td className="px-4 py-3 text-gray-200">Subscription required ($5–$30+/mo)</td>
                </tr>
                <tr className="bg-gray-900">
                  <td className="px-4 py-3 text-gray-400">Editable after printing</td>
                  <td className="px-4 py-3 text-gray-200">No — fixed at creation</td>
                  <td className="px-4 py-3 text-gray-200">Yes — change destination anytime</td>
                </tr>
                <tr className="bg-gray-950">
                  <td className="px-4 py-3 text-gray-400">Scan analytics</td>
                  <td className="px-4 py-3 text-gray-200">No</td>
                  <td className="px-4 py-3 text-gray-200">Yes — count, location, device, time</td>
                </tr>
                <tr className="bg-gray-900">
                  <td className="px-4 py-3 text-gray-400">Works if you cancel</td>
                  <td className="px-4 py-3 text-emerald-400 font-medium">Yes — forever</td>
                  <td className="px-4 py-3 text-red-400 font-medium">No — code goes dead</td>
                </tr>
                <tr className="bg-gray-950">
                  <td className="px-4 py-3 text-gray-400">Works offline</td>
                  <td className="px-4 py-3 text-emerald-400 font-medium">Yes</td>
                  <td className="px-4 py-3 text-gray-200">No — server required</td>
                </tr>
                <tr className="bg-gray-900">
                  <td className="px-4 py-3 text-gray-400">Account required</td>
                  <td className="px-4 py-3 text-gray-200">No</td>
                  <td className="px-4 py-3 text-gray-200">Yes</td>
                </tr>
                <tr className="bg-gray-950">
                  <td className="px-4 py-3 text-gray-400">Privacy</td>
                  <td className="px-4 py-3 text-emerald-400 font-medium">High — no tracking</td>
                  <td className="px-4 py-3 text-gray-200">Lower — scans logged by provider</td>
                </tr>
                <tr className="bg-gray-900">
                  <td className="px-4 py-3 text-gray-400">Depends on third party</td>
                  <td className="px-4 py-3 text-emerald-400 font-medium">No</td>
                  <td className="px-4 py-3 text-red-400 font-medium">Yes — provider must stay live</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* When to use each */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-white">When to use each type</h2>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-4">
            <h3 className="text-lg font-semibold text-emerald-400 mb-3">Use a static QR code when…</h3>
            <ul className="text-gray-300 space-y-2 text-sm leading-relaxed">
              <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> You&apos;re printing business cards, stickers, or flyers and want them to work indefinitely</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> You&apos;re sharing WiFi credentials at a venue, home, or office</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> You&apos;re adding a contact card (vCard) or phone number to printed materials</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> You&apos;re linking to a stable URL that won&apos;t change</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> You need it to work in areas with no cell service</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> You don&apos;t want a third party tracking your scans</li>
            </ul>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-indigo-400 mb-3">Use a dynamic QR code when…</h3>
            <ul className="text-gray-300 space-y-2 text-sm leading-relaxed">
              <li className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">→</span> You need to change the destination URL after printing a large batch</li>
              <li className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">→</span> You&apos;re running a marketing campaign where scan count and location data matters</li>
              <li className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">→</span> You&apos;re A/B testing landing pages by swapping destinations</li>
              <li className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">→</span> You&apos;re printing high-volume materials (menus, packaging) where reprinting is expensive</li>
            </ul>
          </div>
        </section>

        {/* The subscription trap */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">The problem with &ldquo;free&rdquo; dynamic QR codes</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            There&apos;s a frustrating pattern that&apos;s become common enough to go viral: someone generates a &ldquo;free&rdquo; QR code from a popular service, prints it on hundreds of menus, business cards, or event posters — and months or years later, the code silently stops working.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            What happened? The service changed their free tier, the account was inactive too long, or the company pivoted away from free offerings. Because the code was dynamic — routing through their servers — every printed copy became a dead link overnight.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            This isn&apos;t a rare edge case. Posts about this exact situation regularly surface on Reddit, X (Twitter), and small business forums. A restaurant owner discovers their menus all show a broken QR code. A nonprofit finds that thousands of printed brochures with donation links are now useless. An event organizer realizes their venue signs are dead.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            The root cause is almost always the same: <strong className="text-white">the user didn&apos;t know they were using a dynamic code</strong>. Many QR generators don&apos;t make this distinction clear — or they default to dynamic codes because it keeps users dependent on their platform.
          </p>
          <p className="text-gray-300 leading-relaxed">
            A static QR code has no such vulnerability. Once the image exists, it&apos;s independent of any service. The generator could shut down tomorrow and every static code ever generated would still work perfectly.
          </p>
        </section>

        {/* CTA */}
        <section className="mt-12 bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
          <h2 className="text-xl font-bold mb-3">Generate a free QR code that lasts forever</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            TrueQR generates static QR codes — permanent, free, no account required. We&apos;ll tell you exactly what you&apos;re getting before you click Generate.
          </p>
          <a
            href="/"
            className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            Generate your free QR code →
          </a>
          <p className="text-gray-600 text-xs mt-4">
            No account. No expiration. No tricks.
          </p>
        </section>

      </article>
      <Footer />
    </main>
  );
}
