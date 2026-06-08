import { describe, it, expect } from 'vitest';
import {
  tagOodaStage,
  tagDeliveryMode,
  resolveLifecycleCheckpoint,
  resolveJourneyId,
} from '../../packages/contracts/src/engines/journey-intelligence';

/**
 * Tagger Engine Unit Tests — Journey Intelligence
 *
 * Source: JI-1.0 §9
 * Domain: D-47 Journey Intelligence
 * Build unit: Unit 51
 */

describe('OODA Stage Tagger', () => {
  it('tags signal.received as observe (deterministic)', () => {
    const result = tagOodaStage('signal.received');
    expect(result).not.toBeNull();
    expect(result!.stage).toBe('observe');
    expect(result!.confidence).toBe('deterministic');
  });

  it('tags connector.sync as observe', () => {
    const result = tagOodaStage('connector.sync');
    expect(result).not.toBeNull();
    expect(result!.stage).toBe('observe');
  });

  it('tags drift.detected as orient', () => {
    const result = tagOodaStage('drift.detected');
    expect(result).not.toBeNull();
    expect(result!.stage).toBe('orient');
  });

  it('tags risk.scored as orient', () => {
    const result = tagOodaStage('risk.scored');
    expect(result).not.toBeNull();
    expect(result!.stage).toBe('orient');
  });

  it('tags correlation.completed as orient', () => {
    const result = tagOodaStage('correlation.completed');
    expect(result).not.toBeNull();
    expect(result!.stage).toBe('orient');
  });

  it('tags case.created as decide', () => {
    const result = tagOodaStage('case.created');
    expect(result).not.toBeNull();
    expect(result!.stage).toBe('decide');
  });

  it('tags case.routed as decide', () => {
    const result = tagOodaStage('case.routed');
    expect(result).not.toBeNull();
    expect(result!.stage).toBe('decide');
  });

  it('tags approval.granted as decide', () => {
    const result = tagOodaStage('approval.granted');
    expect(result).not.toBeNull();
    expect(result!.stage).toBe('decide');
  });

  it('tags action.executed as act', () => {
    const result = tagOodaStage('action.executed');
    expect(result).not.toBeNull();
    expect(result!.stage).toBe('act');
  });

  it('tags validation.passed as act', () => {
    const result = tagOodaStage('validation.passed');
    expect(result).not.toBeNull();
    expect(result!.stage).toBe('act');
  });

  it('tags journey.completed as act', () => {
    const result = tagOodaStage('journey.completed');
    expect(result).not.toBeNull();
    expect(result!.stage).toBe('act');
  });

  it('returns null for unknown actions', () => {
    const result = tagOodaStage('completely.unknown.action');
    expect(result).toBeNull();
  });

  it('uses regex fallback for partial matches (inferred)', () => {
    const result = tagOodaStage('signal.custom_enrichment');
    expect(result).not.toBeNull();
    expect(result!.stage).toBe('observe');
    expect(result!.confidence).toBe('inferred');
  });
});

describe('Delivery Mode Tagger', () => {
  it('tags user actor as manual', () => {
    const result = tagDeliveryMode({
      actorType: 'user',
      action: 'case.created',
      approvalRequired: false,
      policyAuthorised: false,
    });
    expect(result).not.toBeNull();
    expect(result!.mode).toBe('manual');
    expect(result!.confidence).toBe('deterministic');
  });

  it('tags commander-ai actor as ai_enhanced', () => {
    const result = tagDeliveryMode({
      actorType: 'commander-ai',
      action: 'action.executed',
      approvalRequired: false,
      policyAuthorised: false,
    });
    expect(result).not.toBeNull();
    expect(result!.mode).toBe('ai_enhanced');
  });

  it('tags system + approval as human_confirmed_automation', () => {
    const result = tagDeliveryMode({
      actorType: 'system',
      action: 'action.dispatched',
      approvalRequired: true,
      policyAuthorised: false,
    });
    expect(result).not.toBeNull();
    expect(result!.mode).toBe('human_confirmed_automation');
  });

  it('tags system + policy authorised (no approval) as autonomous', () => {
    const result = tagDeliveryMode({
      actorType: 'system',
      action: 'action.executed',
      approvalRequired: false,
      policyAuthorised: true,
    });
    expect(result).not.toBeNull();
    expect(result!.mode).toBe('autonomous');
  });

  it('tags system (default) as system_driven', () => {
    const result = tagDeliveryMode({
      actorType: 'system',
      action: 'signal.received',
      approvalRequired: false,
      policyAuthorised: false,
    });
    expect(result).not.toBeNull();
    expect(result!.mode).toBe('system_driven');
  });

  it('tags connector as system_driven by default', () => {
    const result = tagDeliveryMode({
      actorType: 'connector',
      action: 'connector.sync',
      approvalRequired: false,
      policyAuthorised: false,
    });
    expect(result).not.toBeNull();
    expect(result!.mode).toBe('system_driven');
  });
});

