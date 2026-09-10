'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, User, Heart, AlertCircle, Shield } from 'lucide-react';
import Link from 'next/link';

const STAGE_OPTIONS = [
  {
    value: 'GETTING_TO_KNOW',
    title: 'Getting to Know Each Other',
    description: 'Early conversations, family introductions, or initial meetings.',
  },
  {
    value: 'SERIOUSLY_CONSIDERING',
    title: 'Seriously Considering Marriage',
    description: 'Deeper conversations, exploring long-term alignment and core values.',
  },
  {
    value: 'DECIDED_TO_MARRY',
    title: 'Decided to Marry / Engaged',
    description: 'Clear mutual decision made; preparing for shared life.',
  },
  {
    value: 'WEDDING_PREPARATION',
    title: 'Preparing for the Wedding',
    description: 'Navigating ceremonies, logistical planning, and family integration.',
  },
];

export default function NewJourneyPage() {
  const router = useRouter();

  const [personName, setPersonName] = useState('');
  const [stage, setStage] = useState('GETTING_TO_KNOW');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!personName.trim()) {
      setError('Please enter a name or initials for the person you are getting to know.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/journeys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personName, stage }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create journey.');
      } else {
        router.push('/app/home');
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-3 text-center sm:text-left">
        <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">
          Create Private Journey
        </span>
        <h1 className="font-serif-title text-3xl sm:text-4xl font-semibold text-plum">
          Who are you getting to know?
        </h1>
        <p className="text-sm text-ink-muted leading-relaxed">
          Creating a journey gives you a quiet, private space to write reflections, hold questions, and notice evolving clarity. Your reflections remain strictly yours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-canvas-paper p-6 sm:p-8 rounded-card border border-canvas-border shadow-journal space-y-6">
        {error && (
          <div className="p-3.5 rounded-xl bg-brick/10 border border-brick/20 text-brick text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Person Name */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-ink uppercase tracking-wider block">
            Person&apos;s Name or Preferred Initials
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-ink-quiet absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              placeholder="e.g. Priya or P."
              className="w-full pl-10 pr-4 py-3 bg-canvas-surface border border-canvas-border rounded-xl text-sm focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum text-ink"
            />
          </div>
          <p className="text-[11px] text-ink-quiet">
            Can be a first name or initials. Used only within your private journal.
          </p>
        </div>

        {/* Step 2: Stage Selector */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-ink uppercase tracking-wider block">
            Where are you in your conversations?
          </label>
          <div className="grid grid-cols-1 gap-3">
            {STAGE_OPTIONS.map((opt) => {
              const isSelected = stage === opt.value;
              return (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setStage(opt.value)}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'bg-plum/5 border-plum text-plum shadow-soft font-semibold'
                      : 'bg-canvas-surface border-canvas-border hover:border-canvas-border/80 text-ink-muted'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif-title text-base font-semibold">{opt.title}</span>
                    {isSelected && <Heart className="w-4 h-4 text-terracotta shrink-0" />}
                  </div>
                  <p className="text-xs font-normal text-ink-muted mt-1">{opt.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Privacy reassurance */}
        <div className="p-3 bg-canvas-surface rounded-xl border border-canvas-border/60 flex items-center gap-2.5 text-xs text-ink-muted">
          <Shield className="w-4 h-4 text-sage shrink-0" />
          <span>No notifications or automatic messages are ever sent to this person.</span>
        </div>

        <div className="pt-2 flex items-center justify-between gap-4">
          <Link
            href="/app/home"
            className="text-xs font-semibold text-ink-muted hover:text-plum"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="py-3.5 px-8 bg-plum hover:bg-plum-hover text-canvas-paper font-medium text-sm rounded-xl transition-all shadow-journal flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Creating journey…</span>
            ) : (
              <>
                <span>Begin Journey</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
