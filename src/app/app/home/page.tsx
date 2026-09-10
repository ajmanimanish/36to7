'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, PenTool, BookOpen, Compass, CheckSquare, Plus, ArrowRight, Calendar, User, ChevronDown, Heart } from 'lucide-react';

interface Journey {
  id: string;
  personName: string;
  stage: string;
  createdAt: string;
  reflections: Array<{
    id: string;
    body: string;
    createdAt: string;
    analyses?: Array<{
      clearerPointsJson?: any;
      concernsJson?: any;
    }>;
  }>;
}

const STAGE_LABELS: Record<string, string> = {
  GETTING_TO_KNOW: 'Getting to Know Each Other',
  SERIOUSLY_CONSIDERING: 'Seriously Considering Marriage',
  DECIDED_TO_MARRY: 'Decided to Marry',
  WEDDING_PREPARATION: 'Wedding Preparation',
  ARCHIVED: 'Archived',
};

export default function JourneyHomePage() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [selectedJourneyId, setSelectedJourneyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [switcherOpen, setSwitcherOpen] = useState(false);

  useEffect(() => {
    async function loadJourneys() {
      try {
        const res = await fetch('/api/journeys');
        if (res.ok) {
          const data = await res.json();
          setJourneys(data.journeys || []);
          if (data.activeJourney) {
            setSelectedJourneyId(data.activeJourney.id);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadJourneys();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <Sparkles className="w-8 h-8 text-terracotta animate-pulse mx-auto" />
        <p className="text-sm font-medium text-plum">Loading your private space…</p>
      </div>
    );
  }

  // Active selected journey
  const activeJourney = journeys.find((j) => j.id === selectedJourneyId) || journeys[0] || null;

  // Empty state: No journey created yet
  if (!activeJourney) {
    return (
      <div className="py-12 px-4 sm:px-6 max-w-3xl mx-auto space-y-8 text-center sm:text-left">
        <div className="bg-canvas-paper p-8 sm:p-10 rounded-card border border-canvas-border shadow-journal space-y-6">
          <div className="w-12 h-12 rounded-full bg-plum/10 text-plum flex items-center justify-center mx-auto sm:mx-0">
            <User className="w-6 h-6" />
          </div>

          <div className="space-y-3">
            <h1 className="font-serif-title text-3xl font-semibold text-plum">
              Welcome to 36to7
            </h1>
            <p className="text-sm text-ink-muted leading-relaxed max-w-xl">
              Start your first private relationship journey to record reflections, clarify priorities, and build understanding as you navigate arranged introductions.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <Link
              href="/app/journeys/new"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-plum hover:bg-plum-hover text-canvas-paper text-sm font-semibold rounded-xl transition-all shadow-journal"
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Journey</span>
            </Link>

            <Link
              href="/app/priorities"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-canvas-surface hover:bg-canvas-surface/80 text-ink text-sm font-medium rounded-xl border border-canvas-border transition-all"
            >
              <CheckSquare className="w-4 h-4 text-terracotta" />
              <span>Set Personal Priorities</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 max-w-5xl mx-auto space-y-10">
      {/* Active Journey Banner & Switcher Header */}
      <div className="bg-canvas-paper p-6 sm:p-8 rounded-card border border-canvas-border shadow-journal space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-canvas-border pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
                Active Relationship Journey
              </span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-plum/5 text-plum border border-plum/10">
                {STAGE_LABELS[activeJourney.stage] || activeJourney.stage}
              </span>

              {/* Journey Switcher Dropdown (Multiple Journeys Support) */}
              {journeys.length > 1 && (
                <div className="relative">
                  <button
                    onClick={() => setSwitcherOpen(!switcherOpen)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-canvas-surface hover:bg-canvas-surface/80 border border-canvas-border text-xs font-semibold text-plum transition-all"
                  >
                    <span>Switch Journey ({journeys.length})</span>
                    <ChevronDown className="w-3.5 h-3.5 text-terracotta" />
                  </button>

                  {switcherOpen && (
                    <div
                      className="absolute left-0 mt-2 w-56 bg-canvas-paper border border-canvas-border rounded-xl shadow-journal py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      onClick={() => setSwitcherOpen(false)}
                    >
                      <div className="px-3 py-1.5 border-b border-canvas-border/60 text-[11px] font-semibold text-ink-quiet">
                        Select Journey:
                      </div>
                      {journeys.map((j) => (
                        <button
                          key={j.id}
                          onClick={() => setSelectedJourneyId(j.id)}
                          className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors ${
                            j.id === activeJourney.id
                              ? 'bg-plum/10 text-plum font-bold'
                              : 'text-ink-muted hover:bg-canvas-surface hover:text-plum'
                          }`}
                        >
                          <span className="truncate">{j.personName}</span>
                          <span className="text-[10px] text-ink-quiet shrink-0">
                            {STAGE_LABELS[j.stage] || j.stage}
                          </span>
                        </button>
                      ))}
                      <div className="border-t border-canvas-border/60 mt-1 pt-1 px-1">
                        <Link
                          href="/app/journeys/new"
                          className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add New Journey</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <h1 className="font-serif-title text-3xl sm:text-4xl font-semibold text-plum">
                Getting to know {activeJourney.personName}
              </h1>

              <Link
                href="/app/journeys/new"
                className="inline-flex items-center gap-1 text-xs font-semibold text-terracotta hover:underline ml-2"
                title="Create another relationship journey"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Journey</span>
              </Link>
            </div>

            <p className="text-xs text-ink-quiet flex items-center gap-1.5 pt-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Created {new Date(activeJourney.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </p>
          </div>

          {/* Primary Action Button: "What stayed with you?" */}
          <Link
            href={`/app/journeys/${activeJourney.id}/reflect`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-plum hover:bg-plum-hover text-canvas-paper font-semibold text-sm rounded-xl transition-all shadow-journal shrink-0"
          >
            <PenTool className="w-4 h-4 text-terracotta" />
            <span>What stayed with you?</span>
          </Link>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <Link
            href={`/app/journeys/${activeJourney.id}/understanding`}
            className="p-4 rounded-xl bg-canvas-surface hover:bg-canvas-surface/80 border border-canvas-border transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-serif-title text-base font-semibold text-plum block group-hover:text-terracotta transition-colors">
                Understanding View
              </span>
              <span className="text-xs text-ink-muted">3-layer perspective map</span>
            </div>
            <ArrowRight className="w-4 h-4 text-ink-quiet group-hover:text-terracotta transition-colors" />
          </Link>

          <Link
            href="/app/priorities"
            className="p-4 rounded-xl bg-canvas-surface hover:bg-canvas-surface/80 border border-canvas-border transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-serif-title text-base font-semibold text-plum block group-hover:text-terracotta transition-colors">
                My Priorities
              </span>
              <span className="text-xs text-ink-muted">Classify essential vs flexible</span>
            </div>
            <ArrowRight className="w-4 h-4 text-ink-quiet group-hover:text-terracotta transition-colors" />
          </Link>

          <Link
            href="/app/guna"
            className="p-4 rounded-xl bg-canvas-surface hover:bg-canvas-surface/80 border border-canvas-border transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-serif-title text-base font-semibold text-plum block group-hover:text-terracotta transition-colors">
                36 Guna Catalog
              </span>
              <span className="text-xs text-ink-muted">Explore modern reframes</span>
            </div>
            <ArrowRight className="w-4 h-4 text-ink-quiet group-hover:text-terracotta transition-colors" />
          </Link>
        </div>
      </div>

      {/* Recent Reflections Feed */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif-title text-2xl font-semibold text-plum">
            Recent Reflections for {activeJourney.personName}
          </h2>
          <Link
            href={`/app/journeys/${activeJourney.id}/reflect`}
            className="text-xs font-semibold text-terracotta hover:underline inline-flex items-center gap-1"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Write new reflection</span>
          </Link>
        </div>

        {activeJourney.reflections.length === 0 ? (
          <div className="bg-canvas-paper p-8 rounded-card border border-canvas-border text-center space-y-3">
            <p className="text-sm text-ink-muted">
              You haven&apos;t written any reflections for {activeJourney.personName} yet.
            </p>
            <p className="text-xs text-ink-quiet max-w-md mx-auto">
              After your next interaction or conversation, write down what stayed with you to build evolving understanding.
            </p>
            <div className="pt-2">
              <Link
                href={`/app/journeys/${activeJourney.id}/reflect`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-plum text-canvas-paper text-xs font-semibold rounded-xl shadow-journal"
              >
                <span>Write first reflection</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {activeJourney.reflections.map((ref) => (
              <div
                key={ref.id}
                className="bg-canvas-paper p-6 rounded-card border border-canvas-border shadow-journal space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-ink-quiet border-b border-canvas-border/40 pb-2">
                  <span>Reflection recorded</span>
                  <span>
                    {new Date(ref.createdAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <p className="text-sm text-ink leading-relaxed font-sans italic whitespace-pre-wrap">
                  &ldquo;{ref.body}&rdquo;
                </p>

                {ref.analyses && ref.analyses.length > 0 && (
                  <div className="pt-2 border-t border-canvas-border/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-terracotta uppercase tracking-wider block">
                        AI Analysis Highlights
                      </span>
                      {(ref.analyses[0] as any).isMockAnalysis && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber/15 text-amber-900 border border-amber/30">
                          Preview data — not live AI analysis
                        </span>
                      )}
                    </div>
                    {Array.isArray(ref.analyses[0].clearerPointsJson) && (ref.analyses[0].clearerPointsJson as any[]).length > 0 && (
                      <ul className="text-xs text-ink-muted space-y-1 pl-4 list-disc">
                        {(ref.analyses[0].clearerPointsJson as any[]).map((pt: string, idx: number) => (
                          <li key={idx}>{pt}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
