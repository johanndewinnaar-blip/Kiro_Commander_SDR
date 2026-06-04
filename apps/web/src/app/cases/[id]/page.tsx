'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMode } from '@/context/mode-context';
import { seedCases } from '../../../../../../packages/contracts/src/fixtures/seed-cases';
import { seedAssets } from '../../../../../../packages/contracts/src/fixtures/seed-assets';
import { seedActions, seedSubActions } from '../../../../../../packages/contracts/src/fixtures/seed-actions';
import { seedRiskObjects } from '../../../../../../packages/contracts/src/fixtures/seed-risk-objects';
import { seedEvidence } from '../../../../../../packages/contracts/src/fixtures/seed-evidence';
import { seedStrategies } from '../../../../../../packages/contracts/src/fixtures/seed-strategies';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import {
  primitiveBrand, primitiveFonts, primitiveTypeScale, primitiveLetterSpacing,
  primitiveSignal, primitiveSpacing, primitiveFontWeight, primitivePriority,
} from '../../../../../../packages/ui/src/tokens/primitives';
import { resolveAllStrategies } from '../../../../../../packages/contracts/src/resolvers/case-strategy-resolver';
import { getNextStates } from '../../../../../../packages/contracts/src/entities/case-lifecycle';
import { LEGACY_STATUS_MAP } from '../../../../../../packages/contracts/src/entities/case';
import type { Case, CaseStatus, CaseStatusExtended, LegacyCaseStatus } from '../../../../../../packages/contracts/src/entities/case';
import type { SubAction, D3FENDTacticType, OutcomeClassification, Action as ActionRec } from '../../../../../../packages/contracts/src/entities/action';
import { buildCaseComms } from './case-comms';
import { buildAuditTimeline } from './case-audit';

/**
 * Case Detail — Commander SDR (DS-1.0, Spec 06)
 *
 * Full-depth single-case surface. Inline Case Pattern (Pattern A): a persistent
 * context bar plus a tabbed body — NO split screen, NO pop-out. Everything for a
 * case lives on one scrollable surface and expands inline.
 *
 * All data is real seed data joined by case id (actions, sub-actions, risk
 * objects, evidence) plus resolver output (SLA/routing/validation/closure/
 * reopening). Communication + audit are explicitly-mocked structures that show
 * the full integration shape (email + Teams) for review.
 *
 * Doctrine: no manual lifecycle/closure controls (Assertion 1); surface
 * attribution always shown (Assertion 10); System-First Tier 1 — fully usable
 * without AI; AI surfaced only as placement-comment markers.
 */

// ─── Canonical 12-state spine for the lifecycle pipeline ────────────────────
const LIFECYCLE_SPINE: CaseStatus[] = [
  'detected', 'bound', 'routed', 'prioritised', 'action_decomposed', 'in_progress',
  'pending_validation', 'validation_running', 'validated_pass', 'pending_closure_gates', 'closed_by_system',
];

const STATE_LABEL: Record<string, string> = {
  detected: 'Detected', bound: 'Bound', routed: 'Routed', prioritised: 'Prioritised',
  action_decomposed: 'Action Decomposed', in_progress: 'In Progress', pending_validation: 'Pending Validation',
  validation_running: 'Validation Running', validated_pass: 'Validated Pass', validated_fail: 'Validated Fail',
  pending_closure_gates: 'Pending Closure', closed_by_system: 'Closed', reopened_by_system: 'Reopened',
};

const STATE_ACTOR: Record<string, string> = {
  detected: 'detection-source', bound: 'binding-engine', routed: 'routing-engine', prioritised: 'prioritisation-engine',
  action_decomposed: 'system', in_progress: 'system', pending_validation: 'system',
  validation_running: 'validation-engine', validated_pass: 'validation-engine', pending_closure_gates: 'closure-engine',
  closed_by_system: 'closure-engine',
};

/** Resolve a case's canonical 12-state from its (possibly legacy) status. */
function canonicalStatus(status: CaseStatusExtended): CaseStatus {
  if (status in LEGACY_STATUS_MAP) return LEGACY_STATUS_MAP[status as LegacyCaseStatus];
  return status as CaseStatus;
}

const D3FEND_COLOR: Record<D3FENDTacticType, string> = {
  isolate: primitivePriority.p3.color,
  evict: primitiveSignal.critical,
  restore: primitiveSignal.success,
  harden: primitivePriority.p2.color,
  detect: primitivePriority.p1.color,
};

const OUTCOME_TONE: Record<OutcomeClassification, 'success' | 'warning' | 'critical' | 'muted'> = {
  successful: 'success', partial: 'warning', failed: 'critical', cancelled: 'muted', pending: 'muted',
};

const ACTION_TONE: Record<string, 'success' | 'warning' | 'muted'> = {
  completed: 'success', in_progress: 'warning', planned: 'muted', cancelled: 'muted',
};

const MS_PER_HOUR = 3_600_000;

