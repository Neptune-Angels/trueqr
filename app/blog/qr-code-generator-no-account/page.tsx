import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'QR Code Generator — No Account, No Email, No Catch | TrueQR',
  description: 'Generate free QR codes instantly with no account required. No sign-up, no email, no watermark. Your QR code works forever.',
  openGraph: {
    title: 'QR Code Generator — No Account Required | TrueQR',
    description: 'Generate free QR codes instantly with no account required. No sign-up, no email, no watermark.',
  },
};

export default function NoAccountPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto px-4 py-16 w-full">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">No Account QR Generator</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6 leading-tight">
          QR Code Generator With No Account Required
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          Most QR code generators are free to use — until they're not. Here's how to generate a QR code that actually stays free, with no account, no email, and no tricks.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Why do most generators ask for an account?</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          The business model is simple: give you a "free" QR code, then hold it hostage. Dynamic QR codes — the kind that redirect through their servers — only work as long as you keep paying. Cancel your subscription? Your QR codes become dead links.
        </p>
        <p className="text-gray-300 leading-relaxed mb-8">
          Requiring an account also gives them your email address for marketing, and it lets them track which codes you've made so they can upsell you on analytics.
        </p>

        <h2 className="text-2xl font-semibold mb-4">What's a static QR code and why does it not need an account?</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          A static QR code has your destination encoded directly in the pattern. When someone scans it, their phone reads the URL directly from the image — no server involved, no subscription required. The code works exactly the same whether the company that made it still exists or not.
        </p>
        <p className="text-gray-300 leading-relaxed mb-8">
          Because nothing passes through a server, there's nothing to track and nothing to bill. No account needed.
        </p>

        <h2 className="text-2xl font-semibold mb-4">What you can generate without an account on TrueQR</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            { type: 'URL', desc: 'Any website, product page, or landing page' },
            { type: 'WiFi', desc: 'Let guests connect without typing a password' },
            { type: 'vCard', desc: 'Tap to add your contact info to their phone' },
            { type: 'Email', desc: 'Pre-filled email to a specific address' },
            { type: 'Phone', desc: 'Tap to call a number directly' },
            { type: 'Text', desc: 'Any plain text message' },
          ].map(item => (
            <div key={item.type} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <div className="text-emerald-400 font-semibold mb-1">{item.type}</div>
              <div className="text-gray-400 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm mb-8">All free. All permanent. No account. Download as PNG or SVG.</p>

        <h2 className="text-2xl font-semibold mb-4">When would you actually need an account?</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          There's one legitimate reason to create an account: <strong className="text-white">dynamic QR codes</strong>. A dynamic code lets you change where it points after you've already printed it. Useful if you're running a campaign and might change the landing page, or if you want to track scan counts.
        </p>
        <p className="text-gray-300 leading-relaxed mb-8">
          TrueQR offers dynamic QR codes as a Pro feature. But for the vast majority of use cases — business cards, restaurant menus, event signage, personal links — a static code is exactly what you need, and it's free forever.
        </p>

        <h2 className="text-2xl font-semibold mb-4">How to generate your QR code (no account)</h2>
        <ol className="space-y-3 mb-10 text-gray-300">
          <li className="flex gap-3"><span className="text-emerald-400 font-bold">1.</span> Go to the <Link href="/" className="text-emerald-400 underline hover:text-emerald-300">TrueQR generator</Link></li>
          <li className="flex gap-3"><span className="text-emerald-400 font-bold">2.</span> Choose your QR type (URL, WiFi, contact, etc.)</li>
          <li className="flex gap-3"><span className="text-emerald-400 font-bold">3.</span> Enter your content</li>
          <li className="flex gap-3"><span className="text-emerald-400 font-bold">4.</span> Customize color and size if you want</li>
          <li className="flex gap-3"><span className="text-emerald-400 font-bold">5.</span> Download PNG or SVG — done</li>
        </ol>
        <p className="text-gray-400 text-sm mb-10">No email prompt. No "start your free trial." Just a QR code.</p>

        <div className="bg-emerald-950 border border-emerald-800 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Generate your QR code now</h3>
          <p className="text-gray-400 mb-6">Free, permanent, no account required.</p>
          <Link
            href="/"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Open Generator →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
