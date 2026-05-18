'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

const SUBJECTS = ['Bug report', 'Feedback', 'Billing', 'Other'];

export default function ContactPage() {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <main className="flex-1 max-w-lg mx-auto px-4 py-16 w-full">
        <h1 className="text-3xl font-bold mb-2">Contact Support</h1>
        <p className="text-gray-400 mb-8">Have a question, bug report, or feedback? We&apos;ll get back to you quickly.</p>

        {sent ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">✓</div>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">Message sent!</h2>
            <p className="text-gray-400 mb-6">We&apos;ve received your message and will be in touch soon.</p>
            <Link href="/" className="text-emerald-400 hover:text-emerald-300 underline text-sm">Back to home</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
              <input
                type="text" value={name} onChange={e => setName(e.target.value)}
                required placeholder="Your name"
                className="w-full px-3 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                required placeholder="you@example.com"
                className="w-full px-3 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Subject</label>
              <select
                value={subject} onChange={e => setSubject(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none transition-colors"
              >
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
              <textarea
                value={message} onChange={e => setMessage(e.target.value)}
                required rows={5} maxLength={5000}
                placeholder="Describe your issue or feedback..."
                className="w-full px-3 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none transition-colors resize-none"
              />
              <p className="text-xs text-gray-600 mt-1 text-right">{message.length}/5000</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">{error}</div>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
            >
              {loading ? 'Sending…' : 'Send Message'}
            </button>

            <p className="text-center text-xs text-gray-600">
              Pro users get priority support.{' '}
              <Link href="/pricing" className="text-gray-500 hover:text-gray-400 underline">Upgrade</Link>
            </p>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
