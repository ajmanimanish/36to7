'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: 'Is 36to7 an astrology or horoscope website?',
    answer:
      'No. 36to7 reinterprets the traditional 36-Guna structure using modern relationship psychology. We explicitly state that our lenses are our own interpretation, not ancient astrological claims or planetary predictions.',
  },
  {
    question: 'Will 36to7 give me a compatibility score or percentage?',
    answer:
      'Never. We do not generate a "marriage-worthiness score" or compatibility percentage anywhere in the UI. 36to7 helps you build an evolving understanding of where you align, where you differ, and what remains open.',
  },
  {
    question: 'Is 36to7 a matchmaking site or app?',
    answer:
      'No. 36to7 is not a matchmaking marketplace or dating service. It is a private companion app for when you have already met someone through family, arranged introductions, mutual friends, or dating, and are seriously considering marriage.',
  },
  {
    question: 'Can I use 36to7 on my own without inviting a partner?',
    answer:
      'Yes! 36to7 is designed to work completely as a solo journal and reflection framework. You can use it to clarify your own priorities and record thoughts after real interactions.',
  },
  {
    question: 'How does the AI work on my reflections?',
    answer:
      'When you write a reflection after a phone call or meeting, our AI organizes your notes into relevant Guna areas. It distinguishes between what you stated, what you believe about your partner, and what was explicitly discussed. It never invents partner motives.',
  },
  {
    question: 'Is my relationship journal private?',
    answer:
      'Yes, private by default. Your journal entries and reflections remain strictly confidential to your account. Nothing is shared unless you explicitly choose to share specific items.',
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="border border-canvas-border bg-canvas-paper rounded-card overflow-hidden shadow-soft transition-colors"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
            >
              <h3 className="font-serif-title text-base sm:text-lg font-semibold text-plum">
                {faq.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-terracotta shrink-0 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-6 text-sm text-ink-muted leading-relaxed border-t border-canvas-border/50 pt-4">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
