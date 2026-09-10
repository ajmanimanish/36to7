import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import Link from 'next/link';

export default function FAQPage() {
  return (
    <div className="py-16 px-6 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">
          Questions & Answers
        </span>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-medium text-ink">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          Everything you need to know about 36to7, our framework reinterpretation, and our privacy commitments.
        </p>
      </div>

      <FAQAccordion />

      <div className="bg-canvas-surface p-8 rounded-card border border-canvas-border text-center space-y-4">
        <h3 className="font-serif-title text-xl font-semibold text-plum">
          Have more questions?
        </h3>
        <p className="text-sm text-ink-muted">
          36to7 is free to explore. You can browse the complete framework without creating an account.
        </p>
        <Link
          href="/framework/36-guna"
          className="inline-block text-sm font-semibold text-plum hover:text-terracotta underline"
        >
          Explore all 36 Guna →
        </Link>
      </div>
    </div>
  );
}
