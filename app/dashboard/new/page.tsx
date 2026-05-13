'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NewQRCodePage() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ slug: string; redirectUrl: string } | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, destination_url: url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create QR code');
      setResult({ slug: data.slug, redirectUrl: `https://trueqr.co/r/${data.slug}` });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col">
        <Header />
        <main className="flex-1 max-w-lg mx-auto px-4 py-16 w-full">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">✅</div>
            <h1 className="text-3xl font-bold mb-2">QR Code Created!</h1>
            <p className="text-gray-400">Your dynamic QR code is live and ready to scan.</p>
          </div>

          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Redirect URL (put this in your QR code)</div>
              <div className="font-mono text-emerald-400 text-sm break-all">{result.redirectUrl}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Short slug</div>
              <div className="font-mono text-gray-300">/r/{result.slug}</div>
            </div>
            <div className="text-xs text-gray-500">
              This code redirects to <span className="text-gray-300">{url}</span>. You can change the destination any time from your dashboard.
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href="/dashboard"
              className="flex-1 text-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-3 rounded-lg transition-colors"
            >
              Back to Dashboard
            </Link>
            <button
              onClick={() => { setResult(null); setName(''); setUrl(''); }}
              className="flex-1 text-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors border border-gray-700"
            >
              Create Another
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-lg mx-auto px-4 py-16 w-full">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">New QR Code</span>
        </nav>

        <h1 className="text-3xl font-bold mb-2">Create Dynamic QR Code</h1>
        <p className="text-gray-400 mb-8">
          Create a redirect-based QR code. Scan the code → we redirect to your URL. Change the destination any time.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Name <span className="text-gray-600">(for your reference)</span></label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Business Card QR, Menu Link..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Destination URL</label>
            <input
              type="url"
              required
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://yoursite.com/page"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            />
            <p className="text-xs text-gray-500 mt-1">People who scan your QR code will be sent here.</p>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold rounded-lg px-4 py-3 transition-colors"
          >
            {loading ? 'Creating…' : 'Create QR Code'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-800 text-sm text-gray-400">
          💡 After creating, use the redirect URL (trueqr.co/r/xxxx) as your QR code's target. You can update the destination URL any time without reprinting.
        </div>
      </main>
      <Footer />
    </div>
  );
}
