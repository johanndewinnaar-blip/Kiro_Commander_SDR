import { describe, it, expect } from 'vitest';
import { validateJourney, deriveJourneyId } from '../../packages/contracts/src/entities/journey';
import { validateJourneyTemplate } from '../../packages/contracts/src/entities/journey-template';
import { seedJourneys } from '../../packages/contracts/src/fixtures/seed-journeys';
import { seedJourneyTemplates } from '../../packages/contracts/src/fixtures/seed-journey-templates';
import type { Journey } from '../../packages/contracts/src/entities/journey';
import { SEED_TENANT, SEED_SOURCE } from '../../packages/contracts/src/fixtures/seed-tenant';

/**
 * Entity Validation Unit Tests — Journey Intelligence
 *
 * Source: JI-1.0 §5.2, §5.3
 * Domain: D-47 Journey Intelligence
 * Build unit: Unit 51
 */

describe('Journey Entity Validation', () => {
  describe('validateJourney', () => {
    it('accepts all seed journey fixtures', () => {
      for (const journey of seedJourneys) {
        const result = validateJourney(journey);
        expect(result.valid, `Journey ${journey.id} failed: ${result.errors.join(', ')}`).toBe(true);
      }
    });

    it('rejects journey with missing required fields', () => {
      const invalid = {
        id: '',
        entityType: 'journey' as const,
        tenant: SEED_TENANT,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
        source: SEED_SOURCE,
        journeyId: '',
        templateRef: null,
        anchorType: 'case' as const,
        anchorId: 'test',
        parentJourneyId: null,
        currentPhase: 'observe' as const,
        currentCheckpoint: 'signal_received' as const,
        status: 'active' as const,
        outcome: 'pending' as const,
        startedAt: '2026-01-01T00:00:00.000Z',
        completedAt: null,
        deliveryMode: 'system_driven' as const,
        reworkCount: 0,
        childCount: 0,
      };
      const result = validateJourney(invalid);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('id is required');
    });

    it('rejects outcome change from terminal value', () => {
      const journey = seedJourneys.find(j => j.outcome === 'successful')!;
      const result = validateJourney(journey, 'successful');
      expect(result.valid).toBe(true); // Same value is OK

      const modified = { ...journey, outcome: 'failed' as const };
      const result2 = validateJourney(modified, 'successful');
      expect(result2.valid).toBe(false);
      expect(result2.errors[0]).toContain('cannot change from terminal');
    });

    it('requires completedAt when status is completed', () => {
      const journey: Journey = {
        id: 'test-001',
        entityType: 'journey',
        tenant: SEED_TENANT,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
        source: SEED_SOURCE,
        journeyId: deriveJourneyId('case', 'test-001'),
        templateRef: null,
        anchorType: 'case',
        anchorId: 'test-001',
        parentJourneyId: null,
        currentPhase: 'act',
        currentCheckpoint: 'journey_completed',
        status: 'completed',
        outcome: 'successful',
        startedAt: '2026-01-01T00:00:00.000Z',
        completedAt: null, // Missing!
        deliveryMode: 'system_driven',
        reworkCount: 0,
        childCount: 0,
      };
      const result = validateJourney(journey);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('completedAt is required when status is completed or abandoned');
    });

    it('validates journeyId matches derivation pattern', () => {
      const journey: Journey = {
        id: 'test-002',
        entityType: 'journey',
        tenant: SEED_TENANT,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
        source: SEED_SOURCE,
        journeyId: 'wrong-id-format',
        templateRef: null,
        anchorType: 'case',
        anchorId: 'case-999',
        parentJourneyId: null,
        currentPhase: 'observe',
        currentCheckpoint: 'signal_received',
        status: 'active',
        outcome: 'pending',
        startedAt: '2026-01-01T00:00:00.000Z',
        completedAt: null,
        deliveryMode: 'system_driven',
        reworkCount: 0,
        childCount: 0,
      };
      const result = validateJourney(journey);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('does not match expected derivation');
    });

    it('rejects negative reworkCount', () => {
      const journey: Journey = {
        id: 'test-003',
        entityType: 'journey',
        tenant: SEED_TENANT,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
        source: SEED_SOURCE,
        journeyId: deriveJourneyId('case', 'test-003'),
        templateRef: null,
        anchorType: 'case',
        anchorId: 'test-003',
        parentJourneyId: null,
        currentPhase: 'observe',
        currentCheckpoint: 'signal_received',
        status: 'active',
        outcome: 'pending',
        startedAt: '2026-01-01T00:00:00.000Z',
        completedAt: null,
        deliveryMode: 'system_driven',
        reworkCount: -1,
        childCount: 0,
      };
      const result = validateJourney(journey);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('reworkCount must be a non-negative integer');
    });
  });

  describe('deriveJourneyId', () => {
    it('derives case journey ID correctly', () => {
      expect(deriveJourneyId('case', 'case-0001')).toBe('journey-case-case-0001');
    });

    it('derives ioc_match journey ID with slug mapping', () => {
      expect(deriveJourneyId('ioc_match', 'match-001')).toBe('journey-ioc-match-001');
    });

    it('derives war_room journey ID correctly', () => {
      expect(deriveJourneyId('war_room', 'wr-001')).toBe('journey-warroom-wr-001');
    });

    it('derives push_action journey ID correctly', () => {
      expect(deriveJourneyId('push_action', 'push-001')).toBe('journey-push-push-001');
    });
  });
});

describe('JourneyTemplate Entity Validation', () => {
  describe('validateJourneyTemplate', () => {
    it('accepts all seed template fixtures', () => {
      for (const template of seedJourneyTemplates) {
        const result = validateJourneyTemplate(template);
        expect(result.valid, `Template ${template.templateId} failed: ${result.errors.join(', ')}`).toBe(true);
      }
    });

    it('confirms 33 templates total', () => {
      expect(seedJourneyTemplates).toHaveLength(33);
    });

    it('rejects template with empty expectedCheckpoints', () => {
      const invalid = {
        ...seedJourneyTemplates[0],
        id: 'test-invalid',
        expectedCheckpoints: [],
      };
      const result = validateJourneyTemplate(invalid);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('expectedCheckpoints must be a non-empty array');
    });

    it('rejects template with zero leakageThresholdHours', () => {
      const invalid = {
        ...seedJourneyTemplates[0],
        id: 'test-invalid',
        leakageThresholdHours: 0,
      };
      const result = validateJourneyTemplate(invalid);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('leakageThresholdHours must be greater than 0');
    });

    it('rejects template with missing name', () => {
      const invalid = {
        ...seedJourneyTemplates[0],
        id: 'test-invalid',
        name: '',
      };
      const result = validateJourneyTemplate(invalid);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('name is required');
    });

    it('verifies all anchor types represented in templates', () => {
      const anchorTypes = new Set(seedJourneyTemplates.map(t => t.anchorType));
      expect(anchorTypes.has('case')).toBe(true);
      expect(anchorTypes.has('finding')).toBe(true);
      expect(anchorTypes.has('ioc_match')).toBe(true);
      expect(anchorTypes.has('mission')).toBe(true);
      expect(anchorTypes.has('strategy_policy')).toBe(true);
      expect(anchorTypes.has('inbound_signal')).toBe(true);
      expect(anchorTypes.has('push_action')).toBe(true);
      expect(anchorTypes.has('war_room')).toBe(true);
    });
  });
});
