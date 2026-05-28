import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import { Shell } from '@/components/shell';
import { ModeProvider } from '@/context/mode-context';
import { SidebarProvider } from '@/context/sidebar-context';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Commander SDR',
  description: 'Security Command and Control — Security Drift Response',
};

/**
 * Root Layout — Commander SDR Operational App (DS-1.0)
 *
 * Fonts declared inline (not imported from separate module) to avoid
 * next/font internal Set objects leaking across the RSC boundary.
 * Wraps in SidebarProvider for shared collapse state.
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
        <SidebarProvider>
          <ModeProvider>
            <Shell>
              {children}
            </Shell>
          </ModeProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
