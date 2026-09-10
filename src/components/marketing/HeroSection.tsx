import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { HeroIllustration } from '@/components/illustrations/HeroIllustration';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-24 px-6 bg-canvas-ivory">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        
        {/* Editorial Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-plum/5 border border-plum/10 text-plum text-xs md:text-sm font-medium tracking-wide">
          <ShieldCheck className="w-4 h-4 text-terracotta" />
          <span>Private by default · Never a compatibility score</span>
        </div>

        {/* Hero Display Headline */}
        <h1 className="font-serif-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-ink leading-[1.08] max-w-4xl mx-auto">
          Before you say yes, <br className="hidden sm:inline" />
          <span className="text-plum italic font-normal">understand</span> what you&apos;re saying yes to.
        </h1>

        {/* Hero Paragraph with updated Terminology Sweep and 7 Vows link */}
        <p className="text-base sm:text-lg md:text-xl text-ink-muted max-w-2xl mx-auto leading-relaxed">
          36 Guna, built from 8 real categories.{' '}
          <Link
            href="/framework/7-vows"
            className="underline decoration-terracotta/40 hover:text-plum transition-colors font-medium text-ink"
          >
            7 vows
          </Link>
          , earned not ticked off. A private, web-first companion for people navigating arranged introductions in India—from first meeting to the decision to marry.
        </p>

        {/* Primary Call to Action */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
          <Link
            href="/auth/sign-up"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-medium text-canvas-paper bg-plum hover:bg-plum-hover px-7 py-4 rounded-xl transition-all shadow-journal group"
          >
            <span>Begin your private journey</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/framework/36-guna"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-medium text-plum bg-canvas-paper border border-canvas-border hover:bg-canvas-surface px-6 py-4 rounded-xl transition-all"
          >
            <span>Explore the 36 Guna</span>
          </Link>
        </div>

        {/* Bespoke Editorial Hero Illustration Motif */}
        <div className="pt-6 pb-2">
          <HeroIllustration className="w-full h-auto max-w-lg mx-auto opacity-95" />
        </div>

        {/* Editorial Feature Grid */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          {/* Card 1: Understand Yourself */}
          <div className="bg-canvas-paper p-6 rounded-card border border-canvas-border shadow-soft flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-plum/5 text-plum flex items-center justify-center font-serif-title font-semibold text-lg">
                01
              </div>
              <h3 className="font-serif-title text-xl text-plum font-semibold">
                Understand Yourself
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Identify what is essential, important, or flexible to you across 36 Guna before getting overwhelmed by expectations.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-canvas-border text-xs text-ink-quiet flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sage" />
              <span>Personal priorities, editable anytime</span>
            </div>
          </div>

          {/* Card 2: Reflect on interactions */}
          <div className="bg-canvas-paper p-6 rounded-card border border-canvas-border shadow-soft flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center font-serif-title font-semibold text-lg">
                02
              </div>
              <h3 className="font-serif-title text-xl text-plum font-semibold">
                Reflect After Real Interactions
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Write freely after phone calls, café meetings, or family visits. AI organizes your thoughts without judging or scoring.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-canvas-border text-xs text-ink-quiet flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-terracotta" />
              <span>Free-form journal + AI organization</span>
            </div>
          </div>

          {/* Card 3: Evolving picture */}
          <div className="bg-canvas-paper p-6 rounded-card border border-canvas-border shadow-soft flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sage/10 text-sage flex items-center justify-center font-serif-title font-semibold text-lg">
                03
              </div>
              <h3 className="font-serif-title text-xl text-plum font-semibold">
                Watch Understanding Grow
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                See what is taking shape, what remains open, and what is worth discovering next—with absolute privacy guaranteed.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-canvas-border text-xs text-ink-quiet flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-plum" />
              <span>No compatibility % or judgment</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