type TabId = 'lifecycle' | 'actions' | 'evidence' | 'comms' | 'strategy' | 'audit';
const TABS: { id: TabId; label: string }[] = [
  { id: 'lifecycle', label: 'Lifecycle' },
  { id: 'actions', label: 'Actions & Sub-Actions' },
  { id: 'evidence', label: 'Evidence & Risk' },
  { id: 'comms', label: 'Communication' },
  { id: 'strategy', label: 'Strategy Bindings' },
  { id: 'audit', label: 'Audit Timeline' },
];

type Tokens = ReturnType<typeof useMode>['tokens'];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { mode, tokens } = useMode();
  const router = useRouter();
  const [tab, setTab] = useState<TabId>('lifecycle');

  const caseRecord = seedCases.find((c) => c.id === id) ?? seedCases[0];
  const strategy = resolveAllStrategies(caseRecord, seedStrategies);
  const p = primitivePriority[caseRecord.priority.toLowerCase() as keyof typeof primitivePriority];

  // Real joins by case id
  const actions = seedActions.filter((a) => a.caseId === caseRecord.id);
  const subActionsByAction = (actionId: string) => seedSubActions.filter((s) => s.actionId === actionId);
  const riskObjects = seedRiskObjects.filter(
    (r) => r.affectedEntityId === caseRecord.id || (r.affectedEntities ?? []).includes(caseRecord.id),
  );
  const evidence = seedEvidence.filter((e) => e.caseId === caseRecord.id);
  const relatedAssets = seedAssets.filter((a) => caseRecord.relatedEntities.includes(a.id));
  const relatedCases = seedCases.filter(
    (c) => c.id !== caseRecord.id && c.relatedEntities.some((e) => caseRecord.relatedEntities.includes(e)),
  );

  // SLA countdown
  const ageHours = (Date.now() - new Date(caseRecord.createdAt).getTime()) / MS_PER_HOUR;
  const slaHoursTarget = strategy.sla.status === 'resolved' ? strategy.sla.responseHours : caseRecord.sla.targetResolutionHours;
  const slaRemaining = (slaHoursTarget ?? 0) - ageHours;
  const slaBreached = caseRecord.sla.breached || slaRemaining <= 0;

  const cur = canonicalStatus(caseRecord.status);
  const blast = caseRecord.blastRadiusScore ?? caseRecord.relatedEntities.length;
  const affected = caseRecord.affectedEntityCount ?? caseRecord.relatedEntities.length;
  const crownJewel = relatedAssets.some((a) => (a as { criticality?: number }).criticality !== undefined && (a as { criticality?: number }).criticality! >= 5);

  return (
    <div style={{ padding: componentTokens.contentPadding, display: 'flex', flexDirection: 'column', gap: componentTokens.gridGap }}>
      {/* Back link */}
      <button onClick={() => router.push('/cases')}
        style={{ alignSelf: 'flex-start', background: 'none', border: 'none', cursor: 'pointer', color: tokens.text.muted, fontSize: primitiveTypeScale.caption, padding: 0 }}>
        ← Case Queue
      </button>

      {/* ── CONTEXT BAR (always visible) ───────────────────────────────── */}
      <section style={{ ...card(tokens), padding: componentTokens.cardPadding }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: primitiveSpacing[3] }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[2], flexWrap: 'wrap' }}>
              <span style={{ color: p.color, fontWeight: primitiveFontWeight.bold, fontSize: primitiveTypeScale.body }}>{p.shape} {p.label}</span>
              <span style={{ fontFamily: primitiveFonts.mono, fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>{caseRecord.caseRef}</span>
              <SurfacePill surface={caseRecord.surfaceAttribution} tokens={tokens} />
              <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted }}>{titleCase(caseRecord.caseType)}</span>
            </div>
            <h1 style={{ margin: `${primitiveSpacing[1]} 0 0`, fontSize: primitiveTypeScale.h2, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>{caseRecord.title}</h1>
          </div>
          {/* SLA countdown */}
          <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
            <span style={{ display: 'block', fontSize: primitiveTypeScale.micro, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>SLA</span>
            <span style={{ fontFamily: primitiveFonts.mono, fontSize: primitiveTypeScale.h3, fontWeight: primitiveFontWeight.bold, color: slaBreached ? primitiveSignal.critical : slaRemaining <= (slaHoursTarget ?? 0) * 0.25 ? primitiveSignal.warning : primitiveSignal.success }}>
              {slaBreached ? 'BREACHED' : `${Math.max(0, Math.round(slaRemaining))}h left`}
            </span>
            <span style={{ display: 'block', fontSize: primitiveTypeScale.micro, color: tokens.text.muted }}>target {slaHoursTarget}h</span>
          </div>
        </div>

        {/* AI-PLACEMENT: AI-CASE-DETAIL-001 — Next best action recommendation */}

        {/* Context metrics strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: primitiveSpacing[3], marginTop: primitiveSpacing[3] }}>
          <Ctx tokens={tokens} label="Blast Radius" value={String(blast)} accent={blast >= 50 ? primitiveSignal.critical : undefined} />
          <Ctx tokens={tokens} label="Affected Entities" value={String(affected)} />
          <Ctx tokens={tokens} label="Crown Jewel" value={crownJewel ? 'YES' : 'No'} accent={crownJewel ? primitiveSignal.critical : undefined} />
          <Ctx tokens={tokens} label="Surface" value={caseRecord.surfaceAttribution === 'external_attack_surface' ? 'External' : 'Internal'} />
          <Ctx tokens={tokens} label="Owner / Team" value={caseRecord.owner} sub={caseRecord.team} />
          <Ctx tokens={tokens} label="Related Cases" value={String(relatedCases.length)}
            onClick={relatedCases.length ? () => router.push('/cases') : undefined} />
        </div>

        {/* Escalation path */}
        <div style={{ marginTop: primitiveSpacing[3], display: 'flex', alignItems: 'center', gap: primitiveSpacing[2], flexWrap: 'wrap' }}>
          <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Escalation</span>
          <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.secondary }}>
            {caseRecord.owner} → {caseRecord.team} → {strategy.routing.status === 'resolved' && strategy.routing.escalationPath ? strategy.routing.escalationPath.join(' → ') : 'SOM → CISO'}
          </span>
        </div>
      </section>

      {/* ── TAB NAV ─────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: primitiveSpacing[1], borderBottom: `1px solid ${tokens.border.default}`, flexWrap: 'wrap' }}>
        {TABS.map((t) => {
          const active = t.id === tab;
          const badge = t.id === 'actions' ? actions.length : t.id === 'evidence' ? riskObjects.length + evidence.length : null;
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`,
                fontSize: primitiveTypeScale.caption, fontWeight: active ? primitiveFontWeight.semibold : primitiveFontWeight.normal,
                color: active ? tokens.text.primary : tokens.text.muted,
                borderBottom: active ? `2px solid ${primitiveBrand.gold}` : '2px solid transparent',
                marginBottom: -1, display: 'flex', alignItems: 'center', gap: primitiveSpacing[1],
              }}>
              {t.label}
              {badge !== null && badge > 0 && (
                <span style={{ fontSize: primitiveTypeScale.micro, fontFamily: primitiveFonts.mono, color: tokens.text.muted, border: `1px solid ${tokens.border.subtle}`, padding: '0 5px' }}>{badge}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── TAB BODY ────────────────────────────────────────────────────── */}
      {tab === 'lifecycle' && <LifecycleTab caseRecord={caseRecord} cur={cur} tokens={tokens} mode={mode} />}
      {tab === 'actions' && <ActionsTab actions={actions} subActionsByAction={subActionsByAction} tokens={tokens} />}
      {tab === 'evidence' && <EvidenceTab caseRecord={caseRecord} riskObjects={riskObjects} evidence={evidence} tokens={tokens} />}
      {tab === 'comms' && <CommsTab caseRecord={caseRecord} tokens={tokens} />}
      {tab === 'strategy' && <StrategyTab strategy={strategy} tokens={tokens} />}
      {tab === 'audit' && <AuditTab caseRecord={caseRecord} actions={actions} tokens={tokens} />}
    </div>
  );
}

