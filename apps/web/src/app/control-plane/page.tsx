import { colors } from '../../../../../packages/ui/src/tokens/colors';
import { typography } from '../../../../../packages/ui/src/tokens/typography';

/**
 * Commercial Control Plane — Command Overview
 *
 * Source: commander-commercial-control-plane-shell-v3-admin-navigation.html
 * Boundary: control-plane (internal Seiertech application)
 *
 * NOTE: This page renders inside control-plane/layout.tsx, which provides the
 * Control Plane's own dark/gold chrome AND its page-header. It does NOT use the
 * operational PageContainer (DEC-pagecontainer-shared-standard) yet — the full
 * Tabler conversion of the Control Plane shell is a separate scoped pass.
 */
export default function ControlPlaneOverviewPage() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
      <div style={{ border: `1px solid ${colors.controlPlane.line}`, background: colors.controlPlane.panel, padding: '18px', minHeight: '120px' }}>
        <h3 style={{ margin: '0 0 10px', color: colors.controlPlane.text, textTransform: 'uppercase', fontSize: typography.fontSize.base, letterSpacing: typography.letterSpacing.eyebrow }}>Commercial Authority</h3>
        <p style={{ color: colors.controlPlane.muted, margin: 0, lineHeight: typography.lineHeight.normal }}>Customers, tenants, licences, entitlements, module allocation and feature flags are controlled here.</p>
      </div>
      <div style={{ border: `1px solid ${colors.controlPlane.line}`, background: colors.controlPlane.panel, padding: '18px', minHeight: '120px' }}>
        <h3 style={{ margin: '0 0 10px', color: colors.controlPlane.text, textTransform: 'uppercase', fontSize: typography.fontSize.base, letterSpacing: typography.letterSpacing.eyebrow }}>Rule / Model Packs</h3>
        <p style={{ color: colors.controlPlane.muted, margin: 0, lineHeight: typography.lineHeight.normal }}>Platform rule packs, model packs and baseline profiles are owned and versioned here.</p>
      </div>
      <div style={{ border: `1px solid ${colors.controlPlane.line}`, background: colors.controlPlane.panel, padding: '18px', minHeight: '120px' }}>
        <h3 style={{ margin: '0 0 10px', color: colors.controlPlane.text, textTransform: 'uppercase', fontSize: typography.fontSize.base, letterSpacing: typography.letterSpacing.eyebrow }}>Deployment Rings</h3>
        <p style={{ color: colors.controlPlane.muted, margin: 0, lineHeight: typography.lineHeight.normal }}>Release eligibility, tenant versions, rollback state and support access are governed separately from tenant runtime.</p>
      </div>
    </div>
  );
}
