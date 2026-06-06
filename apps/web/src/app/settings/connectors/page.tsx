'use client';

import { PageContainer } from '@/components/page-container';
import { seedConnectors } from '../../../../../../packages/contracts/src/fixtures/seed-connectors';
import { CONNECTOR_CLASS_LABELS } from '../../../../../../packages/contracts/src/entities/common';
import { primitiveTypeScale } from '../../../../../../packages/ui/src/tokens/primitives';

/**
 * Tenant Admin — Connectors & Data Sources
 *
 * Data: connector.ts + seed-connectors
 * Route: /settings/connectors | Boundary: tenant-admin
 * Read-only display of connector configuration.
 */

export default function SettingsConnectorsPage() {
  return (
    <PageContainer pretitle="Settings › Connectors & Data Sources" title="Connectors & Data Sources" headerActions={<span className="badge bg-blue-lt">{seedConnectors.length} configured</span>}>
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h3 className="card-title">Connected Sources</h3>
          <button className="btn btn-sm" disabled title="Not available in Phase 1">Edit — Phase 2</button>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-vcenter card-table">
              <thead><tr><th>Connector</th><th>Classes</th><th>Tier</th><th>State</th><th>Last Run</th></tr></thead>
              <tbody>
                {seedConnectors.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600, fontSize: primitiveTypeScale.body }}>{c.name}</td>
                    <td>{c.classes.map((cls) => <span key={cls} className="badge bg-blue-lt me-1" title={CONNECTOR_CLASS_LABELS[cls]}>{cls}</span>)}</td>
                    <td><span className="badge bg-secondary">{c.tier}</span></td>
                    <td><span className={`badge ${c.state === 'active' ? 'bg-green-lt' : 'bg-red-lt'}`}>{c.state}</span></td>
                    <td className="text-muted" style={{ fontSize: primitiveTypeScale.caption }}>{c.lastRunAt ? new Date(c.lastRunAt).toLocaleString() : 'Never'}</td>
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
