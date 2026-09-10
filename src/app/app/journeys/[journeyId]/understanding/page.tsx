'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { KOOTAS, GUNAS } from '@/lib/framework-data';
import { InlineSafetyNotice } from '@/components/journey/InlineSafetyNotice';
import { ArrowLeft, BookOpen, Compass, Filter, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

type GunaStateEnum =
  | 'ALL'
  | 'NOT_EXPLORED'
  | 'TAKING_SHAPE'
  | 'UNDERSTOOD'
  | 'ALIGNED'
  | 'DIFFERENT_BUT_OKAY'
  | 'WORTH_DISCUSSING'
  | 'IMPORTANT_UNRESOLVED';

const STATE_CONFIG: Record<GunaStateEnum, { label: string; bg: string; text: string; border: string; desc: string }> = {
  ALL: { label: 'All States', bg: 'bg-canvas-surface', text: 'text-ink', border: 'border-canvas-border', desc: 'All 36 Gunas' },
  NOT_EXPLORED: { label: 'Not Yet Explored', bg: 'bg-canvas-surface', text: 'text-ink-quiet', border: 'border-canvas-border', desc: 'Topic not touched upon yet in conversations or reflections.' },
  TAKING_SHAPE: { label: 'Taking Shape', bg: 'bg-terracotta/10', text: 'text-terracotta font-semibold', border: 'border-terracotta/30', desc: 'Initial thoughts emerging, curiosity present.' },
  UNDERSTOOD: { label: 'Understood', bg: 'bg-plum/10', text: 'text-plum font-semibold', border: 'border-plum/30', desc: 'Clear mutual perspective recorded.' },
  ALIGNED: { label: 'Aligned', bg: 'bg-sage/15', text: 'text-sage-hover font-semibold', border: 'border-sage/40', desc: 'Explicit agreement or shared core values confirmed.' },
  DIFFERENT_BUT_OKAY: { label: 'Different but Okay', bg: 'bg-sage/10', text: 'text-sage-hover', border: 'border-sage/30', desc: 'Contrast noted, but accepted with ease and mutual respect.' },
  WORTH_DISCUSSING: { label: 'Worth Discussing', bg: 'bg-amber/10', text: 'text-amber-900 font-semibold', border: 'border-amber/30', desc: 'Specific open question or topic to explore in future interactions.' },
  IMPORTANT_UNRESOLVED: { label: 'Important Unresolved', bg: 'bg-brick/10', text: 'text-brick font-semibold', border: 'border-brick/30', desc: 'Serious friction, boundary concern, or unresolved disagreement.' },
};

const PRIORITY_BADGE: Record<string, { label: string; bg: string; text: string }> = {
  ESSENTIAL: { label: 'Essential', bg: 'bg-plum/10', text: 'text-plum font-semibold' },
  IMPORTANT: { label: 'Important', bg: 'bg-terracotta/10', text: 'text-terracotta font-semibold' },
  FLEXIBLE: { label: 'Flexible', bg: 'bg-sage/15', text: 'text-sage-hover font-semibold' },
  UNSURE: { label: 'Unsure', bg: 'bg-canvas-surface', text: 'text-ink-quiet font-medium' },
};

export default function UnderstandingViewPage() {
  const params = useParams();
  const journeyId = params.journeyId as string;

  const [activeFilter, setActiveFilter] = useState<GunaStateEnum>('ALL');
  const [journeyData, setJourneyData] = useState<any>(null);
  const [priorities, setPriorities] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      // 1. Load priorities
      const pRes = await fetch('/api/me/priorities');
      if (pRes.ok) {
        const pData = await pRes.json();
        setPriorities(pData.priorityMap || {});
      }

      // 2. Load Journey data for THIS SPECIFIC journeyId
      const jRes = await fetch(`/api/journeys/${journeyId}`);
      if (jRes.ok) {
        const jData = await jRes.json();
        if (jData.journey) {
          setJourneyData(jData.journey);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (journeyId) loadData();
  }, [journeyId]);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <Sparkles className="w-8 h-8 text-terracotta animate-pulse mx-auto" />
        <p className="text-sm font-medium text-plum">Loading Understanding View…</p>
      </div>
    );
  }

  const personName = journeyData?.personName || 'your partner';

  const hasMockAnalysis = journeyData?.reflections?.some((r: any) =>
    r.analyses?.some((an: any) => an.isMockAnalysis === true)
  );

  // Load active concern flags for quiet inline safety notice
  const concernFlags = journeyData?.concernFlags || [];

  // State map across all 36 Gunas
  const gunaStateMap: Record<number, GunaStateEnum> = {};
  const gunaSummaryMap: Record<number, string> = {};

  if (journeyData?.gunaStates) {
    journeyData.gunaStates.forEach((gs: any) => {
      gunaStateMap[gs.guna.number] = gs.state as GunaStateEnum;
      if (gs.aiSummary) {
        gunaSummaryMap[gs.guna.number] = gs.aiSummary;
      }
    });
  }

  const stateCounts: Record<GunaStateEnum, number> = {
    ALL: 36,
    NOT_EXPLORED: 0,
    TAKING_SHAPE: 0,
    UNDERSTOOD: 0,
    ALIGNED: 0,
    DIFFERENT_BUT_OKAY: 0,
    WORTH_DISCUSSING: 0,
    IMPORTANT_UNRESOLVED: 0,
  };

  GUNAS.forEach((g) => {
    const st = gunaStateMap[g.number] || 'NOT_EXPLORED';
    stateCounts[st]++;
  });

  const filteredGunas = GUNAS.filter((g) => {
    if (activeFilter === 'ALL') return true;
    const st = gunaStateMap[g.number] || 'NOT_EXPLORED';
    return st === activeFilter;
  });

  return (
    <div className="py-10 px-4 sm:px-6 max-w-5xl mx-auto space-y-10">
      {/* Navigation */}
      <div>
        <Link
          href="/app/home"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-plum transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Dashboard</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4 border-b border-canvas-border pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-terracotta uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>3-Layer Perspective Map</span>
        </div>
        <h1 className="font-serif-title text-3xl sm:text-4xl font-semibold text-plum">
          Understanding with {personName}
        </h1>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl">
          An evolving picture of how your set priorities, recorded perspectives, and shared clarity map across the 36 Gunas. Never a compatibility score — only structure to clarify what is understood and what warrants exploration.
        </p>
      </div>

      {/* Phase F Inline Safety Notice with dismissal support */}
      <InlineSafetyNotice
        concerns={concernFlags}
        journeyId={journeyId}
        onDismissed={loadData}
      />

      {/* Filter Tabs across ALL 7 GunaState values */}
      <div className="space-y-3">
        <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5" /> Filter by Understanding State:
        </span>
        <div className="flex flex-wrap gap-2">
          {(
            [
              'ALL',
              'NOT_EXPLORED',
              'TAKING_SHAPE',
              'UNDERSTOOD',
              'ALIGNED',
              'DIFFERENT_BUT_OKAY',
              'WORTH_DISCUSSING',
              'IMPORTANT_UNRESOLVED',
            ] as GunaStateEnum[]
          ).map((st) => {
            const config = STATE_CONFIG[st];
            const isSelected = activeFilter === st;
            const count = stateCounts[st];

            return (
              <button
                key={st}
                onClick={() => setActiveFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-plum text-canvas-paper border-plum font-semibold shadow-soft'
                    : `${config.bg} ${config.text} ${config.border} hover:opacity-80`
                }`}
              >
                <span>{config.label}</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-canvas-paper/20 rounded-full font-mono font-bold">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Understanding Grid / List */}
      <div className="space-y-4">
        {filteredGunas.length === 0 ? (
          <div className="bg-canvas-paper p-8 rounded-card border border-canvas-border text-center text-sm text-ink-muted">
            No Guna dimensions currently match the selected state filter.
          </div>
        ) : (
          filteredGunas.map((guna) => {
            const currentState = gunaStateMap[guna.number] || 'NOT_EXPLORED';
            const config = STATE_CONFIG[currentState];
            const koota = KOOTAS.find((k) => k.slug === guna.kootaSlug);

            // Layer 1: Real priority from UserGunaPriority
            const userPriority = priorities[guna.number] || 'UNSURE';
            const priorityBadge = PRIORITY_BADGE[userPriority] || PRIORITY_BADGE.UNSURE;

            // Layer 2: Real perspective summary from AI analysis / reflection
            const realPerspectiveSummary =
              gunaSummaryMap[guna.number] ||
              'Not yet touched upon in your recorded reflections.';

            return (
              <div
                key={guna.number}
                className="bg-canvas-paper p-5 rounded-card border border-canvas-border shadow-journal space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="font-serif-title text-base font-bold text-terracotta w-6">
                      {guna.number.toString().padStart(2, '0')}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href={`/app/guna/${guna.number}`}
                          className="font-serif-title text-lg font-semibold text-plum hover:underline"
                        >
                          {guna.name}
                        </Link>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-canvas-surface text-ink-quiet border border-canvas-border">
                          {koota?.name} ({koota?.points} pts)
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted">{guna.description}</p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${config.bg} ${config.text} ${config.border} shrink-0 self-start sm:self-center`}
                  >
                    {config.label}
                  </span>
                </div>

                {/* 3-Layer Perspective Structure WIRED TO REAL DATA */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-canvas-border/50 text-xs">
                  {/* Layer 1: My View & Set Priority */}
                  <div className="bg-canvas-surface p-3.5 rounded-xl space-y-1.5">
                    <span className="font-semibold text-plum uppercase tracking-wider text-[10px] block">
                      Layer 1: My View & Set Priority
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${priorityBadge.bg} ${priorityBadge.text}`}>
                        {priorityBadge.label}
                      </span>
                      <Link href={`/app/priorities`} className="text-[11px] text-terracotta hover:underline">
                        Edit
                      </Link>
                    </div>
                    <p className="text-[11px] text-ink-quiet">
                      Defined in your personal priorities map.
                    </p>
                  </div>

                  {/* Layer 2: My Understanding of Them */}
                  <div className="bg-canvas-surface p-3.5 rounded-xl space-y-1.5 md:col-span-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-plum uppercase tracking-wider text-[10px] block">
                        Layer 2: My Understanding & Reflection Summary
                      </span>
                      {hasMockAnalysis && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber/15 text-amber-900 border border-amber/30">
                          Preview data — not live AI analysis
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-ink font-medium leading-relaxed italic">
                      &ldquo;{realPerspectiveSummary}&rdquo;
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[11px] text-ink-quiet">
                      <span>Derived from your private reflection notes</span>
                      <Link href={`/app/journeys/${journeyId}/reflect`} className="text-terracotta font-semibold hover:underline">
                        + Add reflection
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
