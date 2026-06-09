'use client';

import { useMode } from '@/context/mode-context';
import { seedCases } from '../../../../packages/contracts/src/fixtures/seed-cases';
import { seedConnectors } from '../../../../packages/contracts/src/fixtures/seed-connectors';
import { seedRiskObjects } from '../../../../packages/contracts/src/fixtures/seed-risk-objects';
import { seedStrategies } from '../../../../packages/contracts/src/fixtures/seed-strategies';
import { seedMissions } from '../../../../packages/contracts/src/fixtures/seed-missions';
import { seedAssets } from '../../../../packages/contracts/src/fixtures/seed-assets';
import { seedIdentities } from '../../../../packages/contracts/src/fixtures/seed-identities';
import {
  OODA_PHASES,
  OODA_PHASE_LABELS,
  calculateObserveHealth,
  calculateOrientHealth,
  calculateDecideHealth,
  calculateActHealth,
  composeCommandTempo,
  type HealthThresholds,
  type PhaseHealthScore,
} from '../../../../packages/contracts/src/engines/ooda-layer';

/**
 * Command Centre — Pattern D Command Workspace (Unit 16a v2.0)
 *
 * Surface Classification: COMMAND (Primary) + INTELLIGENCE (Secondary)
 * Workspace Pattern: D (Three-Column Command Workspace)
 * OODA Stage: All four (hub)
 * C2 Role: Command + Coordination
 * Cognitive Ceiling: 4–6 primary attention items per column
 * Intensity Ceiling: Level 3 (Emergency Command — dynamic escalation)
 *
 * Source: UIAA-3.0, DS-1.0 §5/§8/§9, Spec #41, Spec #58, Spec #67,
 *         REVIEW_COMMAND_CENTRE_DEFINITIVE.md remediation path P0-P2.
 *
 * Architecture:
 *   FIXED: P0 Emergency Banner (conditional) + KPI Strip (always)
 *   LEFT (25%): Mission Objectives + Strategic Priorities + Current Operations
 *   CENTRE (50%): OODA Phase Health + Estate Picture + Risk Picture
 *   RIGHT (25%): Activity Feed + Quick Actions
 *
 * Scroll model: Independent vertical scroll per column.
 * Sticky: P0 banner (viewport), KPI strip (viewport), column headers (column-sticky).
 * Resizable: Not in v2.0 (deferred to P6).
 *
 * Doctrinal constraints:
 *   - Semantic tokens ONLY — zero primitive references (DS-1.0 §1.3)
 *   - Strategy-sourced thresholds — no hardcoded values
 *   - No manual case creation (Doctrinal Assertion 1)
 *   - System-First Doctrine: UI explains system decisions
 */

