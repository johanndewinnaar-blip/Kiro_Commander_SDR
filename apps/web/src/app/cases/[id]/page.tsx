'use client';

import { use } from 'react';
import { useMode } from '@/context/mode-context';
import { seedCases } from '../../../../../../packages/contracts/src/fixtures/seed-cases';
import { seedAssets } from '../../../../../../packages/contracts/src/fixtures/seed-assets';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import { primitiveBrand, primitiveFonts, primitiveTypeScale, primitiveLetterSpacing, primitiveSignal, primitiveSpacing, primitiveRadii } from '../../../../../../packages/ui/src/tokens/primitives';
import { primitivePriority } from '../../../../../../packages/ui/src/tokens/primitives';
import { resolveAllStrategies } from '../../../../../../packages/contracts/src/resolvers/case-strategy-resolver';
import { seedStrategies } from '../../../../../../packages/contracts/src/fixtures/seed-strategies';
import { getRightRailStyles } from '../../../../../../packages/ui/src/components/right-rail';
import { LIFECYCLE_STAGES } from '../../../../../../packages/ui/src/components/lifecycle-pipeline';
import { getNextStates } from '../../../../../../packages/contracts/src/entities/case-lifecycle';
import { evaluateValidationWindow } from '../../../../../../packages/contracts/src/resolvers/validation-window-enforcer';
import { evaluateClosureGates } from '../../../../../../packages/contracts/src/resolvers/closure-gate-enforcer';
import { assignCase, extractRoutingConfig } from '../../../../../../packages/contracts/src/resolvers/assignment-engine';
import type { CaseStatus } from '../../../../../../packages/contracts/src/entities/case';

/**
 * Case Detail — Commander SDR (DS-1.0, Spec 06 Phase C2)
 *
 * Source: Spec 06, Route Registry (path: /cases/:id)
 * Mockup: case-handling-dashboard.png (detail pane)
 * DS-1.0 §5: Master-detail on wide (>1400px), full-page on narrow
 * DS-1.0 §8: Workspace structure with right-rail
 * DS-1.0 §21 Req 32: Right-rail insight/action column
 *
 * Doctrinal constraints:
 * - No manual status edit buttons (Assertion 1)
 * - No manual closure button (Assertion 1)
 * - Routing rationale from strategy resolver (Constraint 9)
 * - SOC boundary: read-only signal display, no SOC write actions
 * - Surface attribution preserved (Assertion 10)
 */

