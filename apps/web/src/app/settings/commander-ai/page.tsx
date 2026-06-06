'use client';

import { PageContainer } from '@/components/page-container';
import { COMMANDER_MODES } from '../../../../../../packages/contracts/src/engines/commander-ai-core';
import { primitiveTypeScale } from '../../../../../../packages/ui/src/tokens/primitives';

/**
 * Tenant Admin — Commander AI Configuration
 *
 * Data: commander-ai-core engine (modes, status)
 * Route: /settings/commander-ai | Boundary: tenant-admin
 *
 * Tenant-facing AI config view. Customers see what modes are available
 * and current status. They do NOT configure providers (that's Control Plane).
 */

export default function SettingsCommanderAiPage() {
  return (
    <PageContainer pretitle="Settings › Commander AI" title="Commander AI Configuration" headerActions={<span className="badge bg-green-lt">Grounding Active</span>}>
      <div className="card mb-3">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h3 className="card-title">AI Status</h3>
          <button className="btn btn-sm" disabled>Edit — Not available in Phase 1</button>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-sm-4"><div className="subheader">Status</div><span className="badge bg-green-lt">Active (Grounding Pipeline)</span></div>
            <div className="col-sm-4"><div className="subheader">Model Inference</div><span className="badge bg-secondary">Phase 2 — Not Connected</span></div>
            <div className="col-sm-4"><div className="subheader">RAG</div><span className="badge bg-secondary">Dormant</span></div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">Available Modes</h3></div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-vcenter card-table">
              <thead><tr><th>Mode</th><th>Description</th><th>Status</th></tr></thead>
              <tbody>
                {COMMANDER_MODES.map((mode) => (
                  <tr key={mode.id}>
                    <td style={{ fontWeight: 600, fontSize: primitiveTypeScale.body }}>{mode.label}</td>
                    <td className="text-muted" style={{ fontSize: primitiveTypeScale.caption }}>{mode.description}</td>
                    <td><span className="badge bg-green-lt">Grounding Ready</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
