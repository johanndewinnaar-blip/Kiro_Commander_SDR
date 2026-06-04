'use client';

import dynamic from 'next/dynamic';
import { useMode } from '@/context/mode-context';
import { seedCases } from '../../../../../../packages/contracts/src/fixtures/seed-cases';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import { primitiveFonts, primitiveTypeScale, primitiveLetterSpacing, primitiveSpacing, primitiveData } from '../../../../../../packages/ui/src/tokens/primitives';
import { resolveAllStrategies } from '../../../../../../packages/contracts/src/resolvers/case-strategy-resolver';
import { seedStrategies } from '../../../../../../packages/contracts/src/fixtures/seed-strategies';
import { PageContainer } from '@/components/page-container';
import type { WorkspaceMode } from '../../../../../../packages/ui/src/tokens/semantic';
import type { ApexOptions } from 'apexcharts';

// Dynamic import for ApexCharts (SSR not supported)
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * Case Analytics — Commander SDR (DS-1.0, Spec 06 Phase C3b)
 *
 * Source: Spec 06, Route Registry (path: /cases/analytics)
 * DS-1.0 §13: Charts use --data-* tokens only, never literal hex.
 * Every chart: title, legend (if discrete), tooltip, time context (if trend), empty state.
 * Mission mode: dark surface tokens, lighter axis text, mono numeric summaries.
 *
 * Comprehensive analytics covering PEOPLE, PROCESS, SYSTEM dimensions:
 * 
 * PROCESS METRICS (case lifecycle efficiency):
 * 1. Case Volume Trend (area) — cases created over time (30-day rolling)
 * 2. Case Lifecycle Funnel (horizontal bar) — distribution across 12-state lifecycle
 * 3. Mean Time to Resolution (line) — MTTR trend by priority
 * 4. SLA Compliance (radial gauge) — % cases within SLA target
 * 
 * PEOPLE METRICS (workload & effectiveness):
 * 5. Cases by Owner (bar) — workload distribution by assigned owner
 * 6. Cases by Team (donut) — team workload distribution
 * 
 * SYSTEM METRICS (risk coverage & classification):
 * 7. Case Type Distribution (treemap) — breakdown by case type
 * 8. Priority Distribution (column) — cases by priority level
 * 9. Surface Attribution (donut) — internal vs external attack surface
 * 10. ATT&CK Tactic Coverage (radar) — COIM-G aggregate ATT&CK coverage
 * 11. Confidence Score Distribution (histogram) — case confidence aggregate
 * 12. Blast Radius Analysis (scatter) — blast radius vs affected entities (COIM-G)
 */

