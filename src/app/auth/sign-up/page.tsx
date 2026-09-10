'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthCard } from '@/components/auth/AuthCard';
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton';
import Link from 'next/link';
import { Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create account.');
      } else {
        router.push('/auth/sign-in?registered=true');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Private by default. Your journey and reflections remain yours."
    >
      <div className="space-y-5">
        {/* Google OAuth Button */}
        <GoogleAuthButton label="Sign up with Google" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-brick/10 border border-brick/20 text-brick text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-ink uppercase tracking-wider">
              Your Name / Preferred Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-ink-quiet absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Manish"
                className="w-full pl-10 pr-4 py-2.5 bg-canvas-surface border border-canvas-border rounded-xl text-sm focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum text-ink"
              />
            </div>
          </div>

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
            <label className="text-xs font-semibold text-ink uppercase tracking-wider">
              Password (min 8 characters)
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-plum hover:bg-plum-hover text-canvas-paper font-medium text-sm rounded-xl transition-all shadow-journal flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Creating account…</span>
            ) : (
              <>
                <span>Create private account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="pt-2 text-center text-xs text-ink-muted">
            <span>Already have an account? </span>
            <Link href="/auth/sign-in" className="text-plum font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </AuthCard>
  );
}
