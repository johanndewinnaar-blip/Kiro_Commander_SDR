'use client';

import { useMode } from '@/context/mode-context';
import { seedCases } from '../../../../../../packages/contracts/src/fixtures/seed-cases';
import { seedActions, seedSubActions } from '../../../../../../packages/contracts/src/fixtures/seed-actions';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import {
  primitiveBrand, primitiveFonts, primitiveTypeScale, primitiveLetterSpacing,
  primitiveSignal, primitiveSpacing, primitiveGlow, primitiveHud, primitiveFontWeight, primitivePriority,
} from '../../../../../../packages/ui/src/tokens/primitives';
import { resolveAllStrategies } from '../../../../../../packages/contracts/src/resolvers/case-strategy-resolver';
import { seedStrategies } from '../../../../../../packages/contracts/src/fixtures/seed-strategies';
import { NotImplemented } from '@/components/not-implemented';

/**
 * P0 Zero-Day War Room — Commander SDR (DS-1.0, Spec 06 / Spec 24)
 *
 * Emergency Command surface — legitimately forces Mission/HUD chrome (DS-1.0
 * §9.3). Renders ONLY real data: P0 cases from seedCases, their resolved
 * strategies, and the real Action/Sub-Action board (seed-actions).
 *
 * Membership, decision log and AI orientation have NO backing entity/fixture
 * (no WarRoom entity), so they are honest placeholders — not fabricated.
 */

const MS_PER_HOUR = 3_600_000;

const HUD = {
  bg: primitiveHud.bg0, panel: primitiveHud.bg2, elevated: primitiveHud.bg3,
  text: primitiveHud.text0, textSecondary: primitiveHud.text1, textMuted: primitiveHud.text2,
  line: primitiveHud.line2, lineSubtle: primitiveHud.line,
};

