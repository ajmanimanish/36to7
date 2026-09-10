import Link from 'next/link';
import { ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function PhilosophyPage() {
  return (
    <div className="py-16 px-6 max-w-4xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">
          Product Philosophy
        </span>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-medium text-ink">
          The user provides the life. 36to7 provides the structure.
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          Why we built 36to7 around real experience, quiet reflection, and human agency—never algorithms or scores.
        </p>
      </div>

      {/* Core Principles Section */}
      <div className="space-y-12 bg-canvas-paper p-8 sm:p-12 rounded-card border border-canvas-border shadow-journal">
        <div className="space-y-4 border-b border-canvas-border pb-8">
          <h2 className="font-serif-title text-2xl font-semibold text-plum">
            1. Alignment is not sameness
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            36to7 does not assume that two people need identical personalities, interests, or preferences to build a flourishing life together.
          </p>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            We distinguish between <em>alignment</em>, <em>comfortable differences</em>, <em>meaningful differences worth discussing</em>, <em>unresolved areas</em>, and <em>serious concerns</em>. Your own priorities matter: a difference in a low-importance area is never treated the same as a difference in an essential area.
          </p>
        </div>

        <div className="space-y-4 border-b border-canvas-border pb-8">
          <h2 className="font-serif-title text-2xl font-semibold text-plum">
            2. Uncertainty is legitimate
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            You are allowed to say: <em>&quot;I do not know yet,&quot; &quot;I am still figuring this out,&quot;</em> or <em>&quot;We have not really explored this.&quot;</em> 36to7 never turns honest uncertainty into failure or anxiety.
          </p>
        </div>

        <div className="space-y-4 border-b border-canvas-border pb-8">
          <h2 className="font-serif-title text-2xl font-semibold text-plum">
            3. No forced completion or progress bars
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            There is no requirement to complete all 36 Guna. There is no &quot;Question 17 of 36.&quot; There is no completion percentage that pressures you to finish the framework. The 36 Guna are a <strong>map</strong>, not a task list.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif-title text-2xl font-semibold text-plum">
            4. Pointers, not tasks
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            The 7 Vows are not assignments or checklists. They are pointers for deeper connection after two people have decided to marry.
          </p>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          href="/sign-up"
          className="inline-flex items-center gap-2 text-base font-medium text-canvas-paper bg-plum hover:bg-plum-hover px-8 py-4 rounded-xl shadow-journal transition-all"
        >
          <span>Begin your private journey</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
