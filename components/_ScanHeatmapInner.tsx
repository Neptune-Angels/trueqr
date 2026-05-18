'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import type { HeatPoint } from './ScanHeatmap';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon path issue in Next.js/webpack
import L from 'leaflet';
// @ts-expect-error — Leaflet private field
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Colour scale: low → cool blue, high → hot red/orange
function heatColor(count: number, max: number): string {
  const t = max > 1 ? Math.min(count / max, 1) : 1;
  // interpolate: #6366f1 (indigo) → #f59e0b (amber) → #ef4444 (red)
  if (t < 0.5) {
    const s = t * 2;
    const r = Math.round(99  + s * (245 - 99));
    const g = Math.round(102 + s * (158 - 102));
    const b = Math.round(241 + s * (11  - 241));
    return `rgb(${r},${g},${b})`;
  } else {
    const s = (t - 0.5) * 2;
    const r = Math.round(245 + s * (239 - 245));
    const g = Math.round(158 + s * (68  - 158));
    const b = Math.round(11  + s * (68  - 11));
    return `rgb(${r},${g},${b})`;
  }
}

export default function ScanHeatmapInner({ points }: { points: HeatPoint[] }) {
  const max = Math.max(...points.map(p => p.count), 1);

  // Centre map on weighted centroid
  const totalWeight = points.reduce((s, p) => s + p.count, 0);
  const centerLat = points.reduce((s, p) => s + p.lat * p.count, 0) / totalWeight;
  const centerLng = points.reduce((s, p) => s + p.lng * p.count, 0) / totalWeight;

  const zoom = points.length === 1 ? 8 : 3;

  return (
    <div className="rounded-xl overflow-hidden border border-gray-800" style={{ height: '360px' }}>
      <MapContainer
        center={[centerLat || 20, centerLng || 0]}
        zoom={zoom}
        style={{ height: '100%', width: '100%', background: '#111827' }}
        zoomControl={true}
        scrollWheelZoom={false}
      >
        {/* Dark map tiles — CartoDB Dark Matter */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          maxZoom={19}
        />
        {points.map((p, i) => {
          const radius = 6 + Math.sqrt(p.count / max) * 18; // 6–24px
          const color  = heatColor(p.count, max);
          return (
            <CircleMarker
              key={i}
              center={[p.lat, p.lng]}
              radius={radius}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.65,
                weight: 1,
                opacity: 0.9,
              }}
            >
              <Tooltip direction="top" offset={[0, -radius]}>
                <span style={{ fontSize: '12px' }}>
                  <strong>{p.city}</strong><br />
                  {p.count} scan{p.count !== 1 ? 's' : ''}
                </span>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
