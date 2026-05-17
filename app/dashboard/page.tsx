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
  folder_id: string | null;
  utm_source:   string | null;
  utm_medium:   string | null;
  utm_campaign: string | null;
}

interface Folder {
  id: string;
  name: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const [plan, setPlan] = useState('free');
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [activeFolderId, setActiveFolderId] = useState<string | null | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [selectedQR, setSelectedQR] = useState<QRCodeData | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState('');
  const [editSaving, setEditSaving] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [movingId, setMovingId] = useState<string | null>(null);
  const modalCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const supabase = createBrowserClient();
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserEmail(user.email || '');

      const { data: userRow } = await supabase.from('users').select('plan').eq('id', user.id).single();
      if (userRow) setPlan(userRow.plan);

      const [codesRes, foldersRes] = await Promise.all([
        supabase
          .from('qr_codes')
          .select('id, name, slug, destination_url, scan_count, is_active, created_at, folder_id, utm_source, utm_medium, utm_campaign')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        fetch('/api/folders').then(r => r.json()),
      ]);

      setQrCodes(codesRes.data || []);
      setFolders(foldersRes.folders || []);
      setLoading(false);

      // Poll every 15 seconds to refresh scan counts
      const interval = setInterval(async () => {
        const { data: refreshed } = await supabase
          .from('qr_codes')
          .select('id, scan_count')
          .eq('user_id', user.id);
        if (refreshed) {
          setQrCodes(prev => prev.map(q => {
            const match = refreshed.find((r: { id: string; scan_count: number }) => r.id === q.id);
            return match ? { ...q, scan_count: match.scan_count } : q;
          }));
        }
      }, 15000);

      return () => clearInterval(interval);
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

