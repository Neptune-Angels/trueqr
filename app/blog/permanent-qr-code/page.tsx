import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Permanent QR Code: How to Make a QR Code That Never Expires | TrueQR',
  description: 'Learn how to create a permanent QR code that never expires or breaks — even if you cancel a subscription. Static QR codes are free and last forever.',
  openGraph: {
    title: 'Permanent QR Code That Never Expires | TrueQR',
    description: 'How to create a permanent QR code that works forever — no subscription, no expiration.',
  },
};

export default function PermanentQRPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto px-4 py-16 w-full">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Permanent QR Code</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6 leading-tight">
          How to Make a Permanent QR Code That Never Expires
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          QR codes printed on business cards, signs, and menus need to work years from now. Here's how to make one that actually will.
        </p>

        <h2 className="text-2xl font-semibold mb-4">The QR code expiration problem</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Thousands of businesses have printed QR codes that are now dead. It happens every day — someone signs up for a "free" QR code service, uses it on menus or business cards, then the service shuts down, raises prices, or the trial ends.
        </p>
        <p className="text-gray-300 leading-relaxed mb-8">
          When the service goes away, so does the redirect. Customers scan a QR code on a printed sign and get an error page. The business has no idea because they stopped paying attention to a QR code they printed months ago.
        </p>

        <div className="bg-amber-950/50 border border-amber-700 rounded-xl p-6 mb-8">
          <h3 className="text-amber-400 font-semibold mb-2">⚠️ This happens more than you think</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            In 2022, Flowcode and several other QR services changed their free tier policies, breaking thousands of QR codes overnight. Users who had printed materials with those codes had no recourse — the codes were simply dead.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Why static QR codes are permanent</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          A <strong className="text-white">static QR code</strong> encodes your destination directly into the pattern. There's no middleman server. When someone scans it, their phone reads the URL straight from the image and opens it.
        </p>
        <p className="text-gray-300 leading-relaxed mb-8">
          This means the code works regardless of what happens to the company that generated it. It works offline. It works in 10 years. It works on a printed flyer found at the bottom of a drawer.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Static vs. dynamic: which is permanent?</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="text-left px-4 py-3 text-gray-300 font-medium">Feature</th>
                <th className="text-left px-4 py-3 text-emerald-400 font-medium">Static (free)</th>
                <th className="text-left px-4 py-3 text-gray-400 font-medium">Dynamic (paid)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[
                ['Expires?', 'Never', 'When subscription ends'],
                ['Requires subscription?', 'No', 'Yes'],
                ['Works offline?', 'Yes', 'No'],
                ['Editable after printing?', 'No', 'Yes'],
                ['Scan analytics?', 'No', 'Yes'],
                ['Cost', 'Free forever', '$5–30/month'],
              ].map(([feature, stat, dyn]) => (
                <tr key={feature} className="hover:bg-gray-900/50">
                  <td className="px-4 py-3 text-gray-300">{feature}</td>
                  <td className="px-4 py-3 text-emerald-400">{stat}</td>
                  <td className="px-4 py-3 text-gray-400">{dyn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mb-4">How to make a permanent QR code</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          The key is to use a static QR code generator that gives you the image outright — not one that serves the redirect through their own servers.
        </p>
        <ol className="space-y-4 mb-8 text-gray-300">
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold shrink-0">1.</span>
            <div><strong className="text-white">Choose your destination carefully.</strong> Since you can&apos;t edit a static code later, make sure the URL you encode is stable. Use a URL you own and control — not a social media profile that might change.</div>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold shrink-0">2.</span>
            <div><strong className="text-white">Generate on TrueQR.</strong> The code is built entirely in your browser — nothing is stored on our servers. Download PNG for digital use, SVG for print (scales to any size without pixelating).</div>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold shrink-0">3.</span>
            <div><strong className="text-white">Test before printing.</strong> Scan it with multiple devices before committing to a print run. Check that the destination loads correctly.</div>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold shrink-0">4.</span>
            <div><strong className="text-white">Keep the file.</strong> Save the SVG somewhere permanent. If you ever need to reprint, you have the original file.</div>
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mb-4">When to use dynamic instead</h2>
        <p className="text-gray-300 leading-relaxed mb-8">
          Dynamic codes make sense when you need to change the destination after printing — marketing campaigns where the landing page might change, menus that change seasonally and you want to reuse the same printed QR, or anywhere you need scan analytics. Just go in knowing the tradeoff: the code only works while you&apos;re paying.
        </p>

        <div className="bg-emerald-950 border border-emerald-800 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Generate a permanent QR code</h3>
          <p className="text-gray-400 mb-6">Static, free, and yours forever. No account needed.</p>
          <Link href="/" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-lg transition-colors">
            Create My QR Code →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
