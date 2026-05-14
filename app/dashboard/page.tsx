'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
const QRCode = require('qrcode');

interface QRCodeData {
  id: string;
  slug: string;
  destination_url: string;
  scans: number;
  created_at: string;
}

interface UserData {
  plan: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQR, setSelectedQR] = useState<QRCodeData | null>(null);
  const modalCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const supabase = createBrowserClient();

    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      setUser(user);

      const { data: profile } = await supabase
        .from('users')
        .select('plan')
        .eq('id', user.id)
        .single();

      setUserData(profile);

      const { data: codes } = await supabase
        .from('qr_codes')
        .select('id, slug, destination_url, scans, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setQrCodes(codes || []);
      setLoading(false);
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    if (selectedQR && modalCanvasRef.current) {
      const qrUrl = `https://trueqr.co/r/${selectedQR.slug}`;
      QRCode.toCanvas(modalCanvasRef.current, qrUrl, {
        width: 256,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' },
      });
    }
  }, [selectedQR]);

  const handleSignOut = async () => {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleManageSubscription = async () => {
    const res = await fetch('/api/portal', { method: 'POST' });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  const handleDownloadPNG = () => {
    if (modalCanvasRef.current && selectedQR) {
      const link = document.createElement('a');
      link.download = `qr-${selectedQR.slug}.png`;
      link.href = modalCanvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            {userData?.plan && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                userData.plan === 'pro' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-700 text-gray-300'
              }`}>
                {userData.plan.charAt(0).toUpperCase() + userData.plan.slice(1)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {userData?.plan === 'pro' && (
              <button
                onClick={handleManageSubscription}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
              >
                Manage Subscription
              </button>
            )}
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => router.push('/dashboard/new')}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-colors"
          >
            + Create QR Code
          </button>
        </div>

        {qrCodes.length === 0 ? (
          <div className="bg-gray-900 rounded-xl p-12 text-center">
            <p className="text-gray-400 mb-4">No QR codes yet</p>
            <button
              onClick={() => router.push('/dashboard/new')}
              className="text-emerald-500 hover:text-emerald-400"
            >
              Create your first QR code
            </button>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Slug</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Destination</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Scans</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Created</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {qrCodes.map((qr) => (
                  <tr key={qr.id} className="hover:bg-gray-800/50">
                    <td className="px-6 py-4 text-sm font-mono text-emerald-400">{qr.slug}</td>
                    <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                      {qr.destination_url}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{qr.scans}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(qr.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedQR(qr)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-sm transition-colors"
                      >
                        View QR
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedQR && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">QR Code: {selectedQR.slug}</h2>
              <button
                onClick={() => setSelectedQR(null)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex justify-center mb-4">
              <div className="bg-white p-4 rounded-lg">
                <canvas ref={modalCanvasRef} />
              </div>
            </div>
            <p className="text-center text-gray-400 text-sm mb-6 break-all">
              https://trueqr.co/r/{selectedQR.slug}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedQR(null)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleDownloadPNG}
                className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
              >
                Download PNG
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```