// ─── TAB 1: Lifecycle pipeline ──────────────────────────────────────────────

function LifecycleTab({ caseRecord, cur, tokens, mode }: { caseRecord: Case; cur: CaseStatus; tokens: Tokens; mode: string }) {
  const curIdx = LIFECYCLE_SPINE.indexOf(cur);
  const nextStates = getNextStates(cur);

  // Synthesised completed-state timestamps spread between created and updated.
  const t0 = new Date(caseRecord.createdAt).getTime();
  const t1 = new Date(caseRecord.updatedAt).getTime();
  const stampFor = (idx: number) => {
    if (curIdx <= 0) return caseRecord.createdAt;
    const frac = idx / Math.max(1, curIdx);
    return new Date(t0 + (t1 - t0) * frac).toISOString();
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: componentTokens.gridGap }}>
      <Panel tokens={tokens} title="12-State Closed-Loop Lifecycle" subtitle={`Current state: ${STATE_LABEL[cur]}`}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: primitiveSpacing[2] }}>
          {LIFECYCLE_SPINE.map((state, i) => {
            const done = i < curIdx;
            const current = i === curIdx;
            const border = current ? primitiveBrand.gold : done ? primitiveSignal.success : tokens.border.subtle;
            const color = current ? primitiveBrand.gold : done ? tokens.text.secondary : tokens.text.muted;
            return (
              <div key={state} style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[2] }}>
                <div style={{
                  minWidth: 132, padding: `${primitiveSpacing[2]} ${primitiveSpacing[2]}`,
                  border: `2px solid ${border}`, background: tokens.surface.primary,
                  boxShadow: current && mode === 'mission' ? '0 0 8px rgba(255,210,31,0.35)' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[1] }}>
                    <span style={{ fontSize: primitiveTypeScale.micro, color: done ? primitiveSignal.success : current ? primitiveBrand.gold : tokens.border.default }}>{done ? '✓' : current ? '◆' : '○'}</span>
                    <span style={{ fontSize: primitiveTypeScale.micro, fontWeight: current ? primitiveFontWeight.bold : primitiveFontWeight.normal, color, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{STATE_LABEL[state]}</span>
                  </div>
                  {(done || current) && (
                    <div style={{ marginTop: 4, fontSize: primitiveTypeScale.micro, color: tokens.text.muted, fontFamily: primitiveFonts.mono }}>
                      {new Date(stampFor(i)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      <div>{STATE_ACTOR[state]}</div>
                    </div>
                  )}
                </div>
                {i < LIFECYCLE_SPINE.length - 1 && <span style={{ color: tokens.border.default }}>→</span>}
              </div>
            );
          })}
        </div>
      </Panel>

      <Panel tokens={tokens} title="Allowed Next States" subtitle="System-owned — no manual transition controls (Assertion 1)">
        <div style={{ display: 'flex', gap: primitiveSpacing[2], flexWrap: 'wrap' }}>
          {nextStates.length ? nextStates.map((s) => (
            <span key={s} style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.secondary, padding: `${primitiveSpacing[1]} ${primitiveSpacing[3]}`, border: `1px solid ${tokens.border.default}` }}>
              {STATE_LABEL[s]} <span style={{ color: tokens.text.muted, fontSize: primitiveTypeScale.micro }}>· {STATE_ACTOR[s] ?? 'system'}</span>
            </span>
          )) : <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>Terminal state — no onward transitions.</span>}
        </div>
      </Panel>
    </section>
  );
}

