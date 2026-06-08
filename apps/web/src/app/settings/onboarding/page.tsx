'use client';

/**
 * Onboarding Activation Manager — UC-231
 * Phased scope activation per estate node/tier.
 * DEBT-016 resolution page 4/4.
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


/** Activation scope derived from estate nodes and their tiers */
export default function OnboardingActivationPage() {
  const { tokens } = useMode();

  const activationData = useMemo(() => {
    return seedEstateNodes.map((node) => ({
      nodeId: node.nodeId,
      name: node.name,
      nodeType: node.nodeType,
      status: node.status,
      geography: node.geography ?? 'Global',
      complianceScopes: node.complianceScopes.join(', ') || 'None',
      activationPhase: node.status === 'active' ? 'Phase 1 (Active)' : 'Phase 2 (Pending)',
      activated: node.status === 'active',
    }));
  }, []);

  const activeCount = activationData.filter((d) => d.activated).length;
  const pendingCount = activationData.filter((d) => !d.activated).length;

  return (
    <PageContainer pretitle="Settings › Inception Posture" title="Onboarding Activation Manager">
      {/* KPI Strip */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: componentTokens.cardPadding, marginBottom: primitiveSpacing[6] }}>
        {[
          { label: 'Total Estate Nodes', value: activationData.length },
          { label: 'Phase 1 (Active)', value: activeCount },
          { label: 'Phase 2 (Pending)', value: pendingCount },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], textAlign: 'center' }}>
            <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>{kpi.label}</div>
            <div style={{ fontSize: primitiveTypeScale.kpiValue, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>{kpi.value}</div>
          </div>
        ))}
      </section>

      {/* Activation Table */}
      <section style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], overflowX: 'auto' }}>
        <h3 style={{ fontSize: primitiveTypeScale.h3, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, marginBottom: primitiveSpacing[3] }}>
          Activation Scope Configuration
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.body }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
              {['Node', 'Name', 'Type', 'Geography', 'Compliance', 'Phase', 'Status'].map((h) => (
                <th key={h} style={{ padding: primitiveSpacing[2], textAlign: 'left', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activationData.map((row) => (
              <tr key={row.nodeId} style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary, fontWeight: primitiveFontWeight.medium }}>{row.nodeId}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{row.name}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.nodeType}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.geography}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.muted }}>{row.complianceScopes}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{row.activationPhase}</td>
                <td style={{ padding: primitiveSpacing[2], color: row.activated ? tokens.text.primary : tokens.text.muted }}>
                  {row.activated ? 'Activated' : 'Pending'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
