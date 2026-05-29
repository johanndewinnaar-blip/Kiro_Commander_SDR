# Commander SDR — Performance Doctrine

**Version:** PD-1.0 (initial draft)
**Status:** Authoritative. The third doctrinal pillar of Commander, equal in standing to the functional doctrine (closed-loop case model, strategy-driven values, surface attribution) and the design doctrine (DS-1.0).
**Governing principle:** *Hyper-efficient by design, not by accident. Speed is doctrine, not an afterthought.*

This document is the constitution for performance, cost-efficiency, and scalability across all of Commander. The four layer strategy documents (Application, Database, Data, Infrastructure) operate under this doctrine. The scorecard discipline below applies uniformly to all four. Every other document referencing performance traces back to this one.

---

## 1. The philosophy

Commander is a SaaS Security Command and Control product. Its users are CISOs, SOC analysts, and security operators making decisions under pressure, sometimes at 2am, often during incidents where seconds matter. The product's *response time* is part of its product surface — not a technical detail. Slow software fails command-and-control use cases regardless of how comprehensive its features are.

Commander is built to be **top-decile fast by design**. Not "fast enough." Not "performant for our stage." Top-decile means consistently in the upper 10% of SaaS dashboards measured against industry-standard benchmarks (Lighthouse, Core Web Vitals, query latency norms).

This is achieved through three commitments:

1. **Designed-in, not retrofitted.** Performance is part of every spec, every component, every query, every deployment from inception. Retrofitting performance into a mature codebase is rebuild-grade work; designing it in is incremental discipline.
2. **Measured continuously.** Performance is a *measurable contract*, not an aspiration. Every layer has explicit measurable units with explicit targets. Every commit, every phase, every release runs against the scorecard.
3. **Cost-disciplined at every tier.** Hyper-efficient does not mean expensive. The doctrine includes cost contracts alongside performance contracts. Wasteful infrastructure is as much a doctrinal violation as slow code.

Where performance and cost pull against each other, the doctrine resolves through tier discipline (§3) and the cost-vs-capability calibration per layer (§5).

---

## 2. The four layers

Commander's performance discipline operates across four distinct layers. Each is its own concern, with its own strategy document, its own measurable units, and its own scorecard.

### 2.1 Application Layer

The user-facing code: front-end React/Next.js, application servers, routes, components, bundles, assets, runtime browser behaviour. The layer where "the product feels fast or slow" is decided.

**Strategy document:** `APPLICATION_LAYER_STRATEGY.md`

### 2.2 Database Layer

The database engine itself. Schema design, indexing, partitioning, query plans, engine-level configuration, storage primitives. The data *at rest* layer.

**Strategy document:** `DATABASE_LAYER_STRATEGY.md`

### 2.3 Data Layer

The data flow: connectors, ingestion pipelines, normalisation, transformation, queueing, caching, read models, search indices. Everything that moves data between sources, between systems, between storage tiers, and between the application and the database. The data *in motion* layer.

**Strategy document:** `DATA_LAYER_STRATEGY.md`

### 2.4 Infrastructure Layer

The deployment substrate. AWS topology, compute, networking, storage tiers, regions, availability zones, edge, observability, autoscaling, deployment strategy.

**Strategy document:** `INFRASTRUCTURE_LAYER_STRATEGY.md`

---

## 3. The tier model

Commander's runtime scales through three tiers, calibrated to business scale. Tiers describe the *deployment instantiation*, not the code quality.

### 3.1 Tier definitions

**Tier 1 (T1) — Bootstrap.**
Smallest viable deployment. Demo environments, earliest customers, low-volume tenants. Single-region, single-AZ acceptable, minimal infrastructure spend, single database instance, in-process queueing where possible.
*Scale band: up to ~10 tenants, up to ~1,000 cases per tenant, up to ~50,000 assets per tenant.*

**Tier 2 (T2) — Mid-scale.**
Production deployment with real customer load. Multi-AZ, read replicas where the layer requires, separate ingestion staging where the layer requires, dedicated caching layer, dedicated search where required.
*Scale band: up to ~100 tenants, up to ~10,000 cases per tenant, up to ~500,000 assets per tenant.*

**Tier 3 (T3) — Enterprise / hyper-scale.**
Top-end deployment. Multi-region, full CQRS where applicable, columnar analytics store, full edge caching, full observability stack. Hyper-scale tenants.
*Scale band: unlimited tenants, ~50,000+ cases per tenant, ~5,000,000+ assets per tenant.*

### 3.2 Tier strategy per layer

Tiers do not apply uniformly across layers. Each layer has a specific tier strategy reflecting its nature:

