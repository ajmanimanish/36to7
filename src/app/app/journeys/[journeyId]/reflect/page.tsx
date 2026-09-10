'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, PenTool, Sparkles, AlertCircle, HelpCircle, Shield } from 'lucide-react';
import Link from 'next/link';

const PROMPT_SUGGESTIONS = [
  'What surprised you or felt unexpected in your last conversation?',
  'Where did you feel natural ease, and where did you feel subtle tension?',
  'What questions or topics did this interaction leave you wanting to explore further?',
  'What did you notice about how decision-making or family influence was discussed?',
  'What did you learn about your own boundaries or priorities today?',
];

export default function ReflectionComposerPage() {
  const params = useParams();
  const router = useRouter();
  const journeyId = params.journeyId as string;

  const [personName, setPersonName] = useState('your partner');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadJourneyInfo() {
      try {
        const res = await fetch('/api/journeys');
        if (res.ok) {
          const data = await res.json();
          if (data.activeJourney && data.activeJourney.id === journeyId) {
            setPersonName(data.activeJourney.personName);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (journeyId) loadJourneyInfo();
  }, [journeyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('Please write a reflection before saving.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/journeys/${journeyId}/reflections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to save reflection.');
        setLoading(false);
      } else {
        // Fast non-blocking redirect
        router.push('/app/home');
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred while saving your reflection.');
      setLoading(false);
    }
  };

  const addPromptToContent = (prompt: string) => {
    if (content) {
      setContent((prev) => `${prev}\n\n${prompt}\n`);
    } else {
      setContent(`${prompt}\n`);
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 max-w-3xl mx-auto space-y-8">
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
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-terracotta uppercase tracking-wider">
          <PenTool className="w-4 h-4" />
          <span>Private Reflection Journal</span>
        </div>
        <h1 className="font-serif-title text-3xl sm:text-4xl font-semibold text-plum">
          What stayed with you?
        </h1>
        <p className="text-sm text-ink-muted leading-relaxed">
          Write freely after your time spent with {personName}. Your reflections are stored privately and analyzed asynchronously to help organize your evolving understanding.
        </p>
      </div>

      {/* Prompts Suggestions */}
      <div className="bg-canvas-paper p-5 rounded-card border border-canvas-border shadow-journal space-y-3">
        <span className="text-xs font-semibold text-plum uppercase tracking-wider flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-terracotta" />
          Reflection Prompts (Click to insert into your entry)
        </span>
        <div className="flex flex-wrap gap-2">
          {PROMPT_SUGGESTIONS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => addPromptToContent(prompt)}
              className="text-left text-xs bg-canvas-surface hover:bg-canvas-surface/80 text-ink-muted hover:text-plum p-2.5 rounded-xl border border-canvas-border transition-all"
            >
              + {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Reflection Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3.5 rounded-xl bg-brick/10 border border-brick/20 text-brick text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-2">
          <textarea
            required
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write about what stayed with you: conversations about money or family, moments of ease or tension, questions you carry..."
            className="w-full p-4 bg-canvas-paper border border-canvas-border rounded-card text-sm font-sans leading-relaxed focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum text-ink shadow-journal"
          />
        </div>

        {/* Privacy Note */}
        <div className="p-3.5 bg-canvas-surface rounded-xl border border-canvas-border/60 flex items-center gap-2.5 text-xs text-ink-muted">
          <Shield className="w-4 h-4 text-sage shrink-0" />
          <span>Strictly private. Your reflections are never shared with third parties or partners.</span>
        </div>

        <div className="flex items-center justify-between">
          <Link href="/app/home" className="text-xs font-semibold text-ink-muted hover:text-plum">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="py-3.5 px-8 bg-plum hover:bg-plum-hover text-canvas-paper font-semibold text-sm rounded-xl transition-all shadow-journal flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Saving reflection…</span>
            ) : (
              <>
                <span>Save Reflection</span>
                <Sparkles className="w-4 h-4 text-terracotta" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