// ─── TAB 2: Actions & sub-actions ───────────────────────────────────────────

function ActionsTab({ actions, subActionsByAction, tokens }: { actions: ActionRec[]; subActionsByAction: (id: string) => SubAction[]; tokens: Tokens }) {
  if (actions.length === 0) {
    return <Panel tokens={tokens} title="Actions & Sub-Actions" subtitle="None"><Empty tokens={tokens} text="No actions decomposed for this case yet (precondition: action_decomposed)." /></Panel>;
  }
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: componentTokens.gridGap }}>
      {actions.map((a) => {
        const subs = subActionsByAction(a.id);
        return (
          <Panel key={a.id} tokens={tokens} title={a.title} subtitle={a.description}
            headerRight={<Badge tone={ACTION_TONE[a.status] ?? 'muted'} tokens={tokens} label={titleCase(a.status)} />}>
            <div style={{ display: 'flex', gap: primitiveSpacing[4], flexWrap: 'wrap', marginBottom: primitiveSpacing[3] }}>
              <Mini tokens={tokens} label="Owner" value={a.owner} />
              <Mini tokens={tokens} label="Est. effort" value={`${a.estimatedEffortHours}h`} />
              <Mini tokens={tokens} label="Actual" value={`${a.actualEffortHours}h`} />
              <Mini tokens={tokens} label="Approval" value={a.approvalRef} mono />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: primitiveSpacing[2] }}>
              {subs.sort((x, y) => x.sequenceOrder - y.sequenceOrder).map((s) => (
                <div key={s.id} style={{ border: `1px solid ${tokens.border.subtle}`, padding: primitiveSpacing[3], background: tokens.surface.primary }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: primitiveSpacing[2] }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[2] }}>
                      <span style={{ fontFamily: primitiveFonts.mono, fontSize: primitiveTypeScale.micro, color: tokens.text.muted }}>#{s.sequenceOrder}</span>
                      <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.primary, fontWeight: primitiveFontWeight.medium }}>{s.executionMethod}</span>
                      <span style={{ fontSize: primitiveTypeScale.micro, padding: '1px 6px', background: D3FEND_COLOR[s.tacticType], color: '#fff', textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{s.tacticType}</span>
                    </div>
                    <Badge tone={OUTCOME_TONE[s.outcomeClassification]} tokens={tokens} label={titleCase(s.outcomeClassification)} />
                  </div>
                  <div style={{ display: 'flex', gap: primitiveSpacing[4], flexWrap: 'wrap', marginTop: primitiveSpacing[2] }}>
                    <Mini tokens={tokens} label="Target" value={`${s.targetEntity}`} mono />
                    <Mini tokens={tokens} label="Owner" value={s.owner} />
                    <Mini tokens={tokens} label="Est / Actual" value={`${s.estimatedEffortHours}h / ${s.actualEffortHours}h`} />
                  </div>
                  {s.countermeasures.length > 0 && (
                    <div style={{ marginTop: primitiveSpacing[2], display: 'flex', gap: primitiveSpacing[1], flexWrap: 'wrap' }}>
                      {s.countermeasures.map((cm) => (
                        <span key={cm.techniqueId} title={cm.techniqueName}
                          style={{ fontSize: primitiveTypeScale.micro, fontFamily: primitiveFonts.mono, color: tokens.text.secondary, border: `1px solid ${tokens.border.subtle}`, padding: '1px 5px' }}>
                          {cm.techniqueId} · {cm.techniqueName}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Panel>
        );
      })}
    </section>
  );
}

// ─── TAB 3: Evidence & risk objects ─────────────────────────────────────────

function EvidenceTab({ caseRecord, riskObjects, evidence, tokens }: {
  caseRecord: Case;
  riskObjects: import('../../../../../../packages/contracts/src/entities/risk-object').RiskObject[];
  evidence: import('../../../../../../packages/contracts/src/entities/evidence').Evidence[];
  tokens: Tokens;
}) {
  const freshTone: Record<string, 'success' | 'warning' | 'critical' | 'muted'> = { fresh: 'success', aging: 'warning', stale: 'warning', expired: 'critical' };
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: componentTokens.gridGap }}>
      {/* COIM-G aggregates on the case */}
      <Panel tokens={tokens} title="COIM-G Case Aggregates" subtitle="Computed from bound risk objects">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: primitiveSpacing[3] }}>
          <Mini tokens={tokens} label="Blast Radius" value={caseRecord.blastRadiusScore !== undefined ? String(caseRecord.blastRadiusScore) : '—'} />
          <Mini tokens={tokens} label="Affected" value={caseRecord.affectedEntityCount !== undefined ? String(caseRecord.affectedEntityCount) : '—'} />
          <Mini tokens={tokens} label="Dwell (h)" value={caseRecord.dwellTimeHours !== undefined ? String(caseRecord.dwellTimeHours) : '—'} />
          <Mini tokens={tokens} label="Confidence" value={caseRecord.confidenceAggregate !== undefined ? `${caseRecord.confidenceAggregate}%` : '—'} />
          <Mini tokens={tokens} label="ATT&CK" value={caseRecord.attacks?.length ? `${caseRecord.attacks.length} technique(s)` : '—'} />
        </div>
        {caseRecord.attacks?.length ? (
          <div style={{ marginTop: primitiveSpacing[3], display: 'flex', gap: primitiveSpacing[1], flexWrap: 'wrap' }}>
            {caseRecord.attacks.map((t) => (
              <span key={t.technique} style={{ fontSize: primitiveTypeScale.micro, fontFamily: primitiveFonts.mono, color: tokens.text.secondary, border: `1px solid ${tokens.border.subtle}`, padding: '1px 6px' }}>
                {t.technique} · {t.tactic}
              </span>
            ))}
          </div>
        ) : null}
        {caseRecord.findingClassBreakdown && (
          <div style={{ marginTop: primitiveSpacing[2], fontSize: primitiveTypeScale.micro, color: tokens.text.muted }}>
            Finding classes: {Object.entries(caseRecord.findingClassBreakdown).map(([k, v]) => `${k} ×${v}`).join(', ')}
          </div>
        )}
      </Panel>

      {/* AI-PLACEMENT: AI-CASE-DETAIL-002 — Evidence gap explanation */}

      {/* Bound risk objects */}
      <Panel tokens={tokens} title="Bound Risk Objects" subtitle={`${riskObjects.length} bound`}>
        {riskObjects.length === 0 ? <Empty tokens={tokens} text="No risk objects bound to this case." /> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: primitiveSpacing[3] }}>
            {riskObjects.map((r) => {
              const sc = r.sourceClassification;
              return (
                <div key={r.id} style={{ border: `1px solid ${tokens.border.subtle}`, padding: primitiveSpacing[3], background: tokens.surface.primary }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: primitiveSpacing[2] }}>
                    <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.primary, fontWeight: primitiveFontWeight.medium }}>{titleCase(r.type)}</span>
                    <Badge tone={r.treatmentState === 'open' ? 'warning' : 'success'} tokens={tokens} label={titleCase(r.treatmentState)} />
                  </div>
                  <p style={{ margin: `${primitiveSpacing[2]} 0`, fontSize: primitiveTypeScale.caption, color: tokens.text.secondary, lineHeight: 1.43 }}>{r.justification}</p>
                  {sc && (
                    <div style={{ display: 'flex', gap: primitiveSpacing[4], flexWrap: 'wrap', marginTop: primitiveSpacing[2] }}>
                      <Mini tokens={tokens} label="Finding class" value={titleCase(sc.findingClass)} />
                      <Mini tokens={tokens} label="Severity" value={`${sc.sourceSeverity.severityLevel} (${sc.sourceSeverity.severityId})`} />
                      <Mini tokens={tokens} label="Confidence" value={`${sc.sourceConfidence.confidenceLevel} (${sc.sourceConfidence.confidenceScore}%)`} />
                      <Mini tokens={tokens} label="Source" value={`${sc.sourceProduct.vendor} ${sc.sourceProduct.name}`} />
                      <Mini tokens={tokens} label="Connector" value={`Class ${sc.sourceProduct.connectorClass}`} />
                    </div>
                  )}
                  {sc?.attacks && sc.attacks.length > 0 && (
                    <div style={{ marginTop: primitiveSpacing[2], display: 'flex', gap: primitiveSpacing[1], flexWrap: 'wrap' }}>
                      {sc.attacks.map((t) => (
                        <span key={t.technique} style={{ fontSize: primitiveTypeScale.micro, fontFamily: primitiveFonts.mono, color: tokens.text.secondary, border: `1px solid ${tokens.border.subtle}`, padding: '1px 5px' }}>{t.technique} · {t.techniqueName}</span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Panel>

      {/* Evidence artefacts */}
      <Panel tokens={tokens} title="Evidence Pack" subtitle={`${evidence.length} artefact(s) — freshness indicates collection recency`}>
        {evidence.length === 0 ? <Empty tokens={tokens} text="No evidence artefacts bound to this case." /> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.caption }}>
            <thead><tr>{['Type', 'Source', 'Confidence', 'Collected', 'Freshness'].map((h) => <Th key={h} tokens={tokens}>{h}</Th>)}</tr></thead>
            <tbody>
              {evidence.map((e) => (
                <tr key={e.id} style={{ borderBottom: `1px solid ${tokens.border.subtle}` }}>
                  <Td tokens={tokens}>{titleCase(e.evidenceType)}</Td>
                  <Td tokens={tokens}><span style={{ fontFamily: primitiveFonts.mono }}>{e.source.sourceSystem}</span></Td>
                  <Td tokens={tokens}>{e.confidence}%</Td>
                  <Td tokens={tokens}>{new Date(e.collectedAt).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}</Td>
                  <Td tokens={tokens}><Badge tone={freshTone[e.freshnessStatus] ?? 'muted'} tokens={tokens} label={titleCase(e.freshnessStatus)} /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </section>
  );
}

// ─── TAB 4: Communication (email + Teams — explicitly mocked) ───────────────

function CommsTab({ caseRecord, tokens }: { caseRecord: Case; tokens: Tokens }) {
  const comms = buildCaseComms(caseRecord);
  const stateOrder = ['not_started', 'awaiting_response', 'in_discussion', 'stale', 'escalated'];
  const stateTone: Record<string, 'muted' | 'warning' | 'critical' | 'success'> = {
    not_started: 'muted', awaiting_response: 'warning', in_discussion: 'success', stale: 'warning', escalated: 'critical',
  };
  const dirTone: Record<string, string> = { outbound: tokens.status.info, inbound: tokens.status.success, reminder: tokens.status.warning, escalation: tokens.status.critical };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: componentTokens.gridGap }}>
      <Panel tokens={tokens} title="Communication State" subtitle="Mocked integration — shows the email/Teams flow that will bind to this case"
        headerRight={<Badge tone={stateTone[comms.state]} tokens={tokens} label={titleCase(comms.state)} />}>
        <div style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[1], flexWrap: 'wrap' }}>
          {stateOrder.map((s, i) => {
            const reached = stateOrder.indexOf(comms.state) >= i;
            return (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[1] }}>
                <span style={{ fontSize: primitiveTypeScale.micro, padding: '2px 8px', border: `1px solid ${reached ? tokens.text.secondary : tokens.border.subtle}`, color: reached ? tokens.text.primary : tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{titleCase(s)}</span>
                {i < stateOrder.length - 1 && <span style={{ color: tokens.border.default }}>→</span>}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: primitiveSpacing[3], display: 'flex', gap: primitiveSpacing[2] }}>
          <button disabled style={mockBtn(tokens)}>Send Email (mock)</button>
          <button disabled style={mockBtn(tokens)}>Post to Teams (mock)</button>
        </div>
      </Panel>

      <Panel tokens={tokens} title="Email Thread" subtitle={`Mailbox: ${comms.mailbox}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: primitiveSpacing[2] }}>
          {comms.emails.map((m, i) => (
            <div key={i} style={{ borderLeft: `3px solid ${dirTone[m.direction]}`, padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, background: tokens.surface.primary }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: primitiveSpacing[2] }}>
                <span style={{ fontSize: primitiveTypeScale.caption, fontWeight: primitiveFontWeight.medium, color: tokens.text.primary }}>
                  <span style={{ textTransform: 'uppercase', fontSize: primitiveTypeScale.micro, color: dirTone[m.direction], letterSpacing: primitiveLetterSpacing.eyebrow, marginRight: primitiveSpacing[2] }}>{m.direction}</span>
                  {m.subject}
                </span>
                <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, fontFamily: primitiveFonts.mono }}>{m.timestamp}</span>
              </div>
              <p style={{ margin: `${primitiveSpacing[1]} 0 0`, fontSize: primitiveTypeScale.caption, color: tokens.text.secondary }}>{m.body}</p>
              {m.meta && <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted }}>{m.meta}</span>}
            </div>
          ))}
        </div>
      </Panel>

      <Panel tokens={tokens} title="Teams / Command Bridge" subtitle="Adaptive Cards + channel posts (mocked)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: primitiveSpacing[2] }}>
          {comms.teams.map((t, i) => (
            <div key={i} style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, background: tokens.surface.primary, border: `1px solid ${tokens.border.subtle}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: primitiveSpacing[2] }}>
                <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.primary }}>{t.title}</span>
                <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, fontFamily: primitiveFonts.mono }}>{t.timestamp}</span>
              </div>
              <p style={{ margin: `${primitiveSpacing[1]} 0 0`, fontSize: primitiveTypeScale.caption, color: tokens.text.secondary }}>{t.body}</p>
              {t.actions && (
                <div style={{ marginTop: primitiveSpacing[2], display: 'flex', gap: primitiveSpacing[1] }}>
                  {t.actions.map((a) => <button key={a} disabled style={mockBtn(tokens)}>{a}</button>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

// ─── TAB 5: Strategy bindings ───────────────────────────────────────────────

function StrategyTab({ strategy, tokens }: { strategy: ReturnType<typeof resolveAllStrategies>; tokens: Tokens }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: componentTokens.gridGap }}>
      <Panel tokens={tokens} title="SLA Strategy" subtitle="Resolved from SLA surface">
        {strategy.sla.status === 'resolved' ? (
          <div style={{ display: 'flex', gap: primitiveSpacing[4], flexWrap: 'wrap' }}>
            <Mini tokens={tokens} label="Response" value={`${strategy.sla.responseHours}h`} />
            <Mini tokens={tokens} label="Escalation cadence" value={strategy.sla.escalationCadenceMinutes !== null ? `${strategy.sla.escalationCadenceMinutes} min` : '—'} />
            <Mini tokens={tokens} label="Policy" value={strategy.sla.sourcePolicy?.id ?? '—'} mono />
          </div>
        ) : <Unresolved tokens={tokens} />}
      </Panel>

      <Panel tokens={tokens} title="Routing Strategy" subtitle="Resolved from routing surface">
        {strategy.routing.status === 'resolved' ? (
          <div style={{ display: 'flex', gap: primitiveSpacing[4], flexWrap: 'wrap' }}>
            <Mini tokens={tokens} label="Team" value={strategy.routing.team ?? '—'} />
            <Mini tokens={tokens} label="Escalation" value={(strategy.routing.escalationPath ?? []).join(' → ') || '—'} />
            <Mini tokens={tokens} label="Policy" value={strategy.routing.sourcePolicy?.id ?? '—'} mono />
          </div>
        ) : <Unresolved tokens={tokens} />}
      </Panel>

      <Panel tokens={tokens} title="Prioritisation Weights" subtitle="Resolved from prioritisation-weight surface">
        {strategy.priority.status === 'resolved' && strategy.priority.weights ? (
          <div style={{ display: 'flex', gap: primitiveSpacing[3], flexWrap: 'wrap' }}>
            {Object.entries(strategy.priority.weights).map(([k, v]) => <Mini key={k} tokens={tokens} label={titleCase(k)} value={String(v)} />)}
          </div>
        ) : <Unresolved tokens={tokens} />}
      </Panel>

      <Panel tokens={tokens} title="Validation Window" subtitle="Resolved from validation-window surface">
        {strategy.validation.status === 'resolved' ? (
          <div style={{ display: 'flex', gap: primitiveSpacing[4], flexWrap: 'wrap' }}>
            <Mini tokens={tokens} label="Window" value={`${strategy.validation.windowHours}h`} />
            <Mini tokens={tokens} label="Freshness" value={`${strategy.validation.freshnessHours}h`} />
          </div>
        ) : <Unresolved tokens={tokens} />}
      </Panel>

      {/* AI-PLACEMENT: AI-CASE-DETAIL-003 — Closure gate explanation */}
      <Panel tokens={tokens} title="Closure Gates" subtitle="All gates must pass for system closure">
        {strategy.closureGates.status === 'resolved' && strategy.closureGates.gates ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: primitiveSpacing[1] }}>
            {strategy.closureGates.gates.map((g) => (
              <div key={g} style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[2] }}>
                <span style={{ width: 8, height: 8, background: tokens.text.muted, display: 'inline-block' }} />
                <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.secondary }}>{titleCase(g)}</span>
              </div>
            ))}
          </div>
        ) : <Unresolved tokens={tokens} />}
      </Panel>

      <Panel tokens={tokens} title="Reopening Triggers" subtitle="Armed conditions that reopen a closed case">
        {strategy.reopening.status === 'resolved' && strategy.reopening.triggers ? (
          <div style={{ display: 'flex', gap: primitiveSpacing[2], flexWrap: 'wrap' }}>
            {strategy.reopening.triggers.map((t) => (
              <span key={t} style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.secondary, border: `1px solid ${tokens.border.default}`, padding: `${primitiveSpacing[1]} ${primitiveSpacing[2]}` }}>{titleCase(t)} <span style={{ color: tokens.status.success, fontSize: primitiveTypeScale.micro }}>· armed</span></span>
            ))}
          </div>
        ) : <Unresolved tokens={tokens} />}
      </Panel>
    </section>
  );
}