| Layer | Tier strategy |
|---|---|
| Application | Always built and operated at **T3**. No tier variation. |
| Database | Always **designed at T3**, with technology-portability built in. Deployment tier may step from T1 to T3, but design never compromises. |
| Data | **Designed for T3, deployable at T1.** Architecture supports all tiers; deployment instantiation matches current scale. |
| Infrastructure | **Explicitly tiered T1 → T2 → T3 with designed upgrade paths.** T1 deployment used until business scale demands promotion. |

The rationale per layer is captured in §5.

### 3.3 Tier promotion

Tier promotion is a *deployment event*, not a code event. The codebase does not change to promote a tier; the deployment configuration changes. Promotion criteria, the required preparation, and the expected impact are documented in each layer's strategy document under "Tier Promotion."

Tier promotion is a deliberate decision, never accidental. Each promotion is recorded as a decision (`DEC-tier-promotion-{layer}-{date}`).

---

## 4. The scorecard discipline

Every performance commitment in this doctrine is enforced through a single, uniform scorecard model. This section defines the model. Each layer strategy applies it.

### 4.1 The four-band classification

Every measurable unit, regardless of layer, is classified into one of four bands based on its compliance score:

| Band | Compliance score | Meaning |
|---|---|---|
| **Green** | 95–100% | Above par — meets or exceeds target |
| **Yellow** | 85–94% | Slight drift — watch but no urgent action |
| **Amber** | 60–84% | Below par — remediation required |
| **Red** | under 60% | Failing — urgent remediation |

Bands are contiguous. There is no gap. Anything below 60% is Red regardless of how far below.

### 4.2 Per-unit scoring formulas

**Smaller-is-better metrics** (latency, bundle size, render time, query duration, cost):

```
score = (target ÷ measured) × 100%
capped at 100% if measured ≤ target
```

**Bigger-is-better metrics** (throughput, cache hit rate, test coverage, uptime):

```
score = (measured ÷ target) × 100%
capped at 100% if measured ≥ target
```

Scores are computed per unit, per measurement, against the target declared in the relevant strategy document.

### 4.3 Worked examples

**LCP target 1.0s (smaller-is-better):**
- Measured 0.8s → capped 100% → Green
- Measured 1.05s → 95% → Green
- Measured 1.15s → 87% → Yellow
- Measured 1.25s → 80% → Amber
- Measured 1.70s → 59% → Red

**Cache hit rate target 90% (bigger-is-better):**
- Measured 92% → capped 100% → Green
- Measured 86% → 96% → Green
- Measured 80% → 89% → Yellow
- Measured 70% → 78% → Amber
- Measured 50% → 56% → Red

### 4.4 Layer aggregation

Each layer's overall band is determined by **the proportion of units classified as Green**:

| Layer band | Proportion of units in Green |
|---|---|
| Green | 95–100% |
| Yellow | 85–94% |
| Amber | 60–84% |
| Red | under 60% |

**Override rule:** any layer with one or more Red units carries an explicit *"Red unit present — remediation required"* flag, regardless of overall band. A layer can be "Green overall with one Red flag" — the band describes broad health, the flag identifies specific items to fix.

### 4.5 Measurement readiness

Not every measurable unit can be measured from day one. Live database measurements require a wired database; ingestion throughput requires real ingestion; infrastructure metrics require live infrastructure. The doctrine accommodates this honestly through a `measurement_readiness` declaration on every unit:

- **`measurement_live`** — measurable now, current scorecard reports it.
- **`measurement_static`** — measurable now via static analysis only (no runtime data needed).
- **`measurement_deferred`** — defined now, measured when the deferral milestone is reached.

Deferred units appear in scorecards as "Deferred — measurement awaits {milestone}." They are counted separately and do not artificially inflate or deflate the layer's Green proportion.

Each deferred unit must declare its `deferred_until` milestone explicitly — the specific event at which the unit becomes measurable (e.g. "T1 live database wired," "first AWS deployment," "Phase E ingestion pipelines live").

### 4.6 Scorecard output format

Every scorecard report follows this canonical structure:

```
{Layer} Compliance Report — {timestamp}
================================================
{N} units assessed ({live} live, {static} static, {deferred} deferred)

Green   (95–100%)  : {count} units — {percentage}
Yellow  (85–94%)   : {count} units — {percentage}
Amber   (60–84%)   : {count} units — {percentage}
Red     (<60%)     : {count} units — {percentage}

Overall layer band: {BAND}
Red units present: {YES/NO}

Red units:
  {unit name} — {measurement}, score {score}%, target {target}
  ...

Amber units (remediation queue):
  {unit name} — {measurement}, score {score}%, target {target}
  ...

Deferred units ({count}):
  {unit name} — deferred until {milestone}
  ...
```

Every scorecard produced by every tool in Commander follows this format.

### 4.7 Remediation guidance

