import React from 'react';

interface VowsPathProps {
  currentStep?: number;
  className?: string;
}

export function VowsPathIllustration({ currentStep = 1, className = 'w-full max-w-3xl mx-auto' }: VowsPathProps) {
  const vows = [
    { num: 1, label: 'Honest Talk' },
    { num: 2, label: 'Families' },
    { num: 3, label: 'Disagreements' },
    { num: 4, label: 'Fears' },
    { num: 5, label: '10-Yr Vision' },
    { num: 6, label: 'Hard Seasons' },
    { num: 7, label: 'Plain Choice' },
  ];

  return (
    <div className={`py-6 px-4 ${className}`}>
      <div className="relative flex items-center justify-between">
        {/* Background Path Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-canvas-border -translate-y-1/2 z-0" />
        
        {/* Active Progress Line */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-plum via-terracotta to-gold -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (vows.length - 1)) * 100}%` }}
        />

        {vows.map((vow) => {
          const isActive = vow.num <= currentStep;
          const isCurrent = vow.num === currentStep;

          return (
            <div key={vow.num} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-serif-title font-bold text-sm transition-all shadow-journal ${
                  isCurrent
                    ? 'bg-terracotta text-canvas-paper ring-4 ring-terracotta/20 scale-110'
                    : isActive
                    ? 'bg-plum text-canvas-paper'
                    : 'bg-canvas-paper text-ink-quiet border-2 border-canvas-border'
                }`}
              >
                0{vow.num}
              </div>
              <span
                className={`mt-2.5 text-[11px] font-medium tracking-tight text-center max-w-[70px] hidden sm:block ${
                  isActive ? 'text-plum font-semibold' : 'text-ink-quiet'
                }`}
              >
                {vow.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