// ─── TAB 6: Audit timeline ──────────────────────────────────────────────────

function AuditTab({ caseRecord, actions, tokens }: { caseRecord: Case; actions: ActionRec[]; tokens: Tokens }) {
  const events = buildAuditTimeline(caseRecord, actions);
  return (
    <Panel tokens={tokens} title="Audit Timeline" subtitle={`${events.length} events — chronological, system-attributed`}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {events.map((e, i) => (
          <div key={i} style={{ display: 'flex', gap: primitiveSpacing[3], padding: `${primitiveSpacing[2]} 0`, borderBottom: i < events.length - 1 ? `1px solid ${tokens.border.subtle}` : 'none', alignItems: 'baseline' }}>
            <span style={{ fontFamily: primitiveFonts.mono, fontSize: primitiveTypeScale.micro, color: tokens.text.muted, minWidth: 130, whiteSpace: 'nowrap' }}>
              {new Date(e.timestamp).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}
            </span>
            <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.primary, flex: 1 }}>{e.action}<span style={{ display: 'block', color: tokens.text.muted, fontSize: primitiveTypeScale.micro }}>{e.detail}</span></span>
            <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, fontFamily: primitiveFonts.mono }}>{e.actor}</span>
          </div>
        ))}
      </div>
      <p style={{ margin: `${primitiveSpacing[3]} 0 0`, fontFamily: primitiveFonts.mono, fontSize: primitiveTypeScale.micro, color: tokens.text.muted }}>Audit ref: {caseRecord.auditTrailRef}</p>
    </Panel>
  );
}

