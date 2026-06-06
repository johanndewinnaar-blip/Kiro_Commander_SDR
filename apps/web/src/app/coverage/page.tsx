'use client';

import { PageContainer } from '@/components/page-container';
import { seedConnectors } from '../../../../../packages/contracts/src/fixtures/seed-connectors';
import { seedAssets } from '../../../../../packages/contracts/src/fixtures/seed-assets';
import { primitiveTypeScale, primitiveSignal } from '../../../../../packages/ui/src/tokens/primitives';

/**
 * Coverage — Overview
 * Data: connector.ts + asset.ts (coverage field)
 * Route: /coverage | Nav Group: Coverage
 */
export default function CoveragePage() {
  const assets = seedAssets;
  const edr = assets.filter((a) => a.coverage.hasEdr).length;
  const vulnScan = assets.filter((a) => a.coverage.hasVulnScan).length;
  const patch = assets.filter((a) => a.coverage.hasPatchManagement).length;
  const backup = assets.filter((a) => a.coverage.hasBackup).length;
  const total = assets.length;

  return (
    <PageContainer pretitle="Coverage" title="Coverage Overview" headerActions={<span className="badge bg-blue-lt">{total} assets assessed</span>}>
      <div className="row row-deck row-cards mb-3">
        <div className="col-sm-6 col-lg-3"><div className="card"><div className="card-body"><div className="subheader">EDR Coverage</div><div className="h1 mb-0">{edr}/{total}</div></div></div></div>
        <div className="col-sm-6 col-lg-3"><div className="card"><div className="card-body"><div className="subheader">Vuln Scan</div><div className="h1 mb-0">{vulnScan}/{total}</div></div></div></div>
        <div className="col-sm-6 col-lg-3"><div className="card"><div className="card-body"><div className="subheader">Patch Mgmt</div><div className="h1 mb-0">{patch}/{total}</div></div></div></div>
        <div className="col-sm-6 col-lg-3"><div className="card"><div className="card-body"><div className="subheader">Backup</div><div className="h1 mb-0">{backup}/{total}</div></div></div></div>
      </div>
      <div className="card mb-3">
        <div className="card-header"><h3 className="card-title">Asset Coverage Matrix</h3></div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-vcenter card-table">
              <thead><tr><th>Asset</th><th>EDR</th><th>Vuln Scan</th><th>Patch</th><th>Backup</th></tr></thead>
              <tbody>
                {assets.map((a) => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 600, fontSize: primitiveTypeScale.body }}>{a.name}</td>
                    <td><span className={`badge ${a.coverage.hasEdr ? 'bg-green-lt' : 'bg-red-lt'}`}>{a.coverage.hasEdr ? 'Yes' : 'No'}</span></td>
                    <td><span className={`badge ${a.coverage.hasVulnScan ? 'bg-green-lt' : 'bg-red-lt'}`}>{a.coverage.hasVulnScan ? 'Yes' : 'No'}</span></td>
                    <td><span className={`badge ${a.coverage.hasPatchManagement ? 'bg-green-lt' : 'bg-red-lt'}`}>{a.coverage.hasPatchManagement ? 'Yes' : 'No'}</span></td>
                    <td><span className={`badge ${a.coverage.hasBackup ? 'bg-green-lt' : 'bg-red-lt'}`}>{a.coverage.hasBackup ? 'Yes' : 'No'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="card"><div className="card-body"><p className="text-muted mb-0">Coverage Gap Analysis — entity not yet built. Requires: dedicated coverage-gap entity with gap scoring model.</p></div></div>
    </PageContainer>
  );
}
