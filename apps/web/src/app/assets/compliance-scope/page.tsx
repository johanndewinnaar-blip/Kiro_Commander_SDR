'use client';

/**
 * Compliance Scope Manager — UC-226
 * Framework scoping with inheritance and justification.
 * DEBT-015 resolution page 4/4.
 */

import { useMemo } from 'react';
import { useMode } from '@/context/mode-context';
import { PageContainer } from '@/components/page-container';
import { seedComplianceScopeBindings } from '../../../../../../packages/contracts/src/fixtures/seed-estate';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import {
  primitiveSpacing,
  primitiveFontWeight,
  primitiveTypeScale,
} from '../../../../../../packages/ui/src/tokens/primitives';

export default function ComplianceScopePage() {
  const { tokens } = useMode();

  const stats = useMemo(() => {
    const inScope = seedComplianceScopeBindings.filter((b) => b.scopeStatus === 'in_scope').length;
    const outOfScope = seedComplianceScopeBindings.filter((b) => b.scopeStatus === 'out_of_scope').length;
    const conditional = seedComplianceScopeBindings.filter((b) => b.scopeStatus === 'conditional').length;
    const inherited = seedComplianceScopeBindings.filter((b) => b.inheritedFrom !== null).length;
    return { total: seedComplianceScopeBindings.length, inScope, outOfScope, conditional, inherited };
  }, []);

  return (
    <PageContainer pretitle="Asset Architecture" title="Compliance Scope Manager">
      {/* Summary */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: componentTokens.cardPadding, marginBottom: primitiveSpacing[6] }}>
        {[
          { label: 'Total Bindings', value: stats.total },
          { label: 'In Scope', value: stats.inScope },
          { label: 'Out of Scope', value: stats.outOfScope },
          { label: 'Conditional', value: stats.conditional },
          { label: 'Inherited', value: stats.inherited },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], textAlign: 'center' }}>
            <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>{kpi.label}</div>
            <div style={{ fontSize: primitiveTypeScale.kpiValue, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>{kpi.value}</div>
          </div>
        ))}
      </section>

      {/* Scope Table */}
      <section style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.body }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
              {['#', 'Asset', 'Framework', 'Scope Status', 'Justification', 'Inherited From', 'Reviewed'].map((h) => (
                <th key={h} style={{ padding: primitiveSpacing[2], textAlign: 'left', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {seedComplianceScopeBindings.map((b, idx) => (
              <tr key={b.id} style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.muted }}>{idx + 1}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{b.assetId.slice(0, 12)}…</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{b.frameworkId.slice(0, 12)}…</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary, fontWeight: primitiveFontWeight.medium }}>{b.scopeStatus}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary, maxWidth: '240px' }}>{b.justification}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.muted }}>{b.inheritedFrom ?? '—'}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.muted }}>{b.reviewedAt.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
