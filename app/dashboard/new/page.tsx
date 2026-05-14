'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const QRCode = require('qrcode');

export default function NewQRCodePage() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ slug: string; redirectUrl: string } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (result && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, result.redirectUrl, {
        width: 240,
        margin: 2,
        color: { dark: '#ffffff', light: '#111827' },
      });
    }
  }, [result]);

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

  function downloadQR() {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `qr-${result?.slug}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col">
        <Header />
        <main className="flex-1 max-w-lg mx-auto px-4 py-16 w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">QR Code Created!</h1>
            <p className="text-gray-400">Scan it or download it below.</p>
          </div>

          {/* QR image */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 inline-block">
              <canvas ref={canvasRef} className="rounded-lg" />
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={downloadQR}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
            >
              ↓ Download PNG
            </button>
          </div>

          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4 mb-8">
            <div>
              <div className="text-xs text-gray-500 mb-1">Redirect URL</div>
              <div className="font-mono text-emerald-400 text-sm break-all">{result.redirectUrl}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Destination</div>
              <div className="text-gray-300 text-sm break-all">{url}</div>
            </div>
            <div className="text-xs text-gray-500">
              You can update the destination URL any time from your dashboard — no reprinting needed.
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="flex-1 text-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-3 rounded-lg transition-colors"
            >
              Dashboard
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
          Scan the code → we redirect to your URL. Change the destination any time without reprinting.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Name <span className="text-gray-600">(for your reference)</span>
            </label>
            <input
              type="text" required value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Business Card QR, Menu Link…"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Destination URL</label>
            <input
              type="url" required value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://yoursite.com/page"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            />
            <p className="text-xs text-gray-500 mt-1">Scanners will be redirected here.</p>
          </div>
          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}
          <button
            type="submit" disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold rounded-lg px-4 py-3 transition-colors"
          >
            {loading ? 'Creating…' : 'Create QR Code'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
