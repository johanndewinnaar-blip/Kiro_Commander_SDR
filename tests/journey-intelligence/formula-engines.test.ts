import { describe, it, expect } from 'vitest';
import {
  computeWeightedScore,
  classifyBand,
  classifyBandInverted,
  computeJourneyQuality,
  computeJourneyComplexity,
  computeJourneyEconomics,
  computeLifecycleSavings,
  computeAutomationOpportunity,
  computeAutomationFriction,
  computeAutomationMaturity,
  computeJourneyConfidence,
  computeLeakageRisk,
  computeReworkRisk,
} from '../../packages/contracts/src/engines/journey-intelligence/formulas';

/**
 * Formula Engine Unit Tests — Journey Intelligence
 *
 * Source: JI-1.0 §7
 * Domain: D-47 Journey Intelligence
 * Build unit: Unit 51
 */

describe('Formula Engine Framework', () => {
  describe('computeWeightedScore', () => {
    it('computes weighted average correctly', () => {
      const { score } = computeWeightedScore(
        { a: 100, b: 0 },
        { a: 0.5, b: 0.5 },
      );
      expect(score).toBe(50);
    });

    it('clamps to 0-100', () => {
      const { score } = computeWeightedScore(
        { a: 200 },
        { a: 1.0 },
      );
      expect(score).toBeLessThanOrEqual(100);
    });

    it('handles missing values as 0', () => {
      const { score } = computeWeightedScore(
        { a: 80 },
        { a: 0.5, b: 0.5 },
      );
      expect(score).toBe(40);
    });
  });

  describe('classifyBand', () => {
    it('classifies green at threshold', () => {
      expect(classifyBand(80, { green: 80, amber: 60 })).toBe('green');
    });

    it('classifies amber between thresholds', () => {
      expect(classifyBand(70, { green: 80, amber: 60 })).toBe('amber');
    });

    it('classifies red below amber', () => {
      expect(classifyBand(50, { green: 80, amber: 60 })).toBe('red');
    });

    it('classifies amber at exact amber boundary', () => {
      expect(classifyBand(60, { green: 80, amber: 60 })).toBe('amber');
    });
  });

  describe('classifyBandInverted', () => {
    it('classifies green at/below threshold (lower is better)', () => {
      expect(classifyBandInverted(20, { green: 30, amber: 60 })).toBe('green');
    });

    it('classifies amber between thresholds', () => {
      expect(classifyBandInverted(45, { green: 30, amber: 60 })).toBe('amber');
    });

    it('classifies red above amber', () => {
      expect(classifyBandInverted(70, { green: 30, amber: 60 })).toBe('red');
    });
  });
});

describe('Journey Quality (§7.1)', () => {
  it('scores high for good metrics', () => {
    const result = computeJourneyQuality({
      validationPassRate: 95,
      outcomeSuccessRate: 90,
      reworkRate: 5,
      overrideRate: 2,
      reopeningRate: 3,
    });
    expect(result.score).toBeGreaterThan(80);
    expect(result.band).toBe('green');
    expect(result.formulaFamily).toBe('journey-quality');
  });

  it('scores low for poor metrics', () => {
    const result = computeJourneyQuality({
      validationPassRate: 40,
      outcomeSuccessRate: 30,
      reworkRate: 60,
      overrideRate: 50,
      reopeningRate: 40,
    });
    expect(result.score).toBeLessThan(60);
    expect(result.band).toBe('red');
  });

  it('inverts negative indicators correctly', () => {
    const highRework = computeJourneyQuality({
      validationPassRate: 80,
      outcomeSuccessRate: 80,
      reworkRate: 90,
      overrideRate: 10,
      reopeningRate: 10,
    });
    const lowRework = computeJourneyQuality({
      validationPassRate: 80,
      outcomeSuccessRate: 80,
      reworkRate: 10,
      overrideRate: 10,
      reopeningRate: 10,
    });
    expect(lowRework.score).toBeGreaterThan(highRework.score);
  });
});

