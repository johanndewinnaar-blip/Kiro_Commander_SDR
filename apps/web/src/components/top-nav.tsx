/**
 * Top Navigation Bar — Commander SDR
 *
 * Persistent top bar with:
 * - Global search (positioned before Commander AI per Spec #54 usability correction)
 * - Commander AI access
 * - Notifications
 * - User/tenant context
 *
 * Source: Spec #45, Spec #54 (usability corrections)
 * Design: Navy background, gold accent border
 */
export function TopNav() {
  return (
    <header
      style={{
        height: '3.5rem',
        background: '#0f1629',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        color: '#94a3b8',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ color: '#b8860b', fontWeight: 700, fontSize: '0.875rem' }}>
          COMMANDER SDR
        </span>
        {/* Global search — before Commander AI per Spec #54 */}
        <input
          type="search"
          placeholder="Search..."
          aria-label="Global search"
          style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '4px',
            padding: '0.375rem 0.75rem',
            color: '#e2e8f0',
            fontSize: '0.8125rem',
            width: '16rem',
          }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8125rem' }}>
        <span>Commander AI</span>
        <span>Notifications</span>
        <span>Tenant: Demo</span>
      </div>
    </header>
  );
}
