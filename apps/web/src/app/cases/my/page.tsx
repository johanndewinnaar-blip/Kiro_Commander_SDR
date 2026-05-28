'use client';

import { useMode } from '@/context/mode-context';
import { seedCases } from '../../../../../../packages/contracts/src/fixtures/seed-cases';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import { primitiveFonts, primitiveTypeScale, primitiveLetterSpacing, primitiveSpacing } from '../../../../../../packages/ui/src/tokens/primitives';
import { CaseList } from '../../../components/case-list';

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
  const { tokens } = useMode();

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
    <div>
      {/* Page Header */}
      <section style={{
        height: '76px',
        background: tokens.surface.secondary,
        borderBottom: `1px solid ${tokens.border.default}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `0 ${componentTokens.contentPadding}`,
      }}>
        <div>
          <small style={{
            color: tokens.text.muted,
            textTransform: 'uppercase',
            letterSpacing: primitiveLetterSpacing.display,
            fontSize: primitiveTypeScale.micro,
          }}>
            Cases › My Cases
          </small>
          <h1 style={{
            margin: '4px 0 0',
            fontSize: primitiveTypeScale.h1,
            fontWeight: 700,
            color: tokens.text.primary,
            fontFamily: primitiveFonts.body,
            lineHeight: '1.2',
          }}>
            My Cases
          </h1>
        </div>
        <div style={{
          fontSize: primitiveTypeScale.caption,
          color: tokens.text.muted,
          padding: `${primitiveSpacing[1]} ${primitiveSpacing[3]}`,
          border: `1px solid ${tokens.border.default}`,
          borderRadius: '2px',
        }}>
          {sortedCases.length} case{sortedCases.length !== 1 ? 's' : ''} assigned to {CURRENT_USER}
        </div>
      </section>

      {/* Case List */}
      <section style={{ padding: componentTokens.contentPadding }}>
        <CaseList cases={sortedCases} />
      </section>
    </div>
  );
}
