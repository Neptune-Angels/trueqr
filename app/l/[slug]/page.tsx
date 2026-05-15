import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase-admin';

type LandingLink = { label: string; url: string };
type BusinessHours = { day: string; time: string };

type LinksLandingConfig = {
  type?: 'links';
  title?: string;
  subtitle?: string;
  bgColor?: string;
  accentColor?: string;
  links?: LandingLink[];
};

type BusinessLandingConfig = {
  type: 'business';
  businessName: string;
  tagline?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  hours?: BusinessHours[];
  menuUrl?: string;
  accentColor?: string;
  bgColor?: string;
};

type PdfLandingConfig = { type: 'pdf'; title?: string; description?: string; fileUrl: string; accentColor?: string; bgColor?: string };
type GalleryLandingConfig = { type: 'gallery'; title?: string; description?: string; images: string[]; accentColor?: string; bgColor?: string };
type EventLandingConfig  = { type: 'event';  title: string; date?: string; time?: string; location?: string; description?: string; ctaLabel?: string; ctaUrl?: string; accentColor?: string; bgColor?: string };
type CouponLandingConfig = { type: 'coupon'; title: string; code: string; discount?: string; description?: string; expiresAt?: string; accentColor?: string; bgColor?: string };
type LandingConfig = LinksLandingConfig | BusinessLandingConfig | PdfLandingConfig | GalleryLandingConfig | EventLandingConfig | CouponLandingConfig;

async function fetchQR(slug: string) {
  const { data } = await supabaseAdmin
    .from('qr_codes')
    .select('id, landing_config, scan_count, is_active')
    .eq('slug', slug)
    .single();
  return data as
    | { id: string; landing_config: LandingConfig | null; scan_count: number | null; is_active: boolean }
    | null;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const qr = await fetchQR(slug);
  const cfg = qr?.landing_config;
  if (cfg && cfg.type === 'business') return { title: cfg.businessName };
  return { title: (cfg as LinksLandingConfig | null)?.title || 'TrueQR Links' };
}

