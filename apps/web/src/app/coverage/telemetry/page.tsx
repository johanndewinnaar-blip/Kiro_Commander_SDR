'use client';

import { useMode } from '@/context/mode-context';
import { PageContainer } from '@/components/page-container';
import { seedCoverage } from '../../../../../../packages/contracts/src/fixtures/seed-coverage';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import { primitiveTypeScale, primitiveSpacing, primitiveFontWeight, primitiveFonts, primitiveLetterSpacing, primitiveSignal } from '../../../../../../packages/ui/src/tokens/primitives';

/**
 * Coverage — Telemetry Coverage
 * Data: Coverage (siem, network_monitor, identity_provider) from seed-coverage
 * Route: /coverage/telemetry | Status: BUILD
 */
{/* AI-PLACEMENT: AICAP-COV-003 — Commander AI telemetry gap detection */}

export default function CoverageTelemetryPage() {
  const { tokens } = useMode();
  const telemetryTypes = seedCoverage.filter((c) => c.coverageType === 'siem' || c.coverageType === 'network_monitor' || c.coverageType === 'identity_provider');
  const avgCoverage = telemetryTypes.length > 0 ? Math.round(telemetryTypes.reduce((a, c) => a + c.coveragePercent, 0) / telemetryTypes.length) : 0;
  const totalGaps = telemetryTypes.reduce((a, c) => a + c.gaps.length, 0);
  const degrading = telemetryTypes.filter((c) => c.trend === 'degrading').length;

  return (
    <PageContainer pretitle="Coverage › Telemetry" title="Telemetry Coverage">
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: componentTokens.gridGap, marginBottom: componentTokens.gridGap }}>
        <Kpi tokens={tokens} label="Telemetry Sources" value={String(telemetryTypes.length)} />
        <Kpi tokens={tokens} label="Avg Coverage" value={`${avgCoverage}%`} accent={avgCoverage >= 90 ? primitiveSignal.success : primitiveSignal.warning} />
        <Kpi tokens={tokens} label="Gaps" value={String(totalGaps)} accent={totalGaps > 0 ? primitiveSignal.warning : undefined} />
        <Kpi tokens={tokens} label="Degrading" value={String(degrading)} accent={degrading > 0 ? primitiveSignal.critical : undefined} />
      </section>
      <div style={{ background: tokens.surface.elevated, border: `1px solid ${tokens.border.default}`, padding: componentTokens.cardPadding, marginBottom: componentTokens.gridGap }}>
        <h3 style={{ fontSize: primitiveTypeScale.h4, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, margin: `0 0 ${componentTokens.cardHeaderMargin}` }}>Telemetry Sources</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.caption }}>
            <thead><tr>{['Type', 'Domain', 'Coverage', 'Covered/Total', 'Gaps', 'Trend', 'Last Assessed'].map((h) => <th key={h} style={{ textAlign: 'left', padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, borderBottom: `2px solid ${tokens.border.default}`, color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, fontSize: primitiveTypeScale.micro }}>{h}</th>)}</tr></thead>
            <tbody>{telemetryTypes.map((c) => (
              <tr key={c.id} style={{ borderBottom: `1px solid ${tokens.border.subtle}` }}>
                <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.primary, fontWeight: primitiveFontWeight.semibold }}>{c.coverageType.replace(/_/g, ' ')}</td>
                <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.secondary }}>{c.domain}</td>
                <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, fontFamily: primitiveFonts.mono, color: c.coveragePercent >= 95 ? primitiveSignal.success : c.coveragePercent >= 85 ? primitiveSignal.warning : primitiveSignal.critical }}>{c.coveragePercent}%</td>
                <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, fontFamily: primitiveFonts.mono, color: tokens.text.muted }}>{c.coveredAssets}/{c.totalAssets}</td>
                <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, fontFamily: primitiveFonts.mono }}>{c.gaps.length}</td>
                <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: c.trend === 'improving' ? primitiveSignal.success : c.trend === 'degrading' ? primitiveSignal.critical : tokens.text.muted }}>{c.trend}</td>
                <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.muted, fontFamily: primitiveFonts.mono, fontSize: primitiveTypeScale.micro }}>{new Date(c.lastAssessedAt).toLocaleDateString()}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      <div style={{ background: tokens.surface.elevated, border: `1px solid ${tokens.border.default}`, padding: componentTokens.cardPadding }}>
        <h3 style={{ fontSize: primitiveTypeScale.h4, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, margin: `0 0 ${componentTokens.cardHeaderMargin}` }}>Telemetry Gaps</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.caption }}>
            <thead><tr>{['Asset', 'Reason', 'Stale Days'].map((h) => <th key={h} style={{ textAlign: 'left', padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, borderBottom: `2px solid ${tokens.border.default}`, color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, fontSize: primitiveTypeScale.micro }}>{h}</th>)}</tr></thead>
            <tbody>{telemetryTypes.flatMap((c) => c.gaps).length === 0 ? (
              <tr><td colSpan={3} style={{ padding: primitiveSpacing[4], textAlign: 'center', color: tokens.text.muted }}>No telemetry gaps.</td></tr>
            ) : telemetryTypes.flatMap((c) => c.gaps).map((g, i) => (
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