  async function handleMoveToFolder(qrId: string, folderId: string | null) {
    setMovingId(qrId);
    try {
      const res = await fetch(`/api/qr/${qrId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder_id: folderId }),
      });
      if (!res.ok) throw new Error('Move failed');
      setQrCodes(prev => prev.map(q => q.id === qrId ? { ...q, folder_id: folderId } : q));
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Move failed');
    } finally {
      setMovingId(null);
    }
  }

  async function handleCreateFolder() {
    const name = newFolderName.trim();
    if (!name) return;
    setCreatingFolder(true);
    try {
      const res = await fetch('/api/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setFolders(prev => [...prev, data]);
      setNewFolderName('');
      setShowFolderInput(false);
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Create failed');
    } finally {
      setCreatingFolder(false);
    }
  }

  async function handleDeleteFolder(id: string) {
    if (!confirm('Delete folder? QR codes will move to Uncategorized.')) return;
    await fetch(`/api/folders/${id}`, { method: 'DELETE' });
    setFolders(prev => prev.filter(f => f.id !== id));
    setQrCodes(prev => prev.map(q => q.folder_id === id ? { ...q, folder_id: null } : q));
    if (activeFolderId === id) setActiveFolderId('all');
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

  const visibleQRCodes = activeFolderId === 'all'
    ? qrCodes
    : activeFolderId === null
      ? qrCodes.filter(q => !q.folder_id)
      : qrCodes.filter(q => q.folder_id === activeFolderId);

  const uncategorizedCount = qrCodes.filter(q => !q.folder_id).length;

  // Attribution summary: group by campaign across all QR codes
  const campaignSummary = Object.entries(
    qrCodes
      .filter(q => q.utm_campaign)
      .reduce<Record<string, { scans: number; count: number }>>((acc, q) => {
        const key = q.utm_campaign!;
        if (!acc[key]) acc[key] = { scans: 0, count: 0 };
        acc[key].scans += q.scan_count;
        acc[key].count += 1;
        return acc;
      }, {})
  ).sort((a, b) => b[1].scans - a[1].scans);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-gray-400">Loading…</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">

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

        <div className="flex gap-6">
          {/* Folders sidebar */}
          <aside className="w-48 flex-shrink-0">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">Folders</p>

              {/* All */}
              <button
                onClick={() => setActiveFolderId('all')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${
                  activeFolderId === 'all' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span>All QR Codes</span>
                <span className="text-xs opacity-60">{qrCodes.length}</span>
              </button>

              {/* Uncategorized */}
              <button
                onClick={() => setActiveFolderId(null)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${
                  activeFolderId === null ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span>Uncategorized</span>
                <span className="text-xs opacity-60">{uncategorizedCount}</span>
              </button>

              {/* User folders */}
              {folders.map(folder => (
                <div key={folder.id} className="group relative">
                  <button
                    onClick={() => setActiveFolderId(folder.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${
                      activeFolderId === folder.id ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <span className="truncate pr-1">📁 {folder.name}</span>
                    <span className="text-xs opacity-60">{qrCodes.filter(q => q.folder_id === folder.id).length}</span>
                  </button>
                  <button
                    onClick={() => handleDeleteFolder(folder.id)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center justify-center w-5 h-5 rounded text-gray-500 hover:text-red-400 hover:bg-gray-700 text-xs"
                    title="Delete folder"
                  >×</button>
                </div>
              ))}

              {/* New folder */}
              {showFolderInput ? (
                <div className="mt-2 px-1">
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={e => setNewFolderName(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleCreateFolder(); if (e.key === 'Escape') setShowFolderInput(false); }}
                    placeholder="Folder name"
                    autoFocus
                    className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-indigo-500 mb-1"
                  />
                  <div className="flex gap-1">
                    <button onClick={handleCreateFolder} disabled={creatingFolder}
                      className="flex-1 text-xs bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-2 py-1 rounded transition-colors">
                      {creatingFolder ? '…' : 'Create'}
                    </button>
                    <button onClick={() => { setShowFolderInput(false); setNewFolderName(''); }}
                      className="text-xs text-gray-400 hover:text-white px-2 py-1">
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowFolderInput(true)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors mt-1"
                >
                  + New folder
                </button>
              )}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Create button */}
            <div className="mb-6">
              <Link href="/dashboard/new" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                + Create QR Code
              </Link>
            </div>

            {/* Attribution summary — shown when ≥1 QR has a campaign tag */}
            {activeFolderId === 'all' && campaignSummary.length > 0 && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Scans by Campaign</h3>
                <div className="space-y-2">
                  {campaignSummary.map(([campaign, { scans, count }]) => {
                    const maxScans = campaignSummary[0][1].scans || 1;
                    return (
                      <div key={campaign} className="flex items-center gap-3">
                        <span className="text-gray-300 text-sm truncate w-40 shrink-0">{campaign}</span>
                        <div className="flex-1 bg-gray-800 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${Math.round((scans / maxScans) * 100)}%` }} />
                        </div>
                        <span className="text-amber-300 text-sm w-12 text-right shrink-0">{scans.toLocaleString()} <span className="text-gray-600">scans</span></span>
                        <span className="text-gray-600 text-xs w-16 shrink-0">{count} QR{count !== 1 ? 's' : ''}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* QR list */}
            {visibleQRCodes.length === 0 ? (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
                <p className="text-gray-400 mb-4">
                  {activeFolderId === 'all' ? 'No QR codes yet.' : 'No QR codes in this folder.'}
                </p>
                {activeFolderId === 'all' && (
                  <Link href="/dashboard/new" className="text-emerald-400 hover:text-emerald-300 underline">
                    Create your first dynamic QR code
                  </Link>
                )}
              </div>
            ) : (
              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-800">
                    <tr>
                      <th className="text-left px-6 py-3 text-gray-400 font-medium">Name</th>
                      <th className="text-left px-6 py-3 text-gray-400 font-medium">Destination</th>
                      <th className="text-left px-6 py-3 text-gray-400 font-medium">Scans</th>
                      <th className="text-left px-6 py-3 text-gray-400 font-medium">Folder</th>
                      <th className="text-left px-6 py-3 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {visibleQRCodes.map(qr => (
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
                            <span className="truncate block max-w-[180px]" title={qr.destination_url}>
                              {qr.destination_url}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-300">{qr.scan_count}</td>
                        <td className="px-6 py-4">
                          <select
                            value={qr.folder_id ?? ''}
                            onChange={e => handleMoveToFolder(qr.id, e.target.value || null)}
                            disabled={movingId === qr.id}
                            className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-gray-300 focus:outline-none focus:border-indigo-500 disabled:opacity-50 max-w-[130px]"
                          >
                            <option value="">Uncategorized</option>
                            {folders.map(f => (
                              <option key={f.id} value={f.id}>{f.name}</option>
                            ))}
                          </select>
                        </td>
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
          </div>
        </div>
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
