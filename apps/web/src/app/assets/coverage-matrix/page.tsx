'use client';

/**
 * Coverage Gap Matrix — UC-225
 * Coverage status per asset: covered, gap, stale.
 * DEBT-015 resolution page 3/4.
 */

import { useMemo } from 'react';
import { useMode } from '@/context/mode-context';
import { PageContainer } from '@/components/page-container';
import { seedAssetCoverageBindings } from '../../../../../../packages/contracts/src/fixtures/seed-estate';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import {
  primitiveSpacing,
  primitiveFontWeight,
  primitiveTypeScale,
} from '../../../../../../packages/ui/src/tokens/primitives';

export default function CoverageMatrixPage() {
  const { tokens } = useMode();

  const stats = useMemo(() => {
    const covered = seedAssetCoverageBindings.filter((b) => b.status === 'covered').length;
    const gap = seedAssetCoverageBindings.filter((b) => b.status === 'gap').length;
    const stale = seedAssetCoverageBindings.filter((b) => b.status === 'stale').length;
    const coverageTypes = new Set(seedAssetCoverageBindings.map((b) => b.coverageType));
    return { total: seedAssetCoverageBindings.length, covered, gap, stale, types: coverageTypes.size };
  }, []);

  return (
    <PageContainer pretitle="Asset Architecture" title="Coverage Gap Matrix">
      {/* Summary KPIs */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: componentTokens.cardPadding, marginBottom: primitiveSpacing[6] }}>
        {[
          { label: 'Total Bindings', value: stats.total },
          { label: 'Covered', value: stats.covered },
          { label: 'Gap', value: stats.gap },
          { label: 'Stale', value: stats.stale },
          { label: 'Coverage Types', value: stats.types },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], textAlign: 'center' }}>
            <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>{kpi.label}</div>
            <div style={{ fontSize: primitiveTypeScale.kpiValue, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>{kpi.value}</div>
          </div>
        ))}
      </section>

      {/* Coverage Matrix Table */}
      <section style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4] }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.body }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
              {['#', 'Asset ID', 'Coverage Type', 'Connector', 'Confirmed At', 'Status'].map((h) => (
                <th key={h} style={{ padding: primitiveSpacing[2], textAlign: 'left', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {seedAssetCoverageBindings.map((b, idx) => (
              <tr key={b.id} style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.muted }}>{idx + 1}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{b.assetId.slice(0, 12)}…</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{b.coverageType}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{b.connectorId.slice(0, 12)}…</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.muted }}>{b.confirmedAt.slice(0, 10)}</td>
                <td style={{
                  padding: primitiveSpacing[2],
                  fontWeight: b.status === 'gap' ? primitiveFontWeight.bold : primitiveFontWeight.normal,
                  color: tokens.text.primary,
                }}>
                  {b.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