// ─── Shared helpers ─────────────────────────────────────────────────────────

function titleCase(s: string): string {
  return s.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}

const card = (tokens: Tokens): React.CSSProperties => ({
  background: tokens.surface.elevated,
  border: `1px solid ${tokens.border.subtle}`,
  borderRadius: componentTokens.cardRadius,
});

const mockBtn = (tokens: Tokens): React.CSSProperties => ({
  padding: `${primitiveSpacing[1]} ${primitiveSpacing[3]}`,
  fontSize: primitiveTypeScale.micro, fontFamily: primitiveFonts.body,
  background: 'transparent', color: tokens.text.muted,
  border: `1px dashed ${tokens.border.default}`, borderRadius: 0,
  cursor: 'not-allowed',
});

function Panel({ tokens, title, subtitle, headerRight, children }: { tokens: Tokens; title: string; subtitle?: string; headerRight?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ ...card(tokens), padding: componentTokens.cardPadding }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: primitiveSpacing[3], marginBottom: componentTokens.cardHeaderMargin }}>
        <div>
          <h3 style={{ margin: 0, fontSize: primitiveTypeScale.h4, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{title}</h3>
          {subtitle && <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted }}>{subtitle}</span>}
        </div>
        {headerRight}
      </div>
      {children}
    </div>
  );
}