describe('Journey Complexity (§7.2)', () => {
  it('scores low for simple journeys (green band)', () => {
    const result = computeJourneyComplexity({
      checkpointCount: 10,
      actorCount: 5,
      phaseCount: 10,
      approvalGateCount: 0,
      reworkCount: 0,
      childJourneyCount: 0,
      escalationCount: 0,
      deliveryModeChangeCount: 0,
    });
    expect(result.score).toBeLessThanOrEqual(30);
    expect(result.band).toBe('green');
  });

  it('scores high for complex journeys (red band)', () => {
    const result = computeJourneyComplexity({
      checkpointCount: 90,
      actorCount: 80,
      phaseCount: 90,
      approvalGateCount: 80,
      reworkCount: 70,
      childJourneyCount: 60,
      escalationCount: 80,
      deliveryModeChangeCount: 70,
    });
    expect(result.score).toBeGreaterThan(60);
    expect(result.band).toBe('red');
  });
});

describe('Journey Economics (§7.3)', () => {
  it('scores high for efficient successful journeys', () => {
    const result = computeJourneyEconomics({
      totalDurationHours: 4,
      estimatedEffortHours: 10,
      actualEffortHours: 4,
      baselineDurationHours: 24,
      automationDragHours: 0.5,
      humanRescueHours: 0,
      reworkCostHours: 0,
      outcomeValue: 100,
    });
    expect(result.score).toBeGreaterThan(70);
    expect(result.band).toBe('green');
  });

  it('scores low for failed outcomes regardless of speed', () => {
    const result = computeJourneyEconomics({
      totalDurationHours: 1,
      estimatedEffortHours: 10,
      actualEffortHours: 1,
      baselineDurationHours: 24,
      automationDragHours: 0,
      humanRescueHours: 0,
      reworkCostHours: 0,
      outcomeValue: 0, // Failed
    });
    expect(result.score).toBeLessThan(70);
  });
});

describe('Lifecycle Savings (§7.4)', () => {
  it('reports savings when actual < baseline', () => {
    const result = computeLifecycleSavings({
      perPhaseBaselineHours: { observe: 4, orient: 8, decide: 12, act: 24 },
      perPhaseActualHours: { observe: 2, orient: 4, decide: 6, act: 12 },
    });
    expect(result.score).toBeGreaterThan(50); // Above break-even
    expect(result.band).toBe('green');
  });

  it('reports negative savings when actual > baseline', () => {
    const result = computeLifecycleSavings({
      perPhaseBaselineHours: { observe: 4, orient: 8, decide: 12, act: 24 },
      perPhaseActualHours: { observe: 8, orient: 16, decide: 24, act: 48 },
    });
    expect(result.score).toBeLessThan(50); // Below break-even
    expect(result.band).toBe('red');
  });
});

describe('Automation Opportunity (§7.5)', () => {
  it('scores high for deterministic, connector-ready journeys', () => {
    const result = computeAutomationOpportunity({
      determinismScore: 90,
      connectorAvailable: 100,
      evidencePreAvailable: 80,
      approvalRequired: 0,
      repeatabilityScore: 85,
      historicalSuccessRate: 90,
      varianceScore: 10,
    });
    expect(result.score).toBeGreaterThan(70);
    expect(result.band).toBe('green');
  });

  it('reduces score when approval required (negative weight)', () => {
    const withApproval = computeAutomationOpportunity({
      determinismScore: 80,
      connectorAvailable: 100,
      evidencePreAvailable: 80,
      approvalRequired: 100,
      repeatabilityScore: 80,
      historicalSuccessRate: 80,
      varianceScore: 20,
    });
    const withoutApproval = computeAutomationOpportunity({
      determinismScore: 80,
      connectorAvailable: 100,
      evidencePreAvailable: 80,
      approvalRequired: 0,
      repeatabilityScore: 80,
      historicalSuccessRate: 80,
      varianceScore: 20,
    });
    expect(withoutApproval.score).toBeGreaterThan(withApproval.score);
  });
});

