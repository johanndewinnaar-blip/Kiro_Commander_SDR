'use client';

/**
 * Automation Maturity Tracker — UC-220
 * Delivery mode distribution and maturity progression.
 * DEBT-014 resolution page 5/8.
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

const MATURITY_LEVELS = ['manual', 'human_confirmed_automation', 'system_driven', 'ai_enhanced', 'autonomous'] as const;

export default function JourneyMaturityPage() {
  const { tokens } = useMode();

  const distribution = useMemo(() => {
    const counts: Record<string, number> = {};
    MATURITY_LEVELS.forEach((m) => { counts[m] = 0; });
    seedJourneys.forEach((j) => {
      if (counts[j.deliveryMode] !== undefined) counts[j.deliveryMode]++;
    });
    return MATURITY_LEVELS.map((mode, idx) => ({
      mode,
      level: idx + 1,
      count: counts[mode],
      pct: seedJourneys.length > 0 ? ((counts[mode] / seedJourneys.length) * 100).toFixed(0) : '0',
    }));
  }, []);

  const templateModes = useMemo(() => {
    return seedJourneyTemplates.slice(0, 12).map((t) => ({
      templateId: t.templateId,
      name: t.name,
      modes: t.expectedDeliveryModes.join(', '),
    }));
  }, []);

  return (
    <PageContainer pretitle="Journey Intelligence" title="Automation Maturity Tracker">
      {/* Mode Distribution */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: componentTokens.cardPadding, marginBottom: primitiveSpacing[6] }}>
        {distribution.map((d) => (
          <div key={d.mode} style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], textAlign: 'center' }}>
            <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted, marginBottom: primitiveSpacing[1] }}>L{d.level}: {d.mode.replace(/_/g, ' ')}</div>
            <div style={{ fontSize: primitiveTypeScale.kpiValue, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>{d.count}</div>
            <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>{d.pct}%</div>
          </div>
        ))}
      </section>

      {/* Template Expected Modes */}
      <section style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4] }}>
        <h3 style={{ fontSize: primitiveTypeScale.h3, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, marginBottom: primitiveSpacing[3] }}>
          Template Expected Delivery Modes
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.body }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
              {['Template', 'Name', 'Expected Modes'].map((h) => (
                <th key={h} style={{ padding: primitiveSpacing[2], textAlign: 'left', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {templateModes.map((row) => (
              <tr key={row.templateId} style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary, fontWeight: primitiveFontWeight.medium }}>{row.templateId}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.name}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{row.modes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
