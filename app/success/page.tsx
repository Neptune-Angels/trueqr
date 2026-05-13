import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Welcome to TrueQR Pro — You\'re In!',
  description: 'You\'re now on TrueQR Pro. Dynamic QR codes, analytics, logo embedding, and bulk generation.',
};

const PRO_FEATURES = [
  { icon: '🔄', title: 'Dynamic QR Codes', desc: 'Edit the destination URL after printing — no reprint needed.' },
  { icon: '📊', title: 'Scan Analytics', desc: 'Track scan count, location, device type, and time of scan.' },
  { icon: '🖼️', title: 'Logo Embedding', desc: 'Embed your brand logo directly inside your QR code.' },
  { icon: '📦', title: 'Bulk Generation', desc: 'Generate up to 25 QR codes at once from a list.' },
];

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white py-16 px-4 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full text-center">
        {/* Hero */}
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-4xl font-bold mb-3">You&apos;re now on TrueQR Pro!</h1>
        <p className="text-gray-400 mb-10">
          Thanks for subscribing. Your Pro account is active and ready to go.
        </p>

        {/* What's included */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold mb-4 text-center text-indigo-400">What&apos;s included in Pro</h2>
          <ul className="space-y-4">
            {PRO_FEATURES.map(({ icon, title, desc }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-gray-400">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Early access note */}
        <div className="bg-indigo-950 border border-indigo-700 rounded-xl px-5 py-4 mb-8 text-sm text-indigo-200">
          <strong>🚀 Early access:</strong> Full Pro features are launching soon — you&apos;re on the early access list and will be the first to know when they go live.
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-8 rounded-xl transition-colors text-sm"
        >
          ← Back to QR Generator
        </Link>
      </div>
      <Footer />
    </main>
  );
}