function titleCase(s: string): string {
  return s.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function P0WarRoomPage() {
  useMode(); // consumed; this surface forces Mission chrome per DS-1.0 §9.3.

  const now = Math.max(...seedCases.map((c) => new Date(c.updatedAt).getTime()));
  const p0Cases = seedCases.filter((c) => c.priority === 'P0');
  const p0Ids = new Set(p0Cases.map((c) => c.id));
  const boundSubActions = seedSubActions.filter((s) => p0Ids.has(s.caseId));

  return (
    <div style={{ background: HUD.bg, minHeight: '100%', color: HUD.text }}>
      <div className="container-xl" style={{ paddingTop: componentTokens.contentPadding, paddingBottom: componentTokens.contentPadding }}>

        {/* Emergency banner */}
        <div style={{
          padding: `${primitiveSpacing[3]} ${componentTokens.contentPadding}`,
          background: 'rgba(217,45,32,0.15)', border: `2px solid ${primitiveSignal.critical}`,
          marginBottom: componentTokens.gridGap, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: primitiveSpacing[3], boxShadow: `0 0 ${primitiveGlow.radius} rgba(217,45,32,${primitiveGlow.intensity})`,
        }} role="alert">
          <div style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[3] }}>
            <span style={{ color: primitiveSignal.critical, fontWeight: primitiveFontWeight.bold, fontSize: primitiveTypeScale.h2, fontFamily: primitiveFonts.display }}>◆ EMERGENCY COMMAND</span>
            <span style={{ fontSize: primitiveTypeScale.body }}>P0 Zero-Day active — {p0Cases.length} case{p0Cases.length !== 1 ? 's' : ''}</span>
          </div>
          <span style={{ fontSize: primitiveTypeScale.micro, color: HUD.textMuted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>War Room · ACTIVATED</span>
        </div>

        {/* AI-PLACEMENT: AI-WAR-ROOM-001 — Commander AI orientation briefing */}
        {/* AI-PLACEMENT: AI-WAR-ROOM-002 — Exploit deep-dive analysis */}

        {/* Bound P0 cases — REAL data + resolved strategies */}
        {p0Cases.map((c) => {
          const strat = resolveAllStrategies(c, seedStrategies);
          const slaHours = strat.sla.status === 'resolved' ? strat.sla.responseHours : c.sla.targetResolutionHours;
          const ageHours = (now - new Date(c.createdAt).getTime()) / MS_PER_HOUR;
          const remaining = (slaHours ?? 0) - ageHours;
          const breached = c.sla.breached || remaining <= 0;
          return (
            <div key={c.id} style={{
              padding: componentTokens.cardPadding, background: HUD.elevated,
              border: `1px solid ${primitiveSignal.critical}`, marginBottom: componentTokens.gridGap,
              boxShadow: `0 0 ${primitiveGlow.radius} rgba(217,45,32,${primitiveGlow.intensity})`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: primitiveSpacing[2] }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[2] }}>
                    <span style={{ color: primitiveSignal.critical, fontWeight: primitiveFontWeight.bold }}>{primitivePriority.p0.shape} {primitivePriority.p0.label}</span>
                    <span style={{ color: HUD.textSecondary, fontSize: primitiveTypeScale.caption, fontFamily: primitiveFonts.mono }}>{c.caseRef}</span>
                    <span style={{ fontSize: primitiveTypeScale.micro, padding: '1px 6px', border: `1px solid ${primitiveBrand.gold}`, color: primitiveBrand.gold }}>{c.surfaceAttribution === 'external_attack_surface' ? 'External' : 'Internal'}</span>
                  </div>
                  <h2 style={{ margin: `${primitiveSpacing[2]} 0 0`, fontSize: primitiveTypeScale.h3, fontWeight: primitiveFontWeight.bold, color: HUD.text }}>{c.title}</h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: primitiveTypeScale.micro, color: HUD.textMuted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>SLA</span>
                  <span style={{ fontFamily: primitiveFonts.mono, fontSize: primitiveTypeScale.h3, fontWeight: primitiveFontWeight.bold, color: breached ? primitiveSignal.critical : primitiveSignal.warning }}>{breached ? 'BREACHED' : `${Math.round(remaining)}h left`}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: componentTokens.gridGap, marginTop: primitiveSpacing[3] }}>
                <Field label="Owner" value={c.owner} />
                <Field label="Team" value={c.team} />
                <Field label="SLA target" value={slaHours !== null ? `${slaHours}h` : '—'} alert />
                <Field label="Status" value={titleCase(c.status)} />
              </div>

              {strat.routing.status === 'resolved' && (
                <div style={{ marginTop: primitiveSpacing[2], fontSize: primitiveTypeScale.micro, color: HUD.textMuted }}>
                  Escalation: {(strat.routing.escalationPath ?? []).join(' → ') || '—'}
                </div>
              )}

              <div style={{ marginTop: primitiveSpacing[3], padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, background: HUD.panel, border: `1px solid ${HUD.lineSubtle}` }}>
                <span style={{ fontSize: primitiveTypeScale.micro, color: HUD.textMuted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Routing Rationale</span>
                <p style={{ margin: `${primitiveSpacing[1]} 0 0`, fontSize: primitiveTypeScale.caption, color: HUD.textSecondary, lineHeight: 1.43 }}>{c.routingRationale}</p>
              </div>
            </div>
          );
        })}

        {p0Cases.length === 0 && (
          <div style={{ padding: componentTokens.cardPadding, background: HUD.panel, border: `1px solid ${HUD.line}`, textAlign: 'center', marginBottom: componentTokens.gridGap }}>
            <p style={{ color: HUD.textMuted, fontSize: primitiveTypeScale.body }}>No active P0 conditions. War Room is clear.</p>
          </div>
        )}

        {/* Sub-action board — REAL data (bound to P0 cases) */}
        <Panel title={`Sub-Action Board (${boundSubActions.length})`} subtitle="Real remediation steps across bound P0 cases (seed-actions)">
          {boundSubActions.length === 0 ? (
            <p style={{ margin: 0, color: HUD.textMuted, fontSize: primitiveTypeScale.caption }}>No sub-actions on bound P0 cases.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.caption }}>
              <thead><tr>{['#', 'Method', 'D3FEND', 'Owner', 'Outcome', 'Effort'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: `${primitiveSpacing[1]} ${primitiveSpacing[2]}`, borderBottom: `1px solid ${HUD.line}`, color: HUD.textMuted, fontSize: primitiveTypeScale.micro, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{h}</th>
              ))}</tr></thead>
              <tbody>
                {boundSubActions.sort((a, b) => a.sequenceOrder - b.sequenceOrder).map((s) => (
                  <tr key={s.id} style={{ borderBottom: `1px solid ${HUD.lineSubtle}` }}>
                    <td style={{ padding: primitiveSpacing[2], fontFamily: primitiveFonts.mono, color: HUD.textMuted }}>{s.sequenceOrder}</td>
                    <td style={{ padding: primitiveSpacing[2], color: HUD.text }}>{s.executionMethod}</td>
                    <td style={{ padding: primitiveSpacing[2] }}><span style={{ fontSize: primitiveTypeScale.micro, padding: '1px 6px', background: primitiveSignal.info, color: '#fff', textTransform: 'uppercase' }}>{s.tacticType}</span></td>
                    <td style={{ padding: primitiveSpacing[2], color: HUD.textSecondary }}>{s.owner}</td>
                    <td style={{ padding: primitiveSpacing[2], color: HUD.textSecondary }}>{titleCase(s.outcomeClassification)}</td>
                    <td style={{ padding: primitiveSpacing[2], fontFamily: primitiveFonts.mono, color: HUD.textMuted }}>{s.actualEffortHours}/{s.estimatedEffortHours}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Panel>

        {/* Placeholders — no WarRoom entity exists */}
        <div style={{ marginBottom: componentTokens.gridGap }}>
          <NotImplemented title="War Room Membership" requires="WarRoom membership entity + seed fixture (Spec 24 — no contract yet)" hud={HUD} />
        </div>
        <div style={{ marginBottom: componentTokens.gridGap }}>
          <NotImplemented title="Decision Log" requires="war-room decision-event entity + seed fixture (Spec 24 — no contract yet)" hud={HUD} />
        </div>
        <div>
          <NotImplemented title="Communication Cadence & Bridge Posts" requires="war-room communication entity + seed fixture (Spec 24/25 — no contract yet)" hud={HUD} />
        </div>
      </div>
    </div>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: componentTokens.cardPadding, background: HUD.elevated, border: `1px solid ${HUD.line}`, marginBottom: componentTokens.gridGap }}>
      <div style={{ marginBottom: componentTokens.cardHeaderMargin }}>
        <h3 style={{ margin: 0, fontSize: primitiveTypeScale.h4, fontWeight: primitiveFontWeight.semibold, color: HUD.text, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{title}</h3>
        {subtitle && <span style={{ fontSize: primitiveTypeScale.micro, color: HUD.textMuted }}>{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, alert }: { label: string; value: string; alert?: boolean }) {
  return (
    <div>
      <span style={{ display: 'block', fontSize: primitiveTypeScale.micro, color: HUD.textMuted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{label}</span>
      <span style={{ fontSize: primitiveTypeScale.caption, fontWeight: primitiveFontWeight.semibold, color: alert ? primitiveSignal.critical : HUD.text, fontFamily: primitiveFonts.mono }}>{value}</span>
    </div>
  );
}
