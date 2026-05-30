'use client';

import { useMode } from '@/context/mode-context';
import { seedCases } from '../../../../../packages/contracts/src/fixtures/seed-cases';
import { primitiveBrand, primitiveFonts, primitiveTypeScale, primitiveLetterSpacing, primitiveSignal, primitiveSpacing, primitiveRadii } from '../../../../../packages/ui/src/tokens/primitives';
import { LIFECYCLE_STAGES } from '../../../../../packages/ui/src/components/lifecycle-pipeline';
import { CaseList } from '../../components/case-list';
import { PageContainer } from '@/components/page-container';

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
 *
 * Tabler PoC: structural markup converted to Tabler CSS classes.
 * Data logic, hooks, sorting and CaseList are unchanged.
 */

/** Map case status → Tabler badge colour class */
function statusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    'open':               'bg-blue',
    'in-progress':        'bg-yellow',
    'awaiting-validation':'bg-orange',
    'awaiting-closure':   'bg-purple',
    'closed':             'bg-secondary',
    'reopened':           'bg-red',
  };
  return map[status] ?? 'bg-secondary';
}

/** Map priority → Tabler status-dot colour class */
function priorityDotClass(priority: string): string {
  const map: Record<string, string> = {
    P0: 'status-dot-animated bg-red',
    P1: 'bg-orange',
    P2: 'bg-yellow',
    P3: 'bg-blue',
    P4: 'bg-secondary',
  };
  return map[priority] ?? 'bg-secondary';
}

export default function CaseQueuePage() {
  const { mode, tokens } = useMode();

  // Sort by priority (P0 first) then by age (oldest first) — unchanged
  const sortedCases = [...seedCases].sort((a, b) => {
    const priorityOrder: Record<string, number> = { P0: 0, P1: 1, P2: 2, P3: 3, P4: 4 };
    const pDiff = (priorityOrder[a.priority] ?? 4) - (priorityOrder[b.priority] ?? 4);
    if (pDiff !== 0) return pDiff;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  // Lifecycle stage counts for pipeline — unchanged
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
    <PageContainer
      pretitle="Cases › Queue"
      title="Case Queue"
      headerActions={
        <span className="badge bg-green-lt">
          <span className="status-dot bg-green me-1" style={{ display: 'inline-block' }} />
          {seedCases.length} cases
        </span>
      }
    >

          {/* ── Lifecycle Stage Metric Row ── */}
          <div className="row row-deck row-cards mb-3">
            {LIFECYCLE_STAGES.map((stage) => {
              const count = stageCounts[stage] ?? 0;
              const isActive = count > 0;
              return (
                <div key={stage} className="col-sm-6 col-lg-2">
                  <div className={`card${isActive ? ' border-warning' : ''}`}>
                    <div className="card-body p-3 text-center">
                      <div
                        className="h1 mb-1"
                        style={{
                          color: isActive ? primitiveBrand.gold : tokens.text.muted,
                          fontFamily: mode === 'mission' ? primitiveFonts.mono : primitiveFonts.body,
                        }}
                      >
                        {count}
                      </div>
                      <div
                        className="text-uppercase text-muted"
                        style={{
                          fontSize: primitiveTypeScale.micro,
                          letterSpacing: primitiveLetterSpacing.eyebrow,
                        }}
                      >
                        {stage}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Case List Card ── */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Active Cases</h3>
              <div className="card-options">
                <span className="text-muted" style={{ fontSize: primitiveTypeScale.body }}>
                  Sorted by priority · oldest first
                </span>
              </div>
            </div>
            <div className="card-body p-0">
              {/* CaseList — expandable row pattern (Spec 06 refactor) — data logic unchanged */}
              <CaseList cases={sortedCases} />
            </div>
          </div>

    </PageContainer>
  );
}
