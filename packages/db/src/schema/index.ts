/**
 * Commander SDR Database Schema — Central Export
 *
 * Drizzle ORM schema definitions for Postgres 16+.
 * All tables enforce tenant scope.
 *
 * Data classifications per Master Technical Specification §11.1:
 * - Configuration, State, Verdict, Detection, Case, Threat Intelligence, Audit
 *
 * Data residency per Master Technical Specification §11.2:
 * - UK and US boundaries honoured per tenant selection
 */

export {
  dataClassificationEnum,
  dataResidencyEnum,
  connectorClassEnum,
  surfaceAttributionEnum,
  caseStatusEnum,
  priorityEnum,
} from './common';

export { tenants } from './tenants';
export { assets } from './assets';
export { identities } from './identities';
export { cases } from './cases';
export { connectors, conformanceTierEnum, connectorStateEnum, lastRunStatusEnum } from './connectors';
export { auditEvents } from './audit-events';
export { riskObjects, riskObjectTypeEnum, treatmentStateEnum, findingClassEnum } from './risk-objects';
export { strategies, strategySurfaceTypeEnum, strategyPolicyStatusEnum } from './strategies';
export { caseStrategyBindings } from './case-strategy-bindings';
export { evidence, evidenceTypeEnum, evidenceSourceEnum, freshnessStatusEnum } from './evidence';
