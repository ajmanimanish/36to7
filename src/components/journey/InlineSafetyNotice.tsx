'use client';

import { useState } from 'react';
import { HeartHandshake, PhoneCall, Check, X } from 'lucide-react';

interface ConcernFlagItem {
  id: string;
  text: string;
  severity: string;
  status: string;
}

export function InlineSafetyNotice({
  concerns,
  journeyId,
  onDismissed,
}: {
  concerns?: ConcernFlagItem[];
  journeyId?: string;
  onDismissed?: () => void;
}) {
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  if (!concerns || concerns.length === 0) return null;

  // Filter active concerns that have not been dismissed on client
  const activeConcerns = concerns.filter((c) => {
    if (c.status !== 'ACTIVE') return false;
    if (dismissedIds.includes(c.id)) return false;
    const sev = (c.severity || '').toLowerCase();
    return sev === 'serious' || sev === 'safety';
  });

  if (activeConcerns.length === 0) return null;

  const handleDismiss = async (concernId: string) => {
    setDismissedIds((prev) => [...prev, concernId]);
    setLoadingId(concernId);

    if (journeyId) {
      try {
        await fetch(`/api/journeys/${journeyId}/concerns/${concernId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'DISMISSED' }),
        });
      } catch (err) {
        console.error('Failed to dismiss concern:', err);
      } finally {
        setLoadingId(null);
        if (onDismissed) onDismissed();
      }
    }
  };

  return (
    <div className="bg-canvas-paper border-l-4 border-brick p-6 rounded-card shadow-soft space-y-4 my-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-brick/10 text-brick flex items-center justify-center shrink-0 mt-0.5">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif-title text-base font-semibold text-plum">
              A quiet note on safety & well-being
            </h4>
            <p className="text-xs text-ink-muted leading-relaxed">
              Relationships should always feel safe, respectful, and free from pressure or intimidation. If any interaction makes you feel uncomfortable, unsafe, or controlled, please prioritize your peace of mind and seek independent support.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-canvas-surface p-4 rounded-xl border border-canvas-border space-y-2 text-xs">
        <span className="font-semibold text-plum flex items-center gap-1.5">
          <PhoneCall className="w-3.5 h-3.5 text-terracotta" />
          Confidential Support & Crisis Resources:
        </span>
        <ul className="space-y-1.5 text-ink-muted pl-5 list-disc">
          <li>
            <strong className="text-ink">Vandrevala Foundation Helpline (India):</strong>{' '}
            <a href="tel:+919999666555" className="text-plum underline font-mono font-semibold">
              +91 9999 666 555
            </a>{' '}
            (24/7 free mental health & crisis support)
          </li>
          <li>
            <strong className="text-ink">National Domestic Violence & Safety Helpline:</strong>{' '}
            <a href="tel:1091" className="text-plum underline font-mono font-semibold">
              1091
            </a>{' '}
            / <span className="font-mono font-semibold">1800 102 7222</span>
          </li>
        </ul>
      </div>

      <div className="pt-2 border-t border-canvas-border/50 flex items-center justify-between gap-4">
        <span className="text-[11px] text-ink-quiet">
          You can acknowledge and dismiss this notice once read.
        </span>

        <div className="flex items-center gap-2">
          {activeConcerns.map((c) => (
            <button
              key={c.id}
              onClick={() => handleDismiss(c.id)}
              disabled={loadingId === c.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-canvas-surface hover:bg-canvas-surface/80 border border-canvas-border text-xs font-medium text-ink-muted hover:text-plum transition-all"
            >
              <Check className="w-3.5 h-3.5 text-sage" />
              <span>Acknowledge & Dismiss</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
