import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://trueqr.co'),
  title: {
    default: 'TrueQR — Free QR Code Generator. No Tricks, No Expiration.',
    template: '%s | TrueQR',
  },
  description:
    'Generate permanent, free QR codes instantly. No account required. No expiration. Static QR codes are free forever — URL, WiFi, vCard, email, phone, and text.',
  keywords: [
    'QR code generator',
    'free QR code',
    'static QR code',
    'WiFi QR code',
    'vCard QR code',
    'no expiration QR code',
    'free QR code generator no sign up',
  ],
  authors: [{ name: 'TrueQR' }],
  verification: {
    google: 'p4j3QlFFQFUy2fN6WTWEW52zj6SHuvZFz8AkFhthT8s',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trueqr.co',
    siteName: 'TrueQR',
    title: 'TrueQR — Free QR Code Generator. No Tricks, No Expiration.',
    description:
      'Generate permanent, free QR codes instantly. No account required. No expiration.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrueQR — Free QR Code Generator. No Tricks, No Expiration.',
    description:
      'Generate permanent, free QR codes instantly. No account required. No expiration.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
