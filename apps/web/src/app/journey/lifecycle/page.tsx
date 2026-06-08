'use client';

/**
 * Journey Lifecycle Dashboard — UC-213
 * Aggregate journey tempo, leakage, quality KPIs from seed journeys.
 * DEBT-014 resolution page 1/8.
 */

import { useMemo } from 'react';
import { useMode } from '@/context/mode-context';
import { PageContainer } from '@/components/page-container';
import { seedJourneys } from '../../../../../../packages/contracts/src/fixtures/seed-journeys';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import {
  primitiveSpacing,
  primitiveFontWeight,
  primitiveTypeScale,
} from '../../../../../../packages/ui/src/tokens/primitives';

export default function JourneyLifecyclePage() {
  const { tokens } = useMode();

  const stats = useMemo(() => {
    const total = seedJourneys.length;
    const active = seedJourneys.filter((j) => j.status === 'active').length;
    const completed = seedJourneys.filter((j) => j.status === 'completed').length;
    const stalled = seedJourneys.filter((j) => j.status === 'stalled').length;
    const reworking = seedJourneys.filter((j) => j.status === 'reworking').length;
    const abandoned = seedJourneys.filter((j) => j.status === 'abandoned').length;

    const completedJourneys = seedJourneys.filter((j) => j.completedAt && j.startedAt);
    const avgDurationHours = completedJourneys.length
      ? completedJourneys.reduce((sum, j) => {
          const dur = (new Date(j.completedAt!).getTime() - new Date(j.startedAt).getTime()) / 3_600_000;
          return sum + dur;
        }, 0) / completedJourneys.length
      : 0;

    return { total, active, completed, stalled, reworking, abandoned, avgDurationHours };
  }, []);

  const kpis = [
    { label: 'Total Journeys', value: stats.total },
    { label: 'Active', value: stats.active },
    { label: 'Completed', value: stats.completed },
    { label: 'Stalled', value: stats.stalled },
    { label: 'Avg Duration (hrs)', value: stats.avgDurationHours.toFixed(1) },
    { label: 'Reworking', value: stats.reworking },
  ];

  return (
    <PageContainer pretitle="Journey Intelligence" title="Journey Lifecycle Dashboard">
      {/* KPI Strip */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: componentTokens.cardPadding,
          marginBottom: primitiveSpacing[6],
        }}
      >
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            style={{
              background: tokens.surface.secondary,
              border: `1px solid ${tokens.border.default}`,
              borderRadius: '2px',
              padding: primitiveSpacing[4],
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted, marginBottom: primitiveSpacing[1] }}>
              {kpi.label}
            </div>
            <div style={{ fontSize: primitiveTypeScale.kpiValue, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>
              {kpi.value}
            </div>
          </div>
        ))}
      </section>

      {/* Journey Table */}
      <section style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4] }}>
        <h3 style={{ fontSize: primitiveTypeScale.h3, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, marginBottom: primitiveSpacing[3] }}>
          All Journeys
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.body }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
              {['Anchor', 'Template', 'Phase', 'Status', 'Outcome', 'Delivery Mode'].map((h) => (
                <th key={h} style={{ padding: primitiveSpacing[2], textAlign: 'left', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {seedJourneys.map((j) => (
              <tr key={j.id} style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{j.anchorType}/{j.anchorId}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{j.templateRef ?? '—'}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{j.currentPhase}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{j.status}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{j.outcome}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{j.deliveryMode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