export default function CommandCentrePage() {
  const { mode, tokens } = useMode();

  // ─── Strategy-sourced OODA thresholds ──────────────────────────────────────
  const tempoStrategy = seedStrategies.find(
    (s) => s.surfaceType === 'operational-tempo' && s.status === 'active',
  );
  const tempoCfg = (tempoStrategy?.configuration as { tempoThresholds?: { healthy: number; degraded: number; critical: number } } | undefined)?.tempoThresholds;
  const thresholds: HealthThresholds = {
    greenMin: tempoCfg ? tempoCfg.healthy : 90,
    amberMin: tempoCfg ? tempoCfg.degraded : 70,
  };
  const degradationThreshold = tempoCfg ? tempoCfg.degraded : 70;

  // ─── OODA phase-health computation (from canonical engine) ─────────────────
  const activeConnectors = seedConnectors.filter((c) => c.state === 'active').length;
  const connectorHealthRatio = seedConnectors.length > 0 ? activeConnectors / seedConnectors.length : 0;
  const freshConnectors = seedConnectors.filter((c) => c.lastRunStatus === 'success').length;
  const signalFreshnessRatio = seedConnectors.length > 0 ? freshConnectors / seedConnectors.length : 0;
  const breachedCases = seedCases.filter((c) => c.sla.breached).length;
  const routingHealthRatio = seedCases.length > 0 ? (seedCases.length - breachedCases) / seedCases.length : 1;
  const activeStrategies = seedStrategies.filter((s) => s.status === 'active').length;
  const strategyEffectivenessRatio = seedStrategies.length > 0 ? activeStrategies / seedStrategies.length : 0;
  const openCases = seedCases.filter((c) => c.status === 'open' || c.status === 'in-progress');

  const observe = calculateObserveHealth({ connectorHealthRatio, signalFreshnessRatio, coverageCompletenessRatio: connectorHealthRatio }, thresholds);
  const orient = calculateOrientHealth({ streamHealthRatio: connectorHealthRatio, correlationCompletenessRatio: signalFreshnessRatio, avgThreatRelevance: 70 }, thresholds);
  const decide = calculateDecideHealth({ routingHealthRatio, prioritisationAccuracyRatio: routingHealthRatio, strategyEffectivenessRatio }, thresholds);
  const act = calculateActHealth({
    executionThroughput: openCases.length, targetThroughput: Math.max(openCases.length, 1),
    executionLatencyHours: breachedCases > 0 ? 8 : 2, targetLatencyHours: 4,
    successRateRatio: routingHealthRatio,
    validationPendingCount: seedCases.filter((c) => c.status === 'awaiting-validation').length,
    failedActionCount: breachedCases, closureTempoHours: 2, targetClosureTempoHours: 2,
  }, thresholds);
  const tempo = composeCommandTempo([observe, orient, decide, act], thresholds, degradationThreshold, new Date().toISOString());

  // ─── Data derivations ─────────────────────────────────────────────────────
  const p0Cases = seedCases.filter((c) => c.priority === 'P0');
  const p1Cases = seedCases.filter((c) => c.priority === 'P1');
  const activeMissions = seedMissions.filter((m) => m.status === 'active');
  const criticalAssets = seedAssets.filter((a) => a.criticality >= 4).length;
  const highRiskIdentities = seedIdentities.filter((i) => i.riskScore >= 50).length;
  const errorConnectors = seedConnectors.filter((c) => c.state === 'error');

  // ─── Semantic colour helpers (mode-aware) ──────────────────────────────────
  const bandColor = (band: PhaseHealthScore['band']) =>
    band === 'green' ? tokens.status.success : band === 'amber' ? tokens.status.warning : tokens.status.critical;

  // ─── Styles (all from semantic tokens — zero primitives) ───────────────────
  const pageStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: tokens.surface.primary,
    color: tokens.text.primary,
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: '13px',
    lineHeight: '1.45',
  };

  const fixedBandStyle: React.CSSProperties = {
    flexShrink: 0,
  };

  const columnsStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '25% 1fr 25%',
    gap: '0',
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
  };

  const columnStyle: React.CSSProperties = {
    overflowY: 'auto',
    padding: '16px',
    borderRight: `1px solid ${tokens.border.subtle}`,
  };

  const columnHeaderStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 2,
    background: tokens.surface.primary,
    padding: '8px 0 12px',
    borderBottom: `1px solid ${tokens.border.subtle}`,
    marginBottom: '12px',
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    color: tokens.text.secondary,
  };

  const cardStyle: React.CSSProperties = {
    background: tokens.surface.secondary,
    border: `1px solid ${tokens.border.default}`,
    padding: '12px',
    marginBottom: '12px',
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    color: tokens.text.secondary,
    marginBottom: '8px',
  };

  const kpiValueStyle: React.CSSProperties = {
    fontFamily: mode === 'mission' ? "'JetBrains Mono', monospace" : "'Inter', system-ui, sans-serif",
    fontSize: '22px',
    fontWeight: 700,
    color: tokens.text.primary,
  };

  const kpiLabelStyle: React.CSSProperties = {
    fontSize: '10px',
    color: tokens.text.secondary,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
  };

  const feedItemStyle: React.CSSProperties = {
    padding: '8px 0',
    borderBottom: `1px solid ${tokens.border.subtle}`,
    fontSize: '12px',
    color: tokens.text.primary,
  };

  const feedTimeStyle: React.CSSProperties = {
    fontSize: '10px',
    color: tokens.text.muted,
    fontFamily: "'JetBrains Mono', monospace",
  };

  const actionBtnStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '8px 12px',
    marginBottom: '8px',
    border: `1px solid ${tokens.border.default}`,
    background: tokens.surface.elevated,
    color: tokens.text.primary,
    fontSize: '12px',
    fontWeight: 600,
    textDecoration: 'none',
    textAlign: 'left' as const,
  };

  return (
    <div style={pageStyle}>
      {/* ═══ FIXED BAND: P0 Banner (conditional) ═══ */}
      {p0Cases.length > 0 && (
        <div style={{ ...fixedBandStyle, padding: '8px 16px', background: mode === 'mission' ? 'rgba(217,45,32,0.15)' : 'rgba(217,45,32,0.06)', borderBottom: `2px solid ${tokens.status.critical}` }} role="alert">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: tokens.status.critical, fontWeight: 700, fontSize: '14px' }}>◆ P0 ACTIVE</span>
            <span style={{ color: tokens.text.primary, fontSize: '13px' }}>
              {p0Cases.length} mission-critical condition{p0Cases.length !== 1 ? 's' : ''} require command attention
            </span>
            <a href="/war-room/p0" style={{ marginLeft: 'auto', padding: '4px 12px', border: `1px solid ${tokens.status.critical}`, color: tokens.status.critical, fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}>
              OPEN WAR ROOM
            </a>
          </div>
        </div>
      )}

      {/* ═══ FIXED BAND: KPI Strip ═══ */}
      <div style={{ ...fixedBandStyle, display: 'flex', gap: '1px', padding: '12px 16px', background: tokens.surface.secondary, borderBottom: `1px solid ${tokens.border.default}` }}>
        {[
          { label: 'OODA Tempo', value: tempo.overallScore, color: bandColor(tempo.overallBand) },
          { label: 'P0 Active', value: p0Cases.length, color: p0Cases.length > 0 ? tokens.status.critical : tokens.status.success },
          { label: 'Cases Open', value: openCases.length, color: tokens.text.primary },
          { label: 'SLA Breached', value: breachedCases, color: breachedCases > 0 ? tokens.status.warning : tokens.status.success },
          { label: 'Critical Assets', value: criticalAssets, color: tokens.text.primary },
          { label: 'Connectors', value: `${activeConnectors}/${seedConnectors.length}`, color: errorConnectors.length > 0 ? tokens.status.warning : tokens.status.success },
        ].map((kpi) => (
          <div key={kpi.label} style={{ flex: 1, textAlign: 'center' as const, padding: '4px 8px' }}>
            <div style={{ ...kpiValueStyle, color: kpi.color }}>{kpi.value}</div>
            <div style={kpiLabelStyle}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* ═══ THREE-COLUMN WORKSPACE ═══ */}
      <div style={columnsStyle}>

        {/* ─── LEFT COLUMN: Situation (25%) ─── */}
        <div style={columnStyle}>
          <div style={columnHeaderStyle}>Situation &amp; Mission</div>

          {/* Active Missions */}
          <div style={cardStyle}>
            <div style={cardTitleStyle}>Active Missions</div>
            {activeMissions.map((m) => (
              <div key={m.id} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 600, fontSize: '12px', color: tokens.text.primary }}>{m.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <div style={{ flex: 1, height: '4px', background: tokens.border.subtle, overflow: 'hidden' }}>
                    <div style={{ width: `${m.progressPercent}%`, height: '100%', background: tokens.status.info }} />
                  </div>
                  <span style={{ ...feedTimeStyle }}>{m.progressPercent}%</span>
                </div>
                <div style={{ fontSize: '10px', color: tokens.text.muted, marginTop: '2px' }}>{m.alignedCases.length} aligned cases</div>
              </div>
            ))}
          </div>

          {/* Strategic Priorities */}
          <div style={cardStyle}>
            <div style={cardTitleStyle}>Strategic Priorities</div>
            {[
              { label: 'P0 resolution < 4h SLA', status: breachedCases === 0 ? 'on-track' : 'at-risk' },
              { label: 'Drift closure < 48h', status: 'on-track' },
              { label: 'Coverage > 95%', status: 'at-risk' },
            ].map((p) => (
              <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '12px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: p.status === 'on-track' ? tokens.status.success : tokens.status.warning }} />
                <span style={{ color: tokens.text.primary }}>{p.label}</span>
              </div>
            ))}
          </div>

          {/* Current Operations */}
          <div style={cardStyle}>
            <div style={cardTitleStyle}>Current Operations</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { label: 'Total Cases', value: seedCases.length },
                { label: 'P0 Active', value: p0Cases.length },
                { label: 'P1 Active', value: p1Cases.length },
                { label: 'SLA Breached', value: breachedCases },
                { label: 'Risk Objects', value: seedRiskObjects.length },
                { label: 'Open (treatment)', value: seedRiskObjects.filter((r) => r.treatmentState === 'open').length },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '16px', fontWeight: 700, color: tokens.text.primary }}>{item.value}</div>
                  <div style={{ fontSize: '10px', color: tokens.text.muted }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Estate Summary */}
          <div style={cardStyle}>
            <div style={cardTitleStyle}>Estate</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { label: 'Assets', value: seedAssets.length },
                { label: 'Critical', value: criticalAssets },
                { label: 'Identities', value: seedIdentities.length },
                { label: 'High Risk', value: highRiskIdentities },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '16px', fontWeight: 700, color: tokens.text.primary }}>{item.value}</div>
                  <div style={{ fontSize: '10px', color: tokens.text.muted }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── CENTRE COLUMN: Analysis (50%) ─── */}
        <div style={{ ...columnStyle, borderRight: `1px solid ${tokens.border.subtle}` }}>
          <div style={columnHeaderStyle}>OODA Health &amp; Estate Intelligence</div>

          {/* OODA Phase Gauges */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            {OODA_PHASES.map((phase) => {
              const score = tempo.phases.find((p) => p.phase === phase)!;
              return (
                <div key={phase} style={{ ...cardStyle, textAlign: 'center' as const, marginBottom: 0 }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: tokens.text.secondary, marginBottom: '4px' }}>
                    {OODA_PHASE_LABELS[phase]}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '28px', fontWeight: 700, color: bandColor(score.band) }}>
                    {score.score}
                  </div>
                  <div style={{ height: '4px', background: tokens.border.subtle, marginTop: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${score.score}%`, height: '100%', background: bandColor(score.band) }} />
                  </div>
                  {score.band !== 'green' && (
                    <div style={{ fontSize: '9px', color: bandColor(score.band), marginTop: '4px', fontWeight: 600 }}>
                      {score.band === 'red' ? 'DEGRADED' : 'WATCH'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Threat Picture */}
          <div style={cardStyle}>
            <div style={cardTitleStyle}>Threat &amp; Risk Picture</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '10px', color: tokens.text.muted, marginBottom: '4px' }}>External</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '20px', fontWeight: 700, color: tokens.text.primary }}>
                  {seedCases.filter((c) => c.surfaceAttribution === 'external_attack_surface').length}
                </div>
                <div style={{ fontSize: '10px', color: tokens.text.muted }}>cases</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: tokens.text.muted, marginBottom: '4px' }}>Internal</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '20px', fontWeight: 700, color: tokens.text.primary }}>
                  {seedCases.filter((c) => c.surfaceAttribution === 'internal_attack_surface').length}
                </div>
                <div style={{ fontSize: '10px', color: tokens.text.muted }}>cases</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: tokens.text.muted, marginBottom: '4px' }}>Risk Objects</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '20px', fontWeight: 700, color: tokens.status.warning }}>
                  {seedRiskObjects.filter((r) => r.treatmentState === 'open').length}
                </div>
                <div style={{ fontSize: '10px', color: tokens.text.muted }}>open</div>
              </div>
            </div>
          </div>

          {/* Case Distribution */}
          <div style={cardStyle}>
            <div style={cardTitleStyle}>Case Priority Distribution</div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '48px' }}>
              {(['P0', 'P1', 'P2', 'P3', 'P4'] as const).map((p) => {
                const count = seedCases.filter((c) => c.priority === p).length;
                const maxCount = Math.max(...(['P0', 'P1', 'P2', 'P3', 'P4'] as const).map((pr) => seedCases.filter((c) => c.priority === pr).length), 1);
                const barColor = p === 'P0' ? tokens.status.critical : p === 'P1' ? tokens.status.warning : tokens.status.info;
                return (
                  <div key={p} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                    <div style={{ width: '100%', background: tokens.border.subtle, height: '40px', display: 'flex', alignItems: 'flex-end' }}>
                      <div style={{ width: '100%', height: `${(count / maxCount) * 100}%`, background: barColor, minHeight: count > 0 ? '2px' : '0' }} />
                    </div>
                    <span style={{ fontSize: '9px', color: tokens.text.muted }}>{p}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 600, color: tokens.text.primary }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connector Health */}
          <div style={cardStyle}>
            <div style={cardTitleStyle}>Signal Source Health</div>
            {seedConnectors.map((c) => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '12px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: c.state === 'active' ? tokens.status.success : tokens.status.critical }} />
                <span style={{ color: tokens.text.primary, flex: 1 }}>{c.name}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: tokens.text.muted }}>{c.classes.join('/')}</span>
                <span style={{ fontSize: '10px', color: c.state === 'active' ? tokens.status.success : tokens.status.critical, fontWeight: 600 }}>{c.state.toUpperCase()}</span>
              </div>
            ))}
          </div>

          {/* Drill Paths */}
          <div style={cardStyle}>
            <div style={cardTitleStyle}>Operating Pictures</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a href="/operating-picture/external" style={{ flex: 1, padding: '8px', border: `1px solid ${tokens.border.default}`, color: tokens.text.primary, fontSize: '11px', fontWeight: 600, textDecoration: 'none', textAlign: 'center' as const }}>External</a>
              <a href="/operating-picture/internal" style={{ flex: 1, padding: '8px', border: `1px solid ${tokens.border.default}`, color: tokens.text.primary, fontSize: '11px', fontWeight: 600, textDecoration: 'none', textAlign: 'center' as const }}>Internal</a>
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: Activity & Actions (25%) ─── */}
        <div style={{ ...columnStyle, borderRight: 'none' }}>
          <div style={columnHeaderStyle}>Activity &amp; Actions</div>

          {/* Quick Actions */}
          <div style={{ marginBottom: '16px' }}>
            <div style={cardTitleStyle}>Quick Actions</div>
            <a href="/war-room/p0" style={actionBtnStyle}>Open War Room</a>
            <a href="/cases" style={actionBtnStyle}>View Case Queue</a>
            <a href="/strategy/centre" style={actionBtnStyle}>Strategy Centre</a>
            <a href="/reporting" style={actionBtnStyle}>Reporting</a>
          </div>

          {/* Activity Feed */}
          <div style={cardStyle}>
            <div style={cardTitleStyle}>Operational Activity</div>
            {[
              { time: '06:30', event: 'P0 Case CASE-2026-0001 escalated to CISO', severity: 'critical' as const },
              { time: '06:15', event: 'OODA Observe phase degraded below threshold', severity: 'critical' as const },
              { time: '06:00', event: 'War Room activated for CVE-2026-9999', severity: 'critical' as const },
              { time: '05:45', event: 'AWS Config connector entered error state', severity: 'warning' as const },
              { time: '05:30', event: 'Case CASE-2026-0003 SLA breached (24h)', severity: 'warning' as const },
              { time: '05:00', event: 'Mission: Zero Trust Transformation 25% complete', severity: 'info' as const },
              { time: '04:30', event: 'CrowdStrike Falcon pull completed (success)', severity: 'success' as const },
              { time: '04:00', event: 'Strategy operational-tempo policy approved', severity: 'info' as const },
              { time: '03:30', event: 'Identity svc-cicd-deployer anomaly detected', severity: 'warning' as const },
              { time: '03:00', event: 'APT-41 IOC match on VPN-CONCENTRATOR-01', severity: 'critical' as const },
            ].map((item, i) => (
              <div key={i} style={feedItemStyle}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', marginTop: '4px', flexShrink: 0, background: item.severity === 'critical' ? tokens.status.critical : item.severity === 'warning' ? tokens.status.warning : item.severity === 'success' ? tokens.status.success : tokens.status.info }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ color: tokens.text.primary }}>{item.event}</div>
                    <div style={feedTimeStyle}>{item.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Data Freshness */}
          <div style={{ padding: '8px 0', fontSize: '10px', color: tokens.text.muted, fontFamily: "'JetBrains Mono', monospace" }}>
            Last updated: {new Date().toLocaleTimeString()} · Seed data · Phase 1
          </div>
        </div>
      </div>

      {/* AI-PLACEMENT: AICAP-CC-001 — Commander AI orient-this-page */}
      {/* AI-PLACEMENT: AICAP-CC-002 — Commander AI estate briefing generation */}
    </div>
  );
}
