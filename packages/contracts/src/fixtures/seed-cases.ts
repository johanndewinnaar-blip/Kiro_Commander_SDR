/**
 * Seed Cases — Commander SDR Test Fixtures
 *
 * Synthetic case data conforming to canonical entity shape.
 * Source: Spec #08 Case Management, Spec #17 Closed-Loop Control
 * Domain Requirement 3: Cases include lifecycle, owner, SLA, surface attribution, audit
 *
 * CRITICAL: All cases are system-created via routing engine.
 * No manual case creation (Doctrinal Assertion 1).
 */

import type { Case } from '../entities/case';
import { SEED_TENANT, SEED_SOURCE, seedId } from './seed-tenant';

export const seedCases: Case[] = [
  {
    id: seedId('case', 1),
    entityType: 'case',
    tenant: SEED_TENANT,
    createdAt: '2026-01-16T08:30:00.000Z',
    updatedAt: '2026-01-16T14:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-case-001', sourceSystem: 'commander-routing-engine' },
    caseRef: 'CASE-2026-0001',
    caseType: 'vulnerability-drift',
    title: 'Critical CVE-2026-1234 unpatched on PROD-WEB-01',
    status: 'in-progress',
    priority: 'P1',
    owner: 'Alice Security-Analyst',
    team: 'Security Operations',
    sla: { targetResolutionHours: 24, breached: false },
    surfaceAttribution: 'external_attack_surface',
    relatedEntities: [seedId('asset', 1)],
    auditTrailRef: 'audit/case/CASE-2026-0001',
    routingRationale: 'Routed to Security Operations based on asset criticality (5) and external surface attribution. Team affinity: vulnerability-drift.',
  },
  {
    id: seedId('case', 2),
    entityType: 'case',
    tenant: SEED_TENANT,
    createdAt: '2026-01-17T10:00:00.000Z',
    updatedAt: '2026-01-17T10:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-case-002', sourceSystem: 'commander-routing-engine' },
    caseRef: 'CASE-2026-0002',
    caseType: 'configuration-drift',
    title: 'MFA policy disabled for svc-backup-agent',
    status: 'open',
    priority: 'P2',
    owner: 'Platform Engineering Lead',
    team: 'Platform Engineering',
    sla: { targetResolutionHours: 48, breached: false },
    surfaceAttribution: 'internal_attack_surface',
    relatedEntities: [seedId('identity', 2), seedId('asset', 3)],
    auditTrailRef: 'audit/case/CASE-2026-0002',
    routingRationale: 'Routed to Platform Engineering based on service account ownership and configuration-drift case type.',
  },
  {
    id: seedId('case', 3),
    entityType: 'case',
    tenant: SEED_TENANT,
    createdAt: '2026-01-18T06:00:00.000Z',
    updatedAt: '2026-01-18T06:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-case-003', sourceSystem: 'commander-routing-engine' },
    caseRef: 'CASE-2026-0003',
    caseType: 'external-attack-correlation',
    title: 'P0: Active exploitation of CVE-2026-9999 detected',
    status: 'open',
    priority: 'P0',
    owner: 'CISO',
    team: 'Security Leadership',
    sla: { targetResolutionHours: 4, breached: false },
    surfaceAttribution: 'external_attack_surface',
    relatedEntities: [seedId('asset', 1)],
    auditTrailRef: 'audit/case/CASE-2026-0003',
    routingRationale: 'P0 zero-day condition. Escalated to CISO per P0 priority overlay. War-room activation required.',
  },
];
