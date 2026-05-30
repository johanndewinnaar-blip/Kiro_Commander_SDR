'use client';

import { seedCases } from '../../../../../../packages/contracts/src/fixtures/seed-cases';
import { CaseList } from '../../../components/case-list';
import { PageContainer } from '@/components/page-container';

/**
 * My Cases — Commander SDR (Spec 06 Case Management)
 *
 * Filtered view showing cases assigned to the current user.
 * Uses the expandable case-row pattern for in-place detail preview.
 *
 * Source: Spec 06, Route: /cases/my
 * Doctrinal constraints:
 * - No manual case creation (Assertion 1)
 * - Cases are system-routed; this view is read-only
 * - Surface attribution preserved on every row (Assertion 10)
 */

// TODO: Replace with authenticated user context when Spec 19 persona model and auth land. See DEC-case-visibility-persona-scoped.
const CURRENT_USER = 'Alice Security-Analyst';

export default function MyCasesPage() {
  // Filter cases owned by the current user
  const myCases = seedCases.filter((c) => c.owner === CURRENT_USER);

  // Sort by priority (P0 first) then by age (oldest first)
  const sortedCases = [...myCases].sort((a, b) => {
    const priorityOrder: Record<string, number> = { P0: 0, P1: 1, P2: 2, P3: 3, P4: 4 };
    const pDiff = (priorityOrder[a.priority] ?? 4) - (priorityOrder[b.priority] ?? 4);
    if (pDiff !== 0) return pDiff;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return (
    <PageContainer
      pretitle="Cases › My Cases"
      title="My Cases"
      headerActions={
        <span className="badge bg-blue-lt">
          {sortedCases.length} case{sortedCases.length !== 1 ? 's' : ''} · {CURRENT_USER}
        </span>
      }
    >
      <div className="card">
        <div className="card-body p-0">
          <CaseList cases={sortedCases} />
        </div>
      </div>
    </PageContainer>
  );
}
