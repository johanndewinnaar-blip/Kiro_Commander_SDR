'use client';

import { PageContainer } from '@/components/page-container';
import { seedConnectors } from '../../../../../../packages/contracts/src/fixtures/seed-connectors';
import { primitiveTypeScale } from '../../../../../../packages/ui/src/tokens/primitives';

/**
 * Coverage — Telemetry Coverage
 * Data: connector.ts (Class A = SOC telemetry)
 * Route: /coverage/telemetry | Nav Group: Coverage
 */
export default function CoverageTelemetryPage() {
  const telemetryConnectors = seedConnectors.filter((c) => c.classes.includes('A'));
  return (
    <PageContainer pretitle="Coverage › Telemetry" title="Telemetry Coverage" headerActions={<span className="badge bg-blue-lt">{telemetryConnectors.length} telemetry sources</span>}>
      <div className="card mb-3">
        <div className="card-header"><h3 className="card-title">SOC Telemetry Sources (Class A)</h3></div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-vcenter card-table">
              <thead><tr><th>Connector</th><th>Source Type</th><th>State</th><th>Last Run</th></tr></thead>
              <tbody>
                {telemetryConnectors.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600, fontSize: primitiveTypeScale.body }}>{c.name}</td>
                    <td className="text-muted" style={{ fontSize: primitiveTypeScale.caption }}>{c.sourceType}</td>
                    <td><span className={`badge ${c.state === 'active' ? 'bg-green-lt' : 'bg-red-lt'}`}>{c.state}</span></td>
                    <td className="text-muted" style={{ fontSize: primitiveTypeScale.caption }}>{c.lastRunAt ? new Date(c.lastRunAt).toLocaleString() : 'Never'}</td>
                  </tr>
                ))}
                {telemetryConnectors.length === 0 && <tr><td colSpan={4} className="text-muted text-center">No Class A connectors in seed data</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="card"><div className="card-body"><p className="text-muted mb-0">Telemetry Coverage Gaps — entity not yet built. Requires: telemetry-coverage entity mapping assets to detection reach.</p></div></div>
    </PageContainer>
  );
}
