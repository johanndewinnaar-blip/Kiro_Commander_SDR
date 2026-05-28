'use client';

import { useMode } from '@/context/mode-context';
import { seedCases } from '../../../../../packages/contracts/src/fixtures/seed-cases';
import { componentTokens } from '../../../../../packages/ui/src/tokens/components';
import { primitiveBrand, primitiveFonts, primitiveTypeScale, primitiveLetterSpacing, primitiveSignal, primitiveSpacing, primitiveRadii } from '../../../../../packages/ui/src/tokens/primitives';
import { LIFECYCLE_STAGES } from '../../../../../packages/ui/src/components/lifecycle-pipeline';
import { CaseList } from '../../components/case-list';

/**
 * Case Queue — Commander SDR (DS-1.0, Spec 06 Phase C1)
 *
 * Source: Spec 06, Route Registry (path: /cases)
 * Mockup: case-handling-dashboard.png
 * DS-1.0 §8 Workspace structure: Header → Lifecycle Pipeline → Table
 *
 * Doctrinal constraints:
 * - No manual case creation (Assertion 1)
 * - Surface attribution on every row (Assertion 10)
 * - Priority: shape + colour + label (never colour alone) (§14.1)
 * - SLA from strategy resolvers (Constraint 9)
 */

export default function CaseQueuePage() {
  const { mode, tokens } = useMode();

  // Sort by priority (P0 first) then by age (oldest first)
  const sortedCases = [...seedCases].sort((a, b) => {
    const priorityOrder: Record<string, number> = { P0: 0, P1: 1, P2: 2, P3: 3, P4: 4 };
    const pDiff = (priorityOrder[a.priority] ?? 4) - (priorityOrder[b.priority] ?? 4);
    if (pDiff !== 0) return pDiff;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  // Lifecycle stage counts for pipeline
  const stageCounts: Record<string, number> = {};
  for (const stage of LIFECYCLE_STAGES) stageCounts[stage] = 0;
  for (const c of seedCases) {
    const stageMap: Record<string, string> = {
      'open': 'New',
      'in-progress': 'Investigating',
      'awaiting-validation': 'Validation',
      'awaiting-closure': 'Closure',
      'closed': 'Closure',
      'reopened': 'Triage',
    };
    const stage = stageMap[c.status] ?? 'New';
    stageCounts[stage] = (stageCounts[stage] ?? 0) + 1;
  }

  return (
    <div>
      {/* Page Header */}
      <section style={{ height: '76px', background: tokens.surface.secondary, borderBottom: `1px solid ${tokens.border.default}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${componentTokens.contentPadding}` }}>
        <div>
          <small style={{ color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.display, fontSize: primitiveTypeScale.micro }}>Cases › Queue</small>
          <h1 style={{ margin: '4px 0 0', fontSize: primitiveTypeScale.h1, fontWeight: 700, color: tokens.text.primary, fontFamily: primitiveFonts.body, lineHeight: '1.2' }}>Case Queue</h1>
        </div>
        <div style={{ border: `1px solid ${tokens.border.default}`, height: componentTokens.buttonHeightEmphasis, display: 'flex', alignItems: 'center', padding: `0 ${primitiveSpacing[3]}`, background: tokens.surface.secondary, borderRadius: primitiveRadii.md }}>
          <span style={{ width: '7px', height: '7px', background: primitiveSignal.success, display: 'inline-block', marginRight: primitiveSpacing[2], borderRadius: primitiveRadii.full }} />
          <span style={{ fontSize: primitiveTypeScale.body, color: tokens.text.secondary }}>{seedCases.length} cases</span>
        </div>
      </section>

      {/* Lifecycle Pipeline — DS-1.0 §21 Req 29 */}
      <section style={{ padding: `${componentTokens.cardPadding} ${componentTokens.contentPadding}`, borderBottom: `1px solid ${tokens.border.subtle}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[2], overflowX: 'auto' }}>
          {LIFECYCLE_STAGES.map((stage, i) => {
            const count = stageCounts[stage] ?? 0;
            const isActive = count > 0;
            return (
              <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[2] }}>
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                  padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, borderRadius: componentTokens.cardRadius,
                  border: isActive ? `2px solid ${primitiveBrand.gold}` : `2px solid ${tokens.border.subtle}`,
                  background: tokens.surface.elevated, minWidth: '80px',
                  boxShadow: isActive && mode === 'mission' ? '0 0 8px rgba(255,210,31,0.35)' : 'none',
                }}>
                  <span style={{ fontSize: primitiveTypeScale.h3, fontWeight: 700, color: tokens.text.primary, fontFamily: mode === 'mission' ? primitiveFonts.mono : primitiveFonts.body }}>{count}</span>
                  <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, textAlign: 'center', whiteSpace: 'nowrap' }}>{stage}</span>
                </div>
                {i < LIFECYCLE_STAGES.length - 1 && (
                  <div style={{ width: primitiveSpacing[4], height: '2px', background: tokens.border.default, flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Case List — expandable row pattern (Spec 06 refactor) */}
      <section style={{ padding: componentTokens.contentPadding }}>
        <CaseList cases={sortedCases} />
      </section>
    </div>
  );
}
