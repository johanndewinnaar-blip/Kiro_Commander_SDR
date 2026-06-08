'use client';

/**
 * Asset Dependency Graph — UC-223
 * Relationship table with source/target/type/status.
 * DEBT-015 resolution page 2/4.
 */

import { useMemo } from 'react';
import { useMode } from '@/context/mode-context';
import { PageContainer } from '@/components/page-container';
import { seedAssetRelationships } from '../../../../../../packages/contracts/src/fixtures/seed-estate';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import {
  primitiveSpacing,
  primitiveFontWeight,
  primitiveTypeScale,
} from '../../../../../../packages/ui/src/tokens/primitives';

export default function AssetDependenciesPage() {
  const { tokens } = useMode();

  const stats = useMemo(() => {
    const types = new Set(seedAssetRelationships.map((r) => r.relationshipType));
    const active = seedAssetRelationships.filter((r) => r.status === 'active').length;
    const stale = seedAssetRelationships.filter((r) => r.status === 'stale').length;
    return { total: seedAssetRelationships.length, types: types.size, active, stale };
  }, []);

  return (
    <PageContainer pretitle="Asset Architecture" title="Asset Dependency Graph">
      {/* Summary */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: componentTokens.cardPadding, marginBottom: primitiveSpacing[6] }}>
        {[
          { label: 'Total Relationships', value: stats.total },
          { label: 'Relationship Types', value: stats.types },
          { label: 'Active', value: stats.active },
          { label: 'Stale', value: stats.stale },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], textAlign: 'center' }}>
            <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>{kpi.label}</div>
            <div style={{ fontSize: primitiveTypeScale.kpiValue, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>{kpi.value}</div>
          </div>
        ))}
      </section>

      {/* Relationships Table */}
      <section style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.body }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
              {['#', 'Source Asset', 'Target Asset', 'Type', 'Confirmed By', 'Status'].map((h) => (
                <th key={h} style={{ padding: primitiveSpacing[2], textAlign: 'left', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {seedAssetRelationships.map((rel, idx) => (
              <tr key={rel.id} style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.muted }}>{idx + 1}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{rel.sourceAssetId.slice(0, 12)}…</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{rel.targetAssetId.slice(0, 12)}…</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary, fontWeight: primitiveFontWeight.medium }}>{rel.relationshipType}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{rel.confirmedBy}</td>
                <td style={{ padding: primitiveSpacing[2], color: rel.status === 'stale' ? tokens.text.primary : tokens.text.secondary, fontWeight: rel.status === 'stale' ? primitiveFontWeight.bold : primitiveFontWeight.normal }}>
                  {rel.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
