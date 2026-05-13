'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface QRCode {
  id: string;
  name: string;
  slug: string;
  destination_url: string;
  scan_count: number;
  is_active: boolean;
  created_at: string;
}

export default function DashboardPage() {
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [plan, setPlan] = useState('free');
  const [portalLoading, setPortalLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const supabase = createBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserEmail(user.email || '');
      setUserId(user.id);

      const { data: userRow } = await supabase.from('users').select('plan').eq('id', user.id).single();
      if (userRow) setPlan(userRow.plan);

      const { data: codes } = await supabase.from('qr_codes').select('*').order('created_at', { ascending: false });
      setQrCodes(codes || []);
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleSignOut() {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.push('/');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-gray-400">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 w-full">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">{userEmail}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${plan === 'pro' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-gray-800 text-gray-400'}`}>
              {plan.toUpperCase()}
            </span>
            {plan === 'free' ? (
              <Link href="/pricing" className="bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                Upgrade to Pro
              </Link>
            ) : (
              <button
                onClick={async () => {
                  setPortalLoading(true);
                  const res = await fetch('/api/portal', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId }) });
                  const data = await res.json();
                  if (data.url) window.location.href = data.url;
                  else setPortalLoading(false);
                }}
                disabled={portalLoading}
                className="text-gray-400 hover:text-white text-sm transition-colors disabled:opacity-50"
              >
                {portalLoading ? 'Loading…' : 'Manage subscription'}
              </button>
            )}
            <button onClick={handleSignOut} className="text-gray-400 hover:text-white text-sm transition-colors">
              Sign out
            </button>
          </div>
        </div>

        {/* QR Codes section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Dynamic QR Codes</h2>
          {plan === 'pro' ? (
            <Link href="/dashboard/new" className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-2 rounded-lg transition-colors border border-gray-700">
              + New QR Code
            </Link>
          ) : (
            <Link href="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors">
              Pro feature — Upgrade →
            </Link>
          )}
        </div>

        {qrCodes.length === 0 ? (
          <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
            <div className="text-5xl mb-4">🔲</div>
            <h3 className="text-xl font-semibold mb-2">No dynamic QR codes yet</h3>
            <p className="text-gray-400 mb-6">
              {plan === 'free'
                ? 'Dynamic QR codes are a Pro feature. Upgrade to create editable, trackable codes.'
                : 'Create your first dynamic QR code to get started.'}
            </p>
            {plan === 'free' ? (
              <Link href="/pricing" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-lg transition-colors">
                Upgrade to Pro — $12/mo
              </Link>
            ) : (
              <Link href="/dashboard/new" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-lg transition-colors">
                Create first QR code
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-800 text-left">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Redirect URL</th>
                  <th className="pb-3 pr-4">Scans</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {qrCodes.map(qr => (
                  <tr key={qr.id} className="hover:bg-gray-900/50 transition-colors">
                    <td className="py-3 pr-4 font-medium">{qr.name}</td>
                    <td className="py-3 pr-4">
                      <a href={`https://trueqr.co/r/${qr.slug}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-mono text-xs">
                        /r/{qr.slug}
                      </a>
                    </td>
                    <td className="py-3 pr-4 text-gray-300">{qr.scan_count}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${qr.is_active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>
                        {qr.is_active ? 'Active' : 'Paused'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
