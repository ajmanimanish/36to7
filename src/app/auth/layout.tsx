import Link from 'next/link';
import { Lock, ShieldCheck } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-canvas-ivory text-ink">
      <header className="p-6 max-w-5xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="font-serif-title text-2xl font-semibold text-plum">
          36<span className="text-terracotta">to</span>7
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-sage font-medium bg-sage/10 px-3 py-1 rounded-full">
          <Lock className="w-3 h-3" />
          <span>Private by default</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">{children}</main>

      <footer className="p-6 text-center text-xs text-ink-quiet">
        <p>© {new Date().getFullYear()} 36to7. Private relationship companion.</p>
      </footer>
    </div>
  );
}
