import { Shell } from '@/components/shell';
import { seedCases } from '../../../../packages/contracts/src/fixtures/seed-cases';
import { seedAssets } from '../../../../packages/contracts/src/fixtures/seed-assets';
import { seedIdentities } from '../../../../packages/contracts/src/fixtures/seed-identities';
import { seedConnectors } from '../../../../packages/contracts/src/fixtures/seed-connectors';
import { colors } from '../../../../packages/ui/src/tokens/colors';

/**
 * Command Centre — Primary Landing Surface
 *
 * Source: Spec 05, Route Registry (path: /)
 * Status: BUILD (v1.1)
 * Boundary: Operational App
 *
 * Domain Requirement 1: Present posture, cases, vulnerabilities, exposures,
 *   assets, identity, control coverage and tool health at a glance.
 * Domain Requirement 3: Label mock/scaffold status on derived metrics.
 * Domain Requirement 4: Surface P0 prominently.
 */

function MetricCard({
  label,
  value,
  status,
  href,
  accent,
}: {
  label: string;
  value: string | number;
  status: 'LIVE' | 'BUILD' | 'SCAFFOLD';
  href: string;
  accent?: string;
}) {
  return (
    <a
      href={href}
      style={{
        display: 'block',
        padding: '1rem',
        background: colors.background.elevated,
        border: `1px solid ${colors.border.subtle}`,
        borderRadius: '4px',
        textDecoration: 'none',
        color: colors.text.secondary,
        transition: 'border-color 0.15s',
      }}
    >
      <div style={{ fontSize: '0.6875rem', color: colors.text.muted, marginBottom: '0.25rem' }}>
        {label}
        <span
          style={{
            marginLeft: '0.5rem',
            fontSize: '0.5625rem',
            padding: '0.0625rem 0.25rem',
            borderRadius: '2px',
            background: status === 'BUILD' ? colors.status.build : colors.status.scaffold,
            color: '#fff',
          }}
        >
          {status}
        </span>
      </div>
      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: accent ?? colors.text.primary }}>
        {value}
      </div>
    </a>
  );
}

function P0Banner() {
  const p0Cases = seedCases.filter((c) => c.priority === 'P0');
  if (p0Cases.length === 0) return null;

  return (
    <div
      style={{
        padding: '0.75rem 1rem',
        background: colors.intensity.emergency.background,
        border: `1px solid ${colors.priority.p0}`,
        borderRadius: '4px',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}
      role="alert"
      aria-label="P0 zero-day condition active"
    >
      <span style={{ color: colors.priority.p0, fontWeight: 700, fontSize: '0.8125rem' }}>
        ◆ P0 ACTIVE
      </span>
      <span style={{ color: colors.intensity.emergency.text, fontSize: '0.8125rem' }}>
        {p0Cases[0].title}
      </span>
    </div>
  );
}

export default function CommandCentrePage() {
  const openCases = seedCases.filter((c) => c.status === 'open' || c.status === 'in-progress');
  const totalAssets = seedAssets.length;
  const totalIdentities = seedIdentities.length;
  const activeConnectors = seedConnectors.filter((c) => c.state === 'active').length;
  const errorConnectors = seedConnectors.filter((c) => c.state === 'error').length;

  return (
    <Shell>
      <div>
        {/* Domain Req 4: P0 surfaced prominently */}
        <P0Banner />

        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          Command Centre
        </h1>
        <p style={{ fontSize: '0.8125rem', color: colors.text.muted, marginBottom: '1.5rem' }}>
          Security Command and Control — Operational Overview
          <span
            style={{
              marginLeft: '0.75rem',
              fontSize: '0.625rem',
              padding: '0.125rem 0.375rem',
              borderRadius: '2px',
              background: colors.status.build,
              color: '#fff',
            }}
          >
            BUILD v1.1
          </span>
        </p>

        {/* Domain Req 1: Posture at a glance */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <MetricCard
            label="Open Cases"
            value={openCases.length}
            status="BUILD"
            href="/cases"
            accent={colors.accent.gold}
          />
          <MetricCard
            label="Total Assets"
            value={totalAssets}
            status="BUILD"
            href="/assets"
          />
          <MetricCard
            label="Identities"
            value={totalIdentities}
            status="BUILD"
            href="/identity"
          />
          <MetricCard
            label="Active Connectors"
            value={activeConnectors}
            status="BUILD"
            href="/admin/connectors"
          />
          <MetricCard
            label="Connector Errors"
            value={errorConnectors}
            status="BUILD"
            href="/admin/connectors"
            accent={errorConnectors > 0 ? colors.status.critical : undefined}
          />
          <MetricCard
            label="Vulnerabilities"
            value="—"
            status="SCAFFOLD"
            href="/vulnerabilities"
          />
          <MetricCard
            label="Exposures"
            value="—"
            status="SCAFFOLD"
            href="/exposure"
          />
          <MetricCard
            label="Control Coverage"
            value="—"
            status="SCAFFOLD"
            href="/controls"
          />
        </div>

        {/* Domain Req 6: Source gaps and next steps */}
        <div
          style={{
            padding: '1rem',
            background: colors.background.elevated,
            border: `1px solid ${colors.border.subtle}`,
            borderRadius: '4px',
            fontSize: '0.8125rem',
            color: colors.text.muted,
          }}
        >
          <strong style={{ color: colors.text.secondary }}>Data Source Status</strong>
          <p style={{ margin: '0.5rem 0 0' }}>
            Displaying seed/mock data. Real connector integration requires Phase 2 approval.
            Scaffold metrics will populate as domain specs are implemented.
          </p>
        </div>
      </div>
    </Shell>
  );
}
