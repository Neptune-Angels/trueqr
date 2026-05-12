import QRGenerator from '@/components/QRGenerator';

export const metadata = {
  title: 'TrueQR — Free QR Code Generator. No Tricks, No Expiration.',
  description: 'Generate permanent, free QR codes instantly. No account required. No expiration. We explain exactly what you\'re getting before you generate. Static QR codes are free forever.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-950 border border-emerald-800 text-emerald-400 text-sm px-3 py-1 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          No expiration. No account. No tricks.
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          The honest QR code generator
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-2">
          Static QR codes are <strong className="text-white">free forever</strong> — they encode your URL directly, require no server, and cannot expire.
          No surprises after you print your flyers.
        </p>
        <p className="text-sm text-gray-600 mb-10">
          Dynamic QR codes (editable destination + scan analytics) are a paid subscription. We&apos;ll always tell you which is which.
        </p>
        <QRGenerator />
      </section>

      {/* Trust bar */}
      <section className="border-t border-gray-800 py-8">
        <div className="max-w-3xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          {[
            { label: 'Free static QR codes', sub: 'Permanent. No account.' },
            { label: 'PNG + SVG download', sub: 'Print-ready files.' },
            { label: 'No watermark', sub: 'Ever. On free tier.' },
          ].map(({ label, sub }) => (
            <div key={label}>
              <div className="text-white font-semibold text-sm">{label}</div>
              <div className="text-gray-500 text-xs mt-1">{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why TrueQR */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Why TrueQR?</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'No expiration scam',
              desc: 'Most "free" QR generators create dynamic codes that expire in 7–14 days. You print your materials, the codes break, and you\'re forced to pay. We create static codes that physically cannot expire.',
            },
            {
              title: 'We tell you what you\'re getting',
              desc: 'Before you generate, we explain the difference between static and dynamic QR codes — in plain English. No fine print.',
            },
            {
              title: 'No account for free codes',
              desc: 'Generate, download, done. We don\'t require an email address to hand you a PNG file.',
            },
            {
              title: 'Honest paid features',
              desc: 'Want to change the destination after printing, or see scan analytics? That\'s a $12/mo subscription. No hidden scan caps, no branding on free tier, no bait-and-switch.',
            },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h3 className="font-semibold mb-2 text-white">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-600 text-sm">
        <p>© 2026 TrueQR · <a href="/blog/static-vs-dynamic-qr-code" className="hover:text-gray-400 underline">Static vs Dynamic Guide</a> · <a href="/pricing" className="hover:text-gray-400 underline">Pricing</a></p>
      </footer>
    </main>
  );
}
