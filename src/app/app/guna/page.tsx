'use client';

import { useState, useEffect } from 'react';
import { KOOTAS, GUNAS, GunaDefinition } from '@/lib/framework-data';
import { ChevronDown, Compass, Sparkles, Filter, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type PriorityLevel = 'ESSENTIAL' | 'IMPORTANT' | 'FLEXIBLE' | 'UNSURE';

export default function AppThirtySixGunaBrowserPage() {
  const [priorities, setPriorities] = useState<Record<number, PriorityLevel>>({});
  const [expandedGuna, setExpandedGuna] = useState<number | null>(1);

  useEffect(() => {
    async function loadPriorities() {
      try {
        const res = await fetch('/api/me/priorities');
        if (res.ok) {
          const data = await res.json();
          setPriorities(data.priorityMap || {});
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadPriorities();
  }, []);

  const toggleGuna = (num: number) => {
    setExpandedGuna(expandedGuna === num ? null : num);
  };

  return (
    <div className="py-10 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-terracotta uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>Interactive 36 Guna Map</span>
        </div>
        <h1 className="font-serif-title text-3xl sm:text-4xl font-semibold text-plum">
          The 36 Gunas Framework
        </h1>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
          Thirty-six dimensions of a shared life together, organized into 8 Kootas. Each dimension reframes traditional astronomical matching into modern psychological understanding.
        </p>
      </div>

      {/* Kootas & Gunas */}
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
                  const priority = priorities[guna.number] || 'UNSURE';

                  return (
                    <div
                      key={guna.number}
                      className={`rounded-card border transition-all overflow-hidden ${
                        isExpanded
                          ? 'bg-canvas-paper border-plum/30 shadow-journal'
                          : 'bg-canvas-paper/70 border-canvas-border hover:border-canvas-border/80'
                      }`}
                    >
                      <div className="p-5 flex items-center justify-between gap-4">
                        <button
                          onClick={() => toggleGuna(guna.number)}
                          className="flex-1 text-left flex items-center gap-4 focus:outline-none"
                        >
                          <span className="font-serif-title text-lg font-bold text-terracotta w-8">
                            {guna.number.toString().padStart(2, '0')}
                          </span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-serif-title text-lg font-semibold text-plum">
                                {guna.name}
                              </h3>
                              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-plum/5 text-plum border border-plum/10">
                                Priority: {priority.toLowerCase()}
                              </span>
                            </div>
                            <p className="text-xs text-ink-muted line-clamp-1">
                              {guna.description}
                            </p>
                          </div>
                        </button>

                        <div className="flex items-center gap-3">
                          <Link
                            href={`/app/guna/${guna.number}`}
                            className="text-xs font-semibold text-terracotta hover:underline shrink-0 hidden sm:inline-flex items-center gap-1"
                          >
                            <span>Explore Details</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => toggleGuna(guna.number)}
                            className="p-1 focus:outline-none"
                          >
                            <ChevronDown
                              className={`w-5 h-5 text-ink-quiet transition-transform ${
                                isExpanded ? 'rotate-180 text-plum' : ''
                              }`}
                            />
                          </button>
                        </div>
                      </div>

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

                          <div className="pt-2 flex justify-end">
                            <Link
                              href={`/app/guna/${guna.number}`}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-canvas-paper bg-plum hover:bg-plum-hover px-4 py-2 rounded-xl transition-all shadow-journal"
                            >
                              <span>Deep Dive & Reflections</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
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
    </div>
  );
}
