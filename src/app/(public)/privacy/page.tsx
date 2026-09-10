import { ShieldCheck, Lock, EyeOff, Trash2, Download } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="py-16 px-6 max-w-4xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage/10 text-sage text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Brand Promise</span>
        </div>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-medium text-ink">
          Private by default. Always.
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          Your thoughts during an arranged introduction are among the most sensitive personal writing you will ever do. We treat them with strict technical protection and user control.
        </p>
      </div>

      {/* 4 Pillars of Privacy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-canvas-paper p-6 rounded-card border border-canvas-border shadow-soft space-y-3">
          <div className="p-3 rounded-xl bg-plum/5 text-plum w-fit">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-serif-title text-lg font-semibold text-plum">
            1. Zero Default Sharing
          </h3>
          <p className="text-sm text-ink-muted leading-relaxed">
            Every reflection, note, and priority is strictly private to your user account. Nothing is ever made visible to a partner unless you deliberately take an explicit sharing step.
          </p>
        </div>

        <div className="bg-canvas-paper p-6 rounded-card border border-canvas-border shadow-soft space-y-3">
          <div className="p-3 rounded-xl bg-terracotta/10 text-terracotta w-fit">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="font-serif-title text-lg font-semibold text-plum">
            2. No Third-Party Data Mining
          </h3>
          <p className="text-sm text-ink-muted leading-relaxed">
            Your personal relationship entries are never sold, never used for advertising profiling, and never shared with external matchmakers, family members, or third parties.
          </p>
        </div>

        <div className="bg-canvas-paper p-6 rounded-card border border-canvas-border shadow-soft space-y-3">
          <div className="p-3 rounded-xl bg-sage/10 text-sage w-fit">
            <Download className="w-5 h-5" />
          </div>
          <h3 className="font-serif-title text-lg font-semibold text-plum">
            3. Full Exportability
          </h3>
          <p className="text-sm text-ink-muted leading-relaxed">
            You own your data. You can export your full reflection history, priorities, and journey notes at any time in a standard, human-readable format.
          </p>
        </div>

        <div className="bg-canvas-paper p-6 rounded-card border border-canvas-border shadow-soft space-y-3">
          <div className="p-3 rounded-xl bg-brick/10 text-brick w-fit">
            <Trash2 className="w-5 h-5" />
          </div>
          <h3 className="font-serif-title text-lg font-semibold text-plum">
            4. Instant Deletion
          </h3>
          <p className="text-sm text-ink-muted leading-relaxed">
            You can delete specific reflections, an entire relationship journey, or your entire account with permanent effect.
          </p>
        </div>
      </div>

      <div className="bg-canvas-surface p-8 rounded-card border border-canvas-border text-center space-y-3">
        <h3 className="font-serif-title text-xl font-semibold text-plum">
          Questions about our privacy infrastructure?
        </h3>
        <p className="text-sm text-ink-muted">
          All data is encrypted in transit and at rest in PostgreSQL databases managed with strict row-level authorization.
        </p>
      </div>
    </div>
  );
}
