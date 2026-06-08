'use client';

/**
 * Journey Quality Scores — UC-217
 * Quality metrics per template type with band classification.
 * DEBT-014 resolution page 7/8.
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

function qualityBand(successRate: number): string {
  if (successRate >= 0.80) return 'Excellent';
  if (successRate >= 0.65) return 'Good';
  if (successRate >= 0.50) return 'Acceptable';
  return 'Needs Improvement';
}

export default function JourneyQualityPage() {
  const { tokens } = useMode();

  const qualityData = useMemo(() => {
    return seedJourneyTemplates.map((t) => {
      const successRate = t.expectedOutcomeDistribution.successful ?? 0;
      const partialRate = t.expectedOutcomeDistribution.partially_successful ?? 0;
      const failRate = t.expectedOutcomeDistribution.failed ?? 0;
      const compositeScore = (successRate * 1.0 + partialRate * 0.5) * 100;
      return {
        templateId: t.templateId,
        name: t.name,
        successRate: (successRate * 100).toFixed(0),
        partialRate: (partialRate * 100).toFixed(0),
        failRate: (failRate * 100).toFixed(0),
        compositeScore: compositeScore.toFixed(0),
        band: qualityBand(successRate),
      };
    });
  }, []);

  const avgComposite = qualityData.length
    ? (qualityData.reduce((s, d) => s + parseFloat(d.compositeScore), 0) / qualityData.length).toFixed(0)
    : '0';

  return (
    <PageContainer pretitle="Journey Intelligence" title="Journey Quality Scores">
      {/* Summary KPIs */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: componentTokens.cardPadding, marginBottom: primitiveSpacing[6] }}>
        {[
          { label: 'Templates Assessed', value: qualityData.length },
          { label: 'Avg Composite Score', value: `${avgComposite}%` },
          { label: 'Excellent Band', value: qualityData.filter((d) => d.band === 'Excellent').length },
          { label: 'Needs Improvement', value: qualityData.filter((d) => d.band === 'Needs Improvement').length },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], textAlign: 'center' }}>
            <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>{kpi.label}</div>
            <div style={{ fontSize: primitiveTypeScale.kpiValue, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>{kpi.value}</div>
          </div>
        ))}
      </section>

      {/* Quality Table */}
      <section style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.body }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
              {['Template', 'Name', 'Success %', 'Partial %', 'Fail %', 'Composite', 'Band'].map((h) => (
                <th key={h} style={{ padding: primitiveSpacing[2], textAlign: 'left', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {qualityData.map((row) => (
              <tr key={row.templateId} style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary, fontWeight: primitiveFontWeight.medium }}>{row.templateId}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.name}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{row.successRate}%</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.partialRate}%</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.failRate}%</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary, fontWeight: primitiveFontWeight.medium }}>{row.compositeScore}%</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{row.band}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
