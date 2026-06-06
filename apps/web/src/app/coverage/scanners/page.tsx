'use client';

import { useMode } from '@/context/mode-context';
import { PageContainer } from '@/components/page-container';
import { seedCoverage } from '../../../../../../packages/contracts/src/fixtures/seed-coverage';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import { primitiveTypeScale, primitiveSpacing, primitiveFontWeight, primitiveFonts, primitiveLetterSpacing, primitiveSignal } from '../../../../../../packages/ui/src/tokens/primitives';

/**
 * Coverage — Scanner Coverage
 * Data: Coverage (scanner types) from seed-coverage
 * Route: /coverage/scanners | Status: BUILD
 */
{/* AI-PLACEMENT: AICAP-COV-002 — Commander AI scanner deployment recommendation */}

export default function CoverageScannersPage() {
  const { tokens } = useMode();
  const scannerTypes = seedCoverage.filter((c) => c.coverageType === 'scanner' || c.coverageType === 'vulnerability_scanner' || c.coverageType === 'edr');
  const avgCoverage = scannerTypes.length > 0 ? Math.round(scannerTypes.reduce((a, c) => a + c.coveragePercent, 0) / scannerTypes.length) : 0;
  const totalGaps = scannerTypes.reduce((a, c) => a + c.gaps.length, 0);
  const staleAgents = scannerTypes.reduce((a, c) => a + c.gaps.filter((g) => g.reason === 'agent_stale').length, 0);

  return (
    <PageContainer pretitle="Coverage › Scanners" title="Scanner Coverage">
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: componentTokens.gridGap, marginBottom: componentTokens.gridGap }}>
        <Kpi tokens={tokens} label="Scanner Types" value={String(scannerTypes.length)} />
        <Kpi tokens={tokens} label="Avg Coverage" value={`${avgCoverage}%`} accent={avgCoverage >= 90 ? primitiveSignal.success : primitiveSignal.warning} />
        <Kpi tokens={tokens} label="Gaps" value={String(totalGaps)} accent={totalGaps > 0 ? primitiveSignal.warning : undefined} />
        <Kpi tokens={tokens} label="Stale Agents" value={String(staleAgents)} accent={staleAgents > 0 ? primitiveSignal.warning : undefined} />
      </section>
      <div style={{ background: tokens.surface.elevated, border: `1px solid ${tokens.border.default}`, padding: componentTokens.cardPadding, marginBottom: componentTokens.gridGap }}>
        <h3 style={{ fontSize: primitiveTypeScale.h4, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, margin: `0 0 ${componentTokens.cardHeaderMargin}` }}>Scanner Types</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.caption }}>
            <thead><tr>{['Type', 'Domain', 'Coverage', 'Covered/Total', 'Gaps', 'Trend'].map((h) => <th key={h} style={{ textAlign: 'left', padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, borderBottom: `2px solid ${tokens.border.default}`, color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, fontSize: primitiveTypeScale.micro }}>{h}</th>)}</tr></thead>
            <tbody>{scannerTypes.map((c) => (
              <tr key={c.id} style={{ borderBottom: `1px solid ${tokens.border.subtle}` }}>
                <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.primary, fontWeight: primitiveFontWeight.semibold }}>{c.coverageType.replace(/_/g, ' ')}</td>
                <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.secondary }}>{c.domain}</td>
                <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, fontFamily: primitiveFonts.mono, color: c.coveragePercent >= 95 ? primitiveSignal.success : primitiveSignal.warning }}>{c.coveragePercent}%</td>
                <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, fontFamily: primitiveFonts.mono, color: tokens.text.muted }}>{c.coveredAssets}/{c.totalAssets}</td>
                <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, fontFamily: primitiveFonts.mono }}>{c.gaps.length}</td>
                <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: c.trend === 'improving' ? primitiveSignal.success : c.trend === 'degrading' ? primitiveSignal.critical : tokens.text.muted }}>{c.trend}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      <div style={{ background: tokens.surface.elevated, border: `1px solid ${tokens.border.default}`, padding: componentTokens.cardPadding }}>
        <h3 style={{ fontSize: primitiveTypeScale.h4, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, margin: `0 0 ${componentTokens.cardHeaderMargin}` }}>Scanner Gaps</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.caption }}>
            <thead><tr>{['Asset', 'Reason', 'Stale Days'].map((h) => <th key={h} style={{ textAlign: 'left', padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, borderBottom: `2px solid ${tokens.border.default}`, color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, fontSize: primitiveTypeScale.micro }}>{h}</th>)}</tr></thead>
            <tbody>{scannerTypes.flatMap((c) => c.gaps).map((g, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${tokens.border.subtle}` }}>
                <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.primary, fontFamily: primitiveFonts.mono, fontSize: primitiveTypeScale.micro }}>{g.assetRef}</td>
                <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}` }}><span style={{ padding: '2px 8px', fontSize: primitiveTypeScale.micro, color: '#fff', background: g.reason === 'not_deployed' ? primitiveSignal.critical : primitiveSignal.warning }}>{g.reason.replace(/_/g, ' ')}</span></td>
                <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, fontFamily: primitiveFonts.mono, color: tokens.text.muted }}>{g.staleDays ?? '—'}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}

function Kpi({ tokens, label, value, accent }: { tokens: ReturnType<typeof useMode>['tokens']; label: string; value: string; accent?: string }) {
  return (<div style={{ background: tokens.surface.elevated, border: `1px solid ${tokens.border.default}`, padding: componentTokens.cardPadding }}><span style={{ display: 'block', fontSize: primitiveTypeScale.micro, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{label}</span><span style={{ fontSize: primitiveTypeScale.kpiValue, fontFamily: primitiveFonts.mono, fontWeight: primitiveFontWeight.bold, color: accent ?? tokens.text.primary }}>{value}</span></div>);
}
