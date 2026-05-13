import Footer from '@/components/Footer';

export const metadata = {
  title: 'QR Code for Flyer: Add a Scannable Link to Any Printed Flyer — TrueQR',
  description:
    'Adding a QR code to your flyer turns a static printout into an interactive experience. Generate a free, permanent QR code for your flyer in seconds — no account required.',
  openGraph: {
    title: 'QR Code for Flyer: Add a Scannable Link to Any Printed Flyer',
    description:
      'Generate a free QR code for your flyer. No account, no expiry, no watermark. Works forever — even after you print.',
    type: 'article',
    url: 'https://trueqr.co/blog/qr-code-for-flyer',
  },
};

export default function QRCodeForFlyerPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <article className="max-w-2xl mx-auto px-4 pt-16 pb-20">

        <nav className="text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-gray-400 transition-colors">TrueQR</a>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Blog</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">QR Code for Flyer</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            QR Code for Flyer: Turn Printed Paper Into a Live Link
          </h1>
          <p className="text-gray-400 text-lg">
            A QR code bridges the gap between your printed flyer and the digital world. Here&apos;s how to add one that actually works — permanently.
          </p>
        </header>

        <div className="prose prose-invert prose-gray max-w-none space-y-6 text-gray-300 leading-relaxed">

          <p>
            You&apos;ve designed the perfect flyer. It has your logo, the event details, the contact info. But there&apos;s one problem: paper can&apos;t hold everything. A QR code solves that — it gives anyone with a smartphone an instant link to your website, event registration, menu, social profile, or anything else you need them to reach.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">Why add a QR code to a flyer?</h2>
          <p>
            Printed flyers have limited space. A QR code is a pressure release valve — it extends your flyer digitally without cluttering the design. Common use cases:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Event flyers linking to registration or ticket purchase</li>
            <li>Business flyers linking to a website, menu, or booking page</li>
            <li>Real estate flyers linking to a virtual tour or listing</li>
            <li>Band or artist flyers linking to Spotify, YouTube, or a show page</li>
            <li>Non-profit flyers linking to a donation page</li>
            <li>Job postings linking to an application form</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8">The most important thing about a QR code on a flyer</h2>
          <p>
            Once it&apos;s printed, it&apos;s permanent. You can&apos;t go back and fix a broken link. This is why it&apos;s critical to use a QR code that <strong className="text-white">won&apos;t expire</strong>.
          </p>
          <p>
            Many free QR code generators create codes that stop working after a trial period ends or if you don&apos;t upgrade to a paid plan. You print 200 flyers, hand them all out, and six months later every scan leads to an error page. That&apos;s a real problem — and it&apos;s surprisingly common.
          </p>
          <p>
            TrueQR generates <strong className="text-white">static QR codes</strong> that are permanent by design. The destination URL is encoded directly into the QR code image itself. There&apos;s no middleman server, no redirect, and nothing to expire. The code works as long as your destination URL works — full stop.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">How to generate a QR code for your flyer</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Go to <a href="/" className="text-indigo-400 hover:text-indigo-300 underline">trueqr.co</a></li>
            <li>Select the <strong className="text-white">URL</strong> type and paste your link</li>
            <li>Customize the color to match your flyer&apos;s branding (optional)</li>
            <li>Upload your logo to embed it in the center of the code (optional)</li>
            <li>Set a size — for print, 300px or higher is recommended</li>
            <li>Download as PNG and drop it into your flyer design</li>
          </ol>
          <p>No account required. Takes about 15 seconds.</p>

          <h2 className="text-xl font-semibold text-white mt-8">Design tips for flyer QR codes</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Size matters:</strong> Print your QR code at least 1 inch × 1 inch (2.5cm). Smaller codes are harder to scan, especially in low light.</li>
            <li><strong className="text-white">Contrast is critical:</strong> Dark code on a light background scans best. Avoid placing the QR on a busy or dark-colored area of your flyer.</li>
            <li><strong className="text-white">Add a call to action:</strong> Put a short line of text under the QR code — "Scan to register" or "Scan for our menu." People are more likely to scan when they know what they&apos;ll get.</li>
            <li><strong className="text-white">Test before printing:</strong> Scan your code from the screen before sending to the printer. Check that it goes to exactly the right page on mobile.</li>
            <li><strong className="text-white">Keep whitespace around it:</strong> Don&apos;t crowd the QR code with other design elements. Give it breathing room so scanners can detect the finder patterns in the corners.</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8">Static vs. dynamic QR codes for flyers</h2>
          <p>
            A <strong className="text-white">static QR code</strong> encodes the URL permanently. It&apos;s free, reliable, and works forever. The tradeoff: you can&apos;t change the destination after printing.
          </p>
          <p>
            A <strong className="text-white">dynamic QR code</strong> points to a redirect link that you can update at any time. This is useful if you&apos;re printing flyers for a recurring event, or if your destination URL might change. Dynamic codes also come with scan analytics — you can see how many people scanned, when, and where.
          </p>
          <p>
            For most flyers, static is the right choice. If you&apos;re running ongoing campaigns or need to update the destination without reprinting, consider TrueQR&apos;s Pro plan which includes dynamic codes.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">What file format should I use?</h2>
          <p>
            TrueQR exports QR codes as PNG. For print, PNG at 300px or larger is clean and sharp. If your design software supports it, use the highest resolution available. PNG with a transparent background also works well when your flyer has a non-white background.
          </p>

          <div className="mt-12 p-6 bg-gray-900 rounded-xl border border-gray-800 text-center">
            <p className="text-white font-semibold text-lg mb-2">Generate your flyer QR code — free, forever</p>
            <p className="text-gray-400 mb-4 text-sm">No account. No expiry. Download in seconds.</p>
            <a
              href="/"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Create QR Code →
            </a>
          </div>

        </div>
      </article>
      <Footer />
    </main>
  );
}
