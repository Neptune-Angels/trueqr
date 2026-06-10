import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2VYZEH5XZ9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2VYZEH5XZ9');
          `}
        </Script>
        {/* PostHog — only loads when NEXT_PUBLIC_POSTHOG_KEY is set in env. */}
        {process.env.NEXT_PUBLIC_POSTHOG_KEY ? (
          <Script id="posthog" strategy="afterInteractive">{`
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString()+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('${process.env.NEXT_PUBLIC_POSTHOG_KEY}',{api_host: '${process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'}', person_profiles: 'identified_only', capture_pageview: true})
          `}</Script>
        ) : null}
      </body>
    </html>
  );
}
