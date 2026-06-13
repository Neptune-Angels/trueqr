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

const MAX_LOGO_BYTES = 200 * 1024; // 200 KB

function buildQRContent(type: QRType, inputs: Record<string, string>): string {
  switch (type) {
    case 'url':    return inputs.main || 'https://trueqr.com';
    case 'text':   return inputs.main || '';
    case 'email':  return `mailto:${inputs.main}${inputs.subject ? `?subject=${encodeURIComponent(inputs.subject)}` : ''}`;
    case 'phone':  return `tel:${inputs.main.replace(/\s/g, '')}`;
    case 'wifi':   return `WIFI:T:${inputs.security || 'WPA'};S:${inputs.main};P:${inputs.password || ''};H:${inputs.hidden === 'true' ? 'true' : 'false'};;`;
    case 'vcard':  {
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${inputs.main}`,
        inputs.phone    ? `TEL:${inputs.phone}` : '',
        inputs.email    ? `EMAIL:${inputs.email}` : '',
        inputs.company  ? `ORG:${inputs.company}` : '',
        inputs.title    ? `TITLE:${inputs.title}` : '',
        inputs.website  ? `URL:${inputs.website}` : '',
        'END:VCARD',
      ].filter(Boolean);
      return lines.join('\n');
    }
    default:       return inputs.main || '';
  }
}

/** Draw QR from dataUrl onto canvas, then overlay the logo in the center. Returns new data URL. */
async function compositeLogoOntoQR(
  qrDataUrl: string,
  logoDataUrl: string,
  canvasSize: number,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) { reject(new Error('No canvas context')); return; }

    const qrImg = new Image();
    qrImg.onload = () => {
      ctx.drawImage(qrImg, 0, 0, canvasSize, canvasSize);

      const logoImg = new Image();
      logoImg.onload = () => {
        // Logo occupies ~20% of QR width, centered
        const logoSize = Math.round(canvasSize * 0.20);
        const padding  = Math.round(logoSize * 0.15);
        const boxSize  = logoSize + padding * 2;
        const offset   = (canvasSize - boxSize) / 2;

        // White rounded background behind logo for readability
        ctx.fillStyle = '#ffffff';
        const r = Math.round(boxSize * 0.18);
        ctx.beginPath();
        ctx.moveTo(offset + r, offset);
        ctx.lineTo(offset + boxSize - r, offset);
        ctx.quadraticCurveTo(offset + boxSize, offset, offset + boxSize, offset + r);
        ctx.lineTo(offset + boxSize, offset + boxSize - r);
        ctx.quadraticCurveTo(offset + boxSize, offset + boxSize, offset + boxSize - r, offset + boxSize);
        ctx.lineTo(offset + r, offset + boxSize);
        ctx.quadraticCurveTo(offset, offset + boxSize, offset, offset + boxSize - r);
        ctx.lineTo(offset, offset + r);
        ctx.quadraticCurveTo(offset, offset, offset + r, offset);
        ctx.closePath();
        ctx.fill();

        // Draw logo image
        const logoX = offset + padding;
        const logoY = offset + padding;
        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

        resolve(canvas.toDataURL('image/png'));
      };
      logoImg.onerror = reject;
      logoImg.src = logoDataUrl;
    };
    qrImg.onerror = reject;
    qrImg.src = qrDataUrl;
  });
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

  // Email capture prompt (shown once after first download)
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);

  // Logo state
  const [logoDataUrl, setLogoDataUrl]   = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string | null>(null);
  const [logoError, setLogoError]       = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Copy state
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoError(null);

    if (!['image/png', 'image/svg+xml', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      setLogoError('Only PNG, JPG, or SVG files are accepted.');
      e.target.value = '';
      return;
    }
    if (file.size > MAX_LOGO_BYTES) {
      setLogoError(`Logo must be under 200 KB (file is ${Math.round(file.size / 1024)} KB).`);
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setLogoDataUrl(ev.target?.result as string);
      setLogoFileName(file.name);
      setQrDataUrl(null); // reset so user regenerates with logo
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoDataUrl(null);
    setLogoFileName(null);
    setLogoError(null);
    setQrDataUrl(null);
    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  const generate = useCallback(async () => {
    const content = buildQRContent(qrType, inputs);
    if (!content.trim()) { setError('Please enter a value.'); return; }
    setGenerating(true);
    setError(null);
    try {
      // PNG via dataUrl
      const baseDataUrl = await QRCode.toDataURL(content, {
        width: size,
        margin: 2,
        color: { dark: color, light: bgColor },
        errorCorrectionLevel: 'H',
      });

      // If logo present, composite it on
      const finalDataUrl = logoDataUrl
        ? await compositeLogoOntoQR(baseDataUrl, logoDataUrl, size)
        : baseDataUrl;

      setQrDataUrl(finalDataUrl);

      // SVG string (no logo overlay for SVG — logo is canvas-only)
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
  }, [qrType, inputs, color, bgColor, size, logoDataUrl]);

  const downloadPng = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `trueqr-${qrType}.png`;
    a.click();
    if (!localStorage.getItem('tqr_email_prompt_dismissed')) setShowEmailPrompt(true);
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
    if (!localStorage.getItem('tqr_email_prompt_dismissed')) setShowEmailPrompt(true);
  };

  const copyPng = async () => {
    if (!qrDataUrl) return;
    try {
      const res   = await fetch(qrDataUrl);
      const blob  = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback: some browsers restrict clipboard.write — silently ignore
      console.warn('Clipboard write not supported in this browser.');
    }
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
        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-2 gap-3">
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
              <option value="nopass">None (open network)</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inputs.hidden === 'true'}
              onChange={e => setInput('hidden', e.target.checked ? 'true' : 'false')}
              className="w-4 h-4 rounded accent-indigo-500"
            />
            Hidden network (SSID not broadcast)
          </label>
        </div>
      )}
      {qrType === 'vcard' && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <input type="tel"   value={inputs.phone   || ''} onChange={e => setInput('phone',   e.target.value)} placeholder="Phone number"   className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
          <input type="email" value={inputs.email   || ''} onChange={e => setInput('email',   e.target.value)} placeholder="Email address"  className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
          <input type="text"  value={inputs.company || ''} onChange={e => setInput('company', e.target.value)} placeholder="Company / Org"   className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
          <input type="text"  value={inputs.title   || ''} onChange={e => setInput('title',   e.target.value)} placeholder="Job title"       className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
          <input type="url"   value={inputs.website || ''} onChange={e => setInput('website', e.target.value)} placeholder="Website URL"     className="col-span-2 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
        </div>
      )}
      {qrType === 'email' && (
        <input type="text" value={inputs.subject || ''} onChange={e => setInput('subject', e.target.value)} placeholder="Subject (optional)" className="w-full mb-4 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
      )}

      {/* Customization */}
      <div className="flex flex-wrap items-center gap-4 mb-5">
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

      {/* Logo upload */}
      <div className="mb-6">
        <p className="text-xs text-gray-500 mb-2">Logo (optional — centered on QR)</p>
        {logoDataUrl ? (
          <div className="flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoDataUrl} alt="Logo preview" className="w-8 h-8 object-contain rounded" />
            <span className="text-sm text-gray-300 flex-1 truncate">{logoFileName}</span>
            <button
              onClick={removeLogo}
              className="text-gray-500 hover:text-red-400 transition-colors text-xs ml-2"
              aria-label="Remove logo"
            >
              ✕ Remove
            </button>
          </div>
        ) : (
          <label className="flex items-center gap-3 cursor-pointer bg-gray-800 border border-dashed border-gray-600 hover:border-indigo-500 rounded-xl px-4 py-3 transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
              Upload PNG, JPG, or SVG (max 200 KB)
            </span>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/svg+xml"
              className="hidden"
              onChange={handleLogoUpload}
            />
          </label>
        )}
        {logoError && <p className="text-red-400 text-xs mt-1.5">{logoError}</p>}
      </div>

      {/* Generate button */}
      <button
        onClick={generate}
        disabled={generating}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors mb-6"
      >
        {generating ? 'Generating…' : 'Generate QR Code'}
      </button>

      {/* Dynamic-QR nudge — catches paid intent at the moment the static/dynamic distinction becomes meaningful */}
      <p className="text-gray-400 text-xs text-center -mt-4 mb-6">
        Need to change this link after printing?{' '}
        <a
          href="/pricing"
          onClick={() => {
            (window as unknown as { posthog?: { capture: (e: string, p?: Record<string, unknown>) => void } })
              .posthog?.capture('generator_dynamic_nudge_clicked', { surface: 'below_generate_button' });
          }}
          className="text-indigo-400 hover:text-indigo-300 underline transition-colors"
        >
          Create a dynamic QR instead →
        </a>
      </p>

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
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <button onClick={downloadPng} className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                ↓ Download PNG
              </button>
              <button
                onClick={copyPng}
                className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors min-w-[80px]"
              >
                {copied ? '✓ Copied!' : '⧉ Copy'}
              </button>
              <button onClick={downloadSvg} className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                ↓ Download SVG
              </button>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {/* Email capture prompt — shown once after first download */}
      {showEmailPrompt && (
        <div className="mt-4 flex items-center justify-between gap-4 bg-indigo-950 border border-indigo-700 rounded-xl px-4 py-3">
          <div className="text-sm">
            <span className="text-white font-medium">Want to save &amp; manage your QR codes?</span>
            {' '}
            <a href="/signup" className="text-indigo-400 hover:text-indigo-300 underline transition-colors">
              Create a free account →
            </a>
            <span className="text-gray-500 ml-2 text-xs">(edit destination, track scans)</span>
          </div>
          <button
            onClick={() => {
              localStorage.setItem('tqr_email_prompt_dismissed', '1');
              setShowEmailPrompt(false);
            }}
            className="text-gray-500 hover:text-white transition-colors shrink-0 text-lg leading-none"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
