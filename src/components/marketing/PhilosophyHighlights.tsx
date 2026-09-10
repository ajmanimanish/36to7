import { Shield, HelpCircle, HeartHandshake, Lock } from 'lucide-react';

export function PhilosophyHighlights() {
  const principles = [
    {
      icon: Shield,
      title: 'Private by default. Never a shared score.',
      description:
        'Your reflections stay yours. There is no percentage score claiming to tell you whether to marry someone.',
    },
    {
      icon: HelpCircle,
      title: 'Uncertainty is legitimate.',
      description:
        'It is normal to say "I don\'t know yet" or "we haven\'t discussed this." 36to7 never turns uncertainty into failure.',
    },
    {
      icon: HeartHandshake,
      title: 'AI organizes, never judges.',
      description:
        'Our AI distinguishes what you said, what you believe about them, and what was explicitly stated. It never invents their internal state.',
    },
    {
      icon: Lock,
      title: 'Explicit partner controls.',
      description:
        'If you invite a partner later, both of you maintain independent private spaces. Nothing is shared without your conscious step.',
    },
  ];

  return (
    <section className="py-20 px-6 bg-canvas-ivory">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">
            Product Philosophy
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-medium text-ink">
            Built around real life, not artificial app engagement.
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            The user provides the life. 36to7 provides the quiet structure to help you understand what matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {principles.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-card bg-canvas-paper border border-canvas-border shadow-soft flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-plum/5 text-plum shrink-0">
                <p.icon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif-title text-lg font-semibold text-plum">
                  {p.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
