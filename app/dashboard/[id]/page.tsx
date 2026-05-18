'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import Footer from '@/components/Footer';
import { createBrowserClient } from '@/lib/supabase';
import ScanHeatmap from '@/components/ScanHeatmap';
import type { HeatPoint } from '@/components/ScanHeatmap';


interface QRData {
  id: string;
  name: string;
  slug: string;
  destination_url: string;
  scan_count: number;
}

interface DayCount { date: string; count: number; }
interface CountryCount { country: string; count: number; }

interface Attribution { source: string | null; medium: string | null; campaign: string | null; }

interface Analytics {
  qr: QRData;
  total_scans: number;
  last_30_days: DayCount[];
  top_countries: CountryCount[];
  attribution: Attribution;
  city_heatmap: HeatPoint[];
}

export default function QRAnalyticsPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    fetch(`/api/qr/${id}/analytics`)
      .then(r => {
        if (r.status === 401) { router.push('/login'); return null; }
        if (!r.ok) throw new Error('Failed to load');
        return r.json();
      })
      .then(d => { if (d) setData(d); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, router]);

  // Realtime: live scan counter via Supabase WebSocket
  useEffect(() => {
    if (!id) return;
    const supabase = createBrowserClient();
    const today = new Date().toISOString().substring(0, 10);
    const channel = supabase
      .channel(`scans-${id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'qr_scans', filter: `qr_code_id=eq.${id}` },
        () => {
          setData(prev => {
            if (!prev) return prev;
            return {
              ...prev,
              total_scans: prev.total_scans + 1,
              last_30_days: prev.last_30_days.map(d =>
                d.date === today ? { ...d, count: d.count + 1 } : d
              ),
            };
          });
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <p className="text-gray-400">Loading analytics…</p>
    </div>
  );

  if (error || !data) return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <p className="text-red-400">{error || 'Not found'}</p>
      </main>
    </div>
  );

  const { qr, total_scans, last_30_days, top_countries, attribution, city_heatmap } = data;
  const maxCount = Math.max(...last_30_days.map(d => d.count), 1);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{qr.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">{qr.name}</h1>
          <p className="text-gray-400 text-sm break-all">
            <span className="text-gray-600">→ </span>
            {qr.destination_url}
          </p>
          <p className="text-gray-600 text-xs mt-1">
            trueqr.co/r/{qr.slug}
          </p>
        </div>

        {/* Total scans */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-emerald-400">{total_scans}</div>
            <div className="text-gray-400 text-sm mt-1 flex items-center justify-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Total scans · live
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-indigo-400">
              {last_30_days.reduce((s, d) => s + d.count, 0)}
            </div>
            <div className="text-gray-400 text-sm mt-1">Last 30 days</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-white">
              {last_30_days.filter(d => d.count > 0).length}
            </div>
            <div className="text-gray-400 text-sm mt-1">Active days</div>
          </div>
        </div>

        {/* Bar chart - last 30 days */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Scans — last 30 days</h2>
          {last_30_days.every(d => d.count === 0) ? (
            <div className="h-32 flex items-center justify-center text-gray-600 text-sm">
              {total_scans > 0
                ? 'Detailed chart data begins recording from today’s scans.'
                : 'No scans yet — share your QR code to start tracking.'}
            </div>
          ) : (
            <>
              <div className="flex items-end gap-1 h-32">
                {last_30_days.map(({ date, count }) => (
                  <div key={date} className="flex-1 h-full flex flex-col items-center justify-end group relative" title={`${date}: ${count}`}>
                    <div
                      className="w-full bg-indigo-600 group-hover:bg-indigo-400 rounded-t transition-colors"
                      style={{ height: `${Math.max((count / maxCount) * 100, count > 0 ? 4 : 0)}%` }}
                    />
                    <div className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                      {date.slice(5)}: {count}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>{last_30_days[0]?.date.slice(5)}</span>
                <span>{last_30_days[14]?.date.slice(5)}</span>
                <span>{last_30_days[29]?.date.slice(5)}</span>
              </div>
            </>
          )}
        </div>

        {/* Top countries */}
        {top_countries.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Top countries</h2>
            <div className="space-y-3">
              {top_countries.map(({ country, count }) => {
                const pct = Math.round((count / (last_30_days.reduce((s, d) => s + d.count, 0) || 1)) * 100);
                return (
                  <div key={country} className="flex items-center gap-3">
                    <span className="text-gray-300 text-sm w-24 shrink-0">{country}</span>
                    <div className="flex-1 bg-gray-800 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-gray-400 text-sm w-8 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {top_countries.length === 0 && total_scans === 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center text-gray-500">
            No scans yet. Share your QR code to start tracking.
          </div>
        )}

        {/* City heatmap */}
        {city_heatmap?.length === 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Scan Map</h2>
            <p className="text-gray-600 text-sm">Location data starts recording from new scans. Your map will appear here once someone scans this QR code.</p>
          </div>
        )}
        {city_heatmap?.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
              Scan Map — {city_heatmap.length} {city_heatmap.length === 1 ? 'city' : 'cities'}
            </h2>
            <ScanHeatmap points={city_heatmap} />
            {/* Top cities list */}
            <div className="mt-4 space-y-2">
              {city_heatmap.slice(0, 5).map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-gray-300 text-sm truncate w-40 shrink-0">{p.city}</span>
                  <div className="flex-1 bg-gray-800 rounded-full h-1.5">
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${Math.round((p.count / city_heatmap[0].count) * 100)}%` }} />
                  </div>
                  <span className="text-gray-400 text-sm w-8 text-right shrink-0">{p.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Attribution tags */}
        {(attribution?.source || attribution?.medium || attribution?.campaign) && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Attribution</h2>
            <div className="flex flex-wrap gap-2">
              {attribution.source   && <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300 text-xs">source: {attribution.source}</span>}
              {attribution.medium   && <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 text-xs">medium: {attribution.medium}</span>}
              {attribution.campaign && <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 text-xs">campaign: {attribution.campaign}</span>}
            </div>
          </div>
        )}

        {/* DEBUG - remove after diagnosis */}
        <details className="mb-6">
          <summary className="text-gray-600 text-xs cursor-pointer">Debug data</summary>
          <pre className="text-xs text-gray-500 bg-gray-900 p-3 rounded overflow-auto mt-2" style={{maxHeight:'200px'}}>{JSON.stringify({total_scans, last30_nonzero: last_30_days.filter(d=>d.count>0), top_countries, city_heatmap_len: city_heatmap?.length}, null, 2)}</pre>
        </details>
        <Link href="/dashboard" className="text-gray-500 hover:text-white text-sm transition-colors">
          ← Back to Dashboard
        </Link>
      </main>
      <Footer />
    </div>
  );
}
