import Footer from '@/components/Footer';

export const metadata = {
  title: 'Instagram QR Code: Share Your Profile With One Scan — TrueQR',
  description:
    'Create a free QR code that links directly to your Instagram profile. Works for personal accounts, creators, and businesses. No account needed, no expiry.',
  openGraph: {
    title: 'Instagram QR Code: Share Your Profile With One Scan',
    description:
      'Generate a free QR code for your Instagram profile. Print it, share it, link it anywhere. Permanent, no watermark, no account required.',
    type: 'article',
    url: 'https://trueqr.co/blog/qr-code-instagram',
  },
};

export default function QRCodeInstagramPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <article className="max-w-2xl mx-auto px-4 pt-16 pb-20">

        <nav className="text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-gray-400 transition-colors">TrueQR</a>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Blog</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Instagram QR Code</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Instagram QR Code: Send People Straight to Your Profile
          </h1>
          <p className="text-gray-400 text-lg">
            Whether you&apos;re a creator, brand, or local business, a QR code is the fastest way to convert an offline audience into Instagram followers.
          </p>
        </header>

        <div className="prose prose-invert prose-gray max-w-none space-y-6 text-gray-300 leading-relaxed">

          <p>
            Telling someone your Instagram handle in person is friction. They have to open the app, search your name, hope they spelled it right, and find the right account among possibly dozens of similar ones. A QR code removes all of that — one scan, they&apos;re on your profile.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">How to create a QR code for your Instagram profile</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Open Instagram and go to your profile</li>
            <li>Copy your profile URL — it&apos;s in the format <code className="text-indigo-400 bg-gray-900 px-1 rounded">instagram.com/yourusername</code></li>
            <li>Go to <a href="/" className="text-indigo-400 hover:text-indigo-300 underline">trueqr.co</a></li>
            <li>Select <strong className="text-white">URL</strong>, paste your Instagram profile link</li>
            <li>Customize colors or add your logo if you want</li>
            <li>Download and use anywhere</li>
          </ol>

          <h2 className="text-xl font-semibold text-white mt-8">Where to use your Instagram QR code</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Business cards:</strong> The most natural place. Anyone who gets your card can follow you in one scan.</li>
            <li><strong className="text-white">Packaging and products:</strong> Brands put Instagram QR codes on packaging to build community around buyers.</li>
            <li><strong className="text-white">In-store signage:</strong> A small sign near the register — "Follow us on Instagram for deals" — with a QR code converts foot traffic to followers.</li>
            <li><strong className="text-white">Event tables and booths:</strong> Trade shows, pop-ups, markets — if you&apos;re meeting people in person, a QR code to your Instagram is low-effort networking.</li>
            <li><strong className="text-white">Flyers and posters:</strong> Physical promotional material that also drives your digital following.</li>
            <li><strong className="text-white">Email signatures:</strong> Link your QR code image in your email signature for anyone reading on mobile.</li>
            <li><strong className="text-white">Restaurant menus:</strong> If your restaurant posts food photos, a follow QR code on the menu captures diners who are already enjoying their experience.</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8">Does Instagram have a built-in QR code?</h2>
          <p>
            Yes — Instagram has a native &quot;Nametag&quot; feature that generates a stylized code within the app. It works, but with limitations: it&apos;s only scannable through the Instagram app itself, and you can&apos;t customize the look for your brand or print it cleanly at high resolution.
          </p>
          <p>
            A URL-based QR code generated with TrueQR is scannable by any smartphone camera app — no Instagram app required. That&apos;s a meaningful difference when your audience is at a point-of-sale or event where they might not have Instagram open.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">Customizing your Instagram QR code</h2>
          <p>
            TrueQR lets you match the QR code to your brand:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Color:</strong> Use your brand&apos;s primary color for the code dots and pattern — or go with Instagram&apos;s gradient purple/orange if that fits your look.</li>
            <li><strong className="text-white">Logo:</strong> Embed your profile photo or brand logo in the center of the QR code. It&apos;s immediately recognizable and reinforces brand identity.</li>
            <li><strong className="text-white">Size:</strong> Download at the resolution you need — small for digital use, large for print.</li>
          </ul>
          <p>
            All customizations are free. No upgrade needed.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">Will this QR code expire?</h2>
          <p>
            No. TrueQR generates static QR codes — the URL is encoded directly into the image. There&apos;s no server or redirect involved. The code works for as long as your Instagram profile URL stays the same (which it does as long as your username doesn&apos;t change).
          </p>
          <p>
            Many QR code generators advertise &quot;free&quot; codes that actually stop working after 30–90 days unless you pay. That&apos;s a bad experience — especially if you&apos;ve already printed materials. TrueQR static codes have no expiration, period.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">Tracking scans on your Instagram QR code</h2>
          <p>
            Static QR codes don&apos;t have built-in scan tracking — because they&apos;re a direct link with no redirect server in the middle. If you want to track how many times your QR code is scanned, there are two options:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">UTM parameters:</strong> Append a UTM tag to your Instagram URL (e.g., <code className="text-indigo-400 bg-gray-900 px-1 rounded text-xs">instagram.com/yourusername?utm_source=qr</code>) and track in Google Analytics or Instagram Insights.</li>
            <li><strong className="text-white">Dynamic QR codes:</strong> TrueQR&apos;s Pro plan includes dynamic QR codes with built-in scan analytics. You can see scan count, timing, and geography without adding UTM tags.</li>
          </ul>

          <div className="mt-12 p-6 bg-gray-900 rounded-xl border border-gray-800 text-center">
            <p className="text-white font-semibold text-lg mb-2">Create your Instagram QR code — free</p>
            <p className="text-gray-400 mb-4 text-sm">No account. Permanent. Download in seconds.</p>
            <a
              href="/"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Generate QR Code →
            </a>
          </div>

        </div>
      </article>
      <Footer />
    </main>
  );
}
