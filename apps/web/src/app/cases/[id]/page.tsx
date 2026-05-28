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
