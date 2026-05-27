import { Shell } from '@/components/shell';

/**
 * Command Centre — Primary landing surface
 *
 * Source: Spec #47, Route Registry (path: /)
 * Status: BUILD (v1.1)
 */
export default function CommandCentrePage() {
  return (
    <Shell>
      <div>
        <h1>Command Centre</h1>
        <p>Security Command and Control — Operational Overview</p>
        <p style={{ color: '#b8860b', fontSize: '0.875rem' }}>
          Status: BUILD | Version: v1.1 | Spec: 05-command-centre
        </p>
      </div>
    </Shell>
  );
}
