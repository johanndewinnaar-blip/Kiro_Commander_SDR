'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useMode } from '@/context/mode-context';
import { seedCases } from '../../../../../../packages/contracts/src/fixtures/seed-cases';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import {
  primitiveBrand, primitiveFonts, primitiveTypeScale, primitiveLetterSpacing,
  primitiveSignal, primitiveSpacing, primitiveFontWeight, primitivePriority,
} from '../../../../../../packages/ui/src/tokens/primitives';
import { PageContainer } from '@/components/page-container';
import type { Case } from '../../../../../../packages/contracts/src/entities/case';

/**
 * My Cases — Commander SDR (Spec 06)
 *
 * Personalised analyst surface: approvals & decisions, notifications, cases
 * assigned to the current user, and followed cases. Assigned cases are ordered
 * algorithmically (SLA risk → priority → age) per System-First Tier 1 — the
 * system delivers the focus order without AI. Approvals and notifications are
 * explicitly-mocked review scaffolding.
 */

// TODO: replace with authenticated user context when Spec 19 persona + auth land.
const CURRENT_USER = 'Alice Security-Analyst';
const FOLLOWED_IDS = ['case-0001', 'case-0006', 'case-0012'];
const MS_PER_HOUR = 3_600_000;
const CLOSED = new Set(['closed', 'closed_by_system']);
const PRIORITIES = ['P0', 'P1', 'P2', 'P3', 'P4'] as const;

const STATUS_LABEL: Record<string, string> = {
  'open': 'Open', 'in-progress': 'In Progress', 'awaiting-validation': 'Awaiting Validation',
  'awaiting-closure': 'Awaiting Closure', 'closed': 'Closed', 'reopened': 'Reopened',
};

type Tokens = ReturnType<typeof useMode>['tokens'];

function titleCase(s: string): string {
  return s.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}

function slaRisk(c: Case, now: number): number {
  if (c.sla.breached) return 3;
  const remaining = c.sla.targetResolutionHours - (now - new Date(c.createdAt).getTime()) / MS_PER_HOUR;
  if (remaining <= 0) return 3;
  if (remaining <= c.sla.targetResolutionHours * 0.25) return 2;
  return 1;
}

interface MockApproval { id: string; title: string; summary: string; requestedBy: string; ago: string; }
interface MockNotification { id: string; text: string; ago: string; kind: 'own' | 'followed'; }

export default function MyCasesPage() {
  const { tokens } = useMode();
  const router = useRouter();
  const now = useMemo(() => Math.max(...seedCases.map((c) => new Date(c.updatedAt).getTime())), []);

  const assigned = useMemo(() => {
    return seedCases
      .filter((c) => c.owner === CURRENT_USER && !CLOSED.has(c.status))
      .sort((a, b) => {
        const r = slaRisk(b, now) - slaRisk(a, now);
        if (r !== 0) return r;
        const p = PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority);
        if (p !== 0) return p;
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
  }, [now]);

  const following = useMemo(() => seedCases.filter((c) => FOLLOWED_IDS.includes(c.id)), []);

  const approvals: MockApproval[] = [
    { id: 'apr-1', title: 'Approve: P0 War Room activation for CASE-2026-0003', summary: 'Critical CVE-2026-1234 unpatched beyond SLA on PROD-WEB-01. War Room activation requested to coordinate emergency remediation.', requestedBy: 'Security Operations Manager', ago: '12 min ago' },
    { id: 'apr-2', title: 'Approve: Compensating control for CASE-2026-0007', summary: 'WAF rule proposed as temporary mitigation for exposed admin panel pending permanent fix.', requestedBy: 'Bob Vuln-Analyst', ago: '1 h ago' },
  ];

  const notifications: MockNotification[] = [
    { id: 'n1', text: 'CASE-2026-0001 moved to validated_pass', ago: '2 h ago', kind: 'followed' },
    { id: 'n2', text: 'CASE-2026-0003 SLA breached — assigned to you', ago: '3 h ago', kind: 'own' },
    { id: 'n3', text: 'CASE-2026-0007 awaiting your validation', ago: '5 h ago', kind: 'own' },
    { id: 'n4', text: 'CASE-2026-0006 owner changed to Eve Threat-Intel', ago: '6 h ago', kind: 'followed' },
    { id: 'n5', text: 'CASE-2026-0010 new evidence attached', ago: '8 h ago', kind: 'own' },
    { id: 'n6', text: 'CASE-2026-0012 escalated to Platform Lead', ago: '10 h ago', kind: 'followed' },
    { id: 'n7', text: 'CASE-2026-0019 routed to Security Operations', ago: '1 d ago', kind: 'own' },
  ];

  return (
    <PageContainer
      pretitle="Cases › My Cases"
      title="My Cases"
      headerActions={<span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>{CURRENT_USER}</span>}
    >
      {/* AI-PLACEMENT: AI-MY-CASES-001 — Daily briefing narrative */}

      {/* SECTION 1: Approvals & decisions */}
      <Section tokens={tokens} title="Approvals & Decisions" subtitle={`${approvals.length} awaiting your decision`}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: componentTokens.gridGap }}>
          {approvals.map((a) => (
            <div key={a.id} style={{ border: `1px solid ${tokens.border.subtle}`, padding: componentTokens.cardPadding, background: tokens.surface.primary }}>
              <h4 style={{ margin: 0, fontSize: primitiveTypeScale.caption, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary }}>{a.title}</h4>
              <p style={{ margin: `${primitiveSpacing[2]} 0`, fontSize: primitiveTypeScale.caption, color: tokens.text.secondary, lineHeight: 1.43 }}>{a.summary}</p>
              <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted }}>Requested by {a.requestedBy} · {a.ago}</span>
              <div style={{ marginTop: primitiveSpacing[2], display: 'flex', gap: primitiveSpacing[2] }}>
                {['Approve', 'Decline', 'Delegate'].map((b) => (
                  <button key={b} disabled style={mockBtn(tokens)}>{b}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SECTION 2: Notifications */}
      <Section tokens={tokens} title="Notifications" subtitle="Recent activity on your and followed cases">
        <div style={{ maxHeight: 220, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {notifications.map((n) => (
            <div key={n.id} style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[2], padding: `${primitiveSpacing[2]} 0`, borderBottom: `1px solid ${tokens.border.subtle}` }}>
              {n.kind === 'own'
                ? <span title="Your case" style={{ width: 8, height: 8, borderRadius: '50%', background: tokens.status.info, display: 'inline-block', flexShrink: 0 }} />
                : <span title="Followed case" style={{ color: primitiveBrand.gold, fontSize: primitiveTypeScale.caption, flexShrink: 0 }}>★</span>}
              <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.secondary, flex: 1 }}>{n.text}</span>
              <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, whiteSpace: 'nowrap' }}>{n.ago}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* SECTION 3: Assigned to me */}
      <Section tokens={tokens} title="Assigned to Me" subtitle={`${assigned.length} open — ordered by SLA risk, then priority, then age`}>
        <CaseTable cases={assigned} tokens={tokens} now={now} router={router} />
      </Section>

      {/* SECTION 4: Following */}
      <Section tokens={tokens} title="Following" subtitle={`${following.length} cases you follow`} muted>
        <CaseTable cases={following} tokens={tokens} now={now} router={router} star />
      </Section>
    </PageContainer>
  );
}

