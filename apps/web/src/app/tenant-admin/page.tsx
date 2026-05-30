import { colors } from '../../../../../packages/ui/src/tokens/colors';
import { typography } from '../../../../../packages/ui/src/tokens/typography';

/**
 * Tenant Admin — Overview Page
 *
 * Boundary: tenant-admin
 * Visual language: Operational App (inherited) per DEC-v1.3.2-tenant-admin-shell-pending-reference
 *
 * NOTE: This page renders inside tenant-admin/layout.tsx, which provides the
 * Tenant Admin chrome (navy sidebar + top bar). It does NOT use the operational
 * PageContainer (DEC-pagecontainer-shared-standard) yet — the full Tabler
 * conversion of the Tenant Admin shell is a separate scoped pass.
 */
export default function TenantAdminOverviewPage() {
  return (
    <div>
      <h1 style={{ fontSize: typography.fontSize.h1, color: colors.operational.ink, marginBottom: '1rem' }}>Tenant Administration</h1>
      <p style={{ color: colors.operational.muted, fontSize: typography.fontSize.base }}>
        Baseline Configuration, Users &amp; Access, Connectors, Rules &amp; Models, AI Configuration, and Audit surfaces.
      </p>
      <p style={{ color: colors.operational.muted, fontSize: typography.fontSize.xs, marginTop: '2rem' }}>
        Status: SCAFFOLD | Visual language provisional pending dedicated Tenant Admin reference HTML.
      </p>
    </div>
  );
}
