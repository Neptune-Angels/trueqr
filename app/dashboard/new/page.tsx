'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QRCodeFrame, { FRAME_STYLES, type FrameStyle } from '@/components/QRCodeFrame';

type QRType = 'URL' | 'Text' | 'Email' | 'Phone' | 'SMS' | 'WiFi' | 'vCard';

const DOT_STYLES = [
  { id: 'square',         label: 'Square' },
  { id: 'rounded',        label: 'Rounded' },
  { id: 'dots',           label: 'Dots' },
  { id: 'classy',         label: 'Classy' },
  { id: 'classy-rounded', label: 'Classy Rounded' },
  { id: 'extra-rounded',  label: 'Extra Rounded' },
];
const MARKER_STYLES = [
  { id: 'square',        label: 'Square' },
  { id: 'extra-rounded', label: 'Rounded' },
  { id: 'dot',           label: 'Dot' },
];

export default function NewQRPage() {
  const router  = useRouter();
  const [qrType, setQrType] = useState<QRType>('URL');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [createdQR, setCreatedQR] = useState<{ slug: string } | null>(null);

  // Content fields
  const [url,         setUrl]         = useState('');
  const [text,        setText]        = useState('');
  const [email,       setEmail]       = useState('');
  const [phone,       setPhone]       = useState('');
  const [smsPhone,    setSmsPhone]    = useState('');
  const [smsMsg,      setSmsMsg]      = useState('');
  const [wifiSsid,    setWifiSsid]    = useState('');
  const [wifiPass,    setWifiPass]    = useState('');
  const [wifiType,    setWifiType]    = useState('WPA');
  const [vcName,      setVcName]      = useState('');
  const [vcPhone,     setVcPhone]     = useState('');
  const [vcEmail,     setVcEmail]     = useState('');
  const [vcCompany,   setVcCompany]   = useState('');

  // Style
  const [dotStyle,    setDotStyle]    = useState('square');
  const [markerStyle, setMarkerStyle] = useState('square');
  const [color,       setColor]       = useState('#000000');
  const [bgColor,     setBgColor]     = useState('#ffffff');
  const [frameStyle,  setFrameStyle]  = useState<FrameStyle>('none');
  const [frameText,   setFrameText]   = useState('SCAN ME');
  const [frameColor,  setFrameColor]  = useState('#10b981');

  const buildContent = (): string => {
    switch (qrType) {
      case 'URL':    return url;
      case 'Text':   return text;
      case 'Email':  return `mailto:${email}`;
      case 'Phone':  return `tel:${phone}`;
      case 'SMS':    return `smsto:${smsPhone}:${smsMsg}`;
      case 'WiFi':   return `WIFI:T:${wifiType};S:${wifiSsid};P:${wifiPass};;`;
      case 'vCard':  return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcName}\nTEL:${vcPhone}\nEMAIL:${vcEmail}\nORG:${vcCompany}\nEND:VCARD`;
      default:       return '';
    }
  };

  const previewUrl = buildContent() || 'https://trueqr.co';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const destination_url = buildContent();
    if (!destination_url) { setError('Fill in the required fields'); setLoading(false); return; }

    try {
      const res = await fetch('/api/qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination_url,
          style_config: { dotStyle, markerStyle, color, bgColor, frameStyle, frameText, frameColor },
        }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed'); }
      const data = await res.json();
      setCreatedQR({ slug: data.slug });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (createdQR) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-6">QR Code Created!</h1>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col items-center gap-4">
            <div className="bg-white p-3 rounded-lg">
              <QRCodeFrame
                url={`https://trueqr.co/r/${createdQR.slug}`}
                styleConfig={{ dotStyle, markerStyle, color, bgColor, frameStyle, frameText, frameColor }}
                size={220}
              />
            </div>
            <p className="text-gray-400 text-sm font-mono">trueqr.co/r/{createdQR.slug}</p>
            <div className="flex gap-3">
              <button onClick={() => router.push('/dashboard')} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium">Dashboard</button>
              <button onClick={() => setCreatedQR(null)} className="px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium">Create Another</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">New QR Code</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type picker */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <div className="flex flex-wrap gap-2">
                {(['URL','Text','Email','Phone','SMS','WiFi','vCard'] as QRType[]).map(t => (
                  <button key={t} type="button" onClick={() => setQrType(t)}
                    className={`px-3 py-1.5 rounded text-sm border ${qrType===t ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            {qrType==='URL' && (
              <input type="url" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://example.com" required
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
            )}
            {qrType==='Text' && (
              <textarea value={text} onChange={e=>setText(e.target.value)} rows={3} placeholder="Enter text…"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
            )}
            {qrType==='Email' && (
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
            )}
            {qrType==='Phone' && (
              <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 000 0000"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
            )}
            {qrType==='SMS' && (
              <div className="space-y-2">
                <input type="tel" value={smsPhone} onChange={e=>setSmsPhone(e.target.value)} placeholder="Phone"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <input type="text" value={smsMsg} onChange={e=>setSmsMsg(e.target.value)} placeholder="Message"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
              </div>
            )}
            {qrType==='WiFi' && (
              <div className="space-y-2">
                <input type="text" value={wifiSsid} onChange={e=>setWifiSsid(e.target.value)} placeholder="Network name (SSID)"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <input type="text" value={wifiPass} onChange={e=>setWifiPass(e.target.value)} placeholder="Password"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <select value={wifiType} onChange={e=>setWifiType(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none">
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None</option>
                </select>
              </div>
            )}
            {qrType==='vCard' && (
              <div className="space-y-2">
                {[['Name',vcName,setVcName],['Phone',vcPhone,setVcPhone],['Email',vcEmail,setVcEmail],['Company',vcCompany,setVcCompany]].map(([ph,val,set]) => (
                  <input key={ph as string} type="text" value={val as string} onChange={e=>(set as any)(e.target.value)} placeholder={ph as string}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                ))}
              </div>
            )}

            {/* Dot style */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Dot Style</label>
              <div className="grid grid-cols-3 gap-2">
                {DOT_STYLES.map(s => (
                  <button key={s.id} type="button" onClick={() => setDotStyle(s.id)}
                    className={`px-2 py-2 rounded text-xs border ${dotStyle===s.id ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600'}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Marker style */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Marker Style</label>
              <div className="grid grid-cols-3 gap-2">
                {MARKER_STYLES.map(s => (
                  <button key={s.id} type="button" onClick={() => setMarkerStyle(s.id)}
                    className={`px-2 py-2 rounded text-xs border ${markerStyle===s.id ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600'}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Foreground</label>
                <input type="color" value={color} onChange={e=>setColor(e.target.value)}
                  className="w-full h-10 rounded border border-gray-700 bg-gray-900 cursor-pointer" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Background</label>
                <input type="color" value={bgColor} onChange={e=>setBgColor(e.target.value)}
                  className="w-full h-10 rounded border border-gray-700 bg-gray-900 cursor-pointer" />
              </div>
            </div>

            {/* Frame style */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Frame</label>
              <div className="grid grid-cols-3 gap-2">
                {FRAME_STYLES.map(s => (
                  <button key={s.id} type="button" onClick={() => setFrameStyle(s.id as FrameStyle)}
                    className={`px-2 py-2 rounded text-xs border ${
                      frameStyle === s.id
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                        : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600'
                    }`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {frameStyle !== 'none' && (
              <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Frame Text</label>
                  <input type="text" value={frameText} onChange={e => setFrameText(e.target.value)}
                    placeholder="SCAN ME" maxLength={24}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Frame Color</label>
                  <input type="color" value={frameColor} onChange={e => setFrameColor(e.target.value)}
                    className="w-12 h-10 rounded border border-gray-700 bg-gray-900 cursor-pointer" />
                </div>
              </div>
            )}

            {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 px-3 py-2 rounded">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-lg font-semibold text-white">
              {loading ? 'Creating…' : 'Create QR Code'}
            </button>
          </form>

          {/* Live preview */}
          <div>
            <div className="text-sm font-medium text-gray-300 mb-2">Live Preview</div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-center sticky top-8">
              <div className="bg-white p-2 rounded">
                <QRCodeFrame url={previewUrl} styleConfig={{ dotStyle, markerStyle, color, bgColor, frameStyle, frameText, frameColor }} size={220} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
