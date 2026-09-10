'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AuthCard } from '@/components/auth/AuthCard';
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton';
import Link from 'next/link';
import { Mail, Lock, AlertCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const [callbackUrl, setCallbackUrl] = useState('/app/home');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const url = params.get('callbackUrl');
      if (url) setCallbackUrl(url);
    }
  }, []);

  const [mode, setMode] = useState<'password' | 'magic'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [magicSent, setMagicSent] = useState(false);
  const [devMagicUrl, setDevMagicUrl] = useState('');

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error || 'Invalid email or password.');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMagicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to send magic link.');
      } else {
        setMagicSent(true);
        if (data.devMagicUrl) {
          setDevMagicUrl(data.devMagicUrl);
        }
      }
    } catch (err) {
      setError('An error occurred while requesting magic link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your private 36to7 relationship companion."
    >
      <div className="space-y-5">
        {/* Google OAuth Button Above Tab Switcher */}
        <GoogleAuthButton callbackUrl={callbackUrl} label="Continue with Google" />

        {/* Mode Switcher Tabs */}
        <div className="flex bg-canvas-surface p-1 rounded-xl border border-canvas-border text-xs font-medium">
          <button
            type="button"
            onClick={() => { setMode('password'); setError(''); setMagicSent(false); }}
            className={`flex-1 py-2.5 text-center rounded-lg transition-all ${
              mode === 'password'
                ? 'bg-canvas-paper text-plum font-semibold shadow-soft'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Email & Password
          </button>
          <button
            type="button"
            onClick={() => { setMode('magic'); setError(''); setMagicSent(false); }}
            className={`flex-1 py-2.5 text-center rounded-lg transition-all ${
              mode === 'magic'
                ? 'bg-canvas-paper text-plum font-semibold shadow-soft'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Passwordless Magic Link
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-brick/10 border border-brick/20 text-brick text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {mode === 'password' ? (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-ink uppercase tracking-wider">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-ink-quiet absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-canvas-surface border border-canvas-border rounded-xl text-sm focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum text-ink"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-ink uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-terracotta hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-ink-quiet absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-canvas-surface border border-canvas-border rounded-xl text-sm focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum text-ink"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-plum hover:bg-plum-hover text-canvas-paper font-medium text-sm rounded-xl transition-all shadow-journal flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Signing in…</span>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : magicSent ? (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 bg-sage/10 text-sage rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">
              We sent a single-use magic link to <strong>{email}</strong>.
            </p>

            {devMagicUrl && (
              <div className="p-3 bg-amber/10 border border-amber/20 rounded-xl text-left text-xs space-y-1">
                <span className="font-semibold text-amber-900 block">[DEV MODE] Magic Link URL:</span>
                <Link href={devMagicUrl} className="text-plum underline break-all font-mono text-[11px]">
                  {devMagicUrl}
                </Link>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleMagicSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-ink uppercase tracking-wider">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-ink-quiet absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-canvas-surface border border-canvas-border rounded-xl text-sm focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum text-ink"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-terracotta hover:bg-terracotta-hover text-canvas-paper font-medium text-sm rounded-xl transition-all shadow-journal flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Sending magic link…</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Send passwordless link</span>
                </>
              )}
            </button>
          </form>
        )}

        <div className="pt-2 text-center text-xs text-ink-muted border-t border-canvas-border/40">
          <span>Don&apos;t have an account yet? </span>
          <Link href="/auth/sign-up" className="text-plum font-semibold hover:underline">
            Begin your journey
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
