'use client';

import { useMode } from '@/context/mode-context';
import { seedCases } from '../../../../packages/contracts/src/fixtures/seed-cases';
import { seedAssets } from '../../../../packages/contracts/src/fixtures/seed-assets';
import { seedIdentities } from '../../../../packages/contracts/src/fixtures/seed-identities';
import { seedConnectors } from '../../../../packages/contracts/src/fixtures/seed-connectors';
import { componentTokens } from '../../../../packages/ui/src/tokens/components';
import { primitiveBrand, primitiveFonts, primitiveTypeScale, primitiveLetterSpacing, primitiveSignal, primitiveSpacing, primitiveRadii } from '../../../../packages/ui/src/tokens/primitives';
import { getKpiTileStyles, getTrendIndicator } from '../../../../packages/ui/src/components/kpi-tile';
import { getLiveFeedStyles, getSeverityColor } from '../../../../packages/ui/src/components/live-feed';

/**
 * Command Centre — Primary Landing Surface (DS-1.0 Phase 3)
 *
 * Source: Spec 05, Route Registry (path: /)
 * Mockups: command-centre-standard.png (Standard mode), command-centre-mission.png (Mission mode)
 * DS-1.0 §8 Workspace structure: Header → Insight Row (KPIs + gauge) → Content Grid → Detail
 *
 * Boundary: Operational App
 * Status: BUILD (v1.1)
 */

