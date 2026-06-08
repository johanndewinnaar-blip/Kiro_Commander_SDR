/**
 * Seed Journey Templates — Commander SDR Test Fixtures
 *
 * Source: docs/00_authority/JOURNEY_INTELLIGENCE.md (JI-1.0) §6
 * Domain: D-47 Journey Intelligence
 * Build unit: Unit 51
 *
 * 33 templates across 6 categories:
 * - 4 Signal Intake (JT-SIG-001..004)
 * - 3 Enrichment (JT-ENR-001..003)
 * - 12 Case Lifecycle (JT-CASE-001..012)
 * - 6 Action/Execution (JT-ACT-001..006)
 * - 5 Strategic/Operational (JT-MIS-001, JT-WAR-001, JT-STR-001..002, JT-GOV-001)
 * - 3 Control/Posture (JT-CTL-001..002, JT-AUT-001)
 */

import type { JourneyTemplate } from '../entities/journey-template';
import { SEED_TENANT, SEED_SOURCE, seedId } from './seed-tenant';

const BASE_SOURCE = { ...SEED_SOURCE, sourceSystem: 'commander-journey-engine' };
const BASE_FORMULAS = ['journey-quality', 'journey-complexity', 'journey-economics', 'lifecycle-savings', 'journey-confidence', 'leakage-risk', 'rework-risk'];

function template(
  index: number,
  templateId: string,
  name: string,
  anchorType: JourneyTemplate['anchorType'],
  parentAnchorType: JourneyTemplate['parentAnchorType'],
  applicability: JourneyTemplate['applicability'],
  expectedCheckpoints: JourneyTemplate['expectedCheckpoints'],
  expectedPhases: JourneyTemplate['expectedPhases'],
  expectedDeliveryModes: JourneyTemplate['expectedDeliveryModes'],
  expectedOutcomeDistribution: JourneyTemplate['expectedOutcomeDistribution'],
  tempoThresholds: JourneyTemplate['tempoThresholds'],
  leakageThresholdHours: number,
  formulaRefs: string[] = BASE_FORMULAS,
): JourneyTemplate {
  return {
    id: seedId('jt', index),
    entityType: 'journey-template',
    tenant: SEED_TENANT,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z',
    source: BASE_SOURCE,
    templateId,
    name,
    anchorType,
    parentAnchorType,
    applicability,
    expectedCheckpoints,
    expectedPhases,
    expectedDeliveryModes,
    expectedOutcomeDistribution,
    tempoThresholds,
    leakageThresholdHours,
    formulaRefs,
    version: '1.0.0',
    status: 'active',
  };
}

