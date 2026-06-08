'use client';

/**
 * Not-Secure-by-Design Case View — UC-229
 * Filter cases for type related to inception posture failures.
 * DEBT-016 resolution page 3/4.
 */

import { useMemo } from 'react';
import { useMode } from '@/context/mode-context';
import { PageContainer } from '@/components/page-container';
import { seedCases } from '../../../../../../packages/contracts/src/fixtures/seed-cases';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import {
  primitiveSpacing,
  primitiveFontWeight,
  primitiveTypeScale,
} from '../../../../../../packages/ui/src/tokens/primitives';


/**
 * Not-secure-by-design case type (#13). Filter from seedCases.
 * Cases with caseType related to design/posture failures route to build team.
 */
export default function InceptionCasesPage() {
  const { tokens } = useMode();

  /** Filter cases that represent inception posture failures */
  const inceptionCases = useMemo(() => {
    // Case type #13 = not-secure-by-design; also include drift + coverage as related
    const inceptionTypes = ['not-secure-by-design', 'drift', 'coverage'];
    return seedCases.filter((c) =>
      inceptionTypes.some((t) => c.caseType.includes(t)) ||
      c.caseType === 'inverse-discovery-coverage-blindspot',
    );
  }, []);

  const allCasesForRouting = useMemo(() => {
    // Show all cases with their routing rationale for inception context
    return seedCases.slice(0, 10).map((c) => ({
      ref: c.caseRef,
      type: c.caseType,
      title: c.title,
      priority: c.priority,
      status: c.status,
      owner: c.owner,
      routing: c.routingRationale?.slice(0, 80) ?? '—',
    }));
  }, []);

  return (
    <PageContainer pretitle="Inception Posture Intelligence" title="Not-Secure-by-Design Case View">
      {/* KPIs */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: componentTokens.cardPadding, marginBottom: primitiveSpacing[6] }}>
        {[
          { label: 'Total Cases', value: seedCases.length },
          { label: 'Inception-Related', value: inceptionCases.length },
          { label: 'Case Types in Seed', value: new Set(seedCases.map((c) => c.caseType)).size },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], textAlign: 'center' }}>
            <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>{kpi.label}</div>
            <div style={{ fontSize: primitiveTypeScale.kpiValue, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>{kpi.value}</div>
          </div>
        ))}
      </section>

      {/* Cases Table */}
      <section style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], overflowX: 'auto' }}>
        <h3 style={{ fontSize: primitiveTypeScale.h3, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, marginBottom: primitiveSpacing[3] }}>
          Cases with Routing Info
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.body }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
              {['Ref', 'Type', 'Priority', 'Status', 'Owner', 'Routing'].map((h) => (
                <th key={h} style={{ padding: primitiveSpacing[2], textAlign: 'left', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allCasesForRouting.map((row) => (
              <tr key={row.ref} style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary, fontWeight: primitiveFontWeight.medium }}>{row.ref}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.type}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{row.priority}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.status}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.owner}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.muted, fontSize: primitiveTypeScale.caption }}>{row.routing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
