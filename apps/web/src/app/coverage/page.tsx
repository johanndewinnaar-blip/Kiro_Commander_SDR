'use client';

import { useMode } from '@/context/mode-context';
import { PageContainer } from '@/components/page-container';
import { seedCoverage } from '../../../../../packages/contracts/src/fixtures/seed-coverage';
import { componentTokens } from '../../../../../packages/ui/src/tokens/components';
import { primitiveTypeScale, primitiveSpacing, primitiveFontWeight, primitiveFonts, primitiveLetterSpacing, primitiveSignal } from '../../../../../packages/ui/src/tokens/primitives';

/**
 * Coverage — Overview
 * Data: Coverage from seed-coverage
 * Route: /coverage | Status: BUILD
 */
{/* AI-PLACEMENT: AICAP-COV-001 — Commander AI coverage improvement recommendation */}

export default function CoverageOverviewPage() {
  const { tokens } = useMode();
  const avgCoverage = seedCoverage.length > 0 ? Math.round(seedCoverage.reduce((a, c) => a + c.coveragePercent, 0) / seedCoverage.length) : 0;
  const improving = seedCoverage.filter((c) => c.trend === 'improving').length;
  const degrading = seedCoverage.filter((c) => c.trend === 'degrading').length;
  const totalGaps = seedCoverage.reduce((a, c) => a + c.gaps.length, 0);

  return (
    <PageContainer pretitle="Coverage" title="Coverage Overview">
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: componentTokens.gridGap, marginBottom: componentTokens.gridGap }}>
        <Kpi tokens={tokens} label="Avg Coverage" value={`${avgCoverage}%`} accent={avgCoverage >= 90 ? primitiveSignal.success : primitiveSignal.warning} />
        <Kpi tokens={tokens} label="Improving" value={String(improving)} accent={primitiveSignal.success} />
        <Kpi tokens={tokens} label="Degrading" value={String(degrading)} accent={degrading > 0 ? primitiveSignal.critical : undefined} />
        <Kpi tokens={tokens} label="Total Gaps" value={String(totalGaps)} accent={totalGaps > 0 ? primitiveSignal.warning : undefined} />
      </section>
      <div style={{ background: tokens.surface.elevated, border: `1px solid ${tokens.border.default}`, padding: componentTokens.cardPadding }}>
        <h3 style={{ fontSize: primitiveTypeScale.h4, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, margin: `0 0 ${componentTokens.cardHeaderMargin}` }}>Coverage by Type</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.caption }}>
            <thead><tr>{['Type', 'Domain', 'Coverage %', 'Covered/Total', 'Gaps', 'Trend', 'Assessed'].map((h) => <th key={h} style={{ textAlign: 'left', padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, borderBottom: `2px solid ${tokens.border.default}`, color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, fontSize: primitiveTypeScale.micro }}>{h}</th>)}</tr></thead>
            <tbody>{seedCoverage.map((c) => {
              const pctColor = c.coveragePercent >= 95 ? primitiveSignal.success : c.coveragePercent >= 85 ? primitiveSignal.warning : primitiveSignal.critical;
              const trendIcon = c.trend === 'improving' ? '↑' : c.trend === 'degrading' ? '↓' : '→';
              return (
                <tr key={c.id} style={{ borderBottom: `1px solid ${tokens.border.subtle}` }}>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.primary, fontWeight: primitiveFontWeight.semibold }}>{c.coverageType.replace(/_/g, ' ')}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.secondary }}>{c.domain}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, fontFamily: primitiveFonts.mono, color: pctColor }}>{c.coveragePercent}%</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, fontFamily: primitiveFonts.mono, color: tokens.text.muted }}>{c.coveredAssets}/{c.totalAssets}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, fontFamily: primitiveFonts.mono }}>{c.gaps.length}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: c.trend === 'improving' ? primitiveSignal.success : c.trend === 'degrading' ? primitiveSignal.critical : tokens.text.muted }}>{trendIcon} {c.trend}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.muted, fontFamily: primitiveFonts.mono, fontSize: primitiveTypeScale.micro }}>{new Date(c.lastAssessedAt).toLocaleDateString()}</td>
                </tr>
              );
            })}</tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}

function Kpi({ tokens, label, value, accent }: { tokens: ReturnType<typeof useMode>['tokens']; label: string; value: string; accent?: string }) {
  return (<div style={{ background: tokens.surface.elevated, border: `1px solid ${tokens.border.default}`, padding: componentTokens.cardPadding }}><span style={{ display: 'block', fontSize: primitiveTypeScale.micro, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{label}</span><span style={{ fontSize: primitiveTypeScale.kpiValue, fontFamily: primitiveFonts.mono, fontWeight: primitiveFontWeight.bold, color: accent ?? tokens.text.primary }}>{value}</span></div>);
}