export default function CommandCentrePage() {
  const { mode, tokens } = useMode();
  const tileStyles = getKpiTileStyles(mode);
  const feedStyles = getLiveFeedStyles(mode);

  const p0Cases = seedCases.filter((c) => c.priority === 'P0');
  const openCases = seedCases.filter((c) => c.status === 'open' || c.status === 'in-progress');
  const totalAssets = seedAssets.length;
  const totalIdentities = seedIdentities.length;
  const activeConnectors = seedConnectors.filter((c) => c.state === 'active').length;
  const errorConnectors = seedConnectors.filter((c) => c.state === 'error').length;

  return (
    <div>
      {/* P0 Banner — DS-1.0 §14.1: Emergency Command treatment */}
      {p0Cases.length > 0 && (
        <div
          role="alert"
          aria-label="P0 zero-day condition active"
          style={{
            padding: `${primitiveSpacing[3]} ${componentTokens.contentPadding}`,
            background: mode === 'mission' ? 'rgba(217,45,32,0.12)' : 'rgba(217,45,32,0.06)',
            border: `1px solid ${primitiveSignal.critical}`,
            borderRadius: primitiveRadii.sm,
            display: 'flex',
            alignItems: 'center',
            gap: primitiveSpacing[3],
          }}
        >
          <span style={{ color: primitiveSignal.critical, fontWeight: 700, fontSize: primitiveTypeScale.body }}>
            ◆ P0 ACTIVE
          </span>
          <span style={{ color: tokens.text.primary, fontSize: primitiveTypeScale.body }}>
            {p0Cases[0].title}
          </span>
        </div>
      )}

      {/* Page Header — DS-1.0 §12 Page header component */}
      <section
        style={{
          height: '76px',
          background: tokens.surface.secondary,
          borderBottom: `1px solid ${tokens.border.default}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `0 ${componentTokens.contentPadding}`,
        }}
      >
        <div>
          <small style={{ color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.display, fontSize: primitiveTypeScale.micro }}>
            Command Centre › Security Posture Overview
          </small>
          <h1 style={{ margin: '4px 0 0', fontSize: primitiveTypeScale.h1, fontWeight: 700, color: tokens.text.primary, fontFamily: primitiveFonts.body, lineHeight: '1.2' }}>
            Command Centre
          </h1>
        </div>
        <div style={{ border: `1px solid ${tokens.border.default}`, height: componentTokens.buttonHeightEmphasis, display: 'flex', alignItems: 'center', padding: `0 ${primitiveSpacing[3]}`, background: tokens.surface.secondary, borderRadius: primitiveRadii.md }}>
          <span style={{ width: '7px', height: '7px', background: primitiveSignal.success, display: 'inline-block', marginRight: primitiveSpacing[2], borderRadius: primitiveRadii.full }} />
          <span style={{ fontSize: primitiveTypeScale.body, color: tokens.text.secondary }}>Last updated 5 min ago</span>
        </div>
      </section>

      {/* KPI Strip — DS-1.0 §21 Req 26: 8-10 metric tiles under page header */}
      <section style={{ padding: `${componentTokens.cardPadding} ${componentTokens.contentPadding}`, borderBottom: `1px solid ${tokens.border.subtle}` }}>
        <div style={{ display: 'flex', gap: componentTokens.gridGap, overflowX: 'auto' }}>
          {[
            { label: 'Open Cases', value: openCases.length, trend: 'up' as const, delta: 2 },
            { label: 'Total Assets', value: totalAssets, trend: 'flat' as const },
            { label: 'Identities', value: totalIdentities, trend: 'flat' as const },
            { label: 'Active Connectors', value: activeConnectors, trend: 'up' as const, delta: 1 },
            { label: 'Connector Errors', value: errorConnectors, trend: 'down' as const, delta: -1 },
            { label: 'Posture Score', value: '72%', trend: 'up' as const, delta: 3 },
            { label: 'SLA Compliance', value: '94%', trend: 'down' as const, delta: -2 },
            { label: 'Coverage', value: '87%', trend: 'up' as const, delta: 1 },
          ].map((kpi) => {
            const trend = getTrendIndicator(kpi.trend, kpi.label !== 'Connector Errors');
            return (
              <div key={kpi.label} style={tileStyles.container}>
                <span style={tileStyles.label}>{kpi.label}</span>
                <span style={tileStyles.value}>{kpi.value}</span>
                {kpi.delta !== undefined && (
                  <span style={{ ...tileStyles.delta, color: trend.color }}>
                    {trend.arrow} {kpi.delta > 0 ? '+' : ''}{kpi.delta} vs 24h
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Content Grid — DS-1.0 §8: 12-column internal grid, default 3-col cards */}
      <section style={{ padding: `0 ${componentTokens.contentPadding} ${componentTokens.contentPadding}`, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: componentTokens.gridGap }}>
        {/* Recent Cases Card */}
        <div style={{ padding: componentTokens.cardPadding, background: tokens.surface.elevated, borderRadius: componentTokens.cardRadius, border: `1px solid ${tokens.border.subtle}`, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: `0 0 ${componentTokens.cardHeaderMargin}`, fontSize: primitiveTypeScale.micro, fontWeight: 600, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Recent Cases</h3>
          <div style={{ maxHeight: componentTokens.cardListMaxHeight, overflowY: 'auto', flex: 1 }}>
            {seedCases.map((c) => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: primitiveSpacing[2], padding: `${primitiveSpacing[2]} 0`, borderBottom: `1px solid ${tokens.border.subtle}` }}>
                <span style={{ fontSize: primitiveTypeScale.micro, color: c.priority === 'P0' ? primitiveSignal.critical : tokens.text.muted, fontWeight: 700, minWidth: '24px' }}>{c.priority}</span>
                <span style={{ fontSize: primitiveTypeScale.body, color: tokens.text.primary, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</span>
                <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, whiteSpace: 'nowrap' }}>12m ago</span>
                <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, textTransform: 'uppercase', fontWeight: 600 }}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Asset Summary Card */}
        <div style={{ padding: componentTokens.cardPadding, background: tokens.surface.elevated, borderRadius: componentTokens.cardRadius, border: `1px solid ${tokens.border.subtle}`, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: `0 0 ${componentTokens.cardHeaderMargin}`, fontSize: primitiveTypeScale.micro, fontWeight: 600, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Asset Summary</h3>
          <div style={{ maxHeight: componentTokens.cardListMaxHeight, overflowY: 'auto', flex: 1 }}>
            {seedAssets.map((a) => (
              <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: `${primitiveSpacing[2]} 0`, borderBottom: `1px solid ${tokens.border.subtle}` }}>
                <span style={{ fontSize: primitiveTypeScale.body, color: tokens.text.primary }}>{a.name}</span>
                <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted }}>{a.classification}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div style={feedStyles.container}>
          <h3 style={feedStyles.header}>Live Activity</h3>
          <div style={feedStyles.list}>
            {[
              { id: '1', timestamp: '14:32', severity: 'critical' as const, message: 'P0 case escalated to CISO', entityRef: 'CASE-2026-0003' },
              { id: '2', timestamp: '14:28', severity: 'warning' as const, message: 'SLA breach approaching on CASE-2026-0001', entityRef: 'CASE-2026-0001' },
              { id: '3', timestamp: '14:15', severity: 'info' as const, message: 'Connector sync completed', entityRef: 'connector-0001' },
              { id: '4', timestamp: '14:02', severity: 'success' as const, message: 'Validation passed for asset PROD-WEB-01', entityRef: 'asset-0001' },
            ].map((event) => (
              <div key={event.id} style={feedStyles.item}>
                <span style={{ ...feedStyles.dot, background: getSeverityColor(event.severity) }} />
                <span style={feedStyles.timestamp}>{event.timestamp}</span>
                <span style={feedStyles.message}>{event.message}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Source Status */}
      <section style={{ padding: `0 ${componentTokens.contentPadding} ${componentTokens.contentPadding}` }}>
        <div style={{ padding: componentTokens.cardPadding, background: tokens.surface.elevated, borderRadius: componentTokens.cardRadius, border: `1px solid ${tokens.border.subtle}` }}>
          <h3 style={{ margin: `0 0 ${primitiveSpacing[2]}`, fontSize: primitiveTypeScale.micro, fontWeight: 600, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Data Source Status</h3>
          <p style={{ margin: 0, color: tokens.text.secondary, lineHeight: '1.43', fontSize: primitiveTypeScale.body }}>
            Displaying seed/mock data. Real connector integration requires Phase 2 approval. Scaffold metrics will populate as domain specs are implemented.
          </p>
        </div>
      </section>
    </div>
  );
}