function Ctx({ tokens, label, value, sub, accent, onClick }: { tokens: Tokens; label: string; value: string; sub?: string; accent?: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <span style={{ display: 'block', fontSize: primitiveTypeScale.micro, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{label}</span>
      <span style={{ fontSize: primitiveTypeScale.body, fontWeight: primitiveFontWeight.semibold, color: accent ?? tokens.text.primary, textDecoration: onClick ? 'underline' : 'none' }}>{value}</span>
      {sub && <span style={{ display: 'block', fontSize: primitiveTypeScale.micro, color: tokens.text.muted }}>{sub}</span>}
    </div>
  );
}

function Mini({ tokens, label, value, mono }: { tokens: Tokens; label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <span style={{ display: 'block', fontSize: primitiveTypeScale.micro, color: tokens.text.muted }}>{label}</span>
      <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.secondary, fontFamily: mono ? primitiveFonts.mono : primitiveFonts.body }}>{value}</span>
    </div>
  );
}

function Badge({ tokens, label, tone }: { tokens: Tokens; label: string; tone: 'success' | 'warning' | 'critical' | 'muted' }) {
  const bg = tone === 'success' ? tokens.status.success : tone === 'warning' ? tokens.status.warning : tone === 'critical' ? tokens.status.critical : tokens.text.muted;
  return <span style={{ fontSize: primitiveTypeScale.micro, fontWeight: primitiveFontWeight.medium, padding: `2px ${primitiveSpacing[2]}`, background: bg, color: '#fff', whiteSpace: 'nowrap' }}>{label}</span>;
}

