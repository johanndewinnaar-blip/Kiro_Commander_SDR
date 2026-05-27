import { seedCases } from '../../../../packages/contracts/src/fixtures/seed-cases';
import { seedAssets } from '../../../../packages/contracts/src/fixtures/seed-assets';
import { seedIdentities } from '../../../../packages/contracts/src/fixtures/seed-identities';
import { seedConnectors } from '../../../../packages/contracts/src/fixtures/seed-connectors';
import { colors } from '../../../../packages/ui/src/tokens/colors';
import { chrome } from '../../../../packages/ui/src/tokens/spacing';
import { typography } from '../../../../packages/ui/src/tokens/typography';
import { allRoutes } from '@/registry';

/**
 * Command Centre — Primary Landing Surface (v1.3.2 Phase 4)
 *
 * Source: Spec 05, Route Registry (path: /)
 * Visual: shell reference v11 — Command Centre section
 * Status: BUILD (v1.1)
 * Boundary: Operational App
 *
 * Domain Requirements:
 * 1. Present posture, cases, vulnerabilities, exposures, assets, identity,
 *    control coverage and tool health at a glance.
 * 2. Card clicks route to registered domain pages.
 * 3. Label mock/scaffold status on derived metrics.
 * 4. Surface P0 prominently.
 * 5. Commander AI grounded explanation tied to visible data.
 * 6. Show source gaps and next validation steps.
 *
 * v1.3.2 Requirements:
 * - PageHeader: uppercase grey eyebrow, 22px h1, StatusTile (Req 16)
 * - OperationalCard: white bg, #dbe3ef border, 18px padding, uppercase h3 (Req 17)
 */

/** Metric card data */
interface MetricCardData {
  title: string;
  value: string | number;
  status: 'BUILD' | 'SCAFFOLD';
  routePath: string;
}

function getMetricCards(): MetricCardData[] {
  const openCases = seedCases.filter((c) => c.status === 'open' || c.status === 'in-progress');
  const totalAssets = seedAssets.length;
  const totalIdentities = seedIdentities.length;
  const activeConnectors = seedConnectors.filter((c) => c.state === 'active').length;
  const errorConnectors = seedConnectors.filter((c) => c.state === 'error').length;

  return [
    { title: 'Open Cases', value: openCases.length, status: 'BUILD', routePath: '/cases' },
    { title: 'Total Assets', value: totalAssets, status: 'BUILD', routePath: '/assets' },
    { title: 'Identities', value: totalIdentities, status: 'BUILD', routePath: '/identity' },
    { title: 'Active Connectors', value: activeConnectors, status: 'BUILD', routePath: '/tool-health/connectors' },
    { title: 'Connector Errors', value: errorConnectors, status: 'BUILD', routePath: '/tool-health/connectors' },
    { title: 'Vulnerabilities', value: '—', status: 'SCAFFOLD', routePath: '/vulnerabilities' },
    { title: 'Exposures', value: '—', status: 'SCAFFOLD', routePath: '/exposure' },
    { title: 'Control Coverage', value: '—', status: 'SCAFFOLD', routePath: '/controls' },
  ];
}

export default function CommandCentrePage() {
  const p0Cases = seedCases.filter((c) => c.priority === 'P0');
  const metrics = getMetricCards();

  return (
    <div>
      {/* P0 Banner — Domain Req 4: Surface P0 prominently */}
      {p0Cases.length > 0 && (
        <div
          role="alert"
          aria-label="P0 zero-day condition active"
          style={{
            padding: '12px 28px',
            background: colors.intensity.emergency.background,
            border: `1px solid ${colors.priority.p0}`,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '0',
          }}
        >
          <span style={{ color: colors.priority.p0, fontWeight: 700, fontSize: typography.fontSize.base }}>
            ◆ P0 ACTIVE
          </span>
          <span style={{ color: colors.intensity.emergency.text, fontSize: typography.fontSize.base }}>
            {p0Cases[0].title}
          </span>
        </div>
      )}

      {/* PageHeader — v1.3.2 Req 16 */}
      <section
        style={{
          height: chrome.pageHeaderHeight,
          background: colors.operational.panel,
          borderBottom: `1px solid ${colors.operational.line}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
        }}
      >
        <div>
          <small style={{ color: colors.operational.eyebrow, textTransform: 'uppercase', letterSpacing: typography.letterSpacing.display, fontSize: typography.fontSize.xs }}>
            Command Centre › v2.5 shell reference
          </small>
          <h1 style={{ margin: '5px 0 0', fontSize: typography.fontSize.h1, fontWeight: typography.fontWeight.bold, color: colors.operational.ink }}>
            Command Centre
          </h1>
        </div>
        {/* StatusTile — green dot + last updated */}
        <div style={{ border: `1px solid ${colors.operational.line}`, height: '44px', display: 'flex', alignItems: 'center', padding: '0 13px', background: colors.operational.panel }}>
          <span style={{ width: '7px', height: '7px', background: colors.status.live, display: 'inline-block', marginRight: '8px', borderRadius: '50%' }} />
          Last updated 5 min ago
        </div>
      </section>

      {/* Metric Grid — 4-column, OperationalCard style (v1.3.2 Req 17) */}
      <section style={{ padding: '26px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '14px' }}>
          {metrics.map((card) => (
            <a
              key={card.title}
              href={card.routePath}
              style={{
                border: `1px solid ${colors.operational.line}`,
                padding: '18px',
                background: colors.operational.panel,
                minHeight: '110px',
                textDecoration: 'none',
                display: 'block',
              }}
            >
              <h3 style={{ margin: '0 0 10px', fontSize: typography.fontSize.base, textTransform: 'uppercase', letterSpacing: typography.letterSpacing.eyebrow, fontWeight: typography.fontWeight.bold, color: colors.operational.ink }}>
                {card.title}
              </h3>
              <p style={{ margin: '0 0 8px', fontSize: '1.5rem', fontWeight: 700, color: card.value === '—' ? colors.operational.muted : colors.operational.ink }}>
                {card.value}
              </p>
              {/* Status badge */}
              <span style={{ fontSize: '8px', letterSpacing: typography.letterSpacing.badge, padding: '2px 6px', background: card.status === 'BUILD' ? colors.status.build : colors.status.scaffold, color: card.status === 'BUILD' ? colors.operational.ink : '#fff' }}>
                {card.status}
              </span>
            </a>
          ))}
        </div>

        {/* Data Source Status — Domain Req 6 */}
        <div style={{ marginTop: '14px', border: `1px solid ${colors.operational.line}`, padding: '18px', background: colors.operational.panel }}>
          <h3 style={{ margin: '0 0 10px', fontSize: typography.fontSize.base, textTransform: 'uppercase', letterSpacing: typography.letterSpacing.eyebrow, fontWeight: typography.fontWeight.bold, color: colors.operational.ink }}>
            Data Source Status
          </h3>
          <p style={{ margin: 0, color: colors.operational.muted, lineHeight: typography.lineHeight.normal }}>
            Displaying seed/mock data. Real connector integration requires Phase 2 approval.
            Scaffold metrics will populate as domain specs are implemented.
          </p>
        </div>
      </section>
    </div>
  );
}
