import Link from 'next/link';
import { Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-canvas-surface border-t border-canvas-border py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="font-serif-title text-2xl font-semibold text-plum inline-block">
            36<span className="text-terracotta">to</span>7
          </Link>
          <p className="text-sm text-ink-muted max-w-sm leading-relaxed">
            A private, web-first relationship-understanding companion for modern arranged introductions in India.
            From first meeting to the decision to marry.
          </p>
          <div className="flex items-center gap-2 text-xs font-medium text-sage bg-sage/10 px-3 py-1.5 rounded-lg w-fit">
            <Lock className="w-3.5 h-3.5" />
            <span>Private by default · Never a shared score</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-ink uppercase tracking-wider mb-4">Framework</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/framework/36-guna" className="text-ink-muted hover:text-plum transition-colors">
                The 36 Guna
              </Link>
            </li>
            <li>
              <Link href="/framework/7-vows" className="text-ink-muted hover:text-plum transition-colors">
                The 7 Vows
              </Link>
            </li>
            <li>
              <Link href="/why-36to7" className="text-ink-muted hover:text-plum transition-colors">
                Rebuilding Guna Milan
              </Link>
            </li>
            <li>
              <Link href="/philosophy" className="text-ink-muted hover:text-plum transition-colors">
                Our Philosophy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-ink uppercase tracking-wider mb-4">Product & Trust</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/privacy" className="text-ink-muted hover:text-plum transition-colors">
                Privacy Promise
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-ink-muted hover:text-plum transition-colors">
                Frequently Asked Questions
              </Link>
            </li>
            <li>
              <Link href="/auth/sign-in" className="text-ink-muted hover:text-plum transition-colors">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-canvas-border/60 flex flex-col sm:flex-row justify-between items-center text-xs text-ink-quiet gap-4">
        <p>© {new Date().getFullYear()} 36to7. Modern relationship understanding.</p>
        <p className="italic">The user provides the life. 36to7 provides the structure.</p>
      </div>
    </footer>
  );
}