describe('Lifecycle Checkpoint Resolver', () => {
  it('resolves case + case.created → case_created', () => {
    const result = resolveLifecycleCheckpoint({ entityType: 'case', action: 'case.created' });
    expect(result).not.toBeNull();
    expect(result!.checkpoint).toBe('case_created');
    expect(result!.confidence).toBe('deterministic');
  });

  it('resolves action + action.executed → action_executed', () => {
    const result = resolveLifecycleCheckpoint({ entityType: 'action', action: 'action.executed' });
    expect(result).not.toBeNull();
    expect(result!.checkpoint).toBe('action_executed');
  });

  it('resolves signal + signal.received → signal_received', () => {
    const result = resolveLifecycleCheckpoint({ entityType: 'signal', action: 'signal.received' });
    expect(result).not.toBeNull();
    expect(result!.checkpoint).toBe('signal_received');
  });

  it('resolves case + validation.passed → validation_passed', () => {
    const result = resolveLifecycleCheckpoint({ entityType: 'case', action: 'validation.passed' });
    expect(result).not.toBeNull();
    expect(result!.checkpoint).toBe('validation_passed');
  });

  it('resolves finding + drift.detected → drift_detected', () => {
    const result = resolveLifecycleCheckpoint({ entityType: 'finding', action: 'drift.detected' });
    expect(result).not.toBeNull();
    expect(result!.checkpoint).toBe('drift_detected');
  });

  it('returns null for non-checkpoint actions', () => {
    const result = resolveLifecycleCheckpoint({ entityType: 'system', action: 'heartbeat.check' });
    expect(result).toBeNull();
  });

  it('handles push-action entities via regex', () => {
    const result = resolveLifecycleCheckpoint({ entityType: 'push-action', action: 'action.dispatched' });
    expect(result).not.toBeNull();
    expect(result!.checkpoint).toBe('action_dispatched');
  });
});

describe('Journey ID Resolver', () => {
  it('resolves case entity to journey-case-{id}', () => {
    const result = resolveJourneyId({ entityType: 'case', entityId: 'case-0001' });
    expect(result).not.toBeNull();
    expect(result!.journeyId).toBe('journey-case-case-0001');
    expect(result!.anchorType).toBe('case');
    expect(result!.parentJourneyId).toBeNull();
  });

  it('resolves ioc-match entity to journey-ioc-{id}', () => {
    const result = resolveJourneyId({ entityType: 'ioc-match', entityId: 'match-001' });
    expect(result).not.toBeNull();
    expect(result!.journeyId).toBe('journey-ioc-match-001');
    expect(result!.anchorType).toBe('ioc_match');
  });

  it('resolves war-room entity to journey-warroom-{id}', () => {
    const result = resolveJourneyId({ entityType: 'war-room', entityId: 'wr-001' });
    expect(result).not.toBeNull();
    expect(result!.journeyId).toBe('journey-warroom-wr-001');
    expect(result!.anchorType).toBe('war_room');
  });

  it('resolves parent journey when parent context provided', () => {
    const result = resolveJourneyId({
      entityType: 'action',
      entityId: 'action-001',
      parentEntityType: 'case',
      parentEntityId: 'case-0001',
    });
    expect(result).not.toBeNull();
    expect(result!.journeyId).toBe('journey-push-action-001');
    expect(result!.parentJourneyId).toBe('journey-case-case-0001');
  });

  it('produces deterministic output (same input = same output)', () => {
    const result1 = resolveJourneyId({ entityType: 'case', entityId: 'case-xyz' });
    const result2 = resolveJourneyId({ entityType: 'case', entityId: 'case-xyz' });
    expect(result1).toEqual(result2);
  });

  it('returns null for unmapped entity types', () => {
    const result = resolveJourneyId({ entityType: 'unknown-entity', entityId: 'x' });
    expect(result).toBeNull();
  });
});
