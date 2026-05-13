import Footer from '@/components/Footer';

export const metadata = {
  title: 'QR Code for Google Reviews: Get More Reviews With One Scan — TrueQR',
  description:
    'A Google review QR code lets customers leave a review in seconds. Generate a free, permanent QR code that links directly to your Google review page.',
  openGraph: {
    title: 'QR Code for Google Reviews: Get More Reviews With One Scan',
    description:
      'Make it effortless for customers to leave Google reviews. Generate a free QR code that opens your review page directly. No account, no expiry.',
    type: 'article',
    url: 'https://trueqr.co/blog/qr-code-google-review',
  },
};

export default function QRCodeGoogleReviewPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <article className="max-w-2xl mx-auto px-4 pt-16 pb-20">

        <nav className="text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-gray-400 transition-colors">TrueQR</a>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Blog</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">QR Code for Google Reviews</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            QR Code for Google Reviews: Make It Effortless for Customers to Leave a Review
          </h1>
          <p className="text-gray-400 text-lg">
            Most happy customers won&apos;t leave a review — not because they don&apos;t want to, but because it&apos;s too much friction. A QR code removes that friction.
          </p>
        </header>

        <div className="prose prose-invert prose-gray max-w-none space-y-6 text-gray-300 leading-relaxed">

          <p>
            Google reviews are one of the most powerful drivers of local business visibility. A higher star rating and more review count directly impacts how high you appear in Google Maps results and local search. Yet most businesses struggle to collect reviews consistently — not because customers are unhappy, but because asking for a review creates awkward friction that most people don&apos;t follow through on.
          </p>
          <p>
            A QR code that opens your Google review page directly solves this. Customer scans → Google review form opens immediately. That&apos;s the whole flow.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">How to find your Google review link</h2>
          <p>
            Before you can create a QR code, you need your direct Google review URL. Here&apos;s how to get it:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Go to <a href="https://business.google.com" className="text-indigo-400 hover:text-indigo-300 underline" target="_blank" rel="noopener noreferrer">Google Business Profile</a> and log in</li>
            <li>Select your business</li>
            <li>In the left menu, click <strong className="text-white">Home</strong></li>
            <li>Find the &quot;Get more reviews&quot; card and click <strong className="text-white">Share review form</strong></li>
            <li>Copy the short link — it looks like <code className="text-indigo-400 bg-gray-900 px-1 rounded text-xs">g.page/r/[your-id]/review</code></li>
          </ol>
          <p>
            That link, when opened on a phone, goes directly to the Google review dialog for your business. That&apos;s exactly what you want to encode in your QR code.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">How to create the QR code</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Go to <a href="/" className="text-indigo-400 hover:text-indigo-300 underline">trueqr.co</a></li>
            <li>Select <strong className="text-white">URL</strong></li>
            <li>Paste your Google review link</li>
            <li>Optionally customize the color to match your brand</li>
            <li>Download as PNG</li>
          </ol>
          <p>No account required. The code is permanent and will never expire.</p>

          <h2 className="text-xl font-semibold text-white mt-8">Where to place your Google review QR code</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Receipt or checkout area:</strong> The moment right after a transaction is when a happy customer is most likely to leave a review. A small sign or printed card at checkout — &quot;Enjoyed your visit? Scan to leave a Google review&quot; — captures that moment.</li>
            <li><strong className="text-white">Table cards or placemats:</strong> For restaurants, a small tent card on every table keeps the ask passive and non-pushy.</li>
            <li><strong className="text-white">Business cards:</strong> Especially for service businesses (plumbers, electricians, cleaners) where you want to stay top of mind after the job is done.</li>
            <li><strong className="text-white">Thank-you cards or packaging inserts:</strong> E-commerce or product businesses can include a printed card asking for a review.</li>
            <li><strong className="text-white">Signage near the exit:</strong> A well-placed sign as customers leave — when they&apos;re still in the positive experience mindset.</li>
            <li><strong className="text-white">Email signatures and follow-up emails:</strong> Add the QR code image to post-purchase emails or service confirmation follow-ups.</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8">Tips for getting more Google reviews</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Add context:</strong> Always include a short prompt next to the QR code — &quot;Scan to leave a Google review&quot; or &quot;We&apos;d love your feedback&quot;. People need to know what they&apos;re scanning before they scan it.</li>
            <li><strong className="text-white">Ask at the right moment:</strong> The ideal moment is immediately after a positive interaction — after a great meal, after a service is completed, after they tell you they&apos;re happy. The QR code just makes the ask frictionless.</li>
            <li><strong className="text-white">Don&apos;t incentivize reviews:</strong> Google&apos;s policies prohibit offering rewards for reviews. Just make the process easy.</li>
            <li><strong className="text-white">Respond to reviews:</strong> Businesses that respond to reviews (especially negative ones) tend to accumulate more over time. It signals to customers that their feedback matters.</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8">Will this QR code expire?</h2>
          <p>
            No. TrueQR generates static QR codes — the URL is encoded directly in the image, with no redirect server involved. As long as your Google review link stays the same (it does, unless you change your Google Business Profile), the QR code will work permanently.
          </p>
          <p>
            This matters more than it seems. Some QR generators create &quot;free&quot; codes that stop working after a trial or after a set number of scans. If you&apos;ve printed table cards or signage, discovering your codes are dead is a real operational headache. TrueQR static codes have no expiry — ever.
          </p>

          <div className="mt-12 p-6 bg-gray-900 rounded-xl border border-gray-800 text-center">
            <p className="text-white font-semibold text-lg mb-2">Create your Google review QR code — free</p>
            <p className="text-gray-400 mb-4 text-sm">No account. Permanent. Takes about 20 seconds.</p>
            <a
              href="/"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Generate QR Code →
            </a>
          </div>

        </div>
      </article>
      <Footer />
    </main>
  );
}
