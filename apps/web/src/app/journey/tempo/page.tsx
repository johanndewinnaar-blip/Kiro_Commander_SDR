'use client';

/**
 * Journey Tempo Detail — UC-214
 * Per-phase duration breakdown grouped by template.
 * DEBT-014 resolution page 2/8.
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

export default function JourneyTempoPage() {
  const { tokens } = useMode();

  const tempoData = useMemo(() => {
    return seedJourneyTemplates.map((t) => ({
      templateId: t.templateId,
      name: t.name,
      observe: t.tempoThresholds.observe ?? null,
      orient: t.tempoThresholds.orient ?? null,
      decide: t.tempoThresholds.decide ?? null,
      act: t.tempoThresholds.act ?? null,
      leakageThreshold: t.leakageThresholdHours,
    }));
  }, []);

  const phases = ['observe', 'orient', 'decide', 'act'] as const;

  return (
    <PageContainer pretitle="Journey Intelligence" title="Journey Tempo Detail">
      <section style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4] }}>
        <p style={{ fontSize: primitiveTypeScale.body, color: tokens.text.muted, marginBottom: primitiveSpacing[4] }}>
          Per-phase duration thresholds (hours) for each journey template. Exceeding threshold triggers leakage alert.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.body }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
                <th style={{ padding: primitiveSpacing[2], textAlign: 'left', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold }}>Template</th>
                <th style={{ padding: primitiveSpacing[2], textAlign: 'left', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold }}>Name</th>
                {phases.map((p) => (
                  <th key={p} style={{ padding: primitiveSpacing[2], textAlign: 'right', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold }}>{p} (hrs)</th>
                ))}
                <th style={{ padding: primitiveSpacing[2], textAlign: 'right', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold }}>Leakage (hrs)</th>
              </tr>
            </thead>
            <tbody>
              {tempoData.map((row) => (
                <tr key={row.templateId} style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
                  <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary, fontWeight: primitiveFontWeight.medium }}>{row.templateId}</td>
                  <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{row.name}</td>
                  {phases.map((p) => (
                    <td key={p} style={{ padding: primitiveSpacing[2], textAlign: 'right', color: row[p] != null ? tokens.text.primary : tokens.text.muted }}>
                      {row[p] != null ? row[p] : '—'}
                    </td>
                  ))}
                  <td style={{ padding: primitiveSpacing[2], textAlign: 'right', color: tokens.text.primary, fontWeight: primitiveFontWeight.medium }}>{row.leakageThreshold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageContainer>
  );
}