export default function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { mode, tokens } = useMode();
  const railStyles = getRightRailStyles(mode);

  // Find the case from seed data
  const caseRecord = seedCases.find((c) => c.id === id) ?? seedCases[0];
  const strategy = resolveAllStrategies(caseRecord, seedStrategies);
  const p = primitivePriority[caseRecord.priority.toLowerCase() as keyof typeof primitivePriority];

  // Related entities
  const relatedAssets = seedAssets.filter((a) => caseRecord.relatedEntities.includes(a.id));

  // Mock timeline events (audit trail — system-owned actions only)
  const timelineEvents = [
    { timestamp: caseRecord.createdAt, action: 'Case created by routing engine', actor: 'system' },
    { timestamp: caseRecord.updatedAt, action: `Assigned to ${caseRecord.owner}`, actor: 'routing-engine' },
    ...(caseRecord.status === 'in-progress' ? [{ timestamp: caseRecord.updatedAt, action: 'Investigation started', actor: caseRecord.owner }] : []),
  ];

  // Mock evidence pack (source signals bound to case)
  const evidencePack = [
    { id: 'ev-1', type: 'Source Signal', source: caseRecord.source.sourceSystem, timestamp: caseRecord.source.sourceTimestamp },
    { id: 'ev-2', type: 'Connector Import', source: caseRecord.source.connectorId, timestamp: caseRecord.source.sourceTimestamp },
  ];

  return (
    <div style={{
      display: 'flex',
      gap: componentTokens.gridGap,
      height: '100%',
      /* DS-1.0 §5: Master-detail on wide (>1400px), stacks on narrow via CSS */
      flexWrap: 'wrap',
    }}>
      {/* Main content — case detail (flex: 1, min-width ensures it takes full width on narrow) */}
      <div style={{ flex: 1, minWidth: '0', overflow: 'auto' }}>
        {/* Sticky Case Header — Spec 02 v1.3 Req 5 */}
        <section style={{
          position: 'sticky', top: 0, zIndex: 5,
          background: tokens.surface.secondary,
          borderBottom: `1px solid ${tokens.border.default}`,
          padding: `${primitiveSpacing[3]} ${componentTokens.contentPadding}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[2] }}>
              <span style={{ color: p.color, fontWeight: 700, fontSize: primitiveTypeScale.body }}>{p.shape} {p.label}</span>
              <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>{caseRecord.caseRef}</span>
              <span style={{ fontSize: primitiveTypeScale.micro, padding: '2px 6px', border: caseRecord.surfaceAttribution === 'external_attack_surface' ? `1px solid ${primitiveBrand.gold}` : `1px solid ${tokens.border.default}`, borderRadius: primitiveRadii.md, color: caseRecord.surfaceAttribution === 'external_attack_surface' ? primitiveBrand.gold : tokens.text.muted }}>
                {caseRecord.surfaceAttribution === 'external_attack_surface' ? 'External' : 'Internal'}
              </span>
            </div>
            <h1 style={{ margin: '4px 0 0', fontSize: primitiveTypeScale.h2, fontWeight: 700, color: tokens.text.primary, fontFamily: primitiveFonts.body }}>{caseRecord.title}</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[3] }}>
            <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted, padding: `${primitiveSpacing[1]} ${primitiveSpacing[3]}`, border: `1px solid ${tokens.border.default}`, borderRadius: primitiveRadii.md }}>{caseRecord.status}</span>
          </div>
        </section>

        {/* Metadata Panel */}
        <section style={{ padding: componentTokens.contentPadding, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: componentTokens.gridGap }}>
          <MetadataCard label="Owner" value={caseRecord.owner} tokens={tokens} />
          <MetadataCard label="Team" value={caseRecord.team} tokens={tokens} />
          <MetadataCard label="Case Type" value={caseRecord.caseType} tokens={tokens} />
          <MetadataCard label="SLA Target" value={strategy.sla.status === 'resolved' ? `${strategy.sla.responseHours}h` : 'Unresolved'} tokens={tokens} />
          <MetadataCard label="SLA Breached" value={caseRecord.sla.breached ? 'YES' : 'No'} tokens={tokens} isAlert={caseRecord.sla.breached} />
          <MetadataCard label="Surface" value={caseRecord.surfaceAttribution === 'external_attack_surface' ? 'External Attack Surface' : 'Internal Attack Surface'} tokens={tokens} />
        </section>

        {/* Routing Rationale — from strategy resolver, NOT hardcoded (Constraint 9) */}
        <section style={{ padding: `0 ${componentTokens.contentPadding} ${componentTokens.contentPadding}` }}>
          <div style={{ padding: componentTokens.cardPadding, background: tokens.surface.elevated, borderRadius: componentTokens.cardRadius, border: `1px solid ${tokens.border.subtle}` }}>
            <h3 style={{ margin: `0 0 ${primitiveSpacing[2]}`, fontSize: primitiveTypeScale.h3, fontWeight: 600, color: tokens.text.primary, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Routing Rationale</h3>
            <p style={{ margin: 0, color: tokens.text.secondary, fontSize: primitiveTypeScale.body, lineHeight: '1.45' }}>{caseRecord.routingRationale}</p>
            {strategy.routing.status === 'resolved' && (
              <p style={{ margin: `${primitiveSpacing[2]} 0 0`, color: tokens.text.muted, fontSize: primitiveTypeScale.caption }}>
                Strategy: routed to {strategy.routing.team} via {strategy.routing.sourcePolicy?.id}
              </p>
            )}
          </div>
        </section>

        {/* ─── Phase D5: Lifecycle Section ─────────────────────────────────── */}
        <LifecycleSection caseRecord={caseRecord} tokens={tokens} mode={mode} />

        {/* Timeline / Audit Trail — chronological system-owned events */}
        <section style={{ padding: `0 ${componentTokens.contentPadding} ${componentTokens.contentPadding}` }}>
          <div style={{ padding: componentTokens.cardPadding, background: tokens.surface.elevated, borderRadius: componentTokens.cardRadius, border: `1px solid ${tokens.border.subtle}` }}>
            <h3 style={{ margin: `0 0 ${primitiveSpacing[3]}`, fontSize: primitiveTypeScale.h3, fontWeight: 600, color: tokens.text.primary, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Timeline</h3>
            {timelineEvents.map((event, i) => (
              <div key={i} style={{ display: 'flex', gap: primitiveSpacing[3], padding: `${primitiveSpacing[2]} 0`, borderBottom: i < timelineEvents.length - 1 ? `1px solid ${tokens.border.subtle}` : 'none' }}>
                <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, fontFamily: primitiveFonts.mono, minWidth: '140px', whiteSpace: 'nowrap' }}>
                  {new Date(event.timestamp).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}
                </span>
                <span style={{ fontSize: primitiveTypeScale.body, color: tokens.text.secondary }}>{event.action}</span>
                <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, marginLeft: 'auto' }}>{event.actor}</span>
              </div>
            ))}
            <p style={{ margin: `${primitiveSpacing[3]} 0 0`, color: tokens.text.muted, fontSize: primitiveTypeScale.caption, fontFamily: primitiveFonts.mono }}>
              Audit ref: {caseRecord.auditTrailRef}
            </p>
          </div>
        </section>

        {/* Evidence Pack — source signals and connector imports bound to case */}
        <section style={{ padding: `0 ${componentTokens.contentPadding} ${componentTokens.contentPadding}` }}>
          <div style={{ padding: componentTokens.cardPadding, background: tokens.surface.elevated, borderRadius: componentTokens.cardRadius, border: `1px solid ${tokens.border.subtle}` }}>
            <h3 style={{ margin: `0 0 ${primitiveSpacing[3]}`, fontSize: primitiveTypeScale.h3, fontWeight: 600, color: tokens.text.primary, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Evidence Pack</h3>
            {evidencePack.map((ev) => (
              <div key={ev.id} style={{ display: 'flex', justifyContent: 'space-between', padding: `${primitiveSpacing[2]} 0`, borderBottom: `1px solid ${tokens.border.subtle}` }}>
                <div>
                  <span style={{ fontSize: primitiveTypeScale.body, color: tokens.text.primary }}>{ev.type}</span>
                  <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted, marginLeft: primitiveSpacing[2], fontFamily: primitiveFonts.mono }}>{ev.source}</span>
                </div>
                <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, fontFamily: primitiveFonts.mono }}>
                  {new Date(ev.timestamp).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Strategy Resolution Summary */}
        <section style={{ padding: `0 ${componentTokens.contentPadding} ${componentTokens.contentPadding}` }}>
          <div style={{ padding: componentTokens.cardPadding, background: tokens.surface.elevated, borderRadius: componentTokens.cardRadius, border: `1px solid ${tokens.border.subtle}` }}>
            <h3 style={{ margin: `0 0 ${primitiveSpacing[2]}`, fontSize: primitiveTypeScale.h3, fontWeight: 600, color: tokens.text.primary, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Strategy Bindings</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: primitiveSpacing[3], fontSize: primitiveTypeScale.body }}>
              <StrategyLine label="Closure Gates" value={strategy.closureGates.status === 'resolved' ? strategy.closureGates.gates!.join(', ') : 'Unresolved'} tokens={tokens} />
              <StrategyLine label="Reopening Triggers" value={strategy.reopening.status === 'resolved' ? strategy.reopening.triggers!.join(', ') : 'Unresolved'} tokens={tokens} />
              <StrategyLine label="Validation Window" value={strategy.validation.status === 'resolved' ? `${strategy.validation.windowHours}h window, ${strategy.validation.freshnessHours}h freshness` : 'Unresolved'} tokens={tokens} />
              <StrategyLine label="Priority Weights" value={strategy.priority.status === 'resolved' ? `${Object.keys(strategy.priority.weights!).length} factors` : 'Unresolved'} tokens={tokens} />
            </div>
          </div>
        </section>

        {/* Related Entities */}
        {relatedAssets.length > 0 && (
          <section style={{ padding: `0 ${componentTokens.contentPadding} ${componentTokens.contentPadding}` }}>
            <div style={{ padding: componentTokens.cardPadding, background: tokens.surface.elevated, borderRadius: componentTokens.cardRadius, border: `1px solid ${tokens.border.subtle}` }}>
              <h3 style={{ margin: `0 0 ${primitiveSpacing[2]}`, fontSize: primitiveTypeScale.h3, fontWeight: 600, color: tokens.text.primary, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Related Entities</h3>
              {relatedAssets.map((a) => (
                <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: `${primitiveSpacing[2]} 0`, borderBottom: `1px solid ${tokens.border.subtle}` }}>
                  <span style={{ color: tokens.text.primary, fontSize: primitiveTypeScale.body }}>{a.name}</span>
                  <span style={{ color: tokens.text.muted, fontSize: primitiveTypeScale.caption }}>{a.classification} · Criticality {a.criticality}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Right Rail — DS-1.0 §21 Req 32, using Phase 2c right-rail component styles */}
      <aside style={{
        ...railStyles.container,
        /* DS-1.0 §5: On narrow (<1400px), right-rail collapses — flexWrap on parent handles this */
        flexBasis: '320px',
        flexShrink: 0,
        flexGrow: 0,
      }}>
        <div style={railStyles.section}>
          <h4 style={railStyles.sectionTitle}>Case Actions</h4>
          <p style={{ ...railStyles.sectionContent, margin: 0 }}>
            System-owned lifecycle. Actions are determined by the routing engine and strategy layer.
          </p>
        </div>
        <div style={railStyles.section}>
          <h4 style={railStyles.sectionTitle}>Recommended Next</h4>
          <p style={{ ...railStyles.sectionContent, margin: 0 }}>
            {caseRecord.status === 'open' ? 'Awaiting routing engine assignment.' : 'Investigation in progress.'}
          </p>
        </div>
        <div style={railStyles.section}>
          <h4 style={railStyles.sectionTitle}>Source Signal</h4>
          <p style={{ margin: 0, color: tokens.text.muted, fontSize: primitiveTypeScale.caption, fontFamily: primitiveFonts.mono }}>
            {caseRecord.source.sourceSystem}
          </p>
        </div>
      </aside>
    </div>
  );
}

function MetadataCard({ label, value, tokens, isAlert }: { label: string; value: string; tokens: any; isAlert?: boolean }) {
  return (
    <div style={{ padding: componentTokens.cardPadding, background: tokens.surface.elevated, borderRadius: componentTokens.cardRadius, border: `1px solid ${tokens.border.subtle}` }}>
      <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, display: 'block', marginBottom: '4px' }}>{label}</span>
      <span style={{ fontSize: primitiveTypeScale.body, fontWeight: 600, color: isAlert ? primitiveSignal.critical : tokens.text.primary }}>{value}</span>
    </div>
  );
}

function StrategyLine({ label, value, tokens }: { label: string; value: string; tokens: any }) {
  return (
    <div>
      <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted, display: 'block' }}>{label}</span>
      <span style={{ fontSize: primitiveTypeScale.body, color: tokens.text.secondary }}>{value}</span>
    </div>
  );
}

// ─── Phase D5: Lifecycle Section Component ───────────────────────────────────

/**
 * Lifecycle Section — Phase D5
 *
 * Displays:
 * 1. Lifecycle pipeline with current state highlighted (gold ring)
 * 2. Allowed next states (read-only, no action buttons)
 * 3. Transition history timeline (from → to, actor, reason, timestamp, audit ref)
 * 4. Closure gate status (for awaiting-closure cases)
 * 5. Validation window status (for awaiting-validation cases)
 * 6. Assignment rationale and escalation path (from D4)
 *
 * Doctrinal constraints:
 * - Read-only display only. No manual transition/closure/reopening buttons.
 * - All values from D1-D4 evaluators and Spec 43 strategies.
 * - Both modes via semantic tokens.
 */

/** Map CaseStatus to LIFECYCLE_STAGES display name */
const STATUS_TO_STAGE: Record<CaseStatus, string> = {
  'open': 'New',
  'in-progress': 'Investigating',
  'awaiting-validation': 'Validation',
  'awaiting-closure': 'Closure',
  'closed': 'Closure',
  'reopened': 'Triage',
};

function LifecycleSection({ caseRecord, tokens, mode }: { caseRecord: any; tokens: any; mode: string }) {
  const currentStage = STATUS_TO_STAGE[caseRecord.status as CaseStatus] ?? 'New';
  const allowedNext = getNextStates(caseRecord.status as CaseStatus);

  // Transition history (mock — system-owned transitions only)
  const transitionHistory = [
    { from: 'open', to: 'in-progress', actor: 'routing-engine', reason: 'Case assigned via routing strategy', timestamp: caseRecord.createdAt, auditRef: `audit-${caseRecord.id}-001` },
    ...(caseRecord.status !== 'open' && caseRecord.status !== 'in-progress' ? [
      { from: 'in-progress', to: caseRecord.status, actor: 'system', reason: 'Lifecycle progression', timestamp: caseRecord.updatedAt, auditRef: `audit-${caseRecord.id}-002` },
    ] : []),
  ];

  // Validation window state (for awaiting-validation cases)
  let validationState: ReturnType<typeof evaluateValidationWindow> | null = null;
  if (caseRecord.status === 'awaiting-validation') {
    try {
      validationState = evaluateValidationWindow(
        caseRecord.updatedAt,
        caseRecord.updatedAt,
        seedStrategies,
      );
    } catch { /* strategy missing — display nothing */ }
  }

  // Closure gate state (for awaiting-closure cases)
  let closureGateState: ReturnType<typeof evaluateClosureGates> | null = null;
  if (caseRecord.status === 'awaiting-closure') {
    try {
      closureGateState = evaluateClosureGates(
        { remediationVerified: true, validationPassed: true, hasActiveDrift: false, slaBreached: caseRecord.sla.breached },
        seedStrategies,
      );
    } catch { /* strategy missing — display nothing */ }
  }

  // Assignment rationale from D4
  let assignmentInfo: { escalationPath: string[]; routingRationale: string } | null = null;
  try {
    const { config } = extractRoutingConfig(seedStrategies);
    assignmentInfo = {
      escalationPath: config.escalationPath,
      routingRationale: caseRecord.routingRationale,
    };
  } catch { /* strategy missing */ }

  return (
    <section data-testid="lifecycle-section" style={{ padding: `0 ${componentTokens.contentPadding} ${componentTokens.contentPadding}` }}>
      <div style={{ padding: componentTokens.cardPadding, background: tokens.surface.elevated, borderRadius: componentTokens.cardRadius, border: `1px solid ${tokens.border.subtle}` }}>
        <h3 style={{ margin: `0 0 ${primitiveSpacing[3]}`, fontSize: primitiveTypeScale.h3, fontWeight: 600, color: tokens.text.primary, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Lifecycle</h3>

        {/* 1. Lifecycle Pipeline — current state highlighted */}
        <div data-testid="lifecycle-pipeline" style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[2], overflowX: 'auto', marginBottom: primitiveSpacing[4] }}>
          {LIFECYCLE_STAGES.map((stage, i) => {
            const isCurrentStage = stage === currentStage;
            return (
              <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[2] }}>
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                  padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, borderRadius: componentTokens.cardRadius,
                  border: isCurrentStage ? `2px solid ${primitiveBrand.gold}` : `2px solid ${tokens.border.subtle}`,
                  background: tokens.surface.secondary, minWidth: '80px',
                  boxShadow: isCurrentStage && mode === 'mission' ? '0 0 8px rgba(255,210,31,0.35)' : 'none',
                }}>
                  <span style={{ fontSize: primitiveTypeScale.micro, color: isCurrentStage ? primitiveBrand.gold : tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, textAlign: 'center', whiteSpace: 'nowrap', fontWeight: isCurrentStage ? 700 : 400 }}>{stage}</span>
                </div>
                {i < LIFECYCLE_STAGES.length - 1 && (
                  <div style={{ width: primitiveSpacing[4], height: '2px', background: tokens.border.default, flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>

        {/* 2. Allowed Next States — read-only, no action buttons */}
        <div data-testid="allowed-next-states" style={{ marginBottom: primitiveSpacing[4] }}>
          <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, display: 'block', marginBottom: primitiveSpacing[2] }}>Allowed Next States (system-owned)</span>
          <div style={{ display: 'flex', gap: primitiveSpacing[2], flexWrap: 'wrap' }}>
            {allowedNext.length > 0 ? allowedNext.map((state) => (
              <span key={state} style={{ fontSize: primitiveTypeScale.body, color: tokens.text.secondary, padding: `${primitiveSpacing[1]} ${primitiveSpacing[3]}`, border: `1px solid ${tokens.border.default}`, borderRadius: primitiveRadii.md }}>{state}</span>
            )) : (
              <span style={{ fontSize: primitiveTypeScale.body, color: tokens.text.muted }}>No transitions available (terminal state)</span>
            )}
          </div>
        </div>

        {/* 3. Validation Window Status (awaiting-validation only) */}
        {validationState && (
          <div data-testid="validation-window-status" style={{ marginBottom: primitiveSpacing[4], padding: componentTokens.cardPadding, background: tokens.surface.primary, borderRadius: componentTokens.cardRadius, border: `1px solid ${tokens.border.subtle}` }}>
            <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, display: 'block', marginBottom: primitiveSpacing[2] }}>Validation Window</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: primitiveSpacing[3] }}>
              <div>
                <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, display: 'block' }}>Window</span>
                <span style={{ fontSize: primitiveTypeScale.body, color: validationState.withinWindow ? primitiveSignal.success : primitiveSignal.critical, fontWeight: 600 }}>
                  {validationState.withinWindow ? `${validationState.windowHoursRemaining.toFixed(0)}h remaining` : 'Expired'}
                </span>
              </div>
              <div>
                <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, display: 'block' }}>Evidence</span>
                <span style={{ fontSize: primitiveTypeScale.body, color: validationState.evidenceFresh ? primitiveSignal.success : primitiveSignal.warning, fontWeight: 600 }}>
                  {validationState.evidenceFresh ? 'Fresh' : 'Stale'}
                </span>
              </div>
              <div>
                <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, display: 'block' }}>Refresh</span>
                <span style={{ fontSize: primitiveTypeScale.body, color: validationState.refreshDue ? primitiveSignal.warning : tokens.text.secondary, fontWeight: 600 }}>
                  {validationState.refreshDue ? 'Due' : 'Current'}
                </span>
              </div>
            </div>
            <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, display: 'block', marginTop: primitiveSpacing[2], fontFamily: primitiveFonts.mono }}>
              Policy: {validationState.strategyRef.policyId} v{validationState.strategyRef.policyVersion}
            </span>
          </div>
        )}

        {/* 4. Closure Gate Status (awaiting-closure only) */}
        {closureGateState && (
          <div data-testid="closure-gate-status" style={{ marginBottom: primitiveSpacing[4], padding: componentTokens.cardPadding, background: tokens.surface.primary, borderRadius: componentTokens.cardRadius, border: `1px solid ${tokens.border.subtle}` }}>
            <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, display: 'block', marginBottom: primitiveSpacing[2] }}>Closure Gates</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: primitiveSpacing[2] }}>
              {closureGateState.gateResults.map((gate) => (
                <div key={gate.gate} style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[2] }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: primitiveRadii.full, background: gate.passed ? primitiveSignal.success : primitiveSignal.critical, display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontSize: primitiveTypeScale.body, color: tokens.text.secondary }}>{gate.gate}</span>
                  <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, marginLeft: 'auto' }}>{gate.reason}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: primitiveSpacing[2], display: 'flex', alignItems: 'center', gap: primitiveSpacing[2] }}>
              <span style={{ fontSize: primitiveTypeScale.caption, fontWeight: 600, color: closureGateState.allGatesPass ? primitiveSignal.success : primitiveSignal.warning }}>
                {closureGateState.allGatesPass ? '✓ All gates pass — eligible for closure' : '⚠ Gates pending — not eligible for closure'}
              </span>
            </div>
            <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, display: 'block', marginTop: primitiveSpacing[2], fontFamily: primitiveFonts.mono }}>
              Policy: {closureGateState.strategyRef.policyId} v{closureGateState.strategyRef.policyVersion}
            </span>
          </div>
        )}

        {/* 5. Assignment Rationale and Escalation Path (D4) */}
        {assignmentInfo && (
          <div data-testid="assignment-rationale" style={{ marginBottom: primitiveSpacing[4] }}>
            <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, display: 'block', marginBottom: primitiveSpacing[2] }}>Assignment</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: primitiveSpacing[3] }}>
              <div>
                <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, display: 'block' }}>Owner</span>
                <span style={{ fontSize: primitiveTypeScale.body, color: tokens.text.primary, fontWeight: 600 }}>{caseRecord.owner}</span>
              </div>
              <div>
                <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, display: 'block' }}>Team</span>
                <span style={{ fontSize: primitiveTypeScale.body, color: tokens.text.primary, fontWeight: 600 }}>{caseRecord.team}</span>
              </div>
            </div>
            <div style={{ marginTop: primitiveSpacing[2] }}>
              <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, display: 'block' }}>Escalation Path</span>
              <span style={{ fontSize: primitiveTypeScale.body, color: tokens.text.secondary }}>{assignmentInfo.escalationPath.join(' → ')}</span>
            </div>
          </div>
        )}

        {/* 6. Transition History Timeline */}
        <div data-testid="transition-history">
          <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, display: 'block', marginBottom: primitiveSpacing[2] }}>Transition History</span>
          {transitionHistory.map((txn, i) => (
            <div key={i} style={{ display: 'flex', gap: primitiveSpacing[3], padding: `${primitiveSpacing[2]} 0`, borderBottom: i < transitionHistory.length - 1 ? `1px solid ${tokens.border.subtle}` : 'none', alignItems: 'baseline' }}>
              <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, fontFamily: primitiveFonts.mono, minWidth: '140px', whiteSpace: 'nowrap' }}>
                {new Date(txn.timestamp).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}
              </span>
              <span style={{ fontSize: primitiveTypeScale.body, color: tokens.text.secondary }}>
                <span style={{ color: tokens.text.muted }}>{txn.from}</span> → <span style={{ fontWeight: 600, color: tokens.text.primary }}>{txn.to}</span>
              </span>
              <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted }}>{txn.actor}</span>
              <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, marginLeft: 'auto', fontFamily: primitiveFonts.mono }}>{txn.auditRef}</span>
            </div>
          ))}
          {transitionHistory.length === 0 && (
            <span style={{ fontSize: primitiveTypeScale.body, color: tokens.text.muted }}>No transitions recorded yet.</span>
          )}
        </div>
      </div>
    </section>
  );
}
