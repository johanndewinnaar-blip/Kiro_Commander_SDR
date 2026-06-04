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

/**
 * P0 Zero-Day War Room — Commander SDR (DS-1.0, Spec 06 / Spec 24)
 *
 * Emergency Command surface — forces Mission/HUD chrome (DS-1.0 §9.3) regardless
 * of the workspace toggle. Enhanced for full review: bound P0 cases shown with
 * full context inline (Pattern A), membership, decision log, communication
 * cadence, per-case SLA countdown + routing rationale, and a cross-case
 * sub-action board.
 *
 * Doctrine: P0 propagates reason/scope/owner/expiry/evidence (Assertion 2);
 * no manual case creation/closure (Assertion 1); SOC read-only (Assertion 3).
 * AI orientation is AI-only — placement markers only.
 */

const MS_PER_HOUR = 3_600_000;

function titleCase(s: string): string {
  return s.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function P0WarRoomPage() {
  useMode(); // consumes context; this surface forces Mission chrome regardless.

  const surface = {
    bg: primitiveHud.bg0, panel: primitiveHud.bg2, elevated: primitiveHud.bg3,
    text: primitiveHud.text0, textSecondary: primitiveHud.text1, textMuted: primitiveHud.text2,
    line: primitiveHud.line2, lineSubtle: primitiveHud.line,
  };

  const now = Math.max(...seedCases.map((c) => new Date(c.updatedAt).getTime()));
  const p0Cases = seedCases.filter((c) => c.priority === 'P0');
  const p0Ids = new Set(p0Cases.map((c) => c.id));

  // Actions/sub-actions across all bound P0 cases
  const boundActions = seedActions.filter((a) => p0Ids.has(a.caseId));
  const boundSubActions = seedSubActions.filter((s) => p0Ids.has(s.caseId));

  // War Room activation reference time = earliest P0 case creation
  const activatedAt = p0Cases.length ? Math.min(...p0Cases.map((c) => new Date(c.createdAt).getTime())) : now;
  const activeHours = Math.max(0, (now - activatedAt) / MS_PER_HOUR);

  // Mock membership + decision log (review scaffolding)
  const members = [
    { name: 'CISO', role: 'Commander', joined: '06:05', ack: true },
    { name: 'Security Operations Manager', role: 'Deputy', joined: '06:07', ack: true },
    { name: 'Alice Security-Analyst', role: 'Lead Analyst', joined: '06:12', ack: true },
    { name: 'Diana Platform-Eng', role: 'Remediation', joined: '06:18', ack: false },
    { name: 'Eve Threat-Intel', role: 'Intelligence', joined: '06:25', ack: true },
  ];
  const decisions = [
    { time: '06:10', actor: 'CISO', text: 'War Room activated for P0 zero-day condition. Emergency Command engaged.' },
    { time: '06:22', actor: 'SOM', text: 'Approved network isolation of PROD-WEB-01 to contain active exploitation.' },
    { time: '06:40', actor: 'Diana Platform-Eng', text: 'Emergency patch staged; change window waived under P0 authority.' },
    { time: '07:05', actor: 'CISO', text: 'External comms hold confirmed pending containment verification.' },
  ];

  return (
    <div style={{ background: surface.bg, minHeight: '100%', color: surface.text }}>
      <div className="container-xl" style={{ paddingTop: componentTokens.contentPadding, paddingBottom: componentTokens.contentPadding }}>

        {/* Emergency banner + activation counter */}
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
          <div style={{ textAlign: 'right' }}>
            <span style={{ display: 'block', fontSize: primitiveTypeScale.micro, color: surface.textMuted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>War Room · ACTIVATED</span>
            <span style={{ fontFamily: primitiveFonts.mono, fontWeight: primitiveFontWeight.bold, fontSize: primitiveTypeScale.h3, color: primitiveBrand.gold }}>{Math.floor(activeHours)}h {Math.round((activeHours % 1) * 60)}m</span>
          </div>
        </div>

        {/* AI-PLACEMENT: AI-WAR-ROOM-001 — Commander AI orientation briefing */}
        {/* AI-PLACEMENT: AI-WAR-ROOM-002 — Exploit deep-dive analysis */}

        {/* Cadence + membership row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: componentTokens.gridGap, marginBottom: componentTokens.gridGap }}>
          <Panel surface={surface} title="Communication Cadence">
            <div style={{ display: 'flex', flexDirection: 'column', gap: primitiveSpacing[2] }}>
              <Row label="Next update due" value="in 45 min" surface={surface} accent={primitiveBrand.gold} />
              <Row label="Cadence" value="Every 60 min (P0)" surface={surface} />
              <Row label="Last bridge post" value="07:05" surface={surface} />
              <Row label="Channel" value="#security-management" surface={surface} mono />
            </div>
          </Panel>

          <Panel surface={surface} title={`Membership (${members.length})`}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.caption }}>
              <thead><tr>{['Member', 'Role', 'Joined', 'Ack'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: `${primitiveSpacing[1]} ${primitiveSpacing[2]}`, borderBottom: `1px solid ${surface.line}`, color: surface.textMuted, fontSize: primitiveTypeScale.micro, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{h}</th>
              ))}</tr></thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.name} style={{ borderBottom: `1px solid ${surface.lineSubtle}` }}>
                    <td style={{ padding: primitiveSpacing[2], color: surface.text }}>{m.name}</td>
                    <td style={{ padding: primitiveSpacing[2], color: surface.textSecondary }}>{m.role}</td>
                    <td style={{ padding: primitiveSpacing[2], color: surface.textMuted, fontFamily: primitiveFonts.mono }}>{m.joined}</td>
                    <td style={{ padding: primitiveSpacing[2] }}>
                      <span style={{ fontSize: primitiveTypeScale.micro, padding: '1px 6px', background: m.ack ? primitiveSignal.success : primitiveSignal.warning, color: '#fff' }}>{m.ack ? 'ACK' : 'PENDING'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>

        {/* Bound P0 cases — full context inline */}
        {p0Cases.map((c) => {
          const strat = resolveAllStrategies(c, seedStrategies);
          const slaHours = strat.sla.status === 'resolved' ? strat.sla.responseHours : c.sla.targetResolutionHours;
          const ageHours = (now - new Date(c.createdAt).getTime()) / MS_PER_HOUR;
          const remaining = (slaHours ?? 0) - ageHours;
          const breached = c.sla.breached || remaining <= 0;
          return (
            <div key={c.id} style={{
              padding: componentTokens.cardPadding, background: surface.elevated,
              border: `1px solid ${primitiveSignal.critical}`, marginBottom: componentTokens.gridGap,
              boxShadow: `0 0 ${primitiveGlow.radius} rgba(217,45,32,${primitiveGlow.intensity})`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: primitiveSpacing[2] }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[2] }}>
                    <span style={{ color: primitiveSignal.critical, fontWeight: primitiveFontWeight.bold }}>{primitivePriority.p0.shape} {primitivePriority.p0.label}</span>
                    <span style={{ color: surface.textSecondary, fontSize: primitiveTypeScale.caption, fontFamily: primitiveFonts.mono }}>{c.caseRef}</span>
                    <span style={{ fontSize: primitiveTypeScale.micro, padding: '1px 6px', border: `1px solid ${primitiveBrand.gold}`, color: primitiveBrand.gold }}>{c.surfaceAttribution === 'external_attack_surface' ? 'External' : 'Internal'}</span>
                  </div>
                  <h2 style={{ margin: `${primitiveSpacing[2]} 0 0`, fontSize: primitiveTypeScale.h3, fontWeight: primitiveFontWeight.bold, color: surface.text }}>{c.title}</h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: primitiveTypeScale.micro, color: surface.textMuted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>SLA</span>
                  <span style={{ fontFamily: primitiveFonts.mono, fontSize: primitiveTypeScale.h3, fontWeight: primitiveFontWeight.bold, color: breached ? primitiveSignal.critical : primitiveSignal.warning }}>{breached ? 'BREACHED' : `${Math.round(remaining)}h left`}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: componentTokens.gridGap, marginTop: primitiveSpacing[3] }}>
                <Field label="Owner" value={c.owner} surface={surface} />
                <Field label="Team" value={c.team} surface={surface} />
                <Field label="SLA target" value={slaHours !== null ? `${slaHours}h` : '—'} surface={surface} alert />
                <Field label="Status" value={titleCase(c.status)} surface={surface} />
              </div>

              <div style={{ marginTop: primitiveSpacing[3], padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, background: surface.panel, border: `1px solid ${surface.lineSubtle}` }}>
                <span style={{ fontSize: primitiveTypeScale.micro, color: surface.textMuted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Routing Rationale</span>
                <p style={{ margin: `${primitiveSpacing[1]} 0 0`, fontSize: primitiveTypeScale.caption, color: surface.textSecondary, lineHeight: 1.43 }}>{c.routingRationale}</p>
              </div>
            </div>
          );
        })}

        {/* Sub-action board across bound cases */}
        <Panel surface={surface} title={`Sub-Action Board (${boundSubActions.length})`} subtitle="All remediation steps across bound P0 cases">
          {boundSubActions.length === 0 ? (
            <p style={{ margin: 0, color: surface.textMuted, fontSize: primitiveTypeScale.caption }}>No sub-actions on bound P0 cases.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.caption }}>
              <thead><tr>{['#', 'Method', 'D3FEND', 'Owner', 'Outcome', 'Effort'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: `${primitiveSpacing[1]} ${primitiveSpacing[2]}`, borderBottom: `1px solid ${surface.line}`, color: surface.textMuted, fontSize: primitiveTypeScale.micro, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{h}</th>
              ))}</tr></thead>
              <tbody>
                {boundSubActions.sort((a, b) => a.sequenceOrder - b.sequenceOrder).map((s) => (
                  <tr key={s.id} style={{ borderBottom: `1px solid ${surface.lineSubtle}` }}>
                    <td style={{ padding: primitiveSpacing[2], fontFamily: primitiveFonts.mono, color: surface.textMuted }}>{s.sequenceOrder}</td>
                    <td style={{ padding: primitiveSpacing[2], color: surface.text }}>{s.executionMethod}</td>
                    <td style={{ padding: primitiveSpacing[2] }}><span style={{ fontSize: primitiveTypeScale.micro, padding: '1px 6px', background: primitiveSignal.info, color: '#fff', textTransform: 'uppercase' }}>{s.tacticType}</span></td>
                    <td style={{ padding: primitiveSpacing[2], color: surface.textSecondary }}>{s.owner}</td>
                    <td style={{ padding: primitiveSpacing[2], color: surface.textSecondary }}>{titleCase(s.outcomeClassification)}</td>
                    <td style={{ padding: primitiveSpacing[2], fontFamily: primitiveFonts.mono, color: surface.textMuted }}>{s.actualEffortHours}/{s.estimatedEffortHours}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Panel>

        {/* Decision log */}
        <Panel surface={surface} title="Decision Log" subtitle="Chronological decisions made during this War Room">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {decisions.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: primitiveSpacing[3], padding: `${primitiveSpacing[2]} 0`, borderBottom: i < decisions.length - 1 ? `1px solid ${surface.lineSubtle}` : 'none', alignItems: 'baseline' }}>
                <span style={{ fontFamily: primitiveFonts.mono, fontSize: primitiveTypeScale.micro, color: surface.textMuted, minWidth: 48 }}>{d.time}</span>
                <span style={{ fontSize: primitiveTypeScale.caption, color: surface.text, flex: 1 }}>{d.text}</span>
                <span style={{ fontSize: primitiveTypeScale.micro, color: surface.textMuted }}>{d.actor}</span>
              </div>
            ))}
          </div>
        </Panel>

        {p0Cases.length === 0 && (
          <div style={{ padding: componentTokens.cardPadding, background: surface.panel, border: `1px solid ${surface.line}`, textAlign: 'center' }}>
            <p style={{ color: surface.textMuted, fontSize: primitiveTypeScale.body }}>No active P0 conditions. War Room is clear.</p>
          </div>
        )}
      </div>
    </div>
  );
}

