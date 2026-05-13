import Footer from '@/components/Footer';

export const metadata = {
  title: 'QR Code for Business Card: The Right Way to Do It — TrueQR',
  description:
    'Adding a QR code to your business card is one of the highest-ROI upgrades you can make. Here\'s what to encode, what size to print, and why static codes are the only safe choice for print.',
  openGraph: {
    title: 'QR Code for Business Card: The Right Way to Do It',
    description:
      'A QR code on your business card can link to your portfolio, LinkedIn, vCard, or website — permanently and for free. Learn how to do it right.',
    type: 'article',
    url: 'https://trueqr.co/blog/qr-code-for-business-card',
  },
};

export default function QRCodeForBusinessCardPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <article className="max-w-2xl mx-auto px-4 pt-16 pb-20">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-gray-400 transition-colors">TrueQR</a>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Blog</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">QR Code for Business Card</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight">
            QR Code for Business Card: What to Encode, What Size to Print, and How to Make It Last
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            A QR code turns a static piece of cardstock into a living connection. Done right, it&apos;s one of the best upgrades you can make to a business card. Done wrong, you&apos;re handing someone a broken link in six months.
          </p>
        </header>

        {/* Why bother */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">Why add a QR code to your business card?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Business cards are limited to a few square inches of space. A QR code instantly expands what that card can communicate. Instead of squeezing your LinkedIn URL, portfolio address, and phone number onto crowded cardstock, you encode a single QR code that takes someone directly where you want them.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            More practically: people remember to scan a QR code more reliably than they remember to type a URL later. The friction between &ldquo;I have their card&rdquo; and &ldquo;I visited their site&rdquo; drops to zero when scanning is one tap away.
          </p>
          <p className="text-gray-300 leading-relaxed">
            The use case is straightforward — but there are a few things worth getting right before you send cards to the printer.
          </p>
        </section>

        {/* What to encode */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">What should you encode in your business card QR code?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            You have several good options depending on what you want the person to do after they scan.
          </p>

          <div className="space-y-4 mb-4">
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h3 className="text-base font-semibold text-emerald-400 mb-2">vCard (contact card)</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                The highest-value option. A vCard QR code lets someone add your full contact info — name, phone, email, company, website — to their phone&apos;s address book in a single tap. No typing. No transcription errors. This is the most useful thing a business card QR code can do.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h3 className="text-base font-semibold text-emerald-400 mb-2">Website or portfolio URL</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                If your work speaks for itself — freelancers, designers, photographers, developers — link directly to your portfolio or personal site. Make sure the URL is stable and the page is mobile-optimized, since most scans happen on a phone.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h3 className="text-base font-semibold text-emerald-400 mb-2">LinkedIn profile</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Common in professional and corporate contexts. Encoding your LinkedIn URL (use your vanity URL, not a long auto-generated one) means the person can connect with you immediately — before they&apos;ve even put the card in their pocket.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h3 className="text-base font-semibold text-emerald-400 mb-2">Phone number</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Encoding a <code className="bg-gray-800 px-1 rounded text-xs">tel:</code> link (e.g. <code className="bg-gray-800 px-1 rounded text-xs">tel:+15551234567</code>) lets someone tap-to-call directly from the scan. Useful if your primary call-to-action is a phone call rather than a website visit.
              </p>
            </div>
          </div>
        </section>

        {/* Print specs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">Size and placement on a business card</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            QR codes have a minimum printable size below which scanners struggle — especially in poor lighting or with minor print quality variation. For business cards, follow these guidelines:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 pl-2">
            <li><strong className="text-white">Minimum size:</strong> 0.8 × 0.8 inches (about 2 cm²). Smaller than this and some phones will fail to scan reliably.</li>
            <li><strong className="text-white">Recommended size:</strong> 1 × 1 inch. Gives scanners enough pixels to read quickly and cleanly.</li>
            <li><strong className="text-white">Resolution:</strong> Export at 300 DPI minimum. Most QR generators (including TrueQR) export PNG — ask your printer if they need SVG for better scaling.</li>
            <li><strong className="text-white">Quiet zone:</strong> Leave a clear white border around the QR code equal to at least 4 modules (the smallest square in the grid). Don&apos;t let design elements bleed into this border.</li>
            <li><strong className="text-white">Contrast:</strong> Dark code on a light background is safest. Colored QR codes can work but test scan reliability before committing to a full print run.</li>
          </ul>
          <p className="text-gray-300 leading-relaxed">
            Placement is typically the back of the card, bottom-right or bottom-center. If you&apos;re putting it on the front, keep it away from your name and title — it shouldn&apos;t compete visually with the most important information.
          </p>
        </section>

        {/* Static vs dynamic warning */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">The one mistake that kills business card QR codes</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            The single most common failure mode: using a <strong className="text-white">dynamic QR code</strong> — one that routes through a third-party server — on printed materials.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            Dynamic codes are sold as a feature (&ldquo;change the destination anytime!&rdquo;), but for a business card they introduce a critical vulnerability. If the service changes their free tier, your account goes inactive, or the company shuts down, every card you&apos;ve ever handed out now has a broken QR code.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            This happens. It&apos;s documented in hundreds of forum posts. A restaurant owner&apos;s menu QR codes die overnight. A consultant finds their cards from a conference six months ago all point to a dead redirect.
          </p>
          <p className="text-gray-300 leading-relaxed">
            A <strong className="text-white">static QR code</strong> encodes your destination directly into the image — no server, no subscription, no dependency. The code you print today will still work in 10 years. For anything you&apos;re printing, static is the only safe choice.
          </p>
        </section>

        {/* Testing */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">Always test before printing</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Before you send your design to the printer, test the QR code with at least two different devices — an iPhone and an Android phone if possible. Scan it:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-2">
            <li>From a printed proof (not just a screen)</li>
            <li>In normal room lighting</li>
            <li>At an angle (cards get held at all angles)</li>
            <li>With the native camera app, not a third-party scanner</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4">
            If any of these fail, you likely need to increase size, improve contrast, or simplify the encoded content (shorter URLs create simpler, easier-to-scan codes).
          </p>
        </section>

        {/* CTA */}
        <section className="mt-12 bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
          <h2 className="text-xl font-bold mb-3">Generate a QR code for your business card — free</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            TrueQR generates static QR codes for URLs, vCards, phone numbers, email, and more. No account required. No expiration. Download as PNG and send straight to your printer.
          </p>
          <a
            href="/"
            className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            Create your business card QR code →
          </a>
          <p className="text-gray-600 text-xs mt-4">
            Static. Permanent. Free.
          </p>
        </section>

      </article>
      <Footer />
    </main>
  );
}
