export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8 text-center text-gray-600 text-sm">
      <p className="mb-2">
        © 2026 TrueQR &middot;{' '}
        <a href="/pricing" className="hover:text-gray-400 underline">
          Pricing
        </a>{' '}
        &middot;{' '}
        <a href="/contact" className="hover:text-gray-400 underline">
          Contact
        </a>{' '}
        &middot;{' '}
        <a href="/privacy" className="hover:text-gray-400 underline">
          Privacy Policy
        </a>{' '}
        &middot;{' '}
        <a href="/terms" className="hover:text-gray-400 underline">
          Terms of Service
        </a>{' '}
        &middot;{' '}
        <a
          href="/blog/static-vs-dynamic-qr-code"
          className="hover:text-gray-400 underline"
        >
          Static vs Dynamic Guide
        </a>
      </p>
      <p className="text-gray-700 text-xs">
        Static QR codes generated on TrueQR are free forever. No watermarks. No expiration.
      </p>
    </footer>
  );
}
