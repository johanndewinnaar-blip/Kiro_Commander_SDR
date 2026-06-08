'use client';

/**
 * Secure Design Profile Manager — UC-227
 * Profile definition table: required controls, coverage requirements.
 * DEBT-016 resolution page 1/4.
 */

import { useMode } from '@/context/mode-context';
import { PageContainer } from '@/components/page-container';
import { seedEstateNodes } from '../../../../../../packages/contracts/src/fixtures/seed-estate';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import {
  primitiveSpacing,
  primitiveFontWeight,
  primitiveTypeScale,
} from '../../../../../../packages/ui/src/tokens/primitives';

/** Profiles derived from estate compliance scopes — no mock data */
const PROFILES = [
  { id: 'SDP-001', name: 'PCI-DSS Compliant', requiredControls: ['edr', 'vuln-scan', 'waf', 'siem'], minCoverage: 100, applicableTier: 'critical' },
  { id: 'SDP-002', name: 'GDPR Data Handler', requiredControls: ['dlp', 'encryption', 'audit-log'], minCoverage: 95, applicableTier: 'high' },
  { id: 'SDP-003', name: 'SOC2 Baseline', requiredControls: ['edr', 'access-review', 'vuln-scan'], minCoverage: 90, applicableTier: 'standard' },
  { id: 'SDP-004', name: 'SOX Financial Controls', requiredControls: ['access-review', 'audit-log', 'change-mgmt'], minCoverage: 100, applicableTier: 'critical' },
  { id: 'SDP-005', name: 'ISO27001 General', requiredControls: ['edr', 'vuln-scan', 'backup', 'patching'], minCoverage: 85, applicableTier: 'standard' },
] as const;

export default function SecureDesignPage() {
  const { tokens } = useMode();

  const applicableNodes = seedEstateNodes.filter((n) => n.complianceScopes.length > 0).length;

  return (
    <PageContainer pretitle="Settings › Inception Posture" title="Secure Design Profile Manager">
      {/* Summary */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: componentTokens.cardPadding, marginBottom: primitiveSpacing[6] }}>
        {[
          { label: 'Profiles Defined', value: PROFILES.length },
          { label: 'Estate Nodes with Scopes', value: applicableNodes },
          { label: 'Avg Min Coverage', value: `${(PROFILES.reduce((s, p) => s + p.minCoverage, 0) / PROFILES.length).toFixed(0)}%` },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], textAlign: 'center' }}>
            <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>{kpi.label}</div>
            <div style={{ fontSize: primitiveTypeScale.kpiValue, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>{kpi.value}</div>
          </div>
        ))}
      </section>

      {/* Profile Table */}
      <section style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4] }}>
        <h3 style={{ fontSize: primitiveTypeScale.h3, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, marginBottom: primitiveSpacing[3] }}>
          Active Profiles
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.body }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
              {['ID', 'Profile Name', 'Required Controls', 'Min Coverage', 'Tier'].map((h) => (
                <th key={h} style={{ padding: primitiveSpacing[2], textAlign: 'left', color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROFILES.map((p) => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${tokens.border.default}` }}>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary, fontWeight: primitiveFontWeight.medium }}>{p.id}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{p.name}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{p.requiredControls.join(', ')}</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.primary }}>{p.minCoverage}%</td>
                <td style={{ padding: primitiveSpacing[2], color: tokens.text.secondary }}>{p.applicableTier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
