'use client';

import { useMode } from '@/context/mode-context';
import { seedCases } from '../../../../../packages/contracts/src/fixtures/seed-cases';
import { componentTokens } from '../../../../../packages/ui/src/tokens/components';
import { primitiveBrand, primitiveFonts, primitiveTypeScale, primitiveLetterSpacing, primitiveSignal, primitiveSpacing } from '../../../../../packages/ui/src/tokens/primitives';
import { primitivePriority } from '../../../../../packages/ui/src/tokens/primitives';
import { LIFECYCLE_STAGES } from '../../../../../packages/ui/src/components/lifecycle-pipeline';
import { resolveAllStrategies } from '../../../../../packages/contracts/src/resolvers/case-strategy-resolver';
import { seedStrategies } from '../../../../../packages/contracts/src/fixtures/seed-strategies';

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

  // Resolve strategy for each case (Phase B resolvers — no hardcoded values)
  const casesWithStrategy = seedCases.map((c) => ({
    ...c,
    strategy: resolveAllStrategies(c, seedStrategies),
  }));

  // Sort by priority (P0 first) then by age (oldest first)
  const sortedCases = [...casesWithStrategy].sort((a, b) => {
    const priorityOrder = { P0: 0, P1: 1, P2: 2, P3: 3, P4: 4 };
    const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
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
          <h1 style={{ margin: '4px 0 0', fontSize: primitiveTypeScale.h1, fontWeight: 700, color: tokens.text.primary, fontFamily: primitiveFonts.display, lineHeight: '1.2' }}>Case Queue</h1>
        </div>
        <div style={{ border: `1px solid ${tokens.border.default}`, height: componentTokens.buttonHeightEmphasis, display: 'flex', alignItems: 'center', padding: `0 ${primitiveSpacing[3]}`, background: tokens.surface.secondary, borderRadius: '4px' }}>
          <span style={{ width: '7px', height: '7px', background: primitiveSignal.success, display: 'inline-block', marginRight: primitiveSpacing[2], borderRadius: '50%' }} />
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

      {/* Case Table — DS-1.0 §12 Table component */}
      <section style={{ padding: componentTokens.contentPadding }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: primitiveFonts.body, fontSize: primitiveTypeScale.body }}>
          <thead>
            <tr style={{ height: componentTokens.tableHeaderHeight, borderBottom: `1px solid ${tokens.border.default}` }}>
              <th style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, textAlign: 'left', fontSize: primitiveTypeScale.caption, fontWeight: 600, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Priority</th>
              <th style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, textAlign: 'left', fontSize: primitiveTypeScale.caption, fontWeight: 600, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Case</th>
              <th style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, textAlign: 'left', fontSize: primitiveTypeScale.caption, fontWeight: 600, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Type</th>
              <th style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, textAlign: 'left', fontSize: primitiveTypeScale.caption, fontWeight: 600, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Owner</th>
              <th style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, textAlign: 'left', fontSize: primitiveTypeScale.caption, fontWeight: 600, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>SLA</th>
              <th style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, textAlign: 'left', fontSize: primitiveTypeScale.caption, fontWeight: 600, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Surface</th>
              <th style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, textAlign: 'left', fontSize: primitiveTypeScale.caption, fontWeight: 600, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedCases.map((c) => {
              const p = primitivePriority[c.priority.toLowerCase() as keyof typeof primitivePriority];
              const slaHours = c.strategy.sla.status === 'resolved' ? c.strategy.sla.responseHours : null;
              return (
                <tr key={c.id} style={{ height: componentTokens.tableRowHeight, borderBottom: `1px solid ${tokens.border.subtle}` }}>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}` }}>
                    <span style={{ color: p.color, fontWeight: 700, fontSize: primitiveTypeScale.body }}>{p.shape} {p.label}</span>
                  </td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.primary }}>
                    <a href={`/cases/${c.id}`} style={{ color: tokens.text.primary, textDecoration: 'none' }}>{c.caseRef}</a>
                    <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted, marginTop: '2px' }}>{c.title.slice(0, 50)}{c.title.length > 50 ? '…' : ''}</div>
                  </td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.secondary, fontSize: primitiveTypeScale.caption }}>{c.caseType}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.primary }}>{c.owner}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, fontFamily: primitiveFonts.mono, color: c.sla.breached ? primitiveSignal.critical : tokens.text.secondary }}>
                    {slaHours !== null ? `${slaHours}h` : '—'}
                    {c.sla.breached && <span style={{ marginLeft: '4px', color: primitiveSignal.critical }}>BREACH</span>}
                  </td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}` }}>
                    <span style={{ fontSize: primitiveTypeScale.micro, padding: '2px 6px', border: c.surfaceAttribution === 'external_attack_surface' ? `1px solid ${primitiveBrand.gold}` : `1px solid ${tokens.border.default}`, borderRadius: '4px', color: c.surfaceAttribution === 'external_attack_surface' ? primitiveBrand.gold : tokens.text.muted }}>
                      {c.surfaceAttribution === 'external_attack_surface' ? 'External' : 'Internal'}
                    </span>
                  </td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.secondary, fontSize: primitiveTypeScale.caption }}>{c.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