function BusinessPage({ config }: { config: BusinessLandingConfig }) {
  const accent = config.accentColor || '#10b981';
  const bg     = config.bgColor     || '#0a0a0f';
  return (
    <main className="min-h-screen w-full" style={{ backgroundColor: bg }}>
      <header className="w-full px-6 py-10 text-center" style={{ backgroundColor: accent }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{config.businessName}</h1>
        {config.tagline && <p className="text-white/80 text-sm sm:text-base mt-2">{config.tagline}</p>}
      </header>
      <div className="max-w-md mx-auto px-6 py-8 flex flex-col gap-6">
        {(config.phone || config.email || config.website) && (
          <section className="flex flex-col gap-2">
            {config.phone && (
              <a href={`tel:${config.phone}`} className="flex items-center gap-3 text-gray-200 hover:text-white py-2 px-3 rounded-xl bg-gray-900/60 hover:bg-gray-900 transition-colors">
                <span>📞</span><span className="font-medium">{config.phone}</span>
              </a>
            )}
            {config.email && (
              <a href={`mailto:${config.email}`} className="flex items-center gap-3 text-gray-200 hover:text-white py-2 px-3 rounded-xl bg-gray-900/60 hover:bg-gray-900 transition-colors break-all">
                <span>✉️</span><span className="font-medium">{config.email}</span>
              </a>
            )}
            {config.website && (
              <a href={config.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-200 hover:text-white py-2 px-3 rounded-xl bg-gray-900/60 hover:bg-gray-900 transition-colors break-all">
                <span>🌐</span><span className="font-medium">{config.website}</span>
              </a>
            )}
          </section>
        )}
        {config.address && (
          <section className="flex items-start gap-3 text-gray-300 py-3 px-3 rounded-xl bg-gray-900/40">
            <span>📍</span><p className="text-sm whitespace-pre-line">{config.address}</p>
          </section>
        )}
        {config.hours && config.hours.length > 0 && (
          <section className="rounded-xl bg-gray-900/40 px-3 py-2">
            <h2 className="text-xs uppercase tracking-wider text-gray-500 px-1 py-2">Hours</h2>
            <table className="w-full text-sm">
              <tbody>
                {config.hours.map((h, i) => (
                  <tr key={i} className="border-t border-gray-800/80 first:border-t-0">
                    <td className="py-2 px-1 text-gray-400">{h.day}</td>
                    <td className="py-2 px-1 text-gray-200 text-right">{h.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
        {config.menuUrl && (
          <a href={config.menuUrl} target="_blank" rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-2xl text-center font-semibold text-white shadow hover:opacity-90 transition-opacity"
            style={{ backgroundColor: accent }}>
            View Menu
          </a>
        )}
        <p className="text-gray-700 text-xs text-center mt-4">Powered by TrueQR</p>
      </div>
    </main>
  );
}

function EventPage({ config }: { config: EventLandingConfig }) {
  const accent = config.accentColor || '#10b981';
  const bg     = config.bgColor     || '#030712';
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: bg }}>
      <div className="w-full max-w-md bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
        <div className="px-6 py-8 text-white" style={{ backgroundColor: accent }}>
          <h1 className="text-2xl font-bold leading-tight">{config.title}</h1>
        </div>
        <div className="p-6 space-y-5">
          {(config.date || config.time) && (
            <div className="flex items-start gap-3 text-gray-200">
              <span style={{ color: accent }}>📅</span>
              <div className="text-sm">
                {config.date && <div className="font-medium">{config.date}</div>}
                {config.time && <div className="text-gray-400">{config.time}</div>}
              </div>
            </div>
          )}
          {config.location && (
            <div className="flex items-start gap-3 text-gray-200">
              <span style={{ color: accent }}>📍</span>
              <div className="text-sm">{config.location}</div>
            </div>
          )}
          {config.description && <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{config.description}</p>}
          {config.ctaUrl && (
            <a href={config.ctaUrl} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-lg font-semibold text-white hover:opacity-90 transition"
              style={{ backgroundColor: accent }}>
              {config.ctaLabel || 'Learn More'}
            </a>
          )}
          <p className="text-gray-700 text-xs text-center">Powered by TrueQR</p>
        </div>
      </div>
    </div>
  );
}

function CouponPage({ config }: { config: CouponLandingConfig }) {
  const accent = config.accentColor || '#10b981';
  const bg     = config.bgColor     || '#030712';
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: bg }}>
      <div className="w-full max-w-md bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 p-8">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-medium text-gray-300">{config.title}</h1>
          {config.discount && <div className="text-5xl font-extrabold tracking-tight" style={{ color: accent }}>{config.discount}</div>}
        </div>
        <div className="my-8 border-2 border-dashed rounded-lg p-5 text-center" style={{ borderColor: accent }}>
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Promo Code</div>
          <div className="text-2xl font-mono font-bold text-white select-all">{config.code}</div>
          <div className="text-xs text-gray-500 mt-2">Tap to copy</div>
        </div>
        {config.description && <p className="text-gray-300 text-sm leading-relaxed text-center mb-4">{config.description}</p>}
        {config.expiresAt && <p className="text-xs text-gray-500 text-center mb-6">Expires: {config.expiresAt}</p>}
        <div className="block w-full text-center py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: accent }}>Redeem Offer</div>
        <p className="text-gray-700 text-xs text-center mt-4">Powered by TrueQR</p>
      </div>
    </div>
  );
}

function PdfPage({ config }: { config: PdfLandingConfig }) {
  const accent = config.accentColor || '#10b981';
  const bg     = config.bgColor     || '#0d0d1a';
  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-10" style={{ backgroundColor: bg }}>
      <div className="w-full max-w-3xl flex flex-col items-center">
        {config.title && <h1 className="text-3xl font-bold text-white text-center mb-2">{config.title}</h1>}
        {config.description && <p className="text-gray-400 text-center mb-6 max-w-xl">{config.description}</p>}
        <div className="w-full rounded-xl overflow-hidden border border-gray-800 bg-gray-900 mb-4" style={{ height: '70vh' }}>
          <iframe src={config.fileUrl} className="w-full h-full" title={config.title || 'PDF'} />
        </div>
        <a href={config.fileUrl} target="_blank" rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition"
          style={{ backgroundColor: accent }}>
          Open PDF
        </a>
        <p className="text-gray-700 text-xs mt-6">Powered by TrueQR</p>
      </div>
    </main>
  );
}

function GalleryPage({ config }: { config: GalleryLandingConfig }) {
  const accent = config.accentColor || '#10b981';
  const bg     = config.bgColor     || '#0d0d1a';
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10" style={{ backgroundColor: bg }}>
      <div className="w-full max-w-2xl">
        {config.title && <h1 className="text-3xl font-bold text-white text-center mb-2" style={{ color: accent }}>{config.title}</h1>}
        {config.description && <p className="text-gray-400 text-center mb-6">{config.description}</p>}
        <div className="grid grid-cols-2 gap-2">
          {(config.images || []).map((src, i) => (
            <a key={i} href={src} target="_blank" rel="noopener noreferrer"
              className="block aspect-square rounded-xl overflow-hidden bg-gray-900 hover:opacity-90 transition">
              <img src={src} alt={`Image ${i+1}`} className="w-full h-full object-cover" />
            </a>
          ))}
        </div>
        <p className="text-gray-700 text-xs text-center mt-8">Powered by TrueQR</p>
      </div>
    </main>
  );
}

export default async function LinkLandingPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const qr = await fetchQR(slug);
  if (!qr || !qr.is_active) redirect('https://trueqr.co');

  const config: LandingConfig = qr.landing_config ?? {};

  void supabaseAdmin
    .from('qr_codes')
    .update({ scan_count: (qr.scan_count ?? 0) + 1 })
    .eq('id', qr.id)
    .then(() => {});

  if (config.type === 'business') return <BusinessPage config={config as BusinessLandingConfig} />;
  if (config.type === 'pdf')      return <PdfPage      config={config as PdfLandingConfig} />;
  if (config.type === 'gallery')  return <GalleryPage  config={config as GalleryLandingConfig} />;
  if (config.type === 'event')    return <EventPage    config={config as EventLandingConfig} />;
  if (config.type === 'coupon')   return <CouponPage   config={config as CouponLandingConfig} />;

  const linksCfg = config as LinksLandingConfig;
  const bg     = linksCfg.bgColor    || '#0d0d1a';
  const accent = linksCfg.accentColor || '#10b981';
  const links  = linksCfg.links ?? [];

  return (
    <main className="min-h-screen w-full px-6 py-12" style={{ backgroundColor: bg }}>
      <div className="max-w-sm mx-auto flex flex-col items-center gap-3">
        {linksCfg.title && <h1 className="text-3xl font-bold text-white text-center tracking-tight">{linksCfg.title}</h1>}
        {linksCfg.subtitle && <p className="text-gray-400 text-center text-sm mt-1">{linksCfg.subtitle}</p>}
        <div className="w-full flex flex-col gap-3 mt-6">
          {links.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl text-center font-semibold text-white shadow hover:opacity-90 transition-opacity"
              style={{ backgroundColor: accent }}>
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-gray-700 text-xs mt-8">Powered by TrueQR</p>
      </div>
    </main>
  );
}
