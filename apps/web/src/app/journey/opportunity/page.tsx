'use client';

/**
 * Automation Opportunity Scores — UC-218
 * Opportunity scores per template: automation potential based on outcomes + complexity.
 * DEBT-014 resolution page 8/8.
 */

import { useMemo } from 'react';
import { useMode } from '@/context/mode-context';
import { PageContainer } from '@/components/page-container';
import { seedJourneyTemplates } from '../../../../../../packages/contracts/src/fixtures/seed-journey-templates';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import {
  primitiveSpacing,
  primitiveFontWeight,
  primitiveTypeScale,
} from '../../../../../../packages/ui/src/tokens/primitives';

function opportunityScore(t: (typeof seedJourneyTemplates)[number]): number {
  const successRate = t.expectedOutcomeDistribution.successful ?? 0;
  const phasesCount = t.expectedPhases.length;
  const isSystemDriven = t.expectedDeliveryModes.includes('system_driven');
  const complexityPenalty = phasesCount > 3 ? 0.1 : 0;
  const modeBonus = isSystemDriven ? 0.15 : 0;
  return Math.min(100, Math.max(0, (successRate + modeBonus - complexityPenalty) * 100));
}

export default function JourneyOpportunityPage() {
  const { tokens } = useMode();

  const oppData = useMemo(() => {
    return seedJourneyTemplates
      .map((t) => ({
        templateId: t.templateId,
        name: t.name,
        anchorType: t.anchorType,
        successRate: ((t.expectedOutcomeDistribution.successful ?? 0) * 100).toFixed(0),
        phases: t.expectedPhases.length,
        modes: t.expectedDeliveryModes.join(', '),
        score: opportunityScore(t).toFixed(0),
      }))
      .sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
  }, []);

  const highOpportunity = oppData.filter((d) => parseFloat(d.score) >= 80).length;

  return (
    <PageContainer pretitle="Journey Intelligence" title="Automation Opportunity Scores">
      {/* Summary */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: componentTokens.cardPadding, marginBottom: primitiveSpacing[6] }}>
        {[
          { label: 'Templates Assessed', value: oppData.length },
          { label: 'High Opportunity (≥80)', value: highOpportunity },
          { label: 'Avg Score', value: `${(oppData.reduce((s, d) => s + parseFloat(d.score), 0) / oppData.length).toFixed(0)}%` },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], textAlign: 'center' }}>
            <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>{kpi.label}</div>
            <div style={{ fontSize: primitiveTypeScale.kpiValue, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>{kpi.value}</div>
          </div>
        ))}
      </section>

      {/* Opportunity Table */}
      <section style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.body }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
              {['Template', 'Name', 'Anchor', 'Success %', 'Phases', 'Modes', 'Opportunity Score'].map((h) => (
                <th key={h} style={{ padding: primitiveSpacing[2], textAlign: 'left', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {oppData.map((row) => (
              <tr key={row.templateId} style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary, fontWeight: primitiveFontWeight.medium }}>{row.templateId}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.name}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.anchorType}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{row.successRate}%</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.phases}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.muted, fontSize: primitiveTypeScale.caption }}>{row.modes}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary, fontWeight: primitiveFontWeight.bold }}>{row.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
