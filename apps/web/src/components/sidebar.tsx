import { getNavRoutes } from '@/registry';
import type { RouteEntry } from '@/registry';

/**
 * Left Sidebar Navigation — Commander SDR
 *
 * Registry-driven navigation per Spec #56.
 * Shows all routes with build-mode status badges.
 * Persistent left navigation per UI Design System steering.
 *
 * Source: Spec #47, Spec #56 (registry-driven runtime)
 * Design: Navy/ink background, gold accent for active, steel for inactive
 */

function NavItem({ route }: { route: RouteEntry }) {
  const statusColors: Record<string, string> = {
    LIVE: '#22c55e',
    BUILD: '#b8860b',
    SCAFFOLD: '#64748b',
    STUB: '#475569',
    PLANNED: '#334155',
  };

  return (
    <li style={{ listStyle: 'none' }}>
      <a
        href={route.path}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1rem',
          color: '#cbd5e1',
          textDecoration: 'none',
          fontSize: '0.8125rem',
          borderRadius: '4px',
        }}
      >
        <span>{route.label}</span>
        <span
          style={{
            fontSize: '0.625rem',
            padding: '0.125rem 0.375rem',
            borderRadius: '2px',
            background: statusColors[route.status] ?? '#334155',
            color: '#fff',
          }}
        >
          {route.status}
        </span>
      </a>
    </li>
  );
}

export function Sidebar() {
  // Build mode: show all operational routes with status badges
  const routes = getNavRoutes('operational');

  return (
    <aside
      style={{
        width: '16rem',
        background: '#0f1629',
        borderRight: '1px solid #1e293b',
        overflow: 'auto',
        padding: '1rem 0',
      }}
      aria-label="Primary navigation"
    >
      <nav>
        <ul style={{ margin: 0, padding: 0 }}>
          {routes.map((route) => (
            <NavItem key={route.path} route={route} />
          ))}
        </ul>
      </nav>
      <div
        style={{
          marginTop: '2rem',
          padding: '0.5rem 1rem',
          fontSize: '0.6875rem',
          color: '#475569',
          borderTop: '1px solid #1e293b',
        }}
      >
        Build Mode Active — All committed routes visible
      </div>
    </aside>
  );
}
