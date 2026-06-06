'use client';

import { PageContainer } from '@/components/page-container';
import { seedStrategies } from '../../../../../../packages/contracts/src/fixtures/seed-strategies';
import { primitiveTypeScale } from '../../../../../../packages/ui/src/tokens/primitives';

/**
 * Tenant Admin — SLA Configuration
 *
 * Data: strategy.ts (sla surface) + seed-strategies
 * Route: /settings/sla | Boundary: tenant-admin
 */

export default function SettingsSlaPage() {
  const slaPolicy = seedStrategies.find((s) => s.surfaceType === 'sla');

  return (
    <PageContainer pretitle="Settings › SLA Configuration" title="SLA Configuration" headerActions={slaPolicy ? <span className="badge bg-green-lt">v{slaPolicy.policyVersion} Active</span> : undefined}>
      {slaPolicy ? (
        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h3 className="card-title">SLA Strategy Policy</h3>
            <button className="btn btn-sm" disabled>Edit — Not available in Phase 1</button>
          </div>
          <div className="card-body">
            <div className="row g-3 mb-3">
              <div className="col-sm-4"><div className="subheader">Version</div><div>{slaPolicy.policyVersion}</div></div>
              <div className="col-sm-4"><div className="subheader">Status</div><span className="badge bg-green-lt">{slaPolicy.status}</span></div>
              <div className="col-sm-4"><div className="subheader">Effective From</div><div style={{ fontSize: primitiveTypeScale.caption }}>{slaPolicy.effectiveFrom}</div></div>
            </div>
            <h4 className="subheader mb-2">SLA Profiles</h4>
            <div className="table-responsive">
              <table className="table table-vcenter">
                <thead><tr><th>Profile</th><th>Response Hours</th><th>Escalation Cadence (min)</th></tr></thead>
                <tbody>
                  {((slaPolicy.configuration as any).profiles || []).map((p: any) => (
                    <tr key={p.name}><td style={{ fontWeight: 600 }}>{p.name}</td><td>{p.responseHours}h</td><td>{p.escalationCadenceMinutes}m</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="card"><div className="card-body text-muted">No SLA strategy policy configured.</div></div>
      )}
    </PageContainer>
  );
}
