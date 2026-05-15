import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase-admin';

type LandingLink = { label: string; url: string };
type LandingConfig = {
  title?: string;
  subtitle?: string;
  bgColor?: string;
  accentColor?: string;
  links?: LandingLink[];
};

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
  return { title: qr?.landing_config?.title || 'TrueQR Links' };
}

export default async function LinkLandingPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const qr = await fetchQR(slug);

  if (!qr || !qr.is_active) redirect('https://trueqr.co');

  const config: LandingConfig = qr.landing_config ?? {};
  const bg     = config.bgColor    || '#0d0d1a';
  const accent = config.accentColor || '#10b981';
  const links  = config.links ?? [];

  // Increment scan count (fire-and-forget — ok for server component)
  void supabaseAdmin
    .from('qr_codes')
    .update({ scan_count: (qr.scan_count ?? 0) + 1 })
    .eq('id', qr.id)
    .then(() => {});

  return (
    <main className="min-h-screen w-full px-6 py-12" style={{ backgroundColor: bg }}>
      <div className="max-w-sm mx-auto flex flex-col items-center gap-3">
        {config.title && (
          <h1 className="text-3xl font-bold text-white text-center tracking-tight">
            {config.title}
          </h1>
        )}
        {config.subtitle && (
          <p className="text-gray-400 text-center text-sm mt-1">{config.subtitle}</p>
        )}
        <div className="w-full flex flex-col gap-3 mt-6">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl text-center font-semibold text-white shadow hover:opacity-90 transition-opacity"
              style={{ backgroundColor: accent }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-gray-700 text-xs mt-8">Powered by TrueQR</p>
      </div>
    </main>
  );
}
