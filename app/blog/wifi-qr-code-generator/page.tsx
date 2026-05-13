import Footer from '@/components/Footer';

export const metadata = {
  title: 'WiFi QR Code Generator: Share Your Password Without Typing It — TrueQR',
  description:
    'A WiFi QR code lets guests connect to your network in one tap — no password to find, no typos. Learn how WiFi QR codes work and generate one free with TrueQR.',
  openGraph: {
    title: 'WiFi QR Code Generator: Share Your Password Without Typing It',
    description:
      'Generate a free WiFi QR code. Guests scan and connect instantly — no password required. Works on iPhone and Android. No account, no expiry.',
    type: 'article',
    url: 'https://trueqr.co/blog/wifi-qr-code-generator',
  },
};

export default function WifiQRCodeGeneratorPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <article className="max-w-2xl mx-auto px-4 pt-16 pb-20">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-gray-400 transition-colors">TrueQR</a>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Blog</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">WiFi QR Code Generator</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight">
            WiFi QR Code Generator: Let Guests Connect With One Tap
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Handing guests a WiFi password is awkward — especially when it&apos;s a 20-character random string. A WiFi QR code solves this completely. Guests scan, and they&apos;re connected. No password, no typos, no &ldquo;is that a zero or an O?&rdquo;
          </p>
        </header>

        {/* How it works */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">How does a WiFi QR code work?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            A WiFi QR code uses a standardized format that encodes your network name (SSID), password, and security type directly into the QR image. When someone scans it with an iPhone (iOS 11+) or Android phone (Android 10+ natively, earlier versions via camera app), the device reads that information and offers to connect to the network automatically.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            The format looks like this under the hood:
          </p>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 mb-4">
            <code className="text-sm text-emerald-400 font-mono">
              WIFI:T:WPA;S:YourNetworkName;P:YourPassword;;
            </code>
          </div>
          <p className="text-gray-300 leading-relaxed">
            This is encoded as a static QR image — the password is baked into the image itself. That means it works completely offline. No server, no app, no internet connection needed to scan it. The phone reads the pattern and connects directly.
          </p>
        </section>

        {/* Device compatibility */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">Device compatibility</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            WiFi QR codes work natively on all modern smartphones:
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-800 mb-4">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-900 border-b border-gray-800">
                  <th className="px-4 py-3 font-semibold text-gray-400">Device</th>
                  <th className="px-4 py-3 font-semibold text-gray-400">How to scan</th>
                  <th className="px-4 py-3 font-semibold text-gray-400">Minimum version</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="bg-gray-950">
                  <td className="px-4 py-3 text-gray-200">iPhone / iPad</td>
                  <td className="px-4 py-3 text-gray-300">Native Camera app</td>
                  <td className="px-4 py-3 text-gray-400">iOS 11+</td>
                </tr>
                <tr className="bg-gray-900">
                  <td className="px-4 py-3 text-gray-200">Android</td>
                  <td className="px-4 py-3 text-gray-300">Native Camera app</td>
                  <td className="px-4 py-3 text-gray-400">Android 10+</td>
                </tr>
                <tr className="bg-gray-950">
                  <td className="px-4 py-3 text-gray-200">Android (older)</td>
                  <td className="px-4 py-3 text-gray-300">Google Lens or QR scanner app</td>
                  <td className="px-4 py-3 text-gray-400">Android 8+</td>
                </tr>
                <tr className="bg-gray-900">
                  <td className="px-4 py-3 text-gray-200">Samsung Galaxy</td>
                  <td className="px-4 py-3 text-gray-300">Samsung Camera or Bixby Vision</td>
                  <td className="px-4 py-3 text-gray-400">Most recent models</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-300 leading-relaxed">
            In practice, any smartphone bought in the last five years will handle WiFi QR codes without needing a separate app. For very old devices, free QR scanner apps from the App Store or Google Play work as a fallback.
          </p>
        </section>

        {/* Security note */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">Is a WiFi QR code secure?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            This is the most common concern — and it&apos;s worth addressing directly. A WiFi QR code encodes your password in a format that any QR scanner can read. That means:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 pl-2">
            <li><strong className="text-white">Anyone with the image can extract the password.</strong> Treat the QR code image itself as sensitive — don&apos;t post it publicly online if you&apos;re concerned about unauthorized access.</li>
            <li><strong className="text-white">It&apos;s still the same access as sharing your password verbally</strong> — just more convenient. The underlying network security hasn&apos;t changed.</li>
            <li><strong className="text-white">For a guest network, it&apos;s ideal.</strong> Most routers support a separate guest SSID. Point your WiFi QR code at that network, and your main network stays private even if the QR code spreads.</li>
          </ul>
          <p className="text-gray-300 leading-relaxed">
            The practical recommendation: use a WiFi QR code freely for guest networks and home use. For a business, use a dedicated guest SSID with its own password, and generate your QR code for that.
          </p>
        </section>

        {/* Where to use */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">Where to place your WiFi QR code</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            The best placements put the code where guests naturally look for WiFi access:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <h3 className="text-sm font-semibold text-emerald-400 mb-1">🏠 Home</h3>
              <p className="text-gray-400 text-sm">Printed card on the fridge, on a frame near the front door, or on a smart display</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <h3 className="text-sm font-semibold text-emerald-400 mb-1">☕ Café / Restaurant</h3>
              <p className="text-gray-400 text-sm">Table tent, counter sign, or printed on the back of the menu</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <h3 className="text-sm font-semibold text-emerald-400 mb-1">🏨 Rental / Hotel</h3>
              <p className="text-gray-400 text-sm">Welcome card, desk card, or inside the welcome binder</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <h3 className="text-sm font-semibold text-emerald-400 mb-1">🏢 Office</h3>
              <p className="text-gray-400 text-sm">Reception desk, conference room wall, or visitor badge lanyard card</p>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed">
            For any printed placement, generate a high-resolution PNG and print at least 1 inch square. Larger is better — it scans faster and more reliably in varied lighting.
          </p>
        </section>

        {/* What happens if password changes */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">What if I change my WiFi password?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Because the password is encoded directly in the QR image, changing your WiFi password means your old QR code stops working. You&apos;ll need to generate a new one.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            This is actually an argument for using a <strong className="text-white">guest network with a stable password</strong> for your QR code. Keep your main network password strong and regularly rotated; keep the guest network password stable so your printed QR codes stay valid.
          </p>
          <p className="text-gray-300 leading-relaxed">
            The good news: generating a new QR code takes about 10 seconds. TrueQR lets you enter your network name, password, and security type, then download the image immediately — no account, no waiting.
          </p>
        </section>

        {/* CTA */}
        <section className="mt-12 bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
          <h2 className="text-xl font-bold mb-3">Generate your WiFi QR code — free</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            Enter your network name, password, and security type. TrueQR generates a static WiFi QR code you can download and print in seconds. No account required. No expiration.
          </p>
          <a
            href="/"
            className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            Create WiFi QR code →
          </a>
          <p className="text-gray-600 text-xs mt-4">
            Works with WPA2, WPA3, and open networks.
          </p>
        </section>

      </article>
      <Footer />
    </main>
  );
}
