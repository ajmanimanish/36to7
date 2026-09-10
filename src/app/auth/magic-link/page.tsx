'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AuthCard } from '@/components/auth/AuthCard';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

function MagicLinkConsumeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authenticatedUser, setAuthenticatedUser] = useState<{ id: string; email: string } | null>(null);

  useEffect(() => {
    if (!token) {
      setError('No magic link token provided.');
      setLoading(false);
      return;
    }

    async function authenticateMagicLink() {
      try {
        const res = await fetch('/api/auth/magic-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Magic link is invalid or has already been used.');
        } else {
          setAuthenticatedUser(data.user);
          // Sign in session
          router.push('/app/home');
        }
      } catch (err) {
        setError('An unexpected error occurred during sign in.');
      } finally {
        setLoading(false);
      }
    }

    authenticateMagicLink();
  }, [token, router]);

  if (loading) {
    return (
      <div className="text-center py-8 space-y-3">
        <Sparkles className="w-8 h-8 text-terracotta animate-pulse mx-auto" />
        <p className="text-sm font-medium text-plum">Authenticating your magic link…</p>
        <p className="text-xs text-ink-quiet">Verifying single-use security token.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 text-center">
        <div className="p-3 rounded-xl bg-brick/10 border border-brick/20 text-brick text-xs flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
        <div className="pt-2">
          <Link href="/auth/sign-in" className="text-xs font-semibold text-plum hover:underline">
            Return to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center">
      <div className="w-12 h-12 bg-sage/10 text-sage rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-6 h-6" />
      </div>
      <p className="text-sm font-medium text-plum">Welcome back!</p>
      <p className="text-xs text-ink-muted">Redirecting you to your private dashboard…</p>
    </div>
  );
}

export default function MagicLinkPage() {
  return (
    <AuthCard title="Passwordless Sign In" subtitle="Authenticating your single-use magic link.">
      <Suspense fallback={<div className="text-center py-6 text-xs text-ink-quiet">Loading verification...</div>}>
        <MagicLinkConsumeContent />
      </Suspense>
    </AuthCard>
  );
}
