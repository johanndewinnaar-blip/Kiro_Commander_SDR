/**
 * Seed Journeys — Commander SDR Test Fixtures
 *
 * Source: docs/00_authority/JOURNEY_INTELLIGENCE.md (JI-1.0) §5.2
 * Domain: D-47 Journey Intelligence
 * Build unit: Unit 51
 *
 * 8 seed journeys covering:
 * - Multiple anchor types (case, finding, ioc_match, push_action, war_room)
 * - Multiple statuses (active, completed, stalled, reworking)
 * - Multiple outcomes (pending, successful, partially_successful, failed)
 * - Parent/child relationship (child journey with parentJourneyId)
 * - Multiple delivery modes
 */

import type { Journey } from '../entities/journey';
import { deriveJourneyId } from '../entities/journey';
import { SEED_TENANT, SEED_SOURCE, seedId } from './seed-tenant';

export const seedJourneys: Journey[] = [
  // ─── 1. Active case journey (drift case, system_driven) ──────────────────
  {
    id: seedId('journey', 1),
    entityType: 'journey',
    tenant: SEED_TENANT,
    createdAt: '2026-02-01T08:00:00.000Z',
    updatedAt: '2026-02-01T10:30:00.000Z',
    source: { ...SEED_SOURCE, sourceSystem: 'commander-journey-engine' },
    journeyId: deriveJourneyId('case', 'case-0001'),
    templateRef: 'JT-CASE-001',
    anchorType: 'case',
    anchorId: 'case-0001',
    parentJourneyId: null,
    currentPhase: 'decide',
    currentCheckpoint: 'action_decomposed',
    status: 'active',
    outcome: 'pending',
    startedAt: '2026-02-01T08:00:00.000Z',
    completedAt: null,
    deliveryMode: 'system_driven',
    reworkCount: 0,
    childCount: 2,
  },

  // ─── 2. Completed case journey (vulnerability, successful) ─────────────────
  {
    id: seedId('journey', 2),
    entityType: 'journey',
    tenant: SEED_TENANT,
    createdAt: '2026-01-20T06:00:00.000Z',
    updatedAt: '2026-01-20T18:45:00.000Z',
    source: { ...SEED_SOURCE, sourceSystem: 'commander-journey-engine' },
    journeyId: deriveJourneyId('case', 'case-0002'),
    templateRef: 'JT-CASE-002',
    anchorType: 'case',
    anchorId: 'case-0002',
    parentJourneyId: null,
    currentPhase: 'act',
    currentCheckpoint: 'journey_completed',
    status: 'completed',
    outcome: 'successful',
    startedAt: '2026-01-20T06:00:00.000Z',
    completedAt: '2026-01-20T18:45:00.000Z',
    deliveryMode: 'human_confirmed_automation',
    reworkCount: 0,
    childCount: 1,
  },

  // ─── 3. Stalled finding journey (enrichment) ──────────────────────────────
  {
    id: seedId('journey', 3),
    entityType: 'journey',
    tenant: SEED_TENANT,
    createdAt: '2026-01-25T14:00:00.000Z',
    updatedAt: '2026-01-28T09:00:00.000Z',
    source: { ...SEED_SOURCE, sourceSystem: 'commander-journey-engine' },
    journeyId: deriveJourneyId('finding', 'finding-0001'),
    templateRef: null,
    anchorType: 'finding',
    anchorId: 'finding-0001',
    parentJourneyId: null,
    currentPhase: 'orient',
    currentCheckpoint: 'drift_detected',
    status: 'stalled',
    outcome: 'pending',
    startedAt: '2026-01-25T14:00:00.000Z',
    completedAt: null,
    deliveryMode: 'system_driven',
    reworkCount: 0,
    childCount: 0,
  },

  // ─── 4. Child journey (action under case-0001, human_confirmed_automation) ─
  {
    id: seedId('journey', 4),
    entityType: 'journey',
    tenant: SEED_TENANT,
    createdAt: '2026-02-01T09:15:00.000Z',
    updatedAt: '2026-02-01T10:00:00.000Z',
    source: { ...SEED_SOURCE, sourceSystem: 'commander-journey-engine' },
    journeyId: deriveJourneyId('push_action', 'push-0001'),
    templateRef: 'JT-ACT-001',
    anchorType: 'push_action',
    anchorId: 'push-0001',
    parentJourneyId: deriveJourneyId('case', 'case-0001'),
    currentPhase: 'act',
    currentCheckpoint: 'action_executed',
    status: 'completed',
    outcome: 'successful',
    startedAt: '2026-02-01T09:15:00.000Z',
    completedAt: '2026-02-01T10:00:00.000Z',
    deliveryMode: 'human_confirmed_automation',
    reworkCount: 0,
    childCount: 0,
  },

  // ─── 5. IOC match journey (ai_enhanced, active) ───────────────────────────
  {
    id: seedId('journey', 5),
    entityType: 'journey',
    tenant: SEED_TENANT,
    createdAt: '2026-02-02T07:30:00.000Z',
    updatedAt: '2026-02-02T08:15:00.000Z',
    source: { ...SEED_SOURCE, sourceSystem: 'commander-journey-engine' },
    journeyId: deriveJourneyId('ioc_match', 'ioc-match-0001'),
    templateRef: 'JT-ENR-001',
    anchorType: 'ioc_match',
    anchorId: 'ioc-match-0001',
    parentJourneyId: null,
    currentPhase: 'orient',
    currentCheckpoint: 'correlation_completed',
    status: 'active',
    outcome: 'pending',
    startedAt: '2026-02-02T07:30:00.000Z',
    completedAt: null,
    deliveryMode: 'ai_enhanced',
    reworkCount: 0,
    childCount: 0,
  },

  // ─── 6. Reworking journey (case, partially_successful then rework) ─────────
  {
    id: seedId('journey', 6),
    entityType: 'journey',
    tenant: SEED_TENANT,
    createdAt: '2026-01-18T10:00:00.000Z',
    updatedAt: '2026-01-22T16:00:00.000Z',
    source: { ...SEED_SOURCE, sourceSystem: 'commander-journey-engine' },
    journeyId: deriveJourneyId('case', 'case-0003'),
    templateRef: 'JT-CASE-003',
    anchorType: 'case',
    anchorId: 'case-0003',
    parentJourneyId: null,
    currentPhase: 'act',
    currentCheckpoint: 'validation_failed',
    status: 'reworking',
    outcome: 'pending',
    startedAt: '2026-01-18T10:00:00.000Z',
    completedAt: null,
    deliveryMode: 'manual',
    reworkCount: 1,
    childCount: 0,
  },

  // ─── 7. War room journey (autonomous, completed) ──────────────────────────
  {
    id: seedId('journey', 7),
    entityType: 'journey',
    tenant: SEED_TENANT,
    createdAt: '2026-01-30T03:00:00.000Z',
    updatedAt: '2026-01-30T04:30:00.000Z',
    source: { ...SEED_SOURCE, sourceSystem: 'commander-journey-engine' },
    journeyId: deriveJourneyId('war_room', 'warroom-0001'),
    templateRef: 'JT-WAR-001',
    anchorType: 'war_room',
    anchorId: 'warroom-0001',
    parentJourneyId: null,
    currentPhase: 'act',
    currentCheckpoint: 'journey_completed',
    status: 'completed',
    outcome: 'successful',
    startedAt: '2026-01-30T03:00:00.000Z',
    completedAt: '2026-01-30T04:30:00.000Z',
    deliveryMode: 'autonomous',
    reworkCount: 0,
    childCount: 0,
  },

  // ─── 8. Abandoned case journey (failed outcome) ───────────────────────────
  {
    id: seedId('journey', 8),
    entityType: 'journey',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T12:00:00.000Z',
    updatedAt: '2026-01-17T08:00:00.000Z',
    source: { ...SEED_SOURCE, sourceSystem: 'commander-journey-engine' },
    journeyId: deriveJourneyId('case', 'case-0004'),
    templateRef: 'JT-CASE-008',
    anchorType: 'case',
    anchorId: 'case-0004',
    parentJourneyId: null,
    currentPhase: 'act',
    currentCheckpoint: 'journey_abandoned',
    status: 'abandoned',
    outcome: 'failed',
    startedAt: '2026-01-15T12:00:00.000Z',
    completedAt: '2026-01-17T08:00:00.000Z',
    deliveryMode: 'manual',
    reworkCount: 0,
    childCount: 0,
  },
];
