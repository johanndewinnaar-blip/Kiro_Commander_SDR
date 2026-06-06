'use client';

import { PageContainer } from '@/components/page-container';
import { seedStrategies } from '../../../../../../packages/contracts/src/fixtures/seed-strategies';
import { primitiveTypeScale, primitiveSignal } from '../../../../../../packages/ui/src/tokens/primitives';

/**
 * Tenant Admin — Automation Boundaries
 *
 * Data: strategy.ts (automation-boundary surface) + seed-strategies
 * Route: /settings/automation-boundaries | Boundary: tenant-admin
 */

export default function SettingsAutomationBoundariesPage() {
  const policy = seedStrategies.find((s) => s.surfaceType === 'automation-boundary');
  const config = policy?.configuration as any;

  return (
    <PageContainer pretitle="Settings › Automation Boundaries" title="Automation Boundaries" headerActions={policy ? <span className="badge bg-green-lt">v{policy.policyVersion} Active</span> : undefined}>
      {policy && config ? (
        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h3 className="card-title">Automation Boundary Strategy</h3>
            <button className="btn btn-sm" disabled>Edit — Not available in Phase 1</button>
          </div>
          <div className="card-body">
            <div className="row g-3 mb-3">
              <div className="col-sm-4"><div className="subheader">Version</div><div>{policy.policyVersion}</div></div>
              <div className="col-sm-4"><div className="subheader">Status</div><span className="badge bg-green-lt">{policy.status}</span></div>
              <div className="col-sm-4"><div className="subheader">Effective From</div><div style={{ fontSize: primitiveTypeScale.caption }}>{policy.effectiveFrom}</div></div>
            </div>
            <div className="row g-3">
              <div className="col-sm-6">
                <h4 className="subheader mb-2" style={{ color: '#2fb344' }}>Permitted (Auto)</h4>
                {(config.permitted || []).map((p: string) => <div key={p} className="badge bg-green-lt me-1 mb-1">{p}</div>)}
              </div>
              <div className="col-sm-6">
                <h4 className="subheader mb-2" style={{ color: primitiveSignal.warning }}>Approval Required</h4>
                {(config.approvalRequired || []).map((p: string) => <div key={p} className="badge bg-orange-lt me-1 mb-1">{p}</div>)}
              </div>
              <div className="col-sm-6">
                <h4 className="subheader mb-2">Dry-Run Only</h4>
                {(config.dryRunOnly || []).map((p: string) => <div key={p} className="badge bg-blue-lt me-1 mb-1">{p}</div>)}
              </div>
              <div className="col-sm-6">
                <h4 className="subheader mb-2" style={{ color: primitiveSignal.critical }}>Forbidden</h4>
                {(config.forbidden || []).map((p: string) => <div key={p} className="badge bg-red-lt me-1 mb-1">{p}</div>)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card"><div className="card-body text-muted">No automation-boundary strategy configured.</div></div>
      )}
    </PageContainer>
  );
}
