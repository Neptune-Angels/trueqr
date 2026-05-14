import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'QR Code Guides & Resources | TrueQR Blog',
  description: 'Learn everything about QR codes — static vs dynamic, best practices, use cases, and free generator guides.',
  openGraph: {
    title: 'QR Code Guides & Resources | TrueQR Blog',
    description: 'Learn everything about QR codes — static vs dynamic, best practices, use cases, and free generator guides.',
  },
};

const posts = [
  {
    slug: 'qr-code-generator-no-account',
    title: 'QR Code Generator — No Account, No Email, No Catch',
    description: 'Why most QR generators ask for an account (and why you don\'t need one for a permanent static code).',
    date: 'May 2026',
  },
  {
    slug: 'permanent-qr-code',
    title: 'How to Make a Permanent QR Code That Never Expires',
    description: 'The safe way to print QR codes that will still work years from now — without paying a monthly subscription.',
    date: 'May 2026',
  },
  {
    slug: 'qr-code-menu-restaurant',
    title: 'QR Code for Your Restaurant Menu: Free Permanent Setup',
    description: 'How to set up a menu QR code that never breaks, never expires, and costs nothing monthly.',
    date: 'May 2026',
  },
  {
    slug: 'static-vs-dynamic-qr-code',
    title: 'Static vs Dynamic QR Codes: Which Should You Use?',
    description: 'The definitive guide to understanding the difference — and why static codes are almost always the right choice for personal and small business use.',
    date: 'May 2026',
  },
  {
    slug: 'free-qr-code-generator',
    title: 'The Best Free QR Code Generator (No Tricks, No Expiration)',
    description: 'What "free" actually means in the QR code space, and how TrueQR compares to the alternatives.',
    date: 'May 2026',
  },
  {
    slug: 'qr-code-for-business-card',
    title: 'How to Add a QR Code to Your Business Card',
    description: 'A practical guide to choosing what to encode, print specs, and avoiding the codes-that-expire trap.',
    date: 'May 2026',
  },
  {
    slug: 'wifi-qr-code-generator',
    title: 'WiFi QR Code Generator: Let Guests Connect Instantly',
    description: 'How WiFi QR codes work, device compatibility, and where to place them for maximum convenience.',
    date: 'May 2026',
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto px-4 py-16 w-full">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Blog</span>
        </nav>

        <h1 className="text-4xl font-bold mb-4">QR Code Guides</h1>
        <p className="text-gray-400 mb-12 text-lg">
          Practical guides on QR codes — how they work, when to use them, and how to get the most out of them for free.
        </p>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-emerald-500 transition-colors group"
            >
              <div className="text-xs text-gray-500 mb-2">{post.date}</div>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">{post.description}</p>
              <div className="mt-4 text-emerald-400 text-sm font-medium">Read guide →</div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
