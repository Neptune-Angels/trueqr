'use client';
import dynamic from 'next/dynamic';

export interface HeatPoint {
  city: string;
  lat: number;
  lng: number;
  count: number;
}

// Dynamically import the inner map to avoid SSR issues with Leaflet
const ScanHeatmapInner = dynamic(() => import('./_ScanHeatmapInner'), {
  ssr: false,
  loading: () => (
    <div className="h-80 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center">
      <span className="text-gray-500 text-sm">Loading map…</span>
    </div>
  ),
});

export default function ScanHeatmap({ points }: { points: HeatPoint[] }) {
  if (!points.length) return null;
  return <ScanHeatmapInner points={points} />;
}
