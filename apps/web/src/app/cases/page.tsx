'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useMode } from '@/context/mode-context';
import { seedCases } from '../../../../../packages/contracts/src/fixtures/seed-cases';
import { componentTokens } from '../../../../../packages/ui/src/tokens/components';
import {
  primitiveBrand, primitiveFonts, primitiveTypeScale, primitiveLetterSpacing,
  primitiveSignal, primitiveSpacing, primitiveFontWeight, primitivePriority,
} from '../../../../../packages/ui/src/tokens/primitives';
import { PageContainer } from '@/components/page-container';
import { CaseCard } from '@/components/case-card';
import type { Case } from '../../../../../packages/contracts/src/entities/case';
import {
  FLOW_LANES, laneOf, isClosed, isNew, slaState, riskScore, ageLabel,
  PRIORITIES, type FlowLane,
} from './case-metrics';

/**
 * Case Queue — Commander SDR (DS-1.0, Spec 06)
 *
 * Flow-first operational queue, modelled on ServiceNow/Jira but driven by the
 * Commander closed-loop lifecycle. Default view is a lane board (New → Triage →
 * In Progress → Validation → Closure → Closed) of rich case cards; a dense
 * table is available via toggle. The New lane leads so "what's next" is the
 * first thing an operator sees.
 *
 * All values derive from real seed data + deterministic metrics (case-metrics).
 * Doctrine: no manual creation (Assertion 1); surface attribution always shown
 * (Assertion 10). System-First Tier 1 — fully usable without AI.
 */

type View = 'board' | 'table';
type Tokens = ReturnType<typeof useMode>['tokens'];

const STATUS_LABEL: Record<string, string> = {
  'open': 'Open', 'detected': 'Detected', 'in-progress': 'In Progress', 'in_progress': 'In Progress',
  'awaiting-validation': 'Awaiting Validation', 'awaiting-closure': 'Awaiting Closure',
  'closed': 'Closed', 'reopened': 'Reopened',
};

