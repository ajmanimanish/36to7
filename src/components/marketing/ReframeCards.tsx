import { KOOTAS } from '@/lib/framework-data';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getKootaIllustration } from '@/components/illustrations/KootaIllustrations';

export function ReframeCards() {
  return (
    <section className="py-20 px-6 bg-canvas-surface border-y border-canvas-border">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">
              Guna Milan, rebuilt for real life
            </span>
            <h2 className="font-serif-title text-3xl md:text-4xl font-medium text-ink">
              Thirty-six Guna, built from eight real categories.
            </h2>
          </div>
          <Link
            href="/framework/36-guna"
            className="inline-flex items-center gap-1 text-sm font-semibold text-plum hover:text-terracotta transition-colors"
          >
            <span>Browse full framework</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {KOOTAS.map((koota) => (
            <div
              key={koota.slug}
              className="bg-canvas-paper p-6 rounded-card border border-canvas-border shadow-journal space-y-4 hover:border-plum/20 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-canvas-surface border border-canvas-border flex items-center justify-center p-1.5 shrink-0">
                      {getKootaIllustration(koota.slug, 'w-9 h-9')}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-ink-quiet block">
                        Koota 0{koota.order} / 08
                      </span>
                      <h3 className="font-serif-title text-2xl font-semibold text-plum">
                        {koota.name}
                      </h3>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-plum/5 text-plum font-serif-title font-semibold text-sm flex items-center justify-center shrink-0">
                    {koota.points}p
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 text-sm leading-relaxed">
                  <p className="text-ink-quiet line-through decoration-ink-quiet/40 text-xs">
                    {koota.was}
                  </p>
                  <p className="text-plum font-medium">
                    {koota.now}
                  </p>
                </div>
              </div>

              <p className="text-xs text-ink-muted border-t border-canvas-border pt-3 mt-4">
                {koota.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
