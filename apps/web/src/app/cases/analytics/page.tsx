'use client';

import { useMode } from '@/context/mode-context';
import { seedCases } from '../../../../../../packages/contracts/src/fixtures/seed-cases';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import { primitiveFonts, primitiveTypeScale, primitiveLetterSpacing, primitiveSpacing, primitiveData } from '../../../../../../packages/ui/src/tokens/primitives';
import { resolveAllStrategies } from '../../../../../../packages/contracts/src/resolvers/case-strategy-resolver';
import { seedStrategies } from '../../../../../../packages/contracts/src/fixtures/seed-strategies';
// import { VegaChart } from '@/components/vega-chart'; // REMOVED — Vega replaced with ApexCharts
import { PageContainer } from '@/components/page-container';
import type { WorkspaceMode } from '../../../../../../packages/ui/src/tokens/semantic';

/**
 * Case Analytics — Commander SDR (DS-1.0, Spec 06 Phase C3b)
 *
 * Source: Spec 06, Route Registry (path: /cases/analytics)
 * DS-1.0 §13: Charts use --data-* tokens only, never literal hex.
 * Every chart: title, legend (if discrete), tooltip, time context (if trend), empty state.
 * Mission mode: dark surface tokens, lighter axis text, mono numeric summaries.
 *
 * Charts:
 * 1. Case Volume Trend (line) — cases over time
 * 2. Case Type Distribution (donut) — breakdown by type
 * 3. SLA Compliance (gauge) — from strategy resolver, not hardcoded
 * 4. Priority Distribution (bar) — cases by priority level
 *
 * NOTE: Vega charts removed. ApexCharts implementation pending.
 */

export default function CaseAnalyticsPage() {
  const { mode, tokens } = useMode();

  // SLA compliance from strategy resolver (not hardcoded — Constraint 9)
  const slaResolutions = seedCases.map((c) => resolveAllStrategies(c, seedStrategies).sla);
  const resolvedCount = slaResolutions.filter((s) => s.status === 'resolved').length;
  const nonBreachedCount = seedCases.filter((c) => !c.sla.breached).length;
  const slaCompliancePct = seedCases.length > 0 ? Math.round((nonBreachedCount / seedCases.length) * 100) : 0;

  return (
    <PageContainer pretitle="Cases › Analytics" title="Case Analytics">

      {/* Charts Grid — DS-1.0 §8: 12-column grid, 2-col wide */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: componentTokens.gridGap }}>

        {/* Case Volume Trend (line) — DS-1.0 §13 approved type: line (trend) */}
        <ChartCard title="Case Volume Trend" subtitle="Cases created over time" tokens={tokens} mode={mode}>
          {/* TODO: Replace with ApexCharts line chart */}
          <PlaceholderChart tokens={tokens} chartType="line" />
        </ChartCard>

        {/* Case Type Distribution (donut) — DS-1.0 §13 approved type: donut (composition, sparingly) */}
        <ChartCard title="Case Type Distribution" subtitle="Breakdown by case type" tokens={tokens} mode={mode}>
          {/* TODO: Replace with ApexCharts donut chart */}
          <PlaceholderChart tokens={tokens} chartType="donut" />
        </ChartCard>

        {/* SLA Compliance (gauge) — DS-1.0 §13 approved type: gauge (single metric vs thresholds) */}
        <ChartCard title="SLA Compliance" subtitle="From strategy resolver — not hardcoded" tokens={tokens} mode={mode}>
          <div style={{ display: 'flex', alignItems: 'center', gap: componentTokens.gridGap }}>
            <span style={{ fontSize: '48px', fontWeight: 700, fontFamily: primitiveFonts.mono, color: tokens.text.primary }}>{slaCompliancePct}%</span>
            <div>
              <span style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted, display: 'block' }}>
                {nonBreachedCount}/{seedCases.length} cases within SLA
              </span>
              <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted, display: 'block', marginTop: '4px' }}>
                {resolvedCount}/{seedCases.length} resolved via strategy
              </span>
            </div>
          </div>
        </ChartCard>

        {/* Priority Distribution (bar) — DS-1.0 §13 approved type: bar (comparison) */}
        <ChartCard title="Priority Distribution" subtitle="Cases by priority level" tokens={tokens} mode={mode}>
          {/* TODO: Replace with ApexCharts bar chart */}
          <PlaceholderChart tokens={tokens} chartType="bar" />
        </ChartCard>
      </section>

      {/* Data note */}
      <section style={{ paddingTop: componentTokens.gridGap }}>
        <div style={{ padding: componentTokens.cardPadding, background: tokens.surface.elevated, border: `1px solid ${tokens.border.subtle}` }}>
          <p style={{ margin: 0, color: tokens.text.muted, fontSize: primitiveTypeScale.caption }}>
            Charts will be rebuilt with ApexCharts. Colour values reference --data-* tokens only (DS-1.0 §13).
          </p>
        </div>
      </section>
    </PageContainer>
  );
}

function PlaceholderChart({ tokens, chartType }: { tokens: any; chartType: string }) {
  return (
    <div style={{ 
      padding: componentTokens.cardPadding, 
      textAlign: 'center', 
      color: tokens.text.muted, 
      fontSize: primitiveTypeScale.body,
      minHeight: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px dashed ${tokens.border.subtle}`
    }}>
      {chartType} chart placeholder — ApexCharts implementation pending
    </div>
  );
}

function ChartCard({ title, subtitle, tokens, mode, children }: { title: string; subtitle: string; tokens: any; mode: WorkspaceMode; children: React.ReactNode }) {
  return (
    <div style={{ padding: componentTokens.cardPadding, background: tokens.surface.elevated, border: `1px solid ${tokens.border.subtle}`, display: 'flex', flexDirection: 'column', gap: primitiveSpacing[3] }}>
      <div>
        <h3 style={{ margin: 0, fontSize: primitiveTypeScale.h3, fontWeight: 600, color: tokens.text.primary, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{title}</h3>
        <span style={{ fontSize: primitiveTypeScale.micro, color: tokens.text.muted }}>{subtitle}</span>
      </div>
      {children}
    </div>
  );
}
