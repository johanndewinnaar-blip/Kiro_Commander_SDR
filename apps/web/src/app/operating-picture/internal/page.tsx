'use client';

import { PageContainer } from '@/components/page-container';
import { primitiveTypeScale } from '../../../../../../packages/ui/src/tokens/primitives';

/**
 * Internal Operating Picture — SCAFFOLD placeholder (Unit 21)
 *
 * Source: Spec #66 Internal Operating Picture; Route Registry (path: /operating-picture/internal)
 * Status: SCAFFOLD — full implementation is Unit 21 (Internal Operating Picture), currently BLOCKED.
 *
 * This placeholder exists so that the Unit 16a Command Centre drill paths resolve to a
 * registered route (gate clarification DEC-unit16a-gate-clarification). It deliberately does
 * NOT implement the internal attack-surface view — that is Unit 21 scope, and the Internal
 * Operating Picture carries enhanced governance (Spec #66 §6) to be defined at v1.4 build time.
 *
 * Boundary: Operational App
 */

export default function InternalOperatingPicturePage() {
  return (
    <PageContainer
      pretitle="Operating Pictures › Internal"
      title="Internal Operating Picture"
      headerActions={<span className="badge bg-secondary">SCAFFOLD</span>}
    >
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <p className="text-muted mb-0" style={{ fontSize: primitiveTypeScale.body }}>
                The Internal Operating Picture (internal attack surface view) is a deferred surface,
                delivered by Unit 21. This scaffold is a registered drill-path target for the
                Command Centre; the full view is not yet built.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
