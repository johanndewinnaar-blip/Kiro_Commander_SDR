'use client';

import { useMode } from '@/context/mode-context';
import { seedCases } from '../../../../../../packages/contracts/src/fixtures/seed-cases';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import { primitiveBrand, primitiveFonts, primitiveTypeScale, primitiveLetterSpacing, primitiveSignal, primitiveSpacing, primitiveGlow, primitiveHud } from '../../../../../../packages/ui/src/tokens/primitives';
import { primitivePriority } from '../../../../../../packages/ui/src/tokens/primitives';
import { resolveAllStrategies } from '../../../../../../packages/contracts/src/resolvers/case-strategy-resolver';
import { seedStrategies } from '../../../../../../packages/contracts/src/fixtures/seed-strategies';

/**
 * P0 Zero-Day War Room — Commander SDR (DS-1.0, Spec 06 Phase C3a)
 *
 * Source: Spec 06, Route Registry (path: /war-room/p0)
 * Mockup: case-handling-dashboard.png (P0 section), command-centre-mission.png (Emergency Command)
 * DS-1.0 §9.3: Emergency Command = Mission mode elevated intensity.
 *   Forces Mission regardless of toggle.
 *   Larger alert prominence, P0 critical signalling foregrounded, denser real-time layout.
 *
 * Doctrinal constraints:
 * - P0 propagates reason, scope, owner, expiry/review, evidence (Assertion 2)
 * - Emergency Command forces Mission mode (§9.3)
 * - No manual case creation or closure (Assertion 1)
 * - SOC boundary: read-only (Assertion 3)
 */

export default function P0WarRoomPage() {
  // Emergency Command FORCES Mission mode regardless of toggle (DS-1.0 §9.3)
  const { tokens: _unused } = useMode();

  // Always use Mission/Emergency tokens for this surface
  const surface = {
    bg: primitiveHud.bg0,
    panel: primitiveHud.bg2,
    elevated: primitiveHud.bg3,
    text: primitiveHud.text0,
    textSecondary: primitiveHud.text1,
    textMuted: primitiveHud.text2,
    line: primitiveHud.line2,
    lineSubtle: primitiveHud.line,
  };

  const p0Cases = seedCases.filter((c) => c.priority === 'P0');
  const p0WithStrategy = p0Cases.map((c) => ({
    ...c,
    strategy: resolveAllStrategies(c, seedStrategies),
  }));

  return (
    <div style={{ background: surface.bg, minHeight: '100%', padding: componentTokens.contentPadding, color: surface.text }}>
      {/* Emergency Command Banner */}
      <div style={{
        padding: `${primitiveSpacing[3]} ${componentTokens.contentPadding}`,
        background: 'rgba(217,45,32,0.15)',
        border: `2px solid ${primitiveSignal.critical}`,
        borderRadius: componentTokens.cardRadius,
        marginBottom: componentTokens.gridGap,
        display: 'flex', alignItems: 'center', gap: primitiveSpacing[3],
        boxShadow: `0 0 ${primitiveGlow.radius} rgba(217,45,32,${primitiveGlow.intensity})`,
      }} role="alert" aria-label="Emergency Command active">
        <span style={{ color: primitiveSignal.critical, fontWeight: 700, fontSize: primitiveTypeScale.h2, fontFamily: primitiveFonts.display }}>◆ EMERGENCY COMMAND</span>
        <span style={{ color: surface.text, fontSize: primitiveTypeScale.body }}>P0 Zero-Day condition active — {p0Cases.length} case{p0Cases.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Page Header */}
      <section style={{ marginBottom: componentTokens.gridGap }}>
        <small style={{ color: surface.textMuted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.display, fontSize: primitiveTypeScale.micro }}>War Room › P0 Zero-Day</small>
        <h1 style={{ margin: '4px 0 0', fontSize: primitiveTypeScale.h1, fontWeight: 700, color: surface.text, fontFamily: primitiveFonts.body }}>P0 War Room</h1>
      </section>

      {/* P0 Cases — each with full propagation: reason, scope, owner, expiry/review, evidence */}
      {p0WithStrategy.map((c) => {
        const slaHours = c.strategy.sla.status === 'resolved' ? c.strategy.sla.responseHours : null;
        return (
          <div key={c.id} style={{
            padding: componentTokens.cardPadding,
            background: surface.elevated,
            border: `1px solid ${primitiveSignal.critical}`,
            borderRadius: componentTokens.cardRadius,
            marginBottom: componentTokens.gridGap,
            boxShadow: `0 0 ${primitiveGlow.radius} rgba(217,45,32,${primitiveGlow.intensity})`,
          }}>
            {/* Case header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: primitiveSpacing[3] }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[2] }}>
                <span style={{ color: primitiveSignal.critical, fontWeight: 700, fontSize: primitiveTypeScale.body }}>{primitivePriority.p0.shape} {primitivePriority.p0.label}</span>
                <span style={{ color: surface.textSecondary, fontSize: primitiveTypeScale.caption, fontFamily: primitiveFonts.mono }}>{c.caseRef}</span>
              </div>
              <span style={{ fontSize: primitiveTypeScale.micro, padding: '2px 6px', border: `1px solid ${primitiveBrand.gold}`, borderRadius: '4px', color: primitiveBrand.gold }}>
                {c.surfaceAttribution === 'external_attack_surface' ? 'External' : 'Internal'}
              </span>
            </div>

            {/* Title (reason) */}
            <h2 style={{ margin: `0 0 ${primitiveSpacing[3]}`, fontSize: primitiveTypeScale.h2, fontWeight: 700, color: surface.text }}>{c.title}</h2>

            {/* P0 Propagation: scope, owner, expiry/review, evidence (Assertion 2) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: componentTokens.gridGap }}>
              <PropField label="Owner" value={c.owner} surface={surface} />
              <PropField label="Team" value={c.team} surface={surface} />
              <PropField label="SLA" value={slaHours !== null ? `${slaHours}h response` : 'Unresolved'} surface={surface} isAlert />
              <PropField label="Status" value={c.status} surface={surface} />
            </div>

            {/* Routing rationale */}
            <div style={{ marginTop: primitiveSpacing[3], padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, background: surface.panel, borderRadius: '4px', border: `1px solid ${surface.lineSubtle}` }}>
              <span style={{ fontSize: primitiveTypeScale.caption, color: surface.textMuted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Routing Rationale</span>
              <p style={{ margin: `${primitiveSpacing[1]} 0 0`, fontSize: primitiveTypeScale.body, color: surface.textSecondary, lineHeight: '1.45' }}>{c.routingRationale}</p>
            </div>
          </div>
        );
      })}

      {p0Cases.length === 0 && (
        <div style={{ padding: componentTokens.cardPadding, background: surface.panel, borderRadius: componentTokens.cardRadius, border: `1px solid ${surface.line}`, textAlign: 'center' }}>
          <p style={{ color: surface.textMuted, fontSize: primitiveTypeScale.body }}>No active P0 conditions. War Room is clear.</p>
        </div>
      )}
    </div>
  );
}

function PropField({ label, value, surface, isAlert }: { label: string; value: string; surface: any; isAlert?: boolean }) {
  return (
    <div>
      <span style={{ fontSize: primitiveTypeScale.micro, color: surface.textMuted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, display: 'block' }}>{label}</span>
      <span style={{ fontSize: primitiveTypeScale.body, fontWeight: 600, color: isAlert ? primitiveSignal.critical : surface.text, fontFamily: primitiveFonts.mono }}>{value}</span>
    </div>
  );
}