type Surface = { bg: string; panel: string; elevated: string; text: string; textSecondary: string; textMuted: string; line: string; lineSubtle: string };

function Panel({ surface, title, subtitle, children }: { surface: Surface; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: componentTokens.cardPadding, background: surface.elevated, border: `1px solid ${surface.line}`, marginBottom: componentTokens.gridGap }}>
      <div style={{ marginBottom: componentTokens.cardHeaderMargin }}>
        <h3 style={{ margin: 0, fontSize: primitiveTypeScale.h4, fontWeight: primitiveFontWeight.semibold, color: surface.text, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{title}</h3>
        {subtitle && <span style={{ fontSize: primitiveTypeScale.micro, color: surface.textMuted }}>{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

function Row({ label, value, surface, accent, mono }: { label: string; value: string; surface: Surface; accent?: string; mono?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <span style={{ fontSize: primitiveTypeScale.micro, color: surface.textMuted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{label}</span>
      <span style={{ fontSize: primitiveTypeScale.caption, color: accent ?? surface.text, fontFamily: mono ? primitiveFonts.mono : primitiveFonts.body }}>{value}</span>
    </div>
  );
}

function Field({ label, value, surface, alert }: { label: string; value: string; surface: Surface; alert?: boolean }) {
  return (
    <div>
      <span style={{ display: 'block', fontSize: primitiveTypeScale.micro, color: surface.textMuted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{label}</span>
      <span style={{ fontSize: primitiveTypeScale.caption, fontWeight: primitiveFontWeight.semibold, color: alert ? primitiveSignal.critical : surface.text, fontFamily: primitiveFonts.mono }}>{value}</span>
    </div>
  );
}
