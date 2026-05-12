'use client';

import { useState, useRef, useCallback } from 'react';
import * as QRCode from 'qrcode';

type QRType = 'url' | 'text' | 'email' | 'phone' | 'wifi' | 'vcard';

const QR_TYPES: { value: QRType; label: string; placeholder: string }[] = [
  { value: 'url',   label: 'URL',   placeholder: 'https://example.com' },
  { value: 'text',  label: 'Text',  placeholder: 'Any text you want to encode' },
  { value: 'email', label: 'Email', placeholder: 'hello@example.com' },
  { value: 'phone', label: 'Phone', placeholder: '+1 555 000 0000' },
  { value: 'wifi',  label: 'WiFi',  placeholder: 'Network name (SSID)' },
  { value: 'vcard', label: 'vCard', placeholder: 'Full name' },
];

const COLORS = ['#000000', '#1e3a5f', '#7c3aed', '#dc2626', '#059669', '#b45309'];

function buildQRContent(type: QRType, inputs: Record<string, string>): string {
  switch (type) {
    case 'url':    return inputs.main || 'https://trueqr.com';
    case 'text':   return inputs.main || '';
    case 'email':  return `mailto:${inputs.main}${inputs.subject ? `?subject=${encodeURIComponent(inputs.subject)}` : ''}`;
    case 'phone':  return `tel:${inputs.main.replace(/\s/g, '')}`;
    case 'wifi':   return `WIFI:T:${inputs.security || 'WPA'};S:${inputs.main};P:${inputs.password || ''};;`;
    case 'vcard':  return `BEGIN:VCARD\nVERSION:3.0\nFN:${inputs.main}\nTEL:${inputs.phone || ''}\nEMAIL:${inputs.email || ''}\nEND:VCARD`;
    default:       return inputs.main || '';
  }
}

export default function QRGenerator() {
  const [qrType, setQrType]       = useState<QRType>('url');
  const [inputs, setInputs]       = useState<Record<string, string>>({ main: '' });
  const [color, setColor]         = useState('#000000');
  const [bgColor, setBgColor]     = useState('#ffffff');
  const [size, setSize]           = useState(300);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [svgString, setSvgString] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = useCallback(async () => {
    const content = buildQRContent(qrType, inputs);
    if (!content.trim()) { setError('Please enter a value.'); return; }
    setGenerating(true);
    setError(null);
    try {
      // PNG via canvas
      const dataUrl = await QRCode.toDataURL(content, {
        width: size,
        margin: 2,
        color: { dark: color, light: bgColor },
        errorCorrectionLevel: 'H',
      });
      setQrDataUrl(dataUrl);

      // SVG string
      const svg = await QRCode.toString(content, {
        type: 'svg',
        margin: 2,
        color: { dark: color, light: bgColor },
        errorCorrectionLevel: 'H',
      });
      setSvgString(svg);
    } catch (e) {
      setError('Could not generate QR code. Please check your input.');
      console.error(e);
    } finally {
      setGenerating(false);
    }
  }, [qrType, inputs, color, bgColor, size]);

  const downloadPng = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `trueqr-${qrType}.png`;
    a.click();
  };

  const downloadSvg = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `trueqr-${qrType}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const setInput = (key: string, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
    setQrDataUrl(null);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-2xl mx-auto text-left">
      {/* Type selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {QR_TYPES.map(t => (
          <button
            key={t.value}
            onClick={() => { setQrType(t.value); setInputs({ main: '' }); setQrDataUrl(null); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              qrType === t.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Main input */}
      <div className="mb-4">
        <input
          type="text"
          value={inputs.main || ''}
          onChange={e => setInput('main', e.target.value)}
          onKeyDown={e => e.key === 'Enter' && generate()}
          placeholder={QR_TYPES.find(t => t.value === qrType)?.placeholder}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Conditional extra fields */}
      {qrType === 'wifi' && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <input
            type="password"
            value={inputs.password || ''}
            onChange={e => setInput('password', e.target.value)}
            placeholder="WiFi password"
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          />
          <select
            value={inputs.security || 'WPA'}
            onChange={e => setInput('security', e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="WPA">WPA/WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">None</option>
          </select>
        </div>
      )}
      {qrType === 'vcard' && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <input type="tel"   value={inputs.phone || ''} onChange={e => setInput('phone', e.target.value)} placeholder="Phone number" className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
          <input type="email" value={inputs.email || ''} onChange={e => setInput('email', e.target.value)} placeholder="Email address" className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
        </div>
      )}
      {qrType === 'email' && (
        <input type="text" value={inputs.subject || ''} onChange={e => setInput('subject', e.target.value)} placeholder="Subject (optional)" className="w-full mb-4 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
      )}

      {/* Customization */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div>
          <p className="text-xs text-gray-500 mb-1.5">QR color</p>
          <div className="flex gap-2">
            {COLORS.map(c => (
              <button
                key={c}
                onClick={() => { setColor(c); setQrDataUrl(null); }}
                className={`w-7 h-7 rounded-full border-2 transition-all ${color === c ? 'border-white scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
              />
            ))}
            <input type="color" value={color} onChange={e => { setColor(e.target.value); setQrDataUrl(null); }} className="w-7 h-7 rounded-full cursor-pointer border-0 bg-transparent" title="Custom color" />
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1.5">Size</p>
          <select
            value={size}
            onChange={e => { setSize(Number(e.target.value)); setQrDataUrl(null); }}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white"
          >
            <option value={200}>200px</option>
            <option value={300}>300px</option>
            <option value={500}>500px</option>
            <option value={1000}>1000px</option>
          </select>
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={generate}
        disabled={generating}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors mb-6"
      >
        {generating ? 'Generating…' : 'Generate QR Code'}
      </button>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {/* QR output */}
      {qrDataUrl && (
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="rounded-xl overflow-hidden border border-gray-700 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt="Generated QR code" width={180} height={180} />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-emerald-400 font-semibold mb-1">✓ Static QR code — permanent</p>
            <p className="text-gray-400 text-sm mb-4">This code encodes your content directly. It requires no server and cannot expire.</p>
            <div className="flex gap-3 justify-center sm:justify-start">
              <button onClick={downloadPng} className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                ↓ Download PNG
              </button>
              <button onClick={downloadSvg} className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                ↓ Download SVG
              </button>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
