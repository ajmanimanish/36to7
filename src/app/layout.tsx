import './globals.css';
import { SessionProviderWrapper } from '@/components/auth/SessionProviderWrapper';

export const metadata = {
  title: '36to7 — Modern Relationship Understanding',
  description: 'A private, web-first relationship companion for arranged introductions in India.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-canvas-ivory text-ink antialiased">
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
