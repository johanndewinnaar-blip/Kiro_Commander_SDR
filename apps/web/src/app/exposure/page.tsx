'use client';

import { PageContainer } from '@/components/page-container';
import { seedRiskObjects } from '../../../../../packages/contracts/src/fixtures/seed-risk-objects';
import { primitiveTypeScale, primitiveSignal } from '../../../../../packages/ui/src/tokens/primitives';

/**
 * Exposure Management — Overview
 * Data: risk-object.ts (exposure_drift type)
 * Route: /exposure | Nav Group: Exposure Management
 */
export default function ExposurePage() {
  const exposureRisks = seedRiskObjects.filter((r) => r.type === 'exposure_drift');
  const allDrift = seedRiskObjects.filter((r) => r.type === 'exposure_drift' || r.type === 'configuration_drift' || r.type === 'vulnerability_drift');
  const openCount = allDrift.filter((r) => r.treatmentState === 'open').length;

  return (
    <PageContainer pretitle="Drift Operations › Exposure Management" title="Exposure Management" headerActions={<span className="badge bg-blue-lt">{allDrift.length} drift findings</span>}>
      <div className="row row-deck row-cards mb-3">
        <div className="col-sm-6 col-lg-3"><div className="card"><div className="card-body"><div className="subheader">Exposure Drift</div><div className="h1 mb-0">{exposureRisks.length}</div></div></div></div>
        <div className="col-sm-6 col-lg-3"><div className="card"><div className="card-body"><div className="subheader">All Drift Types</div><div className="h1 mb-0">{allDrift.length}</div></div></div></div>
        <div className="col-sm-6 col-lg-3"><div className="card"><div className="card-body"><div className="subheader">Open</div><div className="h1 mb-0" style={{ color: primitiveSignal.critical }}>{openCount}</div></div></div></div>
        <div className="col-sm-6 col-lg-3"><div className="card"><div className="card-body"><div className="subheader">Mitigated</div><div className="h1 mb-0" style={{ color: '#2fb344' }}>{allDrift.length - openCount}</div></div></div></div>
      </div>
      <div className="card mb-3">
        <div className="card-header"><h3 className="card-title">Drift Risk Objects</h3></div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-vcenter card-table">
              <thead><tr><th>Type</th><th>Affected Entity</th><th>Treatment</th><th>Justification</th></tr></thead>
              <tbody>
                {allDrift.map((r) => (
                  <tr key={r.id}>
                    <td><span className="badge bg-orange-lt">{r.type}</span></td>
                    <td className="text-muted" style={{ fontSize: primitiveTypeScale.caption }}>{r.affectedEntityId}</td>
                    <td><span className={`badge ${r.treatmentState === 'open' ? 'bg-red-lt' : 'bg-green-lt'}`}>{r.treatmentState}</span></td>
                    <td className="text-muted" style={{ fontSize: primitiveTypeScale.caption }}>{r.justification}</td>
                  </tr>
                ))}
                {allDrift.length === 0 && <tr><td colSpan={4} className="text-muted text-center">No drift findings in seed data</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Placeholder: dedicated exposure entity */}
      <div className="card"><div className="card-body"><p className="text-muted mb-0">Blast Zones — entity not yet built. Requires: dedicated exposure/blast-zone entity with attack-path computation.</p></div></div>
    </PageContainer>
  );
}