Where the measurement infrastructure permits, every Red and Amber unit in a scorecard is accompanied by remediation guidance referencing the specific strategy document section that defines its contract, a likely cause from static analysis where determinable, and a suggested prompt template invocation for remediation. The scorecard is a queue generator, not just a diagnostic.

---

## 5. Per-layer cost and capability calibration

Each layer's tier strategy reflects the cost-vs-capability calibration appropriate to that layer's nature.

### 5.1 Application Layer — always T3

Application code lives once. The same React code runs whether the product has 5 users or 50,000. Building a "small" front-end and growing it later is rewrite-grade work. Building it top-end once is incremental discipline. Therefore: always T3.

Cost discipline at the Application Layer is about *what's loaded* (bundle size, route splitting, asset weight) not *what's deployed*. The code is engineered to be cheap to ship per session — every byte justified.

### 5.2 Database Layer — always T3 design, technology-portable

The database schema and access patterns determine the product's scale ceiling. A schema designed without indexes, without tenant-leading composites, without cursor pagination is *catastrophically expensive to fix at scale*. Therefore: always designed at T3.

Additionally, the Database Layer must be **technology-portable across the Postgres family** (vanilla Postgres, Aurora, Citus, CockroachDB-Postgres-mode, YugabyteDB, Postgres-compatible distributed databases). The product does not depend on engine-specific features that prevent migration between these. The boundary of portability is the Postgres family, not arbitrary RDBMS — Postgres-specific extensions are permitted where standard across the family.

Cost discipline at the Database Layer is about *what's deployed at the current tier* (instance class, replicas, storage type) — the design supports T1 through T3, the deployment matches business stage.

### 5.3 Data Layer — designed for T3, deployable at T1

The Data Layer is where the cost-vs-capability calibration matters most. Ingestion pipelines, queueing, caching, search — these have huge cost differences between tiers (in-process queue vs SQS; in-app cache vs ElastiCache; Postgres FTS vs OpenSearch). Over-engineering them at T1 wastes money on customers you don't yet have; under-engineering them at T3 fails the product.

Therefore: architecture designed for T3 (workload separation, queue abstraction, cache abstraction, search abstraction) with deployment instantiation matching the current tier. Code does not change between tiers; deployment configuration does.

### 5.4 Infrastructure Layer — explicitly tiered

Infrastructure has the most cost variation per tier. Multi-region, multi-AZ, dedicated services per workload, full observability stack — these are appropriate at T3 and wasteful at T1.

Infrastructure is explicitly tiered, with documented T1 → T2 → T3 upgrade paths. T1 is minimum viable for demo and earliest customers. Promotion is a deployment-level change, not a code-level change. Each tier's expected cost band, expected performance band, and expected operational complexity is documented in the Infrastructure Layer Strategy.

---

## 6. The workload separation principle

Commander's data layer recognises four distinct workload classes, each with different performance characteristics:

1. **Operational** — low-latency reads and writes serving the application UI. Latency-critical, low-volume per operation, high-frequency.
2. **Ingestion** — high-volume writes from connectors and signal sources. Bursty, throughput-critical, latency-tolerant.
3. **Analytics** — heavy reads scanning large date ranges and aggregating across many records. High-cost per query, latency-tolerant, scheduled or on-demand.
4. **Reporting** — extracts, exports, scheduled jobs producing artefacts. Predictable, batch-oriented, may run against denormalised stores.

These workloads share storage at T1 (single database instance, all four workloads against one Postgres). They separate at T2 and beyond.

**The discipline:** application code declares the workload class of every database operation from day one. At T1, all four resolve to the same connection. At T2, they resolve to different connections, different read replicas, or different physical databases entirely. **The code does not change at tier promotion** — only the deployment configuration. This is non-negotiable. Tasks that violate workload-class discipline fail Hook 05.

This principle is detailed further in the Database Layer Strategy and the Data Layer Strategy.

---

## 7. Enforcement

The doctrine is enforced through five concrete mechanisms in the Kiro pack:

### 7.1 Always-on steering

A steering file `.kiro/steering/performance-discipline.md` with `inclusion: always` references this doctrine and the four layer strategies. Auto-loaded on every Kiro interaction. Ensures Kiro carries the doctrine in working context permanently.

### 7.2 EARS requirements in specs

The doctrine is translated into testable EARS requirements:
- **Spec 02 (Design System)** amended with Application Layer performance requirements.
- **Spec 16 (Data Layer Performance)** — new spec — carries Database Layer and Data Layer requirements.
- **Spec 18 (Infrastructure Performance)** — new spec — carries Infrastructure Layer requirements.

These EARS make performance contracts enforceable on spec-driven work.

### 7.3 Hook 05 — Performance Compliance

A new `postTaskExecution` hook (`.kiro/hooks/05-performance-compliance.kiro.hook`) runs the scorecard against any layer the task touched, compares to the previous scorecard, and refuses the task if it introduces a new Red unit or a regression past tolerance. Same enforcement pattern as Hook 04 for functional doctrine.

