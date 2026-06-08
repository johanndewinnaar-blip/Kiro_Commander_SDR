'use client';

/**
 * Inception Posture Dashboard — UC-228
 * Posture origin distribution from seed assets.
 * DEBT-016 resolution page 2/4.
 */

import { useMemo } from 'react';
import { useMode } from '@/context/mode-context';
import { PageContainer } from '@/components/page-container';
import { seedEstateNodes } from '../../../../../../packages/contracts/src/fixtures/seed-estate';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import {
  primitiveSpacing,
  primitiveFontWeight,
  primitiveTypeScale,
} from '../../../../../../packages/ui/src/tokens/primitives';


/**
 * Posture origin categories derived from estate node statuses and compliance scopes.
 * "secure_by_design" = active + has compliance scopes
 * "not_secure_by_design" = integrating or no compliance scopes
 */
export default function InceptionPosturePage() {
  const { tokens } = useMode();

  const postureData = useMemo(() => {
    const secureByDesign = seedEstateNodes.filter(
      (n) => n.status === 'active' && n.complianceScopes.length > 0,
    );
    const notSecureByDesign = seedEstateNodes.filter(
      (n) => n.status !== 'active' || n.complianceScopes.length === 0,
    );
    return { secureByDesign, notSecureByDesign };
  }, []);

  const total = seedEstateNodes.length;
  const secureCount = postureData.secureByDesign.length;
  const notSecureCount = postureData.notSecureByDesign.length;
  const securePct = total > 0 ? ((secureCount / total) * 100).toFixed(0) : '0';

  return (
    <PageContainer pretitle="Inception Posture Intelligence" title="Inception Posture Dashboard">
      {/* KPI Strip */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: componentTokens.cardPadding, marginBottom: primitiveSpacing[6] }}>
        {[
          { label: 'Total Estate Nodes', value: total },
          { label: 'Secure by Design', value: secureCount },
          { label: 'Not Secure by Design', value: notSecureCount },
          { label: 'Secure %', value: `${securePct}%` },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], textAlign: 'center' }}>
            <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>{kpi.label}</div>
            <div style={{ fontSize: primitiveTypeScale.kpiValue, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>{kpi.value}</div>
          </div>
        ))}
      </section>

      {/* Distribution Table */}
      <section style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4] }}>
        <h3 style={{ fontSize: primitiveTypeScale.h3, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, marginBottom: primitiveSpacing[3] }}>
          Posture Origin Distribution
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.body }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
              {['Node', 'Type', 'Status', 'Compliance Scopes', 'Posture Origin'].map((h) => (
                <th key={h} style={{ padding: primitiveSpacing[2], textAlign: 'left', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {seedEstateNodes.map((node) => {
              const isSecure = node.status === 'active' && node.complianceScopes.length > 0;
              return (
                <tr key={node.nodeId} style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
                  <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{node.name}</td>
                  <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{node.nodeType}</td>
                  <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{node.status}</td>
                  <td style={{ padding: primitiveSpacing[2], color: tokens.text.muted }}>{node.complianceScopes.join(', ') || '—'}</td>
                  <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary, fontWeight: primitiveFontWeight.medium }}>
                    {isSecure ? 'secure_by_design' : 'not_secure_by_design'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