export default function CaseAnalyticsPage() {
  const { mode, tokens } = useMode();

  // ─── PROCESS METRICS: Derive analytics from seed data ────────────────────
  const slaResolutions = seedCases.map((c) => resolveAllStrategies(c, seedStrategies).sla);
  const resolvedCount = slaResolutions.filter((s) => s.status === 'resolved').length;
  const nonBreachedCount = seedCases.filter((c) => !c.sla.breached).length;
  const slaCompliancePct = seedCases.length > 0 ? Math.round((nonBreachedCount / seedCases.length) * 100) : 0;

  // Case type counts
  const typeCounts: Record<string, number> = {};
  seedCases.forEach((c) => { typeCounts[c.caseType] = (typeCounts[c.caseType] || 0) + 1; });

  // Priority counts
  const priorityCounts: Record<string, number> = { P0: 0, P1: 0, P2: 0, P3: 0, P4: 0 };
  seedCases.forEach((c) => { priorityCounts[c.priority] = (priorityCounts[c.priority] || 0) + 1; });

  // Status counts (lifecycle state distribution)
  const statusCounts: Record<string, number> = {};
  seedCases.forEach((c) => { statusCounts[c.status] = (statusCounts[c.status] || 0) + 1; });

  // Surface attribution counts
  const surfaceCounts: Record<string, number> = {};
  seedCases.forEach((c) => {
    const surface = c.surfaceAttribution || 'unattributed';
    surfaceCounts[surface] = (surfaceCounts[surface] || 0) + 1;
  });

  // ─── PEOPLE METRICS: Owner & team workload ────────────────────────────────
  const ownerCounts: Record<string, number> = {};
  seedCases.forEach((c) => { ownerCounts[c.owner] = (ownerCounts[c.owner] || 0) + 1; });

  const teamCounts: Record<string, number> = {};
  seedCases.forEach((c) => { teamCounts[c.team] = (teamCounts[c.team] || 0) + 1; });

  // ─── SYSTEM METRICS: COIM-G aggregates ────────────────────────────────────
  // ATT&CK tactic coverage (from COIM-G attacks[] field)
  const tacticCounts: Record<string, number> = {};
  seedCases.forEach((c) => {
    if (c.attacks && c.attacks.length > 0) {
      c.attacks.forEach((attack) => {
        const tactic = attack.tactic || 'unknown';
        tacticCounts[tactic] = (tacticCounts[tactic] || 0) + 1;
      });
    }
  });

  // Confidence score distribution (from COIM-G confidenceAggregate field)
  const confidenceBuckets = { '0-20': 0, '21-40': 0, '41-60': 0, '61-80': 0, '81-100': 0 };
  seedCases.forEach((c) => {
    const conf = c.confidenceAggregate ?? 50; // Default to mid-range if missing
    if (conf <= 20) confidenceBuckets['0-20']++;
    else if (conf <= 40) confidenceBuckets['21-40']++;
    else if (conf <= 60) confidenceBuckets['41-60']++;
    else if (conf <= 80) confidenceBuckets['61-80']++;
    else confidenceBuckets['81-100']++;
  });

  // Blast radius analysis (affectedEntityCount vs blastRadiusScore from COIM-G)
  const blastRadiusData = seedCases
    .filter((c) => c.affectedEntityCount !== undefined && c.blastRadiusScore !== undefined)
    .map((c) => ({
      x: c.affectedEntityCount!,
      y: c.blastRadiusScore!,
      z: 1, // Bubble size (constant for now)
      label: c.caseRef,
    }));

  // ─── Chart colour palette from --data-* tokens (DS-1.0 §13) ──────────────
  const chartColors = [
    primitiveData[1],
    primitiveData[2],
    primitiveData[3],
    primitiveData[4],
    primitiveData[5],
    primitiveData[6],
    primitiveData[7],
    primitiveData[8],
  ];

  // ─── Shared chart options (mode-aware) ────────────────────────────────────
  const baseChartOpts: Partial<ApexOptions> = {
    chart: {
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: primitiveFonts.body,
    },
    theme: { mode: mode === 'mission' ? 'dark' : 'light' },
    grid: { borderColor: tokens.border.subtle, strokeDashArray: 3 },
    xaxis: { labels: { style: { colors: tokens.text.muted, fontSize: primitiveTypeScale.micro } } },
    yaxis: { labels: { style: { colors: tokens.text.muted, fontSize: primitiveTypeScale.micro } } },
    tooltip: { theme: mode === 'mission' ? 'dark' : 'light' },
    legend: { labels: { colors: tokens.text.secondary }, fontSize: primitiveTypeScale.caption },
  };

  // ─── 1. PROCESS: Case Volume Trend (area — 30 day rolling mock) ─────────
  const volumeData = Array.from({ length: 30 }, (_, i) => ({
    x: new Date(2026, 0, i + 1).getTime(),
    y: Math.floor(Math.random() * 8) + 2 + (i > 20 ? 3 : 0), // spike in last week
  }));

  const volumeOpts: ApexOptions = {
    ...baseChartOpts,
    chart: { ...baseChartOpts.chart, type: 'area', sparkline: { enabled: false } },
    stroke: { curve: 'smooth', width: 2 },
    colors: [primitiveData[1]],
    fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
    xaxis: { ...baseChartOpts.xaxis, type: 'datetime' },
    dataLabels: { enabled: false },
  };

  // ─── 2. PROCESS: Case Lifecycle Funnel (horizontal bar) ──────────────────
  const lifecycleOrder = ['detected', 'bound', 'routed', 'prioritised', 'action_decomposed', 'in_progress', 'pending_validation', 'validation_running', 'validated_pass', 'pending_closure_gates', 'closed_by_system'];
  const statusLabels = lifecycleOrder.filter((s) => (statusCounts[s] || 0) > 0);
  const statusValues = statusLabels.map((s) => statusCounts[s] || 0);

  const funnelOpts: ApexOptions = {
    ...baseChartOpts,
    chart: { ...baseChartOpts.chart, type: 'bar' },
    colors: [primitiveData[2]],
    plotOptions: { bar: { horizontal: true, borderRadius: 0, barHeight: '70%' } },
    xaxis: { ...baseChartOpts.xaxis, categories: statusLabels.map((s) => s.replace(/_/g, ' ')) },
    dataLabels: { enabled: true, style: { colors: [tokens.text.primary] } },
    legend: { show: false },
  };

  // ─── 3. PROCESS: Mean Time to Resolution (line — mock MTTR by priority) ──
  const mttrWeeks = ['W1', 'W2', 'W3', 'W4'];
  const mttrP0 = [4, 3.5, 2.8, 3.1];
  const mttrP1 = [12, 10, 9, 8.5];
  const mttrP2 = [36, 32, 28, 30];

  const mttrOpts: ApexOptions = {
    ...baseChartOpts,
    chart: { ...baseChartOpts.chart, type: 'line' },
    stroke: { curve: 'smooth', width: 2 },
    colors: [tokens.status.critical, tokens.status.warning, primitiveData[1]],
    xaxis: { ...baseChartOpts.xaxis, categories: mttrWeeks },
    yaxis: { ...baseChartOpts.yaxis, title: { text: 'Hours', style: { color: tokens.text.muted, fontSize: primitiveTypeScale.micro } } },
    markers: { size: 4 },
  };

  // ─── 4. PROCESS: SLA Compliance (radial gauge) ───────────────────────────
  const gaugeOpts: ApexOptions = {
    ...baseChartOpts,
    chart: { ...baseChartOpts.chart, type: 'radialBar' },
    colors: [slaCompliancePct >= 85 ? tokens.status.success : slaCompliancePct >= 60 ? tokens.status.warning : tokens.status.critical],
    plotOptions: {
      radialBar: {
        hollow: { size: '60%' },
        dataLabels: {
          name: { show: true, color: tokens.text.muted, fontSize: primitiveTypeScale.caption },
          value: { show: true, color: tokens.text.primary, fontSize: '28px', fontFamily: primitiveFonts.mono, fontWeight: 700 },
        },
        track: { background: tokens.border.subtle },
      },
    },
    labels: ['SLA Compliance'],
  };

  // ─── 5. PEOPLE: Cases by Owner (bar) ─────────────────────────────────────
  const ownerLabels = Object.keys(ownerCounts).slice(0, 10); // Top 10 owners
  const ownerValues = ownerLabels.map((o) => ownerCounts[o]);

  const ownerBarOpts: ApexOptions = {
    ...baseChartOpts,
    chart: { ...baseChartOpts.chart, type: 'bar' },
    colors: [primitiveData[3]],
    plotOptions: { bar: { horizontal: false, borderRadius: 0, columnWidth: '70%' } },
    xaxis: { ...baseChartOpts.xaxis, categories: ownerLabels, labels: { rotate: -45, rotateAlways: true } },
    dataLabels: { enabled: false },
  };

  // ─── 6. PEOPLE: Cases by Team (donut) ────────────────────────────────────
  const teamLabels = Object.keys(teamCounts);
  const teamValues = Object.values(teamCounts);

  const teamDonutOpts: ApexOptions = {
    ...baseChartOpts,
    chart: { ...baseChartOpts.chart, type: 'donut' },
    labels: teamLabels,
    colors: chartColors.slice(0, teamLabels.length),
    plotOptions: { pie: { donut: { size: '65%', labels: { show: true, total: { show: true, label: 'Total', color: tokens.text.muted } } } } },
    dataLabels: { enabled: false },
  };

  // ─── 7. SYSTEM: Case Type Distribution (treemap) ─────────────────────────
  const treemapData = Object.entries(typeCounts).map(([type, count]) => ({
    x: type.replace(/-/g, ' '),
    y: count,
  }));

  const treemapOpts: ApexOptions = {
    ...baseChartOpts,
    chart: { ...baseChartOpts.chart, type: 'treemap' },
    colors: chartColors,
    plotOptions: { treemap: { distributed: true } },
    dataLabels: { enabled: true, style: { fontSize: primitiveTypeScale.micro, colors: ['#fff'] } },
    legend: { show: false },
  };

  // ─── 8. SYSTEM: Priority Distribution (column) ───────────────────────────
  const priorityLabels = Object.keys(priorityCounts);
  const priorityValues = Object.values(priorityCounts);
  const priorityColors = [tokens.status.critical, tokens.status.warning, primitiveData[4], primitiveData[1], primitiveData[3]];

  const barOpts: ApexOptions = {
    ...baseChartOpts,
    chart: { ...baseChartOpts.chart, type: 'bar' },
    colors: priorityColors,
    plotOptions: { bar: { distributed: true, borderRadius: 0, columnWidth: '60%' } },
    xaxis: { ...baseChartOpts.xaxis, categories: priorityLabels },
    dataLabels: { enabled: true, style: { colors: ['#fff'] } },
    legend: { show: false },
  };

  // ─── 9. SYSTEM: Surface Attribution (donut) ──────────────────────────────
  const surfaceLabels = Object.keys(surfaceCounts);
  const surfaceValues = Object.values(surfaceCounts);

  const surfaceDonutOpts: ApexOptions = {
    ...baseChartOpts,
    chart: { ...baseChartOpts.chart, type: 'donut' },
    labels: surfaceLabels.map((s) => s.replace(/_/g, ' ')),
    colors: [tokens.status.critical, primitiveData[1], tokens.text.muted],
    plotOptions: { pie: { donut: { size: '65%', labels: { show: true, total: { show: true, label: 'Total', color: tokens.text.muted } } } } },
    dataLabels: { enabled: false },
  };

  // ─── 10. SYSTEM: ATT&CK Tactic Coverage (radar) ──────────────────────────
  const tacticLabels = Object.keys(tacticCounts);
  const tacticValues = Object.values(tacticCounts);

  const radarOpts: ApexOptions = {
    ...baseChartOpts,
    chart: { ...baseChartOpts.chart, type: 'radar' },
    colors: [primitiveData[1]],
    xaxis: { categories: tacticLabels.map((t) => t.replace(/-/g, ' ')) },
    yaxis: { show: false },
    markers: { size: 3 },
    fill: { opacity: 0.2 },
  };

  // ─── 11. SYSTEM: Confidence Score Distribution (column histogram) ────────
  const confidenceLabels = Object.keys(confidenceBuckets);
  const confidenceValues = Object.values(confidenceBuckets);

  const histogramOpts: ApexOptions = {
    ...baseChartOpts,
    chart: { ...baseChartOpts.chart, type: 'bar' },
    colors: [primitiveData[4]],
    plotOptions: { bar: { horizontal: false, borderRadius: 0, columnWidth: '80%' } },
    xaxis: { ...baseChartOpts.xaxis, categories: confidenceLabels },
    dataLabels: { enabled: false },
  };

  // ─── 12. SYSTEM: Blast Radius Analysis (scatter) ─────────────────────────
  const scatterOpts: ApexOptions = {
    ...baseChartOpts,
    chart: { ...baseChartOpts.chart, type: 'scatter' },
    colors: [tokens.status.critical],
    xaxis: { ...baseChartOpts.xaxis, title: { text: 'Affected Entities', style: { color: tokens.text.muted, fontSize: primitiveTypeScale.micro } } },
    yaxis: { ...baseChartOpts.yaxis, title: { text: 'Blast Radius Score', style: { color: tokens.text.muted, fontSize: primitiveTypeScale.micro } } },
    markers: { size: 6 },
  };

  return (
    <PageContainer pretitle="Cases › Analytics" title="Case Analytics">

      {/* Row 1: PROCESS — Volume Trend + Lifecycle Funnel */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: componentTokens.gridGap }}>
        <ChartCard title="Case Volume Trend" subtitle="Cases created — 30 day rolling" tokens={tokens} mode={mode}>
          <Chart type="area" height={220} options={volumeOpts} series={[{ name: 'Cases', data: volumeData }]} />
        </ChartCard>

        <ChartCard title="Case Lifecycle Funnel" subtitle="Distribution across 12-state lifecycle" tokens={tokens} mode={mode}>
          <Chart type="bar" height={220} options={funnelOpts} series={[{ name: 'Cases', data: statusValues }]} />
        </ChartCard>
      </section>

      {/* Row 2: PROCESS — MTTR Trend + SLA Compliance */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: componentTokens.gridGap, marginTop: componentTokens.gridGap }}>
        <ChartCard title="Mean Time to Resolution" subtitle="MTTR trend by priority (hours)" tokens={tokens} mode={mode}>
          <Chart type="line" height={220} options={mttrOpts} series={[
            { name: 'P0', data: mttrP0 },
            { name: 'P1', data: mttrP1 },
            { name: 'P2', data: mttrP2 },
          ]} />
        </ChartCard>

        <ChartCard title="SLA Compliance" subtitle={`${nonBreachedCount}/${seedCases.length} within SLA — strategy-driven`} tokens={tokens} mode={mode}>
          <Chart type="radialBar" height={220} options={gaugeOpts} series={[slaCompliancePct]} />
        </ChartCard>
      </section>

      {/* Row 3: PEOPLE — Cases by Owner + Cases by Team */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: componentTokens.gridGap, marginTop: componentTokens.gridGap }}>
        <ChartCard title="Cases by Owner" subtitle={`Workload distribution — top ${ownerLabels.length} owners`} tokens={tokens} mode={mode}>
          <Chart type="bar" height={220} options={ownerBarOpts} series={[{ name: 'Cases', data: ownerValues }]} />
        </ChartCard>

        <ChartCard title="Cases by Team" subtitle="Team workload distribution" tokens={tokens} mode={mode}>
          <Chart type="donut" height={220} options={teamDonutOpts} series={teamValues} />
        </ChartCard>
      </section>

      {/* Row 4: SYSTEM — Case Type + Priority */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: componentTokens.gridGap, marginTop: componentTokens.gridGap }}>
        <ChartCard title="Case Type Distribution" subtitle="Breakdown by case type" tokens={tokens} mode={mode}>
          <Chart type="treemap" height={220} options={treemapOpts} series={[{ data: treemapData }]} />
        </ChartCard>

        <ChartCard title="Priority Distribution" subtitle="Cases by priority level" tokens={tokens} mode={mode}>
          <Chart type="bar" height={220} options={barOpts} series={[{ name: 'Cases', data: priorityValues }]} />
        </ChartCard>
      </section>

      {/* Row 5: SYSTEM — Surface Attribution + ATT&CK Coverage */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: componentTokens.gridGap, marginTop: componentTokens.gridGap }}>
        <ChartCard title="Surface Attribution" subtitle="Internal vs external attack surface" tokens={tokens} mode={mode}>
          <Chart type="donut" height={220} options={surfaceDonutOpts} series={surfaceValues} />
        </ChartCard>

        <ChartCard title="ATT&CK Tactic Coverage" subtitle="COIM-G aggregate — tactics from bound risk objects" tokens={tokens} mode={mode}>
          {tacticLabels.length > 0 ? (
            <Chart type="radar" height={220} options={radarOpts} series={[{ name: 'Cases', data: tacticValues }]} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 220, color: tokens.text.muted, fontSize: primitiveTypeScale.caption }}>
              No ATT&CK data available
            </div>
          )}
        </ChartCard>
      </section>

      {/* Row 6: SYSTEM — Confidence Distribution + Blast Radius Analysis */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: componentTokens.gridGap, marginTop: componentTokens.gridGap }}>
        <ChartCard title="Confidence Score Distribution" subtitle="COIM-G confidenceAggregate — weighted average" tokens={tokens} mode={mode}>
          <Chart type="bar" height={220} options={histogramOpts} series={[{ name: 'Cases', data: confidenceValues }]} />
        </ChartCard>

        <ChartCard title="Blast Radius Analysis" subtitle="Affected entities vs blast radius score (COIM-G)" tokens={tokens} mode={mode}>
          {blastRadiusData.length > 0 ? (
            <Chart type="scatter" height={220} options={scatterOpts} series={[{ name: 'Cases', data: blastRadiusData }]} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 220, color: tokens.text.muted, fontSize: primitiveTypeScale.caption }}>
              No blast radius data available
            </div>
          )}
        </ChartCard>
      </section>
    </PageContainer>
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