### 7.4 Scorecard runner

A package implementing the scorecard runner. Reads strategy documents (structured declarations), runs measurements (Lighthouse, bundle analysis, query plan analysis, static checks, infrastructure probes), produces scorecard JSON and human-readable reports in the canonical format (§4.6).

### 7.5 Updated prompt templates

The existing prompt library is extended:
- `PHASE_RUNNER.md` — runs the scorecard against affected layers, reports inline with test count.
- `TWEAK_PASS.md` — runs the scorecard, includes results in the pass report.
- `VERIFY_AND_CLOSE.md` — runs all four layer scorecards as part of close-out.
- `PERF_AUDIT.md` — new template; full standalone scorecard run across all layers.

This integrates scorecard discipline into the existing prompt rhythm. No additional cognitive load for the operator — performance reporting is automatic with every standard prompt invocation.

---

## 8. Relationship to other doctrine

Performance doctrine is **co-equal** with functional doctrine and design doctrine. None is subordinate to the others. Where they appear to conflict, the resolution principles are:

- **Functional doctrine is invariant.** Closed-loop case model, surface attribution, SOC/insider-risk boundaries, strategy consumption — these cannot be compromised for performance gains.
- **Design doctrine is the visual expression.** Performance gains that visibly degrade the design must be re-examined against the design doctrine first.
- **Performance doctrine is the runtime contract.** Functional and design choices that breach performance targets must be re-engineered to meet them — the targets do not bend.

When a target genuinely cannot be met without compromising functional or design doctrine, the response is to **re-examine the underlying requirement**, not to lower the target. Targets are sharp by design; relaxing them silently is the antipattern this doctrine exists to prevent.

---

## 9. Standing rules

These rules apply to every task, every commit, every release, without exception:

1. **No Red units in production releases.** A release with Red units is not a release; it is a remediation queue with a deploy button. Hook 05 refuses commits that introduce new Red units.

2. **No silent regression past tolerance.** Any unit moving from Green to Yellow, Yellow to Amber, or Amber to Red on any commit triggers a hook flag. The regression must be acknowledged and either accepted (with documented reason and remediation plan) or reverted.

3. **No deferred unit beyond its declared milestone.** When a deferred unit's milestone arrives (e.g. live database wired, first AWS deployment), the unit must be activated in the scorecard. Deferred-past-milestone units are themselves a doctrinal violation.

4. **No tier shortcut.** T1 deployment may not adopt T2/T3-only patterns prematurely (wasteful). T1 code may not adopt T1-only shortcuts that block T2/T3 promotion (rewrite trap). The discipline cuts both ways.

5. **No performance-blind feature work.** Every spec, every phase, every tweak pass declares its expected impact on the scorecard and reports actuals. Performance is part of the work, not an optional appendix.

6. **No exemption without explicit decision record.** If a unit's target cannot be met for a defensible reason (e.g. third-party dependency limit), the exemption is recorded as a decision in DECISIONS.md with rationale and review date. Quiet acceptance is forbidden.

---

## 10. Implementation path

This doctrine lands in the pack via the following sequence:

1. This document committed to `docs/00_authority/PERFORMANCE_DOCTRINE.md`.
2. Companion steering file `.kiro/steering/performance-discipline.md` created with `inclusion: always`, referencing this doctrine.
3. The four layer strategy documents drafted in priority order: Application (testable now), Database (mostly static-checkable now), Data (mostly deferred), Infrastructure (fully deferred until first deployment).
4. The Test and Tolerance Framework document drafted.
5. Scorecard runner implemented incrementally — Application Layer first (Lighthouse + bundle analyser), then static checks for Database and Data Layers, then live checks as deferred milestones arrive.
6. Hook 05 created and wired.
7. Existing prompt templates extended with scorecard steps.
8. Spec 02 amended; Spec 16 and Spec 18 created.
9. First baseline scorecard run against the current state of the build, baseline recorded in CONVERSION_FINDINGS.

Each step is its own scoped piece of work, executed under the existing pack discipline.

---

## 11. Authority and lineage

This doctrine is authored as part of the v1.3.x pack evolution. It addresses a known gap surfaced by audit (`docs/00_authority/audits/{date}-database-performance-audit.md`) where the baseline `Spec #16 Performance, Scaling and Operational Specification` was not translated into active Kiro pack authority.

The performance doctrine supersedes any prior implicit performance assumptions. Where prior decisions in DECISIONS.md conflict with this doctrine, this doctrine wins; the prior decision must be superseded explicitly.

The four layer strategy documents are the *deep* authority. This document is the *constitution*. Both are referenced by `.kiro/steering/performance-discipline.md` and treated as authoritative by Kiro.
