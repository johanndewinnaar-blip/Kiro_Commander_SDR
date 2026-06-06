'use client';

import { PageContainer } from '@/components/page-container';
import { seedConnectors } from '../../../../../../packages/contracts/src/fixtures/seed-connectors';
import { primitiveTypeScale } from '../../../../../../packages/ui/src/tokens/primitives';

/**
 * Coverage — Scanner Coverage
 * Data: connector.ts (connectors with vuln/coverage class)
 * Route: /coverage/scanners | Nav Group: Coverage
 */
export default function CoverageScannersPage() {
  const scannerConnectors = seedConnectors.filter((c) => c.classes.includes('C') || c.sourceType.includes('vuln'));
  return (
    <PageContainer pretitle="Coverage › Scanners" title="Scanner Coverage" headerActions={<span className="badge bg-blue-lt">{scannerConnectors.length} scanner sources</span>}>
      <div className="card mb-3">
        <div className="card-header"><h3 className="card-title">Scanner Sources</h3></div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-vcenter card-table">
              <thead><tr><th>Connector</th><th>Classes</th><th>State</th><th>Last Run</th></tr></thead>
              <tbody>
                {scannerConnectors.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600, fontSize: primitiveTypeScale.body }}>{c.name}</td>
                    <td>{c.classes.map((cls) => <span key={cls} className="badge bg-blue-lt me-1">{cls}</span>)}</td>
                    <td><span className={`badge ${c.state === 'active' ? 'bg-green-lt' : 'bg-red-lt'}`}>{c.state}</span></td>
                    <td className="text-muted" style={{ fontSize: primitiveTypeScale.caption }}>{c.lastRunAt ? new Date(c.lastRunAt).toLocaleString() : 'Never'}</td>
                  </tr>
                ))}
                {scannerConnectors.length === 0 && <tr><td colSpan={4} className="text-muted text-center">No scanner-class connectors in seed data</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="card"><div className="card-body"><p className="text-muted mb-0">Scanner Coverage Gaps — entity not yet built. Requires: scanner-coverage-gap entity mapping assets to scanner reach.</p></div></div>
    </PageContainer>
  );
}
