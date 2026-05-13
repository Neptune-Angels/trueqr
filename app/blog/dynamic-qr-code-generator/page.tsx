import Footer from '@/components/Footer';

export const metadata = {
  title: 'Dynamic QR Code Generator: Edit Your Destination After Printing — TrueQR',
  description:
    'Dynamic QR codes let you change where the code points without reprinting. Get scan analytics too. Start free, upgrade to Pro for dynamic codes on TrueQR.',
  openGraph: {
    title: 'Dynamic QR Code Generator: Edit Your Destination After Printing',
    description:
      'Dynamic QR codes are editable after printing. Change the destination URL, track scans, and update campaigns on the fly. Available on TrueQR Pro.',
    type: 'article',
    url: 'https://trueqr.co/blog/dynamic-qr-code-generator',
  },
};

export default function DynamicQRCodeGeneratorPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <article className="max-w-2xl mx-auto px-4 pt-16 pb-20">

        <nav className="text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-gray-400 transition-colors">TrueQR</a>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Blog</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Dynamic QR Code Generator</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Dynamic QR Code Generator: Change the Destination Without Reprinting
          </h1>
          <p className="text-gray-400 text-lg">
            A dynamic QR code separates the physical code from the destination URL — so you can update where it points any time, even after the materials are printed.
          </p>
        </header>

        <div className="prose prose-invert prose-gray max-w-none space-y-6 text-gray-300 leading-relaxed">

          <p>
            Most QR codes are static — the destination is baked into the image permanently. That&apos;s fine for many use cases. But if your URL might change, or if you want analytics on how many people scanned, you need a <strong className="text-white">dynamic QR code</strong>.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">How dynamic QR codes work</h2>
          <p>
            A dynamic QR code doesn&apos;t encode your destination URL directly. Instead, it encodes a short redirect URL — something like <code className="text-indigo-400 bg-gray-900 px-1 rounded text-xs">trueqr.co/r/abc123</code>. When someone scans the code, they hit that redirect, which instantly forwards them to your actual destination.
          </p>
          <p>
            Because the redirect is controlled by your TrueQR account, you can log in and change the destination at any time — without changing or reprinting the QR code itself. The printed image stays the same; only the destination changes.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">When to use a dynamic QR code</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Restaurant menus:</strong> Point to a PDF or web menu. Update seasonal items without reprinting table cards.</li>
            <li><strong className="text-white">Marketing campaigns:</strong> Reuse the same printed materials across multiple campaigns by swapping the destination.</li>
            <li><strong className="text-white">Product packaging:</strong> Link to support docs, tutorials, or promotions that change over time.</li>
            <li><strong className="text-white">Event signage:</strong> Use the same QR code across recurring events, updating the registration or schedule link each time.</li>
            <li><strong className="text-white">Business cards:</strong> If your website URL, booking link, or portfolio changes, update it without reprinting cards.</li>
            <li><strong className="text-white">A/B testing:</strong> Switch the destination URL to test which landing page converts better from the same physical placement.</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8">Dynamic QR codes vs. static QR codes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-4">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-2 pr-4 text-gray-400 font-medium"></th>
                  <th className="text-left py-2 pr-4 text-white font-medium">Static</th>
                  <th className="text-left py-2 text-white font-medium">Dynamic</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-gray-900"><td className="py-2 pr-4">Cost</td><td className="py-2 pr-4 text-green-400">Free</td><td className="py-2 text-indigo-400">Pro ($12/mo)</td></tr>
                <tr className="border-b border-gray-900"><td className="py-2 pr-4">Editable after printing</td><td className="py-2 pr-4">✗</td><td className="py-2 text-green-400">✓</td></tr>
                <tr className="border-b border-gray-900"><td className="py-2 pr-4">Scan analytics</td><td className="py-2 pr-4">✗</td><td className="py-2 text-green-400">✓</td></tr>
                <tr className="border-b border-gray-900"><td className="py-2 pr-4">Works without account</td><td className="py-2 pr-4 text-green-400">✓</td><td className="py-2">✗ (account required)</td></tr>
                <tr className="border-b border-gray-900"><td className="py-2 pr-4">Requires redirect server</td><td className="py-2 pr-4">✗</td><td className="py-2">✓</td></tr>
                <tr><td className="py-2 pr-4">Best for</td><td className="py-2 pr-4">One-time use, permanent links</td><td className="py-2">Campaigns, menus, long-term materials</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-semibold text-white mt-8">Scan analytics: what you can track</h2>
          <p>
            Every scan of a dynamic QR code is logged. TrueQR Pro shows you:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Total scan count (all time and by date range)</li>
            <li>Scan timeline — see spikes after a campaign launch</li>
            <li>Geographic distribution by country</li>
          </ul>
          <p>
            This data helps you understand which physical placements are generating the most engagement — so you can make informed decisions about where to invest in printed materials.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">How TrueQR handles dynamic QR code pricing honestly</h2>
          <p>
            Some QR code generators create &quot;free&quot; dynamic codes that expire after 30 days or after a set number of scans. We think that&apos;s a bad deal — especially for anyone who&apos;s already printed materials and is depending on the codes to work.
          </p>
          <p>
            TrueQR&apos;s dynamic codes are part of the Pro plan at <strong className="text-white">$12/month</strong>. They don&apos;t expire, don&apos;t have scan limits, and don&apos;t get switched off if you downgrade (your codes will stop redirecting, but you&apos;ll get a clear warning before that happens). Static QR codes remain free forever — no account needed.
          </p>

          <div className="mt-12 p-6 bg-gray-900 rounded-xl border border-gray-800 text-center">
            <p className="text-white font-semibold text-lg mb-2">Ready for dynamic QR codes?</p>
            <p className="text-gray-400 mb-4 text-sm">Pro plan — $12/mo. Editable codes, scan analytics, bulk generation.</p>
            <a
              href="/pricing"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors mr-3"
            >
              See Pricing →
            </a>
            <a
              href="/"
              className="inline-block bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Try Free Static Codes
            </a>
          </div>

        </div>
      </article>
      <Footer />
    </main>
  );
}
