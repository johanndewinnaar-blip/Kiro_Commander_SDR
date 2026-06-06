'use client';

import { PageContainer } from '@/components/page-container';
import { seedStrategies } from '../../../../../../packages/contracts/src/fixtures/seed-strategies';
import { primitiveTypeScale } from '../../../../../../packages/ui/src/tokens/primitives';

/**
 * Tenant Admin — Closure & Reopening Configuration
 *
 * Data: strategy.ts (closure-gate + reopening-trigger surfaces) + seed-strategies
 * Route: /settings/closure-reopening | Boundary: tenant-admin
 */

export default function SettingsClosureReopeningPage() {
  const closurePolicy = seedStrategies.find((s) => s.surfaceType === 'closure-gate');
  const reopeningPolicy = seedStrategies.find((s) => s.surfaceType === 'reopening-trigger');

  return (
    <PageContainer pretitle="Settings › Closure & Reopening" title="Closure & Reopening">
      <div className="row row-deck row-cards">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h3 className="card-title">Closure Gate Strategy</h3>
              <button className="btn btn-sm" disabled>Edit — Phase 1</button>
            </div>
            <div className="card-body">
              {closurePolicy ? (
                <>
                  <div className="row g-3 mb-3">
                    <div className="col-6"><div className="subheader">Version</div><div>{closurePolicy.policyVersion}</div></div>
                    <div className="col-6"><div className="subheader">Status</div><span className="badge bg-green-lt">{closurePolicy.status}</span></div>
                  </div>
                  <pre className="p-3" style={{ background: '#1a1a2e', color: '#ddd', fontSize: primitiveTypeScale.caption, overflow: 'auto', maxHeight: '200px' }}>
                    {JSON.stringify(closurePolicy.configuration, null, 2)}
                  </pre>
                </>
              ) : <p className="text-muted">No closure-gate policy configured.</p>}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h3 className="card-title">Reopening Trigger Strategy</h3>
              <button className="btn btn-sm" disabled>Edit — Phase 1</button>
            </div>
            <div className="card-body">
              {reopeningPolicy ? (
                <>
                  <div className="row g-3 mb-3">
                    <div className="col-6"><div className="subheader">Version</div><div>{reopeningPolicy.policyVersion}</div></div>
                    <div className="col-6"><div className="subheader">Status</div><span className="badge bg-green-lt">{reopeningPolicy.status}</span></div>
                  </div>
                  <pre className="p-3" style={{ background: '#1a1a2e', color: '#ddd', fontSize: primitiveTypeScale.caption, overflow: 'auto', maxHeight: '200px' }}>
                    {JSON.stringify(reopeningPolicy.configuration, null, 2)}
                  </pre>
                </>
              ) : <p className="text-muted">No reopening-trigger policy configured.</p>}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
