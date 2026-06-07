'use client';

import { useState } from 'react';
import { useMode } from '@/context/mode-context';
import { PageContainer } from '@/components/page-container';
import { seedInverseDiscovery } from '../../../../../../packages/contracts/src/fixtures/seed-inverse-discovery';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import {
  primitiveTypeScale, primitiveSpacing, primitiveFontWeight,
  primitiveFonts, primitiveLetterSpacing, primitiveSignal,
} from '../../../../../../packages/ui/src/tokens/primitives';

/**
 * Coverage — Blindspot Inventory
 *
 * Source: Spec #40 Inverse Discovery Loop
 * Use Case: UC-183 — Generate coverage blindspot case from unresolved lookup
 * Route: /coverage/blindspots | Nav Group: Coverage | Status: BUILD
 */

export default function CoverageBlindSpotsPage() {
  const { tokens } = useMode();
  const [filter, setFilter] = useState<string>('all');

  const rootCauses = Array.from(new Set(seedInverseDiscovery.filter((e) => e.rootCause).map((e) => e.rootCause!)));
  const filtered = filter === 'all' ? seedInverseDiscovery : seedInverseDiscovery.filter((e) => e.rootCause === filter);

  const unresolved = seedInverseDiscovery.filter((e) => e.lookupResult === 'unresolved').length;
  const casesGenerated = seedInverseDiscovery.filter((e) => e.caseGeneratedRef).length;
  const onboarded = seedInverseDiscovery.filter((e) => e.onboardingTriggered).length;

  const resultColor = (result: string) => {
    switch (result) {
      case 'resolved': return primitiveSignal.success;
      case 'partial': return primitiveSignal.warning;
      case 'unresolved': return primitiveSignal.critical;
      default: return primitiveSignal.neutral;
    }
  };

  return (
    <PageContainer pretitle="Coverage › Blindspot Inventory" title="Coverage Blindspots">
      {/* KPI strip */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: componentTokens.gridGap, marginBottom: componentTokens.gridGap }}>
        <KpiCard tokens={tokens} label="Total Events" value={String(seedInverseDiscovery.length)} />
        <KpiCard tokens={tokens} label="Unresolved" value={String(unresolved)} accent={primitiveSignal.critical} />
        <KpiCard tokens={tokens} label="Cases Generated" value={String(casesGenerated)} accent={primitiveSignal.warning} />
        <KpiCard tokens={tokens} label="Onboarding Triggered" value={String(onboarded)} accent={primitiveSignal.info} />
      </section>

      {/* Filter */}
      <div style={{ marginBottom: componentTokens.gridGap }}>
        <label style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Root Cause</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}
          style={{ marginLeft: primitiveSpacing[2], height: componentTokens.inputHeight, padding: `0 ${primitiveSpacing[2]}`, background: tokens.surface.secondary, color: tokens.text.primary, border: `1px solid ${tokens.border.default}`, borderRadius: 0, fontSize: primitiveTypeScale.caption }}>
          <option value="all">All</option>
          {rootCauses.map((rc) => <option key={rc} value={rc}>{rc.replace(/_/g, ' ')}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: tokens.surface.elevated, border: `1px solid ${tokens.border.default}`, padding: componentTokens.cardPadding }}>
        <h3 style={{ fontSize: primitiveTypeScale.h4, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, margin: `0 0 ${componentTokens.cardHeaderMargin}` }}>Lookup Failures</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.caption }}>
            <thead>
              <tr>
                {['Lookup Key', 'Type', 'Result', 'Secondary', 'Root Cause', 'Case', 'Onboard', 'Connector'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, borderBottom: `2px solid ${tokens.border.default}`, color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, fontSize: primitiveTypeScale.micro }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} style={{ borderBottom: `1px solid ${tokens.border.subtle}` }}>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.primary, fontWeight: primitiveFontWeight.semibold, fontFamily: primitiveFonts.mono }}>{e.lookupKey}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.secondary }}>{e.lookupEntityType}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}` }}><span style={{ padding: '2px 8px', fontSize: primitiveTypeScale.micro, fontWeight: primitiveFontWeight.semibold, textTransform: 'uppercase', color: '#fff', background: resultColor(e.lookupResult) }}>{e.lookupResult}</span></td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.secondary }}>{e.secondaryAttempted ? (e.secondaryResult ?? '—') : 'N/A'}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.secondary }}>{e.rootCause?.replace(/_/g, ' ') ?? '—'}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: e.caseGeneratedRef ? primitiveSignal.warning : tokens.text.muted, fontFamily: primitiveFonts.mono }}>{e.caseGeneratedRef ?? '—'}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: e.onboardingTriggered ? primitiveSignal.info : tokens.text.muted }}>{e.onboardingTriggered ? '✓' : '—'}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.muted, fontSize: primitiveTypeScale.micro }}>{e.connectorRef}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}

function KpiCard({ tokens, label, value, accent }: { tokens: ReturnType<typeof useMode>['tokens']; label: string; value: string; accent?: string }) {
  return (
    <div style={{ background: tokens.surface.elevated, border: `1px solid ${tokens.border.default}`, padding: componentTokens.cardPadding }}>
      <span style={{ display: 'block', fontSize: primitiveTypeScale.micro, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{label}</span>
      <span style={{ fontSize: primitiveTypeScale.kpiValue, fontFamily: primitiveFonts.mono, fontWeight: primitiveFontWeight.bold, color: accent ?? tokens.text.primary }}>{value}</span>
    </div>
  );
}
