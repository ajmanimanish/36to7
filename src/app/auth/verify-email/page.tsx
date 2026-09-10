import { AuthCard } from '@/components/auth/AuthCard';
import Link from 'next/link';
import { MailCheck, ArrowRight } from 'lucide-react';

export default function VerifyEmailPage() {
  return (
    <AuthCard
      title="Check your inbox"
      subtitle="We have sent a secure sign-in link to your email address."
    >
      <div className="text-center space-y-6">
        <div className="w-12 h-12 bg-sage/10 text-sage rounded-full flex items-center justify-center mx-auto">
          <MailCheck className="w-6 h-6" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed">
          Click the verification or magic link in your email to instantly access your 36to7 account. You can safely close this window once confirmed.
        </p>

        <div className="pt-4 border-t border-canvas-border">
          <Link
            href="/auth/sign-in"
            className="text-xs text-plum font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>Return to Sign In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
