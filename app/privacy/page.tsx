import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy',
  description: 'TrueQR Privacy Policy — how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col">
      <div className="max-w-2xl mx-auto px-4 py-16 flex-1">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: May 2026</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              1. What we collect
            </h2>
            <p>
              <strong className="text-white">Free static QR codes:</strong> We
              collect nothing. QR code generation happens entirely in your
              browser using JavaScript. Your URLs, contact details, WiFi
              credentials, and any other content you enter are never transmitted
              to our servers.
            </p>
            <p className="mt-2">
              <strong className="text-white">Paid accounts (Pro/Business):</strong>{' '}
              If you create a paid account, we collect your email address and
              payment information (processed by Stripe — we never see your full
              card number). We also store the dynamic QR codes you create so we
              can redirect scans and provide analytics.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              2. Cookies & analytics
            </h2>
            <p>
              We use minimal, privacy-respecting analytics (page views and
              referrer data only) to understand how people find and use TrueQR.
              We do not use advertising cookies or sell data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              3. Data sharing
            </h2>
            <p>
              We do not sell, rent, or share your personal information with
              third parties, except as required by law or to process payments
              via Stripe.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              4. Data retention
            </h2>
            <p>
              Free users: we retain no data. Paid users: account data is
              retained while your account is active and for 30 days after
              cancellation, after which it is permanently deleted.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">5. Contact</h2>
            <p>
              Questions about this policy? Email us at{' '}
              <a
                href="mailto:privacy@trueqr.com"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                privacy@trueqr.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
