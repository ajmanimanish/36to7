'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { KOOTAS, GUNAS, GunaDefinition } from '@/lib/framework-data';
import { ArrowLeft, Check, Compass, Sparkles, HelpCircle, BookOpen } from 'lucide-react';
import Link from 'next/link';

type PriorityLevel = 'ESSENTIAL' | 'IMPORTANT' | 'FLEXIBLE' | 'UNSURE';

export default function GunaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const gunaId = Number(params.gunaId);

  const guna = GUNAS.find((g) => g.number === gunaId);
  const koota = KOOTAS.find((k) => k.slug === guna?.kootaSlug);

  const [priority, setPriority] = useState<PriorityLevel>('UNSURE');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchPriority() {
      try {
        const res = await fetch('/api/me/priorities');
        if (res.ok) {
          const data = await res.json();
          if (data.priorityMap && data.priorityMap[gunaId]) {
            setPriority(data.priorityMap[gunaId]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (gunaId) fetchPriority();
  }, [gunaId]);

  const updatePriority = async (newPriority: PriorityLevel) => {
    setPriority(newPriority);
    setSaving(true);
    try {
      await fetch('/api/me/priorities', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gunaNumber: gunaId, importance: newPriority }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!guna) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-sm text-ink-muted">Guna dimension not found.</p>
        <Link href="/app/guna" className="text-xs font-semibold text-plum hover:underline">
          Return to 36 Guna Map
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-10">
      {/* Navigation */}
      <div>
        <Link
          href="/app/guna"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-plum transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to 36 Guna Catalog</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4 border-b border-canvas-border pb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-serif-title text-2xl font-bold text-terracotta">
            Guna {guna.number.toString().padStart(2, '0')}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-plum/10 text-plum border border-plum/20">
            {koota?.name} ({koota?.points} points)
          </span>
        </div>

        <h1 className="font-serif-title text-3xl sm:text-4xl font-semibold text-plum">
          {guna.name}
        </h1>
        <p className="text-base text-ink-muted leading-relaxed max-w-2xl">
          {guna.description}
        </p>
      </div>

      {/* Modern Reframe vs Traditional Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-canvas-paper p-6 rounded-card border border-canvas-border shadow-journal">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-ink-quiet uppercase tracking-wider block">
            Traditional Astronomical Frame
          </span>
          <p className="text-sm text-ink-quiet line-through decoration-ink-quiet/40 leading-relaxed">
            {guna.was}
          </p>
        </div>

        <div className="space-y-2 border-t md:border-t-0 md:border-l border-canvas-border pt-4 md:pt-0 md:pl-6">
          <span className="text-xs font-semibold text-plum uppercase tracking-wider block">
            Modern 36to7 Reframe
          </span>
          <p className="text-sm font-semibold text-plum leading-relaxed">
            {guna.now}
          </p>
        </div>
      </div>

      {/* Guidance Pointers */}
      <div className="bg-canvas-surface p-6 rounded-card border border-canvas-border space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-terracotta uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Guidance Pointers for Conversations</span>
        </div>
        <p className="text-sm text-ink-muted leading-relaxed">{guna.guidance}</p>
      </div>

      {/* Interactive Priority Selector for this Guna */}
      <div className="bg-canvas-paper p-6 rounded-card border border-canvas-border shadow-journal space-y-4">
        <div className="space-y-1">
          <h3 className="font-serif-title text-xl font-semibold text-plum">
            Set Your Personal Priority
          </h3>
          <p className="text-xs text-ink-muted">
            How important is this dimension in your own life and choices?
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {(['ESSENTIAL', 'IMPORTANT', 'FLEXIBLE', 'UNSURE'] as PriorityLevel[]).map((level) => {
            const isSelected = priority === level;
            return (
              <button
                key={level}
                onClick={() => updatePriority(level)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-plum text-canvas-paper border-plum shadow-journal'
                    : 'bg-canvas-surface text-ink-muted border-canvas-border hover:border-plum/40'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                <span>{level.charAt(0) + level.slice(1).toLowerCase()}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
