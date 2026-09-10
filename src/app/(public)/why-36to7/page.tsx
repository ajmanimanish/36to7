import Link from 'next/link';
import { ArrowRight, CheckCircle, ShieldAlert } from 'lucide-react';
import { KOOTAS } from '@/lib/framework-data';

export default function Why36to7Page() {
  return (
    <div className="py-16 px-6 max-w-5xl mx-auto space-y-16">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">
          Rebuilding Guna Milan
        </span>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-medium text-ink">
          Why 36to7 exists.
        </h1>
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
          The same thirty-six points a Guna Milan chart promised. The same seven vows a wedding asks for. 
          Rebuilt from something warmer and more useful than astrology—the real work of getting to know someone.
        </p>
      </div>

      {/* Was vs Now Comparison Table */}
      <div className="bg-canvas-paper rounded-card border border-canvas-border shadow-journal overflow-hidden">
        <div className="p-6 bg-canvas-surface border-b border-canvas-border">
          <h2 className="font-serif-title text-2xl font-semibold text-plum">
            The Was / Now Reframe Pattern
          </h2>
          <p className="text-sm text-ink-muted">
            How traditional astrological points translate into real psychological and lifestyle alignment.
          </p>
        </div>
        <div className="divide-y divide-canvas-border">
          {KOOTAS.map((k) => (
            <div key={k.slug} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-3">
                <span className="text-xs text-ink-quiet">Koota 0{k.order} ({k.points} pts)</span>
                <h3 className="font-serif-title text-xl font-semibold text-plum">{k.name}</h3>
              </div>
              <div className="md:col-span-4 text-sm text-ink-quiet line-through decoration-ink-quiet/40">
                {k.was}
              </div>
              <div className="md:col-span-5 text-sm font-medium text-plum">
                {k.now}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What 36to7 is NOT */}
      <div className="space-y-6 bg-canvas-surface p-8 rounded-card border border-canvas-border">
        <h2 className="font-serif-title text-2xl font-semibold text-plum">
          What 36to7 is explicitly NOT:
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-ink-muted">
          <li className="flex items-start gap-2">
            <span className="text-brick font-bold">✕</span>
            <span>Not a matchmaking marketplace or app</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brick font-bold">✕</span>
            <span>Not astrology or horoscope predictions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brick font-bold">✕</span>
            <span>Not a 36-question questionnaire to fill out in one go</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brick font-bold">✕</span>
            <span>Not a compatibility percentage or &quot;marriage score&quot;</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brick font-bold">✕</span>
            <span>Not an algorithm that decides whether you should marry</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brick font-bold">✕</span>
            <span>Not a gamified app with streaks, badges, or confetti</span>
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 pt-6">
        <Link
          href="/sign-up"
          className="inline-flex items-center gap-2 text-base font-medium text-canvas-paper bg-plum hover:bg-plum-hover px-8 py-4 rounded-xl shadow-journal transition-all"
        >
          <span>Start with your personal framework</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