export const seedJourneyTemplates: JourneyTemplate[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // Signal Intake Journeys (4)
  // ═══════════════════════════════════════════════════════════════════════════

  template(1, 'JT-SIG-001', 'IOC Email Intake', 'inbound_signal', null,
    { anchorSubtype: 'email-ioc' },
    ['signal_received', 'signal_normalised', 'signal_enriched', 'context_established', 'case_created'],
    ['observe', 'orient', 'decide'],
    ['system_driven'],
    { successful: 0.85, partially_successful: 0.05, failed: 0.05, cancelled: 0.05 },
    { observe: 1, orient: 2, decide: 4 },
    12,
  ),

  template(2, 'JT-SIG-002', 'IOC Feed Intake', 'inbound_signal', null,
    { anchorSubtype: 'feed-ioc' },
    ['signal_received', 'signal_normalised', 'signal_enriched', 'correlation_completed'],
    ['observe', 'orient'],
    ['system_driven'],
    { successful: 0.90, partially_successful: 0.05, failed: 0.03, cancelled: 0.02 },
    { observe: 0.5, orient: 1 },
    4,
  ),

  template(3, 'JT-SIG-003', 'Vulnerability Intelligence Intake', 'inbound_signal', null,
    { anchorSubtype: 'vulnerability' },
    ['signal_received', 'signal_normalised', 'signal_enriched', 'context_established', 'risk_scored', 'case_created'],
    ['observe', 'orient', 'decide'],
    ['system_driven'],
    { successful: 0.80, partially_successful: 0.10, failed: 0.05, cancelled: 0.05 },
    { observe: 1, orient: 4, decide: 8 },
    24,
  ),

  template(4, 'JT-SIG-004', 'Connector Signal Intake (A/B/C)', 'inbound_signal', null,
    { anchorSubtype: 'connector-signal' },
    ['signal_received', 'signal_normalised', 'connector_pulled'],
    ['observe'],
    ['system_driven'],
    { successful: 0.95, failed: 0.03, cancelled: 0.02 },
    { observe: 0.25 },
    2,
  ),

  // ═══════════════════════════════════════════════════════════════════════════
  // Enrichment and Evaluation Journeys (3)
  // ═══════════════════════════════════════════════════════════════════════════

  template(5, 'JT-ENR-001', 'IOC Enrichment and Matching', 'ioc_match', null,
    {},
    ['context_established', 'correlation_completed', 'entity_resolved', 'case_created'],
    ['orient', 'decide'],
    ['system_driven'],
    { successful: 0.75, partially_successful: 0.10, failed: 0.05, cancelled: 0.10 },
    { orient: 4, decide: 8 },
    24,
  ),

  template(6, 'JT-ENR-002', 'Vulnerability Estate Evaluation', 'ioc_match', null,
    { anchorSubtype: 'vulnerability-match' },
    ['context_established', 'risk_scored', 'blast_computed', 'case_created'],
    ['orient', 'decide'],
    ['system_driven'],
    { successful: 0.70, partially_successful: 0.15, failed: 0.05, accepted_risk: 0.10 },
    { orient: 8, decide: 12 },
    48,
  ),

  template(7, 'JT-ENR-003', 'Threat Relevance Scoring', 'inbound_signal', null,
    { anchorSubtype: 'threat-relevance' },
    ['context_established', 'classification_assigned', 'risk_scored'],
    ['orient'],
    ['system_driven'],
    { successful: 0.85, partially_successful: 0.10, failed: 0.05 },
    { orient: 2 },
    8,
  ),

  // ═══════════════════════════════════════════════════════════════════════════
  // Case Lifecycle Journeys (12)
  // ═══════════════════════════════════════════════════════════════════════════

  template(8, 'JT-CASE-001', 'Drift Case', 'case', null,
    { caseTypes: ['drift'] },
    ['signal_received', 'signal_enriched', 'drift_detected', 'risk_scored', 'case_created', 'case_bound', 'case_routed', 'case_prioritised', 'action_decomposed', 'action_started', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['observe', 'orient', 'decide', 'act'],
    ['system_driven', 'human_confirmed_automation'],
    { successful: 0.70, partially_successful: 0.15, failed: 0.05, accepted_risk: 0.10 },
    { observe: 2, orient: 4, decide: 8, act: 24 },
    72,
  ),

  template(9, 'JT-CASE-002', 'Vulnerability Case', 'case', null,
    { caseTypes: ['vulnerability'] },
    ['signal_received', 'signal_enriched', 'risk_scored', 'blast_computed', 'case_created', 'case_bound', 'case_routed', 'case_prioritised', 'action_decomposed', 'approval_requested', 'approval_granted', 'action_started', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['observe', 'orient', 'decide', 'act'],
    ['system_driven', 'human_confirmed_automation'],
    { successful: 0.65, partially_successful: 0.15, failed: 0.10, accepted_risk: 0.10 },
    { observe: 2, orient: 8, decide: 12, act: 48 },
    120,
  ),

  template(10, 'JT-CASE-003', 'Identity Case', 'case', null,
    { caseTypes: ['identity'] },
    ['signal_received', 'signal_enriched', 'anomaly_detected', 'context_established', 'case_created', 'case_bound', 'case_routed', 'case_prioritised', 'action_decomposed', 'approval_requested', 'approval_granted', 'action_started', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['observe', 'orient', 'decide', 'act'],
    ['human_confirmed_automation', 'manual'],
    { successful: 0.60, partially_successful: 0.15, failed: 0.10, accepted_risk: 0.15 },
    { observe: 4, orient: 8, decide: 24, act: 48 },
    168,
  ),

  template(11, 'JT-CASE-004', 'Exposure Case', 'case', null,
    { caseTypes: ['exposure'] },
    ['signal_received', 'signal_enriched', 'risk_scored', 'blast_computed', 'case_created', 'case_bound', 'case_routed', 'case_prioritised', 'action_decomposed', 'action_started', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['observe', 'orient', 'decide', 'act'],
    ['system_driven', 'human_confirmed_automation'],
    { successful: 0.65, partially_successful: 0.15, failed: 0.10, accepted_risk: 0.10 },
    { observe: 2, orient: 8, decide: 12, act: 36 },
    96,
  ),

  template(12, 'JT-CASE-005', 'Coverage Case', 'case', null,
    { caseTypes: ['coverage'] },
    ['signal_received', 'coverage_assessed', 'drift_detected', 'case_created', 'case_bound', 'case_routed', 'case_prioritised', 'action_decomposed', 'action_started', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['observe', 'orient', 'decide', 'act'],
    ['system_driven'],
    { successful: 0.75, partially_successful: 0.10, failed: 0.05, accepted_risk: 0.10 },
    { observe: 1, orient: 4, decide: 8, act: 24 },
    72,
  ),

  template(13, 'JT-CASE-006', 'Tool Health Case', 'case', null,
    { caseTypes: ['tool-health'] },
    ['signal_received', 'connector_pulled', 'drift_detected', 'case_created', 'case_bound', 'case_routed', 'case_prioritised', 'action_decomposed', 'action_started', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['observe', 'orient', 'decide', 'act'],
    ['system_driven'],
    { successful: 0.80, partially_successful: 0.10, failed: 0.05, accepted_risk: 0.05 },
    { observe: 1, orient: 2, decide: 4, act: 12 },
    48,
  ),

  template(14, 'JT-CASE-007', 'Threat Intelligence Estate Match', 'case', null,
    { caseTypes: ['threat-intelligence-estate-match'] },
    ['signal_received', 'signal_enriched', 'correlation_completed', 'entity_resolved', 'case_created', 'case_bound', 'case_routed', 'case_prioritised', 'action_decomposed', 'action_started', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['observe', 'orient', 'decide', 'act'],
    ['system_driven', 'ai_enhanced'],
    { successful: 0.60, partially_successful: 0.20, failed: 0.10, accepted_risk: 0.10 },
    { observe: 2, orient: 8, decide: 12, act: 36 },
    96,
  ),

  template(15, 'JT-CASE-008', 'External Attack Correlation', 'case', null,
    { caseTypes: ['external-attack-correlation'] },
    ['signal_received', 'signal_enriched', 'correlation_completed', 'context_established', 'case_created', 'case_bound', 'case_routed', 'case_prioritised', 'action_decomposed', 'approval_requested', 'approval_granted', 'action_started', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['observe', 'orient', 'decide', 'act'],
    ['human_confirmed_automation', 'manual'],
    { successful: 0.55, partially_successful: 0.20, failed: 0.15, accepted_risk: 0.10 },
    { observe: 4, orient: 12, decide: 24, act: 48 },
    168,
  ),

  template(16, 'JT-CASE-009', 'Verdict Pattern Case', 'case', null,
    { caseTypes: ['verdict-pattern'] },
    ['signal_received', 'signal_enriched', 'classification_assigned', 'context_established', 'case_created', 'case_bound', 'case_routed', 'case_prioritised', 'action_decomposed', 'approval_requested', 'approval_granted', 'action_started', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['observe', 'orient', 'decide', 'act'],
    ['human_confirmed_automation', 'manual'],
    { successful: 0.55, partially_successful: 0.20, failed: 0.10, accepted_risk: 0.15 },
    { observe: 4, orient: 12, decide: 24, act: 48 },
    168,
  ),

  template(17, 'JT-CASE-010', 'Inverse Discovery Blindspot', 'case', null,
    { caseTypes: ['inverse-discovery-coverage-blindspot'] },
    ['signal_received', 'coverage_assessed', 'context_established', 'case_created', 'case_bound', 'case_routed', 'case_prioritised', 'action_decomposed', 'action_started', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['observe', 'orient', 'decide', 'act'],
    ['system_driven'],
    { successful: 0.70, partially_successful: 0.15, failed: 0.05, accepted_risk: 0.10 },
    { observe: 2, orient: 4, decide: 8, act: 24 },
    72,
  ),

  template(18, 'JT-CASE-011', 'Policy Effectiveness Case', 'case', null,
    { caseTypes: ['policy-effectiveness'] },
    ['signal_received', 'signal_enriched', 'risk_scored', 'context_established', 'case_created', 'case_bound', 'case_routed', 'case_prioritised', 'action_decomposed', 'action_started', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['observe', 'orient', 'decide', 'act'],
    ['system_driven', 'ai_enhanced'],
    { successful: 0.65, partially_successful: 0.20, failed: 0.05, accepted_risk: 0.10 },
    { observe: 2, orient: 8, decide: 12, act: 36 },
    96,
  ),

  template(19, 'JT-CASE-012', 'OODA Tempo Degradation', 'case', null,
    { caseTypes: ['ooda-tempo-degradation'] },
    ['signal_received', 'drift_detected', 'context_established', 'case_created', 'case_bound', 'case_routed', 'case_prioritised', 'action_decomposed', 'action_started', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['observe', 'orient', 'decide', 'act'],
    ['system_driven'],
    { successful: 0.70, partially_successful: 0.15, failed: 0.05, accepted_risk: 0.10 },
    { observe: 1, orient: 4, decide: 8, act: 24 },
    72,
  ),

  // ═══════════════════════════════════════════════════════════════════════════
  // Action and Execution Journeys (6)
  // ═══════════════════════════════════════════════════════════════════════════

  template(20, 'JT-ACT-001', 'Remediation (Isolate)', 'push_action', 'case',
    { d3fendTactics: ['isolate'] },
    ['approval_requested', 'approval_granted', 'action_started', 'action_dispatched', 'action_accepted', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['decide', 'act'],
    ['human_confirmed_automation'],
    { successful: 0.80, partially_successful: 0.10, failed: 0.10 },
    { decide: 4, act: 8 },
    24,
    [...BASE_FORMULAS, 'automation-opportunity', 'automation-friction', 'automation-maturity'],
  ),

  template(21, 'JT-ACT-002', 'Remediation (Evict)', 'push_action', 'case',
    { d3fendTactics: ['evict'] },
    ['approval_requested', 'approval_granted', 'action_started', 'action_dispatched', 'action_accepted', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['decide', 'act'],
    ['human_confirmed_automation', 'manual'],
    { successful: 0.70, partially_successful: 0.15, failed: 0.15 },
    { decide: 8, act: 12 },
    36,
    [...BASE_FORMULAS, 'automation-opportunity', 'automation-friction', 'automation-maturity'],
  ),

  template(22, 'JT-ACT-003', 'Remediation (Restore)', 'push_action', 'case',
    { d3fendTactics: ['restore'] },
    ['approval_requested', 'approval_granted', 'action_started', 'action_dispatched', 'action_accepted', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['decide', 'act'],
    ['manual', 'human_confirmed_automation'],
    { successful: 0.65, partially_successful: 0.20, failed: 0.15 },
    { decide: 8, act: 24 },
    48,
    [...BASE_FORMULAS, 'automation-opportunity', 'automation-friction', 'automation-maturity'],
  ),

  template(23, 'JT-ACT-004', 'Remediation (Harden)', 'push_action', 'case',
    { d3fendTactics: ['harden'] },
    ['approval_requested', 'approval_granted', 'action_started', 'action_dispatched', 'action_accepted', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['decide', 'act'],
    ['system_driven', 'human_confirmed_automation'],
    { successful: 0.75, partially_successful: 0.15, failed: 0.10 },
    { decide: 4, act: 12 },
    36,
    [...BASE_FORMULAS, 'automation-opportunity', 'automation-friction', 'automation-maturity'],
  ),

  template(24, 'JT-ACT-005', 'Remediation (Detect)', 'push_action', 'case',
    { d3fendTactics: ['detect'] },
    ['action_started', 'action_dispatched', 'action_accepted', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['decide', 'act'],
    ['system_driven', 'ai_enhanced'],
    { successful: 0.80, partially_successful: 0.10, failed: 0.10 },
    { decide: 2, act: 8 },
    24,
    [...BASE_FORMULAS, 'automation-opportunity', 'automation-friction', 'automation-maturity'],
  ),

  template(25, 'JT-ACT-006', 'Automated Push Action', 'push_action', 'case',
    {},
    ['approval_requested', 'approval_granted', 'action_started', 'action_dispatched', 'action_accepted', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['decide', 'act'],
    ['human_confirmed_automation', 'autonomous'],
    { successful: 0.75, partially_successful: 0.10, failed: 0.15 },
    { decide: 2, act: 4 },
    12,
    [...BASE_FORMULAS, 'automation-opportunity', 'automation-friction', 'automation-maturity'],
  ),

  // ═══════════════════════════════════════════════════════════════════════════
  // Strategic and Operational Journeys (5)
  // ═══════════════════════════════════════════════════════════════════════════

  template(26, 'JT-MIS-001', 'Mission Lifecycle', 'mission', null,
    {},
    ['context_established', 'risk_scored', 'case_created', 'case_bound', 'case_routed', 'case_prioritised', 'action_decomposed', 'action_started', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['observe', 'orient', 'decide', 'act'],
    ['manual', 'ai_enhanced'],
    { successful: 0.50, partially_successful: 0.25, failed: 0.10, accepted_risk: 0.15 },
    { observe: 24, orient: 48, decide: 72, act: 168 },
    720,
  ),

  template(27, 'JT-WAR-001', 'War Room Coordination', 'war_room', null,
    {},
    ['context_established', 'escalation_triggered', 'action_decomposed', 'action_started', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['observe', 'orient', 'decide', 'act'],
    ['manual', 'human_confirmed_automation'],
    { successful: 0.60, partially_successful: 0.20, failed: 0.10, accepted_risk: 0.10 },
    { observe: 1, orient: 2, decide: 4, act: 12 },
    48,
  ),

  template(28, 'JT-STR-001', 'Strategy Policy Lifecycle', 'strategy_policy', null,
    {},
    ['approval_requested', 'approval_granted', 'action_started', 'action_executed', 'journey_completed'],
    ['decide', 'act'],
    ['manual', 'system_driven'],
    { successful: 0.70, partially_successful: 0.10, failed: 0.05, rejected: 0.15 } as JourneyTemplate['expectedOutcomeDistribution'],
    { decide: 48, act: 168 },
    504,
  ),

  template(29, 'JT-STR-002', 'Exposure Reduction Programme', 'mission', null,
    { anchorSubtype: 'exposure-programme' },
    ['context_established', 'risk_scored', 'blast_computed', 'case_created', 'case_bound', 'action_decomposed', 'action_started', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['observe', 'orient', 'decide', 'act'],
    ['system_driven', 'human_confirmed_automation'],
    { successful: 0.55, partially_successful: 0.25, failed: 0.10, accepted_risk: 0.10 },
    { observe: 24, orient: 48, decide: 72, act: 168 },
    720,
  ),

  template(30, 'JT-GOV-001', 'Risk Acceptance Journey', 'case', null,
    { anchorSubtype: 'accepted-risk' },
    ['context_established', 'risk_scored', 'approval_requested', 'approval_granted', 'journey_completed'],
    ['orient', 'decide'],
    ['manual', 'human_confirmed_automation'],
    { successful: 0.40, accepted_risk: 0.50, failed: 0.05, cancelled: 0.05 },
    { orient: 24, decide: 72 },
    168,
  ),

  // ═══════════════════════════════════════════════════════════════════════════
  // Control and Posture Journeys (3)
  // ═══════════════════════════════════════════════════════════════════════════

  template(31, 'JT-CTL-001', 'Control Validation', 'finding', null,
    { domains: ['control-validation'] },
    ['signal_received', 'signal_enriched', 'context_established', 'risk_scored', 'case_created'],
    ['observe', 'orient', 'decide'],
    ['system_driven'],
    { successful: 0.80, partially_successful: 0.10, failed: 0.05, accepted_risk: 0.05 },
    { observe: 2, orient: 4, decide: 8 },
    24,
  ),

  template(32, 'JT-CTL-002', 'Posture Classification', 'finding', null,
    { domains: ['posture-classification'] },
    ['signal_received', 'signal_enriched', 'classification_assigned', 'context_established'],
    ['observe', 'orient'],
    ['system_driven'],
    { successful: 0.85, partially_successful: 0.10, failed: 0.05 },
    { observe: 1, orient: 2 },
    8,
  ),

  template(33, 'JT-AUT-001', 'Autonomous Operation', 'case', null,
    { anchorSubtype: 'autonomous' },
    ['signal_received', 'signal_enriched', 'context_established', 'risk_scored', 'case_created', 'case_bound', 'case_routed', 'case_prioritised', 'action_decomposed', 'action_started', 'action_dispatched', 'action_accepted', 'action_executed', 'validation_started', 'validation_passed', 'journey_completed'],
    ['observe', 'orient', 'decide', 'act'],
    ['autonomous'],
    { successful: 0.70, partially_successful: 0.15, failed: 0.15 },
    { observe: 0.5, orient: 1, decide: 2, act: 4 },
    12,
    [...BASE_FORMULAS, 'automation-opportunity', 'automation-friction', 'automation-maturity'],
  ),
];
