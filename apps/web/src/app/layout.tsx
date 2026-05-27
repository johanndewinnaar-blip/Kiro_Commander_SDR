import type { Metadata } from 'next';
import { inter, bebasNeue } from './fonts';
import { Shell } from '@/components/shell';

export const metadata: Metadata = {
  title: 'Commander SDR',
  description: 'Security Command and Control — Security Drift Response',
};

/**
 * Root Layout — Commander SDR Operational App
 *
 * Wraps all pages in the Operational App shell (v1.3.2 remediated).
 * Loads Bebas Neue (display) and Inter (body) fonts via next/font/google.
 *
 * Source: Spec #45 Application Shell Boundary
 * Visual: shell reference v11
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body style={{ margin: 0, fontFamily: "var(--font-body, 'Inter', system-ui, sans-serif)", fontSize: '13px' }}>
        <Shell>
          {children}
        </Shell>
      </body>
    </html>
  );
}
