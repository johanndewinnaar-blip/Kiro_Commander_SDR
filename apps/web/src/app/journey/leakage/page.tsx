'use client';

/**
 * Journey Leakage Monitor — UC-215
 * Stalled journeys exceeding tempo threshold.
 * DEBT-014 resolution page 3/8.
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

export default function JourneyLeakagePage() {
  const { tokens } = useMode();

  const leakageData = useMemo(() => {
    const referenceNow = new Date('2026-02-03T00:00:00.000Z');
    return seedJourneys
      .filter((j) => j.status === 'stalled' || j.status === 'reworking' || j.status === 'active')
      .map((j) => {
        const template = j.templateRef ? seedJourneyTemplates.find((t) => t.templateId === j.templateRef) : null;
        const threshold = template?.leakageThresholdHours ?? 72;
        const elapsedHours = (referenceNow.getTime() - new Date(j.startedAt).getTime()) / 3_600_000;
        const overshoot = elapsedHours - threshold;
        return {
          journeyId: j.journeyId,
          anchorType: j.anchorType,
          anchorId: j.anchorId,
          status: j.status,
          currentPhase: j.currentPhase,
          templateRef: j.templateRef ?? '—',
          threshold,
          elapsedHours: Math.round(elapsedHours),
          overshoot: Math.round(overshoot),
          leaking: overshoot > 0,
        };
      })
      .sort((a, b) => b.overshoot - a.overshoot);
  }, []);

  const leakingCount = leakageData.filter((d) => d.leaking).length;

  return (
    <PageContainer pretitle="Journey Intelligence" title="Journey Leakage Monitor">
      {/* Summary */}
      <div style={{ display: 'flex', gap: primitiveSpacing[5], marginBottom: primitiveSpacing[5] }}>
        <div style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>Monitored Journeys</div>
          <div style={{ fontSize: primitiveTypeScale.kpiValue, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>{leakageData.length}</div>
        </div>
        <div style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>Leaking (over threshold)</div>
          <div style={{ fontSize: primitiveTypeScale.kpiValue, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>{leakingCount}</div>
        </div>
      </div>

      {/* Leakage Table */}
      <section style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4] }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.body }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
              {['Anchor', 'Status', 'Phase', 'Template', 'Threshold (hrs)', 'Elapsed (hrs)', 'Overshoot'].map((h) => (
                <th key={h} style={{ padding: primitiveSpacing[2], textAlign: 'left', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leakageData.map((row) => (
              <tr key={row.journeyId} style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{row.anchorType}/{row.anchorId}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{row.status}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.currentPhase}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.templateRef}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.threshold}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{row.elapsedHours}</td>
                <td style={{ padding: primitiveSpacing[2], color: row.leaking ? tokens.text.primary : tokens.text.muted, fontWeight: row.leaking ? primitiveFontWeight.bold : primitiveFontWeight.normal }}>
                  {row.overshoot > 0 ? `+${row.overshoot}h` : `${row.overshoot}h`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
