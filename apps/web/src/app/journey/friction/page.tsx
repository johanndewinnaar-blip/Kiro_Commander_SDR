'use client';

/**
 * Automation Friction Dashboard — UC-219
 * Drag, failure rate, rescue rate per delivery mode / action type.
 * DEBT-014 resolution page 4/8.
 */

import { useMemo } from 'react';
import { useMode } from '@/context/mode-context';
import { PageContainer } from '@/components/page-container';
import { seedJourneys } from '../../../../../../packages/contracts/src/fixtures/seed-journeys';
import { seedJourneyTemplates } from '../../../../../../packages/contracts/src/fixtures/seed-journey-templates';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import {
  primitiveSpacing,
  primitiveFontWeight,
  primitiveTypeScale,
} from '../../../../../../packages/ui/src/tokens/primitives';

export default function JourneyFrictionPage() {
  const { tokens } = useMode();

  const frictionData = useMemo(() => {
    const modes = ['system_driven', 'human_confirmed_automation', 'ai_enhanced', 'autonomous', 'manual'] as const;
    return modes.map((mode) => {
      const journeysInMode = seedJourneys.filter((j) => j.deliveryMode === mode);
      const total = journeysInMode.length;
      const failed = journeysInMode.filter((j) => j.outcome === 'failed').length;
      const reworked = journeysInMode.filter((j) => j.reworkCount > 0).length;
      const stalled = journeysInMode.filter((j) => j.status === 'stalled').length;
      return {
        mode,
        total,
        failureRate: total > 0 ? ((failed / total) * 100).toFixed(0) : '0',
        reworkRate: total > 0 ? ((reworked / total) * 100).toFixed(0) : '0',
        stallRate: total > 0 ? ((stalled / total) * 100).toFixed(0) : '0',
        drag: total > 0 ? ((failed + reworked + stalled) / total * 100).toFixed(0) : '0',
      };
    });
  }, []);

  return (
    <PageContainer pretitle="Journey Intelligence" title="Automation Friction Dashboard">
      {/* KPI Strip */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: componentTokens.cardPadding, marginBottom: primitiveSpacing[6] }}>
        {[
          { label: 'Total Journeys', value: seedJourneys.length },
          { label: 'Total Reworking', value: seedJourneys.filter((j) => j.reworkCount > 0).length },
          { label: 'Total Failed', value: seedJourneys.filter((j) => j.outcome === 'failed').length },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], textAlign: 'center' }}>
            <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>{kpi.label}</div>
            <div style={{ fontSize: primitiveTypeScale.kpiValue, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>{kpi.value}</div>
          </div>
        ))}
      </section>

      {/* Friction Table */}
      <section style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4] }}>
        <h3 style={{ fontSize: primitiveTypeScale.h3, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, marginBottom: primitiveSpacing[3] }}>
          Friction by Delivery Mode
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.body }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
              {['Delivery Mode', 'Count', 'Failure %', 'Rework %', 'Stall %', 'Total Drag %'].map((h) => (
                <th key={h} style={{ padding: primitiveSpacing[2], textAlign: 'left', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {frictionData.map((row) => (
              <tr key={row.mode} style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{row.mode}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{row.total}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.failureRate}%</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.reworkRate}%</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.stallRate}%</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary, fontWeight: primitiveFontWeight.medium }}>{row.drag}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
