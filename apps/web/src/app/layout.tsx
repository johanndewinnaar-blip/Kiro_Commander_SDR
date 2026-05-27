import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commander SDR',
  description: 'Security Command and Control — Security Drift Response',
};

/**
 * Root layout — Commander SDR Application Shell
 *
 * Provides the persistent shell structure:
 * - Top navigation bar (search, Commander AI, notifications)
 * - Left sidebar navigation (registry-driven)
 * - Main content area (scrollable operational surface)
 *
 * Source: Spec #45 Application Shell Boundary
 * Visual direction: Military-intelligence, brutalist, precise, executive-grade
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
