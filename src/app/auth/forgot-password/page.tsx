'use client';

import { useState } from 'react';
import { AuthCard } from '@/components/auth/AuthCard';
import Link from 'next/link';
import { Mail, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [devResetUrl, setDevResetUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to send reset link.');
      } else {
        setSubmitted(true);
        if (data.devResetUrl) {
          setDevResetUrl(data.devResetUrl);
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your account email to receive a password reset link."
    >
      {submitted ? (
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 bg-sage/10 text-sage rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-sm text-ink-muted leading-relaxed">
            If an account exists for <strong>{email}</strong>, a password reset link has been created.
          </p>

          {devResetUrl && (
            <div className="p-3 bg-amber/10 border border-amber/20 rounded-xl text-left text-xs space-y-1">
              <span className="font-semibold text-amber-900 block">[DEV MODE] Reset Link:</span>
              <Link href={devResetUrl} className="text-plum underline break-all font-mono text-[11px]">
                {devResetUrl}
              </Link>
            </div>
          )}

          <div className="pt-4">
            <Link
              href="/auth/sign-in"
              className="text-xs font-semibold text-plum hover:underline inline-flex items-center gap-1"
            >
              <span>Back to Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-brick/10 border border-brick/20 text-brick text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

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
            className="w-full py-3.5 px-4 bg-plum hover:bg-plum-hover text-canvas-paper font-medium text-sm rounded-xl transition-all shadow-journal flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Sending reset link…</span>
            ) : (
              <>
                <span>Send reset link</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="pt-4 text-center text-xs text-ink-muted">
            <Link href="/auth/sign-in" className="text-plum font-semibold hover:underline">
              Return to Sign In
            </Link>
          </div>
        </form>
      )}
    </AuthCard>
  );
}
