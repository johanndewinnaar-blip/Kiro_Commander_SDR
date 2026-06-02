'use client';

import { PageContainer } from '@/components/page-container';
import { primitiveTypeScale } from '../../../../../../packages/ui/src/tokens/primitives';

/**
 * External Operating Picture — SCAFFOLD placeholder (Unit 20)
 *
 * Source: Spec #65 External Operating Picture; Route Registry (path: /operating-picture/external)
 * Status: SCAFFOLD — full implementation is Unit 20 (External Operating Picture), currently BLOCKED.
 *
 * This placeholder exists so that the Unit 16a Command Centre drill paths resolve to a
 * registered route (gate clarification DEC-unit16a-gate-clarification). It deliberately does
 * NOT implement the external attack-surface view — that is Unit 20 scope.
 *
 * Boundary: Operational App
 */

export default function ExternalOperatingPicturePage() {
  return (
    <PageContainer
      pretitle="Operating Pictures › External"
      title="External Operating Picture"
      headerActions={<span className="badge bg-secondary">SCAFFOLD</span>}
    >
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <p className="text-muted mb-0" style={{ fontSize: primitiveTypeScale.body }}>
                The External Operating Picture (external attack surface view) is a deferred surface,
                delivered by Unit 20. This scaffold is a registered drill-path target for the
                Command Centre; the full view is not yet built.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
