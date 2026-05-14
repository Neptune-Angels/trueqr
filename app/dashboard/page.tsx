'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase';
import Footer from '@/components/Footer';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const QRCode = require('qrcode');

interface QRCodeData {
  id: string;
  name: string;
  slug: string;
  destination_url: string;
  scan_count: number;
  is_active: boolean;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const [plan, setPlan] = useState('free');
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQR, setSelectedQR] = useState<QRCodeData | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState('');
  const [editSaving, setEditSaving] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const modalCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const supabase = createBrowserClient();
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserEmail(user.email || '');

      const { data: userRow } = await supabase.from('users').select('plan').eq('id', user.id).single();
      if (userRow) setPlan(userRow.plan);

      const { data: codes } = await supabase
        .from('qr_codes')
        .select('id, name, slug, destination_url, scan_count, is_active, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setQrCodes(codes || []);
      setLoading(false);
    })();
  }, [router]);

  useEffect(() => {
    if (selectedQR && modalCanvasRef.current) {
      QRCode.toCanvas(modalCanvasRef.current, `https://trueqr.co/r/${selectedQR.slug}`, {
        width: 240, margin: 2, color: { dark: '#000000', light: '#ffffff' },
      });
    }
  }, [selectedQR]);

  async function handleEdit(qr: QRCodeData) {
    setEditingId(qr.id);
    setEditUrl(qr.destination_url);
  }

  async function handleEditSave(id: string) {
    setEditSaving(true);
    try {
      const res = await fetch(`/api/qr/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination_url: editUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');
      setQrCodes(prev => prev.map(q => q.id === id ? { ...q, destination_url: editUrl } : q));
      setEditingId(null);
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Update failed');
    } finally {
      setEditSaving(false);
    }
  }

  function handleDownload() {
    if (!modalCanvasRef.current || !selectedQR) return;
    const link = document.createElement('a');
    link.download = `qr-${selectedQR.slug}.png`;
    link.href = modalCanvasRef.current.toDataURL('image/png');
    link.click();
  }

  async function handlePortal() {
    setPortalLoading(true);
    const res = await fetch('/api/portal', { method: 'POST' });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else { alert(data.error || 'Portal unavailable'); setPortalLoading(false); }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-gray-400">Loading…</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 w-full">

        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">{userEmail}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              plan === 'pro'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-gray-800 text-gray-400'
            }`}>{plan.toUpperCase()}</span>
            {plan !== 'free' && (
              <button
                onClick={handlePortal}
                disabled={portalLoading}
                className="text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-50"
              >
                {portalLoading ? 'Loading…' : 'Manage subscription'}
              </button>
            )}
            {plan === 'free' && (
              <Link href="/pricing" className="bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                Upgrade to Pro
              </Link>
            )}
          </div>
        </div>

        {/* Create button */}
        <div className="mb-6">
          <Link href="/dashboard/new" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
            + Create QR Code
          </Link>
        </div>

        {/* QR list */}
        {qrCodes.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
            <p className="text-gray-400 mb-4">No QR codes yet.</p>
            <Link href="/dashboard/new" className="text-emerald-400 hover:text-emerald-300 underline">
              Create your first dynamic QR code
            </Link>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-800">
                <tr>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Name</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Destination</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Scans</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Created</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {qrCodes.map(qr => (
                  <tr key={qr.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/${qr.id}`} className="text-white hover:text-indigo-400 font-medium transition-colors">
                        {qr.name}
                      </Link>
                      <div className="text-xs text-gray-500 font-mono mt-0.5">/r/{qr.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300 max-w-xs">
                      {editingId === qr.id ? (
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={editUrl}
                            onChange={e => setEditUrl(e.target.value)}
                            className="flex-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-emerald-500"
                          />
                          <button onClick={() => handleEditSave(qr.id)} disabled={editSaving}
                            className="text-xs bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-2 py-1 rounded transition-colors">
                            {editSaving ? '…' : 'Save'}
                          </button>
                          <button onClick={() => setEditingId(null)}
                            className="text-xs text-gray-400 hover:text-white px-2 py-1">
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span className="truncate block max-w-[200px]" title={qr.destination_url}>
                          {qr.destination_url}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{qr.scan_count}</td>
                    <td className="px-6 py-4 text-gray-400">{new Date(qr.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => setSelectedQR(qr)}
                          className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-2 py-1 rounded transition-colors">
                          View QR
                        </button>
                        {editingId !== qr.id && (
                          <button onClick={() => handleEdit(qr)}
                            className="text-xs text-gray-400 hover:text-white px-2 py-1 transition-colors">
                            Edit URL
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />

      {/* QR Modal */}
      {selectedQR && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setSelectedQR(null)}>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h2 className="font-semibold text-lg mb-1">{selectedQR.name}</h2>
            <p className="text-xs text-gray-500 font-mono mb-4">/r/{selectedQR.slug}</p>
            <div className="flex justify-center mb-4">
              <div className="bg-white p-3 rounded-xl">
                <canvas ref={modalCanvasRef} className="rounded" />
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mb-4 break-all">trueqr.co/r/{selectedQR.slug}</p>
            <div className="flex gap-3">
              <button onClick={() => setSelectedQR(null)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2 rounded-lg transition-colors text-sm">
                Close
              </button>
              <button onClick={handleDownload}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg transition-colors text-sm">
                ↓ Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
