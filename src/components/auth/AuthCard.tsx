import React from 'react';

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md bg-canvas-paper p-8 rounded-card border border-canvas-border shadow-journal space-y-6">
      <div className="text-center space-y-2">
        <h1 className="font-serif-title text-2xl sm:text-3xl font-semibold text-plum">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-ink-muted leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="border-t border-canvas-border/60 pt-6">
        {children}
      </div>

      <div className="pt-2 text-center text-xs text-ink-quiet border-t border-canvas-border/40">
        <p>Your reflections and journal entries remain strictly private by default.</p>
      </div>
    </div>
  );
}