describe('Automation Friction (§7.6)', () => {
  it('scores low (green) for minimal friction', () => {
    const result = computeAutomationFriction({
      dragHours: 5,
      failureRate: 2,
      rescueRate: 1,
      retryCount: 3,
      recoveryHours: 2,
      connectorReliability: 98,
    });
    expect(result.score).toBeLessThanOrEqual(20);
    expect(result.band).toBe('green');
  });

  it('scores high (red) for major friction', () => {
    const result = computeAutomationFriction({
      dragHours: 80,
      failureRate: 70,
      rescueRate: 60,
      retryCount: 80,
      recoveryHours: 70,
      connectorReliability: 20,
    });
    expect(result.score).toBeGreaterThan(50);
    expect(result.band).toBe('red');
  });
});

describe('Automation Maturity (§7.7)', () => {
  it('100% autonomous with 50% failure rate ≠ mature', () => {
    const result = computeAutomationMaturity({
      manualFraction: 0,
      autonomousFraction: 100,
      systemDrivenFraction: 0,
      aiEnhancedFraction: 0,
      trendImprovement: 50,
      autonomousSuccessRate: 50, // Only 50% success
    });
    // Autonomous is moderated by success rate: 100 * 50/100 = 50
    expect(result.score).toBeLessThan(70);
  });

  it('high manual fraction reduces maturity', () => {
    const result = computeAutomationMaturity({
      manualFraction: 90,
      autonomousFraction: 5,
      systemDrivenFraction: 5,
      aiEnhancedFraction: 0,
      trendImprovement: 50,
      autonomousSuccessRate: 80,
    });
    expect(result.score).toBeLessThan(40);
    expect(result.band).toBe('red');
  });
});

describe('Journey Confidence (§7.8)', () => {
  it('active journey with rework and deviation scores low', () => {
    const result = computeJourneyConfidence({
      phaseProgressRatio: 50,
      checkpointAdherence: 40,
      evidenceConfidenceAvg: 60,
      decisionConfidenceAvg: 50,
      noRework: 0, // Reworking
      noDeviation: 20, // Major deviation
    });
    expect(result.score).toBeLessThan(50);
    expect(result.band).toBe('red');
  });

  it('on-track journey scores high', () => {
    const result = computeJourneyConfidence({
      phaseProgressRatio: 80,
      checkpointAdherence: 90,
      evidenceConfidenceAvg: 85,
      decisionConfidenceAvg: 88,
      noRework: 100,
      noDeviation: 95,
    });
    expect(result.score).toBeGreaterThan(75);
    expect(result.band).toBe('green');
  });
});

describe('Leakage Risk (§7.9)', () => {
  it('journey at 2x expected duration = high risk', () => {
    const result = computeLeakageRisk({
      timeOvershootRatio: 100, // 2x = value of 100
      historicalLeakageRate: 40,
      manualDelivery: 100,
      orientDecidePhase: 100,
      childStall: 0,
    });
    expect(result.score).toBeGreaterThan(60);
    expect(result.band).not.toBe('green');
  });

  it('journey on schedule = low risk', () => {
    const result = computeLeakageRisk({
      timeOvershootRatio: 10,
      historicalLeakageRate: 5,
      manualDelivery: 0,
      orientDecidePhase: 0,
      childStall: 0,
    });
    expect(result.score).toBeLessThan(40);
    expect(result.band).toBe('green');
  });
});

describe('Rework Risk (§7.10)', () => {
  it('low evidence sufficiency = high rework risk', () => {
    const result = computeReworkRisk({
      evidenceSufficiency: 10, // Very low
      historicalOverrideRate: 60,
      connectorReliability: 40,
      validationReadiness: 20,
      templateHistoricalReworkRate: 50,
    });
    expect(result.score).toBeGreaterThan(60);
    expect(result.band).toBe('red');
  });

  it('high evidence and reliability = low risk', () => {
    const result = computeReworkRisk({
      evidenceSufficiency: 95,
      historicalOverrideRate: 5,
      connectorReliability: 95,
      validationReadiness: 90,
      templateHistoricalReworkRate: 5,
    });
    expect(result.score).toBeLessThan(30);
    expect(result.band).toBe('green');
  });
});
