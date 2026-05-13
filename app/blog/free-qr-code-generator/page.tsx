import Footer from '@/components/Footer';

export const metadata = {
  title: 'Free QR Code Generator — No Account, No Expiry, No Catch | TrueQR',
  description:
    'TrueQR is a free QR code generator that creates static codes for URLs, WiFi, vCard, email, phone, and text. No account required. Codes never expire. Here\'s everything you need to know.',
  openGraph: {
    title: 'Free QR Code Generator — No Account, No Expiry, No Catch',
    description:
      'Generate free QR codes for URLs, WiFi, contacts, email, phone, and text. Static codes that last forever. No account, no watermark, no subscription.',
    type: 'article',
    url: 'https://trueqr.co/blog/free-qr-code-generator',
  },
};

export default function FreeQRCodeGeneratorPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <article className="max-w-2xl mx-auto px-4 pt-16 pb-20">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-gray-400 transition-colors">TrueQR</a>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Blog</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Free QR Code Generator</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight">
            Free QR Code Generator: Everything You Need to Know (No Account, No Expiry, No Catch)
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            There are dozens of &ldquo;free&rdquo; QR code generators online. Most of them are free in name only — they watermark your codes, expire them after 30 days, or require a subscription to actually download. This guide explains what a genuinely free QR code generator looks like, what types it should support, and why your codes should never expire.
          </p>
        </header>

        {/* What makes it genuinely free */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">What &ldquo;free&rdquo; actually means for a QR code generator</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Generating a QR code is computationally trivial. The algorithm that converts text into a black-and-white grid runs entirely in a browser in milliseconds. There is no meaningful cost to generating a QR code — which means any tool that charges you for it, requires an account to access it, or expires your code after a time limit is doing so by design, not necessity.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            A genuinely free QR code generator:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 pl-2">
            <li><strong className="text-white">Requires no account or sign-up</strong> — you enter data, you get a code, you download it</li>
            <li><strong className="text-white">Adds no watermark</strong> to the downloaded image</li>
            <li><strong className="text-white">Has no code limit</strong> — generate as many as you need</li>
            <li><strong className="text-white">Never expires your codes</strong> — more on this below</li>
            <li><strong className="text-white">Doesn&apos;t require a subscription</strong> to unlock &ldquo;basic&rdquo; features</li>
          </ul>
          <p className="text-gray-300 leading-relaxed">
            TrueQR meets all of these. It generates static QR codes entirely in your browser — your data never leaves your device — and the downloaded PNG is yours to use however you like, forever.
          </p>
        </section>

        {/* The expiry fear */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">Do free QR codes expire? (Addressing the fear directly)</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            This question gets asked constantly — and for good reason. Many people have been burned by QR codes that stopped working. The honest answer is: <strong className="text-white">it depends entirely on whether the code is static or dynamic.</strong>
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            <strong className="text-white">Static QR codes never expire.</strong> The data is encoded directly into the image. There&apos;s no server involved. The code will work as long as the image exists and as long as QR code readers exist — which is to say, indefinitely. A static QR code generated today will still work in 2035.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            <strong className="text-white">Dynamic QR codes can and do expire.</strong> They encode a redirect URL that routes through the QR generator&apos;s server. When a free plan is discontinued, when you stop paying, or when the company shuts down, every dynamic code you&apos;ve ever generated becomes a dead link overnight. This is documented in hundreds of forum posts, Reddit threads, and small business horror stories.
          </p>
          <p className="text-gray-300 leading-relaxed">
            The safest answer: use a static QR code generator (like TrueQR) for anything you&apos;re printing or distributing. Static codes are permanent by design.
          </p>
        </section>

        {/* QR types */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">QR code types: what you can encode</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            A good free QR code generator should handle all the common data types. Here&apos;s what TrueQR supports and when each type is useful:
          </p>

          <div className="space-y-4">
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h3 className="text-base font-semibold text-emerald-400 mb-2">🔗 URL</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                The most common type. Encode any website link — your homepage, a landing page, a product page, a YouTube video, a Google Maps location. The phone opens the URL directly in the browser. Keep URLs short for simpler, cleaner codes.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h3 className="text-base font-semibold text-emerald-400 mb-2">📶 WiFi</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Encode your WiFi network name, password, and security type (WPA2/WPA3/open). Guests scan and connect in one tap — no password to type. Perfect for homes, cafés, offices, and rental properties.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h3 className="text-base font-semibold text-emerald-400 mb-2">👤 vCard (contact)</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Encodes a full digital contact card — name, phone, email, company, title, website, address. When scanned, the phone offers to save the contact. The best QR code type for business cards: one scan and you&apos;re in their address book.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h3 className="text-base font-semibold text-emerald-400 mb-2">✉️ Email</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Opens a pre-addressed email draft. You can pre-fill the recipient address, subject line, and even body text. Great for feedback forms, support requests, or event RSVPs where you want to reduce friction to zero.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h3 className="text-base font-semibold text-emerald-400 mb-2">📞 Phone</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Encodes a phone number as a <code className="bg-gray-800 px-1 rounded text-xs">tel:</code> link. Scanning it prompts the phone to call that number directly. Useful on flyers, storefronts, or anywhere a tap-to-call is the primary action.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h3 className="text-base font-semibold text-emerald-400 mb-2">📝 Plain Text</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Encodes any text string directly. The phone displays it as plain text on scan — useful for instructions, event codes, coupon codes, serial numbers, or any information you want to share without launching an app or browser.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison vs competitors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">TrueQR vs. other free QR code generators</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Not all &ldquo;free&rdquo; QR generators are created equal. Here&apos;s how TrueQR compares to the most popular alternatives:
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-900 border-b border-gray-800">
                  <th className="px-4 py-3 font-semibold text-gray-400">Feature</th>
                  <th className="px-4 py-3 font-semibold text-emerald-400">TrueQR</th>
                  <th className="px-4 py-3 font-semibold text-gray-400">QRCode Monkey</th>
                  <th className="px-4 py-3 font-semibold text-gray-400">QR Tiger</th>
                  <th className="px-4 py-3 font-semibold text-gray-400">Bitly QR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="bg-gray-950">
                  <td className="px-4 py-3 text-gray-400">Account required</td>
                  <td className="px-4 py-3 text-emerald-400 font-medium">No</td>
                  <td className="px-4 py-3 text-gray-300">No</td>
                  <td className="px-4 py-3 text-gray-300">Yes (free tier)</td>
                  <td className="px-4 py-3 text-gray-300">Yes</td>
                </tr>
                <tr className="bg-gray-900">
                  <td className="px-4 py-3 text-gray-400">Codes expire</td>
                  <td className="px-4 py-3 text-emerald-400 font-medium">Never</td>
                  <td className="px-4 py-3 text-gray-300">Static: never</td>
                  <td className="px-4 py-3 text-yellow-400">Dynamic: yes</td>
                  <td className="px-4 py-3 text-yellow-400">Dynamic: yes</td>
                </tr>
                <tr className="bg-gray-950">
                  <td className="px-4 py-3 text-gray-400">Code type</td>
                  <td className="px-4 py-3 text-emerald-400 font-medium">Static only</td>
                  <td className="px-4 py-3 text-gray-300">Static + dynamic</td>
                  <td className="px-4 py-3 text-gray-300">Static + dynamic</td>
                  <td className="px-4 py-3 text-gray-300">Dynamic primary</td>
                </tr>
                <tr className="bg-gray-900">
                  <td className="px-4 py-3 text-gray-400">Watermark</td>
                  <td className="px-4 py-3 text-emerald-400 font-medium">None</td>
                  <td className="px-4 py-3 text-gray-300">None</td>
                  <td className="px-4 py-3 text-yellow-400">On free tier</td>
                  <td className="px-4 py-3 text-gray-300">None</td>
                </tr>
                <tr className="bg-gray-950">
                  <td className="px-4 py-3 text-gray-400">Data privacy</td>
                  <td className="px-4 py-3 text-emerald-400 font-medium">Browser-only, no server</td>
                  <td className="px-4 py-3 text-gray-300">Server-side</td>
                  <td className="px-4 py-3 text-gray-300">Server-side</td>
                  <td className="px-4 py-3 text-gray-300">Server-side</td>
                </tr>
                <tr className="bg-gray-900">
                  <td className="px-4 py-3 text-gray-400">Scan analytics</td>
                  <td className="px-4 py-3 text-gray-300">No</td>
                  <td className="px-4 py-3 text-gray-300">No (static)</td>
                  <td className="px-4 py-3 text-gray-300">Yes (paid)</td>
                  <td className="px-4 py-3 text-gray-300">Yes (paid)</td>
                </tr>
                <tr className="bg-gray-950">
                  <td className="px-4 py-3 text-gray-400">Price</td>
                  <td className="px-4 py-3 text-emerald-400 font-medium">Free</td>
                  <td className="px-4 py-3 text-gray-300">Free / paid</td>
                  <td className="px-4 py-3 text-gray-300">Free / $7–$35/mo</td>
                  <td className="px-4 py-3 text-gray-300">Free / $8–$29/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-xs mt-3">
            Pricing and features as of 2025. Competitor plans change frequently — verify on their sites.
          </p>
        </section>

        {/* Privacy */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">Privacy: your data stays in your browser</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Most online QR code generators send your input to a server to generate the code. That means the service has a log of every URL, WiFi password, and contact card you&apos;ve ever generated with it.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            TrueQR generates everything client-side, in your browser, using JavaScript. Your data never leaves your device. There&apos;s no server receiving your WiFi password or the URL you&apos;re encoding. The generated PNG is created locally and downloaded directly from your browser.
          </p>
          <p className="text-gray-300 leading-relaxed">
            For sensitive content — WiFi credentials, personal contact information, private URLs — this distinction matters. You shouldn&apos;t have to trust a third-party server with your data just to generate a QR code.
          </p>
        </section>

        {/* When to use static vs dynamic */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">When does a free static generator cover your needs?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            The honest answer: for the vast majority of use cases, a static QR code is everything you need.
          </p>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-4">
            <h3 className="text-base font-semibold text-emerald-400 mb-3">Static codes are right for you if…</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> You&apos;re printing business cards, flyers, signs, or packaging</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> You&apos;re sharing WiFi at home, a café, or an office</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> You want codes that work without any ongoing cost or dependency</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> You don&apos;t need scan analytics</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> The URL or data you&apos;re encoding is stable</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> You care about privacy and don&apos;t want your data on a third-party server</li>
            </ul>
          </div>

          <p className="text-gray-300 leading-relaxed">
            Dynamic codes make sense for large print runs where changing the destination after printing would be worth a monthly subscription, or for high-stakes marketing campaigns where scan analytics matter. For everything else, static codes are simpler, free, and permanent.
          </p>
        </section>

        {/* How to generate */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">How to generate a free QR code with TrueQR</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            The process takes under a minute:
          </p>
          <ol className="list-decimal list-inside text-gray-300 space-y-3 pl-2">
            <li className="leading-relaxed"><strong className="text-white">Choose your QR type</strong> — URL, WiFi, vCard, Email, Phone, or Text.</li>
            <li className="leading-relaxed"><strong className="text-white">Enter your data</strong> — fill in the relevant fields. For WiFi, that&apos;s network name, password, and security type. For vCard, it&apos;s your contact details. For URL, it&apos;s just the link.</li>
            <li className="leading-relaxed"><strong className="text-white">Preview and generate</strong> — the QR code renders live in your browser. No account needed.</li>
            <li className="leading-relaxed"><strong className="text-white">Download the PNG</strong> — print it, embed it in a design, or share it digitally. The file is yours, no strings attached.</li>
          </ol>
          <p className="text-gray-300 leading-relaxed mt-4">
            For best print results, print at 300 DPI or higher and keep the QR code at least 1 inch square. Test with a phone before committing to a print run.
          </p>
        </section>

        {/* CTA */}
        <section className="mt-12 bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
          <h2 className="text-xl font-bold mb-3">Generate your free QR code now</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            URL, WiFi, vCard, email, phone, or text. Static codes that last forever. No account, no watermark, no subscription. Generated in your browser — your data stays private.
          </p>
          <a
            href="/"
            className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            Open TrueQR — it&apos;s free →
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
