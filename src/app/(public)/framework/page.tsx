import Link from 'next/link';
import { KOOTAS, GUNAS } from '@/lib/framework-data';
import { ArrowRight, BookOpen, HeartHandshake } from 'lucide-react';
import { getKootaIllustration } from '@/components/illustrations/KootaIllustrations';

export default function FrameworkOverviewPage() {
  return (
    <div className="py-16 px-6 max-w-5xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">
          The 36to7 Framework Architecture
        </span>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-medium text-ink">
          36 Guna for understanding, 7 Vows for commitment.
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          The 36 Guna are a map of mutual understanding, not a compatibility exam. The 7 Vows are sequential milestones earned over time.
        </p>

        {/* Dual Primary Framework Navigation */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <Link
            href="/framework/36-guna"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold text-plum bg-canvas-paper border border-canvas-border hover:bg-canvas-surface px-6 py-3.5 rounded-xl transition-all shadow-journal"
          >
            <BookOpen className="w-4 h-4 text-terracotta" />
            <span>Browse 36 Guna Catalog</span>
          </Link>
          <Link
            href="/framework/7-vows"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold text-plum bg-canvas-paper border border-canvas-border hover:bg-canvas-surface px-6 py-3.5 rounded-xl transition-all shadow-journal"
          >
            <HeartHandshake className="w-4 h-4 text-terracotta" />
            <span>Explore The 7 Vows Path</span>
          </Link>
        </div>
      </div>

      {/* 8 Koota Grid */}
      <div className="space-y-6">
        <h2 className="font-serif-title text-2xl font-semibold text-plum text-center">
          The 8 Koota Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {KOOTAS.map((koota) => {
            const kootaGunas = GUNAS.filter((g) => g.kootaSlug === koota.slug);
            return (
              <div
                key={koota.slug}
                className="bg-canvas-paper p-8 rounded-card border border-canvas-border shadow-journal space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-canvas-surface border border-canvas-border flex items-center justify-center p-1.5 shrink-0">
                        {getKootaIllustration(koota.slug, 'w-9 h-9')}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-terracotta tracking-wider uppercase block">
                          Koota 0{koota.order} ({koota.points} pts)
                        </span>
                        <h2 className="font-serif-title text-2xl font-semibold text-plum">
                          {koota.name}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-ink-muted leading-relaxed">
                    {koota.description}
                  </p>
                  <div className="pt-2 border-t border-canvas-border text-xs space-y-1">
                    <p className="text-ink-quiet line-through decoration-ink-quiet/40">{koota.was}</p>
                    <p className="text-plum font-medium">→ {koota.now}</p>
                  </div>
                </div>

                {/* Sub-gunas list preview */}
                <div className="pt-4 border-t border-canvas-border">
                  <h4 className="text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                    Gunas in {koota.name} ({kootaGunas.length}):
                  </h4>
                  <ul className="space-y-1 text-xs text-ink-muted">
                    {kootaGunas.map((g) => (
                      <li key={g.number} className="flex items-center gap-2">
                        <span className="font-mono text-terracotta text-[10px] w-5">
                          #{g.number}
                        </span>
                        <span>{g.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center pt-8">
        <Link
          href="/auth/sign-up"
          className="inline-flex items-center gap-2 text-base font-medium text-canvas-paper bg-plum hover:bg-plum-hover px-8 py-4 rounded-xl shadow-journal transition-all"
        >
          <span>Start identifying your priorities</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
