import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'QR Code for Restaurant Menu: Free, Permanent Setup Guide | TrueQR',
  description: 'How to add a QR code to your restaurant menu. Free static QR codes that never expire — no subscription, no monthly fee.',
  openGraph: {
    title: 'Restaurant Menu QR Code Guide | TrueQR',
    description: 'Free, permanent QR codes for your restaurant menu. Works forever without a subscription.',
  },
};

export default function RestaurantMenuPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto px-4 py-16 w-full">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Restaurant Menu QR Code</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6 leading-tight">
          QR Code for Your Restaurant Menu: Free Permanent Setup
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          Thousands of restaurants set up QR code menus during COVID — and many are still paying monthly subscriptions they don&apos;t need. Here&apos;s how to do it free, permanently.
        </p>

        <h2 className="text-2xl font-semibold mb-4">What you actually need</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          You need two things: a stable URL for your menu, and a QR code that points to it. That&apos;s it. No monthly subscription needed, no QR &quot;platform,&quot; no analytics dashboard.
        </p>
        <p className="text-gray-300 leading-relaxed mb-8">
          Most restaurants that use QR code services are paying for features they don&apos;t use — scan tracking, A/B testing, team accounts. The core function (scan code → see menu) is just a URL.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Step 1: Get a stable menu URL</h2>
        <p className="text-gray-300 leading-relaxed mb-4">Your options, from best to worst:</p>
        <div className="space-y-3 mb-8">
          {[
            { label: 'PDF hosted on your website', desc: 'yourrestaurant.com/menu.pdf — best option. You control it, it\'s permanent, update the PDF file when you update the menu.', badge: 'Best' },
            { label: 'Google Drive PDF', desc: 'Upload your menu PDF to Google Drive, set sharing to "Anyone with link," use that URL. Free and reliable.', badge: 'Good' },
            { label: 'Your website menu page', desc: 'If you have a website with a menu page, use that URL. Make sure it\'s mobile-friendly.', badge: 'Good' },
            { label: 'Toast, Square, or POS menu link', desc: 'Your POS system may provide a shareable menu link. Check their settings.', badge: 'OK' },
            { label: 'QR service hosted menu', desc: 'Avoid. You\'re paying them to host a page you could host yourself.', badge: 'Avoid' },
          ].map(item => (
            <div key={item.label} className="flex gap-4 bg-gray-900 rounded-lg p-4 border border-gray-800">
              <div className={`shrink-0 text-xs px-2 py-1 rounded font-medium h-fit ${item.badge === 'Best' ? 'bg-emerald-500/20 text-emerald-400' : item.badge === 'Good' ? 'bg-blue-500/20 text-blue-400' : item.badge === 'Avoid' ? 'bg-red-500/20 text-red-400' : 'bg-gray-700 text-gray-400'}`}>
                {item.badge}
              </div>
              <div>
                <div className="font-medium text-white mb-1">{item.label}</div>
                <div className="text-gray-400 text-sm">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mb-4">Step 2: Generate your QR code</h2>
        <ol className="space-y-3 mb-8 text-gray-300">
          <li className="flex gap-3"><span className="text-emerald-400 font-bold">1.</span> Go to <Link href="/" className="text-emerald-400 underline">TrueQR</Link> — free, no account needed</li>
          <li className="flex gap-3"><span className="text-emerald-400 font-bold">2.</span> Select &quot;URL&quot; and paste your menu link</li>
          <li className="flex gap-3"><span className="text-emerald-400 font-bold">3.</span> Choose a color that matches your brand (optional)</li>
          <li className="flex gap-3"><span className="text-emerald-400 font-bold">4.</span> Download as <strong className="text-white">SVG</strong> for print — it scales to any size without pixelating</li>
        </ol>

        <h2 className="text-2xl font-semibold mb-4">Step 3: Print tips</h2>
        <ul className="space-y-2 mb-8 text-gray-300">
          {[
            'Minimum print size: 1.5cm × 1.5cm (most phones can scan this)',
            'Leave a white border (quiet zone) around the code — at least 4 modules wide',
            'Test with multiple phones before printing a full run',
            'Laminate table cards so they survive spills',
            'Add a short text label: "Scan for menu" — reduces customer confusion',
          ].map(tip => (
            <li key={tip} className="flex gap-2">
              <span className="text-emerald-400 shrink-0">•</span>
              {tip}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mb-4">What about when the menu changes?</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          This is the key insight: <strong className="text-white">update the file at the same URL, not the QR code.</strong>
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          If your menu is at <code className="text-emerald-400 bg-gray-900 px-1 rounded">yourrestaurant.com/menu.pdf</code> — replace that PDF file on your server. Every existing QR code instantly shows the new menu. You never reprint the codes.
        </p>
        <p className="text-gray-300 leading-relaxed mb-8">
          The same works with Google Drive: update the file, the link stays the same. If you need to change the URL itself (rare — avoid this), that&apos;s when you&apos;d generate a new QR code.
        </p>

        <div className="bg-emerald-950 border border-emerald-800 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Create your menu QR code</h3>
          <p className="text-gray-400 mb-6">Free, permanent — no monthly fee, no account.</p>
          <Link href="/" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-lg transition-colors">
            Generate Menu QR Code →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