function titleCase(s: string): string {
  return s.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function CaseQueuePage() {
  const { tokens } = useMode();
  const router = useRouter();
  const [view, setView] = useState<View>('board');

  const [fPriority, setFPriority] = useState('all');
  const [fType, setFType] = useState('all');
  const [fTeam, setFTeam] = useState('all');
  const [fOwner, setFOwner] = useState('all');
  const [fSurface, setFSurface] = useState('all');
  const [showClosed, setShowClosed] = useState(true);

  const now = useMemo(() => Math.max(...seedCases.map((c) => new Date(c.updatedAt).getTime())), []);

  const typeOptions = useMemo(() => Array.from(new Set(seedCases.map((c) => c.caseType))).sort(), []);
  const teamOptions = useMemo(() => Array.from(new Set(seedCases.map((c) => c.team))).sort(), []);
  const ownerOptions = useMemo(() => Array.from(new Set(seedCases.map((c) => c.owner))).sort(), []);

  const filtered = useMemo(() => seedCases.filter((c) => {
    if (fPriority !== 'all' && c.priority !== fPriority) return false;
    if (fType !== 'all' && c.caseType !== fType) return false;
    if (fTeam !== 'all' && c.team !== fTeam) return false;
    if (fOwner !== 'all' && c.owner !== fOwner) return false;
    if (fSurface !== 'all' && c.surfaceAttribution !== fSurface) return false;
    if (!showClosed && isClosed(c)) return false;
    return true;
  }), [fPriority, fType, fTeam, fOwner, fSurface, showClosed]);

  // KPI strip
  const openCases = seedCases.filter((c) => !isClosed(c));
  const newCount = seedCases.filter(isNew).length;
  const slaAtRisk = openCases.filter((c) => slaState(c, now).tone !== 'success').length;
  const p0p1 = openCases.filter((c) => c.priority === 'P0' || c.priority === 'P1').length;
  const avgRisk = openCases.length ? Math.round(openCases.reduce((a, c) => a + riskScore(c, now), 0) / openCases.length) : 0;

  // Lane grouping (sorted within lane by risk desc)
  const lanes = useMemo(() => {
    const grouped: Record<FlowLane, Case[]> = { new: [], triage: [], in_progress: [], validation: [], closure: [], closed: [] };
    filtered.forEach((c) => grouped[laneOf(c)].push(c));
    (Object.keys(grouped) as FlowLane[]).forEach((k) => grouped[k].sort((a, b) => riskScore(b, now) - riskScore(a, now)));
    return grouped;
  }, [filtered, now]);

  const visibleLanes = showClosed ? FLOW_LANES : FLOW_LANES.filter((l) => l.id !== 'closed');

  return (
    <PageContainer
      pretitle="Cases › Queue"
      title="Case Flow"
      headerActions={
        <div style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[2] }}>
          <Toggle tokens={tokens} value={view} onChange={setView} />
        </div>
      }
    >
      {/* AI-PLACEMENT: AI-CASE-QUEUE-001 — Focus order explanation */}

      {/* KPI strip */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: componentTokens.gridGap, marginBottom: componentTokens.gridGap }}>
        <Kpi tokens={tokens} label="New — Act Next" value={String(newCount)} accent={newCount > 0 ? primitiveBrand.gold : undefined} />
        <Kpi tokens={tokens} label="Open Cases" value={String(openCases.length)} />
        <Kpi tokens={tokens} label="P0 / P1 Open" value={String(p0p1)} accent={p0p1 > 0 ? primitiveSignal.critical : undefined} />
        <Kpi tokens={tokens} label="SLA At Risk" value={String(slaAtRisk)} accent={slaAtRisk > 0 ? primitiveSignal.warning : undefined} />
        <Kpi tokens={tokens} label="Avg Risk Score" value={String(avgRisk)} />
      </section>

      {/* Filters */}
      <section style={{ display: 'flex', gap: primitiveSpacing[2], flexWrap: 'wrap', marginBottom: componentTokens.gridGap, alignItems: 'flex-end' }}>
        <Filter tokens={tokens} label="Priority" value={fPriority} onChange={setFPriority} options={['all', ...PRIORITIES]} />
        <Filter tokens={tokens} label="Type" value={fType} onChange={setFType} options={['all', ...typeOptions]} render={(o) => o === 'all' ? 'All' : titleCase(o)} />
        <Filter tokens={tokens} label="Team" value={fTeam} onChange={setFTeam} options={['all', ...teamOptions]} />
        <Filter tokens={tokens} label="Owner" value={fOwner} onChange={setFOwner} options={['all', ...ownerOptions]} />
        <Filter tokens={tokens} label="Surface" value={fSurface} onChange={setFSurface} options={['all', 'internal_attack_surface', 'external_attack_surface']} render={(o) => o === 'all' ? 'All' : o === 'external_attack_surface' ? 'External' : 'Internal'} />
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: primitiveSpacing[1], fontSize: primitiveTypeScale.caption, color: tokens.text.secondary, cursor: 'pointer', height: componentTokens.inputHeight }}>
          <input type="checkbox" checked={showClosed} onChange={(e) => setShowClosed(e.target.checked)} /> Show closed
        </label>
      </section>

      {view === 'board' ? (
        <BoardView lanes={lanes} visibleLanes={visibleLanes} tokens={tokens} now={now} />
      ) : (
        <TableView cases={filtered} tokens={tokens} now={now} router={router} />
      )}
    </PageContainer>
  );
}

// ─── Board view ─────────────────────────────────────────────────────────────

