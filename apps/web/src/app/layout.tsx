import type { Metadata } from 'next';
import { inter, bebasNeue } from './fonts';
import { Shell } from '@/components/shell';
import { ModeProvider } from '@/context/mode-context';

export const metadata: Metadata = {
  title: 'Commander SDR',
  description: 'Security Command and Control — Security Drift Response',
};

/**
 * Root Layout — Commander SDR Operational App (DS-1.0)
 *
 * Loads fonts (Bebas Neue, Inter) via next/font/google.
 * Wraps in ModeProvider for Standard/Mission mode system.
 * Wraps in Shell for persistent chrome.
 *
 * Source: DESIGN_SYSTEM.md §5, §6, §9
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body style={{ margin: 0, fontFamily: "var(--font-body, 'Inter', system-ui, sans-serif)", fontSize: '13px' }}>
        <ModeProvider>
          <Shell>
            {children}
          </Shell>
        </ModeProvider>
      </body>
    </html>
  );
}
