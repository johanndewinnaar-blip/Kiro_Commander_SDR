'use client';

import { PageContainer } from '@/components/page-container';
import { seedAssets } from '../../../../../../packages/contracts/src/fixtures/seed-assets';
import { seedConnectors } from '../../../../../../packages/contracts/src/fixtures/seed-connectors';
import { primitiveTypeScale } from '../../../../../../packages/ui/src/tokens/primitives';

/**
 * SOM — Cloud Security Manager
 * Data: asset.ts (cloudProvider field) + connector.ts
 * Route: /som/cloud-security | Nav Group: SOM
 */
export default function SomCloudSecurityPage() {
  const cloudAssets = seedAssets.filter((a) => a.platform?.cloudProvider);
  const cloudProviders = cloudAssets.reduce((acc, a) => { const p = a.platform!.cloudProvider!; acc[p] = (acc[p] || 0) + 1; return acc; }, {} as Record<string, number>);
  const cloudConnectors = seedConnectors.filter((c) => c.sourceType.includes('aws') || c.sourceType.includes('azure') || c.sourceType.includes('gcp'));

  return (
    <PageContainer pretitle="SOM › Cloud Security" title="Cloud Security Manager" headerActions={<span className="badge bg-blue-lt">{cloudAssets.length} cloud assets</span>}>
      <div className="row row-deck row-cards mb-3">
        <div className="col-sm-6 col-lg-3"><div className="card"><div className="card-body"><div className="subheader">Cloud Assets</div><div className="h1 mb-0">{cloudAssets.length}</div></div></div></div>
        <div className="col-sm-6 col-lg-3"><div className="card"><div className="card-body"><div className="subheader">Cloud Providers</div><div className="h1 mb-0">{Object.keys(cloudProviders).length}</div></div></div></div>
        <div className="col-sm-6 col-lg-3"><div className="card"><div className="card-body"><div className="subheader">Cloud Connectors</div><div className="h1 mb-0">{cloudConnectors.length}</div></div></div></div>
        <div className="col-sm-6 col-lg-3"><div className="card"><div className="card-body"><div className="subheader">Total Assets</div><div className="h1 mb-0">{seedAssets.length}</div></div></div></div>
      </div>
      {Object.keys(cloudProviders).length > 0 ? (
        <div className="card mb-3">
          <div className="card-header"><h3 className="card-title">Cloud Provider Distribution</h3></div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-vcenter card-table">
                <thead><tr><th>Provider</th><th>Assets</th></tr></thead>
                <tbody>
                  {Object.entries(cloudProviders).map(([provider, count]) => (
                    <tr key={provider}><td style={{ fontWeight: 600, fontSize: primitiveTypeScale.body }}>{provider}</td><td>{count}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="card mb-3"><div className="card-body"><p className="text-muted mb-0">No cloud-hosted assets in seed data (cloudProvider field not populated).</p></div></div>
      )}
      <div className="card"><div className="card-body"><p className="text-muted mb-0">Cloud Security Posture — entity not yet built. Requires: cloud-security-posture entity with multi-cloud drift detection.</p></div></div>
    </PageContainer>
  );
}