function BoardView({ lanes, visibleLanes, tokens, now }: { lanes: Record<FlowLane, Case[]>; visibleLanes: typeof FLOW_LANES; tokens: Tokens; now: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${visibleLanes.length}, minmax(240px, 1fr))`, gap: componentTokens.gridGap, alignItems: 'start', overflowX: 'auto' }}>
      {visibleLanes.map((lane) => {
        const cards = lanes[lane.id];
        const leads = lane.id === 'new';
        return (
          <div key={lane.id} style={{ display: 'flex', flexDirection: 'column', gap: primitiveSpacing[2], minWidth: 240 }}>
            {/* Lane header */}
            <div style={{ position: 'sticky', top: 0, background: tokens.surface.secondary, paddingBottom: primitiveSpacing[1], borderBottom: `2px solid ${leads ? primitiveBrand.gold : tokens.border.default}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: primitiveTypeScale.caption, fontWeight: primitiveFontWeight.bold, color: leads ? primitiveBrand.gold : tokens.text.primary, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{lane.label}</span>
                <span style={{ fontFamily: primitiveFonts.mono, fontSize: primitiveTypeScale.micro, color: tokens.text.muted, background: tokens.surface.primary, padding: '0 6px', border: `1px solid ${tokens.border.subtle}` }}>{cards.length}</span>
              </div>
              <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted }}>{lane.hint}</span>
            </div>
            {/* Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: primitiveSpacing[2] }}>
              {cards.map((c) => <CaseCard key={c.id} caseRecord={c} now={now} />)}
              {cards.length === 0 && (
                <div style={{ padding: primitiveSpacing[4], border: `1px dashed ${tokens.border.subtle}`, textAlign: 'center', color: tokens.text.muted, fontSize: primitiveTypeScale.micro }}>Empty</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Table view ─────────────────────────────────────────────────────────────

function TableView({ cases, tokens, now, router }: { cases: Case[]; tokens: Tokens; now: number; router: ReturnType<typeof useRouter> }) {
  const sorted = [...cases].sort((a, b) => riskScore(b, now) - riskScore(a, now));
  return (
    <div style={{ background: tokens.surface.elevated, border: `1px solid ${tokens.border.subtle}`, overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.caption }}>
        <thead>
          <tr>{['Priority', 'Risk', 'Case Ref', 'Title', 'Type', 'Status', 'Owner', 'Team', 'SLA', 'Age', 'Surface'].map((h) => (
            <th key={h} style={{ textAlign: 'left', padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, borderBottom: `2px solid ${tokens.border.default}`, color: tokens.text.secondary, fontWeight: primitiveFontWeight.semibold, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, fontSize: primitiveTypeScale.micro, whiteSpace: 'nowrap' }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {sorted.map((c) => {
            const pr = primitivePriority[c.priority.toLowerCase() as keyof typeof primitivePriority];
            const sla = slaState(c, now);
            const risk = riskScore(c, now);
            const toneColor = sla.tone === 'critical' ? tokens.status.critical : sla.tone === 'warning' ? tokens.status.warning : tokens.status.success;
            return (
              <tr key={c.id} onClick={() => router.push(`/cases/${c.id}`)} style={{ cursor: 'pointer', borderBottom: `1px solid ${tokens.border.subtle}` }}
                onMouseEnter={(e) => (e.currentTarget.style.background = tokens.surface.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                <td style={td(tokens)}><span style={{ color: pr.color, fontWeight: primitiveFontWeight.semibold }}>{pr.shape} {pr.label}</span></td>
                <td style={{ ...td(tokens), fontFamily: primitiveFonts.mono, fontWeight: primitiveFontWeight.bold, color: risk >= 75 ? tokens.status.critical : risk >= 50 ? tokens.status.warning : tokens.text.secondary }}>{risk}</td>
                <td style={{ ...td(tokens), fontFamily: primitiveFonts.mono }}>{c.caseRef}</td>
                <td style={{ ...td(tokens), maxWidth: 340, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: tokens.text.primary }} title={c.title}>{c.title}</td>
                <td style={td(tokens)}>{titleCase(c.caseType)}</td>
                <td style={{ ...td(tokens), whiteSpace: 'nowrap' }}>{STATUS_LABEL[c.status] ?? c.status}</td>
                <td style={td(tokens)}>{c.owner}</td>
                <td style={td(tokens)}>{c.team}</td>
                <td style={td(tokens)}><span style={{ padding: `2px ${primitiveSpacing[2]}`, background: toneColor, color: '#fff', fontSize: primitiveTypeScale.micro, whiteSpace: 'nowrap' }}>{sla.label}</span></td>
                <td style={{ ...td(tokens), fontFamily: primitiveFonts.mono, whiteSpace: 'nowrap' }}>{ageLabel(c, now)}</td>
                <td style={td(tokens)}><span style={{ fontSize: primitiveTypeScale.micro, padding: '1px 6px', border: `1px solid ${c.surfaceAttribution === 'external_attack_surface' ? primitiveBrand.gold : tokens.border.default}`, color: c.surfaceAttribution === 'external_attack_surface' ? primitiveBrand.gold : tokens.text.muted }}>{c.surfaceAttribution === 'external_attack_surface' ? 'External' : 'Internal'}</span></td>
              </tr>
            );
          })}
          {sorted.length === 0 && <tr><td colSpan={11} style={{ ...td(tokens), textAlign: 'center', color: tokens.text.muted, padding: primitiveSpacing[6] }}>No cases match the current filters.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

// ─── Shared bits ────────────────────────────────────────────────────────────

const td = (tokens: Tokens): React.CSSProperties => ({ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.secondary, height: componentTokens.tableRowHeight });

function Kpi({ tokens, label, value, accent }: { tokens: Tokens; label: string; value: string; accent?: string }) {
  return (
    <div style={{ padding: componentTokens.cardPadding, background: tokens.surface.elevated, border: `1px solid ${tokens.border.subtle}` }}>
      <span style={{ display: 'block', fontSize: primitiveTypeScale.micro, color: accent ?? tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{label}</span>
      <span style={{ fontSize: primitiveTypeScale.kpiValue, fontFamily: primitiveFonts.mono, fontWeight: primitiveFontWeight.bold, color: accent ?? tokens.text.primary }}>{value}</span>
    </div>
  );
}

function Toggle({ tokens, value, onChange }: { tokens: Tokens; value: View; onChange: (v: View) => void }) {
  return (
    <div style={{ display: 'inline-flex', border: `1px solid ${tokens.border.default}` }}>
      {(['board', 'table'] as View[]).map((v, i) => {
        const active = v === value;
        return (
          <button key={v} onClick={() => onChange(v)}
            style={{ padding: `${primitiveSpacing[1]} ${primitiveSpacing[3]}`, fontSize: primitiveTypeScale.micro, fontWeight: primitiveFontWeight.medium, border: 'none', cursor: 'pointer', background: active ? tokens.action.secondary : 'transparent', color: active ? tokens.surface.elevated : tokens.text.secondary, borderLeft: i === 0 ? 'none' : `1px solid ${tokens.border.subtle}`, textTransform: 'capitalize' }}>{v}</button>
        );
      })}
    </div>
  );
}

function Filter({ tokens, label, value, onChange, options, render }: { tokens: Tokens; label: string; value: string; onChange: (v: string) => void; options: readonly string[]; render?: (o: string) => string }) {
  return (
    <label style={{ display: 'inline-flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        style={{ height: componentTokens.inputHeight, padding: `0 ${primitiveSpacing[2]}`, background: tokens.input.background, color: tokens.input.text, border: `1px solid ${tokens.input.border}`, borderRadius: 0, fontSize: primitiveTypeScale.caption, fontFamily: primitiveFonts.body }}>
        {options.map((o) => <option key={o} value={o}>{o === 'all' ? 'All' : render ? render(o) : o}</option>)}
      </select>
    </label>
  );
}
