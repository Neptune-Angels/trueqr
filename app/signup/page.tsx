'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase';
import Footer from '@/components/Footer';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/dashboard';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createBrowserClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}${next}` },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setDone(true);
    }
  }

  if (done) {
    return (
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm text-center">
          <div className="text-5xl mb-6">📬</div>
          <h1 className="text-3xl font-bold mb-4">Check your email</h1>
          <p className="text-gray-400">
            We sent a confirmation link to <strong className="text-white">{email}</strong>.
            Click it to activate your account, then{' '}
            <Link href="/login" className="text-emerald-400 underline">sign in</Link>.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-2 text-center">Create account</h1>
        <p className="text-gray-400 text-center mb-8">
          Already have one?{' '}
          <Link href="/login" className="text-emerald-400 hover:text-emerald-300 underline">
            Sign in
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password" required minLength={8} value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              placeholder="8+ characters"
            />
          </div>
          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}
          <button
            type="submit" disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold rounded-lg px-4 py-3 transition-colors"
          >
            {loading ? 'Creating account…' : 'Create free account'}
          </button>
        </form>
        <p className="text-gray-500 text-xs text-center mt-4">
          By signing up you agree to our{' '}
          <Link href="/terms" className="underline hover:text-gray-300">Terms</Link> and{' '}
          <Link href="/privacy" className="underline hover:text-gray-300">Privacy Policy</Link>.
        </p>
      </div>
    </main>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Suspense fallback={<main className="flex-1" />}>
        <SignupForm />
      </Suspense>
      <Footer />
    </div>
  );
}
