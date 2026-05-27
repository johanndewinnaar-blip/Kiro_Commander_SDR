import { Sidebar } from './sidebar';
import { TopNav } from './top-nav';

/**
 * Application Shell — Commander SDR
 *
 * Persistent shell with:
 * - Top navigation bar (search, Commander AI access, notifications)
 * - Left sidebar (registry-driven navigation)
 * - Main scrollable content area
 *
 * Source: Spec #45 Application Shell Boundary
 * Design: Navy/ink background, gold accent, steel supporting tones
 */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0a0e1a' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopNav />
        <main
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '1.5rem',
            color: '#e2e8f0',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
