import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Welcome to TrueQR Pro — You\'re In!',
  description: 'You\'re now on TrueQR Pro. Dynamic QR codes, analytics, logo embedding, and bulk generation.',
};

const PRO_FEATURES = [
  { icon: '🔄', title: 'Dynamic QR Codes', desc: 'Edit the destination URL after printing — no reprint needed.' },
  { icon: '📊', title: 'Scan Analytics', desc: 'Track scans over time, by location and device.' },
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
        <p className="text-gray-400 mb-8">
          Payment confirmed. One last step — create your account to access the dashboard.
        </p>

        {/* Account creation CTA — primary action */}
        <div className="bg-indigo-900 border border-indigo-600 rounded-2xl p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold mb-2 text-indigo-200">Create your account</h2>
          <p className="text-sm text-indigo-300 mb-4">
            Sign up using the <strong className="text-white">same email you used at checkout</strong>. Your Pro plan will be linked automatically.
          </p>
          <div className="flex gap-3">
            <Link
              href="/signup"
              className="flex-1 text-center bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
            >
              Create account →
            </Link>
            <Link
              href="/login"
              className="flex-1 text-center bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
            >
              Already have an account
            </Link>
          </div>
        </div>

        {/* What's included */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold mb-4 text-center text-gray-300">What&apos;s included in Pro</h2>
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

        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
        >
          ← Back to QR Generator
        </Link>
      </div>
      <Footer />
    </main>
  );
}
