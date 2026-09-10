'use client';

import { useState, useEffect } from 'react';
import { KOOTAS, GUNAS, GunaDefinition } from '@/lib/framework-data';
import { CheckSquare, Sparkles, Filter, Info, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type PriorityLevel = 'ESSENTIAL' | 'IMPORTANT' | 'FLEXIBLE' | 'UNSURE';

const PRIORITY_CONFIG: Record<PriorityLevel, { label: string; bg: string; text: string; border: string; desc: string }> = {
  ESSENTIAL: {
    label: 'Essential',
    bg: 'bg-plum/10',
    text: 'text-plum font-semibold',
    border: 'border-plum/30',
    desc: 'Non-negotiable core values & deal-breakers',
  },
  IMPORTANT: {
    label: 'Important',
    bg: 'bg-terracotta/10',
    text: 'text-terracotta font-semibold',
    border: 'border-terracotta/30',
    desc: 'Matters deeply, but allows room for nuance',
  },
  FLEXIBLE: {
    label: 'Flexible',
    bg: 'bg-sage/15',
    text: 'text-sage-hover font-semibold',
    border: 'border-sage/40',
    desc: 'Preferences, easily adapted or compromised',
  },
  UNSURE: {
    label: 'Unsure',
    bg: 'bg-canvas-surface',
    text: 'text-ink-muted font-medium',
    border: 'border-canvas-border',
    desc: 'Still reflecting / need time to explore',
  },
};

export default function PrioritiesPage() {
  const [priorities, setPriorities] = useState<Record<number, PriorityLevel>>({});
  const [loading, setLoading] = useState(true);
  const [selectedKoota, setSelectedKoota] = useState<string>('all');
  const [savingGuna, setSavingGuna] = useState<number | null>(null);

  useEffect(() => {
    async function loadPriorities() {
      try {
        const res = await fetch('/api/me/priorities');
        if (res.ok) {
          const data = await res.json();
          setPriorities(data.priorityMap || {});
        }
      } catch (err) {
        console.error('Failed to load priorities:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPriorities();
  }, []);

  const updatePriority = async (gunaNumber: number, importance: PriorityLevel) => {
    // Optimistic update
    setPriorities((prev) => ({ ...prev, [gunaNumber]: importance }));
    setSavingGuna(gunaNumber);

    try {
      await fetch('/api/me/priorities', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gunaNumber, importance }),
      });
    } catch (err) {
      console.error('Failed to save priority:', err);
    } finally {
      setSavingGuna(null);
    }
  };

  // Calculate summary counts (Quiet indicators, NO totals/percentages)
  const counts = {
    ESSENTIAL: 0,
    IMPORTANT: 0,
    FLEXIBLE: 0,
    UNSURE: 0,
  };

  GUNAS.forEach((g) => {
    const level = priorities[g.number] || 'UNSURE';
    counts[level]++;
  });

  const filteredGunas = GUNAS.filter((g) => {
    if (selectedKoota !== 'all' && g.kootaSlug !== selectedKoota) return false;
    return true;
  });

  return (
    <div className="py-10 px-4 sm:px-6 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-terracotta uppercase tracking-wider">
          <CheckSquare className="w-4 h-4" />
          <span>Personal Framework Alignment</span>
        </div>
        <h1 className="font-serif-title text-3xl sm:text-4xl font-semibold text-plum">
          Your Personal Priorities
        </h1>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl">
          Not every dimension carries equal weight for every person. Classify each of the 36 Gunas into what is essential, important, flexible, or unsure for you. Edit anytime as your understanding evolves.
        </p>
      </div>

      {/* Summary Counts Bar (Quiet summary indicators, NO percentage/score) */}
      <div className="bg-canvas-paper p-5 rounded-card border border-canvas-border shadow-journal space-y-3">
        <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
          Current Priority Distribution
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(['ESSENTIAL', 'IMPORTANT', 'FLEXIBLE', 'UNSURE'] as PriorityLevel[]).map((level) => {
            const config = PRIORITY_CONFIG[level];
            return (
              <div
                key={level}
                className={`p-3.5 rounded-xl border ${config.border} ${config.bg} flex items-center justify-between`}
              >
                <div>
                  <span className={`text-xs uppercase font-bold block ${config.text}`}>
                    {config.label}
                  </span>
                  <span className="text-[11px] text-ink-quiet line-clamp-1">{config.desc}</span>
                </div>
                <span className={`font-serif-title text-2xl font-bold ${config.text}`}>
                  {counts[level]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-canvas-border pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-ink-quiet shrink-0 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          <button
            onClick={() => setSelectedKoota('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedKoota === 'all'
                ? 'bg-plum text-canvas-paper font-semibold'
                : 'bg-canvas-surface text-ink-muted hover:text-plum'
            }`}
          >
            All 36 Gunas
          </button>
          {KOOTAS.map((k) => (
            <button
              key={k.slug}
              onClick={() => setSelectedKoota(k.slug)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                selectedKoota === k.slug
                  ? 'bg-plum text-canvas-paper font-semibold'
                  : 'bg-canvas-surface text-ink-muted hover:text-plum'
              }`}
            >
              {k.name} ({k.points}p)
            </button>
          ))}
        </div>

        <Link
          href="/app/home"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-plum hover:underline self-end sm:self-center"
        >
          <span>Return to Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Gunas Priority Selector List */}
      <div className="space-y-4">
        {filteredGunas.map((guna) => {
          const currentPriority = priorities[guna.number] || 'UNSURE';
          const koota = KOOTAS.find((k) => k.slug === guna.kootaSlug);

          return (
            <div
              key={guna.number}
              className="bg-canvas-paper p-5 rounded-card border border-canvas-border hover:border-canvas-border/80 shadow-journal space-y-4 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="font-serif-title text-base font-bold text-terracotta mt-0.5 w-6">
                    {guna.number.toString().padStart(2, '0')}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/app/guna/${guna.number}`}
                        className="font-serif-title text-lg font-semibold text-plum hover:underline"
                      >
                        {guna.name}
                      </Link>
                      <span className="text-[11px] font-medium text-ink-quiet bg-canvas-surface px-2 py-0.5 rounded-full border border-canvas-border">
                        {koota?.name} ({koota?.points} pts)
                      </span>
                    </div>
                    <p className="text-xs text-ink-muted">{guna.description}</p>
                    <p className="text-xs text-plum font-medium">→ {guna.now}</p>
                  </div>
                </div>
              </div>

              {/* Priority Selector Pills */}
              <div className="pt-2 border-t border-canvas-border/50 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-medium text-ink-quiet mr-2">Set Priority:</span>
                {(['ESSENTIAL', 'IMPORTANT', 'FLEXIBLE', 'UNSURE'] as PriorityLevel[]).map((level) => {
                  const isSelected = currentPriority === level;
                  const config = PRIORITY_CONFIG[level];

                  return (
                    <button
                      key={level}
                      onClick={() => updatePriority(guna.number, level)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border flex items-center gap-1.5 ${
                        isSelected
                          ? `${config.bg} ${config.text} ${config.border} shadow-soft`
                          : 'bg-canvas-surface border-canvas-border text-ink-muted hover:border-canvas-border/80'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                      <span>{config.label}</span>
                    </button>
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
