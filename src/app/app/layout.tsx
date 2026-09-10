import { AppHeader } from '@/components/layout/AppHeader';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas-ivory flex flex-col font-sans text-ink antialiased">
      <AppHeader />
      <main className="flex-1 pb-16">{children}</main>
      <footer className="py-6 border-t border-canvas-border text-center text-xs text-ink-quiet">
        <p>36to7 · Private relationship-understanding companion</p>
      </footer>
    </div>
  );
}
