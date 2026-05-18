'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QRCodeFrame, { FRAME_STYLES, type FrameStyle } from '@/components/QRCodeFrame';
import { normalizeUrl, isValidUrl } from '@/lib/url-utils';

type QRType = 'URL' | 'Text' | 'Email' | 'Phone' | 'SMS' | 'WiFi' | 'vCard' | 'Links' | 'Business' | 'PDF' | 'Gallery' | 'Event' | 'Coupon';

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

function DotStylePreview({ id }: { id: string }) {
  const N = 5, CELL = 7, S = 5, PAD = 1;
  const modules: [number, number][] = [];
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++)
      modules.push([c * CELL + PAD, r * CELL + PAD]);
  const rxMap: Record<string, number> = { square: 0, rounded: 1, dots: 2.5, classy: 1.2, 'classy-rounded': 2, 'extra-rounded': 2.5 };
  const rx = rxMap[id] ?? 0;
  const isCircle = id === 'dots';
  return (
    <svg width={35} height={35} viewBox="0 0 35 35" className="shrink-0">
      {modules.map(([x, y], i) =>
        isCircle
          ? <circle key={i} cx={x + S / 2} cy={y + S / 2} r={S / 2} fill="currentColor" />
          : <rect key={i} x={x} y={y} width={S} height={S} rx={rx} fill="currentColor" />
      )}
    </svg>
  );
}

