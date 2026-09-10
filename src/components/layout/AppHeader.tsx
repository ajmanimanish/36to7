'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Sparkles, Compass, CheckSquare, Home, LogOut, User, Settings } from 'lucide-react';
import { useState } from 'react';

export function AppHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const links = [
    { href: '/app/home', label: 'Home', icon: Home },
    { href: '/app/priorities', label: 'My Priorities', icon: CheckSquare },
    { href: '/app/guna', label: '36 Gunas', icon: Compass },
  ];

  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'User';

  return (
    <header className="sticky top-0 z-40 bg-canvas-ivory/95 backdrop-blur-md border-b border-canvas-border shadow-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/app/home" className="flex items-center gap-2 group">
          <span className="font-serif-title text-xl sm:text-2xl font-semibold tracking-tight text-plum group-hover:opacity-90 transition-opacity">
            36<span className="text-terracotta">to</span>7
          </span>
          <span className="hidden sm:inline-block text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-plum/5 text-plum border border-plum/10">
            Private Space
          </span>
        </Link>

        {/* Main Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-6">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/app/home' && pathname?.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-canvas-surface text-plum font-semibold border border-canvas-border shadow-soft'
                    : 'text-ink-muted hover:text-plum hover:bg-canvas-surface/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-terracotta' : 'text-ink-quiet'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-canvas-border bg-canvas-paper hover:bg-canvas-surface transition-all focus:outline-none"
          >
            <div className="w-7 h-7 rounded-full bg-plum/10 text-plum font-serif-title font-semibold text-xs flex items-center justify-center border border-plum/20">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:inline-block text-xs font-medium text-ink max-w-[100px] truncate">
              {userName}
            </span>
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-canvas-paper border border-canvas-border rounded-xl shadow-journal py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              onClick={() => setDropdownOpen(false)}
            >
              <div className="px-4 py-2 border-b border-canvas-border/60">
                <p className="text-xs font-semibold text-plum truncate">{userName}</p>
                <p className="text-[11px] text-ink-quiet truncate">{session?.user?.email}</p>
              </div>

              <Link
                href="/app/settings"
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-ink-muted hover:text-plum hover:bg-canvas-surface transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Account Settings</span>
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-brick hover:bg-brick/5 transition-colors text-left"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
