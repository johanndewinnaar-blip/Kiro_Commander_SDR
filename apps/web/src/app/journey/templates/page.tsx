'use client';

/**
 * Journey Template Configuration — UC-216
 * Full table of 33 journey templates with configuration detail.
 * DEBT-014 resolution page 6/8.
 */

import { useMode } from '@/context/mode-context';
import { PageContainer } from '@/components/page-container';
import { seedJourneyTemplates } from '../../../../../../packages/contracts/src/fixtures/seed-journey-templates';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import {
  primitiveSpacing,
  primitiveFontWeight,
  primitiveTypeScale,
} from '../../../../../../packages/ui/src/tokens/primitives';

export default function JourneyTemplatesPage() {
  const { tokens } = useMode();

  return (
    <PageContainer pretitle="Journey Intelligence" title="Journey Template Configuration">
      {/* Summary */}
      <div style={{ display: 'flex', gap: primitiveSpacing[5], marginBottom: primitiveSpacing[5] }}>
        <div style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], textAlign: 'center' }}>
          <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>Total Templates</div>
          <div style={{ fontSize: primitiveTypeScale.kpiValue, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>{seedJourneyTemplates.length}</div>
        </div>
        <div style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], textAlign: 'center' }}>
          <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>Active</div>
          <div style={{ fontSize: primitiveTypeScale.kpiValue, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>
            {seedJourneyTemplates.filter((t) => t.status === 'active').length}
          </div>
        </div>
      </div>

      {/* Templates Table */}
      <section style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.body }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
              {['ID', 'Name', 'Anchor Type', 'Phases', 'Checkpoints', 'Leakage (hrs)', 'Version'].map((h) => (
                <th key={h} style={{ padding: primitiveSpacing[2], textAlign: 'left', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {seedJourneyTemplates.map((t) => (
              <tr key={t.templateId} style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary, fontWeight: primitiveFontWeight.medium }}>{t.templateId}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{t.name}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{t.anchorType}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{t.expectedPhases.join(', ')}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.muted }}>{t.expectedCheckpoints.length}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{t.leakageThresholdHours}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.muted }}>{t.version}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