function CaseTable({ cases, tokens, now, router, star }: { cases: Case[]; tokens: Tokens; now: number; router: ReturnType<typeof useRouter>; star?: boolean }) {
  if (cases.length === 0) return <p style={{ margin: 0, fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>None.</p>;
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.caption }}>
        <thead>
          <tr>{['', 'Priority', 'Case Ref', 'Title', 'Status', 'SLA', 'Age'].map((h) => (
            <th key={h} style={{ textAlign: 'left', padding: `${primitiveSpacing[1]} ${primitiveSpacing[2]}`, borderBottom: `2px solid ${tokens.border.default}`, color: tokens.text.secondary, fontSize: primitiveTypeScale.micro, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, whiteSpace: 'nowrap' }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {cases.map((c) => {
            const pr = primitivePriority[c.priority.toLowerCase() as keyof typeof primitivePriority];
            const remaining = c.sla.targetResolutionHours - (now - new Date(c.createdAt).getTime()) / MS_PER_HOUR;
            const tone = c.sla.breached || remaining <= 0 ? tokens.status.critical : remaining <= c.sla.targetResolutionHours * 0.25 ? tokens.status.warning : tokens.status.success;
            const label = c.sla.breached ? 'Breached' : remaining <= 0 ? 'Overdue' : remaining <= c.sla.targetResolutionHours * 0.25 ? 'Approaching' : 'Within SLA';
            const ageH = Math.floor((now - new Date(c.createdAt).getTime()) / MS_PER_HOUR);
            return (
              <tr key={c.id} onClick={() => router.push(`/cases/${c.id}`)} style={{ cursor: 'pointer', borderBottom: `1px solid ${tokens.border.subtle}` }}
                onMouseEnter={(e) => (e.currentTarget.style.background = tokens.surface.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ padding: primitiveSpacing[2], width: 16 }}>{star ? <span style={{ color: primitiveBrand.gold }}>★</span> : ''}</td>
                <td style={{ padding: primitiveSpacing[2] }}><span style={{ color: pr.color, fontWeight: primitiveFontWeight.semibold }}>{pr.shape} {pr.label}</span></td>
                <td style={{ padding: primitiveSpacing[2], fontFamily: primitiveFonts.mono }}>{c.caseRef}</td>
                <td style={{ padding: primitiveSpacing[2], maxWidth: 360, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: tokens.text.primary }} title={c.title}>{c.title}</td>
                <td style={{ padding: primitiveSpacing[2], whiteSpace: 'nowrap', color: tokens.text.secondary }}>{STATUS_LABEL[c.status] ?? c.status}</td>
                <td style={{ padding: primitiveSpacing[2] }}><span style={{ padding: `2px ${primitiveSpacing[2]}`, background: tone, color: '#fff', fontSize: primitiveTypeScale.micro, whiteSpace: 'nowrap' }}>{label}</span></td>
                <td style={{ padding: primitiveSpacing[2], fontFamily: primitiveFonts.mono, whiteSpace: 'nowrap', color: tokens.text.secondary }}>{ageH >= 24 ? `${Math.floor(ageH / 24)}d` : `${ageH}h`}</td>
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
    <section style={{ marginBottom: componentTokens.gridGap, opacity: muted ? 0.85 : 1 }}>
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

const mockBtn = (tokens: Tokens): React.CSSProperties => ({
  padding: `${primitiveSpacing[1]} ${primitiveSpacing[3]}`,
  fontSize: primitiveTypeScale.micro, fontFamily: primitiveFonts.body,
  background: 'transparent', color: tokens.text.muted,
  border: `1px dashed ${tokens.border.default}`, borderRadius: 0, cursor: 'not-allowed',
});