function Th({ tokens, children }: { tokens: Tokens; children: React.ReactNode }) {
  return <th style={{ textAlign: 'left', padding: `${primitiveSpacing[1]} ${primitiveSpacing[2]}`, borderBottom: `2px solid ${tokens.border.default}`, color: tokens.text.secondary, fontSize: primitiveTypeScale.micro, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, whiteSpace: 'nowrap' }}>{children}</th>;
}

function Td({ tokens, children }: { tokens: Tokens; children: React.ReactNode }) {
  return <td style={{ padding: `${primitiveSpacing[2]}`, color: tokens.text.secondary }}>{children}</td>;
}

function SurfacePill({ surface, tokens }: { surface: string; tokens: Tokens }) {
  const external = surface === 'external_attack_surface';
  return <span style={{ fontSize: primitiveTypeScale.micro, padding: '1px 6px', border: `1px solid ${external ? primitiveBrand.gold : tokens.border.default}`, color: external ? primitiveBrand.gold : tokens.text.muted }}>{external ? 'External' : 'Internal'}</span>;
}

function Empty({ tokens, text }: { tokens: Tokens; text: string }) {
  return <p style={{ margin: 0, fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>{text}</p>;
}

function Unresolved({ tokens }: { tokens: Tokens }) {
  return <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>Unresolved — no matching strategy policy.</span>;
}
