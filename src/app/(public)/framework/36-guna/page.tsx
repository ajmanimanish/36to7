'use client';

import { useState } from 'react';
import { KOOTAS, GUNAS, GunaDefinition } from '@/lib/framework-data';
import { ChevronDown, Sparkles, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ThirtySixGunaBrowserPage() {
  const [expandedGuna, setExpandedGuna] = useState<number | null>(1);

  const toggleGuna = (num: number) => {
    setExpandedGuna(expandedGuna === num ? null : num);
  };

  return (
    <div className="py-16 px-6 max-w-5xl mx-auto space-y-16">
      {/* Navigation link */}
      <div>
        <Link
          href="/framework"
          className="inline-flex items-center gap-1 text-xs font-semibold text-ink-muted hover:text-plum transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Framework Overview</span>
        </Link>
      </div>

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">
          Complete Framework Reference
        </span>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-medium text-ink">
          The 36 Guna Catalog
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          Thirty-six dimensions of a shared life together. Click any item to explore its modern re-interpretation, guidance pointers, and cultural reframe.
        </p>
      </div>

      {/* Koota Groups & 36 Guna Expandables */}
      <div className="space-y-12">
        {KOOTAS.map((koota) => {
          const kootaGunas = GUNAS.filter((g) => g.kootaSlug === koota.slug);

          return (
            <div key={koota.slug} className="space-y-6">
              {/* Koota Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-canvas-border pb-3 gap-2">
                <div>
                  <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">
                    Koota 0{koota.order} ({koota.points} points)
                  </span>
                  <h2 className="font-serif-title text-2xl font-semibold text-plum">
                    {koota.name}
                  </h2>
                </div>
                <div className="text-xs text-ink-quiet">
                  <span className="line-through mr-2">{koota.was}</span>
                  <span className="text-plum font-medium">→ {koota.now}</span>
                </div>
              </div>

              {/* Gunas List */}
              <div className="grid grid-cols-1 gap-4">
                {kootaGunas.map((guna) => {
                  const isExpanded = expandedGuna === guna.number;
                  return (
                    <div
                      key={guna.number}
                      className={`rounded-card border transition-all overflow-hidden ${
                        isExpanded
                          ? 'bg-canvas-paper border-plum/30 shadow-journal'
                          : 'bg-canvas-paper/70 border-canvas-border hover:border-canvas-border/80'
                      }`}
                    >
                      <button
                        onClick={() => toggleGuna(guna.number)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-serif-title text-lg font-bold text-terracotta w-8">
                            {guna.number.toString().padStart(2, '0')}
                          </span>
                          <div>
                            <h3 className="font-serif-title text-lg font-semibold text-plum">
                              {guna.name}
                            </h3>
                            <p className="text-xs text-ink-muted line-clamp-1">
                              {guna.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <ChevronDown
                            className={`w-5 h-5 text-ink-quiet transition-transform ${
                              isExpanded ? 'rotate-180 text-plum' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-6 pt-2 border-t border-canvas-border/60 space-y-4 text-sm">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-canvas-surface p-4 rounded-xl">
                            <div>
                              <span className="text-xs text-ink-quiet block mb-1">Traditional Astronomical Frame</span>
                              <p className="text-xs text-ink-quiet line-through decoration-ink-quiet/40">{guna.was}</p>
                            </div>
                            <div>
                              <span className="text-xs text-plum font-semibold block mb-1">Modern 36to7 Interpretation</span>
                              <p className="text-xs font-medium text-plum">{guna.now}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-semibold text-ink uppercase tracking-wider mb-1">Guidance Pointers</h4>
                            <p className="text-sm text-ink-muted leading-relaxed">{guna.guidance}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Footer */}
      <div className="text-center bg-canvas-surface p-8 rounded-card border border-canvas-border space-y-4">
        <h3 className="font-serif-title text-2xl font-semibold text-plum">
          Set your personal priorities
        </h3>
        <p className="text-sm text-ink-muted max-w-lg mx-auto">
          Mark which of these 36 areas are essential, important, or flexible to you. Edit anytime.
        </p>
        <Link
          href="/sign-up"
          className="inline-flex items-center gap-2 text-base font-medium text-canvas-paper bg-plum hover:bg-plum-hover px-8 py-3.5 rounded-xl shadow-journal transition-all"
        >
          <span>Create your free account</span>
          <Sparkles className="w-4 h-4 text-terracotta" />
        </Link>
      </div>
    </div>
  );
}
