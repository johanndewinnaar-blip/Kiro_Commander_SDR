'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useMode } from '@/context/mode-context';
import { seedCases } from '../../../../../../packages/contracts/src/fixtures/seed-cases';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import {
  primitiveFonts, primitiveTypeScale, primitiveLetterSpacing,
  primitiveSpacing, primitiveFontWeight, primitivePriority,
} from '../../../../../../packages/ui/src/tokens/primitives';
import { PageContainer } from '@/components/page-container';
import { NotImplemented } from '@/components/not-implemented';
import type { Case } from '../../../../../../packages/contracts/src/entities/case';
import { slaState, riskScore, ageLabel, isClosed, PRIORITIES } from '../case-metrics';

/**
 * My Cases — Commander SDR (Spec 06)
 *
 * Personalised analyst view. "Assigned to Me" is a REAL filter over seedCases
 * by owner, ordered algorithmically (SLA risk → priority → age) — System-First
 * Tier 1. Approvals, Notifications and Following have NO backing entity/fixture
 * yet, so they are honest placeholders, not fabrications.
 */

// Owner present in seed data. TODO: replace with auth/persona context (Spec 19).
const CURRENT_USER = 'Alice Security-Analyst';
const MS_PER_HOUR = 3_600_000;

const STATUS_LABEL: Record<string, string> = {
  'open': 'Open', 'in-progress': 'In Progress', 'awaiting-validation': 'Awaiting Validation',
  'awaiting-closure': 'Awaiting Closure', 'closed': 'Closed', 'reopened': 'Reopened',
};

type Tokens = ReturnType<typeof useMode>['tokens'];

function titleCase(s: string): string {
  return s.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}

function slaRisk(c: Case, now: number): number {
  const s = slaState(c, now);
  return s.tone === 'critical' ? 3 : s.tone === 'warning' ? 2 : 1;
}

export default function MyCasesPage() {
  const { tokens } = useMode();
  const router = useRouter();
  const now = useMemo(() => Math.max(...seedCases.map((c) => new Date(c.updatedAt).getTime())), []);

  const assigned = useMemo(() => seedCases
    .filter((c) => c.owner === CURRENT_USER && !isClosed(c))
    .sort((a, b) => {
      const r = slaRisk(b, now) - slaRisk(a, now);
      if (r !== 0) return r;
      const p = PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority);
      if (p !== 0) return p;
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }), [now]);

  return (
    <PageContainer
      pretitle="Cases › My Cases"
      title="My Cases"
      headerActions={<span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>{CURRENT_USER}</span>}
    >
      {/* AI-PLACEMENT: AI-MY-CASES-001 — Daily briefing narrative */}

      {/* SECTION 1: Approvals & decisions — no entity yet */}
      <Section tokens={tokens} title="Approvals & Decisions">
        <NotImplemented title="Approvals & Decisions" requires="approval/decision entity + seed fixture (no contract defined yet)" />
      </Section>

      {/* SECTION 2: Notifications — no entity yet */}
      <Section tokens={tokens} title="Notifications">
        <NotImplemented title="Notifications" requires="notification entity + seed fixture (no contract defined yet)" />
      </Section>

      {/* SECTION 3: Assigned to me — REAL */}
      <Section tokens={tokens} title="Assigned to Me" subtitle={`${assigned.length} open · ordered by SLA risk → priority → age (derived ⓓ)`}>
        {assigned.length === 0
          ? <p style={{ margin: 0, fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>No open cases assigned to {CURRENT_USER}.</p>
          : <CaseTable cases={assigned} tokens={tokens} now={now} router={router} />}
      </Section>

      {/* SECTION 4: Following — no entity yet */}
      <Section tokens={tokens} title="Following" muted>
        <NotImplemented title="Followed Cases" requires="case-follow / subscription entity + seed fixture (no contract defined yet)" />
      </Section>
    </PageContainer>
  );
}

function CaseTable({ cases, tokens, now, router }: { cases: Case[]; tokens: Tokens; now: number; router: ReturnType<typeof useRouter> }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.caption }}>
        <thead>
          <tr>{['Priority', 'Risk ⓓ', 'Case Ref', 'Title', 'Type', 'Status', 'SLA', 'Age'].map((h) => (
            <th key={h} style={{ textAlign: 'left', padding: `${primitiveSpacing[1]} ${primitiveSpacing[2]}`, borderBottom: `2px solid ${tokens.border.default}`, color: tokens.text.secondary, fontSize: primitiveTypeScale.micro, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, whiteSpace: 'nowrap' }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {cases.map((c) => {
            const pr = primitivePriority[c.priority.toLowerCase() as keyof typeof primitivePriority];
            const sla = slaState(c, now);
            const risk = riskScore(c, now);
            const tone = sla.tone === 'critical' ? tokens.status.critical : sla.tone === 'warning' ? tokens.status.warning : tokens.status.success;
            return (
              <tr key={c.id} onClick={() => router.push(`/cases/${c.id}`)} style={{ cursor: 'pointer', borderBottom: `1px solid ${tokens.border.subtle}` }}
                onMouseEnter={(e) => (e.currentTarget.style.background = tokens.surface.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ padding: primitiveSpacing[2] }}><span style={{ color: pr.color, fontWeight: primitiveFontWeight.semibold }}>{pr.shape} {pr.label}</span></td>
                <td style={{ padding: primitiveSpacing[2], fontFamily: primitiveFonts.mono, fontWeight: primitiveFontWeight.bold, color: risk >= 75 ? tokens.status.critical : risk >= 50 ? tokens.status.warning : tokens.text.secondary }}>{risk}</td>
                <td style={{ padding: primitiveSpacing[2], fontFamily: primitiveFonts.mono }}>{c.caseRef}</td>
                <td style={{ padding: primitiveSpacing[2], maxWidth: 360, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: tokens.text.primary }} title={c.title}>{c.title}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{titleCase(c.caseType)}</td>
                <td style={{ padding: primitiveSpacing[2], whiteSpace: 'nowrap', color: tokens.text.secondary }}>{STATUS_LABEL[c.status] ?? c.status}</td>
                <td style={{ padding: primitiveSpacing[2] }}><span style={{ padding: `2px ${primitiveSpacing[2]}`, background: tone, color: '#fff', fontSize: primitiveTypeScale.micro, whiteSpace: 'nowrap' }}>{sla.label}</span></td>
                <td style={{ padding: primitiveSpacing[2], fontFamily: primitiveFonts.mono, whiteSpace: 'nowrap', color: tokens.text.secondary }}>{ageLabel(c, now)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Section({ tokens, title, subtitle, children, muted }: { tokens: Tokens; title: string; subtitle?: string; children: React.ReactNode; muted?: boolean }) {
  return (
    <section style={{ marginBottom: componentTokens.gridGap, opacity: muted ? 0.9 : 1 }}>
      <div style={{ padding: componentTokens.cardPadding, background: tokens.surface.elevated, border: `1px solid ${tokens.border.subtle}` }}>
        <div style={{ marginBottom: componentTokens.cardHeaderMargin }}>
          <h3 style={{ margin: 0, fontSize: primitiveTypeScale.h4, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{title}</h3>
          {subtitle && <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted }}>{subtitle}</span>}
        </div>
        {children}
      </div>
    </section>
  );
}
