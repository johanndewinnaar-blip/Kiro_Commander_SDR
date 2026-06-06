'use client';

import { PageContainer } from '@/components/page-container';
import { COMMANDER_MODES, REFUSAL_TRIGGERS } from '../../../../../packages/contracts/src/engines/commander-ai-core';
import { primitiveTypeScale, primitiveSignal } from '../../../../../packages/ui/src/tokens/primitives';

/**
 * Commander AI — Status Overview
 *
 * Source: Unit 40 (Commander AI Core)
 * Data: commander-ai-core engine (modes, grounding rules, refusal triggers)
 * Route: /commander-ai | Nav Group: Platform
 *
 * Displays: Commander AI modes, grounding status, refusal triggers, phase status.
 * Phase 1: Deterministic grounding pipeline. No live model inference.
 */

export default function CommanderAiPage() {
  return (
    <PageContainer
      pretitle="Platform › Commander AI"
      title="Commander AI"
      headerActions={<span className="badge bg-green-lt">Grounding Pipeline Active</span>}
    >
      {/* Status Banner */}
      <div className="card mb-3">
        <div className="card-body d-flex align-items-center justify-content-between">
          <div>
            <h3 className="mb-1">Phase 1 — Deterministic Grounding Core</h3>
            <p className="text-muted mb-0" style={{ fontSize: primitiveTypeScale.body }}>
              Commander AI operates as a grounding + refusal pipeline. No live model inference.
              Model integration (Bedrock Agent/Converse) is Phase 2 scope.
            </p>
          </div>
          <span className="badge bg-blue-lt">Unit 40 — DONE</span>
        </div>
      </div>

      <div className="row row-deck row-cards mb-3">
        {/* Modes */}
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header"><h3 className="card-title">Commander Modes (Spec #13 §4)</h3></div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-vcenter card-table">
                  <thead><tr><th>Mode</th><th>Purpose</th><th>Status</th></tr></thead>
                  <tbody>
                    {COMMANDER_MODES.map((mode) => (
                      <tr key={mode.id}>
                        <td style={{ fontWeight: 600, fontSize: primitiveTypeScale.body }}>{mode.label}</td>
                        <td className="text-muted" style={{ fontSize: primitiveTypeScale.caption }}>{mode.description}</td>
                        <td><span className="badge bg-green-lt">Grounding Ready</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Refusal Triggers */}
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header"><h3 className="card-title">Refusal Triggers</h3></div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-vcenter card-table">
                  <thead><tr><th>Trigger</th><th>Action</th></tr></thead>
                  <tbody>
                    {REFUSAL_TRIGGERS.map((trigger) => (
                      <tr key={trigger.id}>
                        <td style={{ fontSize: primitiveTypeScale.body }}>{trigger.label}</td>
                        <td><span className="badge bg-red-lt">Refuse</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="card mb-3">
        <div className="card-header"><h3 className="card-title">Capability Status</h3></div>
        <div className="card-body">
          <div className="row g-3">
            <CapabilityItem label="Grounding Pipeline" status="active" description="Validates all AI references against Commander-owned data" />
            <CapabilityItem label="Refusal Engine" status="active" description="Refuses estate-fact invention, unauthorised writes, authority override" />
            <CapabilityItem label="Execution Records" status="active" description="Every AI invocation produces a traceable audit record" />
            <CapabilityItem label="Bedrock Agent Integration" status="phase2" description="AWS Bedrock Agent Runtime — Phase 2 evaluation lane" />
            <CapabilityItem label="Bedrock Converse Integration" status="phase2" description="AWS Bedrock Converse API — Phase 2 evaluation lane" />
            <CapabilityItem label="RAG / Knowledge Base" status="deferred" description="Retrieval-augmented generation — deferred to Phase 2+" />
          </div>
        </div>
      </div>

      {/* AI Placement */}
      {/* AI-PLACEMENT: AICAP-001 — Commander AI self-status: explain grounding pipeline health, model readiness, and Phase 2 prerequisites */}
    </PageContainer>
  );
}

function CapabilityItem({ label, status, description }: { label: string; status: 'active' | 'phase2' | 'deferred'; description: string }) {
  const badges = {
    active: { cls: 'bg-green-lt', text: 'Active' },
    phase2: { cls: 'bg-blue-lt', text: 'Phase 2' },
    deferred: { cls: 'bg-secondary', text: 'Deferred' },
  };
  const b = badges[status];
  return (
    <div className="col-sm-6 col-lg-4">
      <div className="d-flex align-items-start gap-2">
        <span className={`badge ${b.cls}`}>{b.text}</span>
        <div>
          <div style={{ fontWeight: 600, fontSize: primitiveTypeScale.body }}>{label}</div>
          <div className="text-muted" style={{ fontSize: primitiveTypeScale.caption }}>{description}</div>
        </div>
      </div>
    </div>
  );
}
