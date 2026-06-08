/**
 * Audit Event Entity — Commander SDR Canonical Model
 *
 * Source: Spec #05 §6.4.5 AuditEntry
 * v1.3 Requirement 6: Audit fixture completeness
 * v1.3 Requirement 15 (Spec 00): Audit-first operation
 */

import type { CommonFields } from './common';
import type { OodaStage, DeliveryMode, LifecycleCheckpoint } from './journey-enums';

export interface AuditEvent extends CommonFields {
  entityType: 'audit-event';
  /** Actor who performed the action */
  actor: AuditActor;
  /** Action performed */
  action: string;
  /** Entity reference (what was acted upon) */
  entityRef: {
    entityType: string;
    entityId: string;
  };
  /** Source signal that triggered this event */
  sourceSignal: string | null;
  /** Prior state (if applicable) */
  priorState: Record<string, unknown> | null;
  /** New state (if applicable) */
  newState: Record<string, unknown> | null;
  /** Machine-readable rationale */
  rationale: string;
  /** Whether this is an immutable audit record */
  immutable: true;

  // ─── Journey Intelligence Extension (JI-1.0 §5.4) ───────────────────────
  /** OODA stage attribution (computed by tagger engine at write-time) */
  oodaStage?: OodaStage;
  /** Delivery mode classification (computed by tagger engine at write-time) */
  deliveryMode?: DeliveryMode;
  /** Lifecycle checkpoint (computed by tagger engine at write-time) */
  lifecycleCheckpoint?: LifecycleCheckpoint;
  /** Journey ID this event belongs to (deterministic derivation) */
  journeyId?: string;
  /** Parent journey ID (for child journey events) */
  parentJourneyId?: string;
}

export interface AuditActor {
  type: 'system' | 'user' | 'connector' | 'commander-ai';
  id: string;
  name: string;
}
