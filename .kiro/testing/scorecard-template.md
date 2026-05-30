# Scorecard Template — Commander SDR

**Purpose:** Template for creating missing layer scorecards mid-run during core testing pipeline execution.

**Usage:** When the pipeline detects a missing scorecard for a layer (data, database, infrastructure, auth), it adapts this template to create the scorecard before gating that layer.

**Pattern Source:** Application Layer scorecard (PD-1.0, APPLICATION_LAYER_STRATEGY.md)

---

## Scorecard Structure

### Layer: [Layer Name]

**Tier:** [T1 | T2 | T3]  
**Status:** [Green | Yellow | Amber | Red]  
**Last Updated:** [ISO date]

---

### Measurable Units

| Unit ID | Unit Name | Target | Current | Band | Status | Notes |
|---------|-----------|--------|---------|------|--------|-------|
| [LAYER]-001 | [Unit name] | [Target value] | [Current value] | [Green/Yellow/Amber/Red] | [Pass/Fail] | [Notes] |
| [LAYER]-002 | [Unit name] | [Target value] | [Current value] | [Green/Yellow/Amber/Red] | [Pass/Fail] | [Notes] |

---

### Band Definitions

**Green:** [Definition for this layer]  
**Yellow:** [Definition for this layer]  
**Amber:** [Definition for this layer]  
**Red:** [Definition for this layer]

---

### Scoring Formula

**Overall Band:** [Formula for aggregating unit bands]

Example:
- If any unit is Red → Overall Red
- If any unit is Amber (and none Red) → Overall Amber
- If any unit is Yellow (and none Amber/Red) → Overall Yellow
- If all units are Green → Overall Green

---

### Tier-Specific Targets

#### T1 (Single-Instance Deployment)
- [Target 1]
- [Target 2]

#### T2 (Scaled Deployment)
- [Target 1]
- [Target 2]

#### T3 (Distributed Deployment)
- [Target 1]
- [Target 2]

---

### Measurement Method

**How to measure each unit:**

1. [Unit 1]: [Measurement method]
2. [Unit 2]: [Measurement method]

**Tools:**
- [Tool 1]
- [Tool 2]

**Frequency:** [How often to measure]

---

### Remediation Guidance

**When a unit is Yellow/Amber/Red:**

1. [Remediation step 1]
2. [Remediation step 2]
3. [Escalation criteria]

---

### Authority

**Source:** [Layer strategy document]  
**Doctrine:** Performance Doctrine PD-1.0  
**Enforcement:** Core testing pipeline, Hook 05 (Performance Compliance)

---

## Adaptation Instructions (For Pipeline)

When creating a scorecard from this template:

1. Replace `[Layer Name]` with actual layer (Database, Data, Infrastructure, Auth)
2. Define measurable units specific to the layer (reference layer strategy document)
3. Set targets based on tier (T1/T2/T3) from layer strategy
4. Define band thresholds appropriate for the layer
5. Specify measurement methods and tools
6. Document remediation guidance
7. Save to `.kiro/testing/scorecards/[layer-name]-layer.md`

**Example Layers:**

- **Database Layer:** Query performance, connection pool, replication lag, backup success rate
- **Data Layer:** Pipeline latency, data freshness, transformation success rate, storage efficiency
- **Infrastructure Layer:** Deployment time, resource utilization, availability, failover time
- **Auth Layer:** Authentication latency, session management, token validation, RBAC enforcement

---

**Status:** TEMPLATE — adapt per layer when needed.
