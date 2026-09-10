'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AuthCard } from '@/components/auth/AuthCard';
import Link from 'next/link';
import { Lock, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to reset password.');
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!token && !submitted) {
    return (
      <div className="text-center space-y-4">
        <p className="text-sm text-ink-muted">No password reset token was provided.</p>
        <Link href="/auth/forgot-password" className="text-xs font-semibold text-plum hover:underline">
          Request new reset link
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="space-y-4 text-center">
        <div className="w-12 h-12 bg-sage/10 text-sage rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <p className="text-sm text-ink-muted">Your password has been reset successfully.</p>
        <button
          onClick={() => router.push('/auth/sign-in')}
          className="w-full py-3.5 px-4 bg-plum hover:bg-plum-hover text-canvas-paper font-medium text-sm rounded-xl transition-all shadow-journal"
        >
          Sign in with new password
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-brick/10 border border-brick/20 text-brick text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs font-semibold text-ink uppercase tracking-wider">
          New Password (min 8 characters)
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-ink-quiet absolute left-3.5 top-3.5" />
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-2.5 bg-canvas-surface border border-canvas-border rounded-xl text-sm focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum text-ink"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-ink uppercase tracking-wider">
          Confirm New Password
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-ink-quiet absolute left-3.5 top-3.5" />
          <input
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          <span>Updating password…</span>
        ) : (
          <>
            <span>Save new password</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthCard title="Set new password" subtitle="Create a new password for your private account.">
      <Suspense fallback={<div className="text-center py-6 text-xs text-ink-quiet">Loading reset form...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthCard>
  );
}
