import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Info, CheckCircle2, HeartHandshake } from 'lucide-react';
import { VOWS } from '@/lib/framework-data';
import { VowsPathIllustration } from '@/components/illustrations/VowsPathIllustration';

export const metadata = {
  title: 'The 7 Vows | 36to7 Framework',
  description: 'The Saptapadi re-interpreted for modern relationships. Explore the 7 sequential milestones of commitment.',
};

export default function SevenVowsPage() {
  return (
    <div className="py-16 px-6 max-w-5xl mx-auto space-y-16">
      {/* Navigation Link */}
      <div>
        <Link
          href="/framework"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-plum transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Framework Overview</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">
          Sequential Commitment Milestones
        </span>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-medium text-ink">
          The 7 Vows
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          The traditional <em>Saptapadi</em> re-imagined as seven intentional conversations and earned milestones on the journey to marriage.
        </p>
      </div>

      {/* Prominent Honest Note */}
      <div className="bg-plum/5 border border-plum/15 rounded-card p-6 md:p-8 flex flex-col sm:flex-row items-start gap-4 shadow-soft">
        <div className="w-10 h-10 rounded-full bg-plum text-canvas-paper flex items-center justify-center shrink-0 mt-0.5">
          <Info className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 text-sm">
          <h4 className="font-serif-title text-lg font-semibold text-plum">
            A note on timing and in-app availability
          </h4>
          <p className="text-ink-muted leading-relaxed">
            These become an active part of your interactive journey once a couple reaches the <strong>&quot;Decided to marry&quot;</strong> stage in-app. This page serves as the open explainer for what each vow represents before you reach that milestone.
          </p>
        </div>
      </div>

      {/* Connected Path Visual Treatment */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-serif-title text-2xl font-semibold text-plum">
            The Sequential Path
          </h2>
          <p className="text-xs text-ink-quiet">
            Unlike the 8 Kootas which are parallel categories, the 7 Vows build progressively upon one another.
          </p>
        </div>
        <VowsPathIllustration currentStep={7} className="w-full max-w-3xl mx-auto" />
      </div>

      {/* 7 Vows Timeline / Cards Stack */}
      <div className="relative space-y-12 before:absolute before:left-6 sm:before:left-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-canvas-border z-0">
        {VOWS.map((vow) => (
          <div
            key={vow.orderIndex}
            className="relative pl-14 sm:pl-20 group"
          >
            {/* Connected Step Node Icon */}
            <div className="absolute left-2 sm:left-4 top-0 -translate-x-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-canvas-paper border-2 border-plum text-plum font-serif-title font-bold text-sm flex items-center justify-center shadow-journal z-10 group-hover:bg-plum group-hover:text-canvas-paper transition-all">
              0{vow.orderIndex}
            </div>

            {/* Vow Content Card */}
            <div className="bg-canvas-paper p-6 sm:p-8 rounded-card border border-canvas-border shadow-journal space-y-6 hover:border-plum/30 transition-all">
              
              {/* Card Header */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">
                  Vow 0{vow.orderIndex} of 07
                </span>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-semibold text-plum">
                  {vow.title}
                </h3>
                <p className="text-sm font-medium text-ink-muted italic">
                  {vow.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-ink leading-relaxed">
                {vow.description}
              </p>

              {/* Was / Now Cultural Reframe Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-canvas-surface p-4 sm:p-5 rounded-xl border border-canvas-border">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-ink-quiet block uppercase tracking-wider">
                    Traditional Meaning
                  </span>
                  <p className="text-xs text-ink-quiet line-through decoration-ink-quiet/40">
                    {vow.was}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-plum block uppercase tracking-wider">
                    Modern 36to7 Reframe
                  </span>
                  <p className="text-xs font-medium text-plum">
                    {vow.now}
                  </p>
                </div>
              </div>

              {/* Guidance / Deep Reflections */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-semibold text-ink uppercase tracking-wider flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-terracotta" />
                  <span>Key Reflection Questions</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vow.guidance.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-canvas-ivory rounded-lg text-xs text-ink-muted leading-relaxed border border-canvas-border/60 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connected Gunas Tags */}
              <div className="pt-3 border-t border-canvas-border/60 flex items-center gap-2 flex-wrap text-xs text-ink-quiet">
                <span className="font-semibold">Connected 36 Guna:</span>
                {vow.connectedGunaNumbers.map((gNum) => (
                  <Link
                    key={gNum}
                    href={`/framework/36-guna`}
                    className="px-2 py-0.5 rounded-full bg-plum/5 text-plum hover:bg-plum/10 transition-colors font-medium text-[11px]"
                  >
                    Guna #{gNum}
                  </Link>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="text-center bg-canvas-surface p-8 sm:p-10 rounded-card border border-canvas-border space-y-4">
        <h3 className="font-serif-title text-2xl font-semibold text-plum">
          Begin your private relationship understanding
        </h3>
        <p className="text-sm text-ink-muted max-w-lg mx-auto leading-relaxed">
          Reflect privately at your own pace, discover your priorities across all 36 Guna, and build a lasting foundation together.
        </p>
        <div className="pt-2">
          <Link
            href="/auth/sign-up"
            className="inline-flex items-center gap-2 text-base font-medium text-canvas-paper bg-plum hover:bg-plum-hover px-8 py-3.5 rounded-xl shadow-journal transition-all"
          >
            <span>Create your free account</span>
            <Sparkles className="w-4 h-4 text-terracotta" />
          </Link>
        </div>
      </div>
    </div>
  );
}
