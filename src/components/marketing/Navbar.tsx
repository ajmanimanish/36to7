'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/why-36to7', label: 'Why 36to7' },
    { href: '/framework/36-guna', label: 'The 36 Guna' },
    { href: '/framework/7-vows', label: 'The 7 Vows' },
    { href: '/philosophy', label: 'Philosophy' },
    { href: '/faq', label: 'FAQ' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-canvas-ivory/90 backdrop-blur-md border-b border-canvas-border transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif-title text-2xl md:text-3xl font-semibold tracking-tight text-plum group-hover:opacity-90 transition-opacity">
            36<span className="text-terracotta">to</span>7
          </span>
          <span className="hidden sm:inline-block text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-plum/5 text-plum border border-plum/10">
            Private Companion
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-plum font-semibold border-b-2 border-terracotta pb-0.5'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/auth/sign-in"
            className="text-sm font-medium text-ink-muted hover:text-plum transition-colors px-3 py-2"
          >
            Sign in
          </Link>
          <Link
            href="/auth/sign-up"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-canvas-paper bg-plum hover:bg-plum-hover px-4 py-2.5 rounded-xl transition-all shadow-journal"
          >
            <span>Begin journey</span>
            <Sparkles className="w-3.5 h-3.5 opacity-80 text-terracotta" />
          </Link>
        </div>
      </div>
    </header>
  );
}