function MarkerPreview({ id }: { id: string }) {
  const outerRx = id === 'square' ? 0 : 5;
  return (
    <svg width={35} height={35} viewBox="0 0 35 35" className="shrink-0">
      <rect x={1} y={1} width={33} height={33} rx={outerRx} fill="none" stroke="currentColor" strokeWidth={4} />
      {id === 'dot'
        ? <circle cx={17.5} cy={17.5} r={8} fill="currentColor" />
        : <rect x={11} y={11} width={13} height={13} rx={outerRx > 0 ? 3 : 0} fill="currentColor" />}
    </svg>
  );
}

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

  // Links / social tree
  const [links,        setLinks]       = useState<{ label: string; url: string }[]>([{ label: '', url: '' }]);
  const [pageTitle,    setPageTitle]   = useState('');
  const [pageSubtitle, setPageSubtitle]= useState('');
  const [accentColor,  setAccentColor] = useState('#10b981');

  // PDF / Gallery uploads
  const [pdfFile,      setPdfFile]      = useState<File | null>(null);
  const [pdfTitle,     setPdfTitle]     = useState('');
  const [pdfDesc,      setPdfDesc]      = useState('');
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryDesc,  setGalleryDesc]  = useState('');
  const [uploading,    setUploading]    = useState(false);

  // Event
  const [evtTitle,    setEvtTitle]    = useState('');
  const [evtDate,     setEvtDate]     = useState('');
  const [evtTime,     setEvtTime]     = useState('');
  const [evtLocation, setEvtLocation] = useState('');
  const [evtDesc,     setEvtDesc]     = useState('');
  const [evtCta,      setEvtCta]      = useState('');
  const [evtCtaUrl,   setEvtCtaUrl]   = useState('');
  const [evtAccent,   setEvtAccent]   = useState('#10b981');

  // Coupon
  const [cpnTitle,    setCpnTitle]    = useState('');
  const [cpnCode,     setCpnCode]     = useState('');
  const [cpnDiscount, setCpnDiscount] = useState('');
  const [cpnDesc,     setCpnDesc]     = useState('');
  const [cpnExpiry,   setCpnExpiry]   = useState('');
  const [cpnAccent,   setCpnAccent]   = useState('#10b981');

  // Business page
  const [bizName,    setBizName]    = useState('');
  const [bizTagline, setBizTagline] = useState('');
  const [bizPhone,   setBizPhone]   = useState('');
  const [bizEmail,   setBizEmail]   = useState('');
  const [bizWebsite, setBizWebsite] = useState('');
  const [bizAddress, setBizAddress] = useState('');
  const [bizMenuUrl, setBizMenuUrl] = useState('');
  const [bizAccent,  setBizAccent]  = useState('#10b981');
  const [bizHours,   setBizHours]   = useState<{ day: string; time: string }[]>([{ day: '', time: '' }]);

  // Style
  const [dotStyle,    setDotStyle]    = useState('square');
  const [markerStyle, setMarkerStyle] = useState('square');
  const [color,       setColor]       = useState('#000000');
  const [bgColor,     setBgColor]     = useState('#ffffff');
  const [frameStyle,  setFrameStyle]  = useState<FrameStyle>('none');
  const [frameText,   setFrameText]   = useState('SCAN ME');
  const [frameColor,  setFrameColor]  = useState('#10b981');

  // Attribution
  const [showAttribution, setShowAttribution] = useState(false);
  const [utmSource,   setUtmSource]   = useState('');
  const [utmMedium,   setUtmMedium]   = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');

  // AI Builder
  const [showAI,    setShowAI]    = useState(false);
  const [aiPrompt,  setAiPrompt]  = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [aiError,   setAiError]   = useState('');

  const buildContent = (): string => {
    switch (qrType) {
      case 'URL':    return normalizeUrl(url);
      case 'Text':   return text;
      case 'Email':  return `mailto:${email}`;
      case 'Phone':  return `tel:${phone}`;
      case 'SMS':    return `smsto:${smsPhone}:${smsMsg}`;
      case 'WiFi':   return `WIFI:T:${wifiType};S:${wifiSsid};P:${wifiPass};;`;
      case 'vCard':  return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcName}\nTEL:${vcPhone}\nEMAIL:${vcEmail}\nORG:${vcCompany}\nEND:VCARD`;
      case 'Links':    return '__links__';
      case 'Business':  return '__links__';
      case 'PDF':        return '__links__';
      case 'Gallery':    return '__links__';
      case 'Event':      return '__links__';
      case 'Coupon':     return '__links__';
      default:           return '';
    }
  };

  const previewUrl = buildContent() || 'https://trueqr.co';

  const uploadFile = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append('file', file);
    const r = await fetch('/api/upload', { method: 'POST', body: fd });
    if (!r.ok) { const d = await r.json(); throw new Error(d.error || 'Upload failed'); }
    return (await r.json()).url;
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiError('');
    setAiMessage('');
    try {
      const res = await fetch('/api/ai-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAiError(data.error || 'Something went wrong');
        return;
      }
      // Apply AI result to form state
      const { qrType: t, name: n, fields: f = {}, style: s = {}, message: msg } = data;
      if (t) setQrType(t as QRType);
      if (n) {} // name auto-generated on submit
      // Content fields
      if (f.url)         setUrl(f.url);
      if (f.text)        setText(f.text);
      if (f.email)       setEmail(f.email);
      if (f.phone)       setPhone(f.phone);
      if (f.smsPhone)    setSmsPhone(f.smsPhone);
      if (f.smsMsg)      setSmsMsg(f.smsMsg);
      if (f.wifiSsid)    setWifiSsid(f.wifiSsid);
      if (f.wifiPass)    setWifiPass(f.wifiPass);
      if (f.wifiType)    setWifiType(f.wifiType);
      if (f.vcName)      setVcName(f.vcName);
      if (f.vcPhone)     setVcPhone(f.vcPhone);
      if (f.vcEmail)     setVcEmail(f.vcEmail);
      if (f.vcCompany)   setVcCompany(f.vcCompany);
      if (f.pageTitle)   setPageTitle(f.pageTitle);
      if (f.pageSubtitle) setPageSubtitle(f.pageSubtitle);
      if (f.accentColor) setAccentColor(f.accentColor);
      if (Array.isArray(f.links) && f.links.length) setLinks(f.links);
      if (f.bizName)     setBizName(f.bizName);
      if (f.bizTagline)  setBizTagline(f.bizTagline);
      if (f.bizPhone)    setBizPhone(f.bizPhone);
      if (f.bizEmail)    setBizEmail(f.bizEmail);
      if (f.bizWebsite)  setBizWebsite(f.bizWebsite);
      if (f.bizAddress)  setBizAddress(f.bizAddress);
      if (f.evtTitle)    setEvtTitle(f.evtTitle);
      if (f.evtDate)     setEvtDate(f.evtDate);
      if (f.evtTime)     setEvtTime(f.evtTime);
      if (f.evtLocation) setEvtLocation(f.evtLocation);
      if (f.evtDesc)     setEvtDesc(f.evtDesc);
      if (f.evtCta)      setEvtCta(f.evtCta);
      if (f.evtCtaUrl)   setEvtCtaUrl(f.evtCtaUrl);
      if (f.cpnTitle)    setCpnTitle(f.cpnTitle);
      if (f.cpnCode)     setCpnCode(f.cpnCode);
      if (f.cpnDiscount) setCpnDiscount(f.cpnDiscount);
      if (f.cpnDesc)     setCpnDesc(f.cpnDesc);
      if (f.cpnExpiry)   setCpnExpiry(f.cpnExpiry);
      // Style
      if (s.color)       setColor(s.color);
      if (s.bgColor)     setBgColor(s.bgColor);
      if (s.dotStyle)    setDotStyle(s.dotStyle);
      if (s.markerStyle) setMarkerStyle(s.markerStyle);
      if (msg) setAiMessage(msg);
    } catch {
      setAiError('Failed to reach the AI. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const destination_url = buildContent();
    if (!destination_url) { setError('Fill in the required fields'); setLoading(false); return; }

    try {
      let landing_config: Record<string, unknown> | undefined;

      if (qrType === 'PDF') {
        if (!pdfFile) { setError('Select a PDF file'); setLoading(false); return; }
        setUploading(true);
        const fileUrl = await uploadFile(pdfFile);
        setUploading(false);
        landing_config = { type: 'pdf', title: pdfTitle, description: pdfDesc, fileUrl };
      } else if (qrType === 'Gallery') {
        if (!galleryFiles.length) { setError('Select at least one image'); setLoading(false); return; }
        setUploading(true);
        const images = await Promise.all(galleryFiles.map(uploadFile));
        setUploading(false);
        landing_config = { type: 'gallery', title: galleryTitle, description: galleryDesc, images };
      } else if (qrType === 'Links') {
        landing_config = { title: pageTitle, subtitle: pageSubtitle, accentColor, links: links.filter(l => l.label && l.url) };
      } else if (qrType === 'Business') {
        landing_config = { type: 'business', businessName: bizName, tagline: bizTagline, phone: bizPhone, email: bizEmail, website: bizWebsite, address: bizAddress, menuUrl: bizMenuUrl, hours: bizHours.filter(h => h.day && h.time), accentColor: bizAccent };
      } else if (qrType === 'Event') {
        landing_config = { type: 'event', title: evtTitle, date: evtDate, time: evtTime, location: evtLocation, description: evtDesc, ctaLabel: evtCta, ctaUrl: evtCtaUrl, accentColor: evtAccent };
      } else if (qrType === 'Coupon') {
        landing_config = { type: 'coupon', title: cpnTitle, code: cpnCode, discount: cpnDiscount, description: cpnDesc, expiresAt: cpnExpiry, accentColor: cpnAccent };
      }

      const res = await fetch('/api/qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination_url,
          style_config: { dotStyle, markerStyle, color, bgColor, frameStyle, frameText, frameColor },
          ...(landing_config ? { landing_config } : {}),
          ...(utmSource   ? { utm_source: utmSource }     : {}),
          ...(utmMedium   ? { utm_medium: utmMedium }     : {}),
          ...(utmCampaign ? { utm_campaign: utmCampaign } : {}),
        }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed'); }
      const data = await res.json();
      setCreatedQR({ slug: data.slug });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setUploading(false);
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
            {/* AI Builder */}
            <div className="border border-indigo-500/30 rounded-xl overflow-hidden bg-indigo-500/5">
              <button type="button" onClick={() => { setShowAI(v => !v); setAiError(''); setAiMessage(''); }}
                className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-indigo-500/10 transition-colors">
                <span className="flex items-center gap-2 font-medium text-indigo-300">
                  <span>✨</span> Build with AI
                  <span className="text-xs font-normal text-indigo-400/70 bg-indigo-500/10 px-2 py-0.5 rounded-full">Pro</span>
                </span>
                <span className="text-indigo-400 text-lg leading-none">{showAI ? '−' : '+'}</span>
              </button>
              {showAI && (
                <div className="px-4 pb-4 border-t border-indigo-500/20">
                  <p className="text-xs text-indigo-300/60 pt-3 mb-3">Describe what you want in plain English — I&apos;ll set it up for you.</p>
                  <div className="space-y-2 mb-3">
                    <p className="text-xs text-gray-600">Examples:</p>
                    {[
                      'WiFi QR for my coffee shop Brew House, password: coffee123',
                      'Business card for Sarah Chen, CEO at Acme, sarah@acme.com, +1 415 555 0100',
                      'Coupon: 20% off summer sale, code SUMMER20, expires Aug 31',
                      'Event: Grand Opening July 4th at 5pm, 123 Main St, RSVP at acme.com/rsvp',
                    ].map(ex => (
                      <button key={ex} type="button"
                        onClick={() => setAiPrompt(ex)}
                        className="block w-full text-left text-xs text-indigo-300/50 hover:text-indigo-300 px-2 py-1 rounded hover:bg-indigo-500/10 transition-colors truncate">
                        &ldquo;{ex}&rdquo;
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={aiPrompt}
                    onChange={e => setAiPrompt(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleAIGenerate(); }}
                    rows={3}
                    placeholder="e.g. WiFi QR for my restaurant, SSID: TacoShack, password: tacos2024"
                    className="w-full px-3 py-2.5 bg-gray-900 border border-indigo-500/30 rounded-lg text-white text-sm placeholder-gray-600 focus:border-indigo-500 focus:outline-none resize-none"
                  />
                  <div className="flex items-center gap-3 mt-2">
                    <button type="button" onClick={handleAIGenerate} disabled={aiLoading || !aiPrompt.trim()}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors">
                      {aiLoading ? (
                        <><span className="animate-spin">⟳</span> Thinking…</>
                      ) : (
                        <><span>✨</span> Generate</>
                      )}
                    </button>
                    <span className="text-xs text-gray-600">⌘+Enter to generate</span>
                  </div>
                  {aiMessage && (
                    <div className="mt-3 flex items-start gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg px-3 py-2.5">
                      <span className="text-indigo-400 shrink-0">✓</span>
                      <p className="text-sm text-indigo-200">{aiMessage}</p>
                    </div>
                  )}
                  {aiError && (
                    <p className="mt-2 text-sm text-red-400">{aiError}</p>
                  )}
                </div>
              )}
            </div>

            {/* Type picker */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <div className="flex flex-wrap gap-2">
                {(['URL','Text','Email','Phone','SMS','WiFi','vCard','Links','Business','PDF','Gallery','Event','Coupon'] as QRType[]).map(t => (
                  <button key={t} type="button" onClick={() => setQrType(t)}
                    className={`px-3 py-1.5 rounded text-sm border ${qrType===t ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            {qrType==='URL' && (
              <div>
                <input
                  type="text"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  onBlur={e => { const n = normalizeUrl(e.target.value); if (n !== e.target.value) setUrl(n); }}
                  placeholder="e.g. trueqr.co, www.google.com, or https://example.com"
                  required
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none"
                />
                {url && !url.startsWith('http') && normalizeUrl(url) !== url && (
                  <p className="mt-1 text-xs text-gray-500">
                    Will use: <span className="text-emerald-400">{normalizeUrl(url)}</span>
                  </p>
                )}
                {url && !isValidUrl(url) && normalizeUrl(url) !== url && (
                  <p className="mt-1 text-xs text-red-400">Doesn&apos;t look like a valid URL</p>
                )}
              </div>
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

            {qrType==='Links' && (
              <div className="space-y-3">
                <input type="text" value={pageTitle} onChange={e=>setPageTitle(e.target.value)} placeholder="Page title (e.g. John's Links)"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <input type="text" value={pageSubtitle} onChange={e=>setPageSubtitle(e.target.value)} placeholder="Subtitle (optional)"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-300 shrink-0">Button color</label>
                  <input type="color" value={accentColor} onChange={e=>setAccentColor(e.target.value)}
                    className="w-12 h-9 rounded border border-gray-700 bg-gray-900 cursor-pointer" />
                </div>
                <div className="space-y-2">
                  {links.map((link, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={link.label} placeholder="Label"
                        onChange={e => setLinks(links.map((l,j) => j===i ? {...l, label: e.target.value} : l))}
                        className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                      <input type="url" value={link.url} placeholder="https://"
                        onChange={e => setLinks(links.map((l,j) => j===i ? {...l, url: e.target.value} : l))}
                        className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                      {links.length > 1 && (
                        <button type="button" onClick={() => setLinks(links.filter((_,j) => j!==i))}
                          className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-400">×</button>
                      )}
                    </div>
                  ))}
                  {links.length < 10 && (
                    <button type="button" onClick={() => setLinks([...links, {label:'',url:''}])}
                      className="w-full py-2 border border-dashed border-gray-700 hover:border-emerald-500 rounded text-gray-500 hover:text-emerald-300 text-sm">
                      + Add link
                    </button>
                  )}
                </div>
              </div>
            )}

            {qrType==='Business' && (
              <div className="space-y-3">
                <input type="text" value={bizName} onChange={e=>setBizName(e.target.value)} placeholder="Business name *" required
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <input type="text" value={bizTagline} onChange={e=>setBizTagline(e.target.value)} placeholder="Tagline (optional)"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <input type="tel" value={bizPhone} onChange={e=>setBizPhone(e.target.value)} placeholder="Phone"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <input type="email" value={bizEmail} onChange={e=>setBizEmail(e.target.value)} placeholder="Email"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <input type="url" value={bizWebsite} onChange={e=>setBizWebsite(e.target.value)} placeholder="Website (https://)"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <textarea value={bizAddress} onChange={e=>setBizAddress(e.target.value)} placeholder="Address" rows={2}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <input type="url" value={bizMenuUrl} onChange={e=>setBizMenuUrl(e.target.value)} placeholder="Menu URL (optional)"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-300 shrink-0">Brand color</label>
                  <input type="color" value={bizAccent} onChange={e=>setBizAccent(e.target.value)}
                    className="w-12 h-9 rounded border border-gray-700 bg-gray-900 cursor-pointer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Hours</label>
                  <div className="space-y-2">
                    {bizHours.map((h, i) => (
                      <div key={i} className="flex gap-2">
                        <input type="text" value={h.day} placeholder="Day (e.g. Mon-Fri)"
                          onChange={e => setBizHours(bizHours.map((r,j) => j===i ? {...r, day: e.target.value} : r))}
                          className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                        <input type="text" value={h.time} placeholder="e.g. 9am-5pm"
                          onChange={e => setBizHours(bizHours.map((r,j) => j===i ? {...r, time: e.target.value} : r))}
                          className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                        {bizHours.length > 1 && (
                          <button type="button" onClick={() => setBizHours(bizHours.filter((_,j) => j!==i))}
                            className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-400">×</button>
                        )}
                      </div>
                    ))}
                    {bizHours.length < 7 && (
                      <button type="button" onClick={() => setBizHours([...bizHours, {day:'',time:''}])}
                        className="w-full py-2 border border-dashed border-gray-700 hover:border-emerald-500 rounded text-gray-500 hover:text-emerald-300 text-sm">
                        + Add hours row
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {qrType==='Event' && (
              <div className="space-y-3">
                <input type="text" value={evtTitle} onChange={e=>setEvtTitle(e.target.value)} placeholder="Event title *"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" value={evtDate} onChange={e=>setEvtDate(e.target.value)}
                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                  <input type="time" value={evtTime} onChange={e=>setEvtTime(e.target.value)}
                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                </div>
                <input type="text" value={evtLocation} onChange={e=>setEvtLocation(e.target.value)} placeholder="Location"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <textarea value={evtDesc} onChange={e=>setEvtDesc(e.target.value)} rows={3} placeholder="Description"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" value={evtCta} onChange={e=>setEvtCta(e.target.value)} placeholder="Button label (e.g. RSVP)"
                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                  <input type="url" value={evtCtaUrl} onChange={e=>setEvtCtaUrl(e.target.value)} placeholder="Button URL"
                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-300 shrink-0">Accent color</label>
                  <input type="color" value={evtAccent} onChange={e=>setEvtAccent(e.target.value)} className="w-12 h-9 rounded border border-gray-700 bg-gray-900 cursor-pointer" />
                </div>
              </div>
            )}

            {qrType==='Coupon' && (
              <div className="space-y-3">
                <input type="text" value={cpnTitle} onChange={e=>setCpnTitle(e.target.value)} placeholder="Offer title *"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" value={cpnCode} onChange={e=>setCpnCode(e.target.value.toUpperCase())} placeholder="PROMO CODE"
                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white font-mono focus:border-emerald-500 outline-none" />
                  <input type="text" value={cpnDiscount} onChange={e=>setCpnDiscount(e.target.value)} placeholder="e.g. 20% OFF"
                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                </div>
                <textarea value={cpnDesc} onChange={e=>setCpnDesc(e.target.value)} rows={2} placeholder="Description / terms"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-300 shrink-0">Expires</label>
                  <input type="date" value={cpnExpiry} onChange={e=>setCpnExpiry(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                  <label className="text-sm text-gray-300 shrink-0">Color</label>
                  <input type="color" value={cpnAccent} onChange={e=>setCpnAccent(e.target.value)} className="w-12 h-9 rounded border border-gray-700 bg-gray-900 cursor-pointer" />
                </div>
              </div>
            )}

            {qrType==='PDF' && (
              <div className="space-y-3">
                <input type="text" value={pdfTitle} onChange={e=>setPdfTitle(e.target.value)} placeholder="Title (optional)"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <textarea value={pdfDesc} onChange={e=>setPdfDesc(e.target.value)} rows={2} placeholder="Description (optional)"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <label className="block">
                  <span className="text-sm text-gray-300 mb-2 block">PDF File *</span>
                  <input type="file" accept=".pdf,application/pdf"
                    onChange={e => setPdfFile(e.target.files?.[0] ?? null)}
                    className="block w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:bg-emerald-600 file:text-white hover:file:bg-emerald-500" />
                  {pdfFile && <p className="mt-1 text-xs text-gray-500">{pdfFile.name}</p>}
                </label>
                {uploading && <p className="text-xs text-emerald-400">Uploading…</p>}
              </div>
            )}

            {qrType==='Gallery' && (
              <div className="space-y-3">
                <input type="text" value={galleryTitle} onChange={e=>setGalleryTitle(e.target.value)} placeholder="Gallery title (optional)"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <textarea value={galleryDesc} onChange={e=>setGalleryDesc(e.target.value)} rows={2} placeholder="Description (optional)"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-emerald-500 outline-none" />
                <label className="block">
                  <span className="text-sm text-gray-300 mb-2 block">Images * (up to 20)</span>
                  <input type="file" accept="image/*" multiple
                    onChange={e => setGalleryFiles(Array.from(e.target.files ?? []).slice(0, 20))}
                    className="block w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:bg-emerald-600 file:text-white hover:file:bg-emerald-500" />
                  {galleryFiles.length > 0 && <p className="mt-1 text-xs text-gray-500">{galleryFiles.length} image{galleryFiles.length !== 1 ? 's' : ''} selected</p>}
                </label>
                {uploading && <p className="text-xs text-emerald-400">Uploading…</p>}
              </div>
            )}

            {/* Dot style */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Dot Style</label>
              <div className="grid grid-cols-3 gap-2">
                {DOT_STYLES.map(s => (
                  <button key={s.id} type="button" onClick={() => setDotStyle(s.id)}
                    className={`flex flex-col items-center gap-1.5 px-2 py-2.5 rounded text-xs border transition-colors ${dotStyle===s.id ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600'}`}>
                    <DotStylePreview id={s.id} />
                    <span>{s.label}</span>
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
                    className={`flex flex-col items-center gap-1.5 px-2 py-2.5 rounded text-xs border transition-colors ${markerStyle===s.id ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600'}`}>
                    <MarkerPreview id={s.id} />
                    <span>{s.label}</span>
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

            {/* Attribution */}
            <div className="border border-gray-800 rounded-lg overflow-hidden">
              <button type="button" onClick={() => setShowAttribution(v => !v)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-400 hover:text-gray-300 hover:bg-gray-900/50 transition-colors">
                <span className="font-medium">Attribution <span className="text-gray-600 font-normal">(optional)</span></span>
                <span className="text-lg leading-none">{showAttribution ? '−' : '+'}</span>
              </button>
              {showAttribution && (
                <div className="px-4 pb-4 space-y-3 border-t border-gray-800">
                  <p className="text-xs text-gray-600 pt-3">Tag this QR code to track which campaigns, channels, and placements drive scans.</p>
                  <div className="grid grid-cols-1 gap-3">
                    <input type="text" value={utmSource} onChange={e => setUtmSource(e.target.value)}
                      placeholder="Source — e.g. instagram, flyer, email"
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white text-sm placeholder-gray-600 focus:border-emerald-500 outline-none" />
                    <input type="text" value={utmMedium} onChange={e => setUtmMedium(e.target.value)}
                      placeholder="Medium — e.g. social, print, qr"
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white text-sm placeholder-gray-600 focus:border-emerald-500 outline-none" />
                    <input type="text" value={utmCampaign} onChange={e => setUtmCampaign(e.target.value)}
                      placeholder="Campaign — e.g. summer-sale, grand-opening"
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white text-sm placeholder-gray-600 focus:border-emerald-500 outline-none" />
                  </div>
                </div>
              )}
            </div>

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
