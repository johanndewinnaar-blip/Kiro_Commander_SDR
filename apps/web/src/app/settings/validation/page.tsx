'use client';

import { PageContainer } from '@/components/page-container';
import { seedStrategies } from '../../../../../../packages/contracts/src/fixtures/seed-strategies';
import { primitiveTypeScale } from '../../../../../../packages/ui/src/tokens/primitives';

/**
 * Tenant Admin — Validation Rules
 *
 * Data: strategy.ts (validation-window surface) + seed-strategies
 * Route: /settings/validation | Boundary: tenant-admin
 */

export default function SettingsValidationPage() {
  const policy = seedStrategies.find((s) => s.surfaceType === 'validation-window');

  return (
    <PageContainer pretitle="Settings › Validation Rules" title="Validation Rules" headerActions={policy ? <span className="badge bg-green-lt">v{policy.policyVersion} Active</span> : undefined}>
      {policy ? (
        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h3 className="card-title">Validation Window Strategy</h3>
            <button className="btn btn-sm" disabled>Edit — Not available in Phase 1</button>
          </div>
          <div className="card-body">
            <div className="row g-3 mb-3">
              <div className="col-sm-4"><div className="subheader">Version</div><div>{policy.policyVersion}</div></div>
              <div className="col-sm-4"><div className="subheader">Status</div><span className="badge bg-green-lt">{policy.status}</span></div>
              <div className="col-sm-4"><div className="subheader">Effective From</div><div style={{ fontSize: primitiveTypeScale.caption }}>{policy.effectiveFrom}</div></div>
            </div>
            <h4 className="subheader mb-2">Configuration</h4>
            <pre className="p-3" style={{ background: '#1a1a2e', color: '#ddd', fontSize: primitiveTypeScale.caption, overflow: 'auto', maxHeight: '300px' }}>
              {JSON.stringify(policy.configuration, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <div className="card"><div className="card-body text-muted">No validation-window strategy configured.</div></div>
      )}
    </PageContainer>
  );
}
