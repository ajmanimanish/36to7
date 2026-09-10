import { HeroSection } from '@/components/marketing/HeroSection';
import { ReframeCards } from '@/components/marketing/ReframeCards';
import { PhilosophyHighlights } from '@/components/marketing/PhilosophyHighlights';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import Link from 'next/link';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Was/Now Reframe Matrix */}
      <ReframeCards />

      {/* Cultural Reframe Section */}
      <section className="py-20 px-6 bg-canvas-ivory">
        <div className="max-w-4xl mx-auto space-y-8 bg-canvas-paper p-8 sm:p-12 rounded-card border border-canvas-border shadow-journal">
          <div className="space-y-3">
            <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">
              Cultural Roots, Modern Lens
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-medium text-plum">
              Respecting tradition by translating it into real life.
            </h2>
          </div>

          <div className="prose prose-stone text-ink-muted text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              In traditional Indian marriage compatibility, <strong>36 Guna across 8 Kootas</strong> were checked in an astrological chart before families agreed to a match.
            </p>
            <p>
              <strong>36to7 preserves that 36-point structure</strong> while explicitly presenting the modern meanings as <em>our interpretation</em>—translated into practical areas of life that two modern adults can understand, discuss, and experience together.
            </p>
            <p className="p-4 bg-canvas-surface rounded-xl border border-canvas-border text-plum italic text-sm">
              &quot;36to7 keeps the traditional structure and reinterprets its meaning for modern relationships. The modern lenses are our own interpretation; they are not presented as the original ancient astrological meanings of the Guna.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Highlights */}
      <PhilosophyHighlights />

      {/* FAQ Preview */}
      <section className="py-20 px-6 bg-canvas-surface border-t border-canvas-border">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">
              Common Questions
            </span>
            <h2 className="font-serif-title text-3xl font-medium text-ink">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 px-6 bg-plum text-canvas-paper text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-medium leading-tight">
            Ready to understand your journey?
          </h2>
          <p className="text-sm sm:text-base text-canvas-paper/80 max-w-xl mx-auto">
            Not a matchmaking algorithm. A warm, private companion for the two of you—all the way to yes.
          </p>
          <div className="pt-4">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 text-base font-medium text-plum bg-canvas-paper hover:bg-canvas-ivory px-8 py-4 rounded-xl transition-all shadow-journal"
            >
              <span>Begin your 36to7 journey</span>
              <Sparkles className="w-4 h-4 text-terracotta" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
