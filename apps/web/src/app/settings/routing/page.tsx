'use client';

import { PageContainer } from '@/components/page-container';
import { seedStrategies } from '../../../../../../packages/contracts/src/fixtures/seed-strategies';
import { primitiveTypeScale } from '../../../../../../packages/ui/src/tokens/primitives';

/**
 * Tenant Admin — Routing Configuration
 *
 * Data: strategy.ts (routing surface) + seed-strategies
 * Route: /settings/routing | Boundary: tenant-admin
 */

export default function SettingsRoutingPage() {
  const routingPolicy = seedStrategies.find((s) => s.surfaceType === 'routing');

  return (
    <PageContainer pretitle="Settings › Routing Configuration" title="Routing Configuration" headerActions={routingPolicy ? <span className="badge bg-green-lt">v{routingPolicy.policyVersion} Active</span> : undefined}>
      {routingPolicy ? (
        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h3 className="card-title">Routing Strategy Policy</h3>
            <button className="btn btn-sm" disabled>Edit — Not available in Phase 1</button>
          </div>
          <div className="card-body">
            <div className="row g-3 mb-3">
              <div className="col-sm-4"><div className="subheader">Version</div><div>{routingPolicy.policyVersion}</div></div>
              <div className="col-sm-4"><div className="subheader">Status</div><span className="badge bg-green-lt">{routingPolicy.status}</span></div>
              <div className="col-sm-4"><div className="subheader">Effective From</div><div style={{ fontSize: primitiveTypeScale.caption }}>{routingPolicy.effectiveFrom}</div></div>
            </div>
            <h4 className="subheader mb-2">Configuration</h4>
            <pre className="p-3" style={{ background: '#1a1a2e', color: '#ddd', fontSize: primitiveTypeScale.caption, overflow: 'auto', maxHeight: '300px' }}>
              {JSON.stringify(routingPolicy.configuration, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <div className="card"><div className="card-body text-muted">No routing strategy policy configured.</div></div>
      )}
    </PageContainer>
  );
}
